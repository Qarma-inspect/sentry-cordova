Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeData = exports.normalizeUrl = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var PATH_STRIP_RE = /^.*\/[^.]+(\.app|CodePush|.*(?=\/))/;
/**
 *  Normalize url in stacktrace
 */
function normalizeUrl(url, pathStripRe) {
    return "app://" + url.replace(/^file:\/\//, '').replace(pathStripRe, '');
}
exports.normalizeUrl = normalizeUrl;
/**
 * Normalizes the stacktrace
 * @param data
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function normalizeData(data) {
    if (data.culprit) {
        data.culprit = normalizeUrl(data.culprit, PATH_STRIP_RE);
    }
    var stacktrace = data.stacktrace || (data.exception && data.exception.values && data.exception.values[0].stacktrace);
    if (stacktrace) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stacktrace.frames.forEach(function (frame) {
            if (frame.filename !== '[native code]' && frame.filename !== '<anonymous>') {
                frame.filename = normalizeUrl(frame.filename, PATH_STRIP_RE);
            }
        });
    }
    return data;
}
exports.normalizeData = normalizeData;
//# sourceMappingURL=normalize.js.map