Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaTransport = void 0;
var tslib_1 = require("tslib");
var transports_1 = require("@sentry/browser/dist/transports");
var utils_1 = require("@sentry/utils");
var wrapper_1 = require("../wrapper");
/**
 * Uses the native transport if available, otherwise falls back to Fetch/XHR transport.
 * @see NATIVE.SUPPORTS_NATIVE_TRANSPORT for platforms with native transport
 */
var CordovaTransport = /** @class */ (function () {
    function CordovaTransport(options) {
        /** A simple buffer holding all requests. */
        this._buffer = new utils_1.PromiseBuffer(30);
        if (utils_1.supportsFetch()) {
            this._fallbackTransport = new transports_1.FetchTransport(options);
        }
        else {
            this._fallbackTransport = new transports_1.XHRTransport(options);
        }
    }
    /**
     * @inheritDoc
     */
    CordovaTransport.prototype.sendEvent = function (event) {
        if (wrapper_1.NATIVE.isNativeTransportAvailable()) {
            if (!this._buffer.isReady()) {
                return Promise.reject(new utils_1.SentryError('Not adding Promise due to buffer limit reached.'));
            }
            return this._buffer.add(wrapper_1.NATIVE.sendEvent(event));
        }
        return this._fallbackTransport.sendEvent(event);
    };
    /**
     * @inheritDoc
     */
    CordovaTransport.prototype.close = function (timeout) {
        return Promise.all([this._buffer.drain(timeout), this._fallbackTransport.close()]).then(function (_a) {
            var _b = tslib_1.__read(_a, 2), bufferDrained = _b[0], fallbackClosed = _b[1];
            return bufferDrained && fallbackClosed;
        });
    };
    return CordovaTransport;
}());
exports.CordovaTransport = CordovaTransport;
//# sourceMappingURL=cordova.js.map