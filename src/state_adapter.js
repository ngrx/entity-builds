/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
export function createStateOperator(mutator) {
    return function operation(arg, state) {
        const /** @type {?} */ clonedEntityState = {
            ids: [...state.ids],
            entities: Object.assign({}, state.entities),
        };
        mutator(arg, clonedEntityState);
        return Object.assign({}, state, clonedEntityState);
    };
}
//# sourceMappingURL=state_adapter.js.map