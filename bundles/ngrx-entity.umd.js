(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ngrx/entity', ['exports', '@ngrx/store', '@angular/core'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.entity = {}), global.store, global.ng.core));
}(this, (function (exports, store, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: src/entity_state.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template V
     * @return {?}
     */
    function getInitialEntityState() {
        return {
            ids: [],
            entities: {},
        };
    }
    /**
     * @template V
     * @return {?}
     */
    function createInitialStateFactory() {
        /**
         * @param {?=} additionalState
         * @return {?}
         */
        function getInitialState(additionalState) {
            if (additionalState === void 0) { additionalState = {}; }
            return Object.assign(getInitialEntityState(), additionalState);
        }
        return { getInitialState: getInitialState };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/state_selectors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @return {?}
     */
    function createSelectorsFactory() {
        /**
         * @param {?=} selectState
         * @return {?}
         */
        function getSelectors(selectState) {
            /** @type {?} */
            var selectIds = ( /**
             * @param {?} state
             * @return {?}
             */function (state) { return state.ids; });
            /** @type {?} */
            var selectEntities = ( /**
             * @param {?} state
             * @return {?}
             */function (state) { return state.entities; });
            /** @type {?} */
            var selectAll = store.createSelector(selectIds, selectEntities, ( /**
             * @param {?} ids
             * @param {?} entities
             * @return {?}
             */function (ids, entities) { return ids.map(( /**
             * @param {?} id
             * @return {?}
             */function (id) { return (( /** @type {?} */(entities)))[id]; })); }));
            /** @type {?} */
            var selectTotal = store.createSelector(selectIds, ( /**
             * @param {?} ids
             * @return {?}
             */function (ids) { return ids.length; }));
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
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
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
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
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
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
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
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/state_adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var DidMutate = {
        EntitiesOnly: 0,
        Both: 1,
        None: 2,
    };
    DidMutate[DidMutate.EntitiesOnly] = 'EntitiesOnly';
    DidMutate[DidMutate.Both] = 'Both';
    DidMutate[DidMutate.None] = 'None';
    /**
     * @template V, R
     * @param {?} mutator
     * @return {?}
     */
    function createStateOperator(mutator) {
        return ( /**
         * @template S
         * @param {?} arg
         * @param {?} state
         * @return {?}
         */function operation(arg, state) {
            /** @type {?} */
            var clonedEntityState = {
                ids: __spread(state.ids),
                entities: Object.assign({}, state.entities),
            };
            /** @type {?} */
            var didMutate = mutator(arg, clonedEntityState);
            if (didMutate === DidMutate.Both) {
                return Object.assign({}, state, clonedEntityState);
            }
            if (didMutate === DidMutate.EntitiesOnly) {
                return Object.assign(Object.assign({}, state), { entities: clonedEntityState.entities });
            }
            return state;
        });
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?} entity
     * @param {?} selectId
     * @return {?}
     */
    function selectIdValue(entity, selectId) {
        /** @type {?} */
        var key = selectId(entity);
        if (core.isDevMode() && key === undefined) {
            console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
        }
        return key;
    }

    /**
     * @template T
     * @param {?} selectId
     * @return {?}
     */
    function createUnsortedStateAdapter(selectId) {
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function addOneMutably(entity, state) {
            /** @type {?} */
            var key = selectIdValue(entity, selectId);
            if (key in state.entities) {
                return DidMutate.None;
            }
            state.ids.push(key);
            state.entities[key] = entity;
            return DidMutate.Both;
        }
        /**
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        function addManyMutably(entities, state) {
            var e_1, _a;
            /** @type {?} */
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
        /**
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        function setAllMutably(entities, state) {
            state.ids = [];
            state.entities = {};
            addManyMutably(entities, state);
            return DidMutate.Both;
        }
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function setOneMutably(entity, state) {
            /** @type {?} */
            var key = selectIdValue(entity, selectId);
            if (key in state.entities) {
                state.entities[key] = entity;
                return DidMutate.EntitiesOnly;
            }
            state.ids.push(key);
            state.entities[key] = entity;
            return DidMutate.Both;
        }
        /**
         * @param {?} key
         * @param {?} state
         * @return {?}
         */
        function removeOneMutably(key, state) {
            return removeManyMutably([key], state);
        }
        /**
         * @param {?} keysOrPredicate
         * @param {?} state
         * @return {?}
         */
        function removeManyMutably(keysOrPredicate, state) {
            /** @type {?} */
            var keys = keysOrPredicate instanceof Array
                ? keysOrPredicate
                : state.ids.filter(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) { return keysOrPredicate(state.entities[key]); }));
            /** @type {?} */
            var didMutate = keys
                .filter(( /**
         * @param {?} key
         * @return {?}
         */function (key) { return key in state.entities; }))
                .map(( /**
         * @param {?} key
         * @return {?}
         */function (key) { return delete state.entities[key]; })).length > 0;
            if (didMutate) {
                state.ids = state.ids.filter(( /**
                 * @param {?} id
                 * @return {?}
                 */function (id) { return id in state.entities; }));
            }
            return didMutate ? DidMutate.Both : DidMutate.None;
        }
        /**
         * @template S
         * @param {?} state
         * @return {?}
         */
        function removeAll(state) {
            return Object.assign({}, state, {
                ids: [],
                entities: {},
            });
        }
        /**
         * @param {?} keys
         * @param {?} update
         * @param {?} state
         * @return {?}
         */
        function takeNewKey(keys, update, state) {
            /** @type {?} */
            var original = state.entities[update.id];
            /** @type {?} */
            var updated = Object.assign({}, original, update.changes);
            /** @type {?} */
            var newKey = selectIdValue(updated, selectId);
            /** @type {?} */
            var hasNewKey = newKey !== update.id;
            if (hasNewKey) {
                keys[update.id] = newKey;
                delete state.entities[update.id];
            }
            state.entities[newKey] = updated;
            return hasNewKey;
        }
        /**
         * @param {?} update
         * @param {?} state
         * @return {?}
         */
        function updateOneMutably(update, state) {
            return updateManyMutably([update], state);
        }
        /**
         * @param {?} updates
         * @param {?} state
         * @return {?}
         */
        function updateManyMutably(updates, state) {
            /** @type {?} */
            var newKeys = {};
            updates = updates.filter(( /**
             * @param {?} update
             * @return {?}
             */function (update) { return update.id in state.entities; }));
            /** @type {?} */
            var didMutateEntities = updates.length > 0;
            if (didMutateEntities) {
                /** @type {?} */
                var didMutateIds = updates.filter(( /**
                 * @param {?} update
                 * @return {?}
                 */function (update) { return takeNewKey(newKeys, update, state); })).length >
                    0;
                if (didMutateIds) {
                    state.ids = state.ids.map(( /**
                     * @param {?} id
                     * @return {?}
                     */function (id) { return newKeys[id] || id; }));
                    return DidMutate.Both;
                }
                else {
                    return DidMutate.EntitiesOnly;
                }
            }
            return DidMutate.None;
        }
        /**
         * @param {?} map
         * @param {?} state
         * @return {?}
         */
        function mapMutably(map, state) {
            /** @type {?} */
            var changes = state.ids.reduce(( /**
             * @param {?} changes
             * @param {?} id
             * @return {?}
             */function (changes, id) {
                /** @type {?} */
                var change = map(state.entities[id]);
                if (change !== state.entities[id]) {
                    changes.push({ id: id, changes: change });
                }
                return changes;
            }), []);
            /** @type {?} */
            var updates = changes.filter(( /**
             * @param {?} __0
             * @return {?}
             */function (_a) {
                var id = _a.id;
                return id in state.entities;
            }));
            return updateManyMutably(updates, state);
        }
        /**
         * @param {?} __0
         * @param {?} state
         * @return {?}
         */
        function mapOneMutably(_a, state) {
            var map = _a.map, id = _a.id;
            /** @type {?} */
            var entity = state.entities[id];
            if (!entity) {
                return DidMutate.None;
            }
            /** @type {?} */
            var updatedEntity = map(entity);
            return updateOneMutably({
                id: id,
                changes: updatedEntity,
            }, state);
        }
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function upsertOneMutably(entity, state) {
            return upsertManyMutably([entity], state);
        }
        /**
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        function upsertManyMutably(entities, state) {
            var e_2, _a;
            /** @type {?} */
            var added = [];
            /** @type {?} */
            var updated = [];
            try {
                for (var entities_2 = __values(entities), entities_2_1 = entities_2.next(); !entities_2_1.done; entities_2_1 = entities_2.next()) {
                    var entity = entities_2_1.value;
                    /** @type {?} */
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
            /** @type {?} */
            var didMutateByUpdated = updateManyMutably(updated, state);
            /** @type {?} */
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
            addAll: createStateOperator(setAllMutably),
            setAll: createStateOperator(setAllMutably),
            setOne: createStateOperator(setOneMutably),
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

    /**
     * @template T
     * @param {?} selectId
     * @param {?} sort
     * @return {?}
     */
    function createSortedStateAdapter(selectId, sort) {
        var _a = createUnsortedStateAdapter(selectId), removeOne = _a.removeOne, removeMany = _a.removeMany, removeAll = _a.removeAll;
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function addOneMutably(entity, state) {
            return addManyMutably([entity], state);
        }
        /**
         * @param {?} newModels
         * @param {?} state
         * @return {?}
         */
        function addManyMutably(newModels, state) {
            /** @type {?} */
            var models = newModels.filter(( /**
             * @param {?} model
             * @return {?}
             */function (model) { return !(selectIdValue(model, selectId) in state.entities); }));
            if (models.length === 0) {
                return DidMutate.None;
            }
            else {
                merge(models, state);
                return DidMutate.Both;
            }
        }
        /**
         * @param {?} models
         * @param {?} state
         * @return {?}
         */
        function setAllMutably(models, state) {
            state.entities = {};
            state.ids = [];
            addManyMutably(models, state);
            return DidMutate.Both;
        }
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function setOneMutably(entity, state) {
            /** @type {?} */
            var id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                state.ids = state.ids.filter(( /**
                 * @param {?} val
                 * @return {?}
                 */function (val) { return val !== id; }));
                merge([entity], state);
                return DidMutate.Both;
            }
            else {
                return addOneMutably(entity, state);
            }
        }
        /**
         * @param {?} update
         * @param {?} state
         * @return {?}
         */
        function updateOneMutably(update, state) {
            return updateManyMutably([update], state);
        }
        /**
         * @param {?} models
         * @param {?} update
         * @param {?} state
         * @return {?}
         */
        function takeUpdatedModel(models, update, state) {
            if (!(update.id in state.entities)) {
                return false;
            }
            /** @type {?} */
            var original = state.entities[update.id];
            /** @type {?} */
            var updated = Object.assign({}, original, update.changes);
            /** @type {?} */
            var newKey = selectIdValue(updated, selectId);
            delete state.entities[update.id];
            models.push(updated);
            return newKey !== update.id;
        }
        /**
         * @param {?} updates
         * @param {?} state
         * @return {?}
         */
        function updateManyMutably(updates, state) {
            /** @type {?} */
            var models = [];
            /** @type {?} */
            var didMutateIds = updates.filter(( /**
             * @param {?} update
             * @return {?}
             */function (update) { return takeUpdatedModel(models, update, state); }))
                .length > 0;
            if (models.length === 0) {
                return DidMutate.None;
            }
            else {
                /** @type {?} */
                var originalIds_1 = state.ids;
                /** @type {?} */
                var updatedIndexes_1 = [];
                state.ids = state.ids.filter(( /**
                 * @param {?} id
                 * @param {?} index
                 * @return {?}
                 */function (id, index) {
                    if (id in state.entities) {
                        return true;
                    }
                    else {
                        updatedIndexes_1.push(index);
                        return false;
                    }
                }));
                merge(models, state);
                if (!didMutateIds &&
                    updatedIndexes_1.every(( /**
                     * @param {?} i
                     * @return {?}
                     */function (i) { return state.ids[i] === originalIds_1[i]; }))) {
                    return DidMutate.EntitiesOnly;
                }
                else {
                    return DidMutate.Both;
                }
            }
        }
        /**
         * @param {?} updatesOrMap
         * @param {?} state
         * @return {?}
         */
        function mapMutably(updatesOrMap, state) {
            /** @type {?} */
            var updates = state.ids.reduce(( /**
             * @param {?} changes
             * @param {?} id
             * @return {?}
             */function (changes, id) {
                /** @type {?} */
                var change = updatesOrMap(state.entities[id]);
                if (change !== state.entities[id]) {
                    changes.push({ id: id, changes: change });
                }
                return changes;
            }), []);
            return updateManyMutably(updates, state);
        }
        /**
         * @param {?} __0
         * @param {?} state
         * @return {?}
         */
        function mapOneMutably(_a, state) {
            var map = _a.map, id = _a.id;
            /** @type {?} */
            var entity = state.entities[id];
            if (!entity) {
                return DidMutate.None;
            }
            /** @type {?} */
            var updatedEntity = map(entity);
            return updateOneMutably({
                id: id,
                changes: updatedEntity,
            }, state);
        }
        /**
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        function upsertOneMutably(entity, state) {
            return upsertManyMutably([entity], state);
        }
        /**
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        function upsertManyMutably(entities, state) {
            var e_1, _a;
            /** @type {?} */
            var added = [];
            /** @type {?} */
            var updated = [];
            try {
                for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                    var entity = entities_1_1.value;
                    /** @type {?} */
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
            /** @type {?} */
            var didMutateByUpdated = updateManyMutably(updated, state);
            /** @type {?} */
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
        /**
         * @param {?} models
         * @param {?} state
         * @return {?}
         */
        function merge(models, state) {
            models.sort(sort);
            /** @type {?} */
            var ids = [];
            /** @type {?} */
            var i = 0;
            /** @type {?} */
            var j = 0;
            while (i < models.length && j < state.ids.length) {
                /** @type {?} */
                var model = models[i];
                /** @type {?} */
                var modelId = selectIdValue(model, selectId);
                /** @type {?} */
                var entityId = state.ids[j];
                /** @type {?} */
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
            models.forEach(( /**
             * @param {?} model
             * @param {?} i
             * @return {?}
             */function (model, i) {
                state.entities[selectId(model)] = model;
            }));
        }
        return {
            removeOne: removeOne,
            removeMany: removeMany,
            removeAll: removeAll,
            addOne: createStateOperator(addOneMutably),
            updateOne: createStateOperator(updateOneMutably),
            upsertOne: createStateOperator(upsertOneMutably),
            addAll: createStateOperator(setAllMutably),
            setAll: createStateOperator(setAllMutably),
            setOne: createStateOperator(setOneMutably),
            addMany: createStateOperator(addManyMutably),
            updateMany: createStateOperator(updateManyMutably),
            upsertMany: createStateOperator(upsertManyMutably),
            map: createStateOperator(mapMutably),
            mapOne: createStateOperator(mapOneMutably),
        };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/create_adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function createEntityAdapter(options) {
        if (options === void 0) { options = {}; }
        var _a = Object.assign({ sortComparer: false, selectId: ( /**
                 * @param {?} instance
                 * @return {?}
                 */function (instance) { return instance.id; }) }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
        /** @type {?} */
        var stateFactory = createInitialStateFactory();
        /** @type {?} */
        var selectorsFactory = createSelectorsFactory();
        /** @type {?} */
        var stateAdapter = sortComparer
            ? createSortedStateAdapter(selectId, sortComparer)
            : createUnsortedStateAdapter(selectId);
        return Object.assign(Object.assign(Object.assign({ selectId: selectId,
            sortComparer: sortComparer }, stateFactory), selectorsFactory), stateAdapter);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function DictionaryNum() { }
    /**
     * @abstract
     * @template T
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
        }
        return Dictionary;
    }());
    /**
     * @record
     * @template T
     */
    function UpdateStr() { }
    if (false) {
        /** @type {?} */
        UpdateStr.prototype.id;
        /** @type {?} */
        UpdateStr.prototype.changes;
    }
    /**
     * @record
     * @template T
     */
    function UpdateNum() { }
    if (false) {
        /** @type {?} */
        UpdateNum.prototype.id;
        /** @type {?} */
        UpdateNum.prototype.changes;
    }
    /**
     * @record
     * @template T
     */
    function EntityMapOneNum() { }
    if (false) {
        /** @type {?} */
        EntityMapOneNum.prototype.id;
        /** @type {?} */
        EntityMapOneNum.prototype.map;
    }
    /**
     * @record
     * @template T
     */
    function EntityMapOneStr() { }
    if (false) {
        /** @type {?} */
        EntityMapOneStr.prototype.id;
        /** @type {?} */
        EntityMapOneStr.prototype.map;
    }
    /**
     * @record
     * @template T
     */
    function EntityState() { }
    if (false) {
        /** @type {?} */
        EntityState.prototype.ids;
        /** @type {?} */
        EntityState.prototype.entities;
    }
    /**
     * @record
     * @template T
     */
    function EntityDefinition() { }
    if (false) {
        /** @type {?} */
        EntityDefinition.prototype.selectId;
        /** @type {?} */
        EntityDefinition.prototype.sortComparer;
    }
    /**
     * @record
     * @template T
     */
    function EntityStateAdapter() { }
    if (false) {
        /**
         * @template S
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.addOne = function (entity, state) { };
        /**
         * @template S
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.addMany = function (entities, state) { };
        /**
         * @deprecated addAll has been renamed. Use setAll instead.
         * @template S
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.addAll = function (entities, state) { };
        /**
         * @template S
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.setAll = function (entities, state) { };
        /**
         * @template S
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.setOne = function (entity, state) { };
        /**
         * @template S
         * @param {?} key
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeOne = function (key, state) { };
        /**
         * @template S
         * @param {?} key
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeOne = function (key, state) { };
        /**
         * @template S
         * @param {?} keys
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeMany = function (keys, state) { };
        /**
         * @template S
         * @param {?} keys
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeMany = function (keys, state) { };
        /**
         * @template S
         * @param {?} predicate
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeMany = function (predicate, state) { };
        /**
         * @template S
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.removeAll = function (state) { };
        /**
         * @template S
         * @param {?} update
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.updateOne = function (update, state) { };
        /**
         * @template S
         * @param {?} updates
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.updateMany = function (updates, state) { };
        /**
         * @template S
         * @param {?} entity
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.upsertOne = function (entity, state) { };
        /**
         * @template S
         * @param {?} entities
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.upsertMany = function (entities, state) { };
        /**
         * @template S
         * @param {?} map
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.mapOne = function (map, state) { };
        /**
         * @template S
         * @param {?} map
         * @param {?} state
         * @return {?}
         */
        EntityStateAdapter.prototype.map = function (map, state) { };
    }
    /**
     * @record
     * @template T, V
     */
    function EntitySelectors() { }
    if (false) {
        /** @type {?} */
        EntitySelectors.prototype.selectIds;
        /** @type {?} */
        EntitySelectors.prototype.selectEntities;
        /** @type {?} */
        EntitySelectors.prototype.selectAll;
        /** @type {?} */
        EntitySelectors.prototype.selectTotal;
    }
    /**
     * @record
     * @template T
     */
    function EntityAdapter() { }
    if (false) {
        /** @type {?} */
        EntityAdapter.prototype.selectId;
        /** @type {?} */
        EntityAdapter.prototype.sortComparer;
        /**
         * @return {?}
         */
        EntityAdapter.prototype.getInitialState = function () { };
        /**
         * @template S
         * @param {?} state
         * @return {?}
         */
        EntityAdapter.prototype.getInitialState = function (state) { };
        /**
         * @return {?}
         */
        EntityAdapter.prototype.getSelectors = function () { };
        /**
         * @template V
         * @param {?} selectState
         * @return {?}
         */
        EntityAdapter.prototype.getSelectors = function (selectState) { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ngrx-entity.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Dictionary = Dictionary;
    exports.createEntityAdapter = createEntityAdapter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-entity.umd.js.map
