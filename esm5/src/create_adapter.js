var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/create_adapter.ts
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
export function createEntityAdapter(options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ sortComparer: false, selectId: (/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return instance.id; }) }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
    /** @type {?} */
    var stateFactory = createInitialStateFactory();
    /** @type {?} */
    var selectorsFactory = createSelectorsFactory();
    /** @type {?} */
    var stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return __assign(__assign(__assign({ selectId: selectId,
        sortComparer: sortComparer }, stateFactory), selectorsFactory), stateAdapter);
}
//# sourceMappingURL=create_adapter.js.map