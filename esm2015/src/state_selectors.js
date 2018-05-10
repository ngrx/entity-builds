/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ selectIds = (state) => state.ids;
        const /** @type {?} */ selectEntities = (state) => state.entities;
        const /** @type {?} */ selectAll = createSelector(selectIds, selectEntities, (ids, entities) => ids.map((id) => (/** @type {?} */ (entities))[id]));
        const /** @type {?} */ selectTotal = createSelector(selectIds, ids => ids.length);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFHN0MsTUFBTTs7Ozs7SUFLSixzQkFDRSxXQUE0QztRQUU1Qyx1QkFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDNUMsdUJBQU0sY0FBYyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNqRSx1QkFBTSxTQUFTLEdBQUcsY0FBYyxDQUM5QixTQUFTLEVBQ1QsY0FBYyxFQUNkLENBQUMsR0FBUSxFQUFFLFFBQXVCLEVBQU8sRUFBRSxDQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxtQkFBQyxRQUFlLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUM5QyxDQUFDO1FBRUYsdUJBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztnQkFDTCxTQUFTO2dCQUNULGNBQWM7Z0JBQ2QsU0FBUztnQkFDVCxXQUFXO2FBQ1osQ0FBQztTQUNIO1FBRUQsTUFBTSxDQUFDO1lBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELGNBQWMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztZQUMzRCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7S0FDSDtJQUVELE1BQU0sQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFbnRpdHlTdGF0ZSwgRW50aXR5U2VsZWN0b3JzLCBEaWN0aW9uYXJ5IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JzRmFjdG9yeTxUPigpIHtcbiAgZnVuY3Rpb24gZ2V0U2VsZWN0b3JzKCk6IEVudGl0eVNlbGVjdG9yczxULCBFbnRpdHlTdGF0ZTxUPj47XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9yczxWPihcbiAgICBzZWxlY3RTdGF0ZTogKHN0YXRlOiBWKSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgVj47XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycyhcbiAgICBzZWxlY3RTdGF0ZT86IChzdGF0ZTogYW55KSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgYW55PiB7XG4gICAgY29uc3Qgc2VsZWN0SWRzID0gKHN0YXRlOiBhbnkpID0+IHN0YXRlLmlkcztcbiAgICBjb25zdCBzZWxlY3RFbnRpdGllcyA9IChzdGF0ZTogRW50aXR5U3RhdGU8VD4pID0+IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IHNlbGVjdEFsbCA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgc2VsZWN0SWRzLFxuICAgICAgc2VsZWN0RW50aXRpZXMsXG4gICAgICAoaWRzOiBUW10sIGVudGl0aWVzOiBEaWN0aW9uYXJ5PFQ+KTogYW55ID0+XG4gICAgICAgIGlkcy5tYXAoKGlkOiBhbnkpID0+IChlbnRpdGllcyBhcyBhbnkpW2lkXSlcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0VG90YWwgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RJZHMsIGlkcyA9PiBpZHMubGVuZ3RoKTtcblxuICAgIGlmICghc2VsZWN0U3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdElkcyxcbiAgICAgICAgc2VsZWN0RW50aXRpZXMsXG4gICAgICAgIHNlbGVjdEFsbCxcbiAgICAgICAgc2VsZWN0VG90YWwsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3RJZHM6IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdFN0YXRlLCBzZWxlY3RJZHMpLFxuICAgICAgc2VsZWN0RW50aXRpZXM6IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdFN0YXRlLCBzZWxlY3RFbnRpdGllcyksXG4gICAgICBzZWxlY3RBbGw6IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdFN0YXRlLCBzZWxlY3RBbGwpLFxuICAgICAgc2VsZWN0VG90YWw6IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdFN0YXRlLCBzZWxlY3RUb3RhbCksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFNlbGVjdG9ycyB9O1xufVxuIl19