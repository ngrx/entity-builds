(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/visit-utils", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        tree.visit(path => {
            if (!path.endsWith('.ts')) {
                return;
            }
            const sourceFile = ts.createSourceFile(path, tree.read(path).toString(), ts.ScriptTarget.Latest);
            if (sourceFile.isDeclarationFile) {
                return;
            }
            result = visitor(sourceFile, tree, result);
        });
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS92aXNpdC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUdqQyxTQUFnQixrQkFBa0IsQ0FDaEMsSUFBVSxFQUNWLE9BSXVCO1FBRXZCLElBQUksTUFBTSxHQUF1QixTQUFTLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsT0FBTzthQUNSO1lBRUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNwQyxJQUFJLEVBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDM0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3ZCLENBQUM7WUFFRixJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDaEMsT0FBTzthQUNSO1lBRUQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQTdCRCxnREE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdFRTU291cmNlRmlsZXM8UmVzdWx0ID0gdm9pZD4oXG4gIHRyZWU6IFRyZWUsXG4gIHZpc2l0b3I6IChcbiAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgIHRyZWU6IFRyZWUsXG4gICAgcmVzdWx0PzogUmVzdWx0XG4gICkgPT4gUmVzdWx0IHwgdW5kZWZpbmVkXG4pOiBSZXN1bHQgfCB1bmRlZmluZWQge1xuICBsZXQgcmVzdWx0OiBSZXN1bHQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgdHJlZS52aXNpdChwYXRoID0+IHtcbiAgICBpZiAoIXBhdGguZW5kc1dpdGgoJy50cycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlRmlsZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBwYXRoLFxuICAgICAgdHJlZS5yZWFkKHBhdGgpIS50b1N0cmluZygpLFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdFxuICAgICk7XG5cbiAgICBpZiAoc291cmNlRmlsZS5pc0RlY2xhcmF0aW9uRmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IHZpc2l0b3Ioc291cmNlRmlsZSwgdHJlZSwgcmVzdWx0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==