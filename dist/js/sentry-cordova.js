Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserIntegrations = exports.Integrations = void 0;
var types_1 = require("@sentry/types");
Object.defineProperty(exports, "Severity", { enumerable: true, get: function () { return types_1.Severity; } });
Object.defineProperty(exports, "Status", { enumerable: true, get: function () { return types_1.Status; } });
var core_1 = require("@sentry/core");
Object.defineProperty(exports, "addGlobalEventProcessor", { enumerable: true, get: function () { return core_1.addGlobalEventProcessor; } });
Object.defineProperty(exports, "addBreadcrumb", { enumerable: true, get: function () { return core_1.addBreadcrumb; } });
Object.defineProperty(exports, "captureException", { enumerable: true, get: function () { return core_1.captureException; } });
Object.defineProperty(exports, "captureEvent", { enumerable: true, get: function () { return core_1.captureEvent; } });
Object.defineProperty(exports, "captureMessage", { enumerable: true, get: function () { return core_1.captureMessage; } });
Object.defineProperty(exports, "configureScope", { enumerable: true, get: function () { return core_1.configureScope; } });
Object.defineProperty(exports, "withScope", { enumerable: true, get: function () { return core_1.withScope; } });
Object.defineProperty(exports, "getHubFromCarrier", { enumerable: true, get: function () { return core_1.getHubFromCarrier; } });
Object.defineProperty(exports, "getCurrentHub", { enumerable: true, get: function () { return core_1.getCurrentHub; } });
Object.defineProperty(exports, "setUser", { enumerable: true, get: function () { return core_1.setUser; } });
Object.defineProperty(exports, "setContext", { enumerable: true, get: function () { return core_1.setContext; } });
Object.defineProperty(exports, "setExtra", { enumerable: true, get: function () { return core_1.setExtra; } });
Object.defineProperty(exports, "setExtras", { enumerable: true, get: function () { return core_1.setExtras; } });
Object.defineProperty(exports, "setTag", { enumerable: true, get: function () { return core_1.setTag; } });
Object.defineProperty(exports, "setTags", { enumerable: true, get: function () { return core_1.setTags; } });
Object.defineProperty(exports, "startTransaction", { enumerable: true, get: function () { return core_1.startTransaction; } });
Object.defineProperty(exports, "Hub", { enumerable: true, get: function () { return core_1.Hub; } });
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return core_1.Scope; } });
var browser_1 = require("@sentry/browser");
Object.defineProperty(exports, "BrowserIntegrations", { enumerable: true, get: function () { return browser_1.Integrations; } });
var backend_1 = require("./backend");
Object.defineProperty(exports, "CordovaBackend", { enumerable: true, get: function () { return backend_1.CordovaBackend; } });
var client_1 = require("./client");
Object.defineProperty(exports, "CordovaClient", { enumerable: true, get: function () { return client_1.CordovaClient; } });
var sdk_1 = require("./sdk");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return sdk_1.init; } });
Object.defineProperty(exports, "nativeCrash", { enumerable: true, get: function () { return sdk_1.nativeCrash; } });
var version_1 = require("./version");
Object.defineProperty(exports, "SDK_NAME", { enumerable: true, get: function () { return version_1.SDK_NAME; } });
Object.defineProperty(exports, "SDK_VERSION", { enumerable: true, get: function () { return version_1.SDK_VERSION; } });
var Integrations = require("./integrations");
exports.Integrations = Integrations;
var SentryIonicErrorHandler_1 = require("./Ionic/SentryIonicErrorHandler");
Object.defineProperty(exports, "withSentryIonicErrorHandler", { enumerable: true, get: function () { return SentryIonicErrorHandler_1.withSentryIonicErrorHandler; } });
//# sourceMappingURL=sentry-cordova.js.map