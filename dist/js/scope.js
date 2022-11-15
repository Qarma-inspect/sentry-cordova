Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaScope = void 0;
var tslib_1 = require("tslib");
var hub_1 = require("@sentry/hub");
var wrapper_1 = require("./wrapper");
/**
 * Extends the scope methods to set scope on the Native SDKs
 */
var CordovaScope = /** @class */ (function (_super) {
    tslib_1.__extends(CordovaScope, _super);
    function CordovaScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setUser = function (user) {
        wrapper_1.NATIVE.setUser(user);
        return _super.prototype.setUser.call(this, user);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setTag = function (key, value) {
        wrapper_1.NATIVE.setTag(key, value);
        return _super.prototype.setTag.call(this, key, value);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setTags = function (tags) {
        // As native only has setTag, we just loop through each tag key.
        Object.keys(tags).forEach(function (key) {
            wrapper_1.NATIVE.setTag(key, tags[key]);
        });
        return _super.prototype.setTags.call(this, tags);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setExtras = function (extras) {
        Object.keys(extras).forEach(function (key) {
            wrapper_1.NATIVE.setExtra(key, extras[key]);
        });
        return _super.prototype.setExtras.call(this, extras);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setExtra = function (key, extra) {
        wrapper_1.NATIVE.setExtra(key, extra);
        return _super.prototype.setExtra.call(this, key, extra);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
        wrapper_1.NATIVE.addBreadcrumb(breadcrumb);
        return _super.prototype.addBreadcrumb.call(this, breadcrumb, maxBreadcrumbs);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.clearBreadcrumbs = function () {
        wrapper_1.NATIVE.clearBreadcrumbs();
        return _super.prototype.clearBreadcrumbs.call(this);
    };
    /**
     * @inheritDoc
     */
    CordovaScope.prototype.setContext = function (key, context) {
        wrapper_1.NATIVE.setContext(key, context);
        return _super.prototype.setContext.call(this, key, context);
    };
    return CordovaScope;
}(hub_1.Scope));
exports.CordovaScope = CordovaScope;
//# sourceMappingURL=scope.js.map