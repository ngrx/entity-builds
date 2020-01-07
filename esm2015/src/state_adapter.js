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
export { DidMutate };
DidMutate[DidMutate.EntitiesOnly] = 'EntitiesOnly';
DidMutate[DidMutate.Both] = 'Both';
DidMutate[DidMutate.None] = 'None';
/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
export function createStateOperator(mutator) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE1BQVksU0FBUztJQUNuQixZQUFZLEdBQUE7SUFDWixJQUFJLEdBQUE7SUFDSixJQUFJLEdBQUE7RUFDTDs7Ozs7Ozs7OztBQUtELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsT0FBNEM7SUFFNUM7Ozs7OztJQUFPLFNBQVMsU0FBUyxDQUEyQixHQUFNLEVBQUUsS0FBVTs7Y0FDOUQsaUJBQWlCLEdBQW1CO1lBQ3hDLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNuQixRQUFRLG9CQUFPLEtBQUssQ0FBQyxRQUFRLENBQUU7U0FDaEM7O2NBRUssU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7UUFFakQsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNoQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLFlBQVksRUFBRTtZQUN4Qyx1Q0FDSyxLQUFLLEtBQ1IsUUFBUSxFQUFFLGlCQUFpQixDQUFDLFFBQVEsSUFDcEM7U0FDSDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZW51bSBEaWRNdXRhdGUge1xuICBFbnRpdGllc09ubHksXG4gIEJvdGgsXG4gIE5vbmUsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZU9wZXJhdG9yPFYsIFI+KFxuICBtdXRhdG9yOiAoYXJnOiBSLCBzdGF0ZTogRW50aXR5U3RhdGU8Vj4pID0+IERpZE11dGF0ZVxuKTogRW50aXR5U3RhdGU8Vj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGVPcGVyYXRvcjxWLCBSPihcbiAgbXV0YXRvcjogKGFyZzogYW55LCBzdGF0ZTogYW55KSA9PiBEaWRNdXRhdGVcbik6IGFueSB7XG4gIHJldHVybiBmdW5jdGlvbiBvcGVyYXRpb248UyBleHRlbmRzIEVudGl0eVN0YXRlPFY+Pihhcmc6IFIsIHN0YXRlOiBhbnkpOiBTIHtcbiAgICBjb25zdCBjbG9uZWRFbnRpdHlTdGF0ZTogRW50aXR5U3RhdGU8Vj4gPSB7XG4gICAgICBpZHM6IFsuLi5zdGF0ZS5pZHNdLFxuICAgICAgZW50aXRpZXM6IHsgLi4uc3RhdGUuZW50aXRpZXMgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGlkTXV0YXRlID0gbXV0YXRvcihhcmcsIGNsb25lZEVudGl0eVN0YXRlKTtcblxuICAgIGlmIChkaWRNdXRhdGUgPT09IERpZE11dGF0ZS5Cb3RoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGNsb25lZEVudGl0eVN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoZGlkTXV0YXRlID09PSBEaWRNdXRhdGUuRW50aXRpZXNPbmx5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZW50aXRpZXM6IGNsb25lZEVudGl0eVN0YXRlLmVudGl0aWVzLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH07XG59XG4iXX0=