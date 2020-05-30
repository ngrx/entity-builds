/**
 * @fileoverview added by tsickle
 * Generated from: src/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
/**
 * @template T
 * @param {?} entity
 * @param {?} selectId
 * @return {?}
 */
export function selectIdValue(entity, selectId) {
    /** @type {?} */
    var key = selectId(entity);
    if (isDevMode() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}
//# sourceMappingURL=utils.js.map