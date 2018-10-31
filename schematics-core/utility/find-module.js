(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/find-module", ["require", "exports", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var core_1 = require("@angular-devkit/core");
    /**
     * Find the module referred by a set of options passed to the schematics.
     */
    function findModuleFromOptions(host, options) {
        if (options.hasOwnProperty('skipImport') && options.skipImport) {
            return undefined;
        }
        if (!options.module) {
            var pathToCheck = (options.path || '') +
                (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
            return core_1.normalize(findModule(host, pathToCheck));
        }
        else {
            var modulePath = core_1.normalize('/' + options.path + '/' + options.module);
            var moduleBaseName = core_1.normalize(modulePath)
                .split('/')
                .pop();
            if (host.exists(modulePath)) {
                return core_1.normalize(modulePath);
            }
            else if (host.exists(modulePath + '.ts')) {
                return core_1.normalize(modulePath + '.ts');
            }
            else if (host.exists(modulePath + '.module.ts')) {
                return core_1.normalize(modulePath + '.module.ts');
            }
            else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
                return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
            }
            else {
                throw new Error("Specified module path " + modulePath + " does not exist");
            }
        }
    }
    exports.findModuleFromOptions = findModuleFromOptions;
    /**
     * Function to find the "closest" module to a generated file's path.
     */
    function findModule(host, generateDir) {
        var dir = host.getDir('/' + generateDir);
        var moduleRe = /\.module\.ts$/;
        var routingModuleRe = /-routing\.module\.ts/;
        while (dir) {
            var matches = dir.subfiles.filter(function (p) { return moduleRe.test(p) && !routingModuleRe.test(p); });
            if (matches.length == 1) {
                return core_1.join(dir.path, matches[0]);
            }
            else if (matches.length > 1) {
                throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                    'the component into the closest module.');
            }
            dir = dir.parent;
        }
        throw new Error('Could not find an NgModule. Use the skip-import ' +
            'option to skip importing in NgModule.');
    }
    exports.findModule = findModule;
    /**
     * Build a relative path from one file path to another file path.
     */
    function buildRelativePath(from, to) {
        var _a = parsePath(from), fromPath = _a.path, fromFileName = _a.filename, fromDirectory = _a.directory;
        var _b = parsePath(to), toPath = _b.path, toFileName = _b.filename, toDirectory = _b.directory;
        var relativePath = core_1.relative(fromDirectory, toDirectory);
        var fixedRelativePath = relativePath.startsWith('.')
            ? relativePath
            : "./" + relativePath;
        return !toFileName || toFileName === 'index.ts'
            ? fixedRelativePath
            : "" + (fixedRelativePath.endsWith('/')
                ? fixedRelativePath
                : fixedRelativePath + '/') + convertToTypeScriptFileName(toFileName);
    }
    exports.buildRelativePath = buildRelativePath;
    function parsePath(path) {
        var pathNormalized = core_1.normalize(path);
        var filename = core_1.extname(pathNormalized) ? core_1.basename(pathNormalized) : '';
        var directory = filename ? core_1.dirname(pathNormalized) : pathNormalized;
        return {
            path: pathNormalized,
            filename: filename,
            directory: directory,
        };
    }
    /**
     * Strips the typescript extension and clears index filenames
     * foo.ts -> foo
     * index.ts -> empty
     */
    function convertToTypeScriptFileName(filename) {
        return filename ? filename.replace(/(\.ts)|(index\.ts)$/, '') : '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9maW5kLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDZDQVM4QjtJQVc5Qjs7T0FFRztJQUNILFNBQWdCLHFCQUFxQixDQUNuQyxJQUFVLEVBQ1YsT0FBc0I7UUFFdEIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDOUQsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFNLFdBQVcsR0FDZixDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNwQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLGNBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFOUQsT0FBTyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQU0sY0FBYyxHQUFHLGdCQUFTLENBQUMsVUFBVSxDQUFDO2lCQUN6QyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsRUFBRSxDQUFDO1lBRVQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLGdCQUFTLENBQUMsVUFBVSxDQUFDLENB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QUFTLENBQUM7UUFDL0MsSUFBTSxRQUFRLEdBQUcsY0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN6RSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ3RFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRLFVBQUE7WUFDUixTQUFTLFdBQUE7U0FDVixDQUFDO0lBQ0osQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxTQUFTLDJCQUEyQixDQUFDLFFBQTRCO1FBQy9ELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDckUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIFBhdGgsXG4gIGpvaW4sXG4gIG5vcm1hbGl6ZSxcbiAgcmVsYXRpdmUsXG4gIHN0cmluZ3MsXG4gIGJhc2VuYW1lLFxuICBleHRuYW1lLFxuICBkaXJuYW1lLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBEaXJFbnRyeSwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVPcHRpb25zIHtcbiAgbW9kdWxlPzogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGZsYXQ/OiBib29sZWFuO1xuICBwYXRoPzogc3RyaW5nO1xuICBza2lwSW1wb3J0PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBtb2R1bGUgcmVmZXJyZWQgYnkgYSBzZXQgb2Ygb3B0aW9ucyBwYXNzZWQgdG8gdGhlIHNjaGVtYXRpY3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoXG4gIGhvc3Q6IFRyZWUsXG4gIG9wdGlvbnM6IE1vZHVsZU9wdGlvbnNcbik6IFBhdGggfCB1bmRlZmluZWQge1xuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2tpcEltcG9ydCcpICYmIG9wdGlvbnMuc2tpcEltcG9ydCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMubW9kdWxlKSB7XG4gICAgY29uc3QgcGF0aFRvQ2hlY2sgPVxuICAgICAgKG9wdGlvbnMucGF0aCB8fCAnJykgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogJy8nICsgc3RyaW5ncy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplKGZpbmRNb2R1bGUoaG9zdCwgcGF0aFRvQ2hlY2spKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gbm9ybWFsaXplKCcvJyArIG9wdGlvbnMucGF0aCArICcvJyArIG9wdGlvbnMubW9kdWxlKTtcbiAgICBjb25zdCBtb2R1bGVCYXNlTmFtZSA9IG5vcm1hbGl6ZShtb2R1bGVQYXRoKVxuICAgICAgLnNwbGl0KCcvJylcbiAgICAgIC5wb3AoKTtcblxuICAgIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCArICcudHMnKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCBtb2R1bGUgcGF0aCAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gZmluZCB0aGUgXCJjbG9zZXN0XCIgbW9kdWxlIHRvIGEgZ2VuZXJhdGVkIGZpbGUncyBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZShob3N0OiBUcmVlLCBnZW5lcmF0ZURpcjogc3RyaW5nKTogUGF0aCB7XG4gIGxldCBkaXI6IERpckVudHJ5IHwgbnVsbCA9IGhvc3QuZ2V0RGlyKCcvJyArIGdlbmVyYXRlRGlyKTtcblxuICBjb25zdCBtb2R1bGVSZSA9IC9cXC5tb2R1bGVcXC50cyQvO1xuICBjb25zdCByb3V0aW5nTW9kdWxlUmUgPSAvLXJvdXRpbmdcXC5tb2R1bGVcXC50cy87XG5cbiAgd2hpbGUgKGRpcikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBkaXIuc3ViZmlsZXMuZmlsdGVyKFxuICAgICAgcCA9PiBtb2R1bGVSZS50ZXN0KHApICYmICFyb3V0aW5nTW9kdWxlUmUudGVzdChwKVxuICAgICk7XG5cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgcmV0dXJuIGpvaW4oZGlyLnBhdGgsIG1hdGNoZXNbMF0pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNb3JlIHRoYW4gb25lIG1vZHVsZSBtYXRjaGVzLiBVc2Ugc2tpcC1pbXBvcnQgb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nICcgK1xuICAgICAgICAgICd0aGUgY29tcG9uZW50IGludG8gdGhlIGNsb3Nlc3QgbW9kdWxlLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGlyID0gZGlyLnBhcmVudDtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnQ291bGQgbm90IGZpbmQgYW4gTmdNb2R1bGUuIFVzZSB0aGUgc2tpcC1pbXBvcnQgJyArXG4gICAgICAnb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nIGluIE5nTW9kdWxlLidcbiAgKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIHJlbGF0aXZlIHBhdGggZnJvbSBvbmUgZmlsZSBwYXRoIHRvIGFub3RoZXIgZmlsZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZWxhdGl2ZVBhdGgoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3Qge1xuICAgIHBhdGg6IGZyb21QYXRoLFxuICAgIGZpbGVuYW1lOiBmcm9tRmlsZU5hbWUsXG4gICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICB9ID0gcGFyc2VQYXRoKGZyb20pO1xuICBjb25zdCB7XG4gICAgcGF0aDogdG9QYXRoLFxuICAgIGZpbGVuYW1lOiB0b0ZpbGVOYW1lLFxuICAgIGRpcmVjdG9yeTogdG9EaXJlY3RvcnksXG4gIH0gPSBwYXJzZVBhdGgodG8pO1xuICBjb25zdCByZWxhdGl2ZVBhdGggPSByZWxhdGl2ZShmcm9tRGlyZWN0b3J5LCB0b0RpcmVjdG9yeSk7XG4gIGNvbnN0IGZpeGVkUmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy4nKVxuICAgID8gcmVsYXRpdmVQYXRoXG4gICAgOiBgLi8ke3JlbGF0aXZlUGF0aH1gO1xuXG4gIHJldHVybiAhdG9GaWxlTmFtZSB8fCB0b0ZpbGVOYW1lID09PSAnaW5kZXgudHMnXG4gICAgPyBmaXhlZFJlbGF0aXZlUGF0aFxuICAgIDogYCR7XG4gICAgICAgIGZpeGVkUmVsYXRpdmVQYXRoLmVuZHNXaXRoKCcvJylcbiAgICAgICAgICA/IGZpeGVkUmVsYXRpdmVQYXRoXG4gICAgICAgICAgOiBmaXhlZFJlbGF0aXZlUGF0aCArICcvJ1xuICAgICAgfSR7Y29udmVydFRvVHlwZVNjcmlwdEZpbGVOYW1lKHRvRmlsZU5hbWUpfWA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGF0aE5vcm1hbGl6ZWQgPSBub3JtYWxpemUocGF0aCkgYXMgUGF0aDtcbiAgY29uc3QgZmlsZW5hbWUgPSBleHRuYW1lKHBhdGhOb3JtYWxpemVkKSA/IGJhc2VuYW1lKHBhdGhOb3JtYWxpemVkKSA6ICcnO1xuICBjb25zdCBkaXJlY3RvcnkgPSBmaWxlbmFtZSA/IGRpcm5hbWUocGF0aE5vcm1hbGl6ZWQpIDogcGF0aE5vcm1hbGl6ZWQ7XG4gIHJldHVybiB7XG4gICAgcGF0aDogcGF0aE5vcm1hbGl6ZWQsXG4gICAgZmlsZW5hbWUsXG4gICAgZGlyZWN0b3J5LFxuICB9O1xufVxuLyoqXG4gKiBTdHJpcHMgdGhlIHR5cGVzY3JpcHQgZXh0ZW5zaW9uIGFuZCBjbGVhcnMgaW5kZXggZmlsZW5hbWVzXG4gKiBmb28udHMgLT4gZm9vXG4gKiBpbmRleC50cyAtPiBlbXB0eVxuICovXG5mdW5jdGlvbiBjb252ZXJ0VG9UeXBlU2NyaXB0RmlsZU5hbWUoZmlsZW5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICByZXR1cm4gZmlsZW5hbWUgPyBmaWxlbmFtZS5yZXBsYWNlKC8oXFwudHMpfChpbmRleFxcLnRzKSQvLCAnJykgOiAnJztcbn1cbiJdfQ==