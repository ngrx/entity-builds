(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/ngrx-utils", ["require", "exports", "typescript", "@ngrx/entity/schematics-core/utility/strings", "@ngrx/entity/schematics-core/utility/change", "@angular-devkit/schematics", "@angular-devkit/core", "@ngrx/entity/schematics-core/utility/find-module", "@ngrx/entity/schematics-core/utility/ast-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const stringUtils = require("@ngrx/entity/schematics-core/utility/strings");
    const change_1 = require("@ngrx/entity/schematics-core/utility/change");
    const schematics_1 = require("@angular-devkit/schematics");
    const core_1 = require("@angular-devkit/core");
    const find_module_1 = require("@ngrx/entity/schematics-core/utility/find-module");
    const ast_utils_1 = require("@ngrx/entity/schematics-core/utility/ast-utils");
    function addReducerToState(options) {
        return (host) => {
            if (!options.reducers) {
                return host;
            }
            const reducersPath = core_1.normalize(`/${options.path}/${options.reducers}`);
            if (!host.exists(reducersPath)) {
                throw new Error(`Specified reducers path ${reducersPath} does not exist`);
            }
            const text = host.read(reducersPath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${reducersPath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
            const reducerPath = `/${options.path}/` +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            const relativePath = find_module_1.buildRelativePath(reducersPath, reducerPath);
            const reducerImport = ast_utils_1.insertImport(source, reducersPath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
            const stateInterfaceInsert = addReducerToStateInterface(source, reducersPath, options);
            const reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
            const changes = [reducerImport, stateInterfaceInsert, reducerMapInsert];
            const recorder = host.beginUpdate(reducersPath);
            for (const change of changes) {
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    exports.addReducerToState = addReducerToState;
    /**
     * Insert the reducer into the first defined top level interface
     */
    function addReducerToStateInterface(source, reducersPath, options) {
        const stateInterface = source.statements.find(stm => stm.kind === ts.SyntaxKind.InterfaceDeclaration);
        let node = stateInterface;
        if (!node) {
            return new change_1.NoopChange();
        }
        const state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        const keyInsert = state + ': from' + stringUtils.classify(options.name) + '.State;';
        const expr = node;
        let position;
        let toInsert;
        if (expr.members.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${keyInsert}\n`;
        }
        else {
            node = expr.members[expr.members.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            const matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = `${matches[1]}${keyInsert}\n`;
            }
            else {
                toInsert = `\n${keyInsert}`;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToStateInterface = addReducerToStateInterface;
    /**
     * Insert the reducer into the ActionReducerMap
     */
    function addReducerToActionReducerMap(source, reducersPath, options) {
        let initializer;
        const actionReducerMap = source.statements
            .filter(stm => stm.kind === ts.SyntaxKind.VariableStatement)
            .filter((stm) => !!stm.declarationList)
            .map((stm) => {
            const { declarations, } = stm.declarationList;
            const variable = declarations.find((decl) => decl.kind === ts.SyntaxKind.VariableDeclaration);
            const type = variable ? variable.type : {};
            return { initializer: variable.initializer, type };
        })
            .find(({ type }) => type.typeName.text === 'ActionReducerMap');
        if (!actionReducerMap || !actionReducerMap.initializer) {
            return new change_1.NoopChange();
        }
        let node = actionReducerMap.initializer;
        const state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        const keyInsert = state + ': from' + stringUtils.classify(options.name) + '.reducer,';
        const expr = node;
        let position;
        let toInsert;
        if (expr.properties.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${keyInsert}\n`;
        }
        else {
            node = expr.properties[expr.properties.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            const matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = `\n${matches[1]}${keyInsert}`;
            }
            else {
                toInsert = `\n${keyInsert}`;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
    /**
     * Add reducer feature to NgModule
     */
    function addReducerImportToNgModule(options) {
        return (host) => {
            if (!options.module) {
                return host;
            }
            const modulePath = options.module;
            if (!host.exists(options.module)) {
                throw new Error(`Specified module path ${modulePath} does not exist`);
            }
            const text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            const commonImports = [
                ast_utils_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
            ];
            const reducerPath = `/${options.path}/` +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            const relativePath = find_module_1.buildRelativePath(modulePath, reducerPath);
            const reducerImport = ast_utils_1.insertImport(source, modulePath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
            const [storeNgModuleImport] = ast_utils_1.addImportToModule(source, modulePath, `StoreModule.forFeature('${stringUtils.camelize(options.name)}', from${stringUtils.classify(options.name)}.reducer)`, relativePath);
            const changes = [...commonImports, reducerImport, storeNgModuleImport];
            const recorder = host.beginUpdate(modulePath);
            for (const change of changes) {
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    exports.addReducerImportToNgModule = addReducerImportToNgModule;
    function omit(object, keyToRemove) {
        return Object.keys(object)
            .filter(key => key !== keyToRemove)
            .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
    }
    exports.omit = omit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyeC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L25ncngtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsNEVBQXlDO0lBQ3pDLHdFQUE0RDtJQUM1RCwyREFBNkU7SUFDN0UsK0NBQWlEO0lBQ2pELGtGQUFrRDtJQUNsRCw4RUFBOEQ7SUFFOUQsU0FBZ0IsaUJBQWlCLENBQUMsT0FBWTtRQUM1QyxPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsWUFBWSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzNFO1lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxRQUFRLFlBQVksa0JBQWtCLENBQUMsQ0FBQzthQUN2RTtZQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxZQUFZLEVBQ1osVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZ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TyxDQUFDLElBQUksQ0FDYixVQUFVLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ3hELFlBQVksQ0FDYixDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLGFBQWEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUN2RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUM1QixJQUFJLE1BQU0sWUFBWSxxQkFBWSxFQUFFO29CQUNsQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQzthQUNGO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUE3REQsZ0VBNkRDO0lBRUQsU0FBZ0IsSUFBSSxDQUNsQixNQUFTLEVBQ1QsV0FBb0I7UUFFcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFQRCxvQkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi9zdHJpbmdzJztcbmltcG9ydCB7IEluc2VydENoYW5nZSwgQ2hhbmdlLCBOb29wQ2hhbmdlIH0gZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IHsgVHJlZSwgU2NoZW1hdGljc0V4Y2VwdGlvbiwgUnVsZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IGJ1aWxkUmVsYXRpdmVQYXRoIH0gZnJvbSAnLi9maW5kLW1vZHVsZSc7XG5pbXBvcnQgeyBhZGRJbXBvcnRUb01vZHVsZSwgaW5zZXJ0SW1wb3J0IH0gZnJvbSAnLi9hc3QtdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVkdWNlclRvU3RhdGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5yZWR1Y2Vycykge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgcmVkdWNlcnNQYXRoID0gbm9ybWFsaXplKGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5yZWR1Y2Vyc31gKTtcblxuICAgIGlmICghaG9zdC5leGlzdHMocmVkdWNlcnNQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTcGVjaWZpZWQgcmVkdWNlcnMgcGF0aCAke3JlZHVjZXJzUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKHJlZHVjZXJzUGF0aCk7XG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7cmVkdWNlcnNQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICByZWR1Y2Vyc1BhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3QgcmVkdWNlclBhdGggPVxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vYCArXG4gICAgICAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJykgK1xuICAgICAgKG9wdGlvbnMuZ3JvdXAgPyAncmVkdWNlcnMvJyA6ICcnKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLnJlZHVjZXInO1xuXG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgocmVkdWNlcnNQYXRoLCByZWR1Y2VyUGF0aCk7XG4gICAgY29uc3QgcmVkdWNlckltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIHJlZHVjZXJzUGF0aCxcbiAgICAgIGAqIGFzIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSl9YCxcbiAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVJbnRlcmZhY2VJbnNlcnQgPSBhZGRSZWR1Y2VyVG9TdGF0ZUludGVyZmFjZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIHJlZHVjZXJzUGF0aCxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IHJlZHVjZXJNYXBJbnNlcnQgPSBhZGRSZWR1Y2VyVG9BY3Rpb25SZWR1Y2VyTWFwKFxuICAgICAgc291cmNlLFxuICAgICAgcmVkdWNlcnNQYXRoLFxuICAgICAgb3B0aW9uc1xuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gW3JlZHVjZXJJbXBvcnQsIHN0YXRlSW50ZXJmYWNlSW5zZXJ0LCByZWR1Y2VyTWFwSW5zZXJ0XTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUocmVkdWNlcnNQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbi8qKlxuICogSW5zZXJ0IHRoZSByZWR1Y2VyIGludG8gdGhlIGZpcnN0IGRlZmluZWQgdG9wIGxldmVsIGludGVyZmFjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgcmVkdWNlcnNQYXRoOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHsgbmFtZTogc3RyaW5nOyBwbHVyYWw6IGJvb2xlYW4gfVxuKTogQ2hhbmdlIHtcbiAgY29uc3Qgc3RhdGVJbnRlcmZhY2UgPSBzb3VyY2Uuc3RhdGVtZW50cy5maW5kKFxuICAgIHN0bSA9PiBzdG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvblxuICApO1xuICBsZXQgbm9kZSA9IHN0YXRlSW50ZXJmYWNlIGFzIHRzLlN0YXRlbWVudDtcblxuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0gb3B0aW9ucy5wbHVyYWxcbiAgICA/IHN0cmluZ1V0aWxzLnBsdXJhbGl6ZShvcHRpb25zLm5hbWUpXG4gICAgOiBzdHJpbmdVdGlscy5jYW1lbGl6ZShvcHRpb25zLm5hbWUpO1xuXG4gIGNvbnN0IGtleUluc2VydCA9XG4gICAgc3RhdGUgKyAnOiBmcm9tJyArIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSkgKyAnLlN0YXRlOyc7XG4gIGNvbnN0IGV4cHIgPSBub2RlIGFzIGFueTtcbiAgbGV0IHBvc2l0aW9uO1xuICBsZXQgdG9JbnNlcnQ7XG5cbiAgaWYgKGV4cHIubWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgIHRvSW5zZXJ0ID0gYCAgJHtrZXlJbnNlcnR9XFxuYDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gZXhwci5tZW1iZXJzW2V4cHIubWVtYmVycy5sZW5ndGggLSAxXTtcbiAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCkgKyAxO1xuICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHRleHQubWF0Y2goL15cXHI/XFxuKyhcXHMqKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCR7bWF0Y2hlcyFbMV19JHtrZXlJbnNlcnR9XFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9JbnNlcnQgPSBgXFxuJHtrZXlJbnNlcnR9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IEluc2VydENoYW5nZShyZWR1Y2Vyc1BhdGgsIHBvc2l0aW9uLCB0b0luc2VydCk7XG59XG5cbi8qKlxuICogSW5zZXJ0IHRoZSByZWR1Y2VyIGludG8gdGhlIEFjdGlvblJlZHVjZXJNYXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZHVjZXJUb0FjdGlvblJlZHVjZXJNYXAoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgcmVkdWNlcnNQYXRoOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHsgbmFtZTogc3RyaW5nOyBwbHVyYWw6IGJvb2xlYW4gfVxuKTogQ2hhbmdlIHtcbiAgbGV0IGluaXRpYWxpemVyOiBhbnk7XG4gIGNvbnN0IGFjdGlvblJlZHVjZXJNYXA6IGFueSA9IHNvdXJjZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcihzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQpXG4gICAgLmZpbHRlcigoc3RtOiBhbnkpID0+ICEhc3RtLmRlY2xhcmF0aW9uTGlzdClcbiAgICAubWFwKChzdG06IGFueSkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkZWNsYXJhdGlvbnMsXG4gICAgICB9OiB7XG4gICAgICAgIGRlY2xhcmF0aW9uczogdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFtdO1xuICAgICAgfSA9IHN0bS5kZWNsYXJhdGlvbkxpc3Q7XG4gICAgICBjb25zdCB2YXJpYWJsZTogYW55ID0gZGVjbGFyYXRpb25zLmZpbmQoXG4gICAgICAgIChkZWNsOiBhbnkpID0+IGRlY2wua2luZCA9PT0gdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uXG4gICAgICApO1xuICAgICAgY29uc3QgdHlwZSA9IHZhcmlhYmxlID8gdmFyaWFibGUudHlwZSA6IHt9O1xuXG4gICAgICByZXR1cm4geyBpbml0aWFsaXplcjogdmFyaWFibGUuaW5pdGlhbGl6ZXIsIHR5cGUgfTtcbiAgICB9KVxuICAgIC5maW5kKCh7IHR5cGUgfSkgPT4gdHlwZS50eXBlTmFtZS50ZXh0ID09PSAnQWN0aW9uUmVkdWNlck1hcCcpO1xuXG4gIGlmICghYWN0aW9uUmVkdWNlck1hcCB8fCAhYWN0aW9uUmVkdWNlck1hcC5pbml0aWFsaXplcikge1xuICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICB9XG5cbiAgbGV0IG5vZGUgPSBhY3Rpb25SZWR1Y2VyTWFwLmluaXRpYWxpemVyO1xuXG4gIGNvbnN0IHN0YXRlID0gb3B0aW9ucy5wbHVyYWxcbiAgICA/IHN0cmluZ1V0aWxzLnBsdXJhbGl6ZShvcHRpb25zLm5hbWUpXG4gICAgOiBzdHJpbmdVdGlscy5jYW1lbGl6ZShvcHRpb25zLm5hbWUpO1xuXG4gIGNvbnN0IGtleUluc2VydCA9XG4gICAgc3RhdGUgKyAnOiBmcm9tJyArIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSkgKyAnLnJlZHVjZXIsJztcbiAgY29uc3QgZXhwciA9IG5vZGUgYXMgYW55O1xuICBsZXQgcG9zaXRpb247XG4gIGxldCB0b0luc2VydDtcblxuICBpZiAoZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgdG9JbnNlcnQgPSBgICAke2tleUluc2VydH1cXG5gO1xuICB9IGVsc2Uge1xuICAgIG5vZGUgPSBleHByLnByb3BlcnRpZXNbZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKSArIDE7XG4gICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICBjb25zdCBtYXRjaGVzID0gdGV4dC5tYXRjaCgvXlxccj9cXG4rKFxccyopLyk7XG5cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0b0luc2VydCA9IGBcXG4ke21hdGNoZXMhWzFdfSR7a2V5SW5zZXJ0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvSW5zZXJ0ID0gYFxcbiR7a2V5SW5zZXJ0fWA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBJbnNlcnRDaGFuZ2UocmVkdWNlcnNQYXRoLCBwb3NpdGlvbiwgdG9JbnNlcnQpO1xufVxuXG4vKipcbiAqIEFkZCByZWR1Y2VyIGZlYXR1cmUgdG8gTmdNb2R1bGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMubW9kdWxlKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG4gICAgaWYgKCFob3N0LmV4aXN0cyhvcHRpb25zLm1vZHVsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3BlY2lmaWVkIG1vZHVsZSBwYXRoICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbW1vbkltcG9ydHMgPSBbXG4gICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnU3RvcmVNb2R1bGUnLCAnQG5ncngvc3RvcmUnKSxcbiAgICBdO1xuXG4gICAgY29uc3QgcmVkdWNlclBhdGggPVxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vYCArXG4gICAgICAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJykgK1xuICAgICAgKG9wdGlvbnMuZ3JvdXAgPyAncmVkdWNlcnMvJyA6ICcnKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLnJlZHVjZXInO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHJlZHVjZXJQYXRoKTtcbiAgICBjb25zdCByZWR1Y2VySW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGAqIGFzIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSl9YCxcbiAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGNvbnN0IFtzdG9yZU5nTW9kdWxlSW1wb3J0XSA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCcke3N0cmluZ1V0aWxzLmNhbWVsaXplKFxuICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICl9JywgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5uYW1lKX0ucmVkdWNlcilgLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKTtcbiAgICBjb25zdCBjaGFuZ2VzID0gWy4uLmNvbW1vbkltcG9ydHMsIHJlZHVjZXJJbXBvcnQsIHN0b3JlTmdNb2R1bGVJbXBvcnRdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbWl0PFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IGFueSB9PihcbiAgb2JqZWN0OiBULFxuICBrZXlUb1JlbW92ZToga2V5b2YgVFxuKTogUGFydGlhbDxUPiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBrZXlUb1JlbW92ZSlcbiAgICAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9iamVjdFtrZXldIH0pLCB7fSk7XG59XG4iXX0=