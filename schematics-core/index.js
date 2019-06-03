(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core", ["require", "exports", "@ngrx/entity/schematics-core/utility/strings", "@ngrx/entity/schematics-core/utility/ast-utils", "@ngrx/entity/schematics-core/utility/change", "@ngrx/entity/schematics-core/utility/config", "@ngrx/entity/schematics-core/utility/find-module", "@ngrx/entity/schematics-core/utility/ngrx-utils", "@ngrx/entity/schematics-core/utility/project", "@ngrx/entity/schematics-core/utility/update", "@ngrx/entity/schematics-core/utility/parse-name", "@ngrx/entity/schematics-core/utility/package", "@ngrx/entity/schematics-core/utility/libs-version", "@ngrx/entity/schematics-core/utility/visit-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const strings_1 = require("@ngrx/entity/schematics-core/utility/strings");
    var ast_utils_1 = require("@ngrx/entity/schematics-core/utility/ast-utils");
    exports.findNodes = ast_utils_1.findNodes;
    exports.getSourceNodes = ast_utils_1.getSourceNodes;
    exports.getDecoratorMetadata = ast_utils_1.getDecoratorMetadata;
    exports.getContentOfKeyLiteral = ast_utils_1.getContentOfKeyLiteral;
    exports.insertAfterLastOccurrence = ast_utils_1.insertAfterLastOccurrence;
    exports.insertImport = ast_utils_1.insertImport;
    exports.addBootstrapToModule = ast_utils_1.addBootstrapToModule;
    exports.addDeclarationToModule = ast_utils_1.addDeclarationToModule;
    exports.addExportToModule = ast_utils_1.addExportToModule;
    exports.addImportToModule = ast_utils_1.addImportToModule;
    exports.addProviderToModule = ast_utils_1.addProviderToModule;
    exports.replaceImport = ast_utils_1.replaceImport;
    var change_1 = require("@ngrx/entity/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    exports.createReplaceChange = change_1.createReplaceChange;
    exports.createChangeRecorder = change_1.createChangeRecorder;
    var config_1 = require("@ngrx/entity/schematics-core/utility/config");
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/entity/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var ngrx_utils_1 = require("@ngrx/entity/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/entity/schematics-core/utility/project");
    exports.getProjectPath = project_1.getProjectPath;
    exports.getProject = project_1.getProject;
    exports.isLib = project_1.isLib;
    exports.stringUtils = {
        dasherize: strings_1.dasherize,
        decamelize: strings_1.decamelize,
        camelize: strings_1.camelize,
        classify: strings_1.classify,
        underscore: strings_1.underscore,
        group: strings_1.group,
        capitalize: strings_1.capitalize,
        featurePath: strings_1.featurePath,
    };
    var update_1 = require("@ngrx/entity/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/entity/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/entity/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/entity/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
    var visit_utils_1 = require("@ngrx/entity/schematics-core/utility/visit-utils");
    exports.visitTSSourceFiles = visit_utils_1.visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwwRUFTMkI7SUFFM0IsNEVBYTZCO0lBWjNCLGdDQUFBLFNBQVMsQ0FBQTtJQUNULHFDQUFBLGNBQWMsQ0FBQTtJQUNkLDJDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLDZDQUFBLHNCQUFzQixDQUFBO0lBQ3RCLGdEQUFBLHlCQUF5QixDQUFBO0lBQ3pCLG1DQUFBLFlBQVksQ0FBQTtJQUNaLDJDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLDZDQUFBLHNCQUFzQixDQUFBO0lBQ3RCLHdDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLHdDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLDBDQUFBLG1CQUFtQixDQUFBO0lBQ25CLG9DQUFBLGFBQWEsQ0FBQTtJQUdmLHNFQVMwQjtJQU54Qiw4QkFBQSxVQUFVLENBQUE7SUFDVixnQ0FBQSxZQUFZLENBQUE7SUFDWixnQ0FBQSxZQUFZLENBQUE7SUFDWixpQ0FBQSxhQUFhLENBQUE7SUFDYix1Q0FBQSxtQkFBbUIsQ0FBQTtJQUNuQix3Q0FBQSxvQkFBb0IsQ0FBQTtJQUd0QixzRUFBNkU7SUFBekQsZ0NBQUEsWUFBWSxDQUFBO0lBQUUsb0NBQUEsZ0JBQWdCLENBQUE7SUFFbEQsZ0ZBSytCO0lBSjdCLG1DQUFBLFVBQVUsQ0FBQTtJQUNWLDhDQUFBLHFCQUFxQixDQUFBO0lBQ3JCLDBDQUFBLGlCQUFpQixDQUFBO0lBSW5CLDhFQU04QjtJQUw1Qix5Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQixrREFBQSwwQkFBMEIsQ0FBQTtJQUMxQixrREFBQSwwQkFBMEIsQ0FBQTtJQUMxQixvREFBQSw0QkFBNEIsQ0FBQTtJQUM1Qiw0QkFBQSxJQUFJLENBQUE7SUFHTix3RUFBc0U7SUFBN0QsbUNBQUEsY0FBYyxDQUFBO0lBQUUsK0JBQUEsVUFBVSxDQUFBO0lBQUUsMEJBQUEsS0FBSyxDQUFBO0lBRTdCLFFBQUEsV0FBVyxHQUFHO1FBQ3pCLFNBQVMsRUFBVCxtQkFBUztRQUNULFVBQVUsRUFBVixvQkFBVTtRQUNWLFFBQVEsRUFBUixrQkFBUTtRQUNSLFFBQVEsRUFBUixrQkFBUTtRQUNSLFVBQVUsRUFBVixvQkFBVTtRQUNWLEtBQUssRUFBTCxlQUFLO1FBQ0wsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsV0FBVyxFQUFYLHFCQUFXO0tBQ1osQ0FBQztJQUVGLHNFQUFpRDtJQUF4QyxpQ0FBQSxhQUFhLENBQUE7SUFFdEIsOEVBQWlEO0lBQXhDLGlDQUFBLFNBQVMsQ0FBQTtJQUVsQix3RUFBNEQ7SUFBbkQsNENBQUEsdUJBQXVCLENBQUE7SUFFaEMsa0ZBQXlEO0lBQWhELHlDQUFBLGVBQWUsQ0FBQTtJQUV4QixnRkFBMkQ7SUFBbEQsMkNBQUEsa0JBQWtCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBkYXNoZXJpemUsXG4gIGRlY2FtZWxpemUsXG4gIGNhbWVsaXplLFxuICBjbGFzc2lmeSxcbiAgdW5kZXJzY29yZSxcbiAgZ3JvdXAsXG4gIGNhcGl0YWxpemUsXG4gIGZlYXR1cmVQYXRoLFxufSBmcm9tICcuL3V0aWxpdHkvc3RyaW5ncyc7XG5cbmV4cG9ydCB7XG4gIGZpbmROb2RlcyxcbiAgZ2V0U291cmNlTm9kZXMsXG4gIGdldERlY29yYXRvck1ldGFkYXRhLFxuICBnZXRDb250ZW50T2ZLZXlMaXRlcmFsLFxuICBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlLFxuICBpbnNlcnRJbXBvcnQsXG4gIGFkZEJvb3RzdHJhcFRvTW9kdWxlLFxuICBhZGREZWNsYXJhdGlvblRvTW9kdWxlLFxuICBhZGRFeHBvcnRUb01vZHVsZSxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIGFkZFByb3ZpZGVyVG9Nb2R1bGUsXG4gIHJlcGxhY2VJbXBvcnQsXG59IGZyb20gJy4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuXG5leHBvcnQge1xuICBIb3N0LFxuICBDaGFuZ2UsXG4gIE5vb3BDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgUmVtb3ZlQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVDaGFuZ2VSZWNvcmRlcixcbn0gZnJvbSAnLi91dGlsaXR5L2NoYW5nZSc7XG5cbmV4cG9ydCB7IEFwcENvbmZpZywgZ2V0V29ya3NwYWNlLCBnZXRXb3Jrc3BhY2VQYXRoIH0gZnJvbSAnLi91dGlsaXR5L2NvbmZpZyc7XG5cbmV4cG9ydCB7XG4gIGZpbmRNb2R1bGUsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIE1vZHVsZU9wdGlvbnMsXG59IGZyb20gJy4vdXRpbGl0eS9maW5kLW1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VyVG9TdGF0ZUludGVyZmFjZSxcbiAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUsXG4gIGFkZFJlZHVjZXJUb0FjdGlvblJlZHVjZXJNYXAsXG4gIG9taXQsXG59IGZyb20gJy4vdXRpbGl0eS9uZ3J4LXV0aWxzJztcblxuZXhwb3J0IHsgZ2V0UHJvamVjdFBhdGgsIGdldFByb2plY3QsIGlzTGliIH0gZnJvbSAnLi91dGlsaXR5L3Byb2plY3QnO1xuXG5leHBvcnQgY29uc3Qgc3RyaW5nVXRpbHMgPSB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG59O1xuXG5leHBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnLi91dGlsaXR5L3VwZGF0ZSc7XG5cbmV4cG9ydCB7IHBhcnNlTmFtZSB9IGZyb20gJy4vdXRpbGl0eS9wYXJzZS1uYW1lJztcblxuZXhwb3J0IHsgYWRkUGFja2FnZVRvUGFja2FnZUpzb24gfSBmcm9tICcuL3V0aWxpdHkvcGFja2FnZSc7XG5cbmV4cG9ydCB7IHBsYXRmb3JtVmVyc2lvbiB9IGZyb20gJy4vdXRpbGl0eS9saWJzLXZlcnNpb24nO1xuXG5leHBvcnQgeyB2aXNpdFRTU291cmNlRmlsZXMgfSBmcm9tICcuL3V0aWxpdHkvdmlzaXQtdXRpbHMnO1xuIl19