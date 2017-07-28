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
        const /** @type {?} */ index = state.ids.indexOf(key);
        if (index !== -1) {
            return;
        }
        const /** @type {?} */ insertAt = findTargetIndex(state, entity);
        state.ids.splice(insertAt, 0, key);
        state.entities[key] = entity;
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        for (let /** @type {?} */ index in newModels) {
            addOneMutably(newModels[index], state);
        }
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
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        const /** @type {?} */ index = state.ids.indexOf(update.id);
        if (index === -1) {
            return;
        }
        const /** @type {?} */ original = state.entities[update.id];
        const /** @type {?} */ updated = Object.assign({}, original, update.changes);
        const /** @type {?} */ updatedKey = selectId(updated);
        const /** @type {?} */ result = sort(original, updated);
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
        for (let /** @type {?} */ index in updates) {
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
    function findTargetIndex(state, model, left = 0, right = state.ids.length - 1) {
        if (right === -1) {
            return 0;
        }
        let /** @type {?} */ middle;
        while (true) {
            middle = Math.floor((left + right) / 2);
            const /** @type {?} */ result = sort(state.entities[state.ids[middle]], model);
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