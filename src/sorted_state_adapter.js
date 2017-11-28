/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { createStateOperator, DidMutate } from "./state_adapter";
import { createUnsortedStateAdapter } from "./unsorted_state_adapter";
/**
 * @template T
 * @param {?} selectId
 * @param {?} sort
 * @return {?}
 */
export function createSortedStateAdapter(selectId, sort) {
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
        const /** @type {?} */ models = newModels.filter(model => !(selectId(model) in state.entities));
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
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
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
        const /** @type {?} */ original = state.entities[update.id];
        const /** @type {?} */ updated = Object.assign({}, original, update.changes);
        const /** @type {?} */ newKey = selectId(updated);
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
        const /** @type {?} */ models = [];
        const /** @type {?} */ didMutateIds = updates.filter(update => takeUpdatedModel(models, update, state)).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            const /** @type {?} */ originalIds = state.ids;
            const /** @type {?} */ updatedIndexes = [];
            state.ids = state.ids.filter((id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            });
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((i) => state.ids[i] === originalIds[i])) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function merge(models, state) {
        models.sort(sort);
        const /** @type {?} */ ids = [];
        let /** @type {?} */ i = 0;
        let /** @type {?} */ j = 0;
        while (i < models.length && j < state.ids.length) {
            const /** @type {?} */ model = models[i];
            const /** @type {?} */ modelId = selectId(model);
            const /** @type {?} */ entityId = state.ids[j];
            const /** @type {?} */ entity = state.entities[entityId];
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
        models.forEach((model, i) => {
            state.entities[selectId(model)] = model;
        });
    }
    return {
        removeOne,
        removeMany,
        removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        addAll: createStateOperator(addAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
    };
}
//# sourceMappingURL=sorted_state_adapter.js.map