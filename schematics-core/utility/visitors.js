(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/visitors", ["require", "exports", "typescript", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const core_1 = require("@angular-devkit/core");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        for (const sourceFile of visit(tree.root)) {
            result = visitor(sourceFile, tree, result);
        }
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
    function visitTemplates(tree, visitor) {
        visitTSSourceFiles(tree, source => {
            visitComponents(source, (_, decoratorExpressionNode) => {
                ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                    if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) {
                        if (n.name.text === 'template' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            // Need to add an offset of one to the start because the template quotes are
                            // not part of the template content.
                            const templateStartIdx = n.initializer.getStart() + 1;
                            visitor({
                                fileName: source.fileName,
                                content: n.initializer.text,
                                inline: true,
                                start: templateStartIdx,
                            }, tree);
                            return;
                        }
                        else if (n.name.text === 'templateUrl' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            const parts = core_1.normalize(source.fileName)
                                .split('/')
                                .slice(0, -1);
                            const templatePath = core_1.resolve(core_1.normalize(parts.join('/')), core_1.normalize(n.initializer.text));
                            if (!tree.exists(templatePath)) {
                                return;
                            }
                            const fileContent = tree.read(templatePath);
                            if (!fileContent) {
                                return;
                            }
                            visitor({
                                fileName: templatePath,
                                content: fileContent.toString(),
                                inline: false,
                                start: 0,
                            }, tree);
                            return;
                        }
                    }
                    ts.forEachChild(n, findTemplates);
                });
            });
        });
    }
    exports.visitTemplates = visitTemplates;
    function visitNgModuleImports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'imports');
    }
    exports.visitNgModuleImports = visitNgModuleImports;
    function visitNgModuleExports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'exports');
    }
    exports.visitNgModuleExports = visitNgModuleExports;
    function visitNgModuleProperty(sourceFile, callback, property) {
        visitNgModules(sourceFile, (_, decoratorExpressionNode) => {
            ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                if (ts.isPropertyAssignment(n) &&
                    ts.isIdentifier(n.name) &&
                    n.name.text === property &&
                    ts.isArrayLiteralExpression(n.initializer)) {
                    callback(n, n.initializer.elements);
                    return;
                }
                ts.forEachChild(n, findTemplates);
            });
        });
    }
    function visitComponents(sourceFile, callback) {
        visitDecorator(sourceFile, 'Component', callback);
    }
    exports.visitComponents = visitComponents;
    function visitNgModules(sourceFile, callback) {
        visitDecorator(sourceFile, 'NgModule', callback);
    }
    exports.visitNgModules = visitNgModules;
    function visitDecorator(sourceFile, decoratorName, callback) {
        ts.forEachChild(sourceFile, function findClassDeclaration(node) {
            if (!ts.isClassDeclaration(node)) {
                ts.forEachChild(node, findClassDeclaration);
            }
            const classDeclarationNode = node;
            if (!classDeclarationNode.decorators ||
                !classDeclarationNode.decorators.length) {
                return;
            }
            const componentDecorator = classDeclarationNode.decorators.find(d => {
                return (ts.isCallExpression(d.expression) &&
                    ts.isIdentifier(d.expression.expression) &&
                    d.expression.expression.text === decoratorName);
            });
            if (!componentDecorator) {
                return;
            }
            const { expression } = componentDecorator;
            if (!ts.isCallExpression(expression)) {
                return;
            }
            const [arg] = expression.arguments;
            if (!ts.isObjectLiteralExpression(arg)) {
                return;
            }
            callback(classDeclarationNode, arg);
        });
    }
    exports.visitDecorator = visitDecorator;
    function* visit(directory) {
        for (const path of directory.subfiles) {
            if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
                const entry = directory.file(path);
                if (entry) {
                    const content = entry.content;
                    const source = ts.createSourceFile(entry.path, content.toString().replace(/^\uFEFF/, ''), ts.ScriptTarget.Latest, true);
                    yield source;
                }
            }
        }
        for (const path of directory.subdirs) {
            if (path === 'node_modules') {
                continue;
            }
            yield* visit(directory.dir(path));
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS92aXNpdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUNqQywrQ0FBMEQ7SUFHMUQsU0FBZ0Isa0JBQWtCLENBQ2hDLElBQVUsRUFDVixPQUl1QjtRQUV2QixJQUFJLE1BQU0sR0FBdUIsU0FBUyxDQUFDO1FBQzNDLEtBQUssTUFBTSxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDNUM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBZEQsZ0RBY0M7SUFFRCxTQUFnQixjQUFjLENBQzVCLElBQVUsRUFDVixPQVFTO1FBRVQsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsRUFBRTtnQkFDckQsRUFBRSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLGFBQWEsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDekQsSUFDRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVOzRCQUMxQixFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUNyQzs0QkFDQSw0RUFBNEU7NEJBQzVFLG9DQUFvQzs0QkFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFD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LEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBub3JtYWxpemUsIHJlc29sdmUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBUcmVlLCBEaXJFbnRyeSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0VFNTb3VyY2VGaWxlczxSZXN1bHQgPSB2b2lkPihcbiAgdHJlZTogVHJlZSxcbiAgdmlzaXRvcjogKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gICAgdHJlZTogVHJlZSxcbiAgICByZXN1bHQ/OiBSZXN1bHRcbiAgKSA9PiBSZXN1bHQgfCB1bmRlZmluZWRcbik6IFJlc3VsdCB8IHVuZGVmaW5lZCB7XG4gIGxldCByZXN1bHQ6IFJlc3VsdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgZm9yIChjb25zdCBzb3VyY2VGaWxlIG9mIHZpc2l0KHRyZWUucm9vdCkpIHtcbiAgICByZXN1bHQgPSB2aXNpdG9yKHNvdXJjZUZpbGUsIHRyZWUsIHJlc3VsdCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRUZW1wbGF0ZXMoXG4gIHRyZWU6IFRyZWUsXG4gIHZpc2l0b3I6IChcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgZmlsZU5hbWU6IHN0cmluZztcbiAgICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICAgIGlubGluZTogYm9vbGVhbjtcbiAgICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgfSxcbiAgICB0cmVlOiBUcmVlXG4gICkgPT4gdm9pZFxuKTogdm9pZCB7XG4gIHZpc2l0VFNTb3VyY2VGaWxlcyh0cmVlLCBzb3VyY2UgPT4ge1xuICAgIHZpc2l0Q29tcG9uZW50cyhzb3VyY2UsIChfLCBkZWNvcmF0b3JFeHByZXNzaW9uTm9kZSkgPT4ge1xuICAgICAgdHMuZm9yRWFjaENoaWxkKGRlY29yYXRvckV4cHJlc3Npb25Ob2RlLCBmdW5jdGlvbiBmaW5kVGVtcGxhdGVzKG4pIHtcbiAgICAgICAgaWYgKHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG4pICYmIHRzLmlzSWRlbnRpZmllcihuLm5hbWUpKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbi5uYW1lLnRleHQgPT09ICd0ZW1wbGF0ZScgJiZcbiAgICAgICAgICAgIHRzLmlzU3RyaW5nTGl0ZXJhbExpa2Uobi5pbml0aWFsaXplcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gYWRkIGFuIG9mZnNldCBvZiBvbmUgdG8gdGhlIHN0YXJ0IGJlY2F1c2UgdGhlIHRlbXBsYXRlIHF1b3RlcyBhcmVcbiAgICAgICAgICAgIC8vIG5vdCBwYXJ0IG9mIHRoZSB0ZW1wbGF0ZSBjb250ZW50LlxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVTdGFydElkeCA9IG4uaW5pdGlhbGl6ZXIuZ2V0U3RhcnQoKSArIDE7XG4gICAgICAgICAgICB2aXNpdG9yKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IHNvdXJjZS5maWxlTmFtZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBuLmluaXRpYWxpemVyLnRleHQsXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0ZW1wbGF0ZVN0YXJ0SWR4LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0cmVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBuLm5hbWUudGV4dCA9PT0gJ3RlbXBsYXRlVXJsJyAmJlxuICAgICAgICAgICAgdHMuaXNTdHJpbmdMaXRlcmFsTGlrZShuLmluaXRpYWxpemVyKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBub3JtYWxpemUoc291cmNlLmZpbGVOYW1lKVxuICAgICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVQYXRoID0gcmVzb2x2ZShcbiAgICAgICAgICAgICAgbm9ybWFsaXplKHBhcnRzLmpvaW4oJy8nKSksXG4gICAgICAgICAgICAgIG5vcm1hbGl6ZShuLmluaXRpYWxpemVyLnRleHQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCF0cmVlLmV4aXN0cyh0ZW1wbGF0ZVBhdGgpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSB0cmVlLnJlYWQodGVtcGxhdGVQYXRoKTtcbiAgICAgICAgICAgIGlmICghZmlsZUNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aXNpdG9yKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IHRlbXBsYXRlUGF0aCxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBmaWxlQ29udGVudC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRyZWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHMuZm9yRWFjaENoaWxkKG4sIGZpbmRUZW1wbGF0ZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXROZ01vZHVsZUltcG9ydHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgaW1wb3J0Tm9kZTogdHMuUHJvcGVydHlBc3NpZ25tZW50LFxuICAgIGVsZW1lbnRFeHByZXNzaW9uczogdHMuTm9kZUFycmF5PHRzLkV4cHJlc3Npb24+XG4gICkgPT4gdm9pZFxuKSB7XG4gIHZpc2l0TmdNb2R1bGVQcm9wZXJ0eShzb3VyY2VGaWxlLCBjYWxsYmFjaywgJ2ltcG9ydHMnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0TmdNb2R1bGVFeHBvcnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjYWxsYmFjazogKFxuICAgIGV4cG9ydE5vZGU6IHRzLlByb3BlcnR5QXNzaWdubWVudCxcbiAgICBlbGVtZW50RXhwcmVzc2lvbnM6IHRzLk5vZGVBcnJheTx0cy5FeHByZXNzaW9uPlxuICApID0+IHZvaWRcbikge1xuICB2aXNpdE5nTW9kdWxlUHJvcGVydHkoc291cmNlRmlsZSwgY2FsbGJhY2ssICdleHBvcnRzJyk7XG59XG5cbmZ1bmN0aW9uIHZpc2l0TmdNb2R1bGVQcm9wZXJ0eShcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBub2RlczogdHMuUHJvcGVydHlBc3NpZ25tZW50LFxuICAgIGVsZW1lbnRFeHByZXNzaW9uczogdHMuTm9kZUFycmF5PHRzLkV4cHJlc3Npb24+XG4gICkgPT4gdm9pZCxcbiAgcHJvcGVydHk6IHN0cmluZ1xuKSB7XG4gIHZpc2l0TmdNb2R1bGVzKHNvdXJjZUZpbGUsIChfLCBkZWNvcmF0b3JFeHByZXNzaW9uTm9kZSkgPT4ge1xuICAgIHRzLmZvckVhY2hDaGlsZChkZWNvcmF0b3JFeHByZXNzaW9uTm9kZSwgZnVuY3Rpb24gZmluZFRlbXBsYXRlcyhuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG4pICYmXG4gICAgICAgIHRzLmlzSWRlbnRpZmllcihuLm5hbWUpICYmXG4gICAgICAgIG4ubmFtZS50ZXh0ID09PSBwcm9wZXJ0eSAmJlxuICAgICAgICB0cy5pc0FycmF5TGl0ZXJhbEV4cHJlc3Npb24obi5pbml0aWFsaXplcilcbiAgICAgICkge1xuICAgICAgICBjYWxsYmFjayhuLCBuLmluaXRpYWxpemVyLmVsZW1lbnRzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cy5mb3JFYWNoQ2hpbGQobiwgZmluZFRlbXBsYXRlcyk7XG4gICAgfSk7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0Q29tcG9uZW50cyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBjbGFzc0RlY2xhcmF0aW9uTm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbixcbiAgICBkZWNvcmF0b3JFeHByZXNzaW9uTm9kZTogdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdmlzaXREZWNvcmF0b3Ioc291cmNlRmlsZSwgJ0NvbXBvbmVudCcsIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0TmdNb2R1bGVzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjYWxsYmFjazogKFxuICAgIGNsYXNzRGVjbGFyYXRpb25Ob2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uLFxuICAgIGRlY29yYXRvckV4cHJlc3Npb25Ob2RlOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvblxuICApID0+IHZvaWRcbikge1xuICB2aXNpdERlY29yYXRvcihzb3VyY2VGaWxlLCAnTmdNb2R1bGUnLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdERlY29yYXRvcihcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgZGVjb3JhdG9yTmFtZTogc3RyaW5nLFxuICBjYWxsYmFjazogKFxuICAgIGNsYXNzRGVjbGFyYXRpb25Ob2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uLFxuICAgIGRlY29yYXRvckV4cHJlc3Npb25Ob2RlOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvblxuICApID0+IHZvaWRcbikge1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgZnVuY3Rpb24gZmluZENsYXNzRGVjbGFyYXRpb24obm9kZSkge1xuICAgIGlmICghdHMuaXNDbGFzc0RlY2xhcmF0aW9uKG5vZGUpKSB7XG4gICAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgZmluZENsYXNzRGVjbGFyYXRpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzRGVjbGFyYXRpb25Ob2RlID0gbm9kZSBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIWNsYXNzRGVjbGFyYXRpb25Ob2RlLmRlY29yYXRvcnMgfHxcbiAgICAgICFjbGFzc0RlY2xhcmF0aW9uTm9kZS5kZWNvcmF0b3JzLmxlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudERlY29yYXRvciA9IGNsYXNzRGVjbGFyYXRpb25Ob2RlLmRlY29yYXRvcnMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRzLmlzQ2FsbEV4cHJlc3Npb24oZC5leHByZXNzaW9uKSAmJlxuICAgICAgICB0cy5pc0lkZW50aWZpZXIoZC5leHByZXNzaW9uLmV4cHJlc3Npb24pICYmXG4gICAgICAgIGQuZXhwcmVzc2lvbi5leHByZXNzaW9uLnRleHQgPT09IGRlY29yYXRvck5hbWVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbXBvbmVudERlY29yYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZXhwcmVzc2lvbiB9ID0gY29tcG9uZW50RGVjb3JhdG9yO1xuICAgIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihleHByZXNzaW9uKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IFthcmddID0gZXhwcmVzc2lvbi5hcmd1bWVudHM7XG4gICAgaWYgKCF0cy5pc09iamVjdExpdGVyYWxFeHByZXNzaW9uKGFyZykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjbGFzc0RlY2xhcmF0aW9uTm9kZSwgYXJnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uKiB2aXNpdChkaXJlY3Rvcnk6IERpckVudHJ5KTogSXRlcmFibGVJdGVyYXRvcjx0cy5Tb3VyY2VGaWxlPiB7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBkaXJlY3Rvcnkuc3ViZmlsZXMpIHtcbiAgICBpZiAocGF0aC5lbmRzV2l0aCgnLnRzJykgJiYgIXBhdGguZW5kc1dpdGgoJy5kLnRzJykpIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gZGlyZWN0b3J5LmZpbGUocGF0aCk7XG4gICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGVudHJ5LmNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgZW50cnkucGF0aCxcbiAgICAgICAgICBjb250ZW50LnRvU3RyaW5nKCkucmVwbGFjZSgvXlxcdUZFRkYvLCAnJyksXG4gICAgICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHlpZWxkIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHBhdGggb2YgZGlyZWN0b3J5LnN1YmRpcnMpIHtcbiAgICBpZiAocGF0aCA9PT0gJ25vZGVfbW9kdWxlcycpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHlpZWxkKiB2aXNpdChkaXJlY3RvcnkuZGlyKHBhdGgpKTtcbiAgfVxufVxuIl19