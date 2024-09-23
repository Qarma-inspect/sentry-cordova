Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeCrash = exports.init = void 0;
var tslib_1 = require("tslib");
var browser_1 = require("@sentry/browser");
var core_1 = require("@sentry/core");
var utils_1 = require("@sentry/utils");
var client_1 = require("./client");
var integrations_1 = require("./integrations");
var scope_1 = require("./scope");
var wrapper_1 = require("./wrapper");
var DEFAULT_INTEGRATIONS = tslib_1.__spread(browser_1.defaultIntegrations, [new integrations_1.Cordova()]);
var DEFAULT_OPTIONS = {
    enableNative: true,
    defaultIntegrations: DEFAULT_INTEGRATIONS,
    enableAutoSessionTracking: true,
    enableNdkScopeSync: false,
    attachThreads: false,
};
/**
 * Inits the SDK
 */
function init(_options) {
    var _a;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var window = utils_1.getGlobalObject();
    var options = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, DEFAULT_OPTIONS), { release: (_a = window === null || window === void 0 ? void 0 : window.SENTRY_RELEASE) === null || _a === void 0 ? void 0 : _a.id }), _options);
    // Initialize a new hub using our scope with native sync
    var cordovaHub = new core_1.Hub(undefined, new scope_1.CordovaScope());
    core_1.makeMain(cordovaHub);
    core_1.initAndBind(client_1.CordovaClient, options);
}
exports.init = init;
/**
 * If native client is available it will trigger a native crash.
 * Use this only for testing purposes.
 */
function nativeCrash() {
    if (wrapper_1.NATIVE.isNativeClientAvailable()) {
        wrapper_1.NATIVE.crash();
    }
}
exports.nativeCrash = nativeCrash;
//# sourceMappingURL=sdk.js.map