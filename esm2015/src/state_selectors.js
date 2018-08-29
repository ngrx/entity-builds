/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        const selectIds = (state) => state.ids;
        /** @type {?} */
        const selectEntities = (state) => state.entities;
        /** @type {?} */
        const selectAll = createSelector(selectIds, selectEntities, (ids, entities) => ids.map((id) => (/** @type {?} */ (entities))[id]));
        /** @type {?} */
        const selectTotal = createSelector(selectIds, ids => ids.length);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFHN0MsTUFBTTs7Ozs7SUFLSixzQkFDRSxXQUE0Qzs7UUFFNUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1FBQzVDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7UUFDakUsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUM5QixTQUFTLEVBQ1QsY0FBYyxFQUNkLENBQUMsR0FBUSxFQUFFLFFBQXVCLEVBQU8sRUFBRSxDQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxtQkFBQyxRQUFlLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUM5QyxDQUFDOztRQUVGLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPO2dCQUNMLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxTQUFTO2dCQUNULFdBQVc7YUFDWixDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELGNBQWMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztZQUMzRCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7S0FDSDtJQUVELE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRW50aXR5U3RhdGUsIEVudGl0eVNlbGVjdG9ycywgRGljdGlvbmFyeSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yc0ZhY3Rvcnk8VD4oKSB7XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoXG4gICAgc2VsZWN0U3RhdGU/OiAoc3RhdGU6IGFueSkgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIGFueT4ge1xuICAgIGNvbnN0IHNlbGVjdElkcyA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5pZHM7XG4gICAgY29uc3Qgc2VsZWN0RW50aXRpZXMgPSAoc3RhdGU6IEVudGl0eVN0YXRlPFQ+KSA9PiBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBzZWxlY3RBbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdElkcyxcbiAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgKGlkczogVFtdLCBlbnRpdGllczogRGljdGlvbmFyeTxUPik6IGFueSA9PlxuICAgICAgICBpZHMubWFwKChpZDogYW55KSA9PiAoZW50aXRpZXMgYXMgYW55KVtpZF0pXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdFRvdGFsID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0SWRzLCBpZHMgPT4gaWRzLmxlbmd0aCk7XG5cbiAgICBpZiAoIXNlbGVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RJZHMsXG4gICAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFRvdGFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0SWRzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0SWRzKSxcbiAgICAgIHNlbGVjdEVudGl0aWVzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0RW50aXRpZXMpLFxuICAgICAgc2VsZWN0QWxsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0QWxsKSxcbiAgICAgIHNlbGVjdFRvdGFsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0VG90YWwpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRTZWxlY3RvcnMgfTtcbn1cbiJdfQ==