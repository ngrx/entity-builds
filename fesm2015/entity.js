/**
 * @license NgRx 9.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { createSelector } from '@ngrx/store';
import { isDevMode } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/entity_state.ts
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
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/state_selectors.ts
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
        const selectIds = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.ids);
        /** @type {?} */
        const selectEntities = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.entities);
        /** @type {?} */
        const selectAll = createSelector(selectIds, selectEntities, (/**
         * @param {?} ids
         * @param {?} entities
         * @return {?}
         */
        (ids, entities) => ids.map((/**
         * @param {?} id
         * @return {?}
         */
        (id) => ((/** @type {?} */ (entities)))[id]))));
        /** @type {?} */
        const selectTotal = createSelector(selectIds, (/**
         * @param {?} ids
         * @return {?}
         */
        ids => ids.length));
        if (!selectState) {
            return {
                selectIds,
                selectEntities,
                selectAll,
                selectTotal,
            };
        }
        return {
            selectIds: createSelector(selectState, selectIds),
            selectEntities: createSelector(selectState, selectEntities),
            selectAll: createSelector(selectState, selectAll),
            selectTotal: createSelector(selectState, selectTotal),
        };
    }
    return { getSelectors };
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DidMutate = {
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
    return (/**
     * @template S
     * @param {?} arg
     * @param {?} state
     * @return {?}
     */
    function operation(arg, state) {
        /** @type {?} */
        const clonedEntityState = {
            ids: [...state.ids],
            entities: Object.assign({}, state.entities),
        };
        /** @type {?} */
        const didMutate = mutator(arg, clonedEntityState);
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
 * Generated from: modules/entity/src/utils.ts
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
    const key = selectId(entity);
    if (isDevMode() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/unsorted_state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        const key = selectIdValue(entity, selectId);
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
        /** @type {?} */
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
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
        const key = selectIdValue(entity, selectId);
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
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => keysOrPredicate(state.entities[key])));
        /** @type {?} */
        const didMutate = keys
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        (key) => key in state.entities))
            .map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => delete state.entities[key])).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @return {?}
             */
            (id) => id in state.entities));
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
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        /** @type {?} */
        const hasNewKey = newKey !== update.id;
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
        const newKeys = {};
        updates = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => update.id in state.entities));
        /** @type {?} */
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            const didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            update => takeNewKey(newKeys, update, state))).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((/**
                 * @param {?} id
                 * @return {?}
                 */
                (id) => newKeys[id] || id));
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
        const changes = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        /** @type {?} */
        const updates = changes.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ id }) => id in state.entities));
        return updateManyMutably(updates, state);
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
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
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
        removeAll,
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
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/sorted_state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} selectId
 * @param {?} sort
 * @return {?}
 */
function createSortedStateAdapter(selectId, sort) {
    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);
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
        const models = newModels.filter((/**
         * @param {?} model
         * @return {?}
         */
        model => !(selectIdValue(model, selectId) in state.entities)));
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
        const id = selectIdValue(entity, selectId);
        if (id in state.entities) {
            state.ids = state.ids.filter((/**
             * @param {?} val
             * @return {?}
             */
            (val) => val !== id));
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
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
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
        const models = [];
        /** @type {?} */
        const didMutateIds = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => takeUpdatedModel(models, update, state))).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            const originalIds = state.ids;
            /** @type {?} */
            const updatedIndexes = [];
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @param {?} index
             * @return {?}
             */
            (id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            }));
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((/**
                 * @param {?} i
                 * @return {?}
                 */
                (i) => state.ids[i] === originalIds[i]))) {
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
        const updates = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        return updateManyMutably(updates, state);
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
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
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
        const ids = [];
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let j = 0;
        while (i < models.length && j < state.ids.length) {
            /** @type {?} */
            const model = models[i];
            /** @type {?} */
            const modelId = selectIdValue(model, selectId);
            /** @type {?} */
            const entityId = state.ids[j];
            /** @type {?} */
            const entity = state.entities[entityId];
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
        models.forEach((/**
         * @param {?} model
         * @param {?} i
         * @return {?}
         */
        (model, i) => {
            state.entities[selectId(model)] = model;
        }));
    }
    return {
        removeOne,
        removeMany,
        removeAll,
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
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/create_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?=} options
 * @return {?}
 */
function createEntityAdapter(options = {}) {
    const { selectId, sortComparer } = Object.assign({ sortComparer: false, selectId: (/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => instance.id) }, options);
    /** @type {?} */
    const stateFactory = createInitialStateFactory();
    /** @type {?} */
    const selectorsFactory = createSelectorsFactory();
    /** @type {?} */
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object.assign(Object.assign(Object.assign({ selectId,
        sortComparer }, stateFactory), selectorsFactory), stateAdapter);
}

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/models.ts
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
class Dictionary {
}
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
 * Generated from: modules/entity/src/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Dictionary, createEntityAdapter };
//# sourceMappingURL=entity.js.map
