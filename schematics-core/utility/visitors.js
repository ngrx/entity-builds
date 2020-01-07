(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/visitors", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        for (const sourceFile of visit(tree.root)) {
            result = visitor(sourceFile, tree, result);
        }
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
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
    function visitNgModuleImports(sourceFile, callback) {
        ts.forEachChild(sourceFile, function findDecorator(node) {
            if (!ts.isDecorator(node)) {
                ts.forEachChild(node, findDecorator);
                return;
            }
            ts.forEachChild(node, function findImportsNode(n) {
                if (ts.isPropertyAssignment(n) &&
                    ts.isArrayLiteralExpression(n.initializer) &&
                    ts.isIdentifier(n.name) &&
                    n.name.text === 'imports') {
                    callback(n, n.initializer.elements);
                }
                ts.forEachChild(n, findImportsNode);
            });
        });
    }
    exports.visitNgModuleImports = visitNgModuleImports;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS92aXNpdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUdqQyxTQUFnQixrQkFBa0IsQ0FDaEMsSUFBVSxFQUNWLE9BSXVCO1FBRXZCLElBQUksTUFBTSxHQUF1QixTQUFTLENBQUM7UUFDM0MsS0FBSyxNQUFNLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM1QztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFkRCxnREFjQztJQUVELFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFtQjtRQUNqQyxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDOUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxLQUFLLENBQUMsSUFBSSxFQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUN6QyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7b0JBQ0YsTUFBTSxNQUFNLENBQUM7aUJBQ2Q7YUFDRjtTQUNGO1FBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3BDLElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRTtnQkFDM0IsU0FBUzthQUNWO1lBRUQsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFRCxTQUFnQixvQkFBb0IsQ0FDbEMsVUFBeUIsRUFDekIsUUFHUztRQUVULEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsYUFBYSxDQUFDLElBQUk7WUFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPO2FBQ1I7WUFFRCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLGVBQWUsQ0FBQyxDQUFDO2dCQUM5QyxJQUNFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO29CQUMxQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDekI7b0JBQ0EsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQztnQkFFRCxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTFCRCxvREEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IFRyZWUsIERpckVudHJ5IH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRUU1NvdXJjZUZpbGVzPFJlc3VsdCA9IHZvaWQ+KFxuICB0cmVlOiBUcmVlLFxuICB2aXNpdG9yOiAoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgICB0cmVlOiBUcmVlLFxuICAgIHJlc3VsdD86IFJlc3VsdFxuICApID0+IFJlc3VsdCB8IHVuZGVmaW5lZFxuKTogUmVzdWx0IHwgdW5kZWZpbmVkIHtcbiAgbGV0IHJlc3VsdDogUmVzdWx0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBmb3IgKGNvbnN0IHNvdXJjZUZpbGUgb2YgdmlzaXQodHJlZS5yb290KSkge1xuICAgIHJlc3VsdCA9IHZpc2l0b3Ioc291cmNlRmlsZSwgdHJlZSwgcmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uKiB2aXNpdChkaXJlY3Rvcnk6IERpckVudHJ5KTogSXRlcmFibGVJdGVyYXRvcjx0cy5Tb3VyY2VGaWxlPiB7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBkaXJlY3Rvcnkuc3ViZmlsZXMpIHtcbiAgICBpZiAocGF0aC5lbmRzV2l0aCgnLnRzJykgJiYgIXBhdGguZW5kc1dpdGgoJy5kLnRzJykpIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gZGlyZWN0b3J5LmZpbGUocGF0aCk7XG4gICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGVudHJ5LmNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgZW50cnkucGF0aCxcbiAgICAgICAgICBjb250ZW50LnRvU3RyaW5nKCkucmVwbGFjZSgvXlxcdUZFRkYvLCAnJyksXG4gICAgICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHlpZWxkIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHBhdGggb2YgZGlyZWN0b3J5LnN1YmRpcnMpIHtcbiAgICBpZiAocGF0aCA9PT0gJ25vZGVfbW9kdWxlcycpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHlpZWxkKiB2aXNpdChkaXJlY3RvcnkuZGlyKHBhdGgpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXROZ01vZHVsZUltcG9ydHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgaW1wb3J0Tm9kZTogdHMuUHJvcGVydHlBc3NpZ25tZW50LFxuICAgIGVsZW1lbnRFeHByZXNzaW9uczogdHMuTm9kZUFycmF5PHRzLkV4cHJlc3Npb24+XG4gICkgPT4gdm9pZFxuKSB7XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBmdW5jdGlvbiBmaW5kRGVjb3JhdG9yKG5vZGUpIHtcbiAgICBpZiAoIXRzLmlzRGVjb3JhdG9yKG5vZGUpKSB7XG4gICAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgZmluZERlY29yYXRvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGZ1bmN0aW9uIGZpbmRJbXBvcnRzTm9kZShuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG4pICYmXG4gICAgICAgIHRzLmlzQXJyYXlMaXRlcmFsRXhwcmVzc2lvbihuLmluaXRpYWxpemVyKSAmJlxuICAgICAgICB0cy5pc0lkZW50aWZpZXIobi5uYW1lKSAmJlxuICAgICAgICBuLm5hbWUudGV4dCA9PT0gJ2ltcG9ydHMnXG4gICAgICApIHtcbiAgICAgICAgY2FsbGJhY2sobiwgbi5pbml0aWFsaXplci5lbGVtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHRzLmZvckVhY2hDaGlsZChuLCBmaW5kSW1wb3J0c05vZGUpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==