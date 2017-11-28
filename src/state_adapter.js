/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const DidMutate = {
    EntitiesOnly: 0,
    Both: 1,
    None: 2,
};
export { DidMutate };
DidMutate[DidMutate.EntitiesOnly] = "EntitiesOnly";
DidMutate[DidMutate.Both] = "Both";
DidMutate[DidMutate.None] = "None";
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
        const /** @type {?} */ didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object.assign({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    };
}
//# sourceMappingURL=state_adapter.js.map