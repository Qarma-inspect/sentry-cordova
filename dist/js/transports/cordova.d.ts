import { Event, Response, Transport, TransportOptions } from '@sentry/types';
import { PromiseBuffer } from '@sentry/utils';
/**
 * Uses the native transport if available, otherwise falls back to Fetch/XHR transport.
 * @see NATIVE.SUPPORTS_NATIVE_TRANSPORT for platforms with native transport
 */
export declare class CordovaTransport implements Transport {
    /** A simple buffer holding all requests. */
    protected readonly _buffer: PromiseBuffer<Response>;
    /** Fallback transport uses if native transport is not available */
    private _fallbackTransport;
    constructor(options: TransportOptions);
    /**
     * @inheritDoc
     */
    sendEvent(event: Event): PromiseLike<Response>;
    /**
     * @inheritDoc
     */
    close(timeout?: number): PromiseLike<boolean>;
}
//# sourceMappingURL=cordova.d.ts.map