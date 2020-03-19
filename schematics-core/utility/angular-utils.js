(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/angular-utils", ["require", "exports", "@angular-devkit/core", "@ngrx/entity/schematics-core/utility/json-utilts"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@angular-devkit/core");
    const json_utilts_1 = require("@ngrx/entity/schematics-core/utility/json-utilts");
    // https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/migrations/update-9/utils.ts
    function isIvyEnabled(tree, tsConfigPath) {
        // In version 9, Ivy is turned on by default
        // Ivy is opted out only when 'enableIvy' is set to false.
        const buffer = tree.read(tsConfigPath);
        if (!buffer) {
            return true;
        }
        const tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
        if (tsCfgAst.kind !== 'object') {
            return true;
        }
        const ngCompilerOptions = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'angularCompilerOptions');
        if (ngCompilerOptions && ngCompilerOptions.kind === 'object') {
            const enableIvy = json_utilts_1.findPropertyInAstObject(ngCompilerOptions, 'enableIvy');
            if (enableIvy) {
                return !!enableIvy.value;
            }
        }
        const configExtends = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'extends');
        if (configExtends && configExtends.kind === 'string') {
            const extendedTsConfigPath = core_1.resolve(core_1.dirname(core_1.normalize(tsConfigPath)), core_1.normalize(configExtends.value));
            return isIvyEnabled(tree, extendedTsConfigPath);
        }
        return true;
    }
    exports.isIvyEnabled = isIvyEnabled;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2FuZ3VsYXItdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwrQ0FNOEI7SUFFOUIsa0ZBQXdEO0lBRXhELDhHQUE4RztJQUM5RyxTQUFnQixZQUFZLENBQUMsSUFBVSxFQUFFLFlBQW9CO1FBQzNELDRDQUE0QztRQUM1QywwREFBMEQ7UUFFMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sUUFBUSxHQUFHLG1CQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLG9CQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEUsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxpQkFBaUIsR0FBRyxxQ0FBdUIsQ0FDL0MsUUFBUSxFQUNSLHdCQUF3QixDQUN6QixDQUFDO1FBQ0YsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVELE1BQU0sU0FBUyxHQUFHLHFDQUF1QixDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRTFFLElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDMUI7U0FDRjtRQUVELE1BQU0sYUFBYSxHQUFHLHFDQUF1QixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNwRCxNQUFNLG9CQUFvQixHQUFHLGNBQU8sQ0FDbEMsY0FBTyxDQUFDLGdCQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDaEMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQy9CLENBQUM7WUFFRixPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQXRDRCxvQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBKc29uUGFyc2VNb2RlLFxuICBkaXJuYW1lLFxuICBub3JtYWxpemUsXG4gIHBhcnNlSnNvbkFzdCxcbiAgcmVzb2x2ZSxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0IH0gZnJvbSAnLi9qc29uLXV0aWx0cyc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9taWdyYXRpb25zL3VwZGF0ZS05L3V0aWxzLnRzXG5leHBvcnQgZnVuY3Rpb24gaXNJdnlFbmFibGVkKHRyZWU6IFRyZWUsIHRzQ29uZmlnUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIEluIHZlcnNpb24gOSwgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0XG4gIC8vIEl2eSBpcyBvcHRlZCBvdXQgb25seSB3aGVuICdlbmFibGVJdnknIGlzIHNldCB0byBmYWxzZS5cblxuICBjb25zdCBidWZmZXIgPSB0cmVlLnJlYWQodHNDb25maWdQYXRoKTtcbiAgaWYgKCFidWZmZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHRzQ2ZnQXN0ID0gcGFyc2VKc29uQXN0KGJ1ZmZlci50b1N0cmluZygpLCBKc29uUGFyc2VNb2RlLkxvb3NlKTtcblxuICBpZiAodHNDZmdBc3Qua2luZCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IG5nQ29tcGlsZXJPcHRpb25zID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QoXG4gICAgdHNDZmdBc3QsXG4gICAgJ2FuZ3VsYXJDb21waWxlck9wdGlvbnMnXG4gICk7XG4gIGlmIChuZ0NvbXBpbGVyT3B0aW9ucyAmJiBuZ0NvbXBpbGVyT3B0aW9ucy5raW5kID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IGVuYWJsZUl2eSA9IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KG5nQ29tcGlsZXJPcHRpb25zLCAnZW5hYmxlSXZ5Jyk7XG5cbiAgICBpZiAoZW5hYmxlSXZ5KSB7XG4gICAgICByZXR1cm4gISFlbmFibGVJdnkudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlnRXh0ZW5kcyA9IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KHRzQ2ZnQXN0LCAnZXh0ZW5kcycpO1xuICBpZiAoY29uZmlnRXh0ZW5kcyAmJiBjb25maWdFeHRlbmRzLmtpbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZXh0ZW5kZWRUc0NvbmZpZ1BhdGggPSByZXNvbHZlKFxuICAgICAgZGlybmFtZShub3JtYWxpemUodHNDb25maWdQYXRoKSksXG4gICAgICBub3JtYWxpemUoY29uZmlnRXh0ZW5kcy52YWx1ZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIGlzSXZ5RW5hYmxlZCh0cmVlLCBleHRlbmRlZFRzQ29uZmlnUGF0aCk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==