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
    CONTRACT_MAP: () => /* reexport */ CONTRACT_MAP,
    LOGIN: () => /* reexport */ LOGIN,
    REDIRECT_PARAMS_STORAGE_METHOD: () => /* reexport */ REDIRECT_PARAMS_STORAGE_METHOD,
    SENTRY_TXNS: () => /* reexport */ SENTRY_TXNS,
    SIGNER_MAP: () => /* reexport */ SIGNER_MAP,
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
  }); // CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"

  const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
  var defineProperty_default = /*#__PURE__*/ __webpack_require__.n(defineProperty_namespaceObject); // CONCATENATED MODULE: external "@toruslabs/fetch-node-details"
  const fetch_node_details_namespaceObject = require("@toruslabs/fetch-node-details");
  var fetch_node_details_default = /*#__PURE__*/ __webpack_require__.n(fetch_node_details_namespaceObject); // CONCATENATED MODULE: ./src/utils/enums.ts
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
    SINGLE_VERIFIER_ID: "single_id_verifier", // AND_AGGREGATE_VERIFIER : "and_aggregate_verifier",
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
    defineProperty_default()(
      _CONTRACT_MAP,
      fetch_node_details_namespaceObject.TORUS_NETWORK.MAINNET,
      fetch_node_details_default().PROXY_ADDRESS_MAINNET
    ),
    defineProperty_default()(
      _CONTRACT_MAP,
      fetch_node_details_namespaceObject.TORUS_NETWORK.TESTNET,
      fetch_node_details_default().PROXY_ADDRESS_TESTNET
    ),
    defineProperty_default()(_CONTRACT_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.CYAN, fetch_node_details_default().PROXY_ADDRESS_CYAN),
    defineProperty_default()(_CONTRACT_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.AQUA, fetch_node_details_default().PROXY_ADDRESS_AQUA),
    _CONTRACT_MAP);
  var SIGNER_MAP =
    ((_SIGNER_MAP = {}),
    defineProperty_default()(_SIGNER_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.MAINNET, "https://signer.tor.us"),
    defineProperty_default()(_SIGNER_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.TESTNET, "https://signer.tor.us"),
    defineProperty_default()(_SIGNER_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.CYAN, "https://signer-polygon.tor.us"),
    defineProperty_default()(_SIGNER_MAP, fetch_node_details_namespaceObject.TORUS_NETWORK.AQUA, "https://signer-polygon.tor.us"),
    _SIGNER_MAP);
  var SENTRY_TXNS = {
    FETCH_NODE_DETAILS: "fetchNodeDetails",
    PUB_ADDRESS_LOOKUP: "pubAddressLookup",
    FETCH_SHARES: "fetchShares",
  }; // CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
  const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
  var asyncToGenerator_default = /*#__PURE__*/ __webpack_require__.n(asyncToGenerator_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
  const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
  var classCallCheck_default = /*#__PURE__*/ __webpack_require__.n(classCallCheck_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
  const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
  var createClass_default = /*#__PURE__*/ __webpack_require__.n(createClass_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/assertThisInitialized"
  const assertThisInitialized_namespaceObject = require("@babel/runtime/helpers/assertThisInitialized");
  var assertThisInitialized_default = /*#__PURE__*/ __webpack_require__.n(assertThisInitialized_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/inherits"
  const inherits_namespaceObject = require("@babel/runtime/helpers/inherits");
  var inherits_default = /*#__PURE__*/ __webpack_require__.n(inherits_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
  const possibleConstructorReturn_namespaceObject = require("@babel/runtime/helpers/possibleConstructorReturn");
  var possibleConstructorReturn_default = /*#__PURE__*/ __webpack_require__.n(possibleConstructorReturn_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/getPrototypeOf"
  const getPrototypeOf_namespaceObject = require("@babel/runtime/helpers/getPrototypeOf");
  var getPrototypeOf_default = /*#__PURE__*/ __webpack_require__.n(getPrototypeOf_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/regenerator"
  const regenerator_namespaceObject = require("@babel/runtime/regenerator");
  var regenerator_default = /*#__PURE__*/ __webpack_require__.n(regenerator_namespaceObject); // CONCATENATED MODULE: external "@toruslabs/http-helpers"
  const http_helpers_namespaceObject = require("@toruslabs/http-helpers"); // CONCATENATED MODULE: external "lodash.merge"
  const external_lodash_merge_namespaceObject = require("lodash.merge");
  var external_lodash_merge_default = /*#__PURE__*/ __webpack_require__.n(external_lodash_merge_namespaceObject); // CONCATENATED MODULE: external "@babel/runtime/helpers/objectWithoutProperties"
  const objectWithoutProperties_namespaceObject = require("@babel/runtime/helpers/objectWithoutProperties");
  var objectWithoutProperties_default = /*#__PURE__*/ __webpack_require__.n(objectWithoutProperties_namespaceObject); // CONCATENATED MODULE: external "@toruslabs/broadcast-channel"
  const broadcast_channel_namespaceObject = require("@toruslabs/broadcast-channel"); // CONCATENATED MODULE: external "@babel/runtime/helpers/slicedToArray"
  const slicedToArray_namespaceObject = require("@babel/runtime/helpers/slicedToArray");
  var slicedToArray_default = /*#__PURE__*/ __webpack_require__.n(slicedToArray_namespaceObject); // CONCATENATED MODULE: external "bowser"
  const external_bowser_namespaceObject = require("bowser");
  var external_bowser_default = /*#__PURE__*/ __webpack_require__.n(external_bowser_namespaceObject); // CONCATENATED MODULE: external "loglevel"
  const external_loglevel_namespaceObject = require("loglevel");
  var external_loglevel_default = /*#__PURE__*/ __webpack_require__.n(external_loglevel_namespaceObject); // CONCATENATED MODULE: ./src/utils/loglevel.ts
  /* harmony default export */ const loglevel = external_loglevel_default().getLogger("customauth"); // CONCATENATED MODULE: ./src/utils/helpers.ts
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
  } // These are the connection names used by auth0

  var loginToConnectionMap =
    ((_loginToConnectionMap = {}),
    defineProperty_default()(_loginToConnectionMap, LOGIN.APPLE, "apple"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.GITHUB, "github"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.LINKEDIN, "linkedin"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.TWITTER, "twitter"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.WEIBO, "weibo"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.LINE, "line"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.EMAIL_PASSWORD, "Username-Password-Authentication"),
    defineProperty_default()(_loginToConnectionMap, LOGIN.PASSWORDLESS, "email"),
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
        _item$split2 = slicedToArray_default()(_item$split, 2),
        part0 = _item$split2[0],
        part1 = _item$split2[1];

      result[part0] = part1;
      return result;
    }, {});
    loglevel.info(hashParameters, queryParameters);
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
        e && // everything except Firefox
        (e.code === 22 || // Firefox
          e.code === 1014 || // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" || // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
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

    var browserInfo = external_bowser_default().parse(navigator.userAgent);
    loglevel.info(JSON.stringify(browserInfo), "current browser info");
    var thirdPartyCookieSupport = true; // brave

    if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.brave) {
      thirdPartyCookieSupport = false;
    } // All webkit & gecko engine instances use itp (intelligent tracking prevention -
    // https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp)

    if (
      browserInfo.engine.name === external_bowser_namespaceObject.ENGINE_MAP.WebKit ||
      browserInfo.engine.name === external_bowser_namespaceObject.ENGINE_MAP.Gecko
    ) {
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
  }; // CONCATENATED MODULE: external "events"
  const external_events_namespaceObject = require("events"); // CONCATENATED MODULE: ./src/utils/PopupHandler.ts
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
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

  var PopupHandler = /*#__PURE__*/ (function (_EventEmitter) {
    inherits_default()(PopupHandler, _EventEmitter);

    var _super = _createSuper(PopupHandler);

    function PopupHandler(_ref) {
      var _this;

      var url = _ref.url,
        target = _ref.target,
        features = _ref.features;

      classCallCheck_default()(this, PopupHandler);

      _this = _super.call(this);

      defineProperty_default()(assertThisInitialized_default()(_this), "url", void 0);

      defineProperty_default()(assertThisInitialized_default()(_this), "target", void 0);

      defineProperty_default()(assertThisInitialized_default()(_this), "features", void 0);

      defineProperty_default()(assertThisInitialized_default()(_this), "window", void 0);

      defineProperty_default()(assertThisInitialized_default()(_this), "windowTimer", void 0);

      defineProperty_default()(assertThisInitialized_default()(_this), "iClosedWindow", void 0);

      _this.url = url;
      _this.target = target || "_blank";
      _this.features = features || getPopupFeatures();
      _this.window = undefined;
      _this.windowTimer = undefined;
      _this.iClosedWindow = false;

      _this._setupTimer();

      return _this;
    }

    createClass_default()(PopupHandler, [
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
  })(external_events_namespaceObject.EventEmitter);

  /* harmony default export */ const utils_PopupHandler = PopupHandler; // CONCATENATED MODULE: ./src/handlers/AbstractLoginHandler.ts
  var _excluded = ["access_token", "id_token"];

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

  var AbstractLoginHandler = /*#__PURE__*/ (function () {
    // Not using object constructor because of this issue
    // https://github.com/microsoft/TypeScript/issues/5326
    function AbstractLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      classCallCheck_default()(this, AbstractLoginHandler);

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

    createClass_default()(AbstractLoginHandler, [
      {
        key: "state",
        get: function get() {
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
        },
      },
      {
        key: "handleLoginWindow",
        value: function handleLoginWindow(params) {
          var _this = this;

          var verifierWindow = new utils_PopupHandler({
            url: this.finalURL,
            features: params.popupFeatures,
          });

          if (this.uxMode === UX_MODE.REDIRECT) {
            verifierWindow.redirect(params.locationReplaceOnRedirect);
          } else {
            return new Promise(function (resolve, reject) {
              var bc;

              var handleData = /*#__PURE__*/ (function () {
                var _ref = asyncToGenerator_default()(
                  /*#__PURE__*/ regenerator_default().mark(function _callee(ev) {
                    var error, data, _ref2, instanceParams, _ref2$hashParams, accessToken, idToken, rest;

                    return regenerator_default().wrap(
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
                                (rest = objectWithoutProperties_default()(_ref2$hashParams, _excluded));

                              if (!error) {
                                _context.next = 7;
                                break;
                              }

                              loglevel.error(ev);
                              reject(new Error("Error: ".concat(error, ". Info: ").concat(JSON.stringify(ev.data || {}))));
                              return _context.abrupt("return");

                            case 7:
                              if (!(ev.data && instanceParams.verifier === _this.verifier)) {
                                _context.next = 13;
                                break;
                              }

                              loglevel.info(ev.data);

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
                                _objectSpread(
                                  _objectSpread(
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
                              loglevel.error(_context.t0);
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
                bc = new broadcast_channel_namespaceObject.BroadcastChannel("redirect_channel_".concat(_this.nonce), broadcastChannelOptions);
                bc.addEventListener(
                  "message",
                  /*#__PURE__*/ (function () {
                    var _ref3 = asyncToGenerator_default()(
                      /*#__PURE__*/ regenerator_default().mark(function _callee2(ev) {
                        return regenerator_default().wrap(function _callee2$(_context2) {
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
                  var _ref4 = asyncToGenerator_default()(
                    /*#__PURE__*/ regenerator_default().mark(function _callee3(postMessageEvent) {
                      var ev;
                      return regenerator_default().wrap(function _callee3$(_context3) {
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

  /* harmony default export */ const handlers_AbstractLoginHandler = AbstractLoginHandler; // CONCATENATED MODULE: ./src/handlers/DiscordHandler.ts
  function DiscordHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = DiscordHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function DiscordHandler_isNativeReflectConstruct() {
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
    inherits_default()(DiscordHandler, _AbstractLoginHandler);

    var _super = DiscordHandler_createSuper(DiscordHandler);

    function DiscordHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, DiscordHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token");

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "identify email");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(DiscordHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://discord.com/api/oauth2/authorize");
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
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

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        accessToken = params.accessToken;
                        _context.next = 3;
                        return (0, http_helpers_namespaceObject.get)("https://discord.com/api/users/@me", {
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/FacebookHandler.ts

  function FacebookHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = FacebookHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function FacebookHandler_isNativeReflectConstruct() {
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
    inherits_default()(FacebookHandler, _AbstractLoginHandler);

    var _super = FacebookHandler_createSuper(FacebookHandler);

    function FacebookHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, FacebookHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token");

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "public_profile email");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(FacebookHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://www.facebook.com/v15.0/dialog/oauth");
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
              var accessToken, userInfo, _userInfo$name, name, id, picture, _userInfo$email, email;

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        accessToken = params.accessToken;
                        _context.next = 3;
                        return (0, http_helpers_namespaceObject.get)("https://graph.facebook.com/me?fields=name,email,picture.type(large)", {
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/GoogleHandler.ts

  function GoogleHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = GoogleHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function GoogleHandler_isNativeReflectConstruct() {
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
    inherits_default()(GoogleHandler, _AbstractLoginHandler);

    var _super = GoogleHandler_createSuper(GoogleHandler);

    function GoogleHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, GoogleHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token id_token");

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "profile email openid");

      defineProperty_default()(assertThisInitialized_default()(_this), "PROMPT", "consent select_account");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(GoogleHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
              var accessToken, userInfo, _userInfo$picture, profileImage, _userInfo$email, email, _userInfo$name, name;

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        accessToken = params.accessToken;
                        _context.next = 3;
                        return (0, http_helpers_namespaceObject.get)("https://www.googleapis.com/userinfo/v2/me", {
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: external "jwt-decode"

  const external_jwt_decode_namespaceObject = require("jwt-decode");
  var external_jwt_decode_default = /*#__PURE__*/ __webpack_require__.n(external_jwt_decode_namespaceObject); // CONCATENATED MODULE: ./src/handlers/JwtHandler.ts
  function JwtHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = JwtHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function JwtHandler_isNativeReflectConstruct() {
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
    inherits_default()(JwtHandler, _AbstractLoginHandler);

    var _super = JwtHandler_createSuper(JwtHandler);

    function JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, JwtHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "openid profile email");

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token id_token");

      defineProperty_default()(assertThisInitialized_default()(_this), "PROMPT", "login");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(JwtHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var domain = this.jwtParams.domain;
          var finalUrl = validateAndConstructUrl(domain);
          finalUrl.pathname += finalUrl.pathname.endsWith("/") ? "authorize" : "/authorize";
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
          delete clonedParams.domain;
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
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

              return regenerator_default().wrap(
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
                        return (0, http_helpers_namespaceObject.get)("".concat(padUrlString(domainUrl)).concat(user_info_route), {
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
                        external_loglevel_default().warn(_context.t0, "Unable to get userinfo from endpoint");

                      case 15:
                        if (!idToken) {
                          _context.next = 19;
                          break;
                        }

                        decodedToken = external_jwt_decode_default()(idToken);
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/MockLoginHandler.ts

  function MockLoginHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = MockLoginHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function MockLoginHandler_isNativeReflectConstruct() {
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
    inherits_default()(MockLoginHandler, _AbstractLoginHandler);

    var _super = MockLoginHandler_createSuper(MockLoginHandler);

    function MockLoginHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, MockLoginHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
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

    createClass_default()(MockLoginHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams));
          delete clonedParams.domain;
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
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

              return regenerator_default().wrap(
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
                        return (0, http_helpers_namespaceObject.get)("".concat(padUrlString(domainUrl)).concat(user_info_route), {
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
                        external_loglevel_default().warn(_context.t0, "Unable to get userinfo from endpoint");

                      case 15:
                        if (!idToken) {
                          _context.next = 19;
                          break;
                        }

                        decodedToken = external_jwt_decode_default()(idToken);
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
          var verifierWindow = new utils_PopupHandler({
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/PasswordlessHandler.ts

  var PasswordlessHandler_excluded = ["access_token", "id_token"];

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

  function PasswordlessHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = PasswordlessHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function PasswordlessHandler_isNativeReflectConstruct() {
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

  var PasswordlessHandler_JwtHandler = /*#__PURE__*/ (function (_AbstractLoginHandler) {
    inherits_default()(JwtHandler, _AbstractLoginHandler);

    var _super = PasswordlessHandler_createSuper(JwtHandler);

    function JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, JwtHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "openid profile email");

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token id_token");

      defineProperty_default()(assertThisInitialized_default()(_this), "PROMPT", "login");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(JwtHandler, [
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
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

              return regenerator_default().wrap(
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
                        return (0, http_helpers_namespaceObject.get)("".concat(padUrlString(domainUrl), "userinfo"), {
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
                        loglevel.error(_context.t0);
                        decodedToken = external_jwt_decode_default()(idToken);
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
                  rest = objectWithoutProperties_default()(_ref$hashParams, PasswordlessHandler_excluded);

                if (error) {
                  loglevel.error(ev.error);
                  reject(new Error(error));
                  return;
                }

                if (ev.data && instanceParams.verifier === _this2.verifier) {
                  loglevel.info(ev.data);
                  resolve(
                    PasswordlessHandler_objectSpread(
                      PasswordlessHandler_objectSpread(
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
                loglevel.error(error);
                reject(error);
              }
            };

            var bc = new broadcast_channel_namespaceObject.BroadcastChannel("redirect_channel_".concat(_this2.nonce), broadcastChannelOptions);
            bc.addEventListener(
              "message",
              /*#__PURE__*/ (function () {
                var _ref2 = asyncToGenerator_default()(
                  /*#__PURE__*/ regenerator_default().mark(function _callee2(ev) {
                    return regenerator_default().wrap(function _callee2$(_context2) {
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
              var finalJwtParams = external_lodash_merge_default()(
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
              ); // using stringify and parse to remove undefined params
              // This method is only resolved when the user clicks the email link

              (0, http_helpers_namespaceObject.post)(_this2.finalURL.href, JSON.parse(JSON.stringify(finalJwtParams)))
                .then(function (response) {
                  loglevel.info("posted", response);
                  return undefined;
                })
                .catch(function (error) {
                  loglevel.error(error);
                  reject(error);
                });
            } catch (error) {
              loglevel.error(error);
              reject(error);
            }
          });
        },
      },
    ]);

    return JwtHandler;
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/RedditHandler.ts

  function RedditHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = RedditHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function RedditHandler_isNativeReflectConstruct() {
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
    inherits_default()(RedditHandler, _AbstractLoginHandler);

    var _super = RedditHandler_createSuper(RedditHandler);

    function RedditHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, RedditHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token");

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "identity");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(RedditHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://www.reddit.com/api/v1/authorize".concat(window.innerWidth < 600 ? ".compact" : ""));
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
              var accessToken, userInfo, _userInfo$icon_img, profileImage, _userInfo$name, name;

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        accessToken = params.accessToken;
                        _context.next = 3;
                        return (0, http_helpers_namespaceObject.get)("https://oauth.reddit.com/api/v1/me", {
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/TwitchHandler.ts

  function TwitchHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = TwitchHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function TwitchHandler_isNativeReflectConstruct() {
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
    inherits_default()(TwitchHandler, _AbstractLoginHandler);

    var _super = TwitchHandler_createSuper(TwitchHandler);

    function TwitchHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState) {
      var _this;

      classCallCheck_default()(this, TwitchHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
      _this.clientId = clientId;
      _this.verifier = verifier;
      _this.redirect_uri = redirect_uri;
      _this.typeOfLogin = typeOfLogin;
      _this.uxMode = uxMode;
      _this.redirectToOpener = redirectToOpener;
      _this.jwtParams = jwtParams;
      _this.customState = customState;

      defineProperty_default()(assertThisInitialized_default()(_this), "RESPONSE_TYPE", "token");

      defineProperty_default()(assertThisInitialized_default()(_this), "SCOPE", "user:read:email");

      _this.setFinalUrl();

      return _this;
    }

    createClass_default()(TwitchHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://id.twitch.tv/oauth2/authorize");
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params) {
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

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        accessToken = params.accessToken;
                        _context.next = 3;
                        return (0, http_helpers_namespaceObject.get)("https://api.twitch.tv/helix/users", {
                          headers: {
                            Authorization: "Bearer ".concat(accessToken),
                            "Client-ID": this.clientId,
                          },
                        });

                      case 3:
                        userInfo = _context.sent;
                        (_ref = userInfo.data || []),
                          (_ref2 = slicedToArray_default()(_ref, 1)),
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/WebAuthnHandler.ts

  function WebAuthnHandler_createSuper(Derived) {
    var hasNativeReflectConstruct = WebAuthnHandler_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = getPrototypeOf_default()(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = getPrototypeOf_default()(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn_default()(this, result);
    };
  }

  function WebAuthnHandler_isNativeReflectConstruct() {
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
    inherits_default()(WebAuthnHandler, _AbstractLoginHandler);

    var _super = WebAuthnHandler_createSuper(WebAuthnHandler);

    function WebAuthnHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly) {
      var _this;

      classCallCheck_default()(this, WebAuthnHandler);

      _this = _super.call(this, clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);
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

    createClass_default()(WebAuthnHandler, [
      {
        key: "setFinalUrl",
        value: function setFinalUrl() {
          var finalUrl = new URL("https://webauthn.openlogin.com");
          var clonedParams = JSON.parse(JSON.stringify(this.jwtParams || {}));
          var finalJwtParams = external_lodash_merge_default()(
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
          var _getUserInfo = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(parameters) {
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
                _JSON$parse,
                _yield$get,
                _yield$get2;

              return regenerator_default().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        (idToken = parameters.idToken),
                          (ref = parameters.ref),
                          (extraParamsPassed = parameters.extraParamsPassed),
                          (extraParams = parameters.extraParams);

                        if (!(extraParamsPassed === "true")) {
                          _context.next = 31;
                          break;
                        }

                        loglevel.debug("extraParamsPassed is true, using extraParams passed through hashParams");
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
                        _context.next = 29;
                        break;

                      case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](3);
                        loglevel.warn("unable to parse extraParams", _context.t0);
                        _context.next = 20;
                        return (0, http_helpers_namespaceObject.get)("".concat(WEBAUTHN_LOOKUP_SERVER, "/signature/fetch/").concat(idToken));

                      case 20:
                        _yield$get = _context.sent;
                        verifierId = _yield$get.verifier_id;
                        signature = _yield$get.signature;
                        clientDataJSON = _yield$get.clientDataJSON;
                        authenticatorData = _yield$get.authenticatorData;
                        publicKey = _yield$get.publicKey;
                        challenge = _yield$get.challenge;
                        rpOrigin = _yield$get.rpOrigin;
                        credId = _yield$get.credId;

                      case 29:
                        _context.next = 43;
                        break;

                      case 31:
                        loglevel.debug("extraParamsPassed is false, using extraParams passed through bridge server");
                        _context.next = 34;
                        return (0, http_helpers_namespaceObject.get)("".concat(WEBAUTHN_LOOKUP_SERVER, "/signature/fetch/").concat(idToken));

                      case 34:
                        _yield$get2 = _context.sent;
                        verifierId = _yield$get2.verifier_id;
                        signature = _yield$get2.signature;
                        clientDataJSON = _yield$get2.clientDataJSON;
                        authenticatorData = _yield$get2.authenticatorData;
                        publicKey = _yield$get2.publicKey;
                        challenge = _yield$get2.challenge;
                        rpOrigin = _yield$get2.rpOrigin;
                        credId = _yield$get2.credId;

                      case 43:
                        if (!(signature !== idToken)) {
                          _context.next = 45;
                          break;
                        }

                        throw new Error("idtoken should be equal to signature");

                      case 45:
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
                          },
                        });

                      case 46:
                      case "end":
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
                [[3, 15]]
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
  })(handlers_AbstractLoginHandler); // CONCATENATED MODULE: ./src/handlers/HandlerFactory.ts

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
        return new PasswordlessHandler_JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);

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

        return new JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState);

      case LOGIN.WEBAUTHN:
        return new WebAuthnHandler(clientId, verifier, redirect_uri, typeOfLogin, uxMode, redirectToOpener, jwtParams, customState, registerOnly);

      default:
        throw new Error("Invalid login type");
    }
  };

  /* harmony default export */ const HandlerFactory = createHandler; // CONCATENATED MODULE: ./src/handlers/interfaces.ts
  var SkipTorusKey;

  (function (SkipTorusKey) {
    SkipTorusKey[(SkipTorusKey["Never"] = 0)] = "Never";
    SkipTorusKey[(SkipTorusKey["IfNew"] = 1)] = "IfNew";
    SkipTorusKey[(SkipTorusKey["Always"] = 2)] = "Always";
  })(SkipTorusKey || (SkipTorusKey = {})); // CONCATENATED MODULE: external "@toruslabs/torus.js"
  const torus_js_namespaceObject = require("@toruslabs/torus.js");
  var torus_js_default = /*#__PURE__*/ __webpack_require__.n(torus_js_namespaceObject); // CONCATENATED MODULE: external "web3-utils"
  const external_web3_utils_namespaceObject = require("web3-utils"); // CONCATENATED MODULE: external "@chaitanyapotti/register-service-worker"
  const register_service_worker_namespaceObject = require("@chaitanyapotti/register-service-worker"); // CONCATENATED MODULE: ./src/registerServiceWorker.ts
  var registerServiceWorker = function registerServiceWorker(baseUrl) {
    return new Promise(function (resolve, reject) {
      var swUrl = "".concat(baseUrl, "sw.js");

      if ("serviceWorker" in window.navigator) {
        // if swIntegrity is not calculated
        (0, register_service_worker_namespaceObject.register)(swUrl, {
          ready: function ready() {
            loglevel.info("App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB");
            resolve(undefined);
          },
          registered: function registered() {
            loglevel.info("Service worker has been registered.");
            resolve(undefined);
          },
          cached: function cached() {
            loglevel.info("Content has been cached for offline use.");
            resolve(undefined);
          },
          updatefound: function updatefound() {
            loglevel.info("New content is downloading.");
          },
          updated: function updated() {
            loglevel.info("New content is available; please refresh.");
          },
          offline: function offline() {
            loglevel.info("No internet connection found. App is running in offline mode.");
            reject(new Error("App is offline"));
          },
          error: function error(_error) {
            loglevel.error("Error during service worker registration:", _error);
            reject(_error);
          },
        });
      } else {
        reject(new Error("Service workers are not supported"));
      }
    });
  }; // CONCATENATED MODULE: ./src/sentry.ts
  var SentryHandler = /*#__PURE__*/ (function () {
    function SentryHandler(sentry, chainUrl) {
      classCallCheck_default()(this, SentryHandler);

      defineProperty_default()(this, "sentry", null);

      defineProperty_default()(this, "chainUrl", "");

      this.sentry = sentry;
      this.chainUrl = chainUrl;
    }

    createClass_default()(SentryHandler, [
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
  })(); // CONCATENATED MODULE: external "@toruslabs/eccrypto"

  const eccrypto_namespaceObject = require("@toruslabs/eccrypto"); // CONCATENATED MODULE: external "@toruslabs/metadata-helpers"
  const metadata_helpers_namespaceObject = require("@toruslabs/metadata-helpers"); // CONCATENATED MODULE: ./src/utils/StorageHelper.ts
  var StorageHelper = /*#__PURE__*/ (function () {
    function StorageHelper(serverUrl) {
      classCallCheck_default()(this, StorageHelper);

      defineProperty_default()(this, "currentStorageMethod", REDIRECT_PARAMS_STORAGE_METHOD.LOCAL_STORAGE);

      defineProperty_default()(this, "isInitialized", false);

      defineProperty_default()(this, "storageServerUrl", "https://broadcast-server.tor.us");

      this.storageServerUrl = serverUrl;
    }

    createClass_default()(StorageHelper, [
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
          var _storeLoginDetails = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee(params, scope) {
              var privKey, privKeyHex, publicKeyHex, encData, signature;
              return regenerator_default().wrap(
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

                        privKey = (0, metadata_helpers_namespaceObject.keccak256)(scope);
                        privKeyHex = privKey.toString("hex");
                        publicKeyHex = (0, eccrypto_namespaceObject.getPublic)(privKey).toString("hex");
                        _context.next = 8;
                        return (0, metadata_helpers_namespaceObject.encryptData)(privKeyHex, params);

                      case 8:
                        encData = _context.sent;
                        _context.next = 11;
                        return (0, eccrypto_namespaceObject.sign)(privKey, (0, metadata_helpers_namespaceObject.keccak256)(encData));

                      case 11:
                        signature = _context.sent.toString("hex");
                        _context.next = 14;
                        return (0, http_helpers_namespaceObject.post)("".concat(this.storageServerUrl, "/store/set"), {
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
          var _retrieveLoginDetails = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee2(scope) {
              var privKey, privKeyHex, publicKeyHex, encData, _loginDetails, loginDetails;

              return regenerator_default().wrap(
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
                          _context2.next = 13;
                          break;
                        }

                        privKey = (0, metadata_helpers_namespaceObject.keccak256)(scope);
                        privKeyHex = privKey.toString("hex");
                        publicKeyHex = (0, eccrypto_namespaceObject.getPublic)(privKey).toString("hex");
                        _context2.next = 8;
                        return (0, http_helpers_namespaceObject.get)("".concat(this.storageServerUrl, "/store/get?key=").concat(publicKeyHex));

                      case 8:
                        encData = _context2.sent;
                        _context2.next = 11;
                        return (0, metadata_helpers_namespaceObject.decryptData)(privKeyHex, encData.message);

                      case 11:
                        _loginDetails = _context2.sent;
                        return _context2.abrupt("return", _loginDetails);

                      case 13:
                        loginDetails = window.localStorage.getItem("torus_login_".concat(scope));
                        return _context2.abrupt("return", JSON.parse(loginDetails || "{}"));

                      case 15:
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
          } // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
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
          } // No need to clear server details cause they auto expire and scope is never re-used for different login attempts
        },
      },
    ]);

    return StorageHelper;
  })();

  /* harmony default export */ const utils_StorageHelper = StorageHelper; // CONCATENATED MODULE: ./src/login.ts
  var login_excluded = ["access_token", "id_token"],
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

  var CustomAuth = /*#__PURE__*/ (function () {
    function CustomAuth(_ref) {
      var baseUrl = _ref.baseUrl,
        _ref$network = _ref.network,
        network = _ref$network === void 0 ? fetch_node_details_namespaceObject.TORUS_NETWORK.MAINNET : _ref$network,
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

      classCallCheck_default()(this, CustomAuth);

      defineProperty_default()(this, "isInitialized", void 0);

      defineProperty_default()(this, "config", void 0);

      defineProperty_default()(this, "torus", void 0);

      defineProperty_default()(this, "nodeDetailManager", void 0);

      defineProperty_default()(this, "storageHelper", void 0);

      defineProperty_default()(this, "sentryHandler", void 0);

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
      var torus = new (torus_js_default())({
        enableOneKey: enableOneKey,
        metadataHost: metadataUrl,
        allowHost: "".concat(SIGNER_MAP[network], "/api/allow"),
        signerHost: "".concat(SIGNER_MAP[network], "/api/sign"),
        network: network,
      });
      torus_js_default().setAPIKey(apiKey);
      this.torus = torus;
      this.nodeDetailManager = new (fetch_node_details_default())({
        network: networkUrl || network,
        proxyAddress: CONTRACT_MAP[network],
      });
      if (enableLogging) loglevel.enableAll();
      else loglevel.disableAll();
      this.storageHelper = new utils_StorageHelper(storageServerUrl);
      this.sentryHandler = new SentryHandler(sentry, networkUrl);
    }

    createClass_default()(CustomAuth, [
      {
        key: "init",
        value: (function () {
          var _init = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee() {
              var _ref2,
                _ref2$skipSw,
                skipSw,
                _ref2$skipInit,
                skipInit,
                _ref2$skipPrefetch,
                skipPrefetch,
                fetchSwResponse,
                _args = arguments;

              return regenerator_default().wrap(
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
                        loglevel.warn(_context.t0);

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
          var _triggerLogin = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee2(args) {
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

              return regenerator_default().wrap(
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
                        loglevel.info("Verifier: ", verifier);

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
                        loginHandler = HandlerFactory({
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
                          (rest = objectWithoutProperties_default()(hashParameters, login_excluded)); // State has to be last here otherwise it will be overwritten

                        loginParams = login_objectSpread(
                          login_objectSpread(
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
                        _context2.next = 23;
                        break;

                      case 15:
                        this.storageHelper.clearOrphanedLoginDetails();
                        _context2.next = 18;
                        return this.storageHelper.storeLoginDetails(
                          {
                            method: TORUS_METHOD.TRIGGER_LOGIN,
                            args: args,
                          },
                          loginHandler.nonce
                        );

                      case 18:
                        _context2.next = 20;
                        return loginHandler.handleLoginWindow({
                          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                          popupFeatures: this.config.popupFeatures,
                        });

                      case 20:
                        loginParams = _context2.sent;

                        if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                          _context2.next = 23;
                          break;
                        }

                        return _context2.abrupt("return", null);

                      case 23:
                        _context2.next = 25;
                        return loginHandler.getUserInfo(loginParams);

                      case 25:
                        userInfo = _context2.sent;

                        if (!registerOnly) {
                          _context2.next = 44;
                          break;
                        }

                        nodeTx = this.sentryHandler.startTransaction({
                          name: SENTRY_TXNS.FETCH_NODE_DETAILS,
                        });
                        _context2.next = 30;
                        return this.nodeDetailManager.getNodeDetails({
                          verifier: verifier,
                          verifierId: userInfo.verifierId,
                        });

                      case 30:
                        _yield$this$nodeDetai = _context2.sent;
                        torusNodeEndpoints = _yield$this$nodeDetai.torusNodeEndpoints;
                        torusNodePub = _yield$this$nodeDetai.torusNodePub;
                        this.sentryHandler.finishTransaction(nodeTx);
                        lookupTx = this.sentryHandler.startTransaction({
                          name: SENTRY_TXNS.PUB_ADDRESS_LOOKUP,
                        });
                        _context2.next = 37;
                        return this.torus.getPublicAddress(
                          torusNodeEndpoints,
                          torusNodePub,
                          {
                            verifier: verifier,
                            verifierId: userInfo.verifierId,
                          },
                          true
                        );

                      case 37:
                        torusPubKey = _context2.sent;
                        this.sentryHandler.finishTransaction(lookupTx);
                        res = {
                          userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
                        };

                        if (!(typeof torusPubKey === "string")) {
                          _context2.next = 42;
                          break;
                        }

                        throw new Error("should have returned extended pub key");

                      case 42:
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
                        return _context2.abrupt("return", login_objectSpread(login_objectSpread({}, res), _torusKey));

                      case 44:
                        skip = true;

                        if (!(checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew)) {
                          _context2.next = 54;
                          break;
                        }

                        _context2.next = 48;
                        return this.nodeDetailManager.getNodeDetails({
                          verifier: verifier,
                          verifierId: userInfo.verifierId,
                        });

                      case 48:
                        _yield$this$nodeDetai2 = _context2.sent;
                        _torusNodeEndpoints = _yield$this$nodeDetai2.torusNodeEndpoints;
                        _context2.next = 52;
                        return (0, torus_js_namespaceObject.keyLookup)(_torusNodeEndpoints, verifier, userInfo.verifierId);

                      case 52:
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

                      case 54:
                        _context2.t0 = skipTorusKey;
                        _context2.next =
                          _context2.t0 === SkipTorusKey.IfNew
                            ? 57
                            : _context2.t0 === SkipTorusKey.Always
                            ? 59
                            : _context2.t0 === SkipTorusKey.Never
                            ? 61
                            : 63;
                        break;

                      case 57:
                        skip = !existingPk;
                        return _context2.abrupt("break", 64);

                      case 59:
                        skip = true;
                        return _context2.abrupt("break", 64);

                      case 61:
                        skip = false;
                        return _context2.abrupt("break", 64);

                      case 63:
                        throw new Error("Invalid SkipTorusKey");

                      case 64:
                        if (!skip) {
                          _context2.next = 68;
                          break;
                        }

                        _context2.t1 = undefined;
                        _context2.next = 71;
                        break;

                      case 68:
                        _context2.next = 70;
                        return this.getTorusKey(
                          verifier,
                          userInfo.verifierId,
                          {
                            verifier_id: userInfo.verifierId,
                          },
                          loginParams.idToken || loginParams.accessToken,
                          userInfo.extraVerifierParams
                        );

                      case 70:
                        _context2.t1 = _context2.sent;

                      case 71:
                        torusKey = _context2.t1;
                        return _context2.abrupt(
                          "return",
                          login_objectSpread(
                            login_objectSpread({}, torusKey),
                            {},
                            {
                              existingPk: existingPk,
                              userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
                            }
                          )
                        );

                      case 73:
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
          var _triggerAggregateLogin = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee3(args) {
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

              return regenerator_default().wrap(
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
                          _context3.next = 37;
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
                        loginHandler = HandlerFactory({
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
                          (rest = objectWithoutProperties_default()(hashParameters, _excluded2)); // State has to be last here otherwise it will be overwritten

                        _loginParams = login_objectSpread(
                          login_objectSpread(
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
                        _context3.next = 33;
                        break;

                      case 25:
                        this.storageHelper.clearOrphanedLoginDetails();
                        _context3.next = 28;
                        return this.storageHelper.storeLoginDetails(
                          {
                            method: TORUS_METHOD.TRIGGER_AGGREGATE_LOGIN,
                            args: args,
                          },
                          loginHandler.nonce
                        );

                      case 28:
                        _context3.next = 30;
                        return loginHandler.handleLoginWindow({
                          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                          popupFeatures: this.config.popupFeatures,
                        });

                      case 30:
                        _loginParams = _context3.sent;

                        if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                          _context3.next = 33;
                          break;
                        }

                        return _context3.abrupt("return", null);

                      case 33:
                        // Fail the method even if one promise fails
                        userInfoPromises.push(loginHandler.getUserInfo(_loginParams));
                        loginParamsArray.push(_loginParams);

                      case 35:
                        _context3.next = 12;
                        break;

                      case 37:
                        _context3.next = 42;
                        break;

                      case 39:
                        _context3.prev = 39;
                        _context3.t0 = _context3["catch"](10);

                        _iterator.e(_context3.t0);

                      case 42:
                        _context3.prev = 42;

                        _iterator.f();

                        return _context3.finish(42);

                      case 45:
                        _context3.next = 47;
                        return Promise.all(userInfoPromises);

                      case 47:
                        _userInfoArray = _context3.sent;
                        userInfoArray = _userInfoArray.map(function (userInfo) {
                          return login_objectSpread(
                            login_objectSpread({}, userInfo),
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
                        aggregateIdToken = (0, external_web3_utils_namespaceObject.keccak256)(
                          aggregateIdTokenSeeds.join(String.fromCharCode(29))
                        ).slice(2);
                        aggregateVerifierParams.verifier_id = aggregateVerifierId;
                        userInfoData = userInfoArray.map(function (x, index) {
                          return login_objectSpread(login_objectSpread({}, x), loginParamsArray[index]);
                        });
                        skip = true;

                        if (!(checkIfNewKey || skipTorusKey === SkipTorusKey.IfNew)) {
                          _context3.next = 68;
                          break;
                        }

                        _context3.next = 62;
                        return this.nodeDetailManager.getNodeDetails({
                          verifier: args.verifierIdentifier,
                          verifierId: userInfoData[0].verifierId,
                        });

                      case 62:
                        _yield$this$nodeDetai3 = _context3.sent;
                        torusNodeEndpoints = _yield$this$nodeDetai3.torusNodeEndpoints;
                        _context3.next = 66;
                        return (0, torus_js_namespaceObject.keyLookup)(torusNodeEndpoints, args.verifierIdentifier, userInfoData[0].verifierId);

                      case 66:
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

                      case 68:
                        _context3.t1 = skipTorusKey;
                        _context3.next =
                          _context3.t1 === SkipTorusKey.IfNew
                            ? 71
                            : _context3.t1 === SkipTorusKey.Always
                            ? 73
                            : _context3.t1 === SkipTorusKey.Never
                            ? 75
                            : 77;
                        break;

                      case 71:
                        skip = !existingPk;
                        return _context3.abrupt("break", 78);

                      case 73:
                        skip = true;
                        return _context3.abrupt("break", 78);

                      case 75:
                        skip = false;
                        return _context3.abrupt("break", 78);

                      case 77:
                        throw new Error("Invalid SkipTorusKey");

                      case 78:
                        if (!skip) {
                          _context3.next = 82;
                          break;
                        }

                        _context3.t2 = undefined;
                        _context3.next = 85;
                        break;

                      case 82:
                        _context3.next = 84;
                        return this.getTorusKey(
                          verifierIdentifier,
                          aggregateVerifierId,
                          aggregateVerifierParams,
                          aggregateIdToken,
                          extraVerifierParams
                        );

                      case 84:
                        _context3.t2 = _context3.sent;

                      case 85:
                        torusKey = _context3.t2;
                        return _context3.abrupt(
                          "return",
                          login_objectSpread(
                            login_objectSpread({}, torusKey),
                            {},
                            {
                              existingPk: existingPk,
                              userInfo: userInfoArray.map(function (x, index) {
                                return login_objectSpread(login_objectSpread({}, x), loginParamsArray[index]);
                              }),
                            }
                          )
                        );

                      case 87:
                      case "end":
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                this,
                [[10, 39, 42, 45]]
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
          var _triggerHybridAggregateLogin = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee4(args) {
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

              return regenerator_default().wrap(
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
                        loginHandler = HandlerFactory({
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
                          (rest = objectWithoutProperties_default()(hashParameters, _excluded3)); // State has to be last here otherwise it will be overwritten

                        loginParams = login_objectSpread(
                          login_objectSpread(
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
                        _context4.next = 25;
                        break;

                      case 17:
                        this.storageHelper.clearOrphanedLoginDetails();
                        _context4.next = 20;
                        return this.storageHelper.storeLoginDetails(
                          {
                            method: TORUS_METHOD.TRIGGER_AGGREGATE_HYBRID_LOGIN,
                            args: args,
                          },
                          loginHandler.nonce
                        );

                      case 20:
                        _context4.next = 22;
                        return loginHandler.handleLoginWindow({
                          locationReplaceOnRedirect: this.config.locationReplaceOnRedirect,
                          popupFeatures: this.config.popupFeatures,
                        });

                      case 22:
                        loginParams = _context4.sent;

                        if (!(this.config.uxMode === UX_MODE.REDIRECT)) {
                          _context4.next = 25;
                          break;
                        }

                        return _context4.abrupt("return", null);

                      case 25:
                        _context4.next = 27;
                        return loginHandler.getUserInfo(loginParams);

                      case 27:
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
                        aggregateIdToken = (0, external_web3_utils_namespaceObject.keccak256)(
                          aggregateIdTokenSeeds.join(String.fromCharCode(29))
                        ).slice(2);
                        aggregateVerifierParams.verifier_id = aggregateVerifierId;
                        torusKey2Promise = this.getTorusKey(
                          verifierIdentifier,
                          aggregateVerifierId,
                          aggregateVerifierParams,
                          aggregateIdToken,
                          userInfo.extraVerifierParams
                        );
                        _context4.next = 40;
                        return Promise.all([torusKey1Promise, torusKey2Promise]);

                      case 40:
                        _yield$Promise$all = _context4.sent;
                        _yield$Promise$all2 = slicedToArray_default()(_yield$Promise$all, 2);
                        torusKey1 = _yield$Promise$all2[0];
                        torusKey2 = _yield$Promise$all2[1];
                        return _context4.abrupt("return", {
                          singleLogin: login_objectSpread(
                            {
                              userInfo: login_objectSpread(login_objectSpread({}, userInfo), loginParams),
                            },
                            torusKey1
                          ),
                          aggregateLogins: [torusKey2],
                        });

                      case 45:
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
          var _getTorusKey = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee5(verifier, verifierId, verifierParams, idToken, additionalParams) {
              var nodeTx, _yield$this$nodeDetai4, torusNodeEndpoints, torusNodePub, torusIndexes, pubLookupTx, address, sharesTx, shares;

              return regenerator_default().wrap(
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
                        loglevel.debug("torus-direct/getTorusKey", {
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
                        loglevel.debug("torus-direct/getTorusKey", {
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
                        loglevel.debug("torus-direct/getTorusKey", {
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
          var _getAggregateTorusKey = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee6(
              verifier,
              verifierId, // unique identifier for user e.g. sub on jwt
              subVerifierInfoArray
            ) {
              var aggregateVerifierParams, aggregateIdTokenSeeds, extraVerifierParams, index, userInfo, aggregateIdToken;
              return regenerator_default().wrap(
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
                        aggregateIdToken = (0, external_web3_utils_namespaceObject.keccak256)(
                          aggregateIdTokenSeeds.join(String.fromCharCode(29))
                        ).slice(2);
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
          var _getRedirectResult = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee7() {
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

              return regenerator_default().wrap(
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
                        loglevel.info(instanceId, "instanceId");
                        _context7.next = 15;
                        return this.storageHelper.retrieveLoginDetails(instanceId);

                      case 15:
                        _yield$this$storageHe = _context7.sent;
                        args = _yield$this$storageHe.args;
                        method = _yield$this$storageHe.method;
                        rest = objectWithoutProperties_default()(_yield$this$storageHe, _excluded4);
                        loglevel.info(args, method);

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
                        loglevel.error(_context7.t0);
                        return _context7.abrupt(
                          "return",
                          login_objectSpread(
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
                          login_objectSpread(
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
                          login_objectSpread(
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
          var _handlePrefetchRedirectUri = asyncToGenerator_default()(
            /*#__PURE__*/ regenerator_default().mark(function _callee8() {
              var _this = this;

              return regenerator_default().wrap(function _callee8$(_context8) {
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
                                      "Please serve redirect.html present in serviceworker folder of this package on ".concat(
                                        _this.config.redirect_uri
                                      )
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

  /* harmony default export */ const login = CustomAuth; // CONCATENATED MODULE: ./src/index.ts
  module.exports = __webpack_exports__;
  /******/
})();
//# sourceMappingURL=customauth.cjs.js.map
