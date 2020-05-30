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
//# sourceMappingURL=state_selectors.js.map