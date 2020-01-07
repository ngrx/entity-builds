/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/create_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createInitialStateFactory } from './entity_state';
import { createSelectorsFactory } from './state_selectors';
import { createSortedStateAdapter } from './sorted_state_adapter';
import { createUnsortedStateAdapter } from './unsorted_state_adapter';
/**
 * @template T
 * @param {?=} options
 * @return {?}
 */
export function createEntityAdapter(options = {}) {
    const { selectId, sortComparer } = Object.assign({ sortComparer: false, selectId: (/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => instance.id) }, options);
    /** @type {?} */
    const stateFactory = createInitialStateFactory();
    /** @type {?} */
    const selectorsFactory = createSelectorsFactory();
    /** @type {?} */
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object.assign(Object.assign(Object.assign({ selectId,
        sortComparer }, stateFactory), selectorsFactory), stateAdapter);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvY3JlYXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFPQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRXRFLE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsVUFHSSxFQUFFO1VBRUEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLG1CQUM5QixZQUFZLEVBQUUsS0FBSyxFQUNuQixRQUFROzs7O1FBQUUsQ0FBQyxRQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQ3JDLE9BQU8sQ0FDWDs7VUFFSyxZQUFZLEdBQUcseUJBQXlCLEVBQUs7O1VBQzdDLGdCQUFnQixHQUFHLHNCQUFzQixFQUFLOztVQUM5QyxZQUFZLEdBQUcsWUFBWTtRQUMvQixDQUFDLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUNsRCxDQUFDLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDO0lBRXhDLG1EQUNFLFFBQVE7UUFDUixZQUFZLElBQ1QsWUFBWSxHQUNaLGdCQUFnQixHQUNoQixZQUFZLEVBQ2Y7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBFbnRpdHlEZWZpbml0aW9uLFxuICBDb21wYXJlcixcbiAgSWRTZWxlY3RvcixcbiAgRW50aXR5QWRhcHRlcixcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY3JlYXRlSW5pdGlhbFN0YXRlRmFjdG9yeSB9IGZyb20gJy4vZW50aXR5X3N0YXRlJztcbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yc0ZhY3RvcnkgfSBmcm9tICcuL3N0YXRlX3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXIgfSBmcm9tICcuL3NvcnRlZF9zdGF0ZV9hZGFwdGVyJztcbmltcG9ydCB7IGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyIH0gZnJvbSAnLi91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVudGl0eUFkYXB0ZXI8VD4oXG4gIG9wdGlvbnM6IHtcbiAgICBzZWxlY3RJZD86IElkU2VsZWN0b3I8VD47XG4gICAgc29ydENvbXBhcmVyPzogZmFsc2UgfCBDb21wYXJlcjxUPjtcbiAgfSA9IHt9XG4pOiBFbnRpdHlBZGFwdGVyPFQ+IHtcbiAgY29uc3QgeyBzZWxlY3RJZCwgc29ydENvbXBhcmVyIH06IEVudGl0eURlZmluaXRpb248VD4gPSB7XG4gICAgc29ydENvbXBhcmVyOiBmYWxzZSxcbiAgICBzZWxlY3RJZDogKGluc3RhbmNlOiBhbnkpID0+IGluc3RhbmNlLmlkLFxuICAgIC4uLm9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3Qgc3RhdGVGYWN0b3J5ID0gY3JlYXRlSW5pdGlhbFN0YXRlRmFjdG9yeTxUPigpO1xuICBjb25zdCBzZWxlY3RvcnNGYWN0b3J5ID0gY3JlYXRlU2VsZWN0b3JzRmFjdG9yeTxUPigpO1xuICBjb25zdCBzdGF0ZUFkYXB0ZXIgPSBzb3J0Q29tcGFyZXJcbiAgICA/IGNyZWF0ZVNvcnRlZFN0YXRlQWRhcHRlcihzZWxlY3RJZCwgc29ydENvbXBhcmVyKVxuICAgIDogY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIoc2VsZWN0SWQpO1xuXG4gIHJldHVybiB7XG4gICAgc2VsZWN0SWQsXG4gICAgc29ydENvbXBhcmVyLFxuICAgIC4uLnN0YXRlRmFjdG9yeSxcbiAgICAuLi5zZWxlY3RvcnNGYWN0b3J5LFxuICAgIC4uLnN0YXRlQWRhcHRlcixcbiAgfTtcbn1cbiJdfQ==