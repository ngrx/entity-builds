var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/ast-utils", ["require", "exports", "typescript", "@ngrx/entity/schematics-core/utility/change", "@ngrx/entity/schematics-core/utility/route-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* istanbul ignore file */
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var change_1 = require("@ngrx/entity/schematics-core/utility/change");
    var route_utils_1 = require("@ngrx/entity/schematics-core/utility/route-utils");
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node
     * @param kind
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    function findNodes(node, kind, max) {
        if (max === void 0) { max = Infinity; }
        if (!node || max == 0) {
            return [];
        }
        var arr = [];
        if (node.kind === kind) {
            arr.push(node);
            max--;
        }
        if (max > 0) {
            try {
                for (var _a = __values(node.getChildren()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    findNodes(child, kind, max).forEach(function (node) {
                        if (max > 0) {
                            arr.push(node);
                        }
                        max--;
                    });
                    if (max <= 0) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return arr;
        var e_1, _c;
    }
    exports.findNodes = findNodes;
    /**
     * Get all the nodes from a source.
     * @param sourceFile The source file object.
     * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
     */
    function getSourceNodes(sourceFile) {
        var nodes = [sourceFile];
        var result = [];
        while (nodes.length > 0) {
            var node = nodes.shift();
            if (node) {
                result.push(node);
                if (node.getChildCount(sourceFile) >= 0) {
                    nodes.unshift.apply(nodes, __spread(node.getChildren()));
                }
            }
        }
        return result;
    }
    exports.getSourceNodes = getSourceNodes;
    /**
     * Helper for sorting nodes.
     * @return function to sort nodes in increasing order of position in sourceFile
     */
    function nodesByPosition(first, second) {
        return first.pos - second.pos;
    }
    /**
     * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
     * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
     * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
     *
     * @param nodes insert after the last occurence of nodes
     * @param toInsert string to insert
     * @param file file to insert changes into
     * @param fallbackPos position to insert if toInsert happens to be the first occurence
     * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
     * @return Change instance
     * @throw Error if toInsert is first occurence but fall back is not set
     */
    function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
        var lastItem = nodes.sort(nodesByPosition).pop();
        if (!lastItem) {
            throw new Error();
        }
        if (syntaxKind) {
            lastItem = findNodes(lastItem, syntaxKind)
                .sort(nodesByPosition)
                .pop();
        }
        if (!lastItem && fallbackPos == undefined) {
            throw new Error("tried to insert " + toInsert + " as first occurence with no fallback position");
        }
        var lastItemPosition = lastItem ? lastItem.end : fallbackPos;
        return new change_1.InsertChange(file, lastItemPosition, toInsert);
    }
    exports.insertAfterLastOccurrence = insertAfterLastOccurrence;
    function getContentOfKeyLiteral(_source, node) {
        if (node.kind == ts.SyntaxKind.Identifier) {
            return node.text;
        }
        else if (node.kind == ts.SyntaxKind.StringLiteral) {
            return node.text;
        }
        else {
            return null;
        }
    }
    exports.getContentOfKeyLiteral = getContentOfKeyLiteral;
    function _angularImportsFromNode(node, _sourceFile) {
        var ms = node.moduleSpecifier;
        var modulePath;
        switch (ms.kind) {
            case ts.SyntaxKind.StringLiteral:
                modulePath = ms.text;
                break;
            default:
                return {};
        }
        if (!modulePath.startsWith('@angular/')) {
            return {};
        }
        if (node.importClause) {
            if (node.importClause.name) {
                // This is of the form `import Name from 'path'`. Ignore.
                return {};
            }
            else if (node.importClause.namedBindings) {
                var nb = node.importClause.namedBindings;
                if (nb.kind == ts.SyntaxKind.NamespaceImport) {
                    // This is of the form `import * as name from 'path'`. Return `name.`.
                    return _a = {},
                        _a[nb.name.text + '.'] = modulePath,
                        _a;
                }
                else {
                    // This is of the form `import {a,b,c} from 'path'`
                    var namedImports = nb;
                    return namedImports.elements
                        .map(function (is) {
                        return is.propertyName ? is.propertyName.text : is.name.text;
                    })
                        .reduce(function (acc, curr) {
                        acc[curr] = modulePath;
                        return acc;
                    }, {});
                }
            }
            return {};
        }
        else {
            // This is of the form `import 'path';`. Nothing to do.
            return {};
        }
        var _a;
    }
    function getDecoratorMetadata(source, identifier, module) {
        var angularImports = findNodes(source, ts.SyntaxKind.ImportDeclaration)
            .map(function (node) { return _angularImportsFromNode(node, source); })
            .reduce(function (acc, current) {
            try {
                for (var _a = __values(Object.keys(current)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    acc[key] = current[key];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return acc;
            var e_2, _c;
        }, {});
        return getSourceNodes(source)
            .filter(function (node) {
            return (node.kind == ts.SyntaxKind.Decorator &&
                node.expression.kind == ts.SyntaxKind.CallExpression);
        })
            .map(function (node) { return node.expression; })
            .filter(function (expr) {
            if (expr.expression.kind == ts.SyntaxKind.Identifier) {
                var id = expr.expression;
                return (id.getFullText(source) == identifier &&
                    angularImports[id.getFullText(source)] === module);
            }
            else if (expr.expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // This covers foo.NgModule when importing * as foo.
                var paExpr = expr.expression;
                // If the left expression is not an identifier, just give up at that point.
                if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
                    return false;
                }
                var id = paExpr.name.text;
                var moduleId = paExpr.expression.getText(source);
                return id === identifier && angularImports[moduleId + '.'] === module;
            }
            return false;
        })
            .filter(function (expr) {
            return expr.arguments[0] &&
                expr.arguments[0].kind == ts.SyntaxKind.ObjectLiteralExpression;
        })
            .map(function (expr) { return expr.arguments[0]; });
    }
    exports.getDecoratorMetadata = getDecoratorMetadata;
    function _addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath) {
        var nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
        var node = nodes[0]; // tslint:disable-line:no-any
        // Find the decorator declaration.
        if (!node) {
            return [];
        }
        // Get all the children property assignment of object literals.
        var matchingProperties = node.properties
            .filter(function (prop) { return prop.kind == ts.SyntaxKind.PropertyAssignment; })
            // Filter out every fields that's not "metadataField". Also handles string literals
            // (but not expressions).
            .filter(function (prop) {
            var name = prop.name;
            switch (name.kind) {
                case ts.SyntaxKind.Identifier:
                    return name.getText(source) == metadataField;
                case ts.SyntaxKind.StringLiteral:
                    return name.text == metadataField;
            }
            return false;
        });
        // Get the last node of the array literal.
        if (!matchingProperties) {
            return [];
        }
        if (matchingProperties.length == 0) {
            // We haven't found the field in the metadata declaration. Insert a new field.
            var expr = node;
            var position_1;
            var toInsert_1;
            if (expr.properties.length == 0) {
                position_1 = expr.getEnd() - 1;
                toInsert_1 = "  " + metadataField + ": [" + symbolName + "]\n";
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position_1 = node.getEnd();
                // Get the indentation of the last element, if any.
                var text = node.getFullText(source);
                var matches = text.match(/^\r?\n\s*/);
                if (matches.length > 0) {
                    toInsert_1 = "," + matches[0] + metadataField + ": [" + symbolName + "]";
                }
                else {
                    toInsert_1 = ", " + metadataField + ": [" + symbolName + "]";
                }
            }
            var newMetadataProperty = new change_1.InsertChange(ngModulePath, position_1, toInsert_1);
            var newMetadataImport = route_utils_1.insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
            return [newMetadataProperty, newMetadataImport];
        }
        var assignment = matchingProperties[0];
        // If it's not an array, nothing we can do really.
        if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return [];
        }
        var arrLiteral = assignment.initializer;
        if (arrLiteral.elements.length == 0) {
            // Forward the property.
            node = arrLiteral;
        }
        else {
            node = arrLiteral.elements;
        }
        if (!node) {
            console.log('No app module found. Please add your new class to your component.');
            return [];
        }
        if (Array.isArray(node)) {
            var nodeArray = node;
            var symbolsArray = nodeArray.map(function (node) { return node.getText(); });
            if (symbolsArray.includes(symbolName)) {
                return [];
            }
            node = node[node.length - 1];
            var effectsModule = nodeArray.find(function (node) {
                return (node.getText().includes('EffectsModule.forRoot') &&
                    symbolName.includes('EffectsModule.forRoot')) ||
                    (node.getText().includes('EffectsModule.forFeature') &&
                        symbolName.includes('EffectsModule.forFeature'));
            });
            if (effectsModule && symbolName.includes('EffectsModule')) {
                var effectsArgs = effectsModule.arguments.shift();
                if (effectsArgs &&
                    effectsArgs.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                    var effectsElements = effectsArgs
                        .elements;
                    var _a = __read(symbolName.match(/\[(.*)\]/), 2), effectsSymbol = _a[1];
                    var epos = void 0;
                    if (effectsElements.length === 0) {
                        epos = effectsArgs.getStart() + 1;
                        return [new change_1.InsertChange(ngModulePath, epos, effectsSymbol)];
                    }
                    else {
                        var lastEffect = effectsElements[effectsElements.length - 1];
                        epos = lastEffect.getEnd();
                        // Get the indentation of the last element, if any.
                        var text = lastEffect.getFullText(source);
                        var effectInsert = void 0;
                        if (text.match('^\r?\r?\n')) {
                            effectInsert = "," + text.match(/^\r?\n\s+/)[0] + effectsSymbol;
                        }
                        else {
                            effectInsert = ", " + effectsSymbol;
                        }
                        return [new change_1.InsertChange(ngModulePath, epos, effectInsert)];
                    }
                }
                else {
                    return [];
                }
            }
        }
        var toInsert;
        var position = node.getEnd();
        if (node.kind == ts.SyntaxKind.ObjectLiteralExpression) {
            // We haven't found the field in the metadata declaration. Insert a new
            // field.
            var expr = node;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = "  " + metadataField + ": [" + symbolName + "]\n";
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                var text = node.getFullText(source);
                if (text.match('^\r?\r?\n')) {
                    toInsert = "," + text.match(/^\r?\n\s+/)[0] + metadataField + ": [" + symbolName + "]";
                }
                else {
                    toInsert = ", " + metadataField + ": [" + symbolName + "]";
                }
            }
        }
        else if (node.kind == ts.SyntaxKind.ArrayLiteralExpression) {
            // We found the field but it's empty. Insert it just before the `]`.
            position--;
            toInsert = "" + symbolName;
        }
        else {
            // Get the indentation of the last element, if any.
            var text = node.getFullText(source);
            if (text.match(/^\r?\n/)) {
                toInsert = "," + text.match(/^\r?\n(\r?)\s+/)[0] + symbolName;
            }
            else {
                toInsert = ", " + symbolName;
            }
        }
        var insert = new change_1.InsertChange(ngModulePath, position, toInsert);
        var importInsert = route_utils_1.insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
        return [insert, importInsert];
    }
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addDeclarationToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'declarations', classifiedName, importPath);
    }
    exports.addDeclarationToModule = addDeclarationToModule;
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addImportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'imports', classifiedName, importPath);
    }
    exports.addImportToModule = addImportToModule;
    /**
     * Custom function to insert a provider into NgModule. It also imports it.
     */
    function addProviderToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'providers', classifiedName, importPath);
    }
    exports.addProviderToModule = addProviderToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addExportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'exports', classifiedName, importPath);
    }
    exports.addExportToModule = addExportToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addBootstrapToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'bootstrap', classifiedName, importPath);
    }
    exports.addBootstrapToModule = addBootstrapToModule;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvYXN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMEJBQTBCO0lBQzFCOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUNqQyxzRUFBZ0Q7SUFDaEQsZ0ZBQTZDO0lBRTdDOzs7Ozs7T0FNRztJQUNILG1CQUNFLElBQWEsRUFDYixJQUFtQixFQUNuQixHQUFjO1FBQWQsb0JBQUEsRUFBQSxjQUFjO1FBRWQsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFNLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsR0FBRyxFQUFFLENBQUM7U0FDUDtRQUNELElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTs7Z0JBQ1gsS0FBb0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBLGdCQUFBO29CQUFqQyxJQUFNLEtBQUssV0FBQTtvQkFDZCxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUN0QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7NEJBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDaEI7d0JBQ0QsR0FBRyxFQUFFLENBQUM7b0JBQ1IsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO3dCQUNaLE1BQU07cUJB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O09BRUc7SUFDSCw2QkFDRSxNQUFxQixFQUNyQixVQUFrQixFQUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsa0RBYUM7SUFFRDs7T0FFRztJQUNILDJCQUNFLE1BQXFCLEVBQ3JCLFVBQWtCLEVBQ2xCLGNBQXNCLEVBQ3RCLFVBQWtCO1FBRWxCLE9BQU8sNEJBQTRCLENBQ2pDLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULGNBQWMsRUFDZCxVQUFVLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFiRCw4Q0FhQztJQUVEOztPQUVHO0lBQ0gsOEJBQ0UsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsT0FBTyw0QkFBNEIsQ0FDakMsTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEVBQ1gsY0FBYyxFQUNkLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWJELG9EQWFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgQ2hhbmdlLCBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBpbnNlcnRJbXBvcnQgfSBmcm9tICcuL3JvdXRlLXV0aWxzJztcblxuLyoqXG4gKiBGaW5kIGFsbCBub2RlcyBmcm9tIHRoZSBBU1QgaW4gdGhlIHN1YnRyZWUgb2Ygbm9kZSBvZiBTeW50YXhLaW5kIGtpbmQuXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIGtpbmRcbiAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIHJldHVybi5cbiAqIEByZXR1cm4gYWxsIG5vZGVzIG9mIGtpbmQsIG9yIFtdIGlmIG5vbmUgaXMgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlcyhcbiAgbm9kZTogdHMuTm9kZSxcbiAga2luZDogdHMuU3ludGF4S2luZCxcbiAgbWF4ID0gSW5maW5pdHlcbik6IHRzLk5vZGVbXSB7XG4gIGlmICghbm9kZSB8fCBtYXggPT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGFycjogdHMuTm9kZVtdID0gW107XG4gIGlmIChub2RlLmtpbmQgPT09IGtpbmQpIHtcbiAgICBhcnIucHVzaChub2RlKTtcbiAgICBtYXgtLTtcbiAgfVxuICBpZiAobWF4ID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5nZXRDaGlsZHJlbigpKSB7XG4gICAgICBmaW5kTm9kZXMoY2hpbGQsIGtpbmQsIG1heCkuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKG1heCA+IDApIHtcbiAgICAgICAgICBhcnIucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBtYXgtLTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobWF4IDw9IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBHZXQgYWxsIHRoZSBub2RlcyBmcm9tIGEgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZUZpbGUgVGhlIHNvdXJjZSBmaWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHRzLk5vZGU+fSBBbiBvYnNlcnZhYmxlIG9mIGFsbCB0aGUgbm9kZXMgaW4gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZU5vZGVzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Ob2RlW10ge1xuICBjb25zdCBub2RlczogdHMuTm9kZVtdID0gW3NvdXJjZUZpbGVdO1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgaWYgKG5vZGUuZ2V0Q2hpbGRDb3VudChzb3VyY2VGaWxlKSA+PSAwKSB7XG4gICAgICAgIG5vZGVzLnVuc2hpZnQoLi4ubm9kZS5nZXRDaGlsZHJlbigpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEhlbHBlciBmb3Igc29ydGluZyBub2Rlcy5cbiAqIEByZXR1cm4gZnVuY3Rpb24gdG8gc29ydCBub2RlcyBpbiBpbmNyZWFzaW5nIG9yZGVyIG9mIHBvc2l0aW9uIGluIHNvdXJjZUZpbGVcbiAqL1xuZnVuY3Rpb24gbm9kZXNCeVBvc2l0aW9uKGZpcnN0OiB0cy5Ob2RlLCBzZWNvbmQ6IHRzLk5vZGUpOiBudW1iZXIge1xuICByZXR1cm4gZmlyc3QucG9zIC0gc2Vjb25kLnBvcztcbn1cblxuLyoqXG4gKiBJbnNlcnQgYHRvSW5zZXJ0YCBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2YgYHRzLlN5bnRheEtpbmRbbm9kZXNbaV0ua2luZF1gXG4gKiBvciBhZnRlciB0aGUgbGFzdCBvZiBvY2N1cmVuY2Ugb2YgYHN5bnRheEtpbmRgIGlmIHRoZSBsYXN0IG9jY3VyZW5jZSBpcyBhIHN1YiBjaGlsZFxuICogb2YgdHMuU3ludGF4S2luZFtub2Rlc1tpXS5raW5kXSBhbmQgc2F2ZSB0aGUgY2hhbmdlcyBpbiBmaWxlLlxuICpcbiAqIEBwYXJhbSBub2RlcyBpbnNlcnQgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIG5vZGVzXG4gKiBAcGFyYW0gdG9JbnNlcnQgc3RyaW5nIHRvIGluc2VydFxuICogQHBhcmFtIGZpbGUgZmlsZSB0byBpbnNlcnQgY2hhbmdlcyBpbnRvXG4gKiBAcGFyYW0gZmFsbGJhY2tQb3MgcG9zaXRpb24gdG8gaW5zZXJ0IGlmIHRvSW5zZXJ0IGhhcHBlbnMgdG8gYmUgdGhlIGZpcnN0IG9jY3VyZW5jZVxuICogQHBhcmFtIHN5bnRheEtpbmQgdGhlIHRzLlN5bnRheEtpbmQgb2YgdGhlIHN1YmNoaWxkcmVuIHRvIGluc2VydCBhZnRlclxuICogQHJldHVybiBDaGFuZ2UgaW5zdGFuY2VcbiAqIEB0aHJvdyBFcnJvciBpZiB0b0luc2VydCBpcyBmaXJzdCBvY2N1cmVuY2UgYnV0IGZhbGwgYmFjayBpcyBub3Qgc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICBub2RlczogdHMuTm9kZVtdLFxuICB0b0luc2VydDogc3RyaW5nLFxuICBmaWxlOiBzdHJpbmcsXG4gIGZhbGxiYWNrUG9zOiBudW1iZXIsXG4gIHN5bnRheEtpbmQ/OiB0cy5TeW50YXhLaW5kXG4pOiBDaGFuZ2Uge1xuICBsZXQgbGFzdEl0ZW0gPSBub2Rlcy5zb3J0KG5vZGVzQnlQb3NpdGlvbikucG9wKCk7XG4gIGlmICghbGFzdEl0ZW0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfVxuICBpZiAoc3ludGF4S2luZCkge1xuICAgIGxhc3RJdGVtID0gZmluZE5vZGVzKGxhc3RJdGVtLCBzeW50YXhLaW5kKVxuICAgICAgLnNvcnQobm9kZXNCeVBvc2l0aW9uKVxuICAgICAgLnBvcCgpO1xuICB9XG4gIGlmICghbGFzdEl0ZW0gJiYgZmFsbGJhY2tQb3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHRyaWVkIHRvIGluc2VydCAke3RvSW5zZXJ0fSBhcyBmaXJzdCBvY2N1cmVuY2Ugd2l0aCBubyBmYWxsYmFjayBwb3NpdGlvbmBcbiAgICApO1xuICB9XG4gIGNvbnN0IGxhc3RJdGVtUG9zaXRpb246IG51bWJlciA9IGxhc3RJdGVtID8gbGFzdEl0ZW0uZW5kIDogZmFsbGJhY2tQb3M7XG5cbiAgcmV0dXJuIG5ldyBJbnNlcnRDaGFuZ2UoZmlsZSwgbGFzdEl0ZW1Qb3NpdGlvbiwgdG9JbnNlcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGVudE9mS2V5TGl0ZXJhbChcbiAgX3NvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbm9kZTogdHMuTm9kZVxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIChub2RlIGFzIHRzLklkZW50aWZpZXIpLnRleHQ7XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkge1xuICAgIHJldHVybiAobm9kZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hbmd1bGFySW1wb3J0c0Zyb21Ob2RlKFxuICBub2RlOiB0cy5JbXBvcnREZWNsYXJhdGlvbixcbiAgX3NvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGVcbik6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgY29uc3QgbXMgPSBub2RlLm1vZHVsZVNwZWNpZmllcjtcbiAgbGV0IG1vZHVsZVBhdGg6IHN0cmluZztcbiAgc3dpdGNoIChtcy5raW5kKSB7XG4gICAgY2FzZSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWw6XG4gICAgICBtb2R1bGVQYXRoID0gKG1zIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQ7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaWYgKCFtb2R1bGVQYXRoLnN0YXJ0c1dpdGgoJ0Bhbmd1bGFyLycpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlKSB7XG4gICAgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWUpIHtcbiAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCBOYW1lIGZyb20gJ3BhdGgnYC4gSWdub3JlLlxuICAgICAgcmV0dXJuIHt9O1xuICAgIH0gZWxzZSBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncykge1xuICAgICAgY29uc3QgbmIgPSBub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzO1xuICAgICAgaWYgKG5iLmtpbmQgPT0gdHMuU3ludGF4S2luZC5OYW1lc3BhY2VJbXBvcnQpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0ICogYXMgbmFtZSBmcm9tICdwYXRoJ2AuIFJldHVybiBgbmFtZS5gLlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFsobmIgYXMgdHMuTmFtZXNwYWNlSW1wb3J0KS5uYW1lLnRleHQgKyAnLiddOiBtb2R1bGVQYXRoLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0IHthLGIsY30gZnJvbSAncGF0aCdgXG4gICAgICAgIGNvbnN0IG5hbWVkSW1wb3J0cyA9IG5iIGFzIHRzLk5hbWVkSW1wb3J0cztcblxuICAgICAgICByZXR1cm4gbmFtZWRJbXBvcnRzLmVsZW1lbnRzXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChpczogdHMuSW1wb3J0U3BlY2lmaWVyKSA9PlxuICAgICAgICAgICAgICBpcy5wcm9wZXJ0eU5hbWUgPyBpcy5wcm9wZXJ0eU5hbWUudGV4dCA6IGlzLm5hbWUudGV4dFxuICAgICAgICAgIClcbiAgICAgICAgICAucmVkdWNlKChhY2M6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9LCBjdXJyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IG1vZHVsZVBhdGg7XG5cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7fTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgJ3BhdGgnO2AuIE5vdGhpbmcgdG8gZG8uXG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNvcmF0b3JNZXRhZGF0YShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gIG1vZHVsZTogc3RyaW5nXG4pOiB0cy5Ob2RlW10ge1xuICBjb25zdCBhbmd1bGFySW1wb3J0czogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSBmaW5kTm9kZXMoXG4gICAgc291cmNlLFxuICAgIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb25cbiAgKVxuICAgIC5tYXAobm9kZSA9PiBfYW5ndWxhckltcG9ydHNGcm9tTm9kZShub2RlIGFzIHRzLkltcG9ydERlY2xhcmF0aW9uLCBzb3VyY2UpKVxuICAgIC5yZWR1Y2UoXG4gICAgICAoXG4gICAgICAgIGFjYzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgICAgIGN1cnJlbnQ6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9XG4gICAgICApID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudCkpIHtcbiAgICAgICAgICBhY2Nba2V5XSA9IGN1cnJlbnRba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiBnZXRTb3VyY2VOb2Rlcyhzb3VyY2UpXG4gICAgLmZpbHRlcihub2RlID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLkRlY29yYXRvciAmJlxuICAgICAgICAobm9kZSBhcyB0cy5EZWNvcmF0b3IpLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uXG4gICAgICApO1xuICAgIH0pXG4gICAgLm1hcChub2RlID0+IChub2RlIGFzIHRzLkRlY29yYXRvcikuZXhwcmVzc2lvbiBhcyB0cy5DYWxsRXhwcmVzc2lvbilcbiAgICAuZmlsdGVyKGV4cHIgPT4ge1xuICAgICAgaWYgKGV4cHIuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBpZCA9IGV4cHIuZXhwcmVzc2lvbiBhcyB0cy5JZGVudGlmaWVyO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgaWQuZ2V0RnVsbFRleHQoc291cmNlKSA9PSBpZGVudGlmaWVyICYmXG4gICAgICAgICAgYW5ndWxhckltcG9ydHNbaWQuZ2V0RnVsbFRleHQoc291cmNlKV0gPT09IG1vZHVsZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXhwci5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb25cbiAgICAgICkge1xuICAgICAgICAvLyBUaGlzIGNvdmVycyBmb28uTmdNb2R1bGUgd2hlbiBpbXBvcnRpbmcgKiBhcyBmb28uXG4gICAgICAgIGNvbnN0IHBhRXhwciA9IGV4cHIuZXhwcmVzc2lvbiBhcyB0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb247XG4gICAgICAgIC8vIElmIHRoZSBsZWZ0IGV4cHJlc3Npb24gaXMgbm90IGFuIGlkZW50aWZpZXIsIGp1c3QgZ2l2ZSB1cCBhdCB0aGF0IHBvaW50LlxuICAgICAgICBpZiAocGFFeHByLmV4cHJlc3Npb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaWQgPSBwYUV4cHIubmFtZS50ZXh0O1xuICAgICAgICBjb25zdCBtb2R1bGVJZCA9IChwYUV4cHIuZXhwcmVzc2lvbiBhcyB0cy5JZGVudGlmaWVyKS5nZXRUZXh0KHNvdXJjZSk7XG5cbiAgICAgICAgcmV0dXJuIGlkID09PSBpZGVudGlmaWVyICYmIGFuZ3VsYXJJbXBvcnRzW21vZHVsZUlkICsgJy4nXSA9PT0gbW9kdWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAuZmlsdGVyKFxuICAgICAgZXhwciA9PlxuICAgICAgICBleHByLmFyZ3VtZW50c1swXSAmJlxuICAgICAgICBleHByLmFyZ3VtZW50c1swXS5raW5kID09IHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgICApXG4gICAgLm1hcChleHByID0+IGV4cHIuYXJndW1lbnRzWzBdIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKTtcbn1cblxuZnVuY3Rpb24gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBuZ01vZHVsZVBhdGg6IHN0cmluZyxcbiAgbWV0YWRhdGFGaWVsZDogc3RyaW5nLFxuICBzeW1ib2xOYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICBjb25zdCBub2RlcyA9IGdldERlY29yYXRvck1ldGFkYXRhKHNvdXJjZSwgJ05nTW9kdWxlJywgJ0Bhbmd1bGFyL2NvcmUnKTtcbiAgbGV0IG5vZGU6IGFueSA9IG5vZGVzWzBdOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuXG4gIC8vIEZpbmQgdGhlIGRlY29yYXRvciBkZWNsYXJhdGlvbi5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gR2V0IGFsbCB0aGUgY2hpbGRyZW4gcHJvcGVydHkgYXNzaWdubWVudCBvZiBvYmplY3QgbGl0ZXJhbHMuXG4gIGNvbnN0IG1hdGNoaW5nUHJvcGVydGllczogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRbXSA9IChub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKS5wcm9wZXJ0aWVzXG4gICAgLmZpbHRlcihwcm9wID0+IHByb3Aua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QXNzaWdubWVudClcbiAgICAvLyBGaWx0ZXIgb3V0IGV2ZXJ5IGZpZWxkcyB0aGF0J3Mgbm90IFwibWV0YWRhdGFGaWVsZFwiLiBBbHNvIGhhbmRsZXMgc3RyaW5nIGxpdGVyYWxzXG4gICAgLy8gKGJ1dCBub3QgZXhwcmVzc2lvbnMpLlxuICAgIC5maWx0ZXIoKHByb3A6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IHByb3AubmFtZTtcbiAgICAgIHN3aXRjaCAobmFtZS5raW5kKSB7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyOlxuICAgICAgICAgIHJldHVybiAobmFtZSBhcyB0cy5JZGVudGlmaWVyKS5nZXRUZXh0KHNvdXJjZSkgPT0gbWV0YWRhdGFGaWVsZDtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWw6XG4gICAgICAgICAgcmV0dXJuIChuYW1lIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQgPT0gbWV0YWRhdGFGaWVsZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gIC8vIEdldCB0aGUgbGFzdCBub2RlIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICBpZiAoIW1hdGNoaW5nUHJvcGVydGllcykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAobWF0Y2hpbmdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gV2UgaGF2ZW4ndCBmb3VuZCB0aGUgZmllbGQgaW4gdGhlIG1ldGFkYXRhIGRlY2xhcmF0aW9uLiBJbnNlcnQgYSBuZXcgZmllbGQuXG4gICAgY29uc3QgZXhwciA9IG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb247XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG4gICAgbGV0IHRvSW5zZXJ0OiBzdHJpbmc7XG4gICAgaWYgKGV4cHIucHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgICAgcG9zaXRpb24gPSBleHByLmdldEVuZCgpIC0gMTtcbiAgICAgIHRvSW5zZXJ0ID0gYCAgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dXFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGV4cHIucHJvcGVydGllc1tleHByLnByb3BlcnRpZXMubGVuZ3RoIC0gMV07XG4gICAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgICBjb25zdCBtYXRjaGVzID0gdGV4dC5tYXRjaCgvXlxccj9cXG5cXHMqLyk7XG4gICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwke21hdGNoZXNbMF19JHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV3TWV0YWRhdGFQcm9wZXJ0eSA9IG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICBuZ01vZHVsZVBhdGgsXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHRvSW5zZXJ0XG4gICAgKTtcbiAgICBjb25zdCBuZXdNZXRhZGF0YUltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIG5nTW9kdWxlUGF0aCxcbiAgICAgIHN5bWJvbE5hbWUucmVwbGFjZSgvXFwuLiokLywgJycpLFxuICAgICAgaW1wb3J0UGF0aFxuICAgICk7XG5cbiAgICByZXR1cm4gW25ld01ldGFkYXRhUHJvcGVydHksIG5ld01ldGFkYXRhSW1wb3J0XTtcbiAgfVxuXG4gIGNvbnN0IGFzc2lnbm1lbnQgPSBtYXRjaGluZ1Byb3BlcnRpZXNbMF0gYXMgdHMuUHJvcGVydHlBc3NpZ25tZW50O1xuXG4gIC8vIElmIGl0J3Mgbm90IGFuIGFycmF5LCBub3RoaW5nIHdlIGNhbiBkbyByZWFsbHkuXG4gIGlmIChhc3NpZ25tZW50LmluaXRpYWxpemVyLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGFyckxpdGVyYWwgPSBhc3NpZ25tZW50LmluaXRpYWxpemVyIGFzIHRzLkFycmF5TGl0ZXJhbEV4cHJlc3Npb247XG4gIGlmIChhcnJMaXRlcmFsLmVsZW1lbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gRm9yd2FyZCB0aGUgcHJvcGVydHkuXG4gICAgbm9kZSA9IGFyckxpdGVyYWw7XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IGFyckxpdGVyYWwuZWxlbWVudHM7XG4gIH1cblxuICBpZiAoIW5vZGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdObyBhcHAgbW9kdWxlIGZvdW5kLiBQbGVhc2UgYWRkIHlvdXIgbmV3IGNsYXNzIHRvIHlvdXIgY29tcG9uZW50LidcbiAgICApO1xuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBjb25zdCBub2RlQXJyYXkgPSAobm9kZSBhcyB7fSkgYXMgQXJyYXk8dHMuTm9kZT47XG4gICAgY29uc3Qgc3ltYm9sc0FycmF5ID0gbm9kZUFycmF5Lm1hcChub2RlID0+IG5vZGUuZ2V0VGV4dCgpKTtcbiAgICBpZiAoc3ltYm9sc0FycmF5LmluY2x1ZGVzKHN5bWJvbE5hbWUpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGVbbm9kZS5sZW5ndGggLSAxXTtcblxuICAgIGNvbnN0IGVmZmVjdHNNb2R1bGUgPSBub2RlQXJyYXkuZmluZChcbiAgICAgIG5vZGUgPT5cbiAgICAgICAgKG5vZGUuZ2V0VGV4dCgpLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvclJvb3QnKSAmJlxuICAgICAgICAgIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yUm9vdCcpKSB8fFxuICAgICAgICAobm9kZS5nZXRUZXh0KCkuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZScpICYmXG4gICAgICAgICAgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlJykpXG4gICAgKTtcblxuICAgIGlmIChlZmZlY3RzTW9kdWxlICYmIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUnKSkge1xuICAgICAgY29uc3QgZWZmZWN0c0FyZ3MgPSAoZWZmZWN0c01vZHVsZSBhcyBhbnkpLmFyZ3VtZW50cy5zaGlmdCgpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGVmZmVjdHNBcmdzICYmXG4gICAgICAgIGVmZmVjdHNBcmdzLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvblxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGVmZmVjdHNFbGVtZW50cyA9IChlZmZlY3RzQXJncyBhcyB0cy5BcnJheUxpdGVyYWxFeHByZXNzaW9uKVxuICAgICAgICAgIC5lbGVtZW50cztcbiAgICAgICAgY29uc3QgWywgZWZmZWN0c1N5bWJvbF0gPSAoPGFueT5zeW1ib2xOYW1lKS5tYXRjaCgvXFxbKC4qKVxcXS8pO1xuXG4gICAgICAgIGxldCBlcG9zO1xuICAgICAgICBpZiAoZWZmZWN0c0VsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGVwb3MgPSBlZmZlY3RzQXJncy5nZXRTdGFydCgpICsgMTtcbiAgICAgICAgICByZXR1cm4gW25ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBlcG9zLCBlZmZlY3RzU3ltYm9sKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbGFzdEVmZmVjdCA9IGVmZmVjdHNFbGVtZW50c1tcbiAgICAgICAgICAgIGVmZmVjdHNFbGVtZW50cy5sZW5ndGggLSAxXG4gICAgICAgICAgXSBhcyB0cy5FeHByZXNzaW9uO1xuICAgICAgICAgIGVwb3MgPSBsYXN0RWZmZWN0LmdldEVuZCgpO1xuICAgICAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgICAgIGNvbnN0IHRleHQ6IGFueSA9IGxhc3RFZmZlY3QuZ2V0RnVsbFRleHQoc291cmNlKTtcblxuICAgICAgICAgIGxldCBlZmZlY3RJbnNlcnQ6IHN0cmluZztcbiAgICAgICAgICBpZiAodGV4dC5tYXRjaCgnXlxccj9cXHI/XFxuJykpIHtcbiAgICAgICAgICAgIGVmZmVjdEluc2VydCA9IGAsJHt0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccysvKVswXX0ke2VmZmVjdHNTeW1ib2x9YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWZmZWN0SW5zZXJ0ID0gYCwgJHtlZmZlY3RzU3ltYm9sfWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgZXBvcywgZWZmZWN0SW5zZXJ0KV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgdG9JbnNlcnQ6IHN0cmluZztcbiAgbGV0IHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgLy8gV2UgaGF2ZW4ndCBmb3VuZCB0aGUgZmllbGQgaW4gdGhlIG1ldGFkYXRhIGRlY2xhcmF0aW9uLiBJbnNlcnQgYSBuZXdcbiAgICAvLyBmaWVsZC5cbiAgICBjb25zdCBleHByID0gbm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbjtcbiAgICBpZiAoZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgICAgdG9JbnNlcnQgPSBgICAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gZXhwci5wcm9wZXJ0aWVzW2V4cHIucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbiAgICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICAgIGlmICh0ZXh0Lm1hdGNoKCdeXFxyP1xccj9cXG4nKSkge1xuICAgICAgICB0b0luc2VydCA9IGAsJHtcbiAgICAgICAgICB0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccysvKVswXVxuICAgICAgICB9JHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIC8vIFdlIGZvdW5kIHRoZSBmaWVsZCBidXQgaXQncyBlbXB0eS4gSW5zZXJ0IGl0IGp1c3QgYmVmb3JlIHRoZSBgXWAuXG4gICAgcG9zaXRpb24tLTtcbiAgICB0b0luc2VydCA9IGAke3N5bWJvbE5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgIGlmICh0ZXh0Lm1hdGNoKC9eXFxyP1xcbi8pKSB7XG4gICAgICB0b0luc2VydCA9IGAsJHt0ZXh0Lm1hdGNoKC9eXFxyP1xcbihcXHI/KVxccysvKVswXX0ke3N5bWJvbE5hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9JbnNlcnQgPSBgLCAke3N5bWJvbE5hbWV9YDtcbiAgICB9XG4gIH1cbiAgY29uc3QgaW5zZXJ0ID0gbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIHBvc2l0aW9uLCB0b0luc2VydCk7XG4gIGNvbnN0IGltcG9ydEluc2VydDogQ2hhbmdlID0gaW5zZXJ0SW1wb3J0KFxuICAgIHNvdXJjZSxcbiAgICBuZ01vZHVsZVBhdGgsXG4gICAgc3ltYm9sTmFtZS5yZXBsYWNlKC9cXC4uKiQvLCAnJyksXG4gICAgaW1wb3J0UGF0aFxuICApO1xuXG4gIHJldHVybiBbaW5zZXJ0LCBpbXBvcnRJbnNlcnRdO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBkZWNsYXJhdGlvbiAoY29tcG9uZW50LCBwaXBlLCBkaXJlY3RpdmUpXG4gKiBpbnRvIE5nTW9kdWxlIGRlY2xhcmF0aW9ucy4gSXQgYWxzbyBpbXBvcnRzIHRoZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdkZWNsYXJhdGlvbnMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgZGVjbGFyYXRpb24gKGNvbXBvbmVudCwgcGlwZSwgZGlyZWN0aXZlKVxuICogaW50byBOZ01vZHVsZSBkZWNsYXJhdGlvbnMuIEl0IGFsc28gaW1wb3J0cyB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2ltcG9ydHMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgcHJvdmlkZXIgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUHJvdmlkZXJUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAncHJvdmlkZXJzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhbiBleHBvcnQgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRXhwb3J0VG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2V4cG9ydHMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGFuIGV4cG9ydCBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRCb290c3RyYXBUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnYm9vdHN0cmFwJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG4iXX0=