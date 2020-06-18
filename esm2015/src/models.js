/**
 * @fileoverview added by tsickle
 * Generated from: src/models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
export function DictionaryNum() { }
/**
 * @abstract
 * @template T
 */
export class Dictionary {
}
/**
 * @record
 * @template T
 */
export function UpdateStr() { }
if (false) {
    /** @type {?} */
    UpdateStr.prototype.id;
    /** @type {?} */
    UpdateStr.prototype.changes;
}
/**
 * @record
 * @template T
 */
export function UpdateNum() { }
if (false) {
    /** @type {?} */
    UpdateNum.prototype.id;
    /** @type {?} */
    UpdateNum.prototype.changes;
}
/**
 * @record
 * @template T
 */
export function EntityState() { }
if (false) {
    /** @type {?} */
    EntityState.prototype.ids;
    /** @type {?} */
    EntityState.prototype.entities;
}
/**
 * @record
 * @template T
 */
export function EntityDefinition() { }
if (false) {
    /** @type {?} */
    EntityDefinition.prototype.selectId;
    /** @type {?} */
    EntityDefinition.prototype.sortComparer;
}
/**
 * @record
 * @template T
 */
export function EntityStateAdapter() { }
if (false) {
    /**
     * @template S
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.addOne = function (entity, state) { };
    /**
     * @template S
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.addMany = function (entities, state) { };
    /**
     * @deprecated addAll has been renamed. Use setAll instead.
     * @template S
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.addAll = function (entities, state) { };
    /**
     * @template S
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.setAll = function (entities, state) { };
    /**
     * @template S
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.setOne = function (entity, state) { };
    /**
     * @template S
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeOne = function (key, state) { };
    /**
     * @template S
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeOne = function (key, state) { };
    /**
     * @template S
     * @param {?} keys
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeMany = function (keys, state) { };
    /**
     * @template S
     * @param {?} keys
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeMany = function (keys, state) { };
    /**
     * @template S
     * @param {?} predicate
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeMany = function (predicate, state) { };
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.removeAll = function (state) { };
    /**
     * @template S
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.updateOne = function (update, state) { };
    /**
     * @template S
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.updateMany = function (updates, state) { };
    /**
     * @template S
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.upsertOne = function (entity, state) { };
    /**
     * @template S
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.upsertMany = function (entities, state) { };
    /**
     * @template S
     * @param {?} map
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.map = function (map, state) { };
}
/**
 * @record
 * @template T, V
 */
export function EntitySelectors() { }
if (false) {
    /** @type {?} */
    EntitySelectors.prototype.selectIds;
    /** @type {?} */
    EntitySelectors.prototype.selectEntities;
    /** @type {?} */
    EntitySelectors.prototype.selectAll;
    /** @type {?} */
    EntitySelectors.prototype.selectTotal;
}
/**
 * @record
 * @template T
 */
export function EntityAdapter() { }
if (false) {
    /** @type {?} */
    EntityAdapter.prototype.selectId;
    /** @type {?} */
    EntityAdapter.prototype.sortComparer;
    /**
     * @return {?}
     */
    EntityAdapter.prototype.getInitialState = function () { };
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    EntityAdapter.prototype.getInitialState = function (state) { };
    /**
     * @return {?}
     */
    EntityAdapter.prototype.getSelectors = function () { };
    /**
     * @template V
     * @param {?} selectState
     * @return {?}
     */
    EntityAdapter.prototype.getSelectors = function (selectState) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxtQ0FFQzs7Ozs7QUFFRCxNQUFNLE9BQWdCLFVBQVU7Q0FFL0I7Ozs7O0FBRUQsK0JBR0M7OztJQUZDLHVCQUFXOztJQUNYLDRCQUFvQjs7Ozs7O0FBR3RCLCtCQUdDOzs7SUFGQyx1QkFBVzs7SUFDWCw0QkFBb0I7Ozs7OztBQVN0QixpQ0FHQzs7O0lBRkMsMEJBQXlCOztJQUN6QiwrQkFBd0I7Ozs7OztBQUcxQixzQ0FHQzs7O0lBRkMsb0NBQXdCOztJQUN4Qix3Q0FBa0M7Ozs7OztBQUdwQyx3Q0EwQkM7Ozs7Ozs7O0lBekJDLG1FQUF5RDs7Ozs7OztJQUN6RCxzRUFBOEQ7Ozs7Ozs7O0lBRzlELHFFQUE2RDs7Ozs7OztJQUU3RCxxRUFBNkQ7Ozs7Ozs7SUFDN0QsbUVBQXlEOzs7Ozs7O0lBRXpELG1FQUE4RDs7Ozs7OztJQUM5RCxtRUFBOEQ7Ozs7Ozs7SUFFOUQscUVBQWtFOzs7Ozs7O0lBQ2xFLHFFQUFrRTs7Ozs7OztJQUNsRSwwRUFBMkU7Ozs7OztJQUUzRSw4REFBaUQ7Ozs7Ozs7SUFFakQsc0VBQW9FOzs7Ozs7O0lBQ3BFLHdFQUF3RTs7Ozs7OztJQUV4RSxzRUFBNEQ7Ozs7Ozs7SUFDNUQseUVBQWlFOzs7Ozs7O0lBRWpFLDZEQUE4RDs7Ozs7O0FBR2hFLHFDQUtDOzs7SUFKQyxvQ0FBNkM7O0lBQzdDLHlDQUE0Qzs7SUFDNUMsb0NBQTZCOztJQUM3QixzQ0FBa0M7Ozs7OztBQUdwQyxtQ0FTQzs7O0lBUkMsaUNBQXdCOztJQUN4QixxQ0FBa0M7Ozs7SUFDbEMsMERBQWtDOzs7Ozs7SUFDbEMsK0RBQWdFOzs7O0lBQ2hFLHVEQUFtRDs7Ozs7O0lBQ25ELGtFQUV5QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIENvbXBhcmVyPFQ+ID0gKGE6IFQsIGI6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgSWRTZWxlY3RvclN0cjxUPiA9IChtb2RlbDogVCkgPT4gc3RyaW5nO1xuZXhwb3J0IHR5cGUgSWRTZWxlY3Rvck51bTxUPiA9IChtb2RlbDogVCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgdHlwZSBJZFNlbGVjdG9yPFQ+ID0gSWRTZWxlY3RvclN0cjxUPiB8IElkU2VsZWN0b3JOdW08VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdGlvbmFyeU51bTxUPiB7XG4gIFtpZDogbnVtYmVyXTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpY3Rpb25hcnk8VD4gaW1wbGVtZW50cyBEaWN0aW9uYXJ5TnVtPFQ+IHtcbiAgW2lkOiBzdHJpbmddOiBUIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZVN0cjxUPiB7XG4gIGlkOiBzdHJpbmc7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTnVtPFQ+IHtcbiAgaWQ6IG51bWJlcjtcbiAgY2hhbmdlczogUGFydGlhbDxUPjtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlPFQ+ID0gVXBkYXRlU3RyPFQ+IHwgVXBkYXRlTnVtPFQ+O1xuXG5leHBvcnQgdHlwZSBQcmVkaWNhdGU8VD4gPSAoZW50aXR5OiBUKSA9PiBib29sZWFuO1xuXG5leHBvcnQgdHlwZSBFbnRpdHlNYXA8VD4gPSAoZW50aXR5OiBUKSA9PiBUO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVN0YXRlPFQ+IHtcbiAgaWRzOiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBlbnRpdGllczogRGljdGlvbmFyeTxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlEZWZpbml0aW9uPFQ+IHtcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD47XG4gIHNvcnRDb21wYXJlcjogZmFsc2UgfCBDb21wYXJlcjxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD4ge1xuICBhZGRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcbiAgYWRkTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICAvKiogQGRlcHJlY2F0ZWQgYWRkQWxsIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSBzZXRBbGwgaW5zdGVhZC4gKi9cbiAgYWRkQWxsPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuXG4gIHNldEFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcbiAgc2V0T25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXR5OiBULCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBzdHJpbmcsIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBudW1iZXIsIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogc3RyaW5nW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleXM6IG51bWJlcltdLCBzdGF0ZTogUyk6IFM7XG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZUFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHN0YXRlOiBTKTogUztcblxuICB1cGRhdGVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuICB1cGRhdGVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4odXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBTKTogUztcblxuICB1cHNlcnRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcbiAgdXBzZXJ0TWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICBtYXA8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFMpOiBTO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlbGVjdG9yczxULCBWPiB7XG4gIHNlbGVjdElkczogKHN0YXRlOiBWKSA9PiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBzZWxlY3RFbnRpdGllczogKHN0YXRlOiBWKSA9PiBEaWN0aW9uYXJ5PFQ+O1xuICBzZWxlY3RBbGw6IChzdGF0ZTogVikgPT4gVFtdO1xuICBzZWxlY3RUb3RhbDogKHN0YXRlOiBWKSA9PiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5QWRhcHRlcjxUPiBleHRlbmRzIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+O1xuICBzb3J0Q29tcGFyZXI6IGZhbHNlIHwgQ29tcGFyZXI8VD47XG4gIGdldEluaXRpYWxTdGF0ZSgpOiBFbnRpdHlTdGF0ZTxUPjtcbiAgZ2V0SW5pdGlhbFN0YXRlPFMgZXh0ZW5kcyBvYmplY3Q+KHN0YXRlOiBTKTogRW50aXR5U3RhdGU8VD4gJiBTO1xuICBnZXRTZWxlY3RvcnMoKTogRW50aXR5U2VsZWN0b3JzPFQsIEVudGl0eVN0YXRlPFQ+PjtcbiAgZ2V0U2VsZWN0b3JzPFY+KFxuICAgIHNlbGVjdFN0YXRlOiAoc3RhdGU6IFYpID0+IEVudGl0eVN0YXRlPFQ+XG4gICk6IEVudGl0eVNlbGVjdG9yczxULCBWPjtcbn1cbiJdfQ==