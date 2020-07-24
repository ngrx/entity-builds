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
export function EntityMapOneNum() { }
if (false) {
    /** @type {?} */
    EntityMapOneNum.prototype.id;
    /** @type {?} */
    EntityMapOneNum.prototype.map;
}
/**
 * @record
 * @template T
 */
export function EntityMapOneStr() { }
if (false) {
    /** @type {?} */
    EntityMapOneStr.prototype.id;
    /** @type {?} */
    EntityMapOneStr.prototype.map;
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
    EntityStateAdapter.prototype.mapOne = function (map, state) { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxtQ0FFQzs7Ozs7QUFFRCxNQUFNLE9BQWdCLFVBQVU7Q0FFL0I7Ozs7O0FBRUQsK0JBR0M7OztJQUZDLHVCQUFXOztJQUNYLDRCQUFvQjs7Ozs7O0FBR3RCLCtCQUdDOzs7SUFGQyx1QkFBVzs7SUFDWCw0QkFBb0I7Ozs7OztBQVN0QixxQ0FHQzs7O0lBRkMsNkJBQVc7O0lBQ1gsOEJBQWtCOzs7Ozs7QUFHcEIscUNBR0M7OztJQUZDLDZCQUFXOztJQUNYLDhCQUFrQjs7Ozs7O0FBS3BCLGlDQUdDOzs7SUFGQywwQkFBeUI7O0lBQ3pCLCtCQUF3Qjs7Ozs7O0FBRzFCLHNDQUdDOzs7SUFGQyxvQ0FBd0I7O0lBQ3hCLHdDQUFrQzs7Ozs7O0FBR3BDLHdDQTJCQzs7Ozs7Ozs7SUExQkMsbUVBQXlEOzs7Ozs7O0lBQ3pELHNFQUE4RDs7Ozs7Ozs7SUFHOUQscUVBQTZEOzs7Ozs7O0lBRTdELHFFQUE2RDs7Ozs7OztJQUM3RCxtRUFBeUQ7Ozs7Ozs7SUFFekQsbUVBQThEOzs7Ozs7O0lBQzlELG1FQUE4RDs7Ozs7OztJQUU5RCxxRUFBa0U7Ozs7Ozs7SUFDbEUscUVBQWtFOzs7Ozs7O0lBQ2xFLDBFQUEyRTs7Ozs7O0lBRTNFLDhEQUFpRDs7Ozs7OztJQUVqRCxzRUFBb0U7Ozs7Ozs7SUFDcEUsd0VBQXdFOzs7Ozs7O0lBRXhFLHNFQUE0RDs7Ozs7OztJQUM1RCx5RUFBaUU7Ozs7Ozs7SUFFakUsZ0VBQW9FOzs7Ozs7O0lBQ3BFLDZEQUE4RDs7Ozs7O0FBR2hFLHFDQUtDOzs7SUFKQyxvQ0FBNkM7O0lBQzdDLHlDQUE0Qzs7SUFDNUMsb0NBQTZCOztJQUM3QixzQ0FBa0M7Ozs7OztBQUdwQyxtQ0FTQzs7O0lBUkMsaUNBQXdCOztJQUN4QixxQ0FBa0M7Ozs7SUFDbEMsMERBQWtDOzs7Ozs7SUFDbEMsK0RBQWdFOzs7O0lBQ2hFLHVEQUFtRDs7Ozs7O0lBQ25ELGtFQUV5QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIENvbXBhcmVyPFQ+ID0gKGE6IFQsIGI6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgSWRTZWxlY3RvclN0cjxUPiA9IChtb2RlbDogVCkgPT4gc3RyaW5nO1xuZXhwb3J0IHR5cGUgSWRTZWxlY3Rvck51bTxUPiA9IChtb2RlbDogVCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgdHlwZSBJZFNlbGVjdG9yPFQ+ID0gSWRTZWxlY3RvclN0cjxUPiB8IElkU2VsZWN0b3JOdW08VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdGlvbmFyeU51bTxUPiB7XG4gIFtpZDogbnVtYmVyXTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpY3Rpb25hcnk8VD4gaW1wbGVtZW50cyBEaWN0aW9uYXJ5TnVtPFQ+IHtcbiAgW2lkOiBzdHJpbmddOiBUIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZVN0cjxUPiB7XG4gIGlkOiBzdHJpbmc7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTnVtPFQ+IHtcbiAgaWQ6IG51bWJlcjtcbiAgY2hhbmdlczogUGFydGlhbDxUPjtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlPFQ+ID0gVXBkYXRlU3RyPFQ+IHwgVXBkYXRlTnVtPFQ+O1xuXG5leHBvcnQgdHlwZSBQcmVkaWNhdGU8VD4gPSAoZW50aXR5OiBUKSA9PiBib29sZWFuO1xuXG5leHBvcnQgdHlwZSBFbnRpdHlNYXA8VD4gPSAoZW50aXR5OiBUKSA9PiBUO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eU1hcE9uZU51bTxUPiB7XG4gIGlkOiBudW1iZXI7XG4gIG1hcDogRW50aXR5TWFwPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eU1hcE9uZVN0cjxUPiB7XG4gIGlkOiBzdHJpbmc7XG4gIG1hcDogRW50aXR5TWFwPFQ+O1xufVxuXG5leHBvcnQgdHlwZSBFbnRpdHlNYXBPbmU8VD4gPSBFbnRpdHlNYXBPbmVOdW08VD4gfCBFbnRpdHlNYXBPbmVTdHI8VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U3RhdGU8VD4ge1xuICBpZHM6IHN0cmluZ1tdIHwgbnVtYmVyW107XG4gIGVudGl0aWVzOiBEaWN0aW9uYXJ5PFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eURlZmluaXRpb248VD4ge1xuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPjtcbiAgc29ydENvbXBhcmVyOiBmYWxzZSB8IENvbXBhcmVyPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIGFkZE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICBhZGRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCBhZGRBbGwgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIHNldEFsbCBpbnN0ZWFkLiAqL1xuICBhZGRBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgc2V0QWxsPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuICBzZXRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXk6IHN0cmluZywgc3RhdGU6IFMpOiBTO1xuICByZW1vdmVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXk6IG51bWJlciwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXlzOiBzdHJpbmdbXSwgc3RhdGU6IFMpOiBTO1xuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogbnVtYmVyW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHByZWRpY2F0ZTogUHJlZGljYXRlPFQ+LCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlQWxsPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oc3RhdGU6IFMpOiBTO1xuXG4gIHVwZGF0ZU9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUyk6IFM7XG4gIHVwZGF0ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFMpOiBTO1xuXG4gIHVwc2VydE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICB1cHNlcnRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuXG4gIG1hcE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KG1hcDogRW50aXR5TWFwT25lPFQ+LCBzdGF0ZTogUyk6IFM7XG4gIG1hcDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUyk6IFM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U2VsZWN0b3JzPFQsIFY+IHtcbiAgc2VsZWN0SWRzOiAoc3RhdGU6IFYpID0+IHN0cmluZ1tdIHwgbnVtYmVyW107XG4gIHNlbGVjdEVudGl0aWVzOiAoc3RhdGU6IFYpID0+IERpY3Rpb25hcnk8VD47XG4gIHNlbGVjdEFsbDogKHN0YXRlOiBWKSA9PiBUW107XG4gIHNlbGVjdFRvdGFsOiAoc3RhdGU6IFYpID0+IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlBZGFwdGVyPFQ+IGV4dGVuZHMgRW50aXR5U3RhdGVBZGFwdGVyPFQ+IHtcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD47XG4gIHNvcnRDb21wYXJlcjogZmFsc2UgfCBDb21wYXJlcjxUPjtcbiAgZ2V0SW5pdGlhbFN0YXRlKCk6IEVudGl0eVN0YXRlPFQ+O1xuICBnZXRJbml0aWFsU3RhdGU8UyBleHRlbmRzIG9iamVjdD4oc3RhdGU6IFMpOiBFbnRpdHlTdGF0ZTxUPiAmIFM7XG4gIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xufVxuIl19