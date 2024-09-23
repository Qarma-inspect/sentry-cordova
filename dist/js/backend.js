Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaBackend = void 0;
var tslib_1 = require("tslib");
var backend_1 = require("@sentry/browser/dist/backend");
var core_1 = require("@sentry/core");
var types_1 = require("@sentry/types");
var utils_1 = require("@sentry/utils");
var cordova_1 = require("./transports/cordova");
var wrapper_1 = require("./wrapper");
/** The Sentry Cordova SDK Backend. */
var CordovaBackend = /** @class */ (function (_super) {
    tslib_1.__extends(CordovaBackend, _super);
    /** Creates a new cordova backend instance. */
    function CordovaBackend(_options) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this._browserBackend = new backend_1.BrowserBackend(_options);
        if (_this._isCordova() && _options.enableNative !== false) {
            _this._deviceReadyCallback = function () {
                _this._startOnNative();
            };
            utils_1.getGlobalObject().document.addEventListener('deviceready', _this._deviceReadyCallback);
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromException = function (exception, hint) {
        return this._browserBackend.eventFromException(exception, hint);
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = types_1.Severity.Info; }
        return this._browserBackend.eventFromMessage(message, level, hint);
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype._setupTransport = function () {
        if (!this._options.dsn) {
            // We return the noop transport here in case there is no Dsn.
            return new core_1.NoopTransport();
        }
        var transportOptions = tslib_1.__assign(tslib_1.__assign({}, this._options.transportOptions), { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        return new cordova_1.CordovaTransport(transportOptions);
    };
    // CORDOVA --------------------
    /**
     * Calling into native install function
     */
    CordovaBackend.prototype._startOnNative = function () {
        if (this._deviceReadyCallback) {
            utils_1.getGlobalObject().document.removeEventListener('deviceready', this._deviceReadyCallback);
            utils_1.forget(wrapper_1.NATIVE.startWithOptions(this._options));
        }
    };
    /**
     * Has cordova on window?
     */
    CordovaBackend.prototype._isCordova = function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        return utils_1.getGlobalObject().cordova !== undefined || utils_1.getGlobalObject().Cordova !== undefined;
    };
    return CordovaBackend;
}(core_1.BaseBackend));
exports.CordovaBackend = CordovaBackend;
//# sourceMappingURL=backend.js.map