import { createStateOperator } from './state_adapter';
import { createUnsortedStateAdapter } from './unsorted_state_adapter';
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
        const /** @type {?} */ key = selectId(entity);
        if (key in state.entities) {
            return false;
        }
        const /** @type {?} */ insertAt = findTargetIndex(state, entity);
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
        let /** @type {?} */ didMutate = false;
        for (let /** @type {?} */ index in newModels) {
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
        const /** @type {?} */ sortedModels = models.sort(sort);
        state.entities = {};
        state.ids = sortedModels.map(model => {
            const /** @type {?} */ id = selectId(model);
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
        const /** @type {?} */ original = state.entities[update.id];
        const /** @type {?} */ updated = Object.assign({}, original, update.changes);
        const /** @type {?} */ updatedKey = selectId(updated);
        const /** @type {?} */ result = sort(original, updated);
        if (result === 0) {
            if (updatedKey !== update.id) {
                delete state.entities[update.id];
                const /** @type {?} */ index = state.ids.indexOf(update.id);
                state.ids[index] = updatedKey;
            }
            state.entities[updatedKey] = updated;
            return true;
        }
        const /** @type {?} */ index = state.ids.indexOf(update.id);
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
        let /** @type {?} */ didMutate = false;
        for (let /** @type {?} */ index in updates) {
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
        for (let /** @type {?} */ i = 0; i < state.ids.length; i++) {
            const /** @type {?} */ entity = state.entities[state.ids[i]];
            const /** @type {?} */ isSmaller = sort(model, entity) < 0;
            if (isSmaller) {
                return i;
            }
        }
        return state.ids.length - 1;
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