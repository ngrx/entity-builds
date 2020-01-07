/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/state_selectors.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRzdDLE1BQU0sVUFBVSxzQkFBc0I7Ozs7O0lBS3BDLFNBQVMsWUFBWSxDQUNuQixXQUE0Qzs7Y0FFdEMsU0FBUzs7OztRQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBOztjQUNyQyxjQUFjOzs7O1FBQUcsQ0FBQyxLQUFxQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBOztjQUMxRCxTQUFTLEdBQUcsY0FBYyxDQUM5QixTQUFTLEVBQ1QsY0FBYzs7Ozs7UUFDZCxDQUFDLEdBQVEsRUFBRSxRQUF1QixFQUFPLEVBQUUsQ0FDekMsR0FBRyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxtQkFBQSxRQUFRLEVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQzlDOztjQUVLLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUzs7OztRQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQztRQUVoRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU87Z0JBQ0wsU0FBUztnQkFDVCxjQUFjO2dCQUNkLFNBQVM7Z0JBQ1QsV0FBVzthQUNaLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsY0FBYyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDO1lBQzNELFNBQVMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztZQUNqRCxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7U0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRW50aXR5U3RhdGUsIEVudGl0eVNlbGVjdG9ycywgRGljdGlvbmFyeSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yc0ZhY3Rvcnk8VD4oKSB7XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoXG4gICAgc2VsZWN0U3RhdGU/OiAoc3RhdGU6IGFueSkgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIGFueT4ge1xuICAgIGNvbnN0IHNlbGVjdElkcyA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5pZHM7XG4gICAgY29uc3Qgc2VsZWN0RW50aXRpZXMgPSAoc3RhdGU6IEVudGl0eVN0YXRlPFQ+KSA9PiBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBzZWxlY3RBbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdElkcyxcbiAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgKGlkczogVFtdLCBlbnRpdGllczogRGljdGlvbmFyeTxUPik6IGFueSA9PlxuICAgICAgICBpZHMubWFwKChpZDogYW55KSA9PiAoZW50aXRpZXMgYXMgYW55KVtpZF0pXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdFRvdGFsID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0SWRzLCBpZHMgPT4gaWRzLmxlbmd0aCk7XG5cbiAgICBpZiAoIXNlbGVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RJZHMsXG4gICAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFRvdGFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0SWRzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0SWRzKSxcbiAgICAgIHNlbGVjdEVudGl0aWVzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0RW50aXRpZXMpLFxuICAgICAgc2VsZWN0QWxsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0QWxsKSxcbiAgICAgIHNlbGVjdFRvdGFsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0VG90YWwpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRTZWxlY3RvcnMgfTtcbn1cbiJdfQ==