import { Auth0UserInfo, TorusGenericObject } from "../handlers/interfaces";
import { LOGIN_TYPE, REDIRECT_PARAMS_STORAGE_METHOD_TYPE } from "./enums";
interface CustomMessageEvent extends MessageEvent {
    error: string;
}
interface EventListener {
    (evt: CustomMessageEvent): void;
}
type EmitterType = {
    addEventListener(type: string, handler: EventListener): void;
    removeEventListener(type: string, handler: EventListener): void;
};
export declare function eventToPromise<T>(emitter: EmitterType): Promise<T>;
export declare const loginToConnectionMap: {
    apple: string;
    github: string;
    linkedin: string;
    twitter: string;
    weibo: string;
    line: string;
    email_password: string;
    passwordless: string;
};
export declare const padUrlString: (url: URL) => string;
/**
 * Returns a random number. Don't use for cryptographic purposes.
 * @returns a random number
 */
export declare const randomId: () => string;
export declare const broadcastChannelOptions: {
    webWorkerSupport: boolean;
};
export declare const getVerifierId: (userInfo: Auth0UserInfo, typeOfLogin: LOGIN_TYPE, verifierIdField?: keyof Auth0UserInfo, isVerifierIdCaseSensitive?: boolean) => string;
export declare const handleRedirectParameters: (hash: string, queryParameters: TorusGenericObject) => {
    error: string;
    instanceParameters: TorusGenericObject;
    hashParameters: TorusGenericObject;
};
export declare function storageAvailable(type: REDIRECT_PARAMS_STORAGE_METHOD_TYPE): boolean;
export declare function getPopupFeatures(): string;
export declare const isFirefox: () => boolean;
export declare function constructURL(params: {
    baseURL: string;
    query?: Record<string, unknown>;
    hash?: Record<string, unknown>;
}): string;
export declare function are3PCSupported(): boolean;
export declare const validateAndConstructUrl: (domain: string) => URL;
export declare function isMobileOrTablet(): boolean;
export declare function getTimeout(typeOfLogin: LOGIN_TYPE): number;
export {};
