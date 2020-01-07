/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/utils.ts
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
    const key = selectId(entity);
    if (isDevMode() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBRzFDLE1BQU0sVUFBVSxhQUFhLENBQUksTUFBUyxFQUFFLFFBQXVCOztVQUMzRCxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUU1QixJQUFJLFNBQVMsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FDVixzRkFBc0YsRUFDdEYsaUVBQWlFLEVBQ2pFLDZCQUE2QixFQUM3QixNQUFNLEVBQ04sZ0NBQWdDLEVBQ2hDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FDcEIsQ0FBQztLQUNIO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZFNlbGVjdG9yIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0SWRWYWx1ZTxUPihlbnRpdHk6IFQsIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+KSB7XG4gIGNvbnN0IGtleSA9IHNlbGVjdElkKGVudGl0eSk7XG5cbiAgaWYgKGlzRGV2TW9kZSgpICYmIGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ0BuZ3J4L2VudGl0eTogVGhlIGVudGl0eSBwYXNzZWQgdG8gdGhlIGBzZWxlY3RJZGAgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgdW5kZWZpbmVkLicsXG4gICAgICAnWW91IHNob3VsZCBwcm9iYWJseSBwcm92aWRlIHlvdXIgb3duIGBzZWxlY3RJZGAgaW1wbGVtZW50YXRpb24uJyxcbiAgICAgICdUaGUgZW50aXR5IHRoYXQgd2FzIHBhc3NlZDonLFxuICAgICAgZW50aXR5LFxuICAgICAgJ1RoZSBgc2VsZWN0SWRgIGltcGxlbWVudGF0aW9uOicsXG4gICAgICBzZWxlY3RJZC50b1N0cmluZygpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBrZXk7XG59XG4iXX0=