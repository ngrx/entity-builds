(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ngrx/entity', ['exports', '@ngrx/store', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.entity = {}), global.ngrx.store, global.ng.core));
}(this, (function (exports, store, core) { 'use strict';

    function getInitialEntityState() {
        return {
            ids: [],
            entities: {},
        };
    }
    function createInitialStateFactory() {
        function getInitialState(additionalState) {
            if (additionalState === void 0) { additionalState = {}; }
            return Object.assign(getInitialEntityState(), additionalState);
        }
        return { getInitialState: getInitialState };
    }

    function createSelectorsFactory() {
        function getSelectors(selectState) {
            var selectIds = function (state) { return state.ids; };
            var selectEntities = function (state) { return state.entities; };
            var selectAll = store.createSelector(selectIds, selectEntities, function (ids, entities) { return ids.map(function (id) { return entities[id]; }); });
            var selectTotal = store.createSelector(selectIds, function (ids) { return ids.length; });
            if (!selectState) {
                return {
                    selectIds: selectIds,
                    selectEntities: selectEntities,
                    selectAll: selectAll,
                    selectTotal: selectTotal,
                };
            }
            return {
                selectIds: store.createSelector(selectState, selectIds),
                selectEntities: store.createSelector(selectState, selectEntities),
                selectAll: store.createSelector(selectState, selectAll),
                selectTotal: store.createSelector(selectState, selectTotal),
            };
        }
        return { getSelectors: getSelectors };
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var DidMutate;
    (function (DidMutate) {
        DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
        DidMutate[DidMutate["Both"] = 1] = "Both";
        DidMutate[DidMutate["None"] = 2] = "None";
    })(DidMutate || (DidMutate = {}));
    function createStateOperator(mutator) {
        return function operation(arg, state) {
            var clonedEntityState = {
                ids: __spreadArray([], __read(state.ids)),
                entities: Object.assign({}, state.entities),
            };
            var didMutate = mutator(arg, clonedEntityState);
            if (didMutate === DidMutate.Both) {
                return Object.assign({}, state, clonedEntityState);
            }
            if (didMutate === DidMutate.EntitiesOnly) {
                return Object.assign(Object.assign({}, state), { entities: clonedEntityState.entities });
            }
            return state;
        };
    }

    function selectIdValue(entity, selectId) {
        var key = selectId(entity);
        if (core.isDevMode() && key === undefined) {
            console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
        }
        return key;
    }

    function createUnsortedStateAdapter(selectId) {
        function addOneMutably(entity, state) {
            var key = selectIdValue(entity, selectId);
            if (key in state.entities) {
                return DidMutate.None;
            }
            state.ids.push(key);
            state.entities[key] = entity;
            return DidMutate.Both;
        }
        function addManyMutably(entities, state) {
            var e_1, _a;
            var didMutate = false;
            try {
                for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                    var entity = entities_1_1.value;
                    didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return didMutate ? DidMutate.Both : DidMutate.None;
        }
        function setAllMutably(entities, state) {
            state.ids = [];
            state.entities = {};
            addManyMutably(entities, state);
            return DidMutate.Both;
        }
        function setOneMutably(entity, state) {
            var key = selectIdValue(entity, selectId);
            if (key in state.entities) {
                state.entities[key] = entity;
                return DidMutate.EntitiesOnly;
            }
            state.ids.push(key);
            state.entities[key] = entity;
            return DidMutate.Both;
        }
        function setManyMutably(entities, state) {
            var didMutateSetOne = entities.map(function (entity) { return setOneMutably(entity, state); });
            switch (true) {
                case didMutateSetOne.some(function (didMutate) { return didMutate === DidMutate.Both; }):
                    return DidMutate.Both;
                case didMutateSetOne.some(function (didMutate) { return didMutate === DidMutate.EntitiesOnly; }):
                    return DidMutate.EntitiesOnly;
                default:
                    return DidMutate.None;
            }
        }
        function removeOneMutably(key, state) {
            return removeManyMutably([key], state);
        }
        function removeManyMutably(keysOrPredicate, state) {
            var keys = keysOrPredicate instanceof Array
                ? keysOrPredicate
                : state.ids.filter(function (key) { return keysOrPredicate(state.entities[key]); });
            var didMutate = keys
                .filter(function (key) { return key in state.entities; })
                .map(function (key) { return delete state.entities[key]; }).length > 0;
            if (didMutate) {
                state.ids = state.ids.filter(function (id) { return id in state.entities; });
            }
            return didMutate ? DidMutate.Both : DidMutate.None;
        }
        function removeAll(state) {
            return Object.assign({}, state, {
                ids: [],
                entities: {},
            });
        }
        function takeNewKey(keys, update, state) {
            var original = state.entities[update.id];
            var updated = Object.assign({}, original, update.changes);
            var newKey = selectIdValue(updated, selectId);
            var hasNewKey = newKey !== update.id;
            if (hasNewKey) {
                keys[update.id] = newKey;
                delete state.entities[update.id];
            }
            state.entities[newKey] = updated;
            return hasNewKey;
        }
        function updateOneMutably(update, state) {
            return updateManyMutably([update], state);
        }
        function updateManyMutably(updates, state) {
            var newKeys = {};
            updates = updates.filter(function (update) { return update.id in state.entities; });
            var didMutateEntities = updates.length > 0;
            if (didMutateEntities) {
                var didMutateIds = updates.filter(function (update) { return takeNewKey(newKeys, update, state); }).length >
                    0;
                if (didMutateIds) {
                    state.ids = state.ids.map(function (id) { return newKeys[id] || id; });
                    return DidMutate.Both;
                }
                else {
                    return DidMutate.EntitiesOnly;
                }
            }
            return DidMutate.None;
        }
        function mapMutably(map, state) {
            var changes = state.ids.reduce(function (changes, id) {
                var change = map(state.entities[id]);
                if (change !== state.entities[id]) {
                    changes.push({ id: id, changes: change });
                }
                return changes;
            }, []);
            var updates = changes.filter(function (_a) {
                var id = _a.id;
                return id in state.entities;
            });
            return updateManyMutably(updates, state);
        }
        function mapOneMutably(_a, state) {
            var map = _a.map, id = _a.id;
            var entity = state.entities[id];
            if (!entity) {
                return DidMutate.None;
            }
            var updatedEntity = map(entity);
            return updateOneMutably({
                id: id,
                changes: updatedEntity,
            }, state);
        }
        function upsertOneMutably(entity, state) {
            return upsertManyMutably([entity], state);
        }
        function upsertManyMutably(entities, state) {
            var e_2, _a;
            var added = [];
            var updated = [];
            try {
                for (var entities_2 = __values(entities), entities_2_1 = entities_2.next(); !entities_2_1.done; entities_2_1 = entities_2.next()) {
                    var entity = entities_2_1.value;
                    var id = selectIdValue(entity, selectId);
                    if (id in state.entities) {
                        updated.push({ id: id, changes: entity });
                    }
                    else {
                        added.push(entity);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (entities_2_1 && !entities_2_1.done && (_a = entities_2.return)) _a.call(entities_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var didMutateByUpdated = updateManyMutably(updated, state);
            var didMutateByAdded = addManyMutably(added, state);
            switch (true) {
                case didMutateByAdded === DidMutate.None &&
                    didMutateByUpdated === DidMutate.None:
                    return DidMutate.None;
                case didMutateByAdded === DidMutate.Both ||
                    didMutateByUpdated === DidMutate.Both:
                    return DidMutate.Both;
                default:
                    return DidMutate.EntitiesOnly;
            }
        }
        return {
            removeAll: removeAll,
            addOne: createStateOperator(addOneMutably),
            addMany: createStateOperator(addManyMutably),
            setAll: createStateOperator(setAllMutably),
            setOne: createStateOperator(setOneMutably),
            setMany: createStateOperator(setManyMutably),
            updateOne: createStateOperator(updateOneMutably),
            updateMany: createStateOperator(updateManyMutably),
            upsertOne: createStateOperator(upsertOneMutably),
            upsertMany: createStateOperator(upsertManyMutably),
            removeOne: createStateOperator(removeOneMutably),
            removeMany: createStateOperator(removeManyMutably),
            map: createStateOperator(mapMutably),
            mapOne: createStateOperator(mapOneMutably),
        };
    }

    function createSortedStateAdapter(selectId, sort) {
        var _a = createUnsortedStateAdapter(selectId), removeOne = _a.removeOne, removeMany = _a.removeMany, removeAll = _a.removeAll;
        function addOneMutably(entity, state) {
            return addManyMutably([entity], state);
        }
        function addManyMutably(newModels, state) {
            var models = newModels.filter(function (model) { return !(selectIdValue(model, selectId) in state.entities); });
            if (models.length === 0) {
                return DidMutate.None;
            }
            else {
                merge(models, state);
                return DidMutate.Both;
            }
        }
        function setAllMutably(models, state) {
            state.entities = {};
            state.ids = [];
            addManyMutably(models, state);
            return DidMutate.Both;
        }
        function setOneMutably(entity, state) {
            var id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                state.ids = state.ids.filter(function (val) { return val !== id; });
                merge([entity], state);
                return DidMutate.Both;
            }
            else {
                return addOneMutably(entity, state);
            }
        }
        function setManyMutably(entities, state) {
            var didMutateSetOne = entities.map(function (entity) { return setOneMutably(entity, state); });
            switch (true) {
                case didMutateSetOne.some(function (didMutate) { return didMutate === DidMutate.Both; }):
                    return DidMutate.Both;
                case didMutateSetOne.some(function (didMutate) { return didMutate === DidMutate.EntitiesOnly; }):
                    return DidMutate.EntitiesOnly;
                default:
                    return DidMutate.None;
            }
        }
        function updateOneMutably(update, state) {
            return updateManyMutably([update], state);
        }
        function takeUpdatedModel(models, update, state) {
            if (!(update.id in state.entities)) {
                return false;
            }
            var original = state.entities[update.id];
            var updated = Object.assign({}, original, update.changes);
            var newKey = selectIdValue(updated, selectId);
            delete state.entities[update.id];
            models.push(updated);
            return newKey !== update.id;
        }
        function updateManyMutably(updates, state) {
            var models = [];
            var didMutateIds = updates.filter(function (update) { return takeUpdatedModel(models, update, state); })
                .length > 0;
            if (models.length === 0) {
                return DidMutate.None;
            }
            else {
                var originalIds_1 = state.ids;
                var updatedIndexes_1 = [];
                state.ids = state.ids.filter(function (id, index) {
                    if (id in state.entities) {
                        return true;
                    }
                    else {
                        updatedIndexes_1.push(index);
                        return false;
                    }
                });
                merge(models, state);
                if (!didMutateIds &&
                    updatedIndexes_1.every(function (i) { return state.ids[i] === originalIds_1[i]; })) {
                    return DidMutate.EntitiesOnly;
                }
                else {
                    return DidMutate.Both;
                }
            }
        }
        function mapMutably(updatesOrMap, state) {
            var updates = state.ids.reduce(function (changes, id) {
                var change = updatesOrMap(state.entities[id]);
                if (change !== state.entities[id]) {
                    changes.push({ id: id, changes: change });
                }
                return changes;
            }, []);
            return updateManyMutably(updates, state);
        }
        function mapOneMutably(_a, state) {
            var map = _a.map, id = _a.id;
            var entity = state.entities[id];
            if (!entity) {
                return DidMutate.None;
            }
            var updatedEntity = map(entity);
            return updateOneMutably({
                id: id,
                changes: updatedEntity,
            }, state);
        }
        function upsertOneMutably(entity, state) {
            return upsertManyMutably([entity], state);
        }
        function upsertManyMutably(entities, state) {
            var e_1, _a;
            var added = [];
            var updated = [];
            try {
                for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                    var entity = entities_1_1.value;
                    var id = selectIdValue(entity, selectId);
                    if (id in state.entities) {
                        updated.push({ id: id, changes: entity });
                    }
                    else {
                        added.push(entity);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var didMutateByUpdated = updateManyMutably(updated, state);
            var didMutateByAdded = addManyMutably(added, state);
            switch (true) {
                case didMutateByAdded === DidMutate.None &&
                    didMutateByUpdated === DidMutate.None:
                    return DidMutate.None;
                case didMutateByAdded === DidMutate.Both ||
                    didMutateByUpdated === DidMutate.Both:
                    return DidMutate.Both;
                default:
                    return DidMutate.EntitiesOnly;
            }
        }
        function merge(models, state) {
            models.sort(sort);
            var ids = [];
            var i = 0;
            var j = 0;
            while (i < models.length && j < state.ids.length) {
                var model = models[i];
                var modelId = selectIdValue(model, selectId);
                var entityId = state.ids[j];
                var entity = state.entities[entityId];
                if (sort(model, entity) <= 0) {
                    ids.push(modelId);
                    i++;
                }
                else {
                    ids.push(entityId);
                    j++;
                }
            }
            if (i < models.length) {
                state.ids = ids.concat(models.slice(i).map(selectId));
            }
            else {
                state.ids = ids.concat(state.ids.slice(j));
            }
            models.forEach(function (model, i) {
                state.entities[selectId(model)] = model;
            });
        }
        return {
            removeOne: removeOne,
            removeMany: removeMany,
            removeAll: removeAll,
            addOne: createStateOperator(addOneMutably),
            updateOne: createStateOperator(updateOneMutably),
            upsertOne: createStateOperator(upsertOneMutably),
            setAll: createStateOperator(setAllMutably),
            setOne: createStateOperator(setOneMutably),
            setMany: createStateOperator(setManyMutably),
            addMany: createStateOperator(addManyMutably),
            updateMany: createStateOperator(updateManyMutably),
            upsertMany: createStateOperator(upsertManyMutably),
            map: createStateOperator(mapMutably),
            mapOne: createStateOperator(mapOneMutably),
        };
    }

    function createEntityAdapter(options) {
        if (options === void 0) { options = {}; }
        var _a = Object.assign({ sortComparer: false, selectId: function (instance) { return instance.id; } }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
        var stateFactory = createInitialStateFactory();
        var selectorsFactory = createSelectorsFactory();
        var stateAdapter = sortComparer
            ? createSortedStateAdapter(selectId, sortComparer)
            : createUnsortedStateAdapter(selectId);
        return Object.assign(Object.assign(Object.assign({ selectId: selectId,
            sortComparer: sortComparer }, stateFactory), selectorsFactory), stateAdapter);
    }

    var Dictionary = /** @class */ (function () {
        function Dictionary() {
        }
        return Dictionary;
    }());

    /**
     * DO NOT EDIT
     *
     * This file is automatically generated at build
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Dictionary = Dictionary;
    exports.createEntityAdapter = createEntityAdapter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-entity.umd.js.map
