import { createSelector } from '@ngrx/store';
/**
 * @template T
 * @return {?}
 */
export function createSelectorsFactory() {
    return {
        /**
         * @template V
         * @param {?} selectState
         * @return {?}
         */
        getSelectors(selectState) {
            const /** @type {?} */ selectIds = (state) => state.ids;
            const /** @type {?} */ selectEntities = (state) => state.entities;
            const /** @type {?} */ selectAll = createSelector(selectIds, selectEntities, (ids, entities) => ids.map(id => entities[id]));
            const /** @type {?} */ selectTotal = createSelector(selectIds, ids => ids.length);
            return {
                selectIds: createSelector(selectState, selectIds),
                selectEntities: createSelector(selectState, selectEntities),
                selectAll: createSelector(selectState, selectAll),
                selectTotal: createSelector(selectState, selectTotal),
            };
        },
    };
}
//# sourceMappingURL=state_selectors.js.map