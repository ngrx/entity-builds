import { createSelector } from '@ngrx/store';
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
            var /** @type {?} */ selectAll = createSelector(selectIds, selectEntities, function (ids, entities) { return ids.map(function (id) { return entities[id]; }); });
            var /** @type {?} */ selectTotal = createSelector(selectIds, function (ids) { return ids.length; });
            return {
                selectIds: createSelector(selectState, selectIds),
                selectEntities: createSelector(selectState, selectEntities),
                selectAll: createSelector(selectState, selectAll),
                selectTotal: createSelector(selectState, selectTotal),
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
        var /** @type {?} */ didMutate = mutator(arg, clonedEntityState);
        if (didMutate) {
            return Object.assign({}, state, clonedEntityState);
        }
        return state;
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
        if (key in state.entities) {
            return false;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return true;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        var /** @type {?} */ didMutate = false;
        for (var /** @type {?} */ index in entities) {
            didMutate = addOneMutably(entities[index], state) || didMutate;
        }
        return didMutate;
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
        return true;
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        var /** @type {?} */ index = state.ids.indexOf(key);
        if (index === -1) {
            return false;
        }
        state.ids.splice(index, 1);
        delete state.entities[key];
        return true;
    }
    /**
     * @param {?} keys
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keys, state) {
        var /** @type {?} */ didMutate = false;
        for (var /** @type {?} */ index in keys) {
            didMutate = removeOneMutably(keys[index], state) || didMutate;
        }
        return didMutate;
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
            return false;
        }
        var /** @type {?} */ original = state.entities[update.id];
        var /** @type {?} */ updated = Object.assign({}, original, update.changes);
        var /** @type {?} */ newKey = selectId(updated);
        if (newKey !== update.id) {
            state.ids[index] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return true;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        var /** @type {?} */ didMutate = false;
        for (var /** @type {?} */ index in updates) {
            didMutate = updateOneMutably(updates[index], state) || didMutate;
        }
        return didMutate;
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
        if (key in state.entities) {
            return false;
        }
        var /** @type {?} */ insertAt = findTargetIndex(state, entity);
        state.ids.splice(insertAt, 0, key);
        state.entities[key] = entity;
        return true;
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        var /** @type {?} */ didMutate = false;
        for (var /** @type {?} */ index in newModels) {
            didMutate = addOneMutably(newModels[index], state) || didMutate;
        }
        return didMutate;
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
        return true;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        var /** @type {?} */ original = state.entities[update.id];
        var /** @type {?} */ updated = Object.assign({}, original, update.changes);
        var /** @type {?} */ updatedKey = selectId(updated);
        var /** @type {?} */ result = sort(original, updated);
        if (result === 0) {
            if (updatedKey !== update.id) {
                delete state.entities[update.id];
                var /** @type {?} */ index_1 = state.ids.indexOf(update.id);
                state.ids[index_1] = updatedKey;
            }
            state.entities[updatedKey] = updated;
            return true;
        }
        var /** @type {?} */ index = state.ids.indexOf(update.id);
        state.ids.splice(index, 1);
        state.ids.splice(findTargetIndex(state, updated), 0, updatedKey);
        if (updatedKey !== update.id) {
            delete state.entities[update.id];
        }
        state.entities[updatedKey] = updated;
        return true;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        var /** @type {?} */ didMutate = false;
        for (var /** @type {?} */ index in updates) {
            didMutate = updateOneMutably(updates[index], state) || didMutate;
        }
        return didMutate;
    }
    /**
     * @param {?} state
     * @param {?} model
     * @return {?}
     */
    function findTargetIndex(state, model) {
        if (state.ids.length === 0) {
            return 0;
        }
        for (var /** @type {?} */ i = 0; i < state.ids.length; i++) {
            var /** @type {?} */ entity = state.entities[state.ids[i]];
            var /** @type {?} */ isSmaller = sort(model, entity) < 0;
            if (isSmaller) {
                return i;
            }
        }
        return state.ids.length - 1;
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
/**
 * Generated bundle index. Do not edit.
 */
export { createEntityAdapter };
//# sourceMappingURL=entity.es5.js.map
