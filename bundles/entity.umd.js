(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store')) :
	typeof define === 'function' && define.amd ? define(['exports', '@ngrx/store'], factory) :
	(factory((global.ngrx = global.ngrx || {}, global.ngrx.entity = global.ngrx.entity || {}),global.ngrx.store));
}(this, (function (exports,_ngrx_store) { 'use strict';

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
 * @template T
 * @return {?}
 */
function createSelectorsFactory() {
    return {
        /**
         * @template V
         * @param {?} selectState
         * @return {?}
         */
        getSelectors: function (selectState) {
            var /** @type {?} */ selectIds = function (state) { return state.ids; };
            var /** @type {?} */ selectEntities = function (state) { return state.entities; };
            var /** @type {?} */ selectAll = _ngrx_store.createSelector(selectIds, selectEntities, function (ids, entities) { return ids.map(function (id) { return entities[id]; }); });
            var /** @type {?} */ selectTotal = _ngrx_store.createSelector(selectIds, function (ids) { return ids.length; });
            return {
                selectIds: _ngrx_store.createSelector(selectState, selectIds),
                selectEntities: _ngrx_store.createSelector(selectState, selectEntities),
                selectAll: _ngrx_store.createSelector(selectState, selectAll),
                selectTotal: _ngrx_store.createSelector(selectState, selectTotal),
            };
        },
    };
}
/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
function createStateOperator(mutator) {
    return function operation(arg, state) {
        var /** @type {?} */ clonedEntityState = {
            ids: state.ids.slice(),
            entities: Object.assign({}, state.entities),
        };
        mutator(arg, clonedEntityState);
        return Object.assign({}, state, clonedEntityState);
    };
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
        var /** @type {?} */ key = selectId(entity);
        var /** @type {?} */ index = state.ids.indexOf(key);
        if (index !== -1) {
            return;
        }
        state.ids.push(key);
        state.entities[key] = entity;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        for (var /** @type {?} */ index in entities) {
            addOneMutably(entities[index], state);
        }
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        var /** @type {?} */ index = state.ids.indexOf(key);
        if (index === -1) {
            return;
        }
        state.ids.splice(index, 1);
        delete state.entities[key];
    }
    /**
     * @param {?} keys
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keys, state) {
        for (var /** @type {?} */ index in keys) {
            removeOneMutably(keys[index], state);
        }
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
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        var /** @type {?} */ index = state.ids.indexOf(update.id);
        if (index === -1) {
            return;
        }
        var /** @type {?} */ original = state.entities[update.id];
        var /** @type {?} */ updated = Object.assign({}, original, update.changes);
        var /** @type {?} */ newKey = selectId(updated);
        if (newKey !== update.id) {
            state.ids[index] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        for (var /** @type {?} */ index in updates) {
            updateOneMutably(updates[index], state);
        }
    }
    return {
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        addAll: createStateOperator(addAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
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
        var /** @type {?} */ key = selectId(entity);
        var /** @type {?} */ index = state.ids.indexOf(key);
        if (index !== -1) {
            return;
        }
        var /** @type {?} */ insertAt = findTargetIndex(state, entity);
        state.ids.splice(insertAt, 0, key);
        state.entities[key] = entity;
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        for (var /** @type {?} */ index in newModels) {
            addOneMutably(newModels[index], state);
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(models, state) {
        var /** @type {?} */ sortedModels = models.sort(sort);
        state.entities = {};
        state.ids = sortedModels.map(function (model) {
            var /** @type {?} */ id = selectId(model);
            state.entities[id] = model;
            return id;
        });
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        var /** @type {?} */ index = state.ids.indexOf(update.id);
        if (index === -1) {
            return;
        }
        var /** @type {?} */ original = state.entities[update.id];
        var /** @type {?} */ updated = Object.assign({}, original, update.changes);
        var /** @type {?} */ updatedKey = selectId(updated);
        var /** @type {?} */ result = sort(original, updated);
        if (result === 0) {
            if (updatedKey !== update.id) {
                delete state.entities[update.id];
                state.ids[index] = updatedKey;
            }
            state.entities[updatedKey] = updated;
            return;
        }
        state.ids.splice(index, 1);
        state.ids.splice(findTargetIndex(state, updated), 0, updatedKey);
        if (updatedKey !== update.id) {
            delete state.entities[update.id];
        }
        state.entities[updatedKey] = updated;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        for (var /** @type {?} */ index in updates) {
            updateOneMutably(updates[index], state);
        }
    }
    /**
     * @param {?} state
     * @param {?} model
     * @param {?=} left
     * @param {?=} right
     * @return {?}
     */
    function findTargetIndex(state, model, left, right) {
        if (left === void 0) { left = 0; }
        if (right === void 0) { right = state.ids.length - 1; }
        if (right === -1) {
            return 0;
        }
        var /** @type {?} */ middle;
        while (true) {
            middle = Math.floor((left + right) / 2);
            var /** @type {?} */ result = sort(state.entities[state.ids[middle]], model);
            if (result === 0) {
                return middle;
            }
            else if (result < 0) {
                left = middle + 1;
            }
            else {
                right = middle - 1;
            }
            if (left > right) {
                return state.ids.length - 1;
            }
        }
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        addAll: createStateOperator(addAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
    };
}
/**
 * @template T
 * @param {?} options
 * @return {?}
 */
function createEntityAdapter(options) {
    var _a = Object.assign({ sort: false }, options), selectId = _a.selectId, sort = _a.sort;
    var /** @type {?} */ stateFactory = createInitialStateFactory();
    var /** @type {?} */ selectorsFactory = createSelectorsFactory();
    var /** @type {?} */ stateAdapter = sort
        ? createSortedStateAdapter(selectId, sort)
        : createUnsortedStateAdapter(selectId);
    return Object.assign({}, stateFactory, selectorsFactory, stateAdapter);
}

exports.createEntityAdapter = createEntityAdapter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=entity.umd.js.map
