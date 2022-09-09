import { get, post } from "@toruslabs/http-helpers";
import deepmerge from "lodash.merge";
import { BroadcastChannel } from "broadcast-channel";
import log$1 from "loglevel";
import { EventEmitter } from "events";
import jwtDecode from "jwt-decode";
import NodeDetailManager from "@toruslabs/fetch-node-details";
import Torus, { keyLookup } from "@toruslabs/torus.js";
import { keccak256 } from "web3-utils";
import { register } from "@chaitanyapotti/register-service-worker";

const TORUS_NETWORK = {
  TESTNET: "testnet",
  MAINNET: "mainnet",
};
const ETHEREUM_NETWORK = {
  ROPSTEN: "ropsten",
  MAINNET: "mainnet",
};
const LOGIN = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  REDDIT: "reddit",
  DISCORD: "discord",
  TWITCH: "twitch",
  APPLE: "apple",
  GITHUB: "github",
  LINKEDIN: "linkedin",
  TWITTER: "twitter",
  WEIBO: "weibo",
  LINE: "line",
  EMAIL_PASSWORD: "email_password",
  PASSWORDLESS: "passwordless",
  JWT: "jwt",
  WEBAUTHN: "webauthn",
};
const AGGREGATE_VERIFIER = {
  SINGLE_VERIFIER_ID: "single_id_verifier",
  // AND_AGGREGATE_VERIFIER : "and_aggregate_verifier",
  // OR_AGGREGATE_VERIFIER : "or_aggregate_verifier",
};
const UX_MODE = {
  POPUP: "popup",
  REDIRECT: "redirect",
};
const REDIRECT_PARAMS_STORAGE_METHOD = {
  LOCAL_STORAGE: "localStorage",
  SESSION_STORAGE: "sessionStorage",
};
const TORUS_METHOD = {
  TRIGGER_LOGIN: "triggerLogin",
  TRIGGER_AGGREGATE_LOGIN: "triggerAggregateLogin",
  TRIGGER_AGGREGATE_HYBRID_LOGIN: "triggerHybridAggregateLogin",
};
const CONTRACT_MAP = {
  [TORUS_NETWORK.MAINNET]: "0x638646503746d5456209e33a2ff5e3226d698bea",
  [TORUS_NETWORK.TESTNET]: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183",
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
  return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

var log = log$1.getLogger("customauth");

function eventToPromise(emitter) {
  return new Promise((resolve, reject) => {
    const handler = (ev) => {
      const { error = "", data } = ev;
      emitter.removeEventListener("message", handler);
      if (error) return reject(new Error(error));
      return resolve(data);
    };
    emitter.addEventListener("message", handler);
  });
}
// These are the connection names used by auth0
const loginToConnectionMap = {
  [LOGIN.APPLE]: "apple",
  [LOGIN.GITHUB]: "github",
  [LOGIN.LINKEDIN]: "linkedin",
  [LOGIN.TWITTER]: "twitter",
  [LOGIN.WEIBO]: "weibo",
  [LOGIN.LINE]: "line",
  [LOGIN.EMAIL_PASSWORD]: "Username-Password-Authentication",
  [LOGIN.PASSWORDLESS]: "email",
};
const padUrlString = (url) => (url.href.endsWith("/") ? url.href : `${url.href}/`);
/**
 * Returns a random number. Don't use for cryptographic purposes.
 * @returns a random number
 */
const randomId = () => Math.random().toString(36).slice(2);
const broadcastChannelOptions = {
  // type: 'localstorage', // (optional) enforce a type, oneOf['native', 'idb', 'localstorage', 'node']
  webWorkerSupport: false, // (optional) set this to false if you know that your channel will never be used in a WebWorker (increases performance)
};
function caseSensitiveField(field, isCaseSensitive) {
  return isCaseSensitive ? field : field.toLowerCase();
}
const getVerifierId = (userInfo, typeOfLogin, verifierIdField, isVerifierIdCaseSensitive = true) => {
  const { name, sub } = userInfo;
  if (verifierIdField) return caseSensitiveField(userInfo[verifierIdField], isVerifierIdCaseSensitive);
  switch (typeOfLogin) {
    case LOGIN.PASSWORDLESS:
    case LOGIN.EMAIL_PASSWORD:
      return caseSensitiveField(name, isVerifierIdCaseSensitive);
    case LOGIN.WEIBO:
    case LOGIN.GITHUB:
    case LOGIN.TWITTER:
    case LOGIN.APPLE:
    case LOGIN.LINKEDIN:
    case LOGIN.LINE:
    case LOGIN.JWT:
      return caseSensitiveField(sub, isVerifierIdCaseSensitive);
    default:
      throw new Error("Invalid login type");
  }
};
const handleRedirectParameters = (hash, queryParameters) => {
  const hashParameters = hash.split("&").reduce((result, item) => {
    const [part0, part1] = item.split("=");
    result[part0] = part1;
    return result;
  }, {});
  log.info(hashParameters, queryParameters);
  let instanceParameters = {};
  let error = "";
  if (Object.keys(hashParameters).length > 0 && hashParameters.state) {
    instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(hashParameters.state)))) || {};
    error = hashParameters.error_description || hashParameters.error || error;
  } else if (Object.keys(queryParameters).length > 0 && queryParameters.state) {
    instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(queryParameters.state)))) || {};
    if (queryParameters.error) error = queryParameters.error;
  }
  return { error, instanceParameters, hashParameters };
};
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
const storageStatus = {
  [REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE]: storageAvailable(REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE),
  [REDIRECT_PARAMS_STORAGE_METHOD.SESSION_STORAGE]: storageAvailable(REDIRECT_PARAMS_STORAGE_METHOD.SESSION_STORAGE),
};
function storeLoginDetails(params, storageMethod, scope) {
  if (storageStatus[storageMethod]) {
    window[storageMethod].setItem(`torus_login_${scope}`, JSON.stringify(params));
  }
}
function retrieveLoginDetails(storageMethod, scope) {
  if (storageStatus[storageMethod]) {
    const loginDetails = window[storageMethod].getItem(`torus_login_${scope}`);
    return JSON.parse(loginDetails || "{}");
  }
  throw new Error("Unable to retrieve stored login details");
}
function clearLoginDetailsStorage(storageMethod, scope) {
  if (storageStatus[storageMethod]) {
    window[storageMethod].removeItem(`torus_login_${scope}`);
  }
}
function clearOrphanedLoginDetails(storageMethod) {
  if (storageStatus[storageMethod]) {
    const allStorageKeys = Object.keys(window[storageMethod]);
    allStorageKeys.forEach((key) => {
      if (key.startsWith("torus_login_")) {
        window[storageMethod].removeItem(key);
      }
    });
  }
}
function getPopupFeatures() {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const w = 1200;
  const h = 700;
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;
  const systemZoom = 1; // No reliable estimate
  const left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
  const top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
  const features = `titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=${h / systemZoom},width=${w / systemZoom},top=${top},left=${left}`;
  return features;
}
const isFirefox = () => {
  var _a;
  return (
    ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0
      ? void 0
      : _a.userAgent.toLowerCase().indexOf("firefox")) > -1 || false
  );
};
function constructURL(params) {
  const { baseURL, query, hash } = params;
  const url = new URL(baseURL);
  if (query) {
    Object.keys(query).forEach((key) => {
      url.searchParams.append(key, query[key]);
    });
  }
  if (hash) {
    const h = new URL(constructURL({ baseURL, query: hash })).searchParams.toString();
    url.hash = h;
  }
  return url.toString();
}

class PopupHandler extends EventEmitter {
  constructor({ url, target, features }) {
    super();
    this.url = url;
    this.target = target || "_blank";
    this.features = features || getPopupFeatures();
    this.window = undefined;
    this.windowTimer = undefined;
    this.iClosedWindow = false;
    this._setupTimer();
  }
  _setupTimer() {
    this.windowTimer = Number(
      setInterval(() => {
        if (this.window && this.window.closed) {
          clearInterval(this.windowTimer);
          if (!this.iClosedWindow) {
            this.emit("close");
          }
          this.iClosedWindow = false;
          this.window = undefined;
        }
        if (this.window === undefined) clearInterval(this.windowTimer);
      }, 500)
    );
  }
  open() {
    var _a;
    this.window = window.open(this.url.href, this.target, this.features);
    if ((_a = this.window) === null || _a === void 0 ? void 0 : _a.focus) this.window.focus();
    return Promise.resolve();
  }
  close() {
    this.iClosedWindow = true;
    if (this.window) this.window.close();
  }
  redirect(locationReplaceOnRedirect) {
    if (locationReplaceOnRedirect) {
      window.location.replace(this.url.href);
    } else {
      window.location.href = this.url.href;
    }
  }
}

class AbstractLoginHandler {
  // Not using object constructor because of this issue
  // https://github.com/microsoft/TypeScript/issues/5326
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.nonce = randomId();
  }
  get state() {
    return encodeURIComponent(
      window.btoa(
        JSON.stringify(
          Object.assign(Object.assign({}, this.customState || {}), {
            instanceId: this.nonce,
            verifier: this.verifier,
            typeOfLogin: this.typeOfLogin,
            redirectToOpener: this.redirectToOpener || false,
          })
        )
      )
    );
  }
  handleLoginWindow(params) {
    const verifierWindow = new PopupHandler({ url: this.finalURL, features: params.popupFeatures });
    if (this.uxMode === UX_MODE.REDIRECT) {
      verifierWindow.redirect(params.locationReplaceOnRedirect);
    } else {
      return new Promise((resolve, reject) => {
        let bc;
        const handleData = (ev) =>
          __awaiter(this, void 0, void 0, function* () {
            try {
              const { error, data } = ev;
              const _a = data || {},
                { instanceParams } = _a,
                _b = _a.hashParams,
                { access_token: accessToken, id_token: idToken } = _b,
                rest = __rest(_b, ["access_token", "id_token"]);
              if (error) {
                log.error(ev);
                reject(new Error(`Error: ${error}. Info: ${JSON.stringify(ev.data || {})}`));
                return;
              }
              if (ev.data && instanceParams.verifier === this.verifier) {
                log.info(ev.data);
                if (!this.redirectToOpener && bc) yield bc.postMessage({ success: true });
                resolve(
                  Object.assign(Object.assign({ accessToken, idToken: idToken || "" }, rest), {
                    // State has to be last here otherwise it will be overwritten
                    state: instanceParams,
                  })
                );
              }
            } catch (error) {
              log.error(error);
              reject(error);
            }
          });
        if (!this.redirectToOpener) {
          bc = new BroadcastChannel(`redirect_channel_${this.nonce}`, broadcastChannelOptions);
          bc.addEventListener("message", (ev) =>
            __awaiter(this, void 0, void 0, function* () {
              yield handleData(ev);
              bc.close();
              verifierWindow.close();
            })
          );
        } else {
          const postMessageEventHandler = (postMessageEvent) =>
            __awaiter(this, void 0, void 0, function* () {
              if (!postMessageEvent.data) return;
              const ev = postMessageEvent.data;
              if (ev.channel !== `redirect_channel_${this.nonce}`) return;
              window.removeEventListener("message", postMessageEventHandler);
              handleData(ev);
              verifierWindow.close();
            });
          window.addEventListener("message", postMessageEventHandler);
        }
        verifierWindow.open();
        verifierWindow.once("close", () => {
          if (bc) bc.close();
          reject(new Error("user closed popup"));
        });
      });
    }
    return null;
  }
}

class DiscordHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.RESPONSE_TYPE = "token";
    this.SCOPE = "identify email";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL("https://discordapp.com/api/oauth2/authorize");
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { accessToken } = params;
      const userInfo = yield get("https://discordapp.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { id, avatar, email = "", username: name = "", discriminator = "" } = userInfo;
      const profileImage =
        avatar === null
          ? `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png`
          : `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=2048`;
      return {
        profileImage,
        name: `${name}#${discriminator}`,
        email,
        verifierId: id,
        verifier: this.verifier,
        typeOfLogin: this.typeOfLogin,
      };
    });
  }
}

class FacebookHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.RESPONSE_TYPE = "token";
    this.SCOPE = "public_profile email";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL("https://www.facebook.com/v6.0/dialog/oauth");
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { accessToken } = params;
      const userInfo = yield get("https://graph.facebook.com/me?fields=name,email,picture.type(large)", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name = "", id, picture, email = "" } = userInfo;
      return {
        email,
        name,
        profileImage: picture.data.url || "",
        verifier: this.verifier,
        verifierId: id,
        typeOfLogin: this.typeOfLogin,
      };
    });
  }
}

class GoogleHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.RESPONSE_TYPE = "token id_token";
    this.SCOPE = "profile email openid";
    this.PROMPT = "consent select_account";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        prompt: this.PROMPT,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
        nonce: this.nonce,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { accessToken } = params;
      const userInfo = yield get("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { picture: profileImage = "", email = "", name = "" } = userInfo;
      return {
        email,
        name,
        profileImage,
        verifier: this.verifier,
        verifierId: email.toLowerCase(),
        typeOfLogin: this.typeOfLogin,
      };
    });
  }
}

class JwtHandler$1 extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.SCOPE = "openid profile email";
    this.RESPONSE_TYPE = "token id_token";
    this.PROMPT = "login";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const { domain } = this.jwtParams;
    const finalUrl = new URL(domain);
    finalUrl.pathname += finalUrl.pathname.endsWith("/") ? "authorize" : "/authorize";
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
    delete clonedParams.domain;
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        prompt: this.PROMPT,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
        connection: loginToConnectionMap[this.typeOfLogin],
        nonce: this.nonce,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive, user_info_route = "userinfo" } = this.jwtParams;
      if (accessToken) {
        try {
          const domainUrl = new URL(domain);
          const userInfo = yield get(`${padUrlString(domainUrl)}${user_info_route}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { picture, name, email } = userInfo;
          return {
            email,
            name,
            profileImage: picture,
            verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
            verifier: this.verifier,
            typeOfLogin: this.typeOfLogin,
          };
        } catch (error) {
          // ignore
          log$1.warn(error, "Unable to get userinfo from endpoint");
        }
      }
      if (idToken) {
        const decodedToken = jwtDecode(idToken);
        const { name, email, picture } = decodedToken;
        return {
          profileImage: picture,
          name,
          email,
          verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
          verifier: this.verifier,
          typeOfLogin: this.typeOfLogin,
        };
      }
      throw new Error("Access/id token not available");
    });
  }
}

class MockLoginHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.setFinalUrl();
  }
  setFinalUrl() {
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
    delete clonedParams.domain;
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        client_id: this.clientId,
        nonce: this.nonce,
      },
      clonedParams
    );
    this.finalURL = new URL(constructURL({ baseURL: this.redirect_uri, query: null, hash: finalJwtParams }));
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive, user_info_route = "userinfo" } = this.jwtParams;
      if (accessToken) {
        try {
          const domainUrl = new URL(domain);
          const userInfo = yield get(`${padUrlString(domainUrl)}${user_info_route}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { picture, name, email } = userInfo;
          return {
            email,
            name,
            profileImage: picture,
            verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
            verifier: this.verifier,
            typeOfLogin: this.typeOfLogin,
          };
        } catch (error) {
          // ignore
          log$1.warn(error, "Unable to get userinfo from endpoint");
        }
      }
      if (idToken) {
        const decodedToken = jwtDecode(idToken);
        const { name, email, picture } = decodedToken;
        return {
          profileImage: picture,
          name,
          email,
          verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
          verifier: this.verifier,
          typeOfLogin: this.typeOfLogin,
        };
      }
      throw new Error("Access/id token not available");
    });
  }
  handleLoginWindow(params) {
    const { id_token: idToken, access_token: accessToken } = this.jwtParams;
    const verifierWindow = new PopupHandler({ url: this.finalURL, features: params.popupFeatures });
    if (this.uxMode === UX_MODE.REDIRECT) {
      verifierWindow.redirect(params.locationReplaceOnRedirect);
    } else {
      return Promise.resolve({
        state: {},
        idToken,
        accessToken,
      });
    }
    return null;
  }
}

class JwtHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.SCOPE = "openid profile email";
    this.RESPONSE_TYPE = "token id_token";
    this.PROMPT = "login";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const { domain } = this.jwtParams;
    const domainUrl = new URL(domain);
    domainUrl.pathname = "/passwordless/start";
    this.finalURL = domainUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive } = this.jwtParams;
      try {
        const domainUrl = new URL(domain);
        const userInfo = yield get(`${padUrlString(domainUrl)}userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { picture, name, email } = userInfo;
        return {
          email,
          name,
          profileImage: picture,
          verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
          verifier: this.verifier,
          typeOfLogin: this.typeOfLogin,
        };
      } catch (error) {
        log.error(error);
        const decodedToken = jwtDecode(idToken);
        const { name, email, picture } = decodedToken;
        return {
          profileImage: picture,
          name,
          email,
          verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
          verifier: this.verifier,
          typeOfLogin: this.typeOfLogin,
        };
      }
    });
  }
  handleLoginWindow() {
    return new Promise((resolve, reject) => {
      if (this.redirectToOpener) {
        reject(new Error("Cannot use redirect to opener for passwordless"));
        return;
      }
      const handleData = (ev) => {
        try {
          const { error, data } = ev;
          const _a = data || {},
            { instanceParams } = _a,
            _b = _a.hashParams,
            { access_token: accessToken, id_token: idToken } = _b,
            rest = __rest(_b, ["access_token", "id_token"]);
          if (error) {
            log.error(ev.error);
            reject(new Error(error));
            return;
          }
          if (ev.data && instanceParams.verifier === this.verifier) {
            log.info(ev.data);
            resolve(Object.assign(Object.assign({ accessToken, idToken: idToken || "" }, rest), { state: instanceParams }));
          }
        } catch (error) {
          log.error(error);
          reject(error);
        }
      };
      const bc = new BroadcastChannel(`redirect_channel_${this.nonce}`, broadcastChannelOptions);
      bc.addEventListener("message", (ev) =>
        __awaiter(this, void 0, void 0, function* () {
          handleData(ev);
          bc.close();
        })
      );
      try {
        const { connection = "email", login_hint } = this.jwtParams;
        const finalJwtParams = deepmerge(
          {
            client_id: this.clientId,
            connection,
            email: connection === "email" ? login_hint : undefined,
            phone_number: connection === "sms" ? login_hint : undefined,
            send: "link",
            authParams: {
              scope: this.SCOPE,
              state: this.state,
              response_type: this.RESPONSE_TYPE,
              redirect_uri: this.redirect_uri,
              nonce: this.nonce,
              prompt: this.PROMPT,
            },
          },
          {
            authParams: this.jwtParams,
          }
        );
        // using stringify and parse to remove undefined params
        // This method is only resolved when the user clicks the email link
        post(this.finalURL.href, JSON.parse(JSON.stringify(finalJwtParams)))
          .then((response) => {
            log.info("posted", response);
            return undefined;
          })
          .catch((error) => {
            log.error(error);
            reject(error);
          });
      } catch (error) {
        log.error(error);
        reject(error);
      }
    });
  }
}

class RedditHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.RESPONSE_TYPE = "token";
    this.SCOPE = "identity";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL(`https://www.reddit.com/api/v1/authorize${window.innerWidth < 600 ? ".compact" : ""}`);
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { accessToken } = params;
      const userInfo = yield get("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { icon_img: profileImage = "", name = "" } = userInfo;
      return {
        email: "",
        name,
        profileImage: profileImage.split("?").length > 0 ? profileImage.split("?")[0] : profileImage,
        verifier: this.verifier,
        verifierId: name.toLowerCase(),
        typeOfLogin: this.typeOfLogin,
      };
    });
  }
}

class TwitchHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.RESPONSE_TYPE = "token";
    this.SCOPE = "user:read:email";
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL("https://id.twitch.tv/oauth2/authorize");
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        state: this.state,
        response_type: this.RESPONSE_TYPE,
        client_id: this.clientId,
        redirect_uri: this.redirect_uri,
        scope: this.SCOPE,
        force_verify: true,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const { accessToken } = params;
      const userInfo = yield get("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-ID": this.clientId,
        },
      });
      const [{ profile_image_url: profileImage = "", display_name: name = "", email = "", id: verifierId }] = userInfo.data || [];
      return {
        profileImage,
        name,
        email,
        verifierId,
        verifier: this.verifier,
        typeOfLogin: this.typeOfLogin,
      };
    });
  }
}

const WEBAUTHN_LOOKUP_SERVER = "https://api.webauthn.openlogin.com";
class WebAuthnHandler extends AbstractLoginHandler {
  constructor(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly) {
    super(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
    this.registerOnly = registerOnly;
    this.setFinalUrl();
  }
  setFinalUrl() {
    const finalUrl = new URL("https://webauthn.openlogin.com");
    const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
    const finalJwtParams = deepmerge(
      {
        register_only: !!this.registerOnly,
        state: this.state,
        client_id: this.clientId,
        redirect_uri: this.redirect_uri,
      },
      clonedParams
    );
    Object.keys(finalJwtParams).forEach((key) => {
      if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
    });
    this.finalURL = finalUrl;
  }
  getUserInfo(parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      const { idToken, ref, extraParamsPassed, extraParams } = parameters;
      let verifierId;
      let signature;
      let clientDataJSON;
      let authenticatorData;
      let publicKey;
      let challenge;
      let rpOrigin;
      let credId;
      if (extraParamsPassed === "true") {
        log.debug("extraParamsPassed is true, using extraParams passed through hashParams");
        try {
          ({
            verifier_id: verifierId,
            signature,
            clientDataJSON,
            authenticatorData,
            publicKey,
            challenge,
            rpOrigin,
            credId,
          } = JSON.parse(atob(extraParams)));
        } catch (error) {
          log.warn("unable to parse extraParams", error);
          ({
            verifier_id: verifierId,
            signature,
            clientDataJSON,
            authenticatorData,
            publicKey,
            challenge,
            rpOrigin,
            credId,
          } = yield get(`${WEBAUTHN_LOOKUP_SERVER}/signature/fetch/${idToken}`));
        }
      } else {
        log.debug("extraParamsPassed is false, using extraParams passed through bridge server");
        ({
          verifier_id: verifierId,
          signature,
          clientDataJSON,
          authenticatorData,
          publicKey,
          challenge,
          rpOrigin,
          credId,
        } = yield get(`${WEBAUTHN_LOOKUP_SERVER}/signature/fetch/${idToken}`));
      }
      if (signature !== idToken) {
        throw new Error("idtoken should be equal to signature");
      }
      return {
        email: "",
        name: "WebAuthn Login",
        profileImage: "",
        verifier: this.verifier,
        verifierId,
        typeOfLogin: this.typeOfLogin,
        ref,
        registerOnly: this.registerOnly,
        extraVerifierParams: {
          signature,
          clientDataJSON,
          authenticatorData,
          publicKey,
          challenge,
          rpOrigin,
          credId,
        },
      };
    });
  }
}

const createHandler = ({ clientId, redirect_uri, typeOfLogin, verifier, jwtParams, redirectToOpener, uxMode, customState, registerOnly }) => {
  if (!verifier || !typeOfLogin || !clientId) {
    throw new Error("Invalid params");
  }
  const { domain, login_hint, id_token, access_token } = jwtParams || {};
  switch (typeOfLogin) {
    case LOGIN.GOOGLE:
      return new GoogleHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.FACEBOOK:
      return new FacebookHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.TWITCH:
      return new TwitchHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.REDDIT:
      return new RedditHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.DISCORD:
      return new DiscordHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.PASSWORDLESS:
      if (!domain || !login_hint) throw new Error("Invalid params");
      return new JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.APPLE:
    case LOGIN.GITHUB:
    case LOGIN.LINKEDIN:
    case LOGIN.TWITTER:
    case LOGIN.WEIBO:
    case LOGIN.LINE:
    case LOGIN.EMAIL_PASSWORD:
    case LOGIN.JWT:
      if (!domain) throw new Error("Invalid params");
      if (id_token || access_token) {
        return new MockLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      }
      return new JwtHandler$1(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    case LOGIN.WEBAUTHN:
      return new WebAuthnHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly);
    default:
      throw new Error("Invalid login type");
  }
};

var SkipTorusKey;
(function (SkipTorusKey) {
  SkipTorusKey[(SkipTorusKey["Never"] = 0)] = "Never";
  SkipTorusKey[(SkipTorusKey["IfNew"] = 1)] = "IfNew";
  SkipTorusKey[(SkipTorusKey["Always"] = 2)] = "Always";
})(SkipTorusKey || (SkipTorusKey = {}));

const registerServiceWorker = (baseUrl) =>
  new Promise((resolve, reject) => {
    const swUrl = `${baseUrl}sw.js`;
    if ("serviceWorker" in window.navigator) {
      // if swIntegrity is not calculated
      register(swUrl, {
        ready() {
          log.info("App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB");
          resolve(undefined);
        },
        registered() {
          log.info("Service worker has been registered.");
          resolve(undefined);
        },
        cached() {
          log.info("Content has been cached for offline use.");
          resolve(undefined);
        },
        updatefound() {
          log.info("New content is downloading.");
        },
        updated() {
          log.info("New content is available; please refresh.");
        },
        offline() {
          log.info("No internet connection found. App is running in offline mode.");
          reject(new Error("App is offline"));
        },
        error(error) {
          log.error("Error during service worker registration:", error);
          reject(error);
        },
      });
    } else {
      reject(new Error("Service workers are not supported"));
    }
  });

class CustomAuth {
  constructor({
    baseUrl,
    network = TORUS_NETWORK.MAINNET,
    proxyContractAddress,
    enableLogging = false,
    enableOneKey = false,
    redirectToOpener = false,
    redirectPathName = "redirect",
    apiKey = "torus-default",
    uxMode = UX_MODE.POPUP,
    redirectParamsStorageMethod = REDIRECT_PARAMS_STORAGE_METHOD.SESSION_STORAGE,
    locationReplaceOnRedirect = false,
    popupFeatures,
    skipFetchingNodeDetails = false,
    metadataUrl = "https://metadata.tor.us",
  }) {
    this.isInitialized = false;
    const baseUri = new URL(baseUrl);
    this.config = {
      baseUrl: padUrlString(baseUri),
      get redirect_uri() {
        return `${this.baseUrl}${redirectPathName}`;
      },
      redirectToOpener,
      uxMode,
      redirectParamsStorageMethod,
      locationReplaceOnRedirect,
      popupFeatures,
    };
    const torus = new Torus({
      enableOneKey,
      metadataHost: metadataUrl,
      allowHost: "https://signer.tor.us/api/allow",
    });
    Torus.setAPIKey(apiKey);
    this.torus = torus;
    const ethNetwork = network === TORUS_NETWORK.TESTNET ? ETHEREUM_NETWORK.ROPSTEN : network;
    this.nodeDetailManager = new NodeDetailManager({ network: ethNetwork, proxyAddress: proxyContractAddress || CONTRACT_MAP[network] });
    if (!skipFetchingNodeDetails) this.nodeDetailManager.getNodeDetails(false, true);
    if (enableLogging) log.enableAll();
    else log.disableAll();
  }
  init({ skipSw = false, skipInit = false, skipPrefetch = false } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      if (skipInit) {
        this.isInitialized = true;
        return;
      }
      if (!skipSw) {
        const fetchSwResponse = yield fetch(`${this.config.baseUrl}sw.js`, { cache: "reload" });
        if (fetchSwResponse.ok) {
          try {
            yield registerServiceWorker(this.config.baseUrl);
            this.isInitialized = true;
            return;
          } catch (error) {
            log.warn(error);
          }
        } else {
          throw new Error("Service worker is not being served. Please serve it");
        }
      }
      if (!skipPrefetch) {
        // Skip the redirect check for firefox
        if (isFirefox()) {
          this.isInitialized = true;
          return;
        }
        yield this.handlePrefetchRedirectUri();
        return;
      }
      this.isInitialized = true;
    });
  }
  triggerLogin(args) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
      const {
        verifier,
        typeOfLogin,
        clientId,
        jwtParams,
        hash,
        queryParameters,
        customState,
        registerOnly,
        skipTorusKey = SkipTorusKey.Never,
        checkIfNewKey = false,
      } = args;
      log.info("Verifier: ", verifier);
      if (!this.isInitialized) {
        throw new Error("Not initialized yet");
      }
      if (registerOnly && typeOfLogin !== LOGIN.WEBAUTHN) throw new Error("registerOnly flag can only be passed for webauthn");
      const loginHandler = createHandler({
        typeOfLogin,
        clientId,
        verifier,
        redirect_uri: this.config.redirect_uri,
        redirectToOpener: this.config.redirectToOpener,
        jwtParams,
        uxMode: this.config.uxMode,
        customState,
        registerOnly,
      });
      let loginParams;
      if (hash && queryParameters) {
        const { error, hashParameters, instanceParameters } = handleRedirectParameters(hash, queryParameters);
        if (error) throw new Error(error);
        const { access_token: accessToken, id_token: idToken } = hashParameters,
          rest = __rest(hashParameters, ["access_token", "id_token"]);
        // State has to be last here otherwise it will be overwritten
        loginParams = Object.assign(Object.assign({ accessToken, idToken }, rest), { state: instanceParameters });
      } else {
        clearOrphanedLoginDetails(this.config.redirectParamsStorageMethod);
        storeLoginDetails({ method: TORUS_METHOD.TRIGGER_LOGIN, args }, this.config.redirectParamsStorageMethod, loginHandler.nonce);
        loginParams = yield loginHandler.handleLoginWindow({
          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
          popupFeatures: this.config.popupFeatures,
        });
        if (this.config.uxMode === UX_MODE.REDIRECT) return null;
      }
      const userInfo = yield loginHandler.getUserInfo(loginParams);
      if (registerOnly) {
        const { torusNodeEndpoints, torusNodePub } = yield this.nodeDetailManager.getNodeDetails(false, true);
        const torusPubKey = yield this.torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId: userInfo.verifierId }, true);
        const res = {
          userInfo: Object.assign(Object.assign({}, userInfo), loginParams),
        };
        if (typeof torusPubKey === "string") {
          throw new Error("should have returned extended pub key");
        }
        const torusKey = {
          typeOfUser: torusPubKey.typeOfUser,
          pubKey: {
            pub_key_X: torusPubKey.X,
            pub_key_Y: torusPubKey.Y,
          },
          publicAddress: torusPubKey.address,
          privateKey: null,
          metadataNonce: null,
        };
        return Object.assign(Object.assign({}, res), torusKey);
      }
      let skip = true;
      let existingPk;
      if (checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew) {
        const { torusNodeEndpoints } = yield this.nodeDetailManager.getNodeDetails(false, true);
        const lookupData = yield keyLookup(torusNodeEndpoints, verifier, userInfo.verifierId);
        existingPk = (
          (_b = (_a = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _a === void 0 ? void 0 : _a.keys) ===
            null || _b === void 0
            ? void 0
            : _b.length
        )
          ? {
              X:
                (_c = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _c === void 0
                  ? void 0
                  : _c.keys[0].pub_key_X,
              Y:
                (_d = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _d === void 0
                  ? void 0
                  : _d.keys[0].pub_key_Y,
            }
          : undefined;
      }
      switch (skipTorusKey) {
        case SkipTorusKey.IfNew:
          skip = !existingPk;
          break;
        case SkipTorusKey.Always:
          skip = true;
          break;
        case SkipTorusKey.Never:
          skip = false;
          break;
        default:
          throw new Error("Invalid SkipTorusKey");
      }
      const torusKey = skip
        ? undefined
        : yield this.getTorusKey(
            verifier,
            userInfo.verifierId,
            { verifier_id: userInfo.verifierId },
            loginParams.idToken || loginParams.accessToken,
            userInfo.extraVerifierParams
          );
      return Object.assign(Object.assign({}, torusKey), { existingPk, userInfo: Object.assign(Object.assign({}, userInfo), loginParams) });
    });
  }
  triggerAggregateLogin(args) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
      // This method shall break if any of the promises fail. This behaviour is intended
      const { aggregateVerifierType, verifierIdentifier, subVerifierDetailsArray, skipTorusKey = SkipTorusKey.Never, checkIfNewKey = false } = args;
      if (!this.isInitialized) {
        throw new Error("Not initialized yet");
      }
      if (!aggregateVerifierType || !verifierIdentifier || !Array.isArray(subVerifierDetailsArray)) {
        throw new Error("Invalid params");
      }
      if (aggregateVerifierType === AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID && subVerifierDetailsArray.length !== 1) {
        throw new Error("Single id verifier can only have one sub verifier");
      }
      const userInfoPromises = [];
      const loginParamsArray = [];
      for (const subVerifierDetail of subVerifierDetailsArray) {
        const { clientId, typeOfLogin, verifier, jwtParams, hash, queryParameters, customState } = subVerifierDetail;
        const loginHandler = createHandler({
          typeOfLogin,
          clientId,
          verifier,
          redirect_uri: this.config.redirect_uri,
          redirectToOpener: this.config.redirectToOpener,
          jwtParams,
          uxMode: this.config.uxMode,
          customState,
        });
        // We let the user login to each verifier in a loop. Don't wait for key derivation here.!
        let loginParams;
        if (hash && queryParameters) {
          const { error, hashParameters, instanceParameters } = handleRedirectParameters(hash, queryParameters);
          if (error) throw new Error(error);
          const { access_token: accessToken, id_token: idToken } = hashParameters,
            rest = __rest(hashParameters, ["access_token", "id_token"]);
          // State has to be last here otherwise it will be overwritten
          loginParams = Object.assign(Object.assign({ accessToken, idToken }, rest), { state: instanceParameters });
        } else {
          clearOrphanedLoginDetails(this.config.redirectParamsStorageMethod);
          storeLoginDetails({ method: TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN, args }, this.config.redirectParamsStorageMethod, loginHandler.nonce);
          loginParams = yield loginHandler.handleLoginWindow({
            locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
            popupFeatures: this.config.popupFeatures,
          });
          if (this.config.uxMode === UX_MODE.REDIRECT) return null;
        }
        // Fail the method even if one promise fails
        userInfoPromises.push(loginHandler.getUserInfo(loginParams));
        loginParamsArray.push(loginParams);
      }
      const _userInfoArray = yield Promise.all(userInfoPromises);
      const userInfoArray = _userInfoArray.map((userInfo) => Object.assign(Object.assign({}, userInfo), { aggregateVerifier: verifierIdentifier }));
      const aggregateVerifierParams = { verify_params: [], sub_verifier_ids: [], verifier_id: "" };
      const aggregateIdTokenSeeds = [];
      let aggregateVerifierId = "";
      let extraVerifierParams = {};
      for (let index = 0; index < subVerifierDetailsArray.length; index += 1) {
        const loginParams = loginParamsArray[index];
        const { idToken, accessToken } = loginParams;
        const userInfo = userInfoArray[index];
        aggregateVerifierParams.verify_params.push({ verifier_id: userInfo.verifierId, idtoken: idToken || accessToken });
        aggregateVerifierParams.sub_verifier_ids.push(userInfo.verifier);
        aggregateIdTokenSeeds.push(idToken || accessToken);
        aggregateVerifierId = userInfo.verifierId; // using last because idk
        extraVerifierParams = userInfo.extraVerifierParams;
      }
      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = keccak256(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
      aggregateVerifierParams.verifier_id = aggregateVerifierId;
      const userInfoData = userInfoArray.map((x, index) => Object.assign(Object.assign({}, x), loginParamsArray[index]));
      let skip = true;
      let existingPk;
      if (checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew) {
        const { torusNodeEndpoints } = yield this.nodeDetailManager.getNodeDetails(false, true);
        const lookupData = yield keyLookup(torusNodeEndpoints, args.verifierIdentifier, userInfoData[0].verifierId);
        existingPk = (
          (_b = (_a = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _a === void 0 ? void 0 : _a.keys) ===
            null || _b === void 0
            ? void 0
            : _b.length
        )
          ? {
              X:
                (_c = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _c === void 0
                  ? void 0
                  : _c.keys[0].pub_key_X,
              Y:
                (_d = lookupData === null || lookupData === void 0 ? void 0 : lookupData.keyResult) === null || _d === void 0
                  ? void 0
                  : _d.keys[0].pub_key_Y,
            }
          : undefined;
      }
      switch (skipTorusKey) {
        case SkipTorusKey.IfNew:
          skip = !existingPk;
          break;
        case SkipTorusKey.Always:
          skip = true;
          break;
        case SkipTorusKey.Never:
          skip = false;
          break;
        default:
          throw new Error("Invalid SkipTorusKey");
      }
      const torusKey = skip
        ? undefined
        : yield this.getTorusKey(verifierIdentifier, aggregateVerifierId, aggregateVerifierParams, aggregateIdToken, extraVerifierParams);
      return Object.assign(Object.assign({}, torusKey), { existingPk, userInfo: userInfoData });
    });
  }
  triggerHybridAggregateLogin(args) {
    return __awaiter(this, void 0, void 0, function* () {
      const { singleLogin, aggregateLoginParams } = args;
      // This method shall break if any of the promises fail. This behaviour is intended
      if (!this.isInitialized) {
        throw new Error("Not initialized yet");
      }
      if (
        !aggregateLoginParams.aggregateVerifierType ||
        !aggregateLoginParams.verifierIdentifier ||
        !Array.isArray(aggregateLoginParams.subVerifierDetailsArray)
      ) {
        throw new Error("Invalid params");
      }
      if (
        aggregateLoginParams.aggregateVerifierType === AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID &&
        aggregateLoginParams.subVerifierDetailsArray.length !== 1
      ) {
        throw new Error("Single id verifier can only have one sub verifier");
      }
      const { typeOfLogin, clientId, verifier, jwtParams, hash, queryParameters, customState } = singleLogin;
      const loginHandler = createHandler({
        typeOfLogin,
        clientId,
        verifier,
        redirect_uri: this.config.redirect_uri,
        redirectToOpener: this.config.redirectToOpener,
        jwtParams,
        uxMode: this.config.uxMode,
        customState,
      });
      let loginParams;
      if (hash && queryParameters) {
        const { error, hashParameters, instanceParameters } = handleRedirectParameters(hash, queryParameters);
        if (error) throw new Error(error);
        const { access_token: accessToken, id_token: idToken } = hashParameters,
          rest = __rest(hashParameters, ["access_token", "id_token"]);
        // State has to be last here otherwise it will be overwritten
        loginParams = Object.assign(Object.assign({ accessToken, idToken }, rest), { state: instanceParameters });
      } else {
        clearOrphanedLoginDetails(this.config.redirectParamsStorageMethod);
        storeLoginDetails({ method: TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN, args }, this.config.redirectParamsStorageMethod, loginHandler.nonce);
        loginParams = yield loginHandler.handleLoginWindow({
          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
          popupFeatures: this.config.popupFeatures,
        });
        if (this.config.uxMode === UX_MODE.REDIRECT) return null;
      }
      const userInfo = yield loginHandler.getUserInfo(loginParams);
      const torusKey1Promise = this.getTorusKey(
        verifier,
        userInfo.verifierId,
        { verifier_id: userInfo.verifierId },
        loginParams.idToken || loginParams.accessToken,
        userInfo.extraVerifierParams
      );
      const { verifierIdentifier, subVerifierDetailsArray } = aggregateLoginParams;
      const aggregateVerifierParams = { verify_params: [], sub_verifier_ids: [], verifier_id: "" };
      const aggregateIdTokenSeeds = [];
      let aggregateVerifierId = "";
      for (let index = 0; index < subVerifierDetailsArray.length; index += 1) {
        const sub = subVerifierDetailsArray[index];
        const { idToken, accessToken } = loginParams;
        aggregateVerifierParams.verify_params.push({ verifier_id: userInfo.verifierId, idtoken: idToken || accessToken });
        aggregateVerifierParams.sub_verifier_ids.push(sub.verifier);
        aggregateIdTokenSeeds.push(idToken || accessToken);
        aggregateVerifierId = userInfo.verifierId; // using last because idk
      }
      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = keccak256(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
      aggregateVerifierParams.verifier_id = aggregateVerifierId;
      const torusKey2Promise = this.getTorusKey(
        verifierIdentifier,
        aggregateVerifierId,
        aggregateVerifierParams,
        aggregateIdToken,
        userInfo.extraVerifierParams
      );
      const [torusKey1, torusKey2] = yield Promise.all([torusKey1Promise, torusKey2Promise]);
      return {
        singleLogin: Object.assign({ userInfo: Object.assign(Object.assign({}, userInfo), loginParams) }, torusKey1),
        aggregateLogins: [torusKey2],
      };
    });
  }
  getTorusKey(verifier, verifierId, verifierParams, idToken, additionalParams) {
    return __awaiter(this, void 0, void 0, function* () {
      const { torusNodeEndpoints, torusNodePub, torusIndexes } = yield this.nodeDetailManager.getNodeDetails(false, true);
      log.debug("torus-direct/getTorusKey", { torusNodeEndpoints, torusNodePub, torusIndexes });
      const address = yield this.torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId }, true);
      if (typeof address === "string") throw new Error("must use extended pub key");
      log.debug("torus-direct/getTorusKey", { getPublicAddress: address });
      const shares = yield this.torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, verifierParams, idToken, additionalParams);
      if (shares.ethAddress.toLowerCase() !== address.address.toLowerCase()) {
        throw new Error("data ethAddress does not match response address");
      }
      log.debug("torus-direct/getTorusKey", { retrieveShares: shares });
      return {
        publicAddress: shares.ethAddress.toString(),
        privateKey: shares.privKey.toString(),
        metadataNonce: shares.metadataNonce.toString("hex"),
        typeOfUser: address.typeOfUser,
        pubKey: {
          pub_key_X: address.X,
          pub_key_Y: address.Y,
        },
      };
    });
  }
  getAggregateTorusKey(
    verifier,
    verifierId, // unique identifier for user e.g. sub on jwt
    subVerifierInfoArray
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      const aggregateVerifierParams = { verify_params: [], sub_verifier_ids: [], verifier_id: "" };
      const aggregateIdTokenSeeds = [];
      let extraVerifierParams = {};
      for (let index = 0; index < subVerifierInfoArray.length; index += 1) {
        const userInfo = subVerifierInfoArray[index];
        aggregateVerifierParams.verify_params.push({ verifier_id: verifierId, idtoken: userInfo.idToken });
        aggregateVerifierParams.sub_verifier_ids.push(userInfo.verifier);
        aggregateIdTokenSeeds.push(userInfo.idToken);
        extraVerifierParams = userInfo.extraVerifierParams;
      }
      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = keccak256(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
      aggregateVerifierParams.verifier_id = verifierId;
      return this.getTorusKey(verifier, verifierId, aggregateVerifierParams, aggregateIdToken, extraVerifierParams);
    });
  }
  getPostboxKeyFrom1OutOf1(privKey, nonce) {
    return this.torus.getPostboxKeyFrom1OutOf1(privKey, nonce);
  }
  getRedirectResult({ replaceUrl = true, clearLoginDetails = true } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.init({ skipInit: true });
      const url = new URL(window.location.href);
      const hash = url.hash.substr(1);
      const queryParams = {};
      url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      if (replaceUrl) {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState(null, "", cleanUrl);
      }
      if (!hash && Object.keys(queryParams).length === 0) {
        throw new Error("Unable to fetch result from redirect");
      }
      const { error, instanceParameters, hashParameters } = handleRedirectParameters(hash, queryParams);
      const { instanceId } = instanceParameters;
      log.info(instanceId, "instanceId");
      const _a = retrieveLoginDetails(this.config.redirectParamsStorageMethod, instanceId),
        { args, method } = _a,
        rest = __rest(_a, ["args", "method"]);
      log.info(args, method);
      if (clearLoginDetails) {
        clearLoginDetailsStorage(this.config.redirectParamsStorageMethod, instanceId);
      }
      if (error) {
        const errorInstance = `Error: ${error}. Instance params: ${JSON.stringify(instanceParameters || {})}. Hash params: ${JSON.stringify(
          hashParameters || {}
        )}`;
        return { error: errorInstance, state: instanceParameters || {}, method, result: {}, hashParameters, args };
      }
      let result;
      try {
        if (method === TORUS_METHOD.TRIGGER_LOGIN) {
          const methodArgs = args;
          methodArgs.hash = hash;
          methodArgs.queryParameters = queryParams;
          result = yield this.triggerLogin(methodArgs);
        } else if (method === TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN) {
          const methodArgs = args;
          methodArgs.subVerifierDetailsArray.forEach((x) => {
            x.hash = hash;
            x.queryParameters = queryParams;
          });
          result = yield this.triggerAggregateLogin(methodArgs);
        } else if (method === TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN) {
          const methodArgs = args;
          methodArgs.singleLogin.hash = hash;
          methodArgs.singleLogin.queryParameters = queryParams;
          result = yield this.triggerHybridAggregateLogin(methodArgs);
        }
      } catch (err) {
        log.error(err);
        return Object.assign(
          {
            error: `Could not get result from torus nodes ${(err === null || err === void 0 ? void 0 : err.message) || ""}`,
            state: instanceParameters || {},
            method,
            result: {},
            hashParameters,
            args,
          },
          rest
        );
      }
      if (!result)
        return Object.assign({ error: "Unsupported method type", state: instanceParameters || {}, method, result: {}, hashParameters, args }, rest);
      return Object.assign({ method, result, state: instanceParameters || {}, hashParameters, args }, rest);
    });
  }
  handlePrefetchRedirectUri() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!document) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const redirectHtml = document.createElement("link");
        redirectHtml.href = this.config.redirect_uri;
        if (window.location.origin !== new URL(this.config.redirect_uri).origin) redirectHtml.crossOrigin = "anonymous";
        redirectHtml.type = "text/html";
        redirectHtml.rel = "prefetch";
        const resolveFn = () => {
          this.isInitialized = true;
          resolve();
        };
        try {
          if (redirectHtml.relList && redirectHtml.relList.supports) {
            if (redirectHtml.relList.supports("prefetch")) {
              redirectHtml.onload = resolveFn;
              redirectHtml.onerror = () => {
                reject(new Error(`Please serve redirect.html present in serviceworker folder of this package on ${this.config.redirect_uri}`));
              };
              document.head.appendChild(redirectHtml);
            } else {
              // Link prefetch is not supported. pass through
              resolveFn();
            }
          } else {
            // Link prefetch is not detectable. pass through
            resolveFn();
          }
        } catch (err) {
          resolveFn();
        }
      });
    });
  }
}

export {
  AGGREGATE_VERIFIER,
  CONTRACT_MAP,
  ETHEREUM_NETWORK,
  LOGIN,
  REDIRECT_PARAMS_STORAGE_METHOD,
  SkipTorusKey,
  TORUS_METHOD,
  TORUS_NETWORK,
  UX_MODE,
  broadcastChannelOptions,
  clearLoginDetailsStorage,
  clearOrphanedLoginDetails,
  constructURL,
  createHandler,
  CustomAuth as default,
  eventToPromise,
  getPopupFeatures,
  getVerifierId,
  handleRedirectParameters,
  isFirefox,
  loginToConnectionMap,
  padUrlString,
  randomId,
  retrieveLoginDetails,
  storageAvailable,
  storeLoginDetails,
};
//# sourceMappingURL=customauth.esm.js.map
