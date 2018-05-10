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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxNQUFNLDhCQUNKLE9BQTRDO0lBRTVDLE1BQU0sQ0FBQyxtQkFBNkMsR0FBTSxFQUFFLEtBQVU7UUFDcEUsdUJBQU0saUJBQWlCLEdBQW1CO1lBQ3hDLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNuQixRQUFRLG9CQUFPLEtBQUssQ0FBQyxRQUFRLENBQUU7U0FDaEMsQ0FBQztRQUVGLHVCQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNwRDtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLG1CQUNELEtBQUssSUFDUixRQUFRLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxJQUNwQztTQUNIO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVN0YXRlLCBFbnRpdHlTdGF0ZUFkYXB0ZXIgfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBlbnVtIERpZE11dGF0ZSB7XG4gIEVudGl0aWVzT25seSxcbiAgQm90aCxcbiAgTm9uZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlT3BlcmF0b3I8ViwgUj4oXG4gIG11dGF0b3I6IChhcmc6IFIsIHN0YXRlOiBFbnRpdHlTdGF0ZTxWPikgPT4gRGlkTXV0YXRlXG4pOiBFbnRpdHlTdGF0ZTxWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZU9wZXJhdG9yPFYsIFI+KFxuICBtdXRhdG9yOiAoYXJnOiBhbnksIHN0YXRlOiBhbnkpID0+IERpZE11dGF0ZVxuKTogYW55IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9wZXJhdGlvbjxTIGV4dGVuZHMgRW50aXR5U3RhdGU8Vj4+KGFyZzogUiwgc3RhdGU6IGFueSk6IFMge1xuICAgIGNvbnN0IGNsb25lZEVudGl0eVN0YXRlOiBFbnRpdHlTdGF0ZTxWPiA9IHtcbiAgICAgIGlkczogWy4uLnN0YXRlLmlkc10sXG4gICAgICBlbnRpdGllczogeyAuLi5zdGF0ZS5lbnRpdGllcyB9LFxuICAgIH07XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPSBtdXRhdG9yKGFyZywgY2xvbmVkRW50aXR5U3RhdGUpO1xuXG4gICAgaWYgKGRpZE11dGF0ZSA9PT0gRGlkTXV0YXRlLkJvdGgpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgY2xvbmVkRW50aXR5U3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChkaWRNdXRhdGUgPT09IERpZE11dGF0ZS5FbnRpdGllc09ubHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBlbnRpdGllczogY2xvbmVkRW50aXR5U3RhdGUuZW50aXRpZXMsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==