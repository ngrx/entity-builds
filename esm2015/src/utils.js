/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFHMUMsTUFBTSxVQUFVLGFBQWEsQ0FBSSxNQUFTLEVBQUUsUUFBdUI7O0lBQ2pFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QixJQUFJLFNBQVMsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FDVixzRkFBc0YsRUFDdEYsaUVBQWlFLEVBQ2pFLDZCQUE2QixFQUM3QixNQUFNLEVBQ04sZ0NBQWdDLEVBQ2hDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FDcEIsQ0FBQztLQUNIO0lBRUQsT0FBTyxHQUFHLENBQUM7Q0FDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWRTZWxlY3RvciB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdElkVmFsdWU8VD4oZW50aXR5OiBULCBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPikge1xuICBjb25zdCBrZXkgPSBzZWxlY3RJZChlbnRpdHkpO1xuXG4gIGlmIChpc0Rldk1vZGUoKSAmJiBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdAbmdyeC9lbnRpdHk6IFRoZSBlbnRpdHkgcGFzc2VkIHRvIHRoZSBgc2VsZWN0SWRgIGltcGxlbWVudGF0aW9uIHJldHVybmVkIHVuZGVmaW5lZC4nLFxuICAgICAgJ1lvdSBzaG91bGQgcHJvYmFibHkgcHJvdmlkZSB5b3VyIG93biBgc2VsZWN0SWRgIGltcGxlbWVudGF0aW9uLicsXG4gICAgICAnVGhlIGVudGl0eSB0aGF0IHdhcyBwYXNzZWQ6JyxcbiAgICAgIGVudGl0eSxcbiAgICAgICdUaGUgYHNlbGVjdElkYCBpbXBsZW1lbnRhdGlvbjonLFxuICAgICAgc2VsZWN0SWQudG9TdHJpbmcoKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4ga2V5O1xufVxuIl19