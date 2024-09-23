Object.defineProperty(exports, "__esModule", { value: true });
exports.withSentryIonicErrorHandler = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
/**
 * Wrap the ionic error handler with this method so Sentry catches unhandled errors on ionic.
 * See the documentation for more details.
 */
var withSentryIonicErrorHandler = function (IonicErrorHandler) {
    var SentryIonicErrorHandler = /** @class */ (function (_super) {
        tslib_1.__extends(SentryIonicErrorHandler, _super);
        function SentryIonicErrorHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SentryIonicErrorHandler.prototype.handleError = function (error) {
            var _a;
            _super.prototype.handleError.call(this, error);
            core_1.captureException((_a = error.originalError) !== null && _a !== void 0 ? _a : error);
        };
        return SentryIonicErrorHandler;
    }(IonicErrorHandler));
    return SentryIonicErrorHandler;
};
exports.withSentryIonicErrorHandler = withSentryIonicErrorHandler;
//# sourceMappingURL=SentryIonicErrorHandler.js.map