/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/entity_state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template V
 * @return {?}
 */
export function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
/**
 * @template V
 * @return {?}
 */
export function createInitialStateFactory() {
    /**
     * @param {?=} additionalState
     * @return {?}
     */
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5X3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL2VudGl0eV9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLE9BQU87UUFDTCxHQUFHLEVBQUUsRUFBRTtRQUNQLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5Qjs7Ozs7SUFLdkMsU0FBUyxlQUFlLENBQUMsa0JBQXVCLEVBQUU7UUFDaEQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RhdGUgfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsRW50aXR5U3RhdGU8Vj4oKTogRW50aXR5U3RhdGU8Vj4ge1xuICByZXR1cm4ge1xuICAgIGlkczogW10sXG4gICAgZW50aXRpZXM6IHt9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5pdGlhbFN0YXRlRmFjdG9yeTxWPigpIHtcbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCk6IEVudGl0eVN0YXRlPFY+O1xuICBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGU8UyBleHRlbmRzIG9iamVjdD4oXG4gICAgYWRkaXRpb25hbFN0YXRlOiBTXG4gICk6IEVudGl0eVN0YXRlPFY+ICYgUztcbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKGFkZGl0aW9uYWxTdGF0ZTogYW55ID0ge30pOiBhbnkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGdldEluaXRpYWxFbnRpdHlTdGF0ZSgpLCBhZGRpdGlvbmFsU3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0SW5pdGlhbFN0YXRlIH07XG59XG4iXX0=