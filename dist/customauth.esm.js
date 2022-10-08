import _defineProperty from "@babel/runtime/helpers/defineProperty";
import NodeDetailManager, { TORUS_NETWORK } from "@toruslabs/fetch-node-details";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { get, post } from "@toruslabs/http-helpers";
import deepmerge from "lodash.merge";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { BroadcastChannel } from "@toruslabs/broadcast-channel";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import Bowser, { ENGINE_MAP } from "bowser";
import log$1 from "loglevel";
import { EventEmitter } from "events";
import jwtDecode from "jwt-decode";
import Torus, { keyLookup } from "@toruslabs/torus.js";
import { keccak256 as keccak256$1 } from "web3-utils";
import { register } from "@chaitanyapotti/register-service-worker";
import { sign, getPublic } from "@toruslabs/eccrypto";
import { keccak256, encryptData, decryptData } from "@toruslabs/metadata-helpers";

var _CONTRACT_MAP, _SIGNER_MAP;
var LOGIN = {
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
var AGGREGATE_VERIFIER = {
  SINGLE_VERIFIER_ID: "single_id_verifier",
  // AND_AGGREGATE_VERIFIER : "and_aggregate_verifier",
  // OR_AGGREGATE_VERIFIER : "or_aggregate_verifier",
};

var UX_MODE = {
  POPUP: "popup",
  REDIRECT: "redirect",
};
var REDIRECT_PARAMS_STORAGE_METHOD = {
  LOCAL_STORAGE: "localStorage",
  SESSION_STORAGE: "sessionStorage",
  SERVER: "server",
};
var TORUS_METHOD = {
  TRIGGER_LOGIN: "triggerLogin",
  TRIGGER_AGGREGATE_LOGIN: "triggerAggregateLogin",
  TRIGGER_AGGREGATE_HYBRID_LOGIN: "triggerHybridAggregateLogin",
};
var CONTRACT_MAP =
  ((_CONTRACT_MAP = {}),
  _defineProperty(_CONTRACT_MAP, TORUS_NETWORK.MAINNET, NodeDetailManager.PROXY_ADDRESS_MAINNET),
  _defineProperty(_CONTRACT_MAP, TORUS_NETWORK.TESTNET, NodeDetailManager.PROXY_ADDRESS_TESTNET),
  _defineProperty(_CONTRACT_MAP, TORUS_NETWORK.CYAN, NodeDetailManager.PROXY_ADDRESS_CYAN),
  _defineProperty(_CONTRACT_MAP, TORUS_NETWORK.AQUA, NodeDetailManager.PROXY_ADDRESS_AQUA),
  _defineProperty(_CONTRACT_MAP, TORUS_NETWORK.CELESTE, NodeDetailManager.PROXY_ADDRESS_CELESTE),
  _CONTRACT_MAP);
var SIGNER_MAP =
  ((_SIGNER_MAP = {}),
  _defineProperty(_SIGNER_MAP, TORUS_NETWORK.MAINNET, "https://signer.tor.us"),
  _defineProperty(_SIGNER_MAP, TORUS_NETWORK.TESTNET, "https://signer.tor.us"),
  _defineProperty(_SIGNER_MAP, TORUS_NETWORK.CYAN, "https://signer-polygon.tor.us"),
  _defineProperty(_SIGNER_MAP, TORUS_NETWORK.AQUA, "https://signer-polygon.tor.us"),
  _defineProperty(_SIGNER_MAP, TORUS_NETWORK.CELESTE, "https://signer-polygon.tor.us"),
  _SIGNER_MAP);
var SENTRY_TXNS = {
  FETCH_NODE_DETAILS: "fetchNodeDetails",
  PUB_ADDRESS_LOOKUP: "pubAddressLookup",
  FETCH_SHARES: "fetchShares",
};

var log = log$1.getLogger("customauth");

var _loginToConnectionMap;
function eventToPromise(emitter) {
  return new Promise(function (resolve, reject) {
    var handler = function handler(ev) {
      var _ev$error = ev.error,
        error = _ev$error === void 0 ? "" : _ev$error,
        data = ev.data;
      emitter.removeEventListener("message", handler);
      if (error) return reject(new Error(error));
      return resolve(data);
    };
    emitter.addEventListener("message", handler);
  });
}
// These are the connection names used by auth0
var loginToConnectionMap =
  ((_loginToConnectionMap = {}),
  _defineProperty(_loginToConnectionMap, LOGIN.APPLE, "apple"),
  _defineProperty(_loginToConnectionMap, LOGIN.GITHUB, "github"),
  _defineProperty(_loginToConnectionMap, LOGIN.LINKEDIN, "linkedin"),
  _defineProperty(_loginToConnectionMap, LOGIN.TWITTER, "twitter"),
  _defineProperty(_loginToConnectionMap, LOGIN.WEIBO, "weibo"),
  _defineProperty(_loginToConnectionMap, LOGIN.LINE, "line"),
  _defineProperty(_loginToConnectionMap, LOGIN.EMAIL_PASSWORD, "Username-Password-Authentication"),
  _defineProperty(_loginToConnectionMap, LOGIN.PASSWORDLESS, "email"),
  _loginToConnectionMap);
var padUrlString = function padUrlString(url) {
  return url.href.endsWith("/") ? url.href : "".concat(url.href, "/");
};
/**
 * Returns a random number. Don't use for cryptographic purposes.
 * @returns a random number
 */
var randomId = function randomId() {
  return Math.random().toString(36).slice(2);
};
var broadcastChannelOptions = {
  // type: 'localstorage', // (optional) enforce a type, oneOf['native', 'idb', 'localstorage', 'node']
  webWorkerSupport: false, // (optional) set this to false if you know that your channel will never be used in a WebWorker (increases performance)
};

function caseSensitiveField(field, isCaseSensitive) {
  return isCaseSensitive ? field : field.toLowerCase();
}
var getVerifierId = function getVerifierId(userInfo, typeOfLogin, verifierIdField) {
  var isVerifierIdCaseSensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var name = userInfo.name,
    sub = userInfo.sub;
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
var handleRedirectParameters = function handleRedirectParameters(hash, queryParameters) {
  var hashParameters = hash.split("&").reduce(function (result, item) {
    var _item$split = item.split("="),
      _item$split2 = _slicedToArray(_item$split, 2),
      part0 = _item$split2[0],
      part1 = _item$split2[1];
    result[part0] = part1;
    return result;
  }, {});
  log.info(hashParameters, queryParameters);
  var instanceParameters = {};
  var error = "";
  if (Object.keys(hashParameters).length > 0 && hashParameters.state) {
    instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(hashParameters.state)))) || {};
    error = hashParameters.error_description || hashParameters.error || error;
  } else if (Object.keys(queryParameters).length > 0 && queryParameters.state) {
    instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(queryParameters.state)))) || {};
    if (queryParameters.error) error = queryParameters.error;
  }
  return {
    error: error,
    instanceParameters: instanceParameters,
    hashParameters: hashParameters,
  };
};
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
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
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  var w = 1200;
  var h = 700;
  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;
  var systemZoom = 1; // No reliable estimate
  var left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
  var top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
  var features = "titlebar=0,toolbar=0,status=0,location=0,menubar=0,height="
    .concat(h / systemZoom, ",width=")
    .concat(w / systemZoom, ",top=")
    .concat(top, ",left=")
    .concat(left);
  return features;
}
var isFirefox = function isFirefox() {
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
  var baseURL = params.baseURL,
    query = params.query,
    hash = params.hash;
  var url = new URL(baseURL);
  if (query) {
    Object.keys(query).forEach(function (key) {
      url.searchParams.append(key, query[key]);
    });
  }
  if (hash) {
    var h = new URL(
      constructURL({
        baseURL: baseURL,
        query: hash,
      })
    ).searchParams.toString();
    url.hash = h;
  }
  return url.toString();
}
function are3PCSupported() {
  var _navigator;
  var browserInfo = Bowser.parse(navigator.userAgent);
  log.info(JSON.stringify(browserInfo), "current browser info");
  var thirdPartyCookieSupport = true;
  // brave
  if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.brave) {
    thirdPartyCookieSupport = false;
  }
  // All webkit & gecko engine instances use itp (intelligent tracking prevention -
  // https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp)
  if (browserInfo.engine.name === ENGINE_MAP.WebKit || browserInfo.engine.name === ENGINE_MAP.Gecko) {
    thirdPartyCookieSupport = false;
  }
  return thirdPartyCookieSupport;
}
var validateAndConstructUrl = function validateAndConstructUrl(domain) {
  try {
    var url = new URL(decodeURIComponent(domain));
    return url;
  } catch (error) {
    throw new Error(
      ""
        .concat((error === null || error === void 0 ? void 0 : error.message) || "", ", Note: Your jwt domain: (i.e ")
        .concat(domain, ") must have http:// or https:// prefix")
    );
  }
};

function _createSuper$9(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$9();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$9() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var PopupHandler = /*#__PURE__*/ (function (_EventEmitter) {
  _inherits(PopupHandler, _EventEmitter);
  var _super = _createSuper$9(PopupHandler);
  function PopupHandler(_ref) {
    var _this;
    var url = _ref.url,
      target = _ref.target,
      features = _ref.features;
    _classCallCheck(this, PopupHandler);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "url", void 0);
    _defineProperty(_assertThisInitialized(_this), "target", void 0);
    _defineProperty(_assertThisInitialized(_this), "features", void 0);
    _defineProperty(_assertThisInitialized(_this), "window", void 0);
    _defineProperty(_assertThisInitialized(_this), "windowTimer", void 0);
    _defineProperty(_assertThisInitialized(_this), "iClosedWindow", void 0);
    _this.url = url;
    _this.target = target || "_blank";
    _this.features = features || getPopupFeatures();
    _this.window = undefined;
    _this.windowTimer = undefined;
    _this.iClosedWindow = false;
    _this._setupTimer();
    return _this;
  }
  _createClass(PopupHandler, [
    {
      key: "_setupTimer",
      value: function _setupTimer() {
        var _this2 = this;
        this.windowTimer = Number(
          setInterval(function () {
            if (_this2.window && _this2.window.closed) {
              clearInterval(_this2.windowTimer);
              if (!_this2.iClosedWindow) {
                _this2.emit("close");
              }
              _this2.iClosedWindow = false;
              _this2.window = undefined;
            }
            if (_this2.window === undefined) clearInterval(_this2.windowTimer);
          }, 500)
        );
      },
    },
    {
      key: "open",
      value: function open() {
        var _this$window;
        this.window = window.open(this.url.href, this.target, this.features);
        if ((_this$window = this.window) !== null && _this$window !== void 0 && _this$window.focus) this.window.focus();
        return Promise.resolve();
      },
    },
    {
      key: "close",
      value: function close() {
        this.iClosedWindow = true;
        if (this.window) this.window.close();
      },
    },
    {
      key: "redirect",
      value: function redirect(locationReplaceOnRedirect) {
        if (locationReplaceOnRedirect) {
          window.location.replace(this.url.href);
        } else {
          window.location.href = this.url.href;
        }
      },
    },
  ]);
  return PopupHandler;
})(EventEmitter);

var _excluded$2 = ["access_token", "id_token"];
function ownKeys$2(object, enumerableOnly) {
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
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys$2(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}
var AbstractLoginHandler = /*#__PURE__*/ (function () {
  // Not using object constructor because of this issue
  // https://github.com/microsoft/TypeScript/issues/5326
  function AbstractLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    _classCallCheck(this, AbstractLoginHandler);
    _defineProperty(this, "clientId", void 0);
    _defineProperty(this, "verifier", void 0);
    _defineProperty(this, "redirect_uri", void 0);
    _defineProperty(this, "typeOfLogin", void 0);
    _defineProperty(this, "uxMode", void 0);
    _defineProperty(this, "redirectToOpener", void 0);
    _defineProperty(this, "jwtParams", void 0);
    _defineProperty(this, "customState", void 0);
    _defineProperty(this, "nonce", randomId());
    _defineProperty(this, "finalURL", void 0);
    this.clientId = clientId;
    this.verifier = verifier;
    this.redirect_uri = redirect_uri;
    this.typeOfLogin = typeOfLogin;
    this.uxMode = uxMode;
    this.redirectToOpener = redirectToOpener;
    this.jwtParams = jwtParams;
    this.customState = customState;
  }
  _createClass(AbstractLoginHandler, [
    {
      key: "state",
      get: function get() {
        return encodeURIComponent(
          window.btoa(
            JSON.stringify(
              _objectSpread$2(
                _objectSpread$2({}, this.customState || {}),
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
      },
    },
    {
      key: "handleLoginWindow",
      value: function handleLoginWindow(params) {
        var _this = this;
        var verifierWindow = new PopupHandler({
          url: this.finalURL,
          features: params.popupFeatures,
        });
        if (this.uxMode === UX_MODE.REDIRECT) {
          verifierWindow.redirect(params.locationReplaceOnRedirect);
        } else {
          return new Promise(function (resolve, reject) {
            var bc;
            var handleData = /*#__PURE__*/ (function () {
              var _ref = _asyncToGenerator(
                /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(ev) {
                  var error, data, _ref2, instanceParams, _ref2$hashParams, accessToken, idToken, rest;
                  return _regeneratorRuntime.wrap(
                    function _callee$(_context) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            _context.prev = 0;
                            (error = ev.error), (data = ev.data);
                            (_ref2 = data || {}),
                              (instanceParams = _ref2.instanceParams),
                              (_ref2$hashParams = _ref2.hashParams),
                              (accessToken = _ref2$hashParams.access_token),
                              (idToken = _ref2$hashParams.id_token),
                              (rest = _objectWithoutProperties(_ref2$hashParams, _excluded$2));
                            if (!error) {
                              _context.next = 7;
                              break;
                            }
                            log.error(ev);
                            reject(new Error("Error: ".concat(error, ". Info: ").concat(JSON.stringify(ev.data || {}))));
                            return _context.abrupt("return");
                          case 7:
                            if (!(ev.data && instanceParams.verifier === _this.verifier)) {
                              _context.next = 13;
                              break;
                            }
                            log.info(ev.data);
                            if (!(!_this.redirectToOpener && bc)) {
                              _context.next = 12;
                              break;
                            }
                            _context.next = 12;
                            return bc.postMessage({
                              success: true,
                            });
                          case 12:
                            resolve(
                              _objectSpread$2(
                                _objectSpread$2(
                                  {
                                    accessToken: accessToken,
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
                          case 13:
                            _context.next = 19;
                            break;
                          case 15:
                            _context.prev = 15;
                            _context.t0 = _context["catch"](0);
                            log.error(_context.t0);
                            reject(_context.t0);
                          case 19:
                          case "end":
                            return _context.stop();
                        }
                      }
                    },
                    _callee,
                    null,
                    [[0, 15]]
                  );
                })
              );
              return function handleData(_x) {
                return _ref.apply(this, arguments);
              };
            })();
            if (!_this.redirectToOpener) {
              bc = new BroadcastChannel("redirect_channel_".concat(_this.nonce), broadcastChannelOptions);
              bc.addEventListener(
                "message",
                /*#__PURE__*/ (function () {
                  var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(ev) {
                      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch ((_context2.prev = _context2.next)) {
                            case 0:
                              _context2.next = 2;
                              return handleData(ev);
                            case 2:
                              bc.close();
                              verifierWindow.close();
                            case 4:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    })
                  );
                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                })()
              );
            } else {
              var postMessageEventHandler = /*#__PURE__*/ (function () {
                var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/ _regeneratorRuntime.mark(function _callee3(postMessageEvent) {
                    var ev;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch ((_context3.prev = _context3.next)) {
                          case 0:
                            if (postMessageEvent.data) {
                              _context3.next = 2;
                              break;
                            }
                            return _context3.abrupt("return");
                          case 2:
                            ev = postMessageEvent.data;
                            if (!(ev.channel !== "redirect_channel_".concat(_this.nonce))) {
                              _context3.next = 5;
                              break;
                            }
                            return _context3.abrupt("return");
                          case 5:
                            window.removeEventListener("message", postMessageEventHandler);
                            handleData(ev);
                            verifierWindow.close();
                          case 8:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })
                );
                return function postMessageEventHandler(_x3) {
                  return _ref4.apply(this, arguments);
                };
              })();
              window.addEventListener("message", postMessageEventHandler);
            }
            verifierWindow.open();
            verifierWindow.once("close", function () {
              if (bc) bc.close();
              reject(new Error("user closed popup"));
            });
          });
        }
        return null;
      },
    },
  ]);
  return AbstractLoginHandler;
})();

function _createSuper$8(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$8();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$8() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var DiscordHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(DiscordHandler, _AbstractLoginHandler);
  var _super = _createSuper$8(DiscordHandler);
  function DiscordHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, DiscordHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token");
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "identify email");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(DiscordHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://discord.com/api/oauth2/authorize");
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
          {
            state: this.state,
            response_type: this.RESPONSE_TYPE,
            client_id: this.clientId,
            redirect_uri: this.redirect_uri,
            scope: this.SCOPE,
          },
          clonedParams
        );
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var accessToken,
              userInfo,
              id,
              avatar,
              _userInfo$email,
              email,
              _userInfo$username,
              name,
              _userInfo$discriminat,
              discriminator,
              profileImage;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      accessToken = params.accessToken;
                      _context.next = 3;
                      return get("https://discord.com/api/users/@me", {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 3:
                      userInfo = _context.sent;
                      (id = userInfo.id),
                        (avatar = userInfo.avatar),
                        (_userInfo$email = userInfo.email),
                        (email = _userInfo$email === void 0 ? "" : _userInfo$email),
                        (_userInfo$username = userInfo.username),
                        (name = _userInfo$username === void 0 ? "" : _userInfo$username),
                        (_userInfo$discriminat = userInfo.discriminator),
                        (discriminator = _userInfo$discriminat === void 0 ? "" : _userInfo$discriminat);
                      profileImage =
                        avatar === null
                          ? "https://cdn.discord.com/embed/avatars/".concat(Number(discriminator) % 5, ".png")
                          : "https://cdn.discord.com/avatars/".concat(id, "/").concat(avatar, ".png?size=2048");
                      return _context.abrupt("return", {
                        profileImage: profileImage,
                        name: "".concat(name, "#").concat(discriminator),
                        email: email,
                        verifierId: id,
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return DiscordHandler;
})(AbstractLoginHandler);

function _createSuper$7(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$7();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$7() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var FacebookHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(FacebookHandler, _AbstractLoginHandler);
  var _super = _createSuper$7(FacebookHandler);
  function FacebookHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, FacebookHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token");
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "public_profile email");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(FacebookHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://www.facebook.com/v15.0/dialog/oauth");
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
          {
            state: this.state,
            response_type: this.RESPONSE_TYPE,
            client_id: this.clientId,
            redirect_uri: this.redirect_uri,
            scope: this.SCOPE,
          },
          clonedParams
        );
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var accessToken, userInfo, _userInfo$name, name, id, picture, _userInfo$email, email;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      accessToken = params.accessToken;
                      _context.next = 3;
                      return get("https://graph.facebook.com/me?fields=name,email,picture.type(large)", {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 3:
                      userInfo = _context.sent;
                      (_userInfo$name = userInfo.name),
                        (name = _userInfo$name === void 0 ? "" : _userInfo$name),
                        (id = userInfo.id),
                        (picture = userInfo.picture),
                        (_userInfo$email = userInfo.email),
                        (email = _userInfo$email === void 0 ? "" : _userInfo$email);
                      return _context.abrupt("return", {
                        email: email,
                        name: name,
                        profileImage: picture.data.url || "",
                        verifier: this.verifier,
                        verifierId: id,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return FacebookHandler;
})(AbstractLoginHandler);

function _createSuper$6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$6();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$6() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var GoogleHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(GoogleHandler, _AbstractLoginHandler);
  var _super = _createSuper$6(GoogleHandler);
  function GoogleHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, GoogleHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token id_token");
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "profile email openid");
    _defineProperty(_assertThisInitialized(_this), "PROMPT", "consent select_account");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(GoogleHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
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
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var accessToken, userInfo, _userInfo$picture, profileImage, _userInfo$email, email, _userInfo$name, name;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      accessToken = params.accessToken;
                      _context.next = 3;
                      return get("https://www.googleapis.com/userinfo/v2/me", {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 3:
                      userInfo = _context.sent;
                      (_userInfo$picture = userInfo.picture),
                        (profileImage = _userInfo$picture === void 0 ? "" : _userInfo$picture),
                        (_userInfo$email = userInfo.email),
                        (email = _userInfo$email === void 0 ? "" : _userInfo$email),
                        (_userInfo$name = userInfo.name),
                        (name = _userInfo$name === void 0 ? "" : _userInfo$name);
                      return _context.abrupt("return", {
                        email: email,
                        name: name,
                        profileImage: profileImage,
                        verifier: this.verifier,
                        verifierId: email.toLowerCase(),
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return GoogleHandler;
})(AbstractLoginHandler);

function _createSuper$5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$5() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var JwtHandler$1 = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(JwtHandler, _AbstractLoginHandler);
  var _super = _createSuper$5(JwtHandler);
  function JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, JwtHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "openid profile email");
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token id_token");
    _defineProperty(_assertThisInitialized(_this), "PROMPT", "login");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(JwtHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var domain = this.jwtParams.domain;
        var finalUrl = validateAndConstructUrl(domain);
        finalUrl.pathname += finalUrl.pathname.endsWith("/") ? "authorize" : "/authorize";
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
        delete clonedParams.domain;
        var finalJwtParams = deepmerge(
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
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var idToken,
              accessToken,
              _this$jwtParams,
              domain,
              verifierIdField,
              isVerifierIdCaseSensitive,
              _this$jwtParams$user_,
              user_info_route,
              domainUrl,
              userInfo,
              picture,
              name,
              email,
              decodedToken,
              _name,
              _email,
              _picture;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (idToken = params.idToken), (accessToken = params.accessToken);
                      (_this$jwtParams = this.jwtParams),
                        (domain = _this$jwtParams.domain),
                        (verifierIdField = _this$jwtParams.verifierIdField),
                        (isVerifierIdCaseSensitive = _this$jwtParams.isVerifierIdCaseSensitive),
                        (_this$jwtParams$user_ = _this$jwtParams.user_info_route),
                        (user_info_route = _this$jwtParams$user_ === void 0 ? "userinfo" : _this$jwtParams$user_);
                      if (!accessToken) {
                        _context.next = 15;
                        break;
                      }
                      _context.prev = 3;
                      domainUrl = new URL(domain);
                      _context.next = 7;
                      return get("".concat(padUrlString(domainUrl)).concat(user_info_route), {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 7:
                      userInfo = _context.sent;
                      (picture = userInfo.picture), (name = userInfo.name), (email = userInfo.email);
                      return _context.abrupt("return", {
                        email: email,
                        name: name,
                        profileImage: picture,
                        verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 12:
                      _context.prev = 12;
                      _context.t0 = _context["catch"](3);
                      // ignore
                      log$1.warn(_context.t0, "Unable to get userinfo from endpoint");
                    case 15:
                      if (!idToken) {
                        _context.next = 19;
                        break;
                      }
                      decodedToken = jwtDecode(idToken);
                      (_name = decodedToken.name), (_email = decodedToken.email), (_picture = decodedToken.picture);
                      return _context.abrupt("return", {
                        profileImage: _picture,
                        name: _name,
                        email: _email,
                        verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 19:
                      throw new Error("Access/id token not available");
                    case 20:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[3, 12]]
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return JwtHandler;
})(AbstractLoginHandler);

function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var MockLoginHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(MockLoginHandler, _AbstractLoginHandler);
  var _super = _createSuper$4(MockLoginHandler);
  function MockLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, MockLoginHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(MockLoginHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
        delete clonedParams.domain;
        var finalJwtParams = deepmerge(
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
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var idToken,
              accessToken,
              _this$jwtParams,
              domain,
              verifierIdField,
              isVerifierIdCaseSensitive,
              _this$jwtParams$user_,
              user_info_route,
              domainUrl,
              userInfo,
              picture,
              name,
              email,
              decodedToken,
              _name,
              _email,
              _picture;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (idToken = params.idToken), (accessToken = params.accessToken);
                      (_this$jwtParams = this.jwtParams),
                        (domain = _this$jwtParams.domain),
                        (verifierIdField = _this$jwtParams.verifierIdField),
                        (isVerifierIdCaseSensitive = _this$jwtParams.isVerifierIdCaseSensitive),
                        (_this$jwtParams$user_ = _this$jwtParams.user_info_route),
                        (user_info_route = _this$jwtParams$user_ === void 0 ? "userinfo" : _this$jwtParams$user_);
                      if (!accessToken) {
                        _context.next = 15;
                        break;
                      }
                      _context.prev = 3;
                      domainUrl = new URL(domain);
                      _context.next = 7;
                      return get("".concat(padUrlString(domainUrl)).concat(user_info_route), {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 7:
                      userInfo = _context.sent;
                      (picture = userInfo.picture), (name = userInfo.name), (email = userInfo.email);
                      return _context.abrupt("return", {
                        email: email,
                        name: name,
                        profileImage: picture,
                        verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 12:
                      _context.prev = 12;
                      _context.t0 = _context["catch"](3);
                      // ignore
                      log$1.warn(_context.t0, "Unable to get userinfo from endpoint");
                    case 15:
                      if (!idToken) {
                        _context.next = 19;
                        break;
                      }
                      decodedToken = jwtDecode(idToken);
                      (_name = decodedToken.name), (_email = decodedToken.email), (_picture = decodedToken.picture);
                      return _context.abrupt("return", {
                        profileImage: _picture,
                        name: _name,
                        email: _email,
                        verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 19:
                      throw new Error("Access/id token not available");
                    case 20:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[3, 12]]
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
    {
      key: "handleLoginWindow",
      value: function handleLoginWindow(params) {
        var _this$jwtParams2 = this.jwtParams,
          idToken = _this$jwtParams2.id_token,
          accessToken = _this$jwtParams2.access_token;
        var verifierWindow = new PopupHandler({
          url: this.finalURL,
          features: params.popupFeatures,
        });
        if (this.uxMode === UX_MODE.REDIRECT) {
          verifierWindow.redirect(params.locationReplaceOnRedirect);
        } else {
          return Promise.resolve({
            state: {},
            idToken: idToken,
            accessToken: accessToken,
          });
        }
        return null;
      },
    },
  ]);
  return MockLoginHandler;
})(AbstractLoginHandler);

var _excluded$1 = ["access_token", "id_token"];
function ownKeys$1(object, enumerableOnly) {
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
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys$1(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var JwtHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(JwtHandler, _AbstractLoginHandler);
  var _super = _createSuper$3(JwtHandler);
  function JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, JwtHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "openid profile email");
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token id_token");
    _defineProperty(_assertThisInitialized(_this), "PROMPT", "login");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(JwtHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var domain = this.jwtParams.domain;
        var domainUrl = validateAndConstructUrl(domain);
        domainUrl.pathname = "/passwordless/start";
        this.finalURL = domainUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var idToken,
              accessToken,
              _this$jwtParams,
              domain,
              verifierIdField,
              isVerifierIdCaseSensitive,
              domainUrl,
              userInfo,
              picture,
              name,
              email,
              decodedToken,
              _name,
              _email,
              _picture;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (idToken = params.idToken), (accessToken = params.accessToken);
                      (_this$jwtParams = this.jwtParams),
                        (domain = _this$jwtParams.domain),
                        (verifierIdField = _this$jwtParams.verifierIdField),
                        (isVerifierIdCaseSensitive = _this$jwtParams.isVerifierIdCaseSensitive);
                      _context.prev = 2;
                      domainUrl = new URL(domain);
                      _context.next = 6;
                      return get("".concat(padUrlString(domainUrl), "userinfo"), {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 6:
                      userInfo = _context.sent;
                      (picture = userInfo.picture), (name = userInfo.name), (email = userInfo.email);
                      return _context.abrupt("return", {
                        email: email,
                        name: name,
                        profileImage: picture,
                        verifierId: getVerifierId(userInfo, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 11:
                      _context.prev = 11;
                      _context.t0 = _context["catch"](2);
                      log.error(_context.t0);
                      decodedToken = jwtDecode(idToken);
                      (_name = decodedToken.name), (_email = decodedToken.email), (_picture = decodedToken.picture);
                      return _context.abrupt("return", {
                        profileImage: _picture,
                        name: _name,
                        email: _email,
                        verifierId: getVerifierId(decodedToken, this.typeOfLogin, verifierIdField, isVerifierIdCaseSensitive),
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[2, 11]]
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
    {
      key: "handleLoginWindow",
      value: function handleLoginWindow() {
        var _this2 = this;
        return new Promise(function (resolve, reject) {
          if (_this2.redirectToOpener) {
            reject(new Error("Cannot use redirect to opener for passwordless"));
            return;
          }
          var handleData = function handleData(ev) {
            try {
              var error = ev.error,
                data = ev.data;
              var _ref = data || {},
                instanceParams = _ref.instanceParams,
                _ref$hashParams = _ref.hashParams,
                accessToken = _ref$hashParams.access_token,
                idToken = _ref$hashParams.id_token,
                rest = _objectWithoutProperties(_ref$hashParams, _excluded$1);
              if (error) {
                log.error(ev.error);
                reject(new Error(error));
                return;
              }
              if (ev.data && instanceParams.verifier === _this2.verifier) {
                log.info(ev.data);
                resolve(
                  _objectSpread$1(
                    _objectSpread$1(
                      {
                        accessToken: accessToken,
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
              log.error(error);
              reject(error);
            }
          };
          var bc = new BroadcastChannel("redirect_channel_".concat(_this2.nonce), broadcastChannelOptions);
          bc.addEventListener(
            "message",
            /*#__PURE__*/ (function () {
              var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(ev) {
                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          handleData(ev);
                          bc.close();
                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })
              );
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            })()
          );
          try {
            var _this2$jwtParams = _this2.jwtParams,
              _this2$jwtParams$conn = _this2$jwtParams.connection,
              connection = _this2$jwtParams$conn === void 0 ? "email" : _this2$jwtParams$conn,
              login_hint = _this2$jwtParams.login_hint;
            var finalJwtParams = deepmerge(
              {
                client_id: _this2.clientId,
                connection: connection,
                email: connection === "email" ? login_hint : undefined,
                phone_number: connection === "sms" ? login_hint : undefined,
                send: "link",
                authParams: {
                  scope: _this2.SCOPE,
                  state: _this2.state,
                  response_type: _this2.RESPONSE_TYPE,
                  redirect_uri: _this2.redirect_uri,
                  nonce: _this2.nonce,
                  prompt: _this2.PROMPT,
                },
              },
              {
                authParams: _this2.jwtParams,
              }
            );
            // using stringify and parse to remove undefined params
            // This method is only resolved when the user clicks the email link
            post(_this2.finalURL.href, JSON.parse(JSON.stringify(finalJwtParams)))
              .then(function (response) {
                log.info("posted", response);
                return undefined;
              })
              .catch(function (error) {
                log.error(error);
                reject(error);
              });
          } catch (error) {
            log.error(error);
            reject(error);
          }
        });
      },
    },
  ]);
  return JwtHandler;
})(AbstractLoginHandler);

function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var RedditHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(RedditHandler, _AbstractLoginHandler);
  var _super = _createSuper$2(RedditHandler);
  function RedditHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, RedditHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token");
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "identity");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(RedditHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://www.reddit.com/api/v1/authorize".concat(window.innerWidth < 600 ? ".compact" : ""));
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
          {
            state: this.state,
            response_type: this.RESPONSE_TYPE,
            client_id: this.clientId,
            redirect_uri: this.redirect_uri,
            scope: this.SCOPE,
          },
          clonedParams
        );
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var accessToken, userInfo, _userInfo$icon_img, profileImage, _userInfo$name, name;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      accessToken = params.accessToken;
                      _context.next = 3;
                      return get("https://oauth.reddit.com/api/v1/me", {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                        },
                      });
                    case 3:
                      userInfo = _context.sent;
                      (_userInfo$icon_img = userInfo.icon_img),
                        (profileImage = _userInfo$icon_img === void 0 ? "" : _userInfo$icon_img),
                        (_userInfo$name = userInfo.name),
                        (name = _userInfo$name === void 0 ? "" : _userInfo$name);
                      return _context.abrupt("return", {
                        email: "",
                        name: name,
                        profileImage: profileImage.split("?").length > 0 ? profileImage.split("?")[0] : profileImage,
                        verifier: this.verifier,
                        verifierId: name.toLowerCase(),
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return RedditHandler;
})(AbstractLoginHandler);

function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var TwitchHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(TwitchHandler, _AbstractLoginHandler);
  var _super = _createSuper$1(TwitchHandler);
  function TwitchHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
    var _this;
    _classCallCheck(this, TwitchHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "RESPONSE_TYPE", "token");
    _defineProperty(_assertThisInitialized(_this), "SCOPE", "user:read:email");
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(TwitchHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://id.twitch.tv/oauth2/authorize");
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
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
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params) {
            var accessToken,
              userInfo,
              _ref,
              _ref2,
              _ref2$,
              _ref2$$profile_image_,
              profileImage,
              _ref2$$display_name,
              name,
              _ref2$$email,
              email,
              verifierId;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      accessToken = params.accessToken;
                      _context.next = 3;
                      return get("https://api.twitch.tv/helix/users", {
                        headers: {
                          Authorization: "Bearer ".concat(accessToken),
                          "Client-ID": this.clientId,
                        },
                      });
                    case 3:
                      userInfo = _context.sent;
                      (_ref = userInfo.data || []),
                        (_ref2 = _slicedToArray(_ref, 1)),
                        (_ref2$ = _ref2[0]),
                        (_ref2$$profile_image_ = _ref2$.profile_image_url),
                        (profileImage = _ref2$$profile_image_ === void 0 ? "" : _ref2$$profile_image_),
                        (_ref2$$display_name = _ref2$.display_name),
                        (name = _ref2$$display_name === void 0 ? "" : _ref2$$display_name),
                        (_ref2$$email = _ref2$.email),
                        (email = _ref2$$email === void 0 ? "" : _ref2$$email),
                        (verifierId = _ref2$.id);
                      return _context.abrupt("return", {
                        profileImage: profileImage,
                        name: name,
                        email: email,
                        verifierId: verifierId,
                        verifier: this.verifier,
                        typeOfLogin: this.typeOfLogin,
                      });
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return TwitchHandler;
})(AbstractLoginHandler);

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var WEBAUTHN_LOOKUP_SERVER = "https://api.webauthn.openlogin.com";
var WebAuthnHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
  _inherits(WebAuthnHandler, _AbstractLoginHandler);
  var _super = _createSuper(WebAuthnHandler);
  function WebAuthnHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly) {
    var _this;
    _classCallCheck(this, WebAuthnHandler);
    _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
    _defineProperty(_assertThisInitialized(_this), "clientId", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifier", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirect_uri", void 0);
    _defineProperty(_assertThisInitialized(_this), "typeOfLogin", void 0);
    _defineProperty(_assertThisInitialized(_this), "uxMode", void 0);
    _defineProperty(_assertThisInitialized(_this), "redirectToOpener", void 0);
    _defineProperty(_assertThisInitialized(_this), "jwtParams", void 0);
    _defineProperty(_assertThisInitialized(_this), "customState", void 0);
    _defineProperty(_assertThisInitialized(_this), "registerOnly", void 0);
    _this.clientId = clientId;
    _this.verifier = verifier;
    _this.redirect_uri = redirect_uri;
    _this.typeOfLogin = typeOfLogin;
    _this.uxMode = uxMode;
    _this.redirectToOpener = redirectToOpener;
    _this.jwtParams = jwtParams;
    _this.customState = customState;
    _this.registerOnly = registerOnly;
    _this.setFinalUrl();
    return _this;
  }
  _createClass(WebAuthnHandler, [
    {
      key: "setFinalUrl",
      value: function setFinalUrl() {
        var finalUrl = new URL("https://webauthn.openlogin.com");
        var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
        var finalJwtParams = deepmerge(
          {
            register_only: !!this.registerOnly,
            state: this.state,
            client_id: this.clientId,
            redirect_uri: this.redirect_uri,
          },
          clonedParams
        );
        Object.keys(finalJwtParams).forEach(function (key) {
          if (finalJwtParams[key]) finalUrl.searchParams.append(key, finalJwtParams[key]);
        });
        this.finalURL = finalUrl;
      },
    },
    {
      key: "getUserInfo",
      value: (function () {
        var _getUserInfo = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(parameters) {
            var idToken,
              ref,
              extraParamsPassed,
              extraParams,
              verifierId,
              signature,
              clientDataJSON,
              authenticatorData,
              publicKey,
              challenge,
              rpOrigin,
              credId,
              transports,
              _JSON$parse,
              _yield$get,
              _yield$get2;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (idToken = parameters.idToken),
                        (ref = parameters.ref),
                        (extraParamsPassed = parameters.extraParamsPassed),
                        (extraParams = parameters.extraParams);
                      if (!(extraParamsPassed === "true")) {
                        _context.next = 33;
                        break;
                      }
                      log.debug("extraParamsPassed is true, using extraParams passed through hashParams");
                      _context.prev = 3;
                      _JSON$parse = JSON.parse(atob(extraParams));
                      verifierId = _JSON$parse.verifier_id;
                      signature = _JSON$parse.signature;
                      clientDataJSON = _JSON$parse.clientDataJSON;
                      authenticatorData = _JSON$parse.authenticatorData;
                      publicKey = _JSON$parse.publicKey;
                      challenge = _JSON$parse.challenge;
                      rpOrigin = _JSON$parse.rpOrigin;
                      credId = _JSON$parse.credId;
                      transports = _JSON$parse.transports;
                      _context.next = 31;
                      break;
                    case 16:
                      _context.prev = 16;
                      _context.t0 = _context["catch"](3);
                      log.warn("unable to parse extraParams", _context.t0);
                      _context.next = 21;
                      return get("".concat(WEBAUTHN_LOOKUP_SERVER, "/signature/fetch/").concat(idToken));
                    case 21:
                      _yield$get = _context.sent;
                      verifierId = _yield$get.verifier_id;
                      signature = _yield$get.signature;
                      clientDataJSON = _yield$get.clientDataJSON;
                      authenticatorData = _yield$get.authenticatorData;
                      publicKey = _yield$get.publicKey;
                      challenge = _yield$get.challenge;
                      rpOrigin = _yield$get.rpOrigin;
                      credId = _yield$get.credId;
                      transports = _yield$get.transports;
                    case 31:
                      _context.next = 46;
                      break;
                    case 33:
                      log.debug("extraParamsPassed is false, using extraParams passed through bridge server");
                      _context.next = 36;
                      return get("".concat(WEBAUTHN_LOOKUP_SERVER, "/signature/fetch/").concat(idToken));
                    case 36:
                      _yield$get2 = _context.sent;
                      verifierId = _yield$get2.verifier_id;
                      signature = _yield$get2.signature;
                      clientDataJSON = _yield$get2.clientDataJSON;
                      authenticatorData = _yield$get2.authenticatorData;
                      publicKey = _yield$get2.publicKey;
                      challenge = _yield$get2.challenge;
                      rpOrigin = _yield$get2.rpOrigin;
                      credId = _yield$get2.credId;
                      transports = _yield$get2.transports;
                    case 46:
                      if (!(signature !== idToken)) {
                        _context.next = 48;
                        break;
                      }
                      throw new Error("idtoken should be equal to signature");
                    case 48:
                      return _context.abrupt("return", {
                        email: "",
                        name: "WebAuthn Login",
                        profileImage: "",
                        verifier: this.verifier,
                        verifierId: verifierId,
                        typeOfLogin: this.typeOfLogin,
                        ref: ref,
                        registerOnly: this.registerOnly,
                        extraVerifierParams: {
                          signature: signature,
                          clientDataJSON: clientDataJSON,
                          authenticatorData: authenticatorData,
                          publicKey: publicKey,
                          challenge: challenge,
                          rpOrigin: rpOrigin,
                          credId: credId,
                          transports: transports,
                        },
                      });
                    case 49:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[3, 16]]
            );
          })
        );
        function getUserInfo(_x) {
          return _getUserInfo.apply(this, arguments);
        }
        return getUserInfo;
      })(),
    },
  ]);
  return WebAuthnHandler;
})(AbstractLoginHandler);

var createHandler = function createHandler(_ref) {
  var clientId = _ref.clientId,
    redirect_uri = _ref.redirect_uri,
    typeOfLogin = _ref.typeOfLogin,
    verifier = _ref.verifier,
    jwtParams = _ref.jwtParams,
    redirectToOpener = _ref.redirectToOpener,
    uxMode = _ref.uxMode,
    customState = _ref.customState,
    registerOnly = _ref.registerOnly;
  if (!verifier || !typeOfLogin || !clientId) {
    throw new Error("Invalid params");
  }
  var _ref2 = jwtParams || {},
    domain = _ref2.domain,
    login_hint = _ref2.login_hint,
    id_token = _ref2.id_token,
    access_token = _ref2.access_token;
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
      if (id_token || access_token) {
        return new MockLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      }
      if (!domain) throw new Error("Invalid params");
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

var registerServiceWorker = function registerServiceWorker(baseUrl) {
  return new Promise(function (resolve, reject) {
    var swUrl = "".concat(baseUrl, "sw.js");
    if ("serviceWorker" in window.navigator) {
      // if swIntegrity is not calculated
      register(swUrl, {
        ready: function ready() {
          log.info("App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB");
          resolve(undefined);
        },
        registered: function registered() {
          log.info("Service worker has been registered.");
          resolve(undefined);
        },
        cached: function cached() {
          log.info("Content has been cached for offline use.");
          resolve(undefined);
        },
        updatefound: function updatefound() {
          log.info("New content is downloading.");
        },
        updated: function updated() {
          log.info("New content is available; please refresh.");
        },
        offline: function offline() {
          log.info("No internet connection found. App is running in offline mode.");
          reject(new Error("App is offline"));
        },
        error: function error(_error) {
          log.error("Error during service worker registration:", _error);
          reject(_error);
        },
      });
    } else {
      reject(new Error("Service workers are not supported"));
    }
  });
};

var SentryHandler = /*#__PURE__*/ (function () {
  function SentryHandler(sentry, chainUrl) {
    _classCallCheck(this, SentryHandler);
    _defineProperty(this, "sentry", null);
    _defineProperty(this, "chainUrl", "");
    this.sentry = sentry;
    this.chainUrl = chainUrl;
  }
  _createClass(SentryHandler, [
    {
      key: "startTransaction",
      value: function startTransaction(context) {
        if (this.sentry) {
          if (context.name === SENTRY_TXNS.FETCH_NODE_DETAILS && this.chainUrl) {
            context.name += this.chainUrl;
          }
          return this.sentry.startTransaction(context);
        }
      },
    },
    {
      key: "finishTransaction",
      value: function finishTransaction(tx) {
        if (tx) {
          tx.finish();
        }
      },
    },
  ]);
  return SentryHandler;
})();

var StorageHelper = /*#__PURE__*/ (function () {
  function StorageHelper(serverUrl) {
    _classCallCheck(this, StorageHelper);
    _defineProperty(this, "currentStorageMethod", REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE);
    _defineProperty(this, "isInitialized", false);
    _defineProperty(this, "storageServerUrl", "https://broadcast-server.tor.us");
    this.storageServerUrl = serverUrl;
  }
  _createClass(StorageHelper, [
    {
      key: "init",
      value: function init() {
        var support = are3PCSupported();
        var localStorageAvailable = storageAvailable(REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE);
        if (support && localStorageAvailable) {
          // use local storage as default for storing stuff
          this.currentStorageMethod = REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE;
        } else {
          // use server store as default for storing stuff
          this.currentStorageMethod = REDIRECT_PARAMS_STORAGE_METHOD.SERVER;
        }
        this.isInitialized = true;
      },
    },
    {
      key: "storeLoginDetails",
      value: (function () {
        var _storeLoginDetails = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(params, scope) {
            var privKey, privKeyHex, publicKeyHex, encData, signature;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      if (this.isInitialized) {
                        _context.next = 2;
                        break;
                      }
                      throw new Error("StorageHelper is not initialized");
                    case 2:
                      if (!(this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.SERVER)) {
                        _context.next = 16;
                        break;
                      }
                      privKey = keccak256(scope);
                      privKeyHex = privKey.toString("hex");
                      publicKeyHex = getPublic(privKey).toString("hex");
                      _context.next = 8;
                      return encryptData(privKeyHex, params);
                    case 8:
                      encData = _context.sent;
                      _context.next = 11;
                      return sign(privKey, keccak256(encData));
                    case 11:
                      signature = _context.sent.toString("hex");
                      _context.next = 14;
                      return post("".concat(this.storageServerUrl, "/store/set"), {
                        key: publicKeyHex,
                        data: encData,
                        signature: signature,
                      });
                    case 14:
                      _context.next = 17;
                      break;
                    case 16:
                      window.localStorage.setItem("torus_login_".concat(scope), JSON.stringify(params));
                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );
        function storeLoginDetails(_x, _x2) {
          return _storeLoginDetails.apply(this, arguments);
        }
        return storeLoginDetails;
      })(),
    },
    {
      key: "retrieveLoginDetails",
      value: (function () {
        var _retrieveLoginDetails = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(scope) {
            var privKey, privKeyHex, publicKeyHex, encData, _loginDetails, loginDetails;
            return _regeneratorRuntime.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (this.isInitialized) {
                        _context2.next = 2;
                        break;
                      }
                      throw new Error("StorageHelper is not initialized");
                    case 2:
                      if (!(this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.SERVER)) {
                        _context2.next = 24;
                        break;
                      }
                      privKey = keccak256(scope);
                      privKeyHex = privKey.toString("hex");
                      publicKeyHex = getPublic(privKey).toString("hex");
                      _context2.prev = 6;
                      _context2.next = 9;
                      return get("".concat(this.storageServerUrl, "/store/get?key=").concat(publicKeyHex));
                    case 9:
                      encData = _context2.sent;
                      if (!encData.message) {
                        _context2.next = 15;
                        break;
                      }
                      _context2.next = 13;
                      return decryptData(privKeyHex, encData.message);
                    case 13:
                      _loginDetails = _context2.sent;
                      return _context2.abrupt("return", _loginDetails);
                    case 15:
                      _context2.next = 24;
                      break;
                    case 17:
                      _context2.prev = 17;
                      _context2.t0 = _context2["catch"](6);
                      if (!(_context2.t0.status === 404)) {
                        _context2.next = 23;
                        break;
                      }
                      log.warn(_context2.t0, "Session likely expired");
                      _context2.next = 24;
                      break;
                    case 23:
                      throw _context2.t0;
                    case 24:
                      loginDetails = window.localStorage.getItem("torus_login_".concat(scope));
                      return _context2.abrupt("return", JSON.parse(loginDetails || "{}"));
                    case 26:
                    case "end":
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this,
              [[6, 17]]
            );
          })
        );
        function retrieveLoginDetails(_x3) {
          return _retrieveLoginDetails.apply(this, arguments);
        }
        return retrieveLoginDetails;
      })(),
    },
    {
      key: "clearLoginDetailsStorage",
      value: function clearLoginDetailsStorage(scope) {
        if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
        if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE) {
          window.localStorage.removeItem("torus_login_".concat(scope));
        }
        // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
      },
    },
    {
      key: "clearOrphanedLoginDetails",
      value: function clearOrphanedLoginDetails() {
        if (!this.isInitialized) throw new Error("StorageHelper is not initialized");
        if (this.currentStorageMethod === REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE) {
          var allStorageKeys = Object.keys(window.localStorage);
          allStorageKeys.forEach(function (key) {
            if (key.startsWith("torus_login_")) {
              window.localStorage.removeItem(key);
            }
          });
        }
        // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
      },
    },
  ]);
  return StorageHelper;
})();

var _excluded = ["access_token", "id_token"],
  _excluded2 = ["access_token", "id_token"],
  _excluded3 = ["access_token", "id_token"],
  _excluded4 = ["args", "method"];
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || (allowArrayLike && o && typeof o.length === "number")) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
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
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}
var CustomAuth = /*#__PURE__*/ (function () {
  function CustomAuth(_ref) {
    var baseUrl = _ref.baseUrl,
      _ref$network = _ref.network,
      network = _ref$network === void 0 ? TORUS_NETWORK.MAINNET : _ref$network,
      _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      _ref$enableOneKey = _ref.enableOneKey,
      enableOneKey = _ref$enableOneKey === void 0 ? false : _ref$enableOneKey,
      _ref$redirectToOpener = _ref.redirectToOpener,
      redirectToOpener = _ref$redirectToOpener === void 0 ? false : _ref$redirectToOpener,
      _ref$redirectPathName = _ref.redirectPathName,
      redirectPathName = _ref$redirectPathName === void 0 ? "redirect" : _ref$redirectPathName,
      _ref$apiKey = _ref.apiKey,
      apiKey = _ref$apiKey === void 0 ? "torus-default" : _ref$apiKey,
      _ref$uxMode = _ref.uxMode,
      uxMode = _ref$uxMode === void 0 ? UX_MODE.POPUP : _ref$uxMode,
      _ref$locationReplaceO = _ref.locationReplaceOnRedirect,
      locationReplaceOnRedirect = _ref$locationReplaceO === void 0 ? false : _ref$locationReplaceO,
      popupFeatures = _ref.popupFeatures,
      _ref$metadataUrl = _ref.metadataUrl,
      metadataUrl = _ref$metadataUrl === void 0 ? "https://metadata.tor.us" : _ref$metadataUrl,
      _ref$storageServerUrl = _ref.storageServerUrl,
      storageServerUrl = _ref$storageServerUrl === void 0 ? "https://broadcast-server.tor.us" : _ref$storageServerUrl,
      networkUrl = _ref.networkUrl,
      sentry = _ref.sentry;
    _classCallCheck(this, CustomAuth);
    _defineProperty(this, "isInitialized", void 0);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "torus", void 0);
    _defineProperty(this, "nodeDetailManager", void 0);
    _defineProperty(this, "storageHelper", void 0);
    _defineProperty(this, "sentryHandler", void 0);
    this.isInitialized = false;
    var baseUri = new URL(baseUrl);
    this.config = {
      baseUrl: padUrlString(baseUri),
      get redirect_uri() {
        return "".concat(this.baseUrl).concat(redirectPathName);
      },
      redirectToOpener: redirectToOpener,
      uxMode: uxMode,
      locationReplaceOnRedirect: locationReplaceOnRedirect,
      popupFeatures: popupFeatures,
    };
    var torus = new Torus({
      enableOneKey: enableOneKey,
      metadataHost: metadataUrl,
      allowHost: "".concat(SIGNER_MAP[network], "/api/allow"),
      signerHost: "".concat(SIGNER_MAP[network], "/api/sign"),
      network: network,
    });
    Torus.setAPIKey(apiKey);
    this.torus = torus;
    this.nodeDetailManager = new NodeDetailManager({
      network: networkUrl || network,
      proxyAddress: CONTRACT_MAP[network],
    });
    if (enableLogging) log.enableAll();
    else log.disableAll();
    this.storageHelper = new StorageHelper(storageServerUrl);
    this.sentryHandler = new SentryHandler(sentry, networkUrl);
  }
  _createClass(CustomAuth, [
    {
      key: "init",
      value: (function () {
        var _init = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
            var _ref2,
              _ref2$skipSw,
              skipSw,
              _ref2$skipInit,
              skipInit,
              _ref2$skipPrefetch,
              skipPrefetch,
              fetchSwResponse,
              _args = arguments;
            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (_ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}),
                        (_ref2$skipSw = _ref2.skipSw),
                        (skipSw = _ref2$skipSw === void 0 ? false : _ref2$skipSw),
                        (_ref2$skipInit = _ref2.skipInit),
                        (skipInit = _ref2$skipInit === void 0 ? false : _ref2$skipInit),
                        (_ref2$skipPrefetch = _ref2.skipPrefetch),
                        (skipPrefetch = _ref2$skipPrefetch === void 0 ? false : _ref2$skipPrefetch);
                      this.storageHelper.init();
                      if (!skipInit) {
                        _context.next = 5;
                        break;
                      }
                      this.isInitialized = true;
                      return _context.abrupt("return");
                    case 5:
                      if (skipSw) {
                        _context.next = 23;
                        break;
                      }
                      _context.next = 8;
                      return fetch("".concat(this.config.baseUrl, "sw.js"), {
                        cache: "reload",
                      });
                    case 8:
                      fetchSwResponse = _context.sent;
                      if (!fetchSwResponse.ok) {
                        _context.next = 22;
                        break;
                      }
                      _context.prev = 10;
                      _context.next = 13;
                      return registerServiceWorker(this.config.baseUrl);
                    case 13:
                      this.isInitialized = true;
                      return _context.abrupt("return");
                    case 17:
                      _context.prev = 17;
                      _context.t0 = _context["catch"](10);
                      log.warn(_context.t0);
                    case 20:
                      _context.next = 23;
                      break;
                    case 22:
                      throw new Error("Service worker is not being served. Please serve it");
                    case 23:
                      if (skipPrefetch) {
                        _context.next = 30;
                        break;
                      }
                      if (!isFirefox()) {
                        _context.next = 27;
                        break;
                      }
                      this.isInitialized = true;
                      return _context.abrupt("return");
                    case 27:
                      _context.next = 29;
                      return this.handlePrefetchRedirectUri();
                    case 29:
                      return _context.abrupt("return");
                    case 30:
                      this.isInitialized = true;
                    case 31:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[10, 17]]
            );
          })
        );
        function init() {
          return _init.apply(this, arguments);
        }
        return init;
      })(),
    },
    {
      key: "triggerLogin",
      value: (function () {
        var _triggerLogin = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(args) {
            var verifier,
              typeOfLogin,
              clientId,
              jwtParams,
              hash,
              queryParameters,
              customState,
              registerOnly,
              _args$skipTorusKey,
              skipTorusKey,
              _args$checkIfNewKey,
              checkIfNewKey,
              loginHandler,
              loginParams,
              _handleRedirectParame,
              error,
              hashParameters,
              instanceParameters,
              accessToken,
              idToken,
              rest,
              userInfo,
              nodeTx,
              _yield$this$nodeDetai,
              torusNodeEndpoints,
              torusNodePub,
              lookupTx,
              torusPubKey,
              res,
              _torusKey,
              skip,
              existingPk,
              _lookupData$keyResult,
              _lookupData$keyResult2,
              _lookupData$keyResult3,
              _lookupData$keyResult4,
              _yield$this$nodeDetai2,
              _torusNodeEndpoints,
              lookupData,
              torusKey;
            return _regeneratorRuntime.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      (verifier = args.verifier),
                        (typeOfLogin = args.typeOfLogin),
                        (clientId = args.clientId),
                        (jwtParams = args.jwtParams),
                        (hash = args.hash),
                        (queryParameters = args.queryParameters),
                        (customState = args.customState),
                        (registerOnly = args.registerOnly),
                        (_args$skipTorusKey = args.skipTorusKey),
                        (skipTorusKey = _args$skipTorusKey === void 0 ? SkipTorusKey.Never : _args$skipTorusKey),
                        (_args$checkIfNewKey = args.checkIfNewKey),
                        (checkIfNewKey = _args$checkIfNewKey === void 0 ? false : _args$checkIfNewKey);
                      log.info("Verifier: ", verifier);
                      if (this.isInitialized) {
                        _context2.next = 4;
                        break;
                      }
                      throw new Error("Not initialized yet");
                    case 4:
                      if (!(registerOnly && typeOfLogin !== LOGIN.WEBAUTHN)) {
                        _context2.next = 6;
                        break;
                      }
                      throw new Error("registerOnly flag can only be passed for webauthn");
                    case 6:
                      loginHandler = createHandler({
                        typeOfLogin: typeOfLogin,
                        clientId: clientId,
                        verifier: verifier,
                        redirect_uri: this.config.redirect_uri,
                        redirectToOpener: this.config.redirectToOpener,
                        jwtParams: jwtParams,
                        uxMode: this.config.uxMode,
                        customState: customState,
                        registerOnly: registerOnly,
                      });
                      if (!(hash && queryParameters)) {
                        _context2.next = 15;
                        break;
                      }
                      (_handleRedirectParame = handleRedirectParameters(hash, queryParameters)),
                        (error = _handleRedirectParame.error),
                        (hashParameters = _handleRedirectParame.hashParameters),
                        (instanceParameters = _handleRedirectParame.instanceParameters);
                      if (!error) {
                        _context2.next = 11;
                        break;
                      }
                      throw new Error(error);
                    case 11:
                      (accessToken = hashParameters.access_token),
                        (idToken = hashParameters.id_token),
                        (rest = _objectWithoutProperties(hashParameters, _excluded)); // State has to be last here otherwise it will be overwritten
                      loginParams = _objectSpread(
                        _objectSpread(
                          {
                            accessToken: accessToken,
                            idToken: idToken,
                          },
                          rest
                        ),
                        {},
                        {
                          state: instanceParameters,
                        }
                      );
                      _context2.next = 24;
                      break;
                    case 15:
                      this.storageHelper.clearOrphanedLoginDetails();
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context2.next = 19;
                        break;
                      }
                      _context2.next = 19;
                      return this.storageHelper.storeLoginDetails(
                        {
                          method: TORUS_METHOD.TRIGGER_LOGIN,
                          args: args,
                        },
                        loginHandler.nonce
                      );
                    case 19:
                      _context2.next = 21;
                      return loginHandler.handleLoginWindow({
                        locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                        popupFeatures: this.config.popupFeatures,
                      });
                    case 21:
                      loginParams = _context2.sent;
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context2.next = 24;
                        break;
                      }
                      return _context2.abrupt("return", null);
                    case 24:
                      _context2.next = 26;
                      return loginHandler.getUserInfo(loginParams);
                    case 26:
                      userInfo = _context2.sent;
                      if (!registerOnly) {
                        _context2.next = 45;
                        break;
                      }
                      nodeTx = this.sentryHandler.startTransaction({
                        name: SENTRY_TXNS.FETCH_NODE_DETAILS,
                      });
                      _context2.next = 31;
                      return this.nodeDetailManager.getNodeDetails({
                        verifier: verifier,
                        verifierId: userInfo.verifierId,
                      });
                    case 31:
                      _yield$this$nodeDetai = _context2.sent;
                      torusNodeEndpoints = _yield$this$nodeDetai.torusNodeEndpoints;
                      torusNodePub = _yield$this$nodeDetai.torusNodePub;
                      this.sentryHandler.finishTransaction(nodeTx);
                      lookupTx = this.sentryHandler.startTransaction({
                        name: SENTRY_TXNS.PUB_ADDRESS_LOOKUP,
                      });
                      _context2.next = 38;
                      return this.torus.getPublicAddress(
                        torusNodeEndpoints,
                        torusNodePub,
                        {
                          verifier: verifier,
                          verifierId: userInfo.verifierId,
                        },
                        true
                      );
                    case 38:
                      torusPubKey = _context2.sent;
                      this.sentryHandler.finishTransaction(lookupTx);
                      res = {
                        userInfo: _objectSpread(_objectSpread({}, userInfo), loginParams),
                      };
                      if (!(typeof torusPubKey === "string")) {
                        _context2.next = 43;
                        break;
                      }
                      throw new Error("should have returned extended pub key");
                    case 43:
                      _torusKey = {
                        typeOfUser: torusPubKey.typeOfUser,
                        pubKey: {
                          pub_key_X: torusPubKey.X,
                          pub_key_Y: torusPubKey.Y,
                        },
                        publicAddress: torusPubKey.address,
                        privateKey: null,
                        metadataNonce: null,
                      };
                      return _context2.abrupt("return", _objectSpread(_objectSpread({}, res), _torusKey));
                    case 45:
                      skip = true;
                      if (!(checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew)) {
                        _context2.next = 55;
                        break;
                      }
                      _context2.next = 49;
                      return this.nodeDetailManager.getNodeDetails({
                        verifier: verifier,
                        verifierId: userInfo.verifierId,
                      });
                    case 49:
                      _yield$this$nodeDetai2 = _context2.sent;
                      _torusNodeEndpoints = _yield$this$nodeDetai2.torusNodeEndpoints;
                      _context2.next = 53;
                      return keyLookup(_torusNodeEndpoints, verifier, userInfo.verifierId);
                    case 53:
                      lookupData = _context2.sent;
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
                    case 55:
                      _context2.t0 = skipTorusKey;
                      _context2.next =
                        _context2.t0 === SkipTorusKey.IfNew
                          ? 58
                          : _context2.t0 === SkipTorusKey.Always
                          ? 60
                          : _context2.t0 === SkipTorusKey.Never
                          ? 62
                          : 64;
                      break;
                    case 58:
                      skip = !existingPk;
                      return _context2.abrupt("break", 65);
                    case 60:
                      skip = true;
                      return _context2.abrupt("break", 65);
                    case 62:
                      skip = false;
                      return _context2.abrupt("break", 65);
                    case 64:
                      throw new Error("Invalid SkipTorusKey");
                    case 65:
                      if (!skip) {
                        _context2.next = 69;
                        break;
                      }
                      _context2.t1 = undefined;
                      _context2.next = 72;
                      break;
                    case 69:
                      _context2.next = 71;
                      return this.getTorusKey(
                        verifier,
                        userInfo.verifierId,
                        {
                          verifier_id: userInfo.verifierId,
                        },
                        loginParams.idToken || loginParams.accessToken,
                        userInfo.extraVerifierParams
                      );
                    case 71:
                      _context2.t1 = _context2.sent;
                    case 72:
                      torusKey = _context2.t1;
                      return _context2.abrupt(
                        "return",
                        _objectSpread(
                          _objectSpread({}, torusKey),
                          {},
                          {
                            existingPk: existingPk,
                            userInfo: _objectSpread(_objectSpread({}, userInfo), loginParams),
                          }
                        )
                      );
                    case 74:
                    case "end":
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this
            );
          })
        );
        function triggerLogin(_x) {
          return _triggerLogin.apply(this, arguments);
        }
        return triggerLogin;
      })(),
    },
    {
      key: "triggerAggregateLogin",
      value: (function () {
        var _triggerAggregateLogin = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee3(args) {
            var aggregateVerifierType,
              verifierIdentifier,
              subVerifierDetailsArray,
              _args$skipTorusKey2,
              skipTorusKey,
              _args$checkIfNewKey2,
              checkIfNewKey,
              userInfoPromises,
              loginParamsArray,
              _iterator,
              _step,
              subVerifierDetail,
              clientId,
              typeOfLogin,
              verifier,
              jwtParams,
              hash,
              queryParameters,
              customState,
              loginHandler,
              _loginParams,
              _handleRedirectParame2,
              error,
              hashParameters,
              instanceParameters,
              _accessToken,
              _idToken,
              rest,
              _userInfoArray,
              userInfoArray,
              aggregateVerifierParams,
              aggregateIdTokenSeeds,
              aggregateVerifierId,
              extraVerifierParams,
              index,
              loginParams,
              idToken,
              accessToken,
              userInfo,
              aggregateIdToken,
              userInfoData,
              skip,
              existingPk,
              _lookupData$keyResult5,
              _lookupData$keyResult6,
              _lookupData$keyResult7,
              _lookupData$keyResult8,
              _yield$this$nodeDetai3,
              torusNodeEndpoints,
              lookupData,
              torusKey;
            return _regeneratorRuntime.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      // This method shall break if any of the promises fail. This behaviour is intended
                      (aggregateVerifierType = args.aggregateVerifierType),
                        (verifierIdentifier = args.verifierIdentifier),
                        (subVerifierDetailsArray = args.subVerifierDetailsArray),
                        (_args$skipTorusKey2 = args.skipTorusKey),
                        (skipTorusKey = _args$skipTorusKey2 === void 0 ? SkipTorusKey.Never : _args$skipTorusKey2),
                        (_args$checkIfNewKey2 = args.checkIfNewKey),
                        (checkIfNewKey = _args$checkIfNewKey2 === void 0 ? false : _args$checkIfNewKey2);
                      if (this.isInitialized) {
                        _context3.next = 3;
                        break;
                      }
                      throw new Error("Not initialized yet");
                    case 3:
                      if (!(!aggregateVerifierType || !verifierIdentifier || !Array.isArray(subVerifierDetailsArray))) {
                        _context3.next = 5;
                        break;
                      }
                      throw new Error("Invalid params");
                    case 5:
                      if (!(aggregateVerifierType === AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID && subVerifierDetailsArray.length !== 1)) {
                        _context3.next = 7;
                        break;
                      }
                      throw new Error("Single id verifier can only have one sub verifier");
                    case 7:
                      userInfoPromises = [];
                      loginParamsArray = [];
                      _iterator = _createForOfIteratorHelper(subVerifierDetailsArray);
                      _context3.prev = 10;
                      _iterator.s();
                    case 12:
                      if ((_step = _iterator.n()).done) {
                        _context3.next = 38;
                        break;
                      }
                      subVerifierDetail = _step.value;
                      (clientId = subVerifierDetail.clientId),
                        (typeOfLogin = subVerifierDetail.typeOfLogin),
                        (verifier = subVerifierDetail.verifier),
                        (jwtParams = subVerifierDetail.jwtParams),
                        (hash = subVerifierDetail.hash),
                        (queryParameters = subVerifierDetail.queryParameters),
                        (customState = subVerifierDetail.customState);
                      loginHandler = createHandler({
                        typeOfLogin: typeOfLogin,
                        clientId: clientId,
                        verifier: verifier,
                        redirect_uri: this.config.redirect_uri,
                        redirectToOpener: this.config.redirectToOpener,
                        jwtParams: jwtParams,
                        uxMode: this.config.uxMode,
                        customState: customState,
                      }); // We let the user login to each verifier in a loop. Don't wait for key derivation here.!
                      _loginParams = void 0;
                      if (!(hash && queryParameters)) {
                        _context3.next = 25;
                        break;
                      }
                      (_handleRedirectParame2 = handleRedirectParameters(hash, queryParameters)),
                        (error = _handleRedirectParame2.error),
                        (hashParameters = _handleRedirectParame2.hashParameters),
                        (instanceParameters = _handleRedirectParame2.instanceParameters);
                      if (!error) {
                        _context3.next = 21;
                        break;
                      }
                      throw new Error(error);
                    case 21:
                      (_accessToken = hashParameters.access_token),
                        (_idToken = hashParameters.id_token),
                        (rest = _objectWithoutProperties(hashParameters, _excluded2)); // State has to be last here otherwise it will be overwritten
                      _loginParams = _objectSpread(
                        _objectSpread(
                          {
                            accessToken: _accessToken,
                            idToken: _idToken,
                          },
                          rest
                        ),
                        {},
                        {
                          state: instanceParameters,
                        }
                      );
                      _context3.next = 34;
                      break;
                    case 25:
                      this.storageHelper.clearOrphanedLoginDetails();
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context3.next = 29;
                        break;
                      }
                      _context3.next = 29;
                      return this.storageHelper.storeLoginDetails(
                        {
                          method: TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN,
                          args: args,
                        },
                        loginHandler.nonce
                      );
                    case 29:
                      _context3.next = 31;
                      return loginHandler.handleLoginWindow({
                        locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                        popupFeatures: this.config.popupFeatures,
                      });
                    case 31:
                      _loginParams = _context3.sent;
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context3.next = 34;
                        break;
                      }
                      return _context3.abrupt("return", null);
                    case 34:
                      // Fail the method even if one promise fails
                      userInfoPromises.push(loginHandler.getUserInfo(_loginParams));
                      loginParamsArray.push(_loginParams);
                    case 36:
                      _context3.next = 12;
                      break;
                    case 38:
                      _context3.next = 43;
                      break;
                    case 40:
                      _context3.prev = 40;
                      _context3.t0 = _context3["catch"](10);
                      _iterator.e(_context3.t0);
                    case 43:
                      _context3.prev = 43;
                      _iterator.f();
                      return _context3.finish(43);
                    case 46:
                      _context3.next = 48;
                      return Promise.all(userInfoPromises);
                    case 48:
                      _userInfoArray = _context3.sent;
                      userInfoArray = _userInfoArray.map(function (userInfo) {
                        return _objectSpread(
                          _objectSpread({}, userInfo),
                          {},
                          {
                            aggregateVerifier: verifierIdentifier,
                          }
                        );
                      });
                      aggregateVerifierParams = {
                        verify_params: [],
                        sub_verifier_ids: [],
                        verifier_id: "",
                      };
                      aggregateIdTokenSeeds = [];
                      aggregateVerifierId = "";
                      extraVerifierParams = {};
                      for (index = 0; index < subVerifierDetailsArray.length; index += 1) {
                        loginParams = loginParamsArray[index];
                        (idToken = loginParams.idToken), (accessToken = loginParams.accessToken);
                        userInfo = userInfoArray[index];
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
                      aggregateIdToken = keccak256$1(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
                      aggregateVerifierParams.verifier_id = aggregateVerifierId;
                      userInfoData = userInfoArray.map(function (x, index) {
                        return _objectSpread(_objectSpread({}, x), loginParamsArray[index]);
                      });
                      skip = true;
                      if (!(checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew)) {
                        _context3.next = 69;
                        break;
                      }
                      _context3.next = 63;
                      return this.nodeDetailManager.getNodeDetails({
                        verifier: args.verifierIdentifier,
                        verifierId: userInfoData[0].verifierId,
                      });
                    case 63:
                      _yield$this$nodeDetai3 = _context3.sent;
                      torusNodeEndpoints = _yield$this$nodeDetai3.torusNodeEndpoints;
                      _context3.next = 67;
                      return keyLookup(torusNodeEndpoints, args.verifierIdentifier, userInfoData[0].verifierId);
                    case 67:
                      lookupData = _context3.sent;
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
                    case 69:
                      _context3.t1 = skipTorusKey;
                      _context3.next =
                        _context3.t1 === SkipTorusKey.IfNew
                          ? 72
                          : _context3.t1 === SkipTorusKey.Always
                          ? 74
                          : _context3.t1 === SkipTorusKey.Never
                          ? 76
                          : 78;
                      break;
                    case 72:
                      skip = !existingPk;
                      return _context3.abrupt("break", 79);
                    case 74:
                      skip = true;
                      return _context3.abrupt("break", 79);
                    case 76:
                      skip = false;
                      return _context3.abrupt("break", 79);
                    case 78:
                      throw new Error("Invalid SkipTorusKey");
                    case 79:
                      if (!skip) {
                        _context3.next = 83;
                        break;
                      }
                      _context3.t2 = undefined;
                      _context3.next = 86;
                      break;
                    case 83:
                      _context3.next = 85;
                      return this.getTorusKey(
                        verifierIdentifier,
                        aggregateVerifierId,
                        aggregateVerifierParams,
                        aggregateIdToken,
                        extraVerifierParams
                      );
                    case 85:
                      _context3.t2 = _context3.sent;
                    case 86:
                      torusKey = _context3.t2;
                      return _context3.abrupt(
                        "return",
                        _objectSpread(
                          _objectSpread({}, torusKey),
                          {},
                          {
                            existingPk: existingPk,
                            userInfo: userInfoArray.map(function (x, index) {
                              return _objectSpread(_objectSpread({}, x), loginParamsArray[index]);
                            }),
                          }
                        )
                      );
                    case 88:
                    case "end":
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this,
              [[10, 40, 43, 46]]
            );
          })
        );
        function triggerAggregateLogin(_x2) {
          return _triggerAggregateLogin.apply(this, arguments);
        }
        return triggerAggregateLogin;
      })(),
    },
    {
      key: "triggerHybridAggregateLogin",
      value: (function () {
        var _triggerHybridAggregateLogin = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee4(args) {
            var singleLogin,
              aggregateLoginParams,
              typeOfLogin,
              clientId,
              verifier,
              jwtParams,
              hash,
              queryParameters,
              customState,
              loginHandler,
              loginParams,
              _handleRedirectParame3,
              error,
              hashParameters,
              instanceParameters,
              accessToken,
              idToken,
              rest,
              userInfo,
              torusKey1Promise,
              verifierIdentifier,
              subVerifierDetailsArray,
              aggregateVerifierParams,
              aggregateIdTokenSeeds,
              aggregateVerifierId,
              index,
              sub,
              _loginParams2,
              _idToken2,
              _accessToken2,
              aggregateIdToken,
              torusKey2Promise,
              _yield$Promise$all,
              _yield$Promise$all2,
              torusKey1,
              torusKey2;
            return _regeneratorRuntime.wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      (singleLogin = args.singleLogin), (aggregateLoginParams = args.aggregateLoginParams); // This method shall break if any of the promises fail. This behaviour is intended
                      if (this.isInitialized) {
                        _context4.next = 3;
                        break;
                      }
                      throw new Error("Not initialized yet");
                    case 3:
                      if (
                        !(
                          !aggregateLoginParams.aggregateVerifierType ||
                          !aggregateLoginParams.verifierIdentifier ||
                          !Array.isArray(aggregateLoginParams.subVerifierDetailsArray)
                        )
                      ) {
                        _context4.next = 5;
                        break;
                      }
                      throw new Error("Invalid params");
                    case 5:
                      if (
                        !(
                          aggregateLoginParams.aggregateVerifierType === AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID &&
                          aggregateLoginParams.subVerifierDetailsArray.length !== 1
                        )
                      ) {
                        _context4.next = 7;
                        break;
                      }
                      throw new Error("Single id verifier can only have one sub verifier");
                    case 7:
                      (typeOfLogin = singleLogin.typeOfLogin),
                        (clientId = singleLogin.clientId),
                        (verifier = singleLogin.verifier),
                        (jwtParams = singleLogin.jwtParams),
                        (hash = singleLogin.hash),
                        (queryParameters = singleLogin.queryParameters),
                        (customState = singleLogin.customState);
                      loginHandler = createHandler({
                        typeOfLogin: typeOfLogin,
                        clientId: clientId,
                        verifier: verifier,
                        redirect_uri: this.config.redirect_uri,
                        redirectToOpener: this.config.redirectToOpener,
                        jwtParams: jwtParams,
                        uxMode: this.config.uxMode,
                        customState: customState,
                      });
                      if (!(hash && queryParameters)) {
                        _context4.next = 17;
                        break;
                      }
                      (_handleRedirectParame3 = handleRedirectParameters(hash, queryParameters)),
                        (error = _handleRedirectParame3.error),
                        (hashParameters = _handleRedirectParame3.hashParameters),
                        (instanceParameters = _handleRedirectParame3.instanceParameters);
                      if (!error) {
                        _context4.next = 13;
                        break;
                      }
                      throw new Error(error);
                    case 13:
                      (accessToken = hashParameters.access_token),
                        (idToken = hashParameters.id_token),
                        (rest = _objectWithoutProperties(hashParameters, _excluded3)); // State has to be last here otherwise it will be overwritten
                      loginParams = _objectSpread(
                        _objectSpread(
                          {
                            accessToken: accessToken,
                            idToken: idToken,
                          },
                          rest
                        ),
                        {},
                        {
                          state: instanceParameters,
                        }
                      );
                      _context4.next = 26;
                      break;
                    case 17:
                      this.storageHelper.clearOrphanedLoginDetails();
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context4.next = 21;
                        break;
                      }
                      _context4.next = 21;
                      return this.storageHelper.storeLoginDetails(
                        {
                          method: TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN,
                          args: args,
                        },
                        loginHandler.nonce
                      );
                    case 21:
                      _context4.next = 23;
                      return loginHandler.handleLoginWindow({
                        locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                        popupFeatures: this.config.popupFeatures,
                      });
                    case 23:
                      loginParams = _context4.sent;
                      if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                        _context4.next = 26;
                        break;
                      }
                      return _context4.abrupt("return", null);
                    case 26:
                      _context4.next = 28;
                      return loginHandler.getUserInfo(loginParams);
                    case 28:
                      userInfo = _context4.sent;
                      torusKey1Promise = this.getTorusKey(
                        verifier,
                        userInfo.verifierId,
                        {
                          verifier_id: userInfo.verifierId,
                        },
                        loginParams.idToken || loginParams.accessToken,
                        userInfo.extraVerifierParams
                      );
                      (verifierIdentifier = aggregateLoginParams.verifierIdentifier),
                        (subVerifierDetailsArray = aggregateLoginParams.subVerifierDetailsArray);
                      aggregateVerifierParams = {
                        verify_params: [],
                        sub_verifier_ids: [],
                        verifier_id: "",
                      };
                      aggregateIdTokenSeeds = [];
                      aggregateVerifierId = "";
                      for (index = 0; index < subVerifierDetailsArray.length; index += 1) {
                        sub = subVerifierDetailsArray[index];
                        (_loginParams2 = loginParams), (_idToken2 = _loginParams2.idToken), (_accessToken2 = _loginParams2.accessToken);
                        aggregateVerifierParams.verify_params.push({
                          verifier_id: userInfo.verifierId,
                          idtoken: _idToken2 || _accessToken2,
                        });
                        aggregateVerifierParams.sub_verifier_ids.push(sub.verifier);
                        aggregateIdTokenSeeds.push(_idToken2 || _accessToken2);
                        aggregateVerifierId = userInfo.verifierId; // using last because idk
                      }

                      aggregateIdTokenSeeds.sort();
                      aggregateIdToken = keccak256$1(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
                      aggregateVerifierParams.verifier_id = aggregateVerifierId;
                      torusKey2Promise = this.getTorusKey(
                        verifierIdentifier,
                        aggregateVerifierId,
                        aggregateVerifierParams,
                        aggregateIdToken,
                        userInfo.extraVerifierParams
                      );
                      _context4.next = 41;
                      return Promise.all([torusKey1Promise, torusKey2Promise]);
                    case 41:
                      _yield$Promise$all = _context4.sent;
                      _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                      torusKey1 = _yield$Promise$all2[0];
                      torusKey2 = _yield$Promise$all2[1];
                      return _context4.abrupt("return", {
                        singleLogin: _objectSpread(
                          {
                            userInfo: _objectSpread(_objectSpread({}, userInfo), loginParams),
                          },
                          torusKey1
                        ),
                        aggregateLogins: [torusKey2],
                      });
                    case 46:
                    case "end":
                      return _context4.stop();
                  }
                }
              },
              _callee4,
              this
            );
          })
        );
        function triggerHybridAggregateLogin(_x3) {
          return _triggerHybridAggregateLogin.apply(this, arguments);
        }
        return triggerHybridAggregateLogin;
      })(),
    },
    {
      key: "getTorusKey",
      value: (function () {
        var _getTorusKey = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee5(verifier, verifierId, verifierParams, idToken, additionalParams) {
            var nodeTx, _yield$this$nodeDetai4, torusNodeEndpoints, torusNodePub, torusIndexes, pubLookupTx, address, sharesTx, shares;
            return _regeneratorRuntime.wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      nodeTx = this.sentryHandler.startTransaction({
                        name: SENTRY_TXNS.FETCH_NODE_DETAILS,
                      });
                      _context5.next = 3;
                      return this.nodeDetailManager.getNodeDetails({
                        verifier: verifier,
                        verifierId: verifierId,
                      });
                    case 3:
                      _yield$this$nodeDetai4 = _context5.sent;
                      torusNodeEndpoints = _yield$this$nodeDetai4.torusNodeEndpoints;
                      torusNodePub = _yield$this$nodeDetai4.torusNodePub;
                      torusIndexes = _yield$this$nodeDetai4.torusIndexes;
                      this.sentryHandler.finishTransaction(nodeTx);
                      log.debug("torus-direct/getTorusKey", {
                        torusNodeEndpoints: torusNodeEndpoints,
                        torusNodePub: torusNodePub,
                        torusIndexes: torusIndexes,
                      });
                      pubLookupTx = this.sentryHandler.startTransaction({
                        name: SENTRY_TXNS.PUB_ADDRESS_LOOKUP,
                      });
                      _context5.next = 12;
                      return this.torus.getPublicAddress(
                        torusNodeEndpoints,
                        torusNodePub,
                        {
                          verifier: verifier,
                          verifierId: verifierId,
                        },
                        true
                      );
                    case 12:
                      address = _context5.sent;
                      this.sentryHandler.finishTransaction(pubLookupTx);
                      if (!(typeof address === "string")) {
                        _context5.next = 16;
                        break;
                      }
                      throw new Error("must use extended pub key");
                    case 16:
                      log.debug("torus-direct/getTorusKey", {
                        getPublicAddress: address,
                      });
                      sharesTx = this.sentryHandler.startTransaction({
                        name: SENTRY_TXNS.FETCH_SHARES,
                      });
                      _context5.next = 20;
                      return this.torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, verifierParams, idToken, additionalParams);
                    case 20:
                      shares = _context5.sent;
                      this.sentryHandler.finishTransaction(sharesTx);
                      if (!(shares.ethAddress.toLowerCase() !== address.address.toLowerCase())) {
                        _context5.next = 24;
                        break;
                      }
                      throw new Error("data ethAddress does not match response address");
                    case 24:
                      log.debug("torus-direct/getTorusKey", {
                        retrieveShares: shares,
                      });
                      return _context5.abrupt("return", {
                        publicAddress: shares.ethAddress.toString(),
                        privateKey: shares.privKey.toString(),
                        metadataNonce: shares.metadataNonce.toString("hex"),
                        typeOfUser: address.typeOfUser,
                        pubKey: {
                          pub_key_X: address.X,
                          pub_key_Y: address.Y,
                        },
                      });
                    case 26:
                    case "end":
                      return _context5.stop();
                  }
                }
              },
              _callee5,
              this
            );
          })
        );
        function getTorusKey(_x4, _x5, _x6, _x7, _x8) {
          return _getTorusKey.apply(this, arguments);
        }
        return getTorusKey;
      })(),
    },
    {
      key: "getAggregateTorusKey",
      value: (function () {
        var _getAggregateTorusKey = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee6(
            verifier,
            verifierId,
            // unique identifier for user e.g. sub on jwt
            subVerifierInfoArray
          ) {
            var aggregateVerifierParams, aggregateIdTokenSeeds, extraVerifierParams, index, userInfo, aggregateIdToken;
            return _regeneratorRuntime.wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      aggregateVerifierParams = {
                        verify_params: [],
                        sub_verifier_ids: [],
                        verifier_id: "",
                      };
                      aggregateIdTokenSeeds = [];
                      extraVerifierParams = {};
                      for (index = 0; index < subVerifierInfoArray.length; index += 1) {
                        userInfo = subVerifierInfoArray[index];
                        aggregateVerifierParams.verify_params.push({
                          verifier_id: verifierId,
                          idtoken: userInfo.idToken,
                        });
                        aggregateVerifierParams.sub_verifier_ids.push(userInfo.verifier);
                        aggregateIdTokenSeeds.push(userInfo.idToken);
                        extraVerifierParams = userInfo.extraVerifierParams;
                      }
                      aggregateIdTokenSeeds.sort();
                      aggregateIdToken = keccak256$1(aggregateIdTokenSeeds.join(String.fromCharCode(29))).slice(2);
                      aggregateVerifierParams.verifier_id = verifierId;
                      return _context6.abrupt(
                        "return",
                        this.getTorusKey(verifier, verifierId, aggregateVerifierParams, aggregateIdToken, extraVerifierParams)
                      );
                    case 8:
                    case "end":
                      return _context6.stop();
                  }
                }
              },
              _callee6,
              this
            );
          })
        );
        function getAggregateTorusKey(_x9, _x10, _x11) {
          return _getAggregateTorusKey.apply(this, arguments);
        }
        return getAggregateTorusKey;
      })(),
    },
    {
      key: "getPostboxKeyFrom1OutOf1",
      value: function getPostboxKeyFrom1OutOf1(privKey, nonce) {
        return this.torus.getPostboxKeyFrom1OutOf1(privKey, nonce);
      },
    },
    {
      key: "getRedirectResult",
      value: (function () {
        var _getRedirectResult = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee7() {
            var _ref3,
              _ref3$replaceUrl,
              replaceUrl,
              _ref3$clearLoginDetai,
              clearLoginDetails,
              url,
              hash,
              queryParams,
              cleanUrl,
              _handleRedirectParame4,
              error,
              instanceParameters,
              hashParameters,
              instanceId,
              _yield$this$storageHe,
              args,
              method,
              rest,
              result,
              methodArgs,
              _methodArgs,
              _methodArgs2,
              _args7 = arguments;
            return _regeneratorRuntime.wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      (_ref3 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}),
                        (_ref3$replaceUrl = _ref3.replaceUrl),
                        (replaceUrl = _ref3$replaceUrl === void 0 ? true : _ref3$replaceUrl),
                        (_ref3$clearLoginDetai = _ref3.clearLoginDetails),
                        (clearLoginDetails = _ref3$clearLoginDetai === void 0 ? true : _ref3$clearLoginDetai);
                      _context7.next = 3;
                      return this.init({
                        skipInit: true,
                      });
                    case 3:
                      url = new URL(window.location.href);
                      hash = url.hash.substring(1);
                      queryParams = {};
                      url.searchParams.forEach(function (value, key) {
                        queryParams[key] = value;
                      });
                      if (replaceUrl) {
                        cleanUrl = window.location.origin + window.location.pathname;
                        window.history.replaceState(null, "", cleanUrl);
                      }
                      if (!(!hash && Object.keys(queryParams).length === 0)) {
                        _context7.next = 10;
                        break;
                      }
                      throw new Error("Unable to fetch result from OAuth login");
                    case 10:
                      (_handleRedirectParame4 = handleRedirectParameters(hash, queryParams)),
                        (error = _handleRedirectParame4.error),
                        (instanceParameters = _handleRedirectParame4.instanceParameters),
                        (hashParameters = _handleRedirectParame4.hashParameters);
                      instanceId = instanceParameters.instanceId;
                      log.info(instanceId, "instanceId");
                      _context7.next = 15;
                      return this.storageHelper.retrieveLoginDetails(instanceId);
                    case 15:
                      _yield$this$storageHe = _context7.sent;
                      args = _yield$this$storageHe.args;
                      method = _yield$this$storageHe.method;
                      rest = _objectWithoutProperties(_yield$this$storageHe, _excluded4);
                      log.info(args, method);
                      if (clearLoginDetails) {
                        this.storageHelper.clearLoginDetailsStorage(instanceId);
                      }
                      if (!error) {
                        _context7.next = 23;
                        break;
                      }
                      return _context7.abrupt("return", {
                        error: error,
                        state: instanceParameters || {},
                        method: method,
                        result: {},
                        hashParameters: hashParameters,
                        args: args,
                      });
                    case 23:
                      _context7.prev = 23;
                      if (!(method === TORUS_METHOD.TRIGGER_LOGIN)) {
                        _context7.next = 33;
                        break;
                      }
                      methodArgs = args;
                      methodArgs.hash = hash;
                      methodArgs.queryParameters = queryParams;
                      _context7.next = 30;
                      return this.triggerLogin(methodArgs);
                    case 30:
                      result = _context7.sent;
                      _context7.next = 48;
                      break;
                    case 33:
                      if (!(method === TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN)) {
                        _context7.next = 41;
                        break;
                      }
                      _methodArgs = args;
                      _methodArgs.subVerifierDetailsArray.forEach(function (x) {
                        x.hash = hash;
                        x.queryParameters = queryParams;
                      });
                      _context7.next = 38;
                      return this.triggerAggregateLogin(_methodArgs);
                    case 38:
                      result = _context7.sent;
                      _context7.next = 48;
                      break;
                    case 41:
                      if (!(method === TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN)) {
                        _context7.next = 48;
                        break;
                      }
                      _methodArgs2 = args;
                      _methodArgs2.singleLogin.hash = hash;
                      _methodArgs2.singleLogin.queryParameters = queryParams;
                      _context7.next = 47;
                      return this.triggerHybridAggregateLogin(_methodArgs2);
                    case 47:
                      result = _context7.sent;
                    case 48:
                      _context7.next = 54;
                      break;
                    case 50:
                      _context7.prev = 50;
                      _context7.t0 = _context7["catch"](23);
                      log.error(_context7.t0);
                      return _context7.abrupt(
                        "return",
                        _objectSpread(
                          {
                            error: "Could not get result from torus nodes \n ".concat(
                              (_context7.t0 === null || _context7.t0 === void 0 ? void 0 : _context7.t0.message) || ""
                            ),
                            state: instanceParameters || {},
                            method: method,
                            result: {},
                            hashParameters: hashParameters,
                            args: args,
                          },
                          rest
                        )
                      );
                    case 54:
                      if (result) {
                        _context7.next = 56;
                        break;
                      }
                      return _context7.abrupt(
                        "return",
                        _objectSpread(
                          {
                            error: "Unsupported method type",
                            state: instanceParameters || {},
                            method: method,
                            result: {},
                            hashParameters: hashParameters,
                            args: args,
                          },
                          rest
                        )
                      );
                    case 56:
                      return _context7.abrupt(
                        "return",
                        _objectSpread(
                          {
                            method: method,
                            result: result,
                            state: instanceParameters || {},
                            hashParameters: hashParameters,
                            args: args,
                          },
                          rest
                        )
                      );
                    case 57:
                    case "end":
                      return _context7.stop();
                  }
                }
              },
              _callee7,
              this,
              [[23, 50]]
            );
          })
        );
        function getRedirectResult() {
          return _getRedirectResult.apply(this, arguments);
        }
        return getRedirectResult;
      })(),
    },
    {
      key: "handlePrefetchRedirectUri",
      value: (function () {
        var _handlePrefetchRedirectUri = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee8() {
            var _this = this;
            return _regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch ((_context8.prev = _context8.next)) {
                  case 0:
                    if (document) {
                      _context8.next = 2;
                      break;
                    }
                    return _context8.abrupt("return", Promise.resolve());
                  case 2:
                    return _context8.abrupt(
                      "return",
                      new Promise(function (resolve, reject) {
                        var redirectHtml = document.createElement("link");
                        redirectHtml.href = _this.config.redirect_uri;
                        if (window.location.origin !== new URL(_this.config.redirect_uri).origin) redirectHtml.crossOrigin = "anonymous";
                        redirectHtml.type = "text/html";
                        redirectHtml.rel = "prefetch";
                        var resolveFn = function resolveFn() {
                          _this.isInitialized = true;
                          resolve();
                        };
                        try {
                          if (redirectHtml.relList && redirectHtml.relList.supports) {
                            if (redirectHtml.relList.supports("prefetch")) {
                              redirectHtml.onload = resolveFn;
                              redirectHtml.onerror = function () {
                                reject(
                                  new Error(
                                    "Please serve redirect.html present in serviceworker folder of this package on ".concat(_this.config.redirect_uri)
                                  )
                                );
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
                      })
                    );
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          })
        );
        function handlePrefetchRedirectUri() {
          return _handlePrefetchRedirectUri.apply(this, arguments);
        }
        return handlePrefetchRedirectUri;
      })(),
    },
  ]);
  return CustomAuth;
})();

export {
  AGGREGATE_VERIFIER,
  CONTRACT_MAP,
  LOGIN,
  REDIRECT_PARAMS_STORAGE_METHOD,
  SENTRY_TXNS,
  SIGNER_MAP,
  SkipTorusKey,
  TORUS_METHOD,
  UX_MODE,
  are3PCSupported,
  broadcastChannelOptions,
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
  storageAvailable,
  validateAndConstructUrl,
};
//# sourceMappingURL=customauth.esm.js.map
