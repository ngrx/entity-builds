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
        var selectIds = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.ids; });
        /** @type {?} */
        var selectEntities = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.entities; });
        /** @type {?} */
        var selectAll = createSelector(selectIds, selectEntities, (/**
         * @param {?} ids
         * @param {?} entities
         * @return {?}
         */
        function (ids, entities) {
            return ids.map((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return ((/** @type {?} */ (entities)))[id]; }));
        }));
        /** @type {?} */
        var selectTotal = createSelector(selectIds, (/**
         * @param {?} ids
         * @return {?}
         */
        function (ids) { return ids.length; }));
        if (!selectState) {
            return {
                selectIds: selectIds,
                selectEntities: selectEntities,
                selectAll: selectAll,
                selectTotal: selectTotal,
            };
        }
        return {
            selectIds: createSelector(selectState, selectIds),
            selectEntities: createSelector(selectState, selectEntities),
            selectAll: createSelector(selectState, selectAll),
            selectTotal: createSelector(selectState, selectTotal),
        };
    }
    return { getSelectors: getSelectors };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvZW50aXR5LyIsInNvdXJjZXMiOlsic3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRzdDLE1BQU0sVUFBVSxzQkFBc0I7Ozs7O0lBS3BDLFNBQVMsWUFBWSxDQUNuQixXQUE0Qzs7WUFFdEMsU0FBUzs7OztRQUFHLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLEdBQUcsRUFBVCxDQUFTLENBQUE7O1lBQ3JDLGNBQWM7Ozs7UUFBRyxVQUFDLEtBQXFCLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFkLENBQWMsQ0FBQTs7WUFDMUQsU0FBUyxHQUFHLGNBQWMsQ0FDOUIsU0FBUyxFQUNULGNBQWM7Ozs7O1FBQ2QsVUFBQyxHQUFRLEVBQUUsUUFBdUI7WUFDaEMsT0FBQSxHQUFHLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsRUFBTyxJQUFLLE9BQUEsQ0FBQyxtQkFBQSxRQUFRLEVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFyQixDQUFxQixFQUFDO1FBQTNDLENBQTJDLEVBQzlDOztZQUVLLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sRUFBVixDQUFVLEVBQUM7UUFFaEUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPO2dCQUNMLFNBQVMsV0FBQTtnQkFDVCxjQUFjLGdCQUFBO2dCQUNkLFNBQVMsV0FBQTtnQkFDVCxXQUFXLGFBQUE7YUFDWixDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELGNBQWMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztZQUMzRCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRW50aXR5U3RhdGUsIEVudGl0eVNlbGVjdG9ycywgRGljdGlvbmFyeSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yc0ZhY3Rvcnk8VD4oKSB7XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoXG4gICAgc2VsZWN0U3RhdGU/OiAoc3RhdGU6IGFueSkgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIGFueT4ge1xuICAgIGNvbnN0IHNlbGVjdElkcyA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5pZHM7XG4gICAgY29uc3Qgc2VsZWN0RW50aXRpZXMgPSAoc3RhdGU6IEVudGl0eVN0YXRlPFQ+KSA9PiBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBzZWxlY3RBbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdElkcyxcbiAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgKGlkczogVFtdLCBlbnRpdGllczogRGljdGlvbmFyeTxUPik6IGFueSA9PlxuICAgICAgICBpZHMubWFwKChpZDogYW55KSA9PiAoZW50aXRpZXMgYXMgYW55KVtpZF0pXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdFRvdGFsID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0SWRzLCBpZHMgPT4gaWRzLmxlbmd0aCk7XG5cbiAgICBpZiAoIXNlbGVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RJZHMsXG4gICAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFRvdGFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0SWRzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0SWRzKSxcbiAgICAgIHNlbGVjdEVudGl0aWVzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0RW50aXRpZXMpLFxuICAgICAgc2VsZWN0QWxsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0QWxsKSxcbiAgICAgIHNlbGVjdFRvdGFsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0VG90YWwpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRTZWxlY3RvcnMgfTtcbn1cbiJdfQ==