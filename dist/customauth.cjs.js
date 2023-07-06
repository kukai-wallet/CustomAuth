/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter = module && module.__esModule ? /******/ () => module["default"] : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);

  // EXPORTS
  __webpack_require__.d(__webpack_exports__, {
    AGGREGATE_VERIFIER: () => /* reexport */ AGGREGATE_VERIFIER,
    LOGIN: () => /* reexport */ LOGIN,
    REDIRECT_PARAMS_STORAGE_METHOD: () => /* reexport */ REDIRECT_PARAMS_STORAGE_METHOD,
    SENTRY_TXNS: () => /* reexport */ SENTRY_TXNS,
    SkipTorusKey: () => /* reexport */ SkipTorusKey,
    TORUS_METHOD: () => /* reexport */ TORUS_METHOD,
    UX_MODE: () => /* reexport */ UX_MODE,
    are3PCSupported: () => /* reexport */ are3PCSupported,
    broadcastChannelOptions: () => /* reexport */ broadcastChannelOptions,
    constructURL: () => /* reexport */ constructURL,
    createHandler: () => /* reexport */ HandlerFactory,
    default: () => /* reexport */ login,
    eventToPromise: () => /* reexport */ eventToPromise,
    getPopupFeatures: () => /* reexport */ getPopupFeatures,
    getVerifierId: () => /* reexport */ getVerifierId,
    handleRedirectParameters: () => /* reexport */ handleRedirectParameters,
    isFirefox: () => /* reexport */ isFirefox,
    loginToConnectionMap: () => /* reexport */ loginToConnectionMap,
    padUrlString: () => /* reexport */ padUrlString,
    randomId: () => /* reexport */ randomId,
    storageAvailable: () => /* reexport */ storageAvailable,
    validateAndConstructUrl: () => /* reexport */ validateAndConstructUrl,
  }); // CONCATENATED MODULE: ./src/utils/enums.ts

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
    SERVER: "server",
  };
  const TORUS_METHOD = {
    TRIGGER_LOGIN: "triggerLogin",
    TRIGGER_AGGREGATE_LOGIN: "triggerAggregateLogin",
    TRIGGER_AGGREGATE_HYBRID_LOGIN: "triggerHybridAggregateLogin",
  };
  const SENTRY_TXNS = {
    FETCH_NODE_DETAILS: "fetchNodeDetails",
    PUB_ADDRESS_LOOKUP: "pubAddressLookup",
    FETCH_SHARES: "fetchShares",
  }; // CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
  const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
  var defineProperty_default = /*#__PURE__*/ __webpack_require__.n(defineProperty_namespaceObject); // CONCATENATED MODULE: external "@toruslabs/http-helpers"
  const http_helpers_namespaceObject = require("@toruslabs/http-helpers"); // CONCATENATED MODULE: external "lodash.merge"
  const external_lodash_merge_namespaceObject = require("lodash.merge");
  var external_lodash_merge_default = /*#__PURE__*/ __webpack_require__.n(external_lodash_merge_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/objectWithoutProperties"
  const objectWithoutProperties_namespaceObject = require("@babel/runtime/helpers/objectWithoutProperties");
  var objectWithoutProperties_default = /*#__PURE__*/ __webpack_require__.n(objectWithoutProperties_namespaceObject); // CONCATENATED MODULE: external "@toruslabs/broadcast-channel"
  const broadcast_channel_namespaceObject = require("@toruslabs/broadcast-channel"); // CONCATENATED MODULE: external "bowser"
  const external_bowser_namespaceObject = require("bowser");
  var external_bowser_default = /*#__PURE__*/ __webpack_require__.n(external_bowser_namespaceObject); // CONCATENATED MODULE: external "loglevel"
  const external_loglevel_namespaceObject = require("loglevel");
  var external_loglevel_default = /*#__PURE__*/ __webpack_require__.n(external_loglevel_namespaceObject); // CONCATENATED MODULE: ./src/utils/loglevel.ts
  /* harmony default export */ const loglevel = external_loglevel_default().getLogger("customauth"); // CONCATENATED MODULE: ./src/utils/helpers.ts
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
  const getVerifierId = function (userInfo, typeOfLogin, verifierIdField) {
    let isVerifierIdCaseSensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
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
    loglevel.info(hashParameters, queryParameters);
    let instanceParameters = {};
    let error = "";
    if (Object.keys(hashParameters).length > 0 && hashParameters.state) {
      instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(hashParameters.state)))) || {};
      error = hashParameters.error_description || hashParameters.error || error;
    } else if (Object.keys(queryParameters).length > 0 && queryParameters.state) {
      instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(queryParameters.state)))) || {};
      if (queryParameters.error) error = queryParameters.error;
    }
    return {
      error,
      instanceParameters,
      hashParameters,
    };
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
    var _window, _window$navigator;
    return (
      ((_window = window) === null || _window === void 0
        ? void 0
        : (_window$navigator = _window.navigator) === null || _window$navigator === void 0
        ? void 0
        : _window$navigator.userAgent.toLowerCase().indexOf("firefox")) > -1 || false
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
      const h = new URL(
        constructURL({
          baseURL,
          query: hash,
        })
      ).searchParams.toString();
      url.hash = h;
    }
    return url.toString();
  }
  function are3PCSupported() {
    var _navigator;
    const browserInfo = external_bowser_default().parse(navigator.userAgent);
    loglevel.info(JSON.stringify(browserInfo), "current browser info");
    let thirdPartyCookieSupport = true;
    // brave
    if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.brave) {
      thirdPartyCookieSupport = false;
    }
    // All webkit & gecko engine instances use itp (intelligent tracking prevention -
    // https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp)
    if (
      browserInfo.engine.name === external_bowser_default().ENGINE_MAP.WebKit ||
      browserInfo.engine.name === external_bowser_default().ENGINE_MAP.Gecko
    ) {
      thirdPartyCookieSupport = false;
    }
    return thirdPartyCookieSupport;
  }
  const validateAndConstructUrl = (domain) => {
    try {
      const url = new URL(decodeURIComponent(domain));
      return url;
    } catch (error) {
      throw new Error(
        `${
          (error === null || error === void 0 ? void 0 : error.message) || ""
        }, Note: Your jwt domain: (i.e ${domain}) must have http:// or https:// prefix`
      );
    }
  }; // CONCATENATED MODULE: external "events"
  const external_events_namespaceObject = require("events"); // CONCATENATED MODULE: ./src/utils/PopupHandler.ts
  class PopupHandler extends external_events_namespaceObject.EventEmitter {
    constructor(_ref) {
      let { url, target, features } = _ref;
      super();
      defineProperty_default()(this, "url", void 0);
      defineProperty_default()(this, "target", void 0);
      defineProperty_default()(this, "features", void 0);
      defineProperty_default()(this, "window", void 0);
      defineProperty_default()(this, "windowTimer", void 0);
      defineProperty_default()(this, "iClosedWindow", void 0);
      this.url = url;
      this.target = target || "_blank";
      this.features = features || getPopupFeatures();
      this.window = undefined;
      this.windowTimer = undefined;
      this.iClosedWindow = false;
      this._setupTimer();
    }
    _setupTimer() {
      if (!this.window) return;
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
      var _this$window;
      this.window = window.open(this.url.href, this.target, this.features);
      if ((_this$window = this.window) !== null && _this$window !== void 0 && _this$window.focus) this.window.focus();
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
  /* harmony default export */ const utils_PopupHandler = PopupHandler; // CONCATENATED MODULE: ./src/handlers/AbstractLoginHandler.ts
  const _excluded = ["access_token", "id_token"];
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            defineProperty_default()(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
    }
    return target;
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
      defineProperty_default()(this, "nonce", randomId());
      defineProperty_default()(this, "finalURL", void 0);
    }
    get state() {
      return encodeURIComponent(
        window.btoa(
          JSON.stringify(
            _objectSpread(
              _objectSpread({}, this.customState || {}),
              {},
              {
                instanceId: this.nonce,
                verifier: this.verifier,
                typeOfLogin: this.typeOfLogin,
                redirectToOpener: this.redirectToOpener || false,
              }
            )
          )
        )
      );
    }
    handleLoginWindow(params) {
      const verifierWindow = new utils_PopupHandler({
        url: this.finalURL,
        features: params.popupFeatures,
      });
      if (this.uxMode === UX_MODE.REDIRECT) {
        verifierWindow.redirect(params.locationReplaceOnRedirect);
      } else {
        return new Promise((resolve, reject) => {
          let bc;
          const handleData = async (ev) => {
            try {
              const { error, data } = ev;
              const _ref = data || {},
                {
                  instanceParams,
                  hashParams: { access_token: accessToken, id_token: idToken },
                } = _ref,
                rest = objectWithoutProperties_default()(_ref.hashParams, _excluded);
              if (error) {
                loglevel.error(ev);
                reject(new Error(`Error: ${error}. Info: ${JSON.stringify(ev.data || {})}`));
                return;
              }
              if (ev.data && instanceParams.verifier === this.verifier) {
                loglevel.info(ev.data);
                if (!this.redirectToOpener && bc)
                  await bc.postMessage({
                    success: true,
                  });
                resolve(
                  _objectSpread(
                    _objectSpread(
                      {
                        accessToken,
                        idToken: idToken || "",
                      },
                      rest
                    ),
                    {},
                    {
                      // State has to be last here otherwise it will be overwritten
                      state: instanceParams,
                    }
                  )
                );
              }
            } catch (error) {
              loglevel.error(error);
              reject(error);
            }
          };
          if (!this.redirectToOpener) {
            bc = new broadcast_channel_namespaceObject.BroadcastChannel(`redirect_channel_${this.nonce}`, broadcastChannelOptions);
            bc.addEventListener("message", async (ev) => {
              await handleData(ev);
              bc.close();
              verifierWindow.close();
            });
          } else {
            const postMessageEventHandler = async (postMessageEvent) => {
              if (!postMessageEvent.data) return;
              const ev = postMessageEvent.data;
              if (ev.channel !== `redirect_channel_${this.nonce}`) return;
              window.removeEventListener("message", postMessageEventHandler);
              handleData(ev);
              verifierWindow.close();
            };
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
  /* harmony default export */ const handlers_AbstractLoginHandler = AbstractLoginHandler; // CONCATENATED MODULE: ./src/handlers/DiscordHandler.ts
  class DiscordHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "RESPONSE_TYPE", "token");
      defineProperty_default()(this, "SCOPE", "identify email");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const finalUrl = new URL("https://discord.com/api/oauth2/authorize");
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { accessToken } = params;
      const userInfo = await (0, http_helpers_namespaceObject.get)("https://discord.com/api/users/@me", {
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
    }
  } // CONCATENATED MODULE: ./src/handlers/FacebookHandler.ts
  class FacebookHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "RESPONSE_TYPE", "token");
      defineProperty_default()(this, "SCOPE", "public_profile email");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const finalUrl = new URL("https://www.facebook.com/v15.0/dialog/oauth");
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { accessToken } = params;
      const userInfo = await (0, http_helpers_namespaceObject.get)("https://graph.facebook.com/me?fields=name,email,picture.type(large)", {
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
    }
  } // CONCATENATED MODULE: ./src/handlers/GoogleHandler.ts
  class GoogleHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "RESPONSE_TYPE", "token id_token");
      defineProperty_default()(this, "SCOPE", "profile email openid");
      defineProperty_default()(this, "PROMPT", "consent select_account");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const finalUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { accessToken } = params;
      const userInfo = await (0, http_helpers_namespaceObject.get)("https://www.googleapis.com/userinfo/v2/me", {
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
    }
  } // CONCATENATED MODULE: external "jwt-decode"
  const external_jwt_decode_namespaceObject = require("jwt-decode");
  var external_jwt_decode_default = /*#__PURE__*/ __webpack_require__.n(external_jwt_decode_namespaceObject); // CONCATENATED MODULE: ./src/handlers/JwtHandler.ts
  class JwtHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "SCOPE", "openid profile email");
      defineProperty_default()(this, "RESPONSE_TYPE", "token id_token");
      defineProperty_default()(this, "PROMPT", "login");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const { domain } = this.jwtParams;
      const finalUrl = validateAndConstructUrl(domain);
      finalUrl.pathname += finalUrl.pathname.endsWith("/") ? "authorize" : "/authorize";
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
      delete clonedParams.domain;
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive, user_info_route = "userinfo" } = this.jwtParams;
      if (accessToken) {
        try {
          const domainUrl = new URL(domain);
          const userInfo = await (0, http_helpers_namespaceObject.get)(`${padUrlString(domainUrl)}${user_info_route}`, {
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
          external_loglevel_default().warn(error, "Unable to get userinfo from endpoint");
        }
      }
      if (idToken) {
        const decodedToken = external_jwt_decode_default()(idToken);
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
    }
  } // CONCATENATED MODULE: ./src/handlers/MockLoginHandler.ts
  class MockLoginHandler extends handlers_AbstractLoginHandler {
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
      const finalJwtParams = external_lodash_merge_default()(
        {
          state: this.state,
          client_id: this.clientId,
          nonce: this.nonce,
        },
        clonedParams
      );
      this.finalURL = new URL(
        constructURL({
          baseURL: this.redirect_uri,
          query: null,
          hash: finalJwtParams,
        })
      );
    }
    async getUserInfo(params) {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive, user_info_route = "userinfo" } = this.jwtParams;
      if (accessToken) {
        try {
          const domainUrl = new URL(domain);
          const userInfo = await (0, http_helpers_namespaceObject.get)(`${padUrlString(domainUrl)}${user_info_route}`, {
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
          external_loglevel_default().warn(error, "Unable to get userinfo from endpoint");
        }
      }
      if (idToken) {
        const decodedToken = external_jwt_decode_default()(idToken);
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
    }
    handleLoginWindow(params) {
      const { id_token: idToken, access_token: accessToken } = this.jwtParams;
      const verifierWindow = new utils_PopupHandler({
        url: this.finalURL,
        features: params.popupFeatures,
      });
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
  } // CONCATENATED MODULE: ./src/handlers/PasswordlessHandler.ts
  const PasswordlessHandler_excluded = ["access_token", "id_token"];
  function PasswordlessHandler_ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function PasswordlessHandler_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? PasswordlessHandler_ownKeys(Object(source), !0).forEach(function (key) {
            defineProperty_default()(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        : PasswordlessHandler_ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
    }
    return target;
  }

  class PasswordlessHandler_JwtHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "SCOPE", "openid profile email");
      defineProperty_default()(this, "RESPONSE_TYPE", "token id_token");
      defineProperty_default()(this, "PROMPT", "login");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const { domain } = this.jwtParams;
      const domainUrl = validateAndConstructUrl(domain);
      domainUrl.pathname = "/passwordless/start";
      this.finalURL = domainUrl;
    }
    async getUserInfo(params) {
      const { idToken, accessToken } = params;
      const { domain, verifierIdField, isVerifierIdCaseSensitive } = this.jwtParams;
      try {
        const domainUrl = new URL(domain);
        const userInfo = await (0, http_helpers_namespaceObject.get)(`${padUrlString(domainUrl)}userinfo`, {
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
        loglevel.error(error);
        const decodedToken = external_jwt_decode_default()(idToken);
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
            const _ref = data || {},
              {
                instanceParams,
                hashParams: { access_token: accessToken, id_token: idToken },
              } = _ref,
              rest = objectWithoutProperties_default()(_ref.hashParams, PasswordlessHandler_excluded);
            if (error) {
              loglevel.error(ev.error);
              reject(new Error(error));
              return;
            }
            if (ev.data && instanceParams.verifier === this.verifier) {
              loglevel.info(ev.data);
              resolve(
                PasswordlessHandler_objectSpread(
                  PasswordlessHandler_objectSpread(
                    {
                      accessToken,
                      idToken: idToken || "",
                    },
                    rest
                  ),
                  {},
                  {
                    state: instanceParams,
                  }
                )
              );
            }
          } catch (error) {
            loglevel.error(error);
            reject(error);
          }
        };
        const bc = new broadcast_channel_namespaceObject.BroadcastChannel(`redirect_channel_${this.nonce}`, broadcastChannelOptions);
        bc.addEventListener("message", async (ev) => {
          handleData(ev);
          bc.close();
        });
        try {
          const { connection = "email", login_hint } = this.jwtParams;
          const finalJwtParams = external_lodash_merge_default()(
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
          (0, http_helpers_namespaceObject.post)(this.finalURL.href, JSON.parse(JSON.stringify(finalJwtParams)))
            .then((response) => {
              loglevel.info("posted", response);
              return undefined;
            })
            .catch((error) => {
              loglevel.error(error);
              reject(error);
            });
        } catch (error) {
          loglevel.error(error);
          reject(error);
        }
      });
    }
  } // CONCATENATED MODULE: ./src/handlers/RedditHandler.ts
  class RedditHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "RESPONSE_TYPE", "token");
      defineProperty_default()(this, "SCOPE", "identity");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const finalUrl = new URL(`https://www.reddit.com/api/v1/authorize${window.innerWidth < 600 ? ".compact" : ""}`);
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { accessToken } = params;
      const userInfo = await (0, http_helpers_namespaceObject.get)("https://oauth.reddit.com/api/v1/me", {
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
    }
  } // CONCATENATED MODULE: ./src/handlers/TwitchHandler.ts
  class TwitchHandler extends handlers_AbstractLoginHandler {
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
      defineProperty_default()(this, "RESPONSE_TYPE", "token");
      defineProperty_default()(this, "SCOPE", "user:read:email");
      this.setFinalUrl();
    }
    setFinalUrl() {
      const finalUrl = new URL("https://id.twitch.tv/oauth2/authorize");
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(params) {
      const { accessToken } = params;
      const userInfo = await (0, http_helpers_namespaceObject.get)("https://api.twitch.tv/helix/users", {
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
    }
  } // CONCATENATED MODULE: ./src/handlers/WebAuthnHandler.ts
  const WEBAUTHN_LOOKUP_SERVER = "https://api.webauthn.openlogin.com";
  class WebAuthnHandler extends handlers_AbstractLoginHandler {
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
      const { webauthnURL } = this.customState || {};
      const finalUrl = webauthnURL ? new URL(webauthnURL) : new URL("https://webauthn.openlogin.com");
      const clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
      const finalJwtParams = external_lodash_merge_default()(
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
    async getUserInfo(parameters) {
      const { idToken, ref, extraParamsPassed, extraParams } = parameters;
      let verifierId;
      let signature;
      let clientDataJSON;
      let authenticatorData;
      let publicKey;
      let challenge;
      let rpOrigin;
      let credId;
      let transports;
      if (extraParamsPassed === "true") {
        loglevel.debug("extraParamsPassed is true, using extraParams passed through hashParams");
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
            transports,
          } = JSON.parse(atob(extraParams)));
        } catch (error) {
          loglevel.warn("unable to parse extraParams", error);
          ({
            verifier_id: verifierId,
            signature,
            clientDataJSON,
            authenticatorData,
            publicKey,
            challenge,
            rpOrigin,
            credId,
            transports,
          } = await (0, http_helpers_namespaceObject.get)(`${WEBAUTHN_LOOKUP_SERVER}/signature/fetch/${idToken}`));
        }
      } else {
        loglevel.debug("extraParamsPassed is false, using extraParams passed through bridge server");
        ({
          verifier_id: verifierId,
          signature,
          clientDataJSON,
          authenticatorData,
          publicKey,
          challenge,
          rpOrigin,
          credId,
          transports,
        } = await (0, http_helpers_namespaceObject.get)(`${WEBAUTHN_LOOKUP_SERVER}/signature/fetch/${idToken}`));
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
          transports,
        },
      };
    }
  } // CONCATENATED MODULE: ./src/handlers/HandlerFactory.ts
  const createHandler = (_ref) => {
    let { clientId, redirect_uri, typeOfLogin, verifier, jwtParams, redirectToOpener, uxMode, customState, registerOnly } = _ref;
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
        return new PasswordlessHandler_JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      case LOGIN.APPLE:
      case LOGIN.GITHUB:
      case LOGIN.LINKEDIN:
      case LOGIN.TWITTER:
      case LOGIN.WEIBO:
      case LOGIN.LINE:
      case LOGIN.EMAIL_PASSWORD:
      case LOGIN.JWT:
        if (id_token || access_token) {
          return new MockLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
        }
        if (!domain) throw new Error("Invalid params");
        return new JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      case LOGIN.WEBAUTHN:
        return new WebAuthnHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly);
      default:
        throw new Error("Invalid login type");
    }
  };
  /* harmony default export */ const HandlerFactory = createHandler; // CONCATENATED MODULE: ./src/handlers/interfaces.ts
  let SkipTorusKey = /*#__PURE__*/ (function (SkipTorusKey) {
    SkipTorusKey[(SkipTorusKey["Never"] = 0)] = "Never";
    SkipTorusKey[(SkipTorusKey["IfNew"] = 1)] = "IfNew";
    SkipTorusKey[(SkipTorusKey["Always"] = 2)] = "Always";
    return SkipTorusKey;
  })({}); // CONCATENATED MODULE: external "@toruslabs/fetch-node-details"

  // REGION: AUTH0 PARAMS
  const fetch_node_details_namespaceObject = require("@toruslabs/fetch-node-details"); // CONCATENATED MODULE: external "@toruslabs/torus.js"
  const torus_js_namespaceObject = require("@toruslabs/torus.js");
  var torus_js_default = /*#__PURE__*/ __webpack_require__.n(torus_js_namespaceObject); // CONCATENATED MODULE: external "@chaitanyapotti/register-service-worker"
  const register_service_worker_namespaceObject = require("@chaitanyapotti/register-service-worker"); // CONCATENATED MODULE: ./src/registerServiceWorker.ts
  const registerServiceWorker = (baseUrl) =>
    new Promise((resolve, reject) => {
      const swUrl = `${baseUrl}sw.js`;
      if ("serviceWorker" in window.navigator) {
        // if swIntegrity is not calculated
        (0, register_service_worker_namespaceObject.register)(swUrl, {
          ready() {
            loglevel.info("App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB");
            resolve(undefined);
          },
          registered() {
            loglevel.info("Service worker has been registered.");
            resolve(undefined);
          },
          cached() {
            loglevel.info("Content has been cached for offline use.");
            resolve(undefined);
          },
          updatefound() {
            loglevel.info("New content is downloading.");
          },
          updated() {
            loglevel.info("New content is available; please refresh.");
          },
          offline() {
            loglevel.info("No internet connection found. App is running in offline mode.");
            reject(new Error("App is offline"));
          },
          error(error) {
            loglevel.error("Error during service worker registration:", error);
            reject(error);
          },
        });
      } else {
        reject(new Error("Service workers are not supported"));
      }
    }); // CONCATENATED MODULE: ./src/sentry.ts
  class SentryHandler {
    constructor(sentry) {
      defineProperty_default()(this, "sentry", null);
      this.sentry = sentry;
    }
    startTransaction(context) {
      if (this.sentry) {
        return this.sentry.startTransaction(context);
      }
    }
    finishTransaction(tx) {
      if (tx) {
        tx.finish();
      }
    }
  } // CONCATENATED MODULE: external "@toruslabs/eccrypto"
  const eccrypto_namespaceObject = require("@toruslabs/eccrypto"); // CONCATENATED MODULE: external "@toruslabs/metadata-helpers"
  const metadata_helpers_namespaceObject = require("@toruslabs/metadata-helpers"); // CONCATENATED MODULE: ./src/utils/StorageHelper.ts
  class StorageHelper {
    constructor(serverUrl) {
      defineProperty_default()(this, "currentStorageMethod", REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE);
      defineProperty_default()(this, "isInitialized", false);
      defineProperty_default()(this, "storageServerUrl", "https://broadcast-server.tor.us");
      this.storageServerUrl = serverUrl;
    }
    init() {
      const support = are3PCSupported();
      const localStorageAvailable = storageAvailable(REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE);
      if (support && localStorageAvailable) {
        // use local storage as default for storing stuff
        this.currentStorageMethod = REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE;
      } else {
        // use server store as default for storing stuff
        this.currentStorageMethod = REDIRECT_PARAMS_STORAGE_METHOD.SERVER;
      }
      this.isInitialized = true;
    }
    async storeLoginDetails(params, scope) {
      if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
      if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.SERVER) {
        const privKey = (0, metadata_helpers_namespaceObject.keccak256)(Buffer.from(scope, "utf8"));
        const privKeyHex = privKey.toString("hex");
        const publicKeyHex = (0, eccrypto_namespaceObject.getPublic)(privKey).toString("hex");
        const encData = await (0, metadata_helpers_namespaceObject.encryptData)(privKeyHex, params);
        const signature = (
          await (0, eccrypto_namespaceObject.sign)(privKey, (0, metadata_helpers_namespaceObject.keccak256)(Buffer.from(encData, "utf8")))
        ).toString("hex");
        await (0, http_helpers_namespaceObject.post)(`${this.storageServerUrl}/store/set`, {
          key: publicKeyHex,
          data: encData,
          signature,
        });
      } else {
        window.localStorage.setItem(`torus_login_${scope}`, JSON.stringify(params));
      }
    }
    async retrieveLoginDetails(scope) {
      if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
      if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.SERVER) {
        const privKey = (0, metadata_helpers_namespaceObject.keccak256)(Buffer.from(scope, "utf8"));
        const privKeyHex = privKey.toString("hex");
        const publicKeyHex = (0, eccrypto_namespaceObject.getPublic)(privKey).toString("hex");
        try {
          const encData = await (0, http_helpers_namespaceObject.get)(`${this.storageServerUrl}/store/get?key=${publicKeyHex}`);
          if (encData.message) {
            const loginDetails = await (0, metadata_helpers_namespaceObject.decryptData)(privKeyHex, encData.message);
            return loginDetails;
          }
        } catch (error) {
          if (error.status === 404) {
            loglevel.warn(error, "Session likely expired");
          } else {
            throw error;
          }
        }
      }
      const loginDetails = window.localStorage.getItem(`torus_login_${scope}`);
      return JSON.parse(loginDetails || "{}");
    }
    clearLoginDetailsStorage(scope) {
      if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
      if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE) {
        window.localStorage.removeItem(`torus_login_${scope}`);
      }
      // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
    }

    clearOrphanedLoginDetails() {
      if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
      if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE) {
        const allStorageKeys = Object.keys(window.localStorage);
        allStorageKeys.forEach((key) => {
          if (key.startsWith("torus_login_")) {
            window.localStorage.removeItem(key);
          }
        });
      }
      // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
    }
  }

  /* harmony default export */ const utils_StorageHelper = StorageHelper; // CONCATENATED MODULE: ./src/login.ts
  const login_excluded = ["access_token", "id_token"],
    _excluded2 = ["access_token", "id_token"],
    _excluded3 = ["access_token", "id_token"],
    _excluded4 = ["args", "method"];
  function login_ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function login_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? login_ownKeys(Object(source), !0).forEach(function (key) {
            defineProperty_default()(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        : login_ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
    }
    return target;
  }

  class CustomAuth {
    constructor(_ref) {
      let {
        baseUrl,
        network,
        enableLogging = false,
        redirectToOpener = false,
        redirectPathName = "redirect",
        apiKey = "torus-default",
        uxMode = UX_MODE.POPUP,
        locationReplaceOnRedirect = false,
        popupFeatures,
        storageServerUrl = "https://broadcast-server.tor.us",
        sentry,
        enableOneKey = false,
        web3AuthClientId,
        metadataUrl = "https://metadata.tor.us",
      } = _ref;
      defineProperty_default()(this, "isInitialized", void 0);
      defineProperty_default()(this, "config", void 0);
      defineProperty_default()(this, "torus", void 0);
      defineProperty_default()(this, "nodeDetailManager", void 0);
      defineProperty_default()(this, "storageHelper", void 0);
      defineProperty_default()(this, "sentryHandler", void 0);
      if (!web3AuthClientId) throw new Error("Please provide a valid web3AuthClientId in constructor");
      if (!network) throw new Error("Please provide a valid network in constructor");
      this.isInitialized = false;
      const baseUri = new URL(baseUrl);
      this.config = {
        baseUrl: padUrlString(baseUri),
        get redirect_uri() {
          return `${this.baseUrl}${redirectPathName}`;
        },
        redirectToOpener,
        uxMode,
        locationReplaceOnRedirect,
        popupFeatures,
      };
      const torus = new (torus_js_default())({
        network,
        clientId: web3AuthClientId,
        enableOneKey,
        legacyMetadataHost: metadataUrl,
      });
      torus_js_default().setAPIKey(apiKey);
      this.torus = torus;
      this.nodeDetailManager = new fetch_node_details_namespaceObject.NodeDetailManager({
        network,
      });
      if (enableLogging) loglevel.enableAll();
      else loglevel.disableAll();
      this.storageHelper = new utils_StorageHelper(storageServerUrl);
      this.sentryHandler = new SentryHandler(sentry);
    }
    async init() {
      let { skipSw = false, skipInit = false, skipPrefetch = false } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.storageHelper.init();
      if (skipInit) {
        this.isInitialized = true;
        return;
      }
      if (!skipSw) {
        const fetchSwResponse = await fetch(`${this.config.baseUrl}sw.js`, {
          cache: "reload",
        });
        if (fetchSwResponse.ok) {
          try {
            await registerServiceWorker(this.config.baseUrl);
            this.isInitialized = true;
            return;
          } catch (error) {
            loglevel.warn(error);
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
        await this.handlePrefetchRedirectUri();
        return;
      }
      this.isInitialized = true;
    }
    async triggerLogin(args) {
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
      loglevel.info("Verifier: ", verifier);
      if (!this.isInitialized) {
        throw new Error("Not initialized yet");
      }
      if (registerOnly && typeOfLogin !== LOGIN.WEBAUTHN) throw new Error("registerOnly flag can only be passed for webauthn");
      const loginHandler = HandlerFactory({
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
          rest = objectWithoutProperties_default()(hashParameters, login_excluded);
        // State has to be last here otherwise it will be overwritten
        loginParams = login_objectSpread(
          login_objectSpread(
            {
              accessToken,
              idToken,
            },
            rest
          ),
          {},
          {
            state: instanceParameters,
          }
        );
      } else {
        this.storageHelper.clearOrphanedLoginDetails();
        if (this.config.uxMode === UX_MODE.REDIRECT) {
          await this.storageHelper.storeLoginDetails(
            {
              method: TORUS_METHOD.TRIGGER_LOGIN,
              args,
            },
            loginHandler.nonce
          );
        }
        loginParams = await loginHandler.handleLoginWindow({
          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
          popupFeatures: this.config.popupFeatures,
        });
        if (this.config.uxMode === UX_MODE.REDIRECT) return null;
      }
      const userInfo = await loginHandler.getUserInfo(loginParams);
      if (registerOnly) {
        const nodeTx = this.sentryHandler.startTransaction({
          name: SENTRY_TXNS.FETCH_NODE_DETAILS,
        });
        const nodeDetails = await this.nodeDetailManager.getNodeDetails({
          verifier,
          verifierId: userInfo.verifierId,
        });
        this.sentryHandler.finishTransaction(nodeTx);
        const lookupTx = this.sentryHandler.startTransaction({
          name: SENTRY_TXNS.PUB_ADDRESS_LOOKUP,
        });
        const torusPubKey = await this.torus.getPublicAddress(nodeDetails.torusNodeEndpoints, nodeDetails.torusNodePub, {
          verifier,
          verifierId: userInfo.verifierId,
        });
        this.sentryHandler.finishTransaction(lookupTx);
        const res = {
          userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
        };
        return login_objectSpread(
          login_objectSpread(login_objectSpread({}, res), torusPubKey),
          {},
          {
            finalKeyData: login_objectSpread(
              login_objectSpread({}, torusPubKey.finalKeyData),
              {},
              {
                privKey: undefined,
              }
            ),
            oAuthKeyData: login_objectSpread(
              login_objectSpread({}, torusPubKey.finalKeyData),
              {},
              {
                privKey: undefined,
              }
            ),
            metadata: login_objectSpread(
              login_objectSpread({}, torusPubKey.metadata),
              {},
              {
                nonce: undefined,
              }
            ),
            sessionData: undefined,
          }
        );
      }
      let skip = true;
      let existingPk;
      if (checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew) {
        var _lookupData$keyResult, _lookupData$keyResult2, _lookupData$keyResult3, _lookupData$keyResult4;
        const { torusNodeEndpoints } = await this.nodeDetailManager.getNodeDetails({
          verifier,
          verifierId: userInfo.verifierId,
        });
        const lookupData = await (0, torus_js_namespaceObject.legacyKeyLookup)(torusNodeEndpoints, verifier, userInfo.verifierId);
        existingPk =
          lookupData !== null &&
          lookupData !== void 0 &&
          (_lookupData$keyResult = lookupData.keyResult) !== null &&
          _lookupData$keyResult !== void 0 &&
          (_lookupData$keyResult2 = _lookupData$keyResult.keys) !== null &&
          _lookupData$keyResult2 !== void 0 &&
          _lookupData$keyResult2.length
            ? {
                X:
                  lookupData === null || lookupData === void 0
                    ? void 0
                    : (_lookupData$keyResult3 = lookupData.keyResult) === null || _lookupData$keyResult3 === void 0
                    ? void 0
                    : _lookupData$keyResult3.keys[0].pub_key_X,
                Y:
                  lookupData === null || lookupData === void 0
                    ? void 0
                    : (_lookupData$keyResult4 = lookupData.keyResult) === null || _lookupData$keyResult4 === void 0
                    ? void 0
                    : _lookupData$keyResult4.keys[0].pub_key_Y,
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
        : await this.getTorusKey(
            verifier,
            userInfo.verifierId,
            {
              verifier_id: userInfo.verifierId,
            },
            loginParams.idToken || loginParams.accessToken,
            userInfo.extraVerifierParams
          );
      return login_objectSpread(
        login_objectSpread({}, torusKey),
        {},
        {
          existingPk,
          userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
        }
      );
    }
    async triggerAggregateLogin(args) {
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
        const loginHandler = HandlerFactory({
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
            rest = objectWithoutProperties_default()(hashParameters, _excluded2);
          // State has to be last here otherwise it will be overwritten
          loginParams = login_objectSpread(
            login_objectSpread(
              {
                accessToken,
                idToken,
              },
              rest
            ),
            {},
            {
              state: instanceParameters,
            }
          );
        } else {
          this.storageHelper.clearOrphanedLoginDetails();
          if (this.config.uxMode === UX_MODE.REDIRECT) {
            await this.storageHelper.storeLoginDetails(
              {
                method: TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN,
                args,
              },
              loginHandler.nonce
            );
          }
          loginParams = await loginHandler.handleLoginWindow({
            locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
            popupFeatures: this.config.popupFeatures,
          });
          if (this.config.uxMode === UX_MODE.REDIRECT) return null;
        }
        // Fail the method even if one promise fails

        userInfoPromises.push(loginHandler.getUserInfo(loginParams));
        loginParamsArray.push(loginParams);
      }
      const _userInfoArray = await Promise.all(userInfoPromises);
      const userInfoArray = _userInfoArray.map((userInfo) =>
        login_objectSpread(
          login_objectSpread({}, userInfo),
          {},
          {
            aggregateVerifier: verifierIdentifier,
          }
        )
      );
      const aggregateVerifierParams = {
        verify_params: [],
        sub_verifier_ids: [],
        verifier_id: "",
      };
      const aggregateIdTokenSeeds = [];
      let aggregateVerifierId = "";
      let extraVerifierParams = {};
      for (let index = 0; index < subVerifierDetailsArray.length; index += 1) {
        const loginParams = loginParamsArray[index];
        const { idToken, accessToken } = loginParams;
        const userInfo = userInfoArray[index];
        aggregateVerifierParams.verify_params.push({
          verifier_id: userInfo.verifierId,
          idtoken: idToken || accessToken,
        });
        aggregateVerifierParams.sub_verifier_ids.push(userInfo.verifier);
        aggregateIdTokenSeeds.push(idToken || accessToken);
        aggregateVerifierId = userInfo.verifierId; // using last because idk
        extraVerifierParams = userInfo.extraVerifierParams;
      }
      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = (0, torus_js_namespaceObject.keccak256)(
        Buffer.from(aggregateIdTokenSeeds.join(String.fromCharCode(29)), "utf8")
      ).slice(2);
      aggregateVerifierParams.verifier_id = aggregateVerifierId;
      const userInfoData = userInfoArray.map((x, index) => login_objectSpread(login_objectSpread({}, x), loginParamsArray[index]));
      let skip = true;
      let existingPk;
      if (checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew) {
        var _lookupData$keyResult5, _lookupData$keyResult6, _lookupData$keyResult7, _lookupData$keyResult8;
        const { torusNodeEndpoints } = await this.nodeDetailManager.getNodeDetails({
          verifier: args.verifierIdentifier,
          verifierId: userInfoData[0].verifierId,
        });
        const lookupData = await (0, torus_js_namespaceObject.legacyKeyLookup)(
          torusNodeEndpoints,
          args.verifierIdentifier,
          userInfoData[0].verifierId
        );
        existingPk =
          lookupData !== null &&
          lookupData !== void 0 &&
          (_lookupData$keyResult5 = lookupData.keyResult) !== null &&
          _lookupData$keyResult5 !== void 0 &&
          (_lookupData$keyResult6 = _lookupData$keyResult5.keys) !== null &&
          _lookupData$keyResult6 !== void 0 &&
          _lookupData$keyResult6.length
            ? {
                X:
                  lookupData === null || lookupData === void 0
                    ? void 0
                    : (_lookupData$keyResult7 = lookupData.keyResult) === null || _lookupData$keyResult7 === void 0
                    ? void 0
                    : _lookupData$keyResult7.keys[0].pub_key_X,
                Y:
                  lookupData === null || lookupData === void 0
                    ? void 0
                    : (_lookupData$keyResult8 = lookupData.keyResult) === null || _lookupData$keyResult8 === void 0
                    ? void 0
                    : _lookupData$keyResult8.keys[0].pub_key_Y,
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
        : await this.getTorusKey(verifierIdentifier, aggregateVerifierId, aggregateVerifierParams, aggregateIdToken, extraVerifierParams);
      return login_objectSpread(
        login_objectSpread({}, torusKey),
        {},
        {
          existingPk,
          userInfo: userInfoArray.map((x, index) => login_objectSpread(login_objectSpread({}, x), loginParamsArray[index])),
        }
      );
    }
    async triggerHybridAggregateLogin(args) {
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
      const loginHandler = HandlerFactory({
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
          rest = objectWithoutProperties_default()(hashParameters, _excluded3);
        // State has to be last here otherwise it will be overwritten
        loginParams = login_objectSpread(
          login_objectSpread(
            {
              accessToken,
              idToken,
            },
            rest
          ),
          {},
          {
            state: instanceParameters,
          }
        );
      } else {
        this.storageHelper.clearOrphanedLoginDetails();
        if (this.config.uxMode === UX_MODE.REDIRECT) {
          await this.storageHelper.storeLoginDetails(
            {
              method: TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN,
              args,
            },
            loginHandler.nonce
          );
        }
        loginParams = await loginHandler.handleLoginWindow({
          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
          popupFeatures: this.config.popupFeatures,
        });
        if (this.config.uxMode === UX_MODE.REDIRECT) return null;
      }
      const userInfo = await loginHandler.getUserInfo(loginParams);
      const torusKey1Promise = this.getTorusKey(
        verifier,
        userInfo.verifierId,
        {
          verifier_id: userInfo.verifierId,
        },
        loginParams.idToken || loginParams.accessToken,
        userInfo.extraVerifierParams
      );
      const { verifierIdentifier, subVerifierDetailsArray } = aggregateLoginParams;
      const aggregateVerifierParams = {
        verify_params: [],
        sub_verifier_ids: [],
        verifier_id: "",
      };
      const aggregateIdTokenSeeds = [];
      let aggregateVerifierId = "";
      for (let index = 0; index < subVerifierDetailsArray.length; index += 1) {
        const sub = subVerifierDetailsArray[index];
        const { idToken, accessToken } = loginParams;
        aggregateVerifierParams.verify_params.push({
          verifier_id: userInfo.verifierId,
          idtoken: idToken || accessToken,
        });
        aggregateVerifierParams.sub_verifier_ids.push(sub.verifier);
        aggregateIdTokenSeeds.push(idToken || accessToken);
        aggregateVerifierId = userInfo.verifierId; // using last because idk
      }

      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = (0, torus_js_namespaceObject.keccak256)(
        Buffer.from(aggregateIdTokenSeeds.join(String.fromCharCode(29)), "utf8")
      ).slice(2);
      aggregateVerifierParams.verifier_id = aggregateVerifierId;
      const torusKey2Promise = this.getTorusKey(
        verifierIdentifier,
        aggregateVerifierId,
        aggregateVerifierParams,
        aggregateIdToken,
        userInfo.extraVerifierParams
      );
      const [torusKey1, torusKey2] = await Promise.all([torusKey1Promise, torusKey2Promise]);
      return {
        singleLogin: login_objectSpread(
          {
            userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
          },
          torusKey1
        ),
        aggregateLogins: [torusKey2],
      };
    }
    async getTorusKey(verifier, verifierId, verifierParams, idToken, additionalParams) {
      const nodeTx = this.sentryHandler.startTransaction({
        name: SENTRY_TXNS.FETCH_NODE_DETAILS,
      });
      const nodeDetails = await this.nodeDetailManager.getNodeDetails({
        verifier,
        verifierId,
      });
      this.sentryHandler.finishTransaction(nodeTx);
      if (this.torus.isLegacyNetwork) {
        // Call getPublicAddress to do keyassign for legacy networks which are not migrated
        const pubLookupTx = this.sentryHandler.startTransaction({
          name: SENTRY_TXNS.PUB_ADDRESS_LOOKUP,
        });
        const address = await this.torus.getPublicAddress(nodeDetails.torusNodeEndpoints, nodeDetails.torusNodePub, {
          verifier,
          verifierId,
        });
        this.sentryHandler.finishTransaction(pubLookupTx);
        loglevel.debug("torus-direct/getTorusKey", {
          getPublicAddress: address,
        });
      }
      loglevel.debug("torus-direct/getTorusKey", {
        torusNodeEndpoints: nodeDetails.torusNodeEndpoints,
      });
      const sharesTx = this.sentryHandler.startTransaction({
        name: SENTRY_TXNS.FETCH_SHARES,
      });
      const sharesResponse = await this.torus.retrieveShares(
        nodeDetails.torusNodeEndpoints,
        nodeDetails.torusIndexes,
        verifier,
        verifierParams,
        idToken,
        login_objectSpread({}, additionalParams)
      );
      this.sentryHandler.finishTransaction(sharesTx);
      loglevel.debug("torus-direct/getTorusKey", {
        retrieveShares: sharesResponse,
      });
      return sharesResponse;
    }
    async getAggregateTorusKey(
      verifier,
      verifierId,
      // unique identifier for user e.g. sub on jwt
      subVerifierInfoArray
    ) {
      const aggregateVerifierParams = {
        verify_params: [],
        sub_verifier_ids: [],
        verifier_id: "",
      };
      const aggregateIdTokenSeeds = [];
      let extraVerifierParams = {};
      for (let index = 0; index < subVerifierInfoArray.length; index += 1) {
        const userInfo = subVerifierInfoArray[index];
        aggregateVerifierParams.verify_params.push({
          verifier_id: verifierId,
          idtoken: userInfo.idToken,
        });
        aggregateVerifierParams.sub_verifier_ids.push(userInfo.verifier);
        aggregateIdTokenSeeds.push(userInfo.idToken);
        extraVerifierParams = userInfo.extraVerifierParams;
      }
      aggregateIdTokenSeeds.sort();
      const aggregateIdToken = (0, torus_js_namespaceObject.keccak256)(
        Buffer.from(aggregateIdTokenSeeds.join(String.fromCharCode(29)), "utf8")
      ).slice(2);
      aggregateVerifierParams.verifier_id = verifierId;
      return this.getTorusKey(verifier, verifierId, aggregateVerifierParams, aggregateIdToken, extraVerifierParams);
    }
    async getRedirectResult() {
      let { replaceUrl = true, clearLoginDetails = true } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      await this.init({
        skipInit: true,
      });
      const url = new URL(window.location.href);
      const hash = url.hash.substring(1);
      const queryParams = {};
      url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      if (replaceUrl) {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState(null, "", cleanUrl);
      }
      if (!hash && Object.keys(queryParams).length === 0) {
        throw new Error("Unable to fetch result from OAuth login");
      }
      const { error, instanceParameters, hashParameters } = handleRedirectParameters(hash, queryParams);
      const { instanceId } = instanceParameters;
      loglevel.info(instanceId, "instanceId");
      const _await$this$storageHe = await this.storageHelper.retrieveLoginDetails(instanceId),
        { args, method } = _await$this$storageHe,
        rest = objectWithoutProperties_default()(_await$this$storageHe, _excluded4);
      loglevel.info(args, method);
      if (clearLoginDetails) {
        this.storageHelper.clearLoginDetailsStorage(instanceId);
      }
      if (error) {
        return {
          error,
          state: instanceParameters || {},
          method,
          result: {},
          hashParameters,
          args,
        };
      }
      let result;
      try {
        if (method === TORUS_METHOD.TRIGGER_LOGIN) {
          const methodArgs = args;
          methodArgs.hash = hash;
          methodArgs.queryParameters = queryParams;
          result = await this.triggerLogin(methodArgs);
        } else if (method === TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN) {
          const methodArgs = args;
          methodArgs.subVerifierDetailsArray.forEach((x) => {
            x.hash = hash;
            x.queryParameters = queryParams;
          });
          result = await this.triggerAggregateLogin(methodArgs);
        } else if (method === TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN) {
          const methodArgs = args;
          methodArgs.singleLogin.hash = hash;
          methodArgs.singleLogin.queryParameters = queryParams;
          result = await this.triggerHybridAggregateLogin(methodArgs);
        }
      } catch (err) {
        loglevel.error(err);
        return login_objectSpread(
          {
            error: `Could not get result from torus nodes \n ${(err === null || err === void 0 ? void 0 : err.message) || ""}`,
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
        return login_objectSpread(
          {
            error: "Unsupported method type",
            state: instanceParameters || {},
            method,
            result: {},
            hashParameters,
            args,
          },
          rest
        );
      return login_objectSpread(
        {
          method,
          result,
          state: instanceParameters || {},
          hashParameters,
          args,
        },
        rest
      );
    }
    async handlePrefetchRedirectUri() {
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
    }
  }
  /* harmony default export */ const login = CustomAuth; // CONCATENATED MODULE: ./src/index.ts
  module.exports = __webpack_exports__;
  /******/
})();
//# sourceMappingURL=customauth.cjs.js.map
