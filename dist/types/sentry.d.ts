import type { Transaction, TransactionContext } from "@sentry/types";
export interface Sentry {
    startTransaction(_: TransactionContext): Transaction;
}
export default class SentryHandler {
    sentry: Sentry | null;
    constructor(sentry?: Sentry);
    startTransaction(context: TransactionContext): Transaction | void;
    finishTransaction(tx: void | Transaction): void;
}
