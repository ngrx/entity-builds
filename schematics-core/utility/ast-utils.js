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
    const ts = require("typescript");
    const change_1 = require("@ngrx/entity/schematics-core/utility/change");
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node
     * @param kind
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    function findNodes(node, kind, max = Infinity) {
        if (!node || max == 0) {
            return [];
        }
        const arr = [];
        if (node.kind === kind) {
            arr.push(node);
            max--;
        }
        if (max > 0) {
            for (const child of node.getChildren()) {
                findNodes(child, kind, max).forEach(node => {
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
        return arr;
    }
    exports.findNodes = findNodes;
    /**
     * Get all the nodes from a source.
     * @param sourceFile The source file object.
     * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
     */
    function getSourceNodes(sourceFile) {
        const nodes = [sourceFile];
        const result = [];
        while (nodes.length > 0) {
            const node = nodes.shift();
            if (node) {
                result.push(node);
                if (node.getChildCount(sourceFile) >= 0) {
                    nodes.unshift(...node.getChildren());
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
        let lastItem = nodes.sort(nodesByPosition).pop();
        if (!lastItem) {
            throw new Error();
        }
        if (syntaxKind) {
            lastItem = findNodes(lastItem, syntaxKind)
                .sort(nodesByPosition)
                .pop();
        }
        if (!lastItem && fallbackPos == undefined) {
            throw new Error(`tried to insert ${toInsert} as first occurence with no fallback position`);
        }
        const lastItemPosition = lastItem ? lastItem.end : fallbackPos;
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
        const ms = node.moduleSpecifier;
        let modulePath;
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
                const nb = node.importClause.namedBindings;
                if (nb.kind == ts.SyntaxKind.NamespaceImport) {
                    // This is of the form `import * as name from 'path'`. Return `name.`.
                    return {
                        [nb.name.text + '.']: modulePath,
                    };
                }
                else {
                    // This is of the form `import {a,b,c} from 'path'`
                    const namedImports = nb;
                    return namedImports.elements
                        .map((is) => is.propertyName ? is.propertyName.text : is.name.text)
                        .reduce((acc, curr) => {
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
        const angularImports = findNodes(source, ts.SyntaxKind.ImportDeclaration)
            .map(node => _angularImportsFromNode(node, source))
            .reduce((acc, current) => {
            for (const key of Object.keys(current)) {
                acc[key] = current[key];
            }
            return acc;
        }, {});
        return getSourceNodes(source)
            .filter(node => {
            return (node.kind == ts.SyntaxKind.Decorator &&
                node.expression.kind == ts.SyntaxKind.CallExpression);
        })
            .map(node => node.expression)
            .filter(expr => {
            if (expr.expression.kind == ts.SyntaxKind.Identifier) {
                const id = expr.expression;
                return (id.getFullText(source) == identifier &&
                    angularImports[id.getFullText(source)] === module);
            }
            else if (expr.expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // This covers foo.NgModule when importing * as foo.
                const paExpr = expr.expression;
                // If the left expression is not an identifier, just give up at that point.
                if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
                    return false;
                }
                const id = paExpr.name.text;
                const moduleId = paExpr.expression.getText(source);
                return id === identifier && angularImports[moduleId + '.'] === module;
            }
            return false;
        })
            .filter(expr => expr.arguments[0] &&
            expr.arguments[0].kind == ts.SyntaxKind.ObjectLiteralExpression)
            .map(expr => expr.arguments[0]);
    }
    exports.getDecoratorMetadata = getDecoratorMetadata;
    function _addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath) {
        const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
        let node = nodes[0]; // tslint:disable-line:no-any
        // Find the decorator declaration.
        if (!node) {
            return [];
        }
        // Get all the children property assignment of object literals.
        const matchingProperties = node.properties
            .filter(prop => prop.kind == ts.SyntaxKind.PropertyAssignment)
            // Filter out every fields that's not "metadataField". Also handles string literals
            // (but not expressions).
            .filter((prop) => {
            const name = prop.name;
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
            const expr = node;
            let position;
            let toInsert;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = `  ${metadataField}: [${symbolName}]\n`;
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                const text = node.getFullText(source);
                const matches = text.match(/^\r?\n\s*/);
                if (matches.length > 0) {
                    toInsert = `,${matches[0]}${metadataField}: [${symbolName}]`;
                }
                else {
                    toInsert = `, ${metadataField}: [${symbolName}]`;
                }
            }
            const newMetadataProperty = new change_1.InsertChange(ngModulePath, position, toInsert);
            const newMetadataImport = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
            return [newMetadataProperty, newMetadataImport];
        }
        const assignment = matchingProperties[0];
        // If it's not an array, nothing we can do really.
        if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return [];
        }
        const arrLiteral = assignment.initializer;
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
            const nodeArray = node;
            const symbolsArray = nodeArray.map(node => node.getText());
            if (symbolsArray.includes(symbolName)) {
                return [];
            }
            node = node[node.length - 1];
            const effectsModule = nodeArray.find(node => (node.getText().includes('EffectsModule.forRoot') &&
                symbolName.includes('EffectsModule.forRoot')) ||
                (node.getText().includes('EffectsModule.forFeature') &&
                    symbolName.includes('EffectsModule.forFeature')));
            if (effectsModule && symbolName.includes('EffectsModule')) {
                const effectsArgs = effectsModule.arguments.shift();
                if (effectsArgs &&
                    effectsArgs.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                    const effectsElements = effectsArgs
                        .elements;
                    const [, effectsSymbol] = symbolName.match(/\[(.*)\]/);
                    let epos;
                    if (effectsElements.length === 0) {
                        epos = effectsArgs.getStart() + 1;
                        return [new change_1.InsertChange(ngModulePath, epos, effectsSymbol)];
                    }
                    else {
                        const lastEffect = effectsElements[effectsElements.length - 1];
                        epos = lastEffect.getEnd();
                        // Get the indentation of the last element, if any.
                        const text = lastEffect.getFullText(source);
                        let effectInsert;
                        if (text.match('^\r?\r?\n')) {
                            effectInsert = `,${text.match(/^\r?\n\s+/)[0]}${effectsSymbol}`;
                        }
                        else {
                            effectInsert = `, ${effectsSymbol}`;
                        }
                        return [new change_1.InsertChange(ngModulePath, epos, effectInsert)];
                    }
                }
                else {
                    return [];
                }
            }
        }
        let toInsert;
        let position = node.getEnd();
        if (node.kind == ts.SyntaxKind.ObjectLiteralExpression) {
            // We haven't found the field in the metadata declaration. Insert a new
            // field.
            const expr = node;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = `  ${metadataField}: [${symbolName}]\n`;
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                const text = node.getFullText(source);
                if (text.match('^\r?\r?\n')) {
                    toInsert = `,${text.match(/^\r?\n\s+/)[0]}${metadataField}: [${symbolName}]`;
                }
                else {
                    toInsert = `, ${metadataField}: [${symbolName}]`;
                }
            }
        }
        else if (node.kind == ts.SyntaxKind.ArrayLiteralExpression) {
            // We found the field but it's empty. Insert it just before the `]`.
            position--;
            toInsert = `${symbolName}`;
        }
        else {
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            if (text.match(/^\r?\n/)) {
                toInsert = `,${text.match(/^\r?\n(\r?)\s+/)[0]}${symbolName}`;
            }
            else {
                toInsert = `, ${symbolName}`;
            }
        }
        const insert = new change_1.InsertChange(ngModulePath, position, toInsert);
        const importInsert = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
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
    function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false) {
        const rootNode = source;
        const allImports = findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
        // get nodes that map to import statements from the file fileName
        const relevantImports = allImports.filter(node => {
            // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
            const importFiles = node
                .getChildren()
                .filter(child => child.kind === ts.SyntaxKind.StringLiteral)
                .map(n => n.text);
            return importFiles.filter(file => file === fileName).length === 1;
        });
        if (relevantImports.length > 0) {
            let importsAsterisk = false;
            // imports from import file
            const imports = [];
            relevantImports.forEach(n => {
                Array.prototype.push.apply(imports, findNodes(n, ts.SyntaxKind.Identifier));
                if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                    importsAsterisk = true;
                }
            });
            // if imports * from fileName, don't add symbolName
            if (importsAsterisk) {
                return new change_1.NoopChange();
            }
            const importTextNodes = imports.filter(n => n.text === symbolName);
            // insert import if it's not there
            if (importTextNodes.length === 0) {
                const fallbackPos = findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                    findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
                return insertAfterLastOccurrence(imports, `, ${symbolName}`, fileToEdit, fallbackPos);
            }
            return new change_1.NoopChange();
        }
        // no such import declaration exists
        const useStrict = findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter(n => n.getText() === 'use strict');
        let fallbackPos = 0;
        if (useStrict.length > 0) {
            fallbackPos = useStrict[0].end;
        }
        const open = isDefault ? '' : '{ ';
        const close = isDefault ? '' : ' }';
        // if there are no imports or 'use strict' statement, insert import at beginning of file
        const insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
        const separator = insertAtBeginning ? '' : ';\n';
        const toInsert = `${separator}import ${open}${symbolName}${close}` +
            ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;
        return insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
    }
    exports.insertImport = insertImport;
    function replaceImport(sourceFile, path, importFrom, importAsIs, importToBe) {
        const imports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(({ moduleSpecifier }) => moduleSpecifier.getText(sourceFile) === `'${importFrom}'` ||
            moduleSpecifier.getText(sourceFile) === `"${importFrom}"`);
        if (imports.length === 0) {
            return [];
        }
        const importText = (specifier) => {
            if (specifier.name.text) {
                return specifier.name.text;
            }
            // if import is renamed
            if (specifier.propertyName && specifier.propertyName.text) {
                return specifier.propertyName.text;
            }
            return '';
        };
        const changes = imports.map(p => {
            const importSpecifiers = p.importClause.namedBindings
                .elements;
            const isAlreadyImported = importSpecifiers
                .map(importText)
                .includes(importToBe);
            const importChanges = importSpecifiers.map((specifier, index) => {
                const text = importText(specifier);
                // import is not the one we're looking for, can be skipped
                if (text !== importAsIs) {
                    return undefined;
                }
                // identifier has not been imported, simply replace the old text with the new text
                if (!isAlreadyImported) {
                    return change_1.createReplaceChange(sourceFile, specifier, importAsIs, importToBe);
                }
                const nextIdentifier = importSpecifiers[index + 1];
                // identifer is not the last, also clean up the comma
                if (nextIdentifier) {
                    return change_1.createRemoveChange(sourceFile, specifier, specifier.getStart(sourceFile), nextIdentifier.getStart(sourceFile));
                }
                // there are no imports following, just remove it
                return change_1.createRemoveChange(sourceFile, specifier, specifier.getStart(sourceFile), specifier.getEnd());
            });
            return importChanges.filter(Boolean);
        });
        return changes.reduce((imports, curr) => imports.concat(curr), []);
    }
    exports.replaceImport = replaceImport;
    function containsProperty(objectLiteral, propertyName) {
        return (objectLiteral &&
            objectLiteral.properties.some(prop => ts.isPropertyAssignment(prop) &&
                ts.isIdentifier(prop.name) &&
                prop.name.text === propertyName));
    }
    exports.containsProperty = containsProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvYXN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMEJBQTBCO0lBQzFCOzs7Ozs7T0FNRztJQUNILGlDQUFpQztJQUNqQyx3RUFRa0I7SUFHbEI7Ozs7OztPQU1HO0lBQ0gsU0FBZ0IsU0FBUyxDQUN2QixJQUFhLEVBQ2IsSUFBbUIsRUFDbkIsR0FBRyxHQUFHLFFBQVE7UUFFZCxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixHQUFHLEVBQUUsQ0FBQztTQUNQO1FBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3RDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO3dCQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hCO29CQUNELEdBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtvQkFDWixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQTlCRCw4QkE4QkM7SUFFRDs7OztPQUlH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QUUsQ0FDbkIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBcUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQWxGRCxzQ0FrRkM7SUFFRCxTQUFnQixnQkFBZ0IsQ0FDOUIsYUFBeUMsRUFDekMsWUFBb0I7UUFFcEIsT0FBTyxDQUNMLGFBQWE7WUFDYixhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDM0IsSUFBSSxDQUFDLEVBQUUsQ0FDTCxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUM3QixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FDbEMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWJELDRDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIE5vb3BDaGFuZ2UsXG4gIGNyZWF0ZVJlcGxhY2VDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG4gIFJlbW92ZUNoYW5nZSxcbiAgY3JlYXRlUmVtb3ZlQ2hhbmdlLFxufSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG4vKipcbiAqIEZpbmQgYWxsIG5vZGVzIGZyb20gdGhlIEFTVCBpbiB0aGUgc3VidHJlZSBvZiBub2RlIG9mIFN5bnRheEtpbmQga2luZC5cbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0ga2luZFxuICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gcmV0dXJuLlxuICogQHJldHVybiBhbGwgbm9kZXMgb2Yga2luZCwgb3IgW10gaWYgbm9uZSBpcyBmb3VuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGVzKFxuICBub2RlOiB0cy5Ob2RlLFxuICBraW5kOiB0cy5TeW50YXhLaW5kLFxuICBtYXggPSBJbmZpbml0eVxuKTogdHMuTm9kZVtdIHtcbiAgaWYgKCFub2RlIHx8IG1heCA9PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgYXJyOiB0cy5Ob2RlW10gPSBbXTtcbiAgaWYgKG5vZGUua2luZCA9PT0ga2luZCkge1xuICAgIGFyci5wdXNoKG5vZGUpO1xuICAgIG1heC0tO1xuICB9XG4gIGlmIChtYXggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmdldENoaWxkcmVuKCkpIHtcbiAgICAgIGZpbmROb2RlcyhjaGlsZCwga2luZCwgbWF4KS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobWF4ID4gMCkge1xuICAgICAgICAgIGFyci5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIG1heC0tO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChtYXggPD0gMCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIEdldCBhbGwgdGhlIG5vZGVzIGZyb20gYSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlRmlsZSBUaGUgc291cmNlIGZpbGUgb2JqZWN0LlxuICogQHJldHVybnMge09ic2VydmFibGU8dHMuTm9kZT59IEFuIG9ic2VydmFibGUgb2YgYWxsIHRoZSBub2RlcyBpbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlTm9kZXMoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLk5vZGVbXSB7XG4gIGNvbnN0IG5vZGVzOiB0cy5Ob2RlW10gPSBbc291cmNlRmlsZV07XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICBpZiAobm9kZS5nZXRDaGlsZENvdW50KHNvdXJjZUZpbGUpID49IDApIHtcbiAgICAgICAgbm9kZXMudW5zaGlmdCguLi5ub2RlLmdldENoaWxkcmVuKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBzb3J0aW5nIG5vZGVzLlxuICogQHJldHVybiBmdW5jdGlvbiB0byBzb3J0IG5vZGVzIGluIGluY3JlYXNpbmcgb3JkZXIgb2YgcG9zaXRpb24gaW4gc291cmNlRmlsZVxuICovXG5mdW5jdGlvbiBub2Rlc0J5UG9zaXRpb24oZmlyc3Q6IHRzLk5vZGUsIHNlY29uZDogdHMuTm9kZSk6IG51bWJlciB7XG4gIHJldHVybiBmaXJzdC5wb3MgLSBzZWNvbmQucG9zO1xufVxuXG4vKipcbiAqIEluc2VydCBgdG9JbnNlcnRgIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBgdHMuU3ludGF4S2luZFtub2Rlc1tpXS5raW5kXWBcbiAqIG9yIGFmdGVyIHRoZSBsYXN0IG9mIG9jY3VyZW5jZSBvZiBgc3ludGF4S2luZGAgaWYgdGhlIGxhc3Qgb2NjdXJlbmNlIGlzIGEgc3ViIGNoaWxkXG4gKiBvZiB0cy5TeW50YXhLaW5kW25vZGVzW2ldLmtpbmRdIGFuZCBzYXZlIHRoZSBjaGFuZ2VzIGluIGZpbGUuXG4gKlxuICogQHBhcmFtIG5vZGVzIGluc2VydCBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2Ygbm9kZXNcbiAqIEBwYXJhbSB0b0luc2VydCBzdHJpbmcgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gZmlsZSBmaWxlIHRvIGluc2VydCBjaGFuZ2VzIGludG9cbiAqIEBwYXJhbSBmYWxsYmFja1BvcyBwb3NpdGlvbiB0byBpbnNlcnQgaWYgdG9JbnNlcnQgaGFwcGVucyB0byBiZSB0aGUgZmlyc3Qgb2NjdXJlbmNlXG4gKiBAcGFyYW0gc3ludGF4S2luZCB0aGUgdHMuU3ludGF4S2luZCBvZiB0aGUgc3ViY2hpbGRyZW4gdG8gaW5zZXJ0IGFmdGVyXG4gKiBAcmV0dXJuIENoYW5nZSBpbnN0YW5jZVxuICogQHRocm93IEVycm9yIGlmIHRvSW5zZXJ0IGlzIGZpcnN0IG9jY3VyZW5jZSBidXQgZmFsbCBiYWNrIGlzIG5vdCBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gIG5vZGVzOiB0cy5Ob2RlW10sXG4gIHRvSW5zZXJ0OiBzdHJpbmcsXG4gIGZpbGU6IHN0cmluZyxcbiAgZmFsbGJhY2tQb3M6IG51bWJlcixcbiAgc3ludGF4S2luZD86IHRzLlN5bnRheEtpbmRcbik6IENoYW5nZSB7XG4gIGxldCBsYXN0SXRlbSA9IG5vZGVzLnNvcnQobm9kZXNCeVBvc2l0aW9uKS5wb3AoKTtcbiAgaWYgKCFsYXN0SXRlbSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIGlmIChzeW50YXhLaW5kKSB7XG4gICAgbGFzdEl0ZW0gPSBmaW5kTm9kZXMobGFzdEl0ZW0sIHN5bnRheEtpbmQpXG4gICAgICAuc29ydChub2Rlc0J5UG9zaXRpb24pXG4gICAgICAucG9wKCk7XG4gIH1cbiAgaWYgKCFsYXN0SXRlbSAmJiBmYWxsYmFja1BvcyA9PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgdHJpZWQgdG8gaW5zZXJ0ICR7dG9JbnNlcnR9IGFzIGZpcnN0IG9jY3VyZW5jZSB3aXRoIG5vIGZhbGxiYWNrIHBvc2l0aW9uYFxuICAgICk7XG4gIH1cbiAgY29uc3QgbGFzdEl0ZW1Qb3NpdGlvbjogbnVtYmVyID0gbGFzdEl0ZW0gPyBsYXN0SXRlbS5lbmQgOiBmYWxsYmFja1BvcztcblxuICByZXR1cm4gbmV3IEluc2VydENoYW5nZShmaWxlLCBsYXN0SXRlbVBvc2l0aW9uLCB0b0luc2VydCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50T2ZLZXlMaXRlcmFsKFxuICBfc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBub2RlOiB0cy5Ob2RlXG4pOiBzdHJpbmcgfCBudWxsIHtcbiAgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gKG5vZGUgYXMgdHMuSWRlbnRpZmllcikudGV4dDtcbiAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgcmV0dXJuIChub2RlIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FuZ3VsYXJJbXBvcnRzRnJvbU5vZGUoXG4gIG5vZGU6IHRzLkltcG9ydERlY2xhcmF0aW9uLFxuICBfc291cmNlRmlsZTogdHMuU291cmNlRmlsZVxuKTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICBjb25zdCBtcyA9IG5vZGUubW9kdWxlU3BlY2lmaWVyO1xuICBsZXQgbW9kdWxlUGF0aDogc3RyaW5nO1xuICBzd2l0Y2ggKG1zLmtpbmQpIHtcbiAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgIG1vZHVsZVBhdGggPSAobXMgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge307XG4gIH1cblxuICBpZiAoIW1vZHVsZVBhdGguc3RhcnRzV2l0aCgnQGFuZ3VsYXIvJykpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBpZiAobm9kZS5pbXBvcnRDbGF1c2UpIHtcbiAgICBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZSkge1xuICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0IE5hbWUgZnJvbSAncGF0aCdgLiBJZ25vcmUuXG4gICAgICByZXR1cm4ge307XG4gICAgfSBlbHNlIGlmIChub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzKSB7XG4gICAgICBjb25zdCBuYiA9IG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3M7XG4gICAgICBpZiAobmIua2luZCA9PSB0cy5TeW50YXhLaW5kLk5hbWVzcGFjZUltcG9ydCkge1xuICAgICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgKiBhcyBuYW1lIGZyb20gJ3BhdGgnYC4gUmV0dXJuIGBuYW1lLmAuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgWyhuYiBhcyB0cy5OYW1lc3BhY2VJbXBvcnQpLm5hbWUudGV4dCArICcuJ106IG1vZHVsZVBhdGgsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQge2EsYixjfSBmcm9tICdwYXRoJ2BcbiAgICAgICAgY29uc3QgbmFtZWRJbXBvcnRzID0gbmIgYXMgdHMuTmFtZWRJbXBvcnRzO1xuXG4gICAgICAgIHJldHVybiBuYW1lZEltcG9ydHMuZWxlbWVudHNcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGlzOiB0cy5JbXBvcnRTcGVjaWZpZXIpID0+XG4gICAgICAgICAgICAgIGlzLnByb3BlcnR5TmFtZSA/IGlzLnByb3BlcnR5TmFtZS50ZXh0IDogaXMubmFtZS50ZXh0XG4gICAgICAgICAgKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sIGN1cnI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgYWNjW2N1cnJdID0gbW9kdWxlUGF0aDtcblxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHt9O1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCAncGF0aCc7YC4gTm90aGluZyB0byBkby5cbiAgICByZXR1cm4ge307XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlY29yYXRvck1ldGFkYXRhKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgbW9kdWxlOiBzdHJpbmdcbik6IHRzLk5vZGVbXSB7XG4gIGNvbnN0IGFuZ3VsYXJJbXBvcnRzOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IGZpbmROb2RlcyhcbiAgICBzb3VyY2UsXG4gICAgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvblxuICApXG4gICAgLm1hcChub2RlID0+IF9hbmd1bGFySW1wb3J0c0Zyb21Ob2RlKG5vZGUgYXMgdHMuSW1wb3J0RGVjbGFyYXRpb24sIHNvdXJjZSkpXG4gICAgLnJlZHVjZShcbiAgICAgIChcbiAgICAgICAgYWNjOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgICAgICAgY3VycmVudDogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH1cbiAgICAgICkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjdXJyZW50KSkge1xuICAgICAgICAgIGFjY1trZXldID0gY3VycmVudFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIGdldFNvdXJjZU5vZGVzKHNvdXJjZSlcbiAgICAuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuRGVjb3JhdG9yICYmXG4gICAgICAgIChub2RlIGFzIHRzLkRlY29yYXRvcikuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb25cbiAgICAgICk7XG4gICAgfSlcbiAgICAubWFwKG5vZGUgPT4gKG5vZGUgYXMgdHMuRGVjb3JhdG9yKS5leHByZXNzaW9uIGFzIHRzLkNhbGxFeHByZXNzaW9uKVxuICAgIC5maWx0ZXIoZXhwciA9PiB7XG4gICAgICBpZiAoZXhwci5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IGlkID0gZXhwci5leHByZXNzaW9uIGFzIHRzLklkZW50aWZpZXI7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBpZC5nZXRGdWxsVGV4dChzb3VyY2UpID09IGlkZW50aWZpZXIgJiZcbiAgICAgICAgICBhbmd1bGFySW1wb3J0c1tpZC5nZXRGdWxsVGV4dChzb3VyY2UpXSA9PT0gbW9kdWxlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBleHByLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvblxuICAgICAgKSB7XG4gICAgICAgIC8vIFRoaXMgY292ZXJzIGZvby5OZ01vZHVsZSB3aGVuIGltcG9ydGluZyAqIGFzIGZvby5cbiAgICAgICAgY29uc3QgcGFFeHByID0gZXhwci5leHByZXNzaW9uIGFzIHRzLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbjtcbiAgICAgICAgLy8gSWYgdGhlIGxlZnQgZXhwcmVzc2lvbiBpcyBub3QgYW4gaWRlbnRpZmllciwganVzdCBnaXZlIHVwIGF0IHRoYXQgcG9pbnQuXG4gICAgICAgIGlmIChwYUV4cHIuZXhwcmVzc2lvbi5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZCA9IHBhRXhwci5uYW1lLnRleHQ7XG4gICAgICAgIGNvbnN0IG1vZHVsZUlkID0gKHBhRXhwci5leHByZXNzaW9uIGFzIHRzLklkZW50aWZpZXIpLmdldFRleHQoc291cmNlKTtcblxuICAgICAgICByZXR1cm4gaWQgPT09IGlkZW50aWZpZXIgJiYgYW5ndWxhckltcG9ydHNbbW9kdWxlSWQgKyAnLiddID09PSBtb2R1bGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KVxuICAgIC5maWx0ZXIoXG4gICAgICBleHByID0+XG4gICAgICAgIGV4cHIuYXJndW1lbnRzWzBdICYmXG4gICAgICAgIGV4cHIuYXJndW1lbnRzWzBdLmtpbmQgPT0gdHMuU3ludGF4S2luZC5PYmplY3RMaXRlcmFsRXhwcmVzc2lvblxuICAgIClcbiAgICAubWFwKGV4cHIgPT4gZXhwci5hcmd1bWVudHNbMF0gYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pO1xufVxuXG5mdW5jdGlvbiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG5nTW9kdWxlUGF0aDogc3RyaW5nLFxuICBtZXRhZGF0YUZpZWxkOiBzdHJpbmcsXG4gIHN5bWJvbE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIGNvbnN0IG5vZGVzID0gZ2V0RGVjb3JhdG9yTWV0YWRhdGEoc291cmNlLCAnTmdNb2R1bGUnLCAnQGFuZ3VsYXIvY29yZScpO1xuICBsZXQgbm9kZTogYW55ID0gbm9kZXNbMF07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG5cbiAgLy8gRmluZCB0aGUgZGVjb3JhdG9yIGRlY2xhcmF0aW9uLlxuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBHZXQgYWxsIHRoZSBjaGlsZHJlbiBwcm9wZXJ0eSBhc3NpZ25tZW50IG9mIG9iamVjdCBsaXRlcmFscy5cbiAgY29uc3QgbWF0Y2hpbmdQcm9wZXJ0aWVzOiB0cy5PYmplY3RMaXRlcmFsRWxlbWVudFtdID0gKG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pLnByb3BlcnRpZXNcbiAgICAuZmlsdGVyKHByb3AgPT4gcHJvcC5raW5kID09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlBc3NpZ25tZW50KVxuICAgIC8vIEZpbHRlciBvdXQgZXZlcnkgZmllbGRzIHRoYXQncyBub3QgXCJtZXRhZGF0YUZpZWxkXCIuIEFsc28gaGFuZGxlcyBzdHJpbmcgbGl0ZXJhbHNcbiAgICAvLyAoYnV0IG5vdCBleHByZXNzaW9ucykuXG4gICAgLmZpbHRlcigocHJvcDogYW55KSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gcHJvcC5uYW1lO1xuICAgICAgc3dpdGNoIChuYW1lLmtpbmQpIHtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXI6XG4gICAgICAgICAgcmV0dXJuIChuYW1lIGFzIHRzLklkZW50aWZpZXIpLmdldFRleHQoc291cmNlKSA9PSBtZXRhZGF0YUZpZWxkO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgICAgICByZXR1cm4gKG5hbWUgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dCA9PSBtZXRhZGF0YUZpZWxkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgLy8gR2V0IHRoZSBsYXN0IG5vZGUgb2YgdGhlIGFycmF5IGxpdGVyYWwuXG4gIGlmICghbWF0Y2hpbmdQcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChtYXRjaGluZ1Byb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAvLyBXZSBoYXZlbid0IGZvdW5kIHRoZSBmaWVsZCBpbiB0aGUgbWV0YWRhdGEgZGVjbGFyYXRpb24uIEluc2VydCBhIG5ldyBmaWVsZC5cbiAgICBjb25zdCBleHByID0gbm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbjtcbiAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcbiAgICBsZXQgdG9JbnNlcnQ6IHN0cmluZztcbiAgICBpZiAoZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgICAgdG9JbnNlcnQgPSBgICAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gZXhwci5wcm9wZXJ0aWVzW2V4cHIucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbiAgICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccyovKTtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCR7bWF0Y2hlc1swXX0ke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBuZXdNZXRhZGF0YVByb3BlcnR5ID0gbmV3IEluc2VydENoYW5nZShcbiAgICAgIG5nTW9kdWxlUGF0aCxcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgdG9JbnNlcnRcbiAgICApO1xuICAgIGNvbnN0IG5ld01ldGFkYXRhSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbmdNb2R1bGVQYXRoLFxuICAgICAgc3ltYm9sTmFtZS5yZXBsYWNlKC9cXC4uKiQvLCAnJyksXG4gICAgICBpbXBvcnRQYXRoXG4gICAgKTtcblxuICAgIHJldHVybiBbbmV3TWV0YWRhdGFQcm9wZXJ0eSwgbmV3TWV0YWRhdGFJbXBvcnRdO1xuICB9XG5cbiAgY29uc3QgYXNzaWdubWVudCA9IG1hdGNoaW5nUHJvcGVydGllc1swXSBhcyB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQ7XG5cbiAgLy8gSWYgaXQncyBub3QgYW4gYXJyYXksIG5vdGhpbmcgd2UgY2FuIGRvIHJlYWxseS5cbiAgaWYgKGFzc2lnbm1lbnQuaW5pdGlhbGl6ZXIua2luZCAhPT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgYXJyTGl0ZXJhbCA9IGFzc2lnbm1lbnQuaW5pdGlhbGl6ZXIgYXMgdHMuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbjtcbiAgaWYgKGFyckxpdGVyYWwuZWxlbWVudHMubGVuZ3RoID09IDApIHtcbiAgICAvLyBGb3J3YXJkIHRoZSBwcm9wZXJ0eS5cbiAgICBub2RlID0gYXJyTGl0ZXJhbDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gYXJyTGl0ZXJhbC5lbGVtZW50cztcbiAgfVxuXG4gIGlmICghbm9kZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ05vIGFwcCBtb2R1bGUgZm91bmQuIFBsZWFzZSBhZGQgeW91ciBuZXcgY2xhc3MgdG8geW91ciBjb21wb25lbnQuJ1xuICAgICk7XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGNvbnN0IG5vZGVBcnJheSA9IChub2RlIGFzIHt9KSBhcyBBcnJheTx0cy5Ob2RlPjtcbiAgICBjb25zdCBzeW1ib2xzQXJyYXkgPSBub2RlQXJyYXkubWFwKG5vZGUgPT4gbm9kZS5nZXRUZXh0KCkpO1xuICAgIGlmIChzeW1ib2xzQXJyYXkuaW5jbHVkZXMoc3ltYm9sTmFtZSkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBub2RlID0gbm9kZVtub2RlLmxlbmd0aCAtIDFdO1xuXG4gICAgY29uc3QgZWZmZWN0c01vZHVsZSA9IG5vZGVBcnJheS5maW5kKFxuICAgICAgbm9kZSA9PlxuICAgICAgICAobm9kZS5nZXRUZXh0KCkuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yUm9vdCcpICYmXG4gICAgICAgICAgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JSb290JykpIHx8XG4gICAgICAgIChub2RlLmdldFRleHQoKS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlJykgJiZcbiAgICAgICAgICBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUnKSlcbiAgICApO1xuXG4gICAgaWYgKGVmZmVjdHNNb2R1bGUgJiYgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZScpKSB7XG4gICAgICBjb25zdCBlZmZlY3RzQXJncyA9IChlZmZlY3RzTW9kdWxlIGFzIGFueSkuYXJndW1lbnRzLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZWZmZWN0c0FyZ3MgJiZcbiAgICAgICAgZWZmZWN0c0FyZ3Mua2luZCA9PT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZWZmZWN0c0VsZW1lbnRzID0gKGVmZmVjdHNBcmdzIGFzIHRzLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pXG4gICAgICAgICAgLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCBbLCBlZmZlY3RzU3ltYm9sXSA9ICg8YW55PnN5bWJvbE5hbWUpLm1hdGNoKC9cXFsoLiopXFxdLyk7XG5cbiAgICAgICAgbGV0IGVwb3M7XG4gICAgICAgIGlmIChlZmZlY3RzRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZXBvcyA9IGVmZmVjdHNBcmdzLmdldFN0YXJ0KCkgKyAxO1xuICAgICAgICAgIHJldHVybiBbbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIGVwb3MsIGVmZmVjdHNTeW1ib2wpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBsYXN0RWZmZWN0ID0gZWZmZWN0c0VsZW1lbnRzW1xuICAgICAgICAgICAgZWZmZWN0c0VsZW1lbnRzLmxlbmd0aCAtIDFcbiAgICAgICAgICBdIGFzIHRzLkV4cHJlc3Npb247XG4gICAgICAgICAgZXBvcyA9IGxhc3RFZmZlY3QuZ2V0RW5kKCk7XG4gICAgICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICAgICAgY29uc3QgdGV4dDogYW55ID0gbGFzdEVmZmVjdC5nZXRGdWxsVGV4dChzb3VyY2UpO1xuXG4gICAgICAgICAgbGV0IGVmZmVjdEluc2VydDogc3RyaW5nO1xuICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKCdeXFxyP1xccj9cXG4nKSkge1xuICAgICAgICAgICAgZWZmZWN0SW5zZXJ0ID0gYCwke3RleHQubWF0Y2goL15cXHI/XFxuXFxzKy8pWzBdfSR7ZWZmZWN0c1N5bWJvbH1gO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZmZlY3RJbnNlcnQgPSBgLCAke2VmZmVjdHNTeW1ib2x9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gW25ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBlcG9zLCBlZmZlY3RJbnNlcnQpXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCB0b0luc2VydDogc3RyaW5nO1xuICBsZXQgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICAvLyBXZSBoYXZlbid0IGZvdW5kIHRoZSBmaWVsZCBpbiB0aGUgbWV0YWRhdGEgZGVjbGFyYXRpb24uIEluc2VydCBhIG5ld1xuICAgIC8vIGZpZWxkLlxuICAgIGNvbnN0IGV4cHIgPSBub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uO1xuICAgIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgICB0b0luc2VydCA9IGAgICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XVxcbmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBleHByLnByb3BlcnRpZXNbZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuICAgICAgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgICAgaWYgKHRleHQubWF0Y2goJ15cXHI/XFxyP1xcbicpKSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwke1xuICAgICAgICAgIHRleHQubWF0Y2goL15cXHI/XFxuXFxzKy8pWzBdXG4gICAgICAgIH0ke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgLy8gV2UgZm91bmQgdGhlIGZpZWxkIGJ1dCBpdCdzIGVtcHR5LiBJbnNlcnQgaXQganVzdCBiZWZvcmUgdGhlIGBdYC5cbiAgICBwb3NpdGlvbi0tO1xuICAgIHRvSW5zZXJ0ID0gYCR7c3ltYm9sTmFtZX1gO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgaWYgKHRleHQubWF0Y2goL15cXHI/XFxuLykpIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCwke3RleHQubWF0Y2goL15cXHI/XFxuKFxccj8pXFxzKy8pWzBdfSR7c3ltYm9sTmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b0luc2VydCA9IGAsICR7c3ltYm9sTmFtZX1gO1xuICAgIH1cbiAgfVxuICBjb25zdCBpbnNlcnQgPSBuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgcG9zaXRpb24sIHRvSW5zZXJ0KTtcbiAgY29uc3QgaW1wb3J0SW5zZXJ0OiBDaGFuZ2UgPSBpbnNlcnRJbXBvcnQoXG4gICAgc291cmNlLFxuICAgIG5nTW9kdWxlUGF0aCxcbiAgICBzeW1ib2xOYW1lLnJlcGxhY2UoL1xcLi4qJC8sICcnKSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG5cbiAgcmV0dXJuIFtpbnNlcnQsIGltcG9ydEluc2VydF07XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIGRlY2xhcmF0aW9uIChjb21wb25lbnQsIHBpcGUsIGRpcmVjdGl2ZSlcbiAqIGludG8gTmdNb2R1bGUgZGVjbGFyYXRpb25zLiBJdCBhbHNvIGltcG9ydHMgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2RlY2xhcmF0aW9ucycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBkZWNsYXJhdGlvbiAoY29tcG9uZW50LCBwaXBlLCBkaXJlY3RpdmUpXG4gKiBpbnRvIE5nTW9kdWxlIGRlY2xhcmF0aW9ucy4gSXQgYWxzbyBpbXBvcnRzIHRoZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnaW1wb3J0cycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBwcm92aWRlciBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcm92aWRlclRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdwcm92aWRlcnMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGFuIGV4cG9ydCBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRFeHBvcnRUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnZXhwb3J0cycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYW4gZXhwb3J0IGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdib290c3RyYXAnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBBZGQgSW1wb3J0IGBpbXBvcnQgeyBzeW1ib2xOYW1lIH0gZnJvbSBmaWxlTmFtZWAgaWYgdGhlIGltcG9ydCBkb2Vzbid0IGV4aXRcbiAqIGFscmVhZHkuIEFzc3VtZXMgZmlsZVRvRWRpdCBjYW4gYmUgcmVzb2x2ZWQgYW5kIGFjY2Vzc2VkLlxuICogQHBhcmFtIGZpbGVUb0VkaXQgKGZpbGUgd2Ugd2FudCB0byBhZGQgaW1wb3J0IHRvKVxuICogQHBhcmFtIHN5bWJvbE5hbWUgKGl0ZW0gdG8gaW1wb3J0KVxuICogQHBhcmFtIGZpbGVOYW1lIChwYXRoIHRvIHRoZSBmaWxlKVxuICogQHBhcmFtIGlzRGVmYXVsdCAoaWYgdHJ1ZSwgaW1wb3J0IGZvbGxvd3Mgc3R5bGUgZm9yIGltcG9ydGluZyBkZWZhdWx0IGV4cG9ydHMpXG4gKiBAcmV0dXJuIENoYW5nZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRJbXBvcnQoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgZmlsZVRvRWRpdDogc3RyaW5nLFxuICBzeW1ib2xOYW1lOiBzdHJpbmcsXG4gIGZpbGVOYW1lOiBzdHJpbmcsXG4gIGlzRGVmYXVsdCA9IGZhbHNlXG4pOiBDaGFuZ2Uge1xuICBjb25zdCByb290Tm9kZSA9IHNvdXJjZTtcbiAgY29uc3QgYWxsSW1wb3J0cyA9IGZpbmROb2Rlcyhyb290Tm9kZSwgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbik7XG5cbiAgLy8gZ2V0IG5vZGVzIHRoYXQgbWFwIHRvIGltcG9ydCBzdGF0ZW1lbnRzIGZyb20gdGhlIGZpbGUgZmlsZU5hbWVcbiAgY29uc3QgcmVsZXZhbnRJbXBvcnRzID0gYWxsSW1wb3J0cy5maWx0ZXIobm9kZSA9PiB7XG4gICAgLy8gU3RyaW5nTGl0ZXJhbCBvZiB0aGUgSW1wb3J0RGVjbGFyYXRpb24gaXMgdGhlIGltcG9ydCBmaWxlIChmaWxlTmFtZSBpbiB0aGlzIGNhc2UpLlxuICAgIGNvbnN0IGltcG9ydEZpbGVzID0gbm9kZVxuICAgICAgLmdldENoaWxkcmVuKClcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQua2luZCA9PT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKVxuICAgICAgLm1hcChuID0+IChuIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQpO1xuXG4gICAgcmV0dXJuIGltcG9ydEZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUgPT09IGZpbGVOYW1lKS5sZW5ndGggPT09IDE7XG4gIH0pO1xuXG4gIGlmIChyZWxldmFudEltcG9ydHMubGVuZ3RoID4gMCkge1xuICAgIGxldCBpbXBvcnRzQXN0ZXJpc2sgPSBmYWxzZTtcbiAgICAvLyBpbXBvcnRzIGZyb20gaW1wb3J0IGZpbGVcbiAgICBjb25zdCBpbXBvcnRzOiB0cy5Ob2RlW10gPSBbXTtcbiAgICByZWxldmFudEltcG9ydHMuZm9yRWFjaChuID0+IHtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFxuICAgICAgICBpbXBvcnRzLFxuICAgICAgICBmaW5kTm9kZXMobiwgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKVxuICAgICAgKTtcbiAgICAgIGlmIChmaW5kTm9kZXMobiwgdHMuU3ludGF4S2luZC5Bc3Rlcmlza1Rva2VuKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGltcG9ydHNBc3RlcmlzayA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiBpbXBvcnRzICogZnJvbSBmaWxlTmFtZSwgZG9uJ3QgYWRkIHN5bWJvbE5hbWVcbiAgICBpZiAoaW1wb3J0c0FzdGVyaXNrKSB7XG4gICAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRUZXh0Tm9kZXMgPSBpbXBvcnRzLmZpbHRlcihcbiAgICAgIG4gPT4gKG4gYXMgdHMuSWRlbnRpZmllcikudGV4dCA9PT0gc3ltYm9sTmFtZVxuICAgICk7XG5cbiAgICAvLyBpbnNlcnQgaW1wb3J0IGlmIGl0J3Mgbm90IHRoZXJlXG4gICAgaWYgKGltcG9ydFRleHROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGZhbGxiYWNrUG9zID1cbiAgICAgICAgZmluZE5vZGVzKFxuICAgICAgICAgIHJlbGV2YW50SW1wb3J0c1swXSxcbiAgICAgICAgICB0cy5TeW50YXhLaW5kLkNsb3NlQnJhY2VUb2tlblxuICAgICAgICApWzBdLmdldFN0YXJ0KCkgfHxcbiAgICAgICAgZmluZE5vZGVzKHJlbGV2YW50SW1wb3J0c1swXSwgdHMuU3ludGF4S2luZC5Gcm9tS2V5d29yZClbMF0uZ2V0U3RhcnQoKTtcblxuICAgICAgcmV0dXJuIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gICAgICAgIGltcG9ydHMsXG4gICAgICAgIGAsICR7c3ltYm9sTmFtZX1gLFxuICAgICAgICBmaWxlVG9FZGl0LFxuICAgICAgICBmYWxsYmFja1Bvc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgfVxuXG4gIC8vIG5vIHN1Y2ggaW1wb3J0IGRlY2xhcmF0aW9uIGV4aXN0c1xuICBjb25zdCB1c2VTdHJpY3QgPSBmaW5kTm9kZXMocm9vdE5vZGUsIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkuZmlsdGVyKFxuICAgIG4gPT4gbi5nZXRUZXh0KCkgPT09ICd1c2Ugc3RyaWN0J1xuICApO1xuICBsZXQgZmFsbGJhY2tQb3MgPSAwO1xuICBpZiAodXNlU3RyaWN0Lmxlbmd0aCA+IDApIHtcbiAgICBmYWxsYmFja1BvcyA9IHVzZVN0cmljdFswXS5lbmQ7XG4gIH1cbiAgY29uc3Qgb3BlbiA9IGlzRGVmYXVsdCA/ICcnIDogJ3sgJztcbiAgY29uc3QgY2xvc2UgPSBpc0RlZmF1bHQgPyAnJyA6ICcgfSc7XG4gIC8vIGlmIHRoZXJlIGFyZSBubyBpbXBvcnRzIG9yICd1c2Ugc3RyaWN0JyBzdGF0ZW1lbnQsIGluc2VydCBpbXBvcnQgYXQgYmVnaW5uaW5nIG9mIGZpbGVcbiAgY29uc3QgaW5zZXJ0QXRCZWdpbm5pbmcgPSBhbGxJbXBvcnRzLmxlbmd0aCA9PT0gMCAmJiB1c2VTdHJpY3QubGVuZ3RoID09PSAwO1xuICBjb25zdCBzZXBhcmF0b3IgPSBpbnNlcnRBdEJlZ2lubmluZyA/ICcnIDogJztcXG4nO1xuICBjb25zdCB0b0luc2VydCA9XG4gICAgYCR7c2VwYXJhdG9yfWltcG9ydCAke29wZW59JHtzeW1ib2xOYW1lfSR7Y2xvc2V9YCArXG4gICAgYCBmcm9tICcke2ZpbGVOYW1lfScke2luc2VydEF0QmVnaW5uaW5nID8gJztcXG4nIDogJyd9YDtcblxuICByZXR1cm4gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgICBhbGxJbXBvcnRzLFxuICAgIHRvSW5zZXJ0LFxuICAgIGZpbGVUb0VkaXQsXG4gICAgZmFsbGJhY2tQb3MsXG4gICAgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlSW1wb3J0KFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBwYXRoOiBQYXRoLFxuICBpbXBvcnRGcm9tOiBzdHJpbmcsXG4gIGltcG9ydEFzSXM6IHN0cmluZyxcbiAgaW1wb3J0VG9CZTogc3RyaW5nXG4pOiAoUmVwbGFjZUNoYW5nZSB8IFJlbW92ZUNoYW5nZSlbXSB7XG4gIGNvbnN0IGltcG9ydHMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNcbiAgICAuZmlsdGVyKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLmZpbHRlcihcbiAgICAgICh7IG1vZHVsZVNwZWNpZmllciB9KSA9PlxuICAgICAgICBtb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gYCcke2ltcG9ydEZyb219J2AgfHxcbiAgICAgICAgbW9kdWxlU3BlY2lmaWVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IGBcIiR7aW1wb3J0RnJvbX1cImBcbiAgICApO1xuXG4gIGlmIChpbXBvcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGltcG9ydFRleHQgPSAoc3BlY2lmaWVyOiB0cy5JbXBvcnRTcGVjaWZpZXIpID0+IHtcbiAgICBpZiAoc3BlY2lmaWVyLm5hbWUudGV4dCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllci5uYW1lLnRleHQ7XG4gICAgfVxuXG4gICAgLy8gaWYgaW1wb3J0IGlzIHJlbmFtZWRcbiAgICBpZiAoc3BlY2lmaWVyLnByb3BlcnR5TmFtZSAmJiBzcGVjaWZpZXIucHJvcGVydHlOYW1lLnRleHQpIHtcbiAgICAgIHJldHVybiBzcGVjaWZpZXIucHJvcGVydHlOYW1lLnRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBpbXBvcnRzLm1hcChwID0+IHtcbiAgICBjb25zdCBpbXBvcnRTcGVjaWZpZXJzID0gKHAuaW1wb3J0Q2xhdXNlIS5uYW1lZEJpbmRpbmdzISBhcyB0cy5OYW1lZEltcG9ydHMpXG4gICAgICAuZWxlbWVudHM7XG5cbiAgICBjb25zdCBpc0FscmVhZHlJbXBvcnRlZCA9IGltcG9ydFNwZWNpZmllcnNcbiAgICAgIC5tYXAoaW1wb3J0VGV4dClcbiAgICAgIC5pbmNsdWRlcyhpbXBvcnRUb0JlKTtcblxuICAgIGNvbnN0IGltcG9ydENoYW5nZXMgPSBpbXBvcnRTcGVjaWZpZXJzLm1hcCgoc3BlY2lmaWVyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGltcG9ydFRleHQoc3BlY2lmaWVyKTtcblxuICAgICAgLy8gaW1wb3J0IGlzIG5vdCB0aGUgb25lIHdlJ3JlIGxvb2tpbmcgZm9yLCBjYW4gYmUgc2tpcHBlZFxuICAgICAgaWYgKHRleHQgIT09IGltcG9ydEFzSXMpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgLy8gaWRlbnRpZmllciBoYXMgbm90IGJlZW4gaW1wb3J0ZWQsIHNpbXBseSByZXBsYWNlIHRoZSBvbGQgdGV4dCB3aXRoIHRoZSBuZXcgdGV4dFxuICAgICAgaWYgKCFpc0FscmVhZHlJbXBvcnRlZCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUmVwbGFjZUNoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIHNwZWNpZmllciEsXG4gICAgICAgICAgaW1wb3J0QXNJcyxcbiAgICAgICAgICBpbXBvcnRUb0JlXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHRJZGVudGlmaWVyID0gaW1wb3J0U3BlY2lmaWVyc1tpbmRleCArIDFdO1xuICAgICAgLy8gaWRlbnRpZmVyIGlzIG5vdCB0aGUgbGFzdCwgYWxzbyBjbGVhbiB1cCB0aGUgY29tbWFcbiAgICAgIGlmIChuZXh0SWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gY3JlYXRlUmVtb3ZlQ2hhbmdlKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgc3BlY2lmaWVyLFxuICAgICAgICAgIHNwZWNpZmllci5nZXRTdGFydChzb3VyY2VGaWxlKSxcbiAgICAgICAgICBuZXh0SWRlbnRpZmllci5nZXRTdGFydChzb3VyY2VGaWxlKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyB0aGVyZSBhcmUgbm8gaW1wb3J0cyBmb2xsb3dpbmcsIGp1c3QgcmVtb3ZlIGl0XG4gICAgICByZXR1cm4gY3JlYXRlUmVtb3ZlQ2hhbmdlKFxuICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICBzcGVjaWZpZXIsXG4gICAgICAgIHNwZWNpZmllci5nZXRTdGFydChzb3VyY2VGaWxlKSxcbiAgICAgICAgc3BlY2lmaWVyLmdldEVuZCgpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltcG9ydENoYW5nZXMuZmlsdGVyKEJvb2xlYW4pIGFzIChSZXBsYWNlQ2hhbmdlIHwgUmVtb3ZlQ2hhbmdlKVtdO1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcy5yZWR1Y2UoKGltcG9ydHMsIGN1cnIpID0+IGltcG9ydHMuY29uY2F0KGN1cnIpLCBbXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1Byb3BlcnR5KFxuICBvYmplY3RMaXRlcmFsOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbixcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmdcbikge1xuICByZXR1cm4gKFxuICAgIG9iamVjdExpdGVyYWwgJiZcbiAgICBvYmplY3RMaXRlcmFsLnByb3BlcnRpZXMuc29tZShcbiAgICAgIHByb3AgPT5cbiAgICAgICAgdHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQocHJvcCkgJiZcbiAgICAgICAgdHMuaXNJZGVudGlmaWVyKHByb3AubmFtZSkgJiZcbiAgICAgICAgcHJvcC5uYW1lLnRleHQgPT09IHByb3BlcnR5TmFtZVxuICAgIClcbiAgKTtcbn1cbiJdfQ==