import { BrowserOptions } from '@sentry/browser';
import { BaseBackend } from '@sentry/core';
import { Event, EventHint, Severity, Transport } from '@sentry/types';
/**
 * Configuration options for the Sentry Cordova SDK.
 * @see CordovaFrontend for more information.
 */
export interface CordovaOptions extends BrowserOptions {
    /**
     * Enables crash reporting for native crashes.
     * Defaults to `true`.
     */
    enableNative?: boolean;
    /**
     * Should sessions be tracked to Sentry Health or not.
     * Defaults to `true`.
     *
     * NOTE: Currently only supported on Android and iOS. Browser not yet supported.
     */
    enableAutoSessionTracking?: boolean;
    /** The interval to end a session if the App goes to the background. */
    sessionTrackingIntervalMillis?: number;
    /** Enable scope sync from Java to NDK on Android */
    enableNdkScopeSync?: boolean;
    /** When enabled, all the threads are automatically attached to all logged events on Android */
    attachThreads?: boolean;
}
/** The Sentry Cordova SDK Backend. */
export declare class CordovaBackend extends BaseBackend<BrowserOptions> {
    protected readonly _options: CordovaOptions;
    private readonly _browserBackend;
    private readonly _deviceReadyCallback?;
    /** Creates a new cordova backend instance. */
    constructor(_options: CordovaOptions);
    /**
     * @inheritDoc
     */
    eventFromException(exception: unknown, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: string, level?: Severity, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    protected _setupTransport(): Transport;
    /**
     * Calling into native install function
     */
    private _startOnNative;
    /**
     * Has cordova on window?
     */
    private _isCordova;
}
//# sourceMappingURL=backend.d.ts.map