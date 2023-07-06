import { NodeDetailManager } from "@toruslabs/fetch-node-details";
import Torus, { TorusKey } from "@toruslabs/torus.js";
import { AggregateLoginParams, CustomAuthArgs, ExtraParams, HybridAggregateLoginParams, InitParams, RedirectResult, RedirectResultParams, SingleLoginParams, SkipTorusKey, TorusAggregateLoginResponse, TorusHybridAggregateLoginResponse, TorusLoginResponse, TorusSubVerifierInfo } from "./handlers/interfaces";
import SentryHandler from "./sentry";
import { UX_MODE_TYPE } from "./utils/enums";
import StorageHelper from "./utils/StorageHelper";
declare class CustomAuth {
    isInitialized: boolean;
    config: {
        baseUrl: string;
        redirectToOpener: boolean;
        redirect_uri: string;
        uxMode: UX_MODE_TYPE;
        locationReplaceOnRedirect: boolean;
        popupFeatures: string;
    };
    torus: Torus;
    nodeDetailManager: NodeDetailManager;
    storageHelper: StorageHelper;
    sentryHandler: SentryHandler;
    constructor({ baseUrl, network, enableLogging, redirectToOpener, redirectPathName, apiKey, uxMode, locationReplaceOnRedirect, popupFeatures, storageServerUrl, sentry, enableOneKey, web3AuthClientId, metadataUrl, }: CustomAuthArgs);
    init({ skipSw, skipInit, skipPrefetch }?: InitParams): Promise<void>;
    triggerLogin(args: SingleLoginParams & {
        skipTorusKey?: SkipTorusKey;
        checkIfNewKey?: boolean;
    }): Promise<TorusLoginResponse>;
    triggerAggregateLogin(args: AggregateLoginParams & {
        skipTorusKey?: SkipTorusKey;
        checkIfNewKey?: boolean;
    }): Promise<TorusAggregateLoginResponse>;
    triggerHybridAggregateLogin(args: HybridAggregateLoginParams): Promise<TorusHybridAggregateLoginResponse>;
    getTorusKey(verifier: string, verifierId: string, verifierParams: {
        verifier_id: string;
    }, idToken: string, additionalParams?: ExtraParams): Promise<TorusKey>;
    getAggregateTorusKey(verifier: string, verifierId: string, // unique identifier for user e.g. sub on jwt
    subVerifierInfoArray: TorusSubVerifierInfo[]): Promise<TorusKey>;
    getRedirectResult({ replaceUrl, clearLoginDetails }?: RedirectResultParams): Promise<RedirectResult>;
    private handlePrefetchRedirectUri;
}
export default CustomAuth;
