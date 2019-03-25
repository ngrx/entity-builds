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
        define("@ngrx/entity/schematics-core/utility/ast-utils", ["require", "exports", "typescript", "@ngrx/entity/schematics-core/utility/change"], factory);
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
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node
     * @param kind
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    function findNodes(node, kind, max) {
        if (max === void 0) { max = Infinity; }
        var e_1, _a;
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
                for (var _b = __values(node.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
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
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return arr;
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
        var _a;
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
    }
    function getDecoratorMetadata(source, identifier, module) {
        var angularImports = findNodes(source, ts.SyntaxKind.ImportDeclaration)
            .map(function (node) { return _angularImportsFromNode(node, source); })
            .reduce(function (acc, current) {
            var e_2, _a;
            try {
                for (var _b = __values(Object.keys(current)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    acc[key] = current[key];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return acc;
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
            var newMetadataImport = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
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
        var importInsert = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
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
    /**
     * Add Import `import { symbolName } from fileName` if the import doesn't exit
     * already. Assumes fileToEdit can be resolved and accessed.
     * @param fileToEdit (file we want to add import to)
     * @param symbolName (item to import)
     * @param fileName (path to the file)
     * @param isDefault (if true, import follows style for importing default exports)
     * @return Change
     */
    function insertImport(source, fileToEdit, symbolName, fileName, isDefault) {
        if (isDefault === void 0) { isDefault = false; }
        var rootNode = source;
        var allImports = findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
        // get nodes that map to import statements from the file fileName
        var relevantImports = allImports.filter(function (node) {
            // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
            var importFiles = node
                .getChildren()
                .filter(function (child) { return child.kind === ts.SyntaxKind.StringLiteral; })
                .map(function (n) { return n.text; });
            return importFiles.filter(function (file) { return file === fileName; }).length === 1;
        });
        if (relevantImports.length > 0) {
            var importsAsterisk_1 = false;
            // imports from import file
            var imports_1 = [];
            relevantImports.forEach(function (n) {
                Array.prototype.push.apply(imports_1, findNodes(n, ts.SyntaxKind.Identifier));
                if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                    importsAsterisk_1 = true;
                }
            });
            // if imports * from fileName, don't add symbolName
            if (importsAsterisk_1) {
                return new change_1.NoopChange();
            }
            var importTextNodes = imports_1.filter(function (n) { return n.text === symbolName; });
            // insert import if it's not there
            if (importTextNodes.length === 0) {
                var fallbackPos_1 = findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                    findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
                return insertAfterLastOccurrence(imports_1, ", " + symbolName, fileToEdit, fallbackPos_1);
            }
            return new change_1.NoopChange();
        }
        // no such import declaration exists
        var useStrict = findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter(function (n) { return n.getText() === 'use strict'; });
        var fallbackPos = 0;
        if (useStrict.length > 0) {
            fallbackPos = useStrict[0].end;
        }
        var open = isDefault ? '' : '{ ';
        var close = isDefault ? '' : ' }';
        // if there are no imports or 'use strict' statement, insert import at beginning of file
        var insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
        var separator = insertAtBeginning ? '' : ';\n';
        var toInsert = separator + "import " + open + symbolName + close +
            (" from '" + fileName + "'" + (insertAtBeginning ? ';\n' : ''));
        return insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
    }
    exports.insertImport = insertImport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvYXN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMEJBQTBCO0lBQzFCOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUNqQyxzRUFBNEQ7SUFFNUQ7Ozs7OztPQU1HO0lBQ0gsU0FBZ0IsU0FBUyxDQUN2QixJQUFhLEVBQ2IsSUFBbUIsRUFDbkIsR0FBYztRQUFkLG9CQUFBLEVBQUEsY0FBYzs7UUFFZCxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixHQUFHLEVBQUUsQ0FBQztTQUNQO1FBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFOztnQkFDWCxLQUFvQixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7b0JBQW5DLElBQU0sS0FBSyxXQUFBO29CQUNkLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTs0QkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNoQjt3QkFDRCxHQUFHLEVBQUUsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7d0JBQ1osTUFBTTtxQkFDUDtpQkFDRjs7Ozs7Ozs7O1NBQ0Y7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUE5QkQsOEJBOEJDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQWdCLGNBQWMsQ0FBQyxVQUF5QjtRQUN0RCxJQUFNLEtBQUssR0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUUzQixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QyxLQUFLLENBQUMsT0FBTyxPQUFiLEtBQUssV0FBWSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUU7aUJBQ3RDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFoQkQsd0NBZ0JDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxlQUFlLENBQUMsS0FBYyxFQUFFLE1BQWU7UUFDdEQsT0FBTyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFNBQWdCLHlCQUF5QixDQUN2QyxLQUFnQixFQUNoQixRQUFnQixFQUNoQixJQUFZLEVBQ1osV0FBbUIsRUFDbkIsVUFBMEI7UUFFMUIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxVQUFVLEVBQUU7WUFDZCxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3JCLEdBQUcsRUFBRSxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDYixxQkFBbUIsUUFBUSxrREFBK0MsQ0FDM0UsQ0FBQztTQUNIO1FBQ0QsSUFBTSxnQkFBZ0IsR0FBVyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUV2RSxPQUFPLElBQUkscUJBQVksQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQXhCRCw4REF3QkM7SUFFRCxTQUFnQixzQkFBc0IsQ0FDcEMsT0FBc0IsRUFDdEIsSUFBYTtRQUViLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxPQUFRLElBQXNCLENBQUMsSUFBSSxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ25ELE9BQVEsSUFBeUIsQ0FBQyxJQUFJLENBQUM7U0FDeEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBWEQsd0RBV0M7SUFFRCxTQUFTLHVCQUF1QixDQUM5QixJQUEwQixFQUMxQixXQUEwQjs7UUFFMUIsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxJQUFJLFVBQWtCLENBQUM7UUFDdkIsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7Z0JBQzlCLFVBQVUsR0FBSSxFQUF1QixDQUFDLElBQUksQ0FBQztnQkFDM0MsTUFBTTtZQUNSO2dCQUNFLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2QyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQzFCLHlEQUF5RDtnQkFDekQsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO2dCQUMxQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFDM0MsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFO29CQUM1QyxzRUFBc0U7b0JBQ3RFO3dCQUNFLEdBQUUsRUFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBRyxVQUFVOzJCQUN4RDtpQkFDSDtxQkFBTTtvQkFDTCxtREFBbUQ7b0JBQ25ELElBQU0sWUFBWSxHQUFHLEVBQXFCLENBQUM7b0JBRTNDLE9BQU8sWUFBWSxDQUFDLFFBQVE7eUJBQ3pCLEdBQUcsQ0FDRixVQUFDLEVBQXNCO3dCQUNyQixPQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQXJELENBQXFELENBQ3hEO3lCQUNBLE1BQU0sQ0FBQyxVQUFDLEdBQStCLEVBQUUsSUFBWTt3QkFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQzt3QkFFdkIsT0FBTyxHQUFHLENBQUM7b0JBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNWO2FBQ0Y7WUFFRCxPQUFPLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCx1REFBdUQ7WUFDdkQsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFRCxTQUFnQixvQkFBb0IsQ0FDbEMsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsTUFBYztRQUVkLElBQU0sY0FBYyxHQUErQixTQUFTLENBQzFELE1BQU0sRUFDTixFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUNoQzthQUNFLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLHVCQUF1QixDQUFDLElBQTRCLEVBQUUsTUFBTSxDQUFDLEVBQTdELENBQTZELENBQUM7YUFDMUUsTUFBTSxDQUNMLFVBQ0UsR0FBK0IsRUFDL0IsT0FBbUM7OztnQkFFbkMsS0FBa0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBbkMsSUFBTSxHQUFHLFdBQUE7b0JBQ1osR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekI7Ozs7Ozs7OztZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1FBRUosT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDO2FBQzFCLE1BQU0sQ0FBQyxVQUFBLElBQUk7WUFDVixPQUFPLENBQ0wsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVM7Z0JBQ25DLElBQXFCLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FDdkUsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFDLElBQXFCLENBQUMsVUFBK0IsRUFBdEQsQ0FBc0QsQ0FBQzthQUNuRSxNQUFNLENBQUMsVUFBQSxJQUFJO1lBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDcEQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQTJCLENBQUM7Z0JBRTVDLE9BQU8sQ0FDTCxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVU7b0JBQ3BDLGNBQWMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUNsRCxDQUFDO2FBQ0g7aUJBQU0sSUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUM5RDtnQkFDQSxvREFBb0Q7Z0JBQ3BELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUF5QyxDQUFDO2dCQUM5RCwyRUFBMkU7Z0JBQzNFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7b0JBQ3ZELE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUVELElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1QixJQUFNLFFBQVEsR0FBSSxNQUFNLENBQUMsVUFBNEIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXRFLE9BQU8sRUFBRSxLQUFLLFVBQVUsSUFBSSxjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQzthQUN2RTtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUNMLFVBQUEsSUFBSTtZQUNGLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO1FBRC9ELENBQytELENBQ2xFO2FBQ0EsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQStCLEVBQS9DLENBQStDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBaEVELG9EQWdFQztJQUVELFNBQVMsNEJBQTRCLENBQ25DLE1BQXFCLEVBQ3JCLFlBQW9CLEVBQ3BCLGFBQXFCLEVBQ3JCLFVBQWtCLEVBQ2xCLFVBQWtCO1FBRWxCLElBQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDeEUsSUFBSSxJQUFJLEdBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsNkJBQTZCO1FBRXZELGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELCtEQUErRDtRQUMvRCxJQUFNLGtCQUFrQixHQUErQixJQUFtQyxDQUFDLFVBQVU7YUFDbEcsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUE3QyxDQUE2QyxDQUFDO1lBQzlELG1GQUFtRjtZQUNuRix5QkFBeUI7YUFDeEIsTUFBTSxDQUFDLFVBQUMsSUFBUztZQUNoQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVU7b0JBQzNCLE9BQVEsSUFBc0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDO2dCQUNsRSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYTtvQkFDOUIsT0FBUSxJQUF5QixDQUFDLElBQUksSUFBSSxhQUFhLENBQUM7YUFDM0Q7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUwsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2xDLDhFQUE4RTtZQUM5RSxJQUFNLElBQUksR0FBRyxJQUFrQyxDQUFDO1lBQ2hELElBQUksVUFBZ0IsQ0FBQztZQUNyQixJQUFJLFVBQWdCLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLFVBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixVQUFRLEdBQUcsT0FBSyxhQUFhLFdBQU0sVUFBVSxRQUFLLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELFVBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3pCLG1EQUFtRDtnQkFDbkQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsVUFBUSxHQUFHLE1BQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsV0FBTSxVQUFVLE1BQUcsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0wsVUFBUSxHQUFHLE9BQUssYUFBYSxXQUFNLFVBQVUsTUFBRyxDQUFDO2lCQUNsRDthQUNGO1lBQ0QsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLHFCQUFZLENBQzFDLFlBQVksRUFDWixVQUFRLEVBQ1IsVUFBUSxDQUNULENBQUM7WUFDRixJQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FDcEMsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFDL0IsVUFBVSxDQUNYLENBQUM7WUFFRixPQUFPLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBMEIsQ0FBQztRQUVsRSxrREFBa0Q7UUFDbEQsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBd0MsQ0FBQztRQUN2RSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQyx3QkFBd0I7WUFDeEIsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtRUFBbUUsQ0FDcEUsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBTSxTQUFTLEdBQUksSUFBNkIsQ0FBQztZQUNqRCxJQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO1lBQzNELElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDckMsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUVELElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU3QixJQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUNsQyxVQUFBLElBQUk7Z0JBQ0YsT0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7b0JBQy9DLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDL0MsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3dCQUNsRCxVQUFVLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFIbEQsQ0FHa0QsQ0FDckQsQ0FBQztZQUVGLElBQUksYUFBYSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3pELElBQU0sV0FBVyxHQUFJLGFBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUU3RCxJQUNFLFdBQVc7b0JBQ1gsV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUN6RDtvQkFDQSxJQUFNLGVBQWUsR0FBSSxXQUF5Qzt5QkFDL0QsUUFBUSxDQUFDO29CQUNOLElBQUEsNENBQXVELEVBQXBELHFCQUFvRCxDQUFDO29CQUU5RCxJQUFJLElBQUksU0FBQSxDQUFDO29CQUNULElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ2hDLElBQUksR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLENBQUMsSUFBSSxxQkFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7eUJBQU07d0JBQ0wsSUFBTSxVQUFVLEdBQUcsZUFBZSxDQUNoQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDVixDQUFDO3dCQUNuQixJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUMzQixtREFBbUQ7d0JBQ25ELElBQU0sSUFBSSxHQUFRLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRWpELElBQUksWUFBWSxTQUFRLENBQUM7d0JBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDM0IsWUFBWSxHQUFHLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFlLENBQUM7eUJBQ2pFOzZCQUFNOzRCQUNMLFlBQVksR0FBRyxPQUFLLGFBQWUsQ0FBQzt5QkFDckM7d0JBRUQsT0FBTyxDQUFDLElBQUkscUJBQVksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7cUJBQzdEO2lCQUNGO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO2FBQ0Y7U0FDRjtRQUVELElBQUksUUFBZ0IsQ0FBQztRQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUU7WUFDdEQsdUVBQXVFO1lBQ3ZFLFNBQVM7WUFDVCxJQUFNLElBQUksR0FBRyxJQUFrQyxDQUFDO1lBQ2hELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDN0IsUUFBUSxHQUFHLE9BQUssYUFBYSxXQUFNLFVBQVUsUUFBSyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixtREFBbUQ7Z0JBQ25ELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDM0IsUUFBUSxHQUFHLE1BQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FDekIsYUFBYSxXQUFNLFVBQVUsTUFBRyxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxRQUFRLEdBQUcsT0FBSyxhQUFhLFdBQU0sVUFBVSxNQUFHLENBQUM7aUJBQ2xEO2FBQ0Y7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFO1lBQzVELG9FQUFvRTtZQUNwRSxRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsR0FBRyxLQUFHLFVBQVksQ0FBQztTQUM1QjthQUFNO1lBQ0wsbURBQW1EO1lBQ25ELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4QixRQUFRLEdBQUcsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBWSxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxPQUFLLFVBQVksQ0FBQzthQUM5QjtTQUNGO1FBQ0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBTSxZQUFZLEdBQVcsWUFBWSxDQUN2QyxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUMvQixVQUFVLENBQ1gsQ0FBQztRQUVGLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQWdCLHNCQUFzQixDQUNwQyxNQUFxQixFQUNyQixVQUFrQixFQUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsd0RBYUM7SUFFRDs7O09BR0c7SUFDSCxTQUFnQixpQkFBaUIsQ0FDL0IsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsT0FBTyw0QkFBNEIsQ0FDakMsTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEVBQ1QsY0FBYyxFQUNkLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWJELDhDQWFDO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixtQkFBbUIsQ0FDakMsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsT0FBTyw0QkFBNEIsQ0FDakMsTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEVBQ1gsY0FBYyxFQUNkLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWJELGtEQWFDO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixpQkFBaUIsQ0FDL0IsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsT0FBTyw0QkFBNEIsQ0FDakMsTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEVBQ1QsY0FBYyxFQUNkLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWJELDhDQWFDO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixvQkFBb0IsQ0FDbEMsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsT0FBTyw0QkFBNEIsQ0FDakMsTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEVBQ1gsY0FBYyxFQUNkLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWJELG9EQWFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFFSCxTQUFnQixZQUFZLENBQzFCLE1BQXFCLEVBQ3JCLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLFNBQWlCO1FBQWpCLDBCQUFBLEVBQUEsaUJBQWlCO1FBRWpCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RSxpRUFBaUU7UUFDakUsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUk7WUFDNUMscUZBQXFGO1lBQ3JGLElBQU0sV0FBVyxHQUFHLElBQUk7aUJBQ3JCLFdBQVcsRUFBRTtpQkFDYixNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUExQyxDQUEwQyxDQUFDO2lCQUMzRCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQyxDQUFzQixDQUFDLElBQUksRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBRTFDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxRQUFRLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLGlCQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzVCLDJCQUEyQjtZQUMzQixJQUFNLFNBQU8sR0FBYyxFQUFFLENBQUM7WUFDOUIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDeEIsU0FBTyxFQUNQLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FDdkMsQ0FBQztnQkFDRixJQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4RCxpQkFBZSxHQUFHLElBQUksQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILG1EQUFtRDtZQUNuRCxJQUFJLGlCQUFlLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxtQkFBVSxFQUFFLENBQUM7YUFDekI7WUFFRCxJQUFNLGVBQWUsR0FBRyxTQUFPLENBQUMsTUFBTSxDQUNwQyxVQUFBLENBQUMsSUFBSSxPQUFDLENBQW1CLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBeEMsQ0FBd0MsQ0FDOUMsQ0FBQztZQUVGLGtDQUFrQztZQUNsQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxJQUFNLGFBQVcsR0FDZixTQUFTLENBQ1AsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ2YsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV6RSxPQUFPLHlCQUF5QixDQUM5QixTQUFPLEVBQ1AsT0FBSyxVQUFZLEVBQ2pCLFVBQVUsRUFDVixhQUFXLENBQ1osQ0FBQzthQUNIO1lBRUQsT0FBTyxJQUFJLG1CQUFVLEVBQUUsQ0FBQztTQUN6QjtRQUVELG9DQUFvQztRQUNwQyxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUN2RSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxZQUFZLEVBQTVCLENBQTRCLENBQ2xDLENBQUM7UUFDRixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNoQztRQUNELElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwQyx3RkFBd0Y7UUFDeEYsSUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakQsSUFBTSxRQUFRLEdBQ1QsU0FBUyxlQUFVLElBQUksR0FBRyxVQUFVLEdBQUcsS0FBTzthQUNqRCxZQUFVLFFBQVEsVUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQSxDQUFDO1FBRXpELE9BQU8seUJBQXlCLENBQzlCLFVBQVUsRUFDVixRQUFRLEVBQ1IsVUFBVSxFQUNWLFdBQVcsRUFDWCxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUF4RkQsb0NBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgQ2hhbmdlLCBJbnNlcnRDaGFuZ2UsIE5vb3BDaGFuZ2UgfSBmcm9tICcuL2NoYW5nZSc7XG5cbi8qKlxuICogRmluZCBhbGwgbm9kZXMgZnJvbSB0aGUgQVNUIGluIHRoZSBzdWJ0cmVlIG9mIG5vZGUgb2YgU3ludGF4S2luZCBraW5kLlxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSBraW5kXG4gKiBAcGFyYW0gbWF4IFRoZSBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0byByZXR1cm4uXG4gKiBAcmV0dXJuIGFsbCBub2RlcyBvZiBraW5kLCBvciBbXSBpZiBub25lIGlzIGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZXMoXG4gIG5vZGU6IHRzLk5vZGUsXG4gIGtpbmQ6IHRzLlN5bnRheEtpbmQsXG4gIG1heCA9IEluZmluaXR5XG4pOiB0cy5Ob2RlW10ge1xuICBpZiAoIW5vZGUgfHwgbWF4ID09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBhcnI6IHRzLk5vZGVbXSA9IFtdO1xuICBpZiAobm9kZS5raW5kID09PSBraW5kKSB7XG4gICAgYXJyLnB1c2gobm9kZSk7XG4gICAgbWF4LS07XG4gIH1cbiAgaWYgKG1heCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuZ2V0Q2hpbGRyZW4oKSkge1xuICAgICAgZmluZE5vZGVzKGNoaWxkLCBraW5kLCBtYXgpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIGlmIChtYXggPiAwKSB7XG4gICAgICAgICAgYXJyLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWF4LS07XG4gICAgICB9KTtcblxuICAgICAgaWYgKG1heCA8PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogR2V0IGFsbCB0aGUgbm9kZXMgZnJvbSBhIHNvdXJjZS5cbiAqIEBwYXJhbSBzb3VyY2VGaWxlIFRoZSBzb3VyY2UgZmlsZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTx0cy5Ob2RlPn0gQW4gb2JzZXJ2YWJsZSBvZiBhbGwgdGhlIG5vZGVzIGluIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2VOb2Rlcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogdHMuTm9kZVtdIHtcbiAgY29uc3Qgbm9kZXM6IHRzLk5vZGVbXSA9IFtzb3VyY2VGaWxlXTtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXMuc2hpZnQoKTtcblxuICAgIGlmIChub2RlKSB7XG4gICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgIGlmIChub2RlLmdldENoaWxkQ291bnQoc291cmNlRmlsZSkgPj0gMCkge1xuICAgICAgICBub2Rlcy51bnNoaWZ0KC4uLm5vZGUuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZm9yIHNvcnRpbmcgbm9kZXMuXG4gKiBAcmV0dXJuIGZ1bmN0aW9uIHRvIHNvcnQgbm9kZXMgaW4gaW5jcmVhc2luZyBvcmRlciBvZiBwb3NpdGlvbiBpbiBzb3VyY2VGaWxlXG4gKi9cbmZ1bmN0aW9uIG5vZGVzQnlQb3NpdGlvbihmaXJzdDogdHMuTm9kZSwgc2Vjb25kOiB0cy5Ob2RlKTogbnVtYmVyIHtcbiAgcmV0dXJuIGZpcnN0LnBvcyAtIHNlY29uZC5wb3M7XG59XG5cbi8qKlxuICogSW5zZXJ0IGB0b0luc2VydGAgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIGB0cy5TeW50YXhLaW5kW25vZGVzW2ldLmtpbmRdYFxuICogb3IgYWZ0ZXIgdGhlIGxhc3Qgb2Ygb2NjdXJlbmNlIG9mIGBzeW50YXhLaW5kYCBpZiB0aGUgbGFzdCBvY2N1cmVuY2UgaXMgYSBzdWIgY2hpbGRcbiAqIG9mIHRzLlN5bnRheEtpbmRbbm9kZXNbaV0ua2luZF0gYW5kIHNhdmUgdGhlIGNoYW5nZXMgaW4gZmlsZS5cbiAqXG4gKiBAcGFyYW0gbm9kZXMgaW5zZXJ0IGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBub2Rlc1xuICogQHBhcmFtIHRvSW5zZXJ0IHN0cmluZyB0byBpbnNlcnRcbiAqIEBwYXJhbSBmaWxlIGZpbGUgdG8gaW5zZXJ0IGNoYW5nZXMgaW50b1xuICogQHBhcmFtIGZhbGxiYWNrUG9zIHBvc2l0aW9uIHRvIGluc2VydCBpZiB0b0luc2VydCBoYXBwZW5zIHRvIGJlIHRoZSBmaXJzdCBvY2N1cmVuY2VcbiAqIEBwYXJhbSBzeW50YXhLaW5kIHRoZSB0cy5TeW50YXhLaW5kIG9mIHRoZSBzdWJjaGlsZHJlbiB0byBpbnNlcnQgYWZ0ZXJcbiAqIEByZXR1cm4gQ2hhbmdlIGluc3RhbmNlXG4gKiBAdGhyb3cgRXJyb3IgaWYgdG9JbnNlcnQgaXMgZmlyc3Qgb2NjdXJlbmNlIGJ1dCBmYWxsIGJhY2sgaXMgbm90IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgbm9kZXM6IHRzLk5vZGVbXSxcbiAgdG9JbnNlcnQ6IHN0cmluZyxcbiAgZmlsZTogc3RyaW5nLFxuICBmYWxsYmFja1BvczogbnVtYmVyLFxuICBzeW50YXhLaW5kPzogdHMuU3ludGF4S2luZFxuKTogQ2hhbmdlIHtcbiAgbGV0IGxhc3RJdGVtID0gbm9kZXMuc29ydChub2Rlc0J5UG9zaXRpb24pLnBvcCgpO1xuICBpZiAoIWxhc3RJdGVtKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cbiAgaWYgKHN5bnRheEtpbmQpIHtcbiAgICBsYXN0SXRlbSA9IGZpbmROb2RlcyhsYXN0SXRlbSwgc3ludGF4S2luZClcbiAgICAgIC5zb3J0KG5vZGVzQnlQb3NpdGlvbilcbiAgICAgIC5wb3AoKTtcbiAgfVxuICBpZiAoIWxhc3RJdGVtICYmIGZhbGxiYWNrUG9zID09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGB0cmllZCB0byBpbnNlcnQgJHt0b0luc2VydH0gYXMgZmlyc3Qgb2NjdXJlbmNlIHdpdGggbm8gZmFsbGJhY2sgcG9zaXRpb25gXG4gICAgKTtcbiAgfVxuICBjb25zdCBsYXN0SXRlbVBvc2l0aW9uOiBudW1iZXIgPSBsYXN0SXRlbSA/IGxhc3RJdGVtLmVuZCA6IGZhbGxiYWNrUG9zO1xuXG4gIHJldHVybiBuZXcgSW5zZXJ0Q2hhbmdlKGZpbGUsIGxhc3RJdGVtUG9zaXRpb24sIHRvSW5zZXJ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRlbnRPZktleUxpdGVyYWwoXG4gIF9zb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG5vZGU6IHRzLk5vZGVcbik6IHN0cmluZyB8IG51bGwge1xuICBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgIHJldHVybiAobm9kZSBhcyB0cy5JZGVudGlmaWVyKS50ZXh0O1xuICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpIHtcbiAgICByZXR1cm4gKG5vZGUgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYW5ndWxhckltcG9ydHNGcm9tTm9kZShcbiAgbm9kZTogdHMuSW1wb3J0RGVjbGFyYXRpb24sXG4gIF9zb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlXG4pOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gIGNvbnN0IG1zID0gbm9kZS5tb2R1bGVTcGVjaWZpZXI7XG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmc7XG4gIHN3aXRjaCAobXMua2luZCkge1xuICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgbW9kdWxlUGF0aCA9IChtcyBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGlmICghbW9kdWxlUGF0aC5zdGFydHNXaXRoKCdAYW5ndWxhci8nKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGlmIChub2RlLmltcG9ydENsYXVzZSkge1xuICAgIGlmIChub2RlLmltcG9ydENsYXVzZS5uYW1lKSB7XG4gICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgTmFtZSBmcm9tICdwYXRoJ2AuIElnbm9yZS5cbiAgICAgIHJldHVybiB7fTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MpIHtcbiAgICAgIGNvbnN0IG5iID0gbm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncztcbiAgICAgIGlmIChuYi5raW5kID09IHRzLlN5bnRheEtpbmQuTmFtZXNwYWNlSW1wb3J0KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCAqIGFzIG5hbWUgZnJvbSAncGF0aCdgLiBSZXR1cm4gYG5hbWUuYC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbKG5iIGFzIHRzLk5hbWVzcGFjZUltcG9ydCkubmFtZS50ZXh0ICsgJy4nXTogbW9kdWxlUGF0aCxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCB7YSxiLGN9IGZyb20gJ3BhdGgnYFxuICAgICAgICBjb25zdCBuYW1lZEltcG9ydHMgPSBuYiBhcyB0cy5OYW1lZEltcG9ydHM7XG5cbiAgICAgICAgcmV0dXJuIG5hbWVkSW1wb3J0cy5lbGVtZW50c1xuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoaXM6IHRzLkltcG9ydFNwZWNpZmllcikgPT5cbiAgICAgICAgICAgICAgaXMucHJvcGVydHlOYW1lID8gaXMucHJvcGVydHlOYW1lLnRleHQgOiBpcy5uYW1lLnRleHRcbiAgICAgICAgICApXG4gICAgICAgICAgLnJlZHVjZSgoYWNjOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSwgY3Vycjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gPSBtb2R1bGVQYXRoO1xuXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0ICdwYXRoJztgLiBOb3RoaW5nIHRvIGRvLlxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjb3JhdG9yTWV0YWRhdGEoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgaWRlbnRpZmllcjogc3RyaW5nLFxuICBtb2R1bGU6IHN0cmluZ1xuKTogdHMuTm9kZVtdIHtcbiAgY29uc3QgYW5ndWxhckltcG9ydHM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0gZmluZE5vZGVzKFxuICAgIHNvdXJjZSxcbiAgICB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uXG4gIClcbiAgICAubWFwKG5vZGUgPT4gX2FuZ3VsYXJJbXBvcnRzRnJvbU5vZGUobm9kZSBhcyB0cy5JbXBvcnREZWNsYXJhdGlvbiwgc291cmNlKSlcbiAgICAucmVkdWNlKFxuICAgICAgKFxuICAgICAgICBhY2M6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9LFxuICAgICAgICBjdXJyZW50OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfVxuICAgICAgKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGN1cnJlbnQpKSB7XG4gICAgICAgICAgYWNjW2tleV0gPSBjdXJyZW50W2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSxcbiAgICAgIHt9XG4gICAgKTtcblxuICByZXR1cm4gZ2V0U291cmNlTm9kZXMoc291cmNlKVxuICAgIC5maWx0ZXIobm9kZSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5EZWNvcmF0b3IgJiZcbiAgICAgICAgKG5vZGUgYXMgdHMuRGVjb3JhdG9yKS5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvblxuICAgICAgKTtcbiAgICB9KVxuICAgIC5tYXAobm9kZSA9PiAobm9kZSBhcyB0cy5EZWNvcmF0b3IpLmV4cHJlc3Npb24gYXMgdHMuQ2FsbEV4cHJlc3Npb24pXG4gICAgLmZpbHRlcihleHByID0+IHtcbiAgICAgIGlmIChleHByLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgaWQgPSBleHByLmV4cHJlc3Npb24gYXMgdHMuSWRlbnRpZmllcjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGlkLmdldEZ1bGxUZXh0KHNvdXJjZSkgPT0gaWRlbnRpZmllciAmJlxuICAgICAgICAgIGFuZ3VsYXJJbXBvcnRzW2lkLmdldEZ1bGxUZXh0KHNvdXJjZSldID09PSBtb2R1bGVcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGV4cHIuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uXG4gICAgICApIHtcbiAgICAgICAgLy8gVGhpcyBjb3ZlcnMgZm9vLk5nTW9kdWxlIHdoZW4gaW1wb3J0aW5nICogYXMgZm9vLlxuICAgICAgICBjb25zdCBwYUV4cHIgPSBleHByLmV4cHJlc3Npb24gYXMgdHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uO1xuICAgICAgICAvLyBJZiB0aGUgbGVmdCBleHByZXNzaW9uIGlzIG5vdCBhbiBpZGVudGlmaWVyLCBqdXN0IGdpdmUgdXAgYXQgdGhhdCBwb2ludC5cbiAgICAgICAgaWYgKHBhRXhwci5leHByZXNzaW9uLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlkID0gcGFFeHByLm5hbWUudGV4dDtcbiAgICAgICAgY29uc3QgbW9kdWxlSWQgPSAocGFFeHByLmV4cHJlc3Npb24gYXMgdHMuSWRlbnRpZmllcikuZ2V0VGV4dChzb3VyY2UpO1xuXG4gICAgICAgIHJldHVybiBpZCA9PT0gaWRlbnRpZmllciAmJiBhbmd1bGFySW1wb3J0c1ttb2R1bGVJZCArICcuJ10gPT09IG1vZHVsZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pXG4gICAgLmZpbHRlcihcbiAgICAgIGV4cHIgPT5cbiAgICAgICAgZXhwci5hcmd1bWVudHNbMF0gJiZcbiAgICAgICAgZXhwci5hcmd1bWVudHNbMF0ua2luZCA9PSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uXG4gICAgKVxuICAgIC5tYXAoZXhwciA9PiBleHByLmFyZ3VtZW50c1swXSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbik7XG59XG5cbmZ1bmN0aW9uIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbmdNb2R1bGVQYXRoOiBzdHJpbmcsXG4gIG1ldGFkYXRhRmllbGQ6IHN0cmluZyxcbiAgc3ltYm9sTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgY29uc3Qgbm9kZXMgPSBnZXREZWNvcmF0b3JNZXRhZGF0YShzb3VyY2UsICdOZ01vZHVsZScsICdAYW5ndWxhci9jb3JlJyk7XG4gIGxldCBub2RlOiBhbnkgPSBub2Rlc1swXTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcblxuICAvLyBGaW5kIHRoZSBkZWNvcmF0b3IgZGVjbGFyYXRpb24uXG4gIGlmICghbm9kZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIEdldCBhbGwgdGhlIGNoaWxkcmVuIHByb3BlcnR5IGFzc2lnbm1lbnQgb2Ygb2JqZWN0IGxpdGVyYWxzLlxuICBjb25zdCBtYXRjaGluZ1Byb3BlcnRpZXM6IHRzLk9iamVjdExpdGVyYWxFbGVtZW50W10gPSAobm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbikucHJvcGVydGllc1xuICAgIC5maWx0ZXIocHJvcCA9PiBwcm9wLmtpbmQgPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFzc2lnbm1lbnQpXG4gICAgLy8gRmlsdGVyIG91dCBldmVyeSBmaWVsZHMgdGhhdCdzIG5vdCBcIm1ldGFkYXRhRmllbGRcIi4gQWxzbyBoYW5kbGVzIHN0cmluZyBsaXRlcmFsc1xuICAgIC8vIChidXQgbm90IGV4cHJlc3Npb25zKS5cbiAgICAuZmlsdGVyKChwcm9wOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwcm9wLm5hbWU7XG4gICAgICBzd2l0Y2ggKG5hbWUua2luZCkge1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcjpcbiAgICAgICAgICByZXR1cm4gKG5hbWUgYXMgdHMuSWRlbnRpZmllcikuZ2V0VGV4dChzb3VyY2UpID09IG1ldGFkYXRhRmllbGQ7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgICAgIHJldHVybiAobmFtZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0ID09IG1ldGFkYXRhRmllbGQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAvLyBHZXQgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgaWYgKCFtYXRjaGluZ1Byb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKG1hdGNoaW5nUHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgIC8vIFdlIGhhdmVuJ3QgZm91bmQgdGhlIGZpZWxkIGluIHRoZSBtZXRhZGF0YSBkZWNsYXJhdGlvbi4gSW5zZXJ0IGEgbmV3IGZpZWxkLlxuICAgIGNvbnN0IGV4cHIgPSBub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uO1xuICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuICAgIGxldCB0b0luc2VydDogc3RyaW5nO1xuICAgIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgICB0b0luc2VydCA9IGAgICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XVxcbmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBleHByLnByb3BlcnRpZXNbZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuICAgICAgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHRleHQubWF0Y2goL15cXHI/XFxuXFxzKi8pO1xuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0b0luc2VydCA9IGAsJHttYXRjaGVzWzBdfSR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0luc2VydCA9IGAsICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5ld01ldGFkYXRhUHJvcGVydHkgPSBuZXcgSW5zZXJ0Q2hhbmdlKFxuICAgICAgbmdNb2R1bGVQYXRoLFxuICAgICAgcG9zaXRpb24sXG4gICAgICB0b0luc2VydFxuICAgICk7XG4gICAgY29uc3QgbmV3TWV0YWRhdGFJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBuZ01vZHVsZVBhdGgsXG4gICAgICBzeW1ib2xOYW1lLnJlcGxhY2UoL1xcLi4qJC8sICcnKSxcbiAgICAgIGltcG9ydFBhdGhcbiAgICApO1xuXG4gICAgcmV0dXJuIFtuZXdNZXRhZGF0YVByb3BlcnR5LCBuZXdNZXRhZGF0YUltcG9ydF07XG4gIH1cblxuICBjb25zdCBhc3NpZ25tZW50ID0gbWF0Y2hpbmdQcm9wZXJ0aWVzWzBdIGFzIHRzLlByb3BlcnR5QXNzaWdubWVudDtcblxuICAvLyBJZiBpdCdzIG5vdCBhbiBhcnJheSwgbm90aGluZyB3ZSBjYW4gZG8gcmVhbGx5LlxuICBpZiAoYXNzaWdubWVudC5pbml0aWFsaXplci5raW5kICE9PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBhcnJMaXRlcmFsID0gYXNzaWdubWVudC5pbml0aWFsaXplciBhcyB0cy5BcnJheUxpdGVyYWxFeHByZXNzaW9uO1xuICBpZiAoYXJyTGl0ZXJhbC5lbGVtZW50cy5sZW5ndGggPT0gMCkge1xuICAgIC8vIEZvcndhcmQgdGhlIHByb3BlcnR5LlxuICAgIG5vZGUgPSBhcnJMaXRlcmFsO1xuICB9IGVsc2Uge1xuICAgIG5vZGUgPSBhcnJMaXRlcmFsLmVsZW1lbnRzO1xuICB9XG5cbiAgaWYgKCFub2RlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnTm8gYXBwIG1vZHVsZSBmb3VuZC4gUGxlYXNlIGFkZCB5b3VyIG5ldyBjbGFzcyB0byB5b3VyIGNvbXBvbmVudC4nXG4gICAgKTtcblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgY29uc3Qgbm9kZUFycmF5ID0gKG5vZGUgYXMge30pIGFzIEFycmF5PHRzLk5vZGU+O1xuICAgIGNvbnN0IHN5bWJvbHNBcnJheSA9IG5vZGVBcnJheS5tYXAobm9kZSA9PiBub2RlLmdldFRleHQoKSk7XG4gICAgaWYgKHN5bWJvbHNBcnJheS5pbmNsdWRlcyhzeW1ib2xOYW1lKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIG5vZGUgPSBub2RlW25vZGUubGVuZ3RoIC0gMV07XG5cbiAgICBjb25zdCBlZmZlY3RzTW9kdWxlID0gbm9kZUFycmF5LmZpbmQoXG4gICAgICBub2RlID0+XG4gICAgICAgIChub2RlLmdldFRleHQoKS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JSb290JykgJiZcbiAgICAgICAgICBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvclJvb3QnKSkgfHxcbiAgICAgICAgKG5vZGUuZ2V0VGV4dCgpLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUnKSAmJlxuICAgICAgICAgIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZScpKVxuICAgICk7XG5cbiAgICBpZiAoZWZmZWN0c01vZHVsZSAmJiBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlJykpIHtcbiAgICAgIGNvbnN0IGVmZmVjdHNBcmdzID0gKGVmZmVjdHNNb2R1bGUgYXMgYW55KS5hcmd1bWVudHMuc2hpZnQoKTtcblxuICAgICAgaWYgKFxuICAgICAgICBlZmZlY3RzQXJncyAmJlxuICAgICAgICBlZmZlY3RzQXJncy5raW5kID09PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb25cbiAgICAgICkge1xuICAgICAgICBjb25zdCBlZmZlY3RzRWxlbWVudHMgPSAoZWZmZWN0c0FyZ3MgYXMgdHMuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbilcbiAgICAgICAgICAuZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IFssIGVmZmVjdHNTeW1ib2xdID0gKDxhbnk+c3ltYm9sTmFtZSkubWF0Y2goL1xcWyguKilcXF0vKTtcblxuICAgICAgICBsZXQgZXBvcztcbiAgICAgICAgaWYgKGVmZmVjdHNFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBlcG9zID0gZWZmZWN0c0FyZ3MuZ2V0U3RhcnQoKSArIDE7XG4gICAgICAgICAgcmV0dXJuIFtuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgZXBvcywgZWZmZWN0c1N5bWJvbCldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGxhc3RFZmZlY3QgPSBlZmZlY3RzRWxlbWVudHNbXG4gICAgICAgICAgICBlZmZlY3RzRWxlbWVudHMubGVuZ3RoIC0gMVxuICAgICAgICAgIF0gYXMgdHMuRXhwcmVzc2lvbjtcbiAgICAgICAgICBlcG9zID0gbGFzdEVmZmVjdC5nZXRFbmQoKTtcbiAgICAgICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgICAgICBjb25zdCB0ZXh0OiBhbnkgPSBsYXN0RWZmZWN0LmdldEZ1bGxUZXh0KHNvdXJjZSk7XG5cbiAgICAgICAgICBsZXQgZWZmZWN0SW5zZXJ0OiBzdHJpbmc7XG4gICAgICAgICAgaWYgKHRleHQubWF0Y2goJ15cXHI/XFxyP1xcbicpKSB7XG4gICAgICAgICAgICBlZmZlY3RJbnNlcnQgPSBgLCR7dGV4dC5tYXRjaCgvXlxccj9cXG5cXHMrLylbMF19JHtlZmZlY3RzU3ltYm9sfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVmZmVjdEluc2VydCA9IGAsICR7ZWZmZWN0c1N5bWJvbH1gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBbbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIGVwb3MsIGVmZmVjdEluc2VydCldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHRvSW5zZXJ0OiBzdHJpbmc7XG4gIGxldCBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIC8vIFdlIGhhdmVuJ3QgZm91bmQgdGhlIGZpZWxkIGluIHRoZSBtZXRhZGF0YSBkZWNsYXJhdGlvbi4gSW5zZXJ0IGEgbmV3XG4gICAgLy8gZmllbGQuXG4gICAgY29uc3QgZXhwciA9IG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb247XG4gICAgaWYgKGV4cHIucHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgICAgcG9zaXRpb24gPSBleHByLmdldEVuZCgpIC0gMTtcbiAgICAgIHRvSW5zZXJ0ID0gYCAgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dXFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGV4cHIucHJvcGVydGllc1tleHByLnByb3BlcnRpZXMubGVuZ3RoIC0gMV07XG4gICAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgICBpZiAodGV4dC5tYXRjaCgnXlxccj9cXHI/XFxuJykpIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCR7XG4gICAgICAgICAgdGV4dC5tYXRjaCgvXlxccj9cXG5cXHMrLylbMF1cbiAgICAgICAgfSR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0luc2VydCA9IGAsICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICAvLyBXZSBmb3VuZCB0aGUgZmllbGQgYnV0IGl0J3MgZW1wdHkuIEluc2VydCBpdCBqdXN0IGJlZm9yZSB0aGUgYF1gLlxuICAgIHBvc2l0aW9uLS07XG4gICAgdG9JbnNlcnQgPSBgJHtzeW1ib2xOYW1lfWA7XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICBpZiAodGV4dC5tYXRjaCgvXlxccj9cXG4vKSkge1xuICAgICAgdG9JbnNlcnQgPSBgLCR7dGV4dC5tYXRjaCgvXlxccj9cXG4oXFxyPylcXHMrLylbMF19JHtzeW1ib2xOYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCwgJHtzeW1ib2xOYW1lfWA7XG4gICAgfVxuICB9XG4gIGNvbnN0IGluc2VydCA9IG5ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBwb3NpdGlvbiwgdG9JbnNlcnQpO1xuICBjb25zdCBpbXBvcnRJbnNlcnQ6IENoYW5nZSA9IGluc2VydEltcG9ydChcbiAgICBzb3VyY2UsXG4gICAgbmdNb2R1bGVQYXRoLFxuICAgIHN5bWJvbE5hbWUucmVwbGFjZSgvXFwuLiokLywgJycpLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcblxuICByZXR1cm4gW2luc2VydCwgaW1wb3J0SW5zZXJ0XTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgZGVjbGFyYXRpb24gKGNvbXBvbmVudCwgcGlwZSwgZGlyZWN0aXZlKVxuICogaW50byBOZ01vZHVsZSBkZWNsYXJhdGlvbnMuIEl0IGFsc28gaW1wb3J0cyB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVjbGFyYXRpb25Ub01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnZGVjbGFyYXRpb25zJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIGRlY2xhcmF0aW9uIChjb21wb25lbnQsIHBpcGUsIGRpcmVjdGl2ZSlcbiAqIGludG8gTmdNb2R1bGUgZGVjbGFyYXRpb25zLiBJdCBhbHNvIGltcG9ydHMgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEltcG9ydFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdpbXBvcnRzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIHByb3ZpZGVyIGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFByb3ZpZGVyVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ3Byb3ZpZGVycycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYW4gZXhwb3J0IGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEV4cG9ydFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdleHBvcnRzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhbiBleHBvcnQgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2Jvb3RzdHJhcCcsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEFkZCBJbXBvcnQgYGltcG9ydCB7IHN5bWJvbE5hbWUgfSBmcm9tIGZpbGVOYW1lYCBpZiB0aGUgaW1wb3J0IGRvZXNuJ3QgZXhpdFxuICogYWxyZWFkeS4gQXNzdW1lcyBmaWxlVG9FZGl0IGNhbiBiZSByZXNvbHZlZCBhbmQgYWNjZXNzZWQuXG4gKiBAcGFyYW0gZmlsZVRvRWRpdCAoZmlsZSB3ZSB3YW50IHRvIGFkZCBpbXBvcnQgdG8pXG4gKiBAcGFyYW0gc3ltYm9sTmFtZSAoaXRlbSB0byBpbXBvcnQpXG4gKiBAcGFyYW0gZmlsZU5hbWUgKHBhdGggdG8gdGhlIGZpbGUpXG4gKiBAcGFyYW0gaXNEZWZhdWx0IChpZiB0cnVlLCBpbXBvcnQgZm9sbG93cyBzdHlsZSBmb3IgaW1wb3J0aW5nIGRlZmF1bHQgZXhwb3J0cylcbiAqIEByZXR1cm4gQ2hhbmdlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEltcG9ydChcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBmaWxlVG9FZGl0OiBzdHJpbmcsXG4gIHN5bWJvbE5hbWU6IHN0cmluZyxcbiAgZmlsZU5hbWU6IHN0cmluZyxcbiAgaXNEZWZhdWx0ID0gZmFsc2Vcbik6IENoYW5nZSB7XG4gIGNvbnN0IHJvb3ROb2RlID0gc291cmNlO1xuICBjb25zdCBhbGxJbXBvcnRzID0gZmluZE5vZGVzKHJvb3ROb2RlLCB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uKTtcblxuICAvLyBnZXQgbm9kZXMgdGhhdCBtYXAgdG8gaW1wb3J0IHN0YXRlbWVudHMgZnJvbSB0aGUgZmlsZSBmaWxlTmFtZVxuICBjb25zdCByZWxldmFudEltcG9ydHMgPSBhbGxJbXBvcnRzLmZpbHRlcihub2RlID0+IHtcbiAgICAvLyBTdHJpbmdMaXRlcmFsIG9mIHRoZSBJbXBvcnREZWNsYXJhdGlvbiBpcyB0aGUgaW1wb3J0IGZpbGUgKGZpbGVOYW1lIGluIHRoaXMgY2FzZSkuXG4gICAgY29uc3QgaW1wb3J0RmlsZXMgPSBub2RlXG4gICAgICAuZ2V0Q2hpbGRyZW4oKVxuICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5raW5kID09PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpXG4gICAgICAubWFwKG4gPT4gKG4gYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dCk7XG5cbiAgICByZXR1cm4gaW1wb3J0RmlsZXMuZmlsdGVyKGZpbGUgPT4gZmlsZSA9PT0gZmlsZU5hbWUpLmxlbmd0aCA9PT0gMTtcbiAgfSk7XG5cbiAgaWYgKHJlbGV2YW50SW1wb3J0cy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGltcG9ydHNBc3RlcmlzayA9IGZhbHNlO1xuICAgIC8vIGltcG9ydHMgZnJvbSBpbXBvcnQgZmlsZVxuICAgIGNvbnN0IGltcG9ydHM6IHRzLk5vZGVbXSA9IFtdO1xuICAgIHJlbGV2YW50SW1wb3J0cy5mb3JFYWNoKG4gPT4ge1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoXG4gICAgICAgIGltcG9ydHMsXG4gICAgICAgIGZpbmROb2RlcyhuLCB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpXG4gICAgICApO1xuICAgICAgaWYgKGZpbmROb2RlcyhuLCB0cy5TeW50YXhLaW5kLkFzdGVyaXNrVG9rZW4pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaW1wb3J0c0FzdGVyaXNrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIGltcG9ydHMgKiBmcm9tIGZpbGVOYW1lLCBkb24ndCBhZGQgc3ltYm9sTmFtZVxuICAgIGlmIChpbXBvcnRzQXN0ZXJpc2spIHtcbiAgICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGltcG9ydFRleHROb2RlcyA9IGltcG9ydHMuZmlsdGVyKFxuICAgICAgbiA9PiAobiBhcyB0cy5JZGVudGlmaWVyKS50ZXh0ID09PSBzeW1ib2xOYW1lXG4gICAgKTtcblxuICAgIC8vIGluc2VydCBpbXBvcnQgaWYgaXQncyBub3QgdGhlcmVcbiAgICBpZiAoaW1wb3J0VGV4dE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgZmFsbGJhY2tQb3MgPVxuICAgICAgICBmaW5kTm9kZXMoXG4gICAgICAgICAgcmVsZXZhbnRJbXBvcnRzWzBdLFxuICAgICAgICAgIHRzLlN5bnRheEtpbmQuQ2xvc2VCcmFjZVRva2VuXG4gICAgICAgIClbMF0uZ2V0U3RhcnQoKSB8fFxuICAgICAgICBmaW5kTm9kZXMocmVsZXZhbnRJbXBvcnRzWzBdLCB0cy5TeW50YXhLaW5kLkZyb21LZXl3b3JkKVswXS5nZXRTdGFydCgpO1xuXG4gICAgICByZXR1cm4gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgICAgICAgaW1wb3J0cyxcbiAgICAgICAgYCwgJHtzeW1ib2xOYW1lfWAsXG4gICAgICAgIGZpbGVUb0VkaXQsXG4gICAgICAgIGZhbGxiYWNrUG9zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICB9XG5cbiAgLy8gbm8gc3VjaCBpbXBvcnQgZGVjbGFyYXRpb24gZXhpc3RzXG4gIGNvbnN0IHVzZVN0cmljdCA9IGZpbmROb2Rlcyhyb290Tm9kZSwgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKS5maWx0ZXIoXG4gICAgbiA9PiBuLmdldFRleHQoKSA9PT0gJ3VzZSBzdHJpY3QnXG4gICk7XG4gIGxldCBmYWxsYmFja1BvcyA9IDA7XG4gIGlmICh1c2VTdHJpY3QubGVuZ3RoID4gMCkge1xuICAgIGZhbGxiYWNrUG9zID0gdXNlU3RyaWN0WzBdLmVuZDtcbiAgfVxuICBjb25zdCBvcGVuID0gaXNEZWZhdWx0ID8gJycgOiAneyAnO1xuICBjb25zdCBjbG9zZSA9IGlzRGVmYXVsdCA/ICcnIDogJyB9JztcbiAgLy8gaWYgdGhlcmUgYXJlIG5vIGltcG9ydHMgb3IgJ3VzZSBzdHJpY3QnIHN0YXRlbWVudCwgaW5zZXJ0IGltcG9ydCBhdCBiZWdpbm5pbmcgb2YgZmlsZVxuICBjb25zdCBpbnNlcnRBdEJlZ2lubmluZyA9IGFsbEltcG9ydHMubGVuZ3RoID09PSAwICYmIHVzZVN0cmljdC5sZW5ndGggPT09IDA7XG4gIGNvbnN0IHNlcGFyYXRvciA9IGluc2VydEF0QmVnaW5uaW5nID8gJycgOiAnO1xcbic7XG4gIGNvbnN0IHRvSW5zZXJ0ID1cbiAgICBgJHtzZXBhcmF0b3J9aW1wb3J0ICR7b3Blbn0ke3N5bWJvbE5hbWV9JHtjbG9zZX1gICtcbiAgICBgIGZyb20gJyR7ZmlsZU5hbWV9JyR7aW5zZXJ0QXRCZWdpbm5pbmcgPyAnO1xcbicgOiAnJ31gO1xuXG4gIHJldHVybiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICAgIGFsbEltcG9ydHMsXG4gICAgdG9JbnNlcnQsXG4gICAgZmlsZVRvRWRpdCxcbiAgICBmYWxsYmFja1BvcyxcbiAgICB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWxcbiAgKTtcbn1cbiJdfQ==