/**
 * @fileoverview added by tsickle
 * Generated from: src/state_selectors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createSelector } from '@ngrx/store';
/**
 * @template T
 * @return {?}
 */
export function createSelectorsFactory() {
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
        (ids) => ids.length));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRzdDLE1BQU0sVUFBVSxzQkFBc0I7Ozs7O0lBS3BDLFNBQVMsWUFBWSxDQUNuQixXQUE0Qzs7Y0FFdEMsU0FBUzs7OztRQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBOztjQUNyQyxjQUFjOzs7O1FBQUcsQ0FBQyxLQUFxQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBOztjQUMxRCxTQUFTLEdBQUcsY0FBYyxDQUM5QixTQUFTLEVBQ1QsY0FBYzs7Ozs7UUFDZCxDQUFDLEdBQVEsRUFBRSxRQUF1QixFQUFPLEVBQUUsQ0FDekMsR0FBRyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxtQkFBQSxRQUFRLEVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQzlDOztjQUVLLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUzs7OztRQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDO1FBRWxFLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTztnQkFDTCxTQUFTO2dCQUNULGNBQWM7Z0JBQ2QsU0FBUztnQkFDVCxXQUFXO2FBQ1osQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLFNBQVMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztZQUNqRCxjQUFjLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUM7WUFDM0QsU0FBUyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELFdBQVcsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUN0RCxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFbnRpdHlTdGF0ZSwgRW50aXR5U2VsZWN0b3JzLCBEaWN0aW9uYXJ5IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JzRmFjdG9yeTxUPigpIHtcbiAgZnVuY3Rpb24gZ2V0U2VsZWN0b3JzKCk6IEVudGl0eVNlbGVjdG9yczxULCBFbnRpdHlTdGF0ZTxUPj47XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9yczxWPihcbiAgICBzZWxlY3RTdGF0ZTogKHN0YXRlOiBWKSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgVj47XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycyhcbiAgICBzZWxlY3RTdGF0ZT86IChzdGF0ZTogYW55KSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgYW55PiB7XG4gICAgY29uc3Qgc2VsZWN0SWRzID0gKHN0YXRlOiBhbnkpID0+IHN0YXRlLmlkcztcbiAgICBjb25zdCBzZWxlY3RFbnRpdGllcyA9IChzdGF0ZTogRW50aXR5U3RhdGU8VD4pID0+IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IHNlbGVjdEFsbCA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgc2VsZWN0SWRzLFxuICAgICAgc2VsZWN0RW50aXRpZXMsXG4gICAgICAoaWRzOiBUW10sIGVudGl0aWVzOiBEaWN0aW9uYXJ5PFQ+KTogYW55ID0+XG4gICAgICAgIGlkcy5tYXAoKGlkOiBhbnkpID0+IChlbnRpdGllcyBhcyBhbnkpW2lkXSlcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0VG90YWwgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RJZHMsIChpZHMpID0+IGlkcy5sZW5ndGgpO1xuXG4gICAgaWYgKCFzZWxlY3RTdGF0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0SWRzLFxuICAgICAgICBzZWxlY3RFbnRpdGllcyxcbiAgICAgICAgc2VsZWN0QWxsLFxuICAgICAgICBzZWxlY3RUb3RhbCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdElkczogY3JlYXRlU2VsZWN0b3Ioc2VsZWN0U3RhdGUsIHNlbGVjdElkcyksXG4gICAgICBzZWxlY3RFbnRpdGllczogY3JlYXRlU2VsZWN0b3Ioc2VsZWN0U3RhdGUsIHNlbGVjdEVudGl0aWVzKSxcbiAgICAgIHNlbGVjdEFsbDogY3JlYXRlU2VsZWN0b3Ioc2VsZWN0U3RhdGUsIHNlbGVjdEFsbCksXG4gICAgICBzZWxlY3RUb3RhbDogY3JlYXRlU2VsZWN0b3Ioc2VsZWN0U3RhdGUsIHNlbGVjdFRvdGFsKSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0U2VsZWN0b3JzIH07XG59XG4iXX0=