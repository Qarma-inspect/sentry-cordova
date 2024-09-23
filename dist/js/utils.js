Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatform = exports.processLevel = exports.serializeObject = void 0;
var types_1 = require("@sentry/types");
var utils_1 = require("@sentry/utils");
var types_2 = require("./types");
/**
 * Serializes all values of root-level keys into strings.
 * @param data key-value map.
 * @returns An object where all root-level values are strings.
 */
exports.serializeObject = function (data) {
    var serialized = {};
    Object.keys(data).forEach(function (dataKey) {
        var value = data[dataKey];
        serialized[dataKey] = typeof value === 'string' ? value : JSON.stringify(value);
    });
    return serialized;
};
/**
 * Convert js severity level which has critical and log to more widely supported levels.
 * @param level
 * @returns More widely supported Severity level strings
 */
exports.processLevel = function (level) {
    if (level === types_1.Severity.Critical) {
        return types_1.Severity.Fatal;
    }
    if (level === types_1.Severity.Log) {
        return types_1.Severity.Debug;
    }
    return level;
};
/**
 * Gets the platform
 * @returns The current platform the SDK is running on, defaults to Browser if unknown.
 */
exports.getPlatform = function () {
    var _a;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _window = utils_1.getGlobalObject();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    var platform = (_a = _window === null || _window === void 0 ? void 0 : _window.cordova) === null || _a === void 0 ? void 0 : _a.platformId;
    if (!platform || !Object.values(types_2.CordovaPlatformType).includes(platform)) {
        // Unsupported platform, default to browser
        platform = types_2.CordovaPlatformType.Browser;
    }
    return platform;
};
//# sourceMappingURL=utils.js.map