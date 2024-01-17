import { LoginDetails } from "../handlers/interfaces";
declare class StorageHelper {
    private currentStorageMethod;
    private isInitialized;
    private storageServerUrl;
    constructor(serverUrl: string);
    init(): void;
    storeLoginDetails(params: LoginDetails, scope: string): Promise<void>;
    retrieveLoginDetails(scope: string): Promise<LoginDetails>;
    clearLoginDetailsStorage(scope: string): void;
    clearOrphanedLoginDetails(): void;
}
export default StorageHelper;
