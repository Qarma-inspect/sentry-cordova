Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("@sentry/utils");
var types_1 = require("./types");
var utils_2 = require("./utils");
/**
 * Our internal interface for calling native functions
 */
exports.NATIVE = {
    PLUGIN_NAME: 'Sentry',
    SUPPORTS_NATIVE_TRANSPORT: [types_1.CordovaPlatformType.Ios, types_1.CordovaPlatformType.Android],
    SUPPORTS_NATIVE_SCOPE_SYNC: [types_1.CordovaPlatformType.Ios, types_1.CordovaPlatformType.Android],
    SUPPORTS_NATIVE_SDK: [types_1.CordovaPlatformType.Android, types_1.CordovaPlatformType.Ios],
    /**
     * Starts native with the provided options.
     * @param options CordovaOptions
     */
    startWithOptions: function (_options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, beforeSend, beforeBreadcrumb, integrations, defaultIntegrations, transport, filteredOptions;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.SUPPORTS_NATIVE_SDK.includes(utils_2.getPlatform())) {
                    options = tslib_1.__assign({ enableNative: true }, _options);
                    this.enableNative = options.enableNative;
                    if (!options.enableNative) {
                        return [2 /*return*/, false];
                    }
                    if (!options.dsn) {
                        utils_1.logger.warn('Warning: No DSN was provided. The Sentry SDK will be disabled. Native SDK will also not be initialized.');
                        return [2 /*return*/, false];
                    }
                    beforeSend = options.beforeSend, beforeBreadcrumb = options.beforeBreadcrumb, integrations = options.integrations, defaultIntegrations = options.defaultIntegrations, transport = options.transport, filteredOptions = tslib_1.__rest(options, ["beforeSend", "beforeBreadcrumb", "integrations", "defaultIntegrations", "transport"]);
                    /* eslint-enable @typescript-eslint/unbound-method,@typescript-eslint/no-unused-vars */
                    return [2 /*return*/, this._nativeCall('startWithOptions', filteredOptions)
                            .then(function () {
                            _this._nativeInitialized = true;
                            return true;
                        })
                            .catch(function () {
                            _this._nativeInitialized = false;
                            utils_1.logger.warn('Warning: Native SDK was not initialized.');
                            return false;
                        })];
                }
                this._nativeInitialized = false;
                return [2 /*return*/, false];
            });
        });
    },
    /**
     * Sending the event over the bridge to native
     * @param event Event
     */
    sendEvent: function (event) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var header, payload, headerString, payloadString, payloadType, serializedPayload;
            return tslib_1.__generator(this, function (_b) {
                if (!this.isNativeClientAvailable()) {
                    throw this._NativeClientError;
                }
                if (!this.isNativeTransportAvailable()) {
                    throw this._NativeTransportError;
                }
                // Process and convert deprecated levels
                event.level = event.level ? utils_2.processLevel(event.level) : undefined;
                header = {
                    event_id: event.event_id,
                    sdk: event.sdk,
                };
                payload = tslib_1.__assign(tslib_1.__assign({}, event), { message: {
                        message: event.message,
                    } });
                if (utils_2.getPlatform() === types_1.CordovaPlatformType.Android) {
                    headerString = JSON.stringify(header);
                    payloadString = JSON.stringify(payload);
                    payloadType = (_a = payload.type) !== null && _a !== void 0 ? _a : 'event';
                    return [2 /*return*/, this._nativeCall('captureEnvelope', headerString, payloadString, payloadType)];
                }
                serializedPayload = JSON.parse(JSON.stringify(payload));
                // The envelope item is created (and its length determined) on the iOS side of the native bridge.
                return [2 /*return*/, this._nativeCall('captureEnvelope', header, serializedPayload)];
            });
        });
    },
    /**
     * Uses exec to call cordova functions
     * @param action name of the action
     * @param args Arguments
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _nativeCall: function (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this.enableNative) {
                            reject('enableNative = false, using browser transport');
                            return;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var _window = utils_1.getGlobalObject();
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        var exec = _window && _window.Cordova && _window.Cordova.exec;
                        if (!exec) {
                            reject('Cordova.exec not available');
                        }
                        else {
                            try {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                _window.Cordova.exec(resolve, reject, _this.PLUGIN_NAME, action, args);
                            }
                            catch (e) {
                                reject('Cordova.exec not available');
                            }
                        }
                    })];
            });
        });
    },
    /**
     * Sets the user in the native scope.
     * Passing null clears the user.
     * @param key string
     * @param value string
     */
    setUser: function (user) {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        // separate and serialze all non-default user keys.
        var defaultUserKeys = null;
        var otherUserKeys = null;
        if (user) {
            var id = user.id, ip_address = user.ip_address, email = user.email, username = user.username, otherKeys = tslib_1.__rest(user, ["id", "ip_address", "email", "username"]);
            defaultUserKeys = utils_2.serializeObject({
                email: email,
                id: id,
                ip_address: ip_address,
                username: username,
            });
            otherUserKeys = utils_2.serializeObject(otherKeys);
        }
        void this._nativeCall('setUser', defaultUserKeys, otherUserKeys);
    },
    /**
     * Sets a tag in the native module.
     * @param key string
     * @param value string
     */
    setTag: function (key, value) {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        var stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
        void this._nativeCall('setTag', key, stringifiedValue);
    },
    /**
     * Sets an extra in the native scope, will stringify
     * extra value if it isn't already a string.
     * @param key string
     * @param extra any
     */
    setExtra: function (key, extra) {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        // we stringify the extra as native only takes in strings.
        var stringifiedExtra = typeof extra === 'string' ? extra : JSON.stringify(extra);
        void this._nativeCall('setExtra', key, stringifiedExtra);
    },
    /**
     * Adds breadcrumb to the native scope.
     * @param breadcrumb Breadcrumb
     */
    addBreadcrumb: function (breadcrumb) {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void this._nativeCall('addBreadcrumb', tslib_1.__assign(tslib_1.__assign({}, breadcrumb), { 
            // Process and convert deprecated levels
            level: breadcrumb.level ? utils_2.processLevel(breadcrumb.level) : undefined, data: breadcrumb.data ? utils_2.serializeObject(breadcrumb.data) : undefined }));
    },
    /**
     * Clears breadcrumbs on the native scope.
     */
    clearBreadcrumbs: function () {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void this._nativeCall('clearBreadcrumbs');
    },
    /**
     * Sets context on the native scope. Not implemented in Android yet.
     * @param key string
     * @param context key-value map
     */
    setContext: function (key, context) {
        if (!this.isNativeScopeSyncAvailable()) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void this._nativeCall('setContext', key, context !== null ? utils_2.serializeObject(context) : null);
    },
    /**
     * Triggers a native crash.
     * Use this only for testing purposes.
     */
    crash: function () {
        if (!this.enableNative) {
            return;
        }
        if (!this.isNativeClientAvailable()) {
            throw this._NativeClientError;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void this._nativeCall('crash');
    },
    /**
     * Returns whether the native client is available.
     */
    isNativeClientAvailable: function () {
        return this.enableNative && this._nativeInitialized;
    },
    /**
     * Returns whether the native transport is available.
     */
    isNativeTransportAvailable: function () {
        return this.isNativeClientAvailable() && this.SUPPORTS_NATIVE_TRANSPORT.includes(utils_2.getPlatform());
    },
    /**
     * Returns whether native bridge supports scope sync.
     */
    isNativeScopeSyncAvailable: function () {
        return this.isNativeClientAvailable() && this.SUPPORTS_NATIVE_SCOPE_SYNC.includes(utils_2.getPlatform());
    },
    _NativeClientError: new utils_1.SentryError('Native Client is not available.'),
    _NativeTransportError: new utils_1.SentryError('Native Transport is not available.'),
    enableNative: true,
    _nativeInitialized: false,
    /** true if `getPlatform` has been called */
    _didGetPlatform: false,
};
//# sourceMappingURL=wrapper.js.map