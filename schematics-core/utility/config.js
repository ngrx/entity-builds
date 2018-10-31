(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/config", ["require", "exports", "@angular-devkit/schematics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    function getWorkspacePath(host) {
        var possibleFiles = ['/angular.json', '/.angular.json'];
        var path = possibleFiles.filter(function (path) { return host.exists(path); })[0];
        return path;
    }
    exports.getWorkspacePath = getWorkspacePath;
    function getWorkspace(host) {
        var path = getWorkspacePath(host);
        var configBuffer = host.read(path);
        if (configBuffer === null) {
            throw new schematics_1.SchematicsException("Could not find (" + path + ")");
        }
        var config = configBuffer.toString();
        return JSON.parse(config);
    }
    exports.getWorkspace = getWorkspace;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEseURBQXVFO0lBa0l2RSxTQUFnQixnQkFBZ0IsQ0FBQyxJQUFVO1FBQ3pDLElBQU0sYUFBYSxHQUFHLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsSUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFMRCw0Q0FLQztJQUVELFNBQWdCLFlBQVksQ0FBQyxJQUFVO1FBQ3JDLElBQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxxQkFBbUIsSUFBSSxNQUFHLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQVRELG9DQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGV4cGVyaW1lbnRhbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuLy8gVGhlIGludGVyZmFjZXMgYmVsb3cgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBBbmd1bGFyIENMSSBjb25maWd1cmF0aW9uIHNjaGVtYVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvYmxvYi9tYXN0ZXIvcGFja2FnZXMvQGFuZ3VsYXIvY2xpL2xpYi9jb25maWcvc2NoZW1hLmpzb25cbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ29uZmlnIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGFwcC5cbiAgICovXG4gIG5hbWU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEaXJlY3Rvcnkgd2hlcmUgYXBwIGZpbGVzIGFyZSBwbGFjZWQuXG4gICAqL1xuICBhcHBSb290Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoZSBhcHAuXG4gICAqL1xuICByb290Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG91dHB1dCBkaXJlY3RvcnkgZm9yIGJ1aWxkIHJlc3VsdHMuXG4gICAqL1xuICBvdXREaXI/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIGFwcGxpY2F0aW9uIGFzc2V0cy5cbiAgICovXG4gIGFzc2V0cz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBhdHRlcm4gdG8gbWF0Y2guXG4gICAgICAgICAqL1xuICAgICAgICBnbG9iPzogc3RyaW5nO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpciB0byBzZWFyY2ggd2l0aGluLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5wdXQ/OiBzdHJpbmc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0cHV0IHBhdGggKHJlbGF0aXZlIHRvIHRoZSBvdXREaXIpLlxuICAgICAgICAgKi9cbiAgICAgICAgb3V0cHV0Pzogc3RyaW5nO1xuICAgICAgfSlbXTtcbiAgLyoqXG4gICAqIFVSTCB3aGVyZSBmaWxlcyB3aWxsIGJlIGRlcGxveWVkLlxuICAgKi9cbiAgZGVwbG95VXJsPzogc3RyaW5nO1xuICAvKipcbiAgICogQmFzZSB1cmwgZm9yIHRoZSBhcHBsaWNhdGlvbiBiZWluZyBidWlsdC5cbiAgICovXG4gIGJhc2VIcmVmPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHJ1bnRpbWUgcGxhdGZvcm0gb2YgdGhlIGFwcC5cbiAgICovXG4gIHBsYXRmb3JtPzogJ2Jyb3dzZXInIHwgJ3NlcnZlcic7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgc3RhcnQgSFRNTCBmaWxlLlxuICAgKi9cbiAgaW5kZXg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbWFpbiBlbnRyeS1wb2ludCBmaWxlLlxuICAgKi9cbiAgbWFpbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwb2x5ZmlsbHMgZmlsZS5cbiAgICovXG4gIHBvbHlmaWxscz86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSB0ZXN0IGVudHJ5LXBvaW50IGZpbGUuXG4gICAqL1xuICB0ZXN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFR5cGVTY3JpcHQgY29uZmlndXJhdGlvbiBmaWxlLlxuICAgKi9cbiAgdHNjb25maWc/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgVHlwZVNjcmlwdCBjb25maWd1cmF0aW9uIGZpbGUgZm9yIHVuaXQgdGVzdHMuXG4gICAqL1xuICB0ZXN0VHNjb25maWc/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcHJlZml4IHRvIGFwcGx5IHRvIGdlbmVyYXRlZCBzZWxlY3RvcnMuXG4gICAqL1xuICBwcmVmaXg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFeHBlcmltZW50YWwgc3VwcG9ydCBmb3IgYSBzZXJ2aWNlIHdvcmtlciBmcm9tIEBhbmd1bGFyL3NlcnZpY2Utd29ya2VyLlxuICAgKi9cbiAgc2VydmljZVdvcmtlcj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBHbG9iYWwgc3R5bGVzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICovXG4gIHN0eWxlcz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBpbnB1dD86IHN0cmluZztcbiAgICAgICAgW25hbWU6IHN0cmluZ106IGFueTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgICAgIH0pW107XG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIHBhc3MgdG8gc3R5bGUgcHJlcHJvY2Vzc29yc1xuICAgKi9cbiAgc3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIFBhdGhzIHRvIGluY2x1ZGUuIFBhdGhzIHdpbGwgYmUgcmVzb2x2ZWQgdG8gcHJvamVjdCByb290LlxuICAgICAqL1xuICAgIGluY2x1ZGVQYXRocz86IHN0cmluZ1tdO1xuICB9O1xuICAvKipcbiAgICogR2xvYmFsIHNjcmlwdHMgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKi9cbiAgc2NyaXB0cz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBpbnB1dDogc3RyaW5nO1xuICAgICAgICBbbmFtZTogc3RyaW5nXTogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgfSlbXTtcbiAgLyoqXG4gICAqIFNvdXJjZSBmaWxlIGZvciBlbnZpcm9ubWVudCBjb25maWcuXG4gICAqL1xuICBlbnZpcm9ubWVudFNvdXJjZT86IHN0cmluZztcbiAgLyoqXG4gICAqIE5hbWUgYW5kIGNvcnJlc3BvbmRpbmcgZmlsZSBmb3IgZW52aXJvbm1lbnQgY29uZmlnLlxuICAgKi9cbiAgZW52aXJvbm1lbnRzPzoge1xuICAgIFtuYW1lOiBzdHJpbmddOiBhbnk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gIH07XG4gIGFwcFNoZWxsPzoge1xuICAgIGFwcDogc3RyaW5nO1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFdvcmtzcGFjZVNjaGVtYSA9IGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlU2NoZW1hO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ya3NwYWNlUGF0aChob3N0OiBUcmVlKTogc3RyaW5nIHtcbiAgY29uc3QgcG9zc2libGVGaWxlcyA9IFsnL2FuZ3VsYXIuanNvbicsICcvLmFuZ3VsYXIuanNvbiddO1xuICBjb25zdCBwYXRoID0gcG9zc2libGVGaWxlcy5maWx0ZXIocGF0aCA9PiBob3N0LmV4aXN0cyhwYXRoKSlbMF07XG5cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3Jrc3BhY2UoaG9zdDogVHJlZSk6IFdvcmtzcGFjZVNjaGVtYSB7XG4gIGNvbnN0IHBhdGggPSBnZXRXb3Jrc3BhY2VQYXRoKGhvc3QpO1xuICBjb25zdCBjb25maWdCdWZmZXIgPSBob3N0LnJlYWQocGF0aCk7XG4gIGlmIChjb25maWdCdWZmZXIgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgQ291bGQgbm90IGZpbmQgKCR7cGF0aH0pYCk7XG4gIH1cbiAgY29uc3QgY29uZmlnID0gY29uZmlnQnVmZmVyLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIEpTT04ucGFyc2UoY29uZmlnKTtcbn1cbiJdfQ==