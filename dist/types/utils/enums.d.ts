export declare const LOGIN: {
    readonly GOOGLE: "google";
    readonly FACEBOOK: "facebook";
    readonly REDDIT: "reddit";
    readonly DISCORD: "discord";
    readonly TWITCH: "twitch";
    readonly APPLE: "apple";
    readonly GITHUB: "github";
    readonly LINKEDIN: "linkedin";
    readonly TWITTER: "twitter";
    readonly WEIBO: "weibo";
    readonly LINE: "line";
    readonly EMAIL_PASSWORD: "email_password";
    readonly PASSWORDLESS: "passwordless";
    readonly JWT: "jwt";
    readonly WEBAUTHN: "webauthn";
};
export declare const AGGREGATE_VERIFIER: {
    readonly SINGLE_VERIFIER_ID: "single_id_verifier";
};
export declare const UX_MODE: {
    readonly POPUP: "popup";
    readonly REDIRECT: "redirect";
};
export declare const REDIRECT_PARAMS_STORAGE_METHOD: {
    LOCAL_STORAGE: string;
    SESSION_STORAGE: string;
    SERVER: string;
};
export declare const TORUS_METHOD: {
    readonly TRIGGER_LOGIN: "triggerLogin";
    readonly TRIGGER_AGGREGATE_LOGIN: "triggerAggregateLogin";
    readonly TRIGGER_AGGREGATE_HYBRID_LOGIN: "triggerHybridAggregateLogin";
};
export type LOGIN_TYPE = (typeof LOGIN)[keyof typeof LOGIN];
export type AGGREGATE_VERIFIER_TYPE = (typeof AGGREGATE_VERIFIER)[keyof typeof AGGREGATE_VERIFIER];
export type UX_MODE_TYPE = (typeof UX_MODE)[keyof typeof UX_MODE];
export type TORUS_METHOD_TYPE = (typeof TORUS_METHOD)[keyof typeof TORUS_METHOD];
export type REDIRECT_PARAMS_STORAGE_METHOD_TYPE = (typeof REDIRECT_PARAMS_STORAGE_METHOD)[keyof typeof REDIRECT_PARAMS_STORAGE_METHOD];
export declare const SENTRY_TXNS: {
    readonly FETCH_NODE_DETAILS: "fetchNodeDetails";
    readonly PUB_ADDRESS_LOOKUP: "pubAddressLookup";
    readonly FETCH_SHARES: "fetchShares";
};
