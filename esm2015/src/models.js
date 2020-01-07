/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/models.ts
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
     * @template S
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    EntityStateAdapter.prototype.addAll = function (entities, state) { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFVQSxtQ0FFQzs7Ozs7QUFFRCxNQUFNLE9BQWdCLFVBQVU7Q0FFL0I7Ozs7O0FBRUQsK0JBR0M7OztJQUZDLHVCQUFXOztJQUNYLDRCQUFvQjs7Ozs7O0FBR3RCLCtCQUdDOzs7SUFGQyx1QkFBVzs7SUFDWCw0QkFBb0I7Ozs7OztBQVN0QixpQ0FHQzs7O0lBRkMsMEJBQXlCOztJQUN6QiwrQkFBd0I7Ozs7OztBQUcxQixzQ0FHQzs7O0lBRkMsb0NBQXdCOztJQUN4Qix3Q0FBa0M7Ozs7OztBQUdwQyx3Q0FxQkM7Ozs7Ozs7O0lBcEJDLG1FQUF5RDs7Ozs7OztJQUN6RCxzRUFBOEQ7Ozs7Ozs7SUFDOUQscUVBQTZEOzs7Ozs7O0lBRTdELG1FQUE4RDs7Ozs7OztJQUM5RCxtRUFBOEQ7Ozs7Ozs7SUFFOUQscUVBQWtFOzs7Ozs7O0lBQ2xFLHFFQUFrRTs7Ozs7OztJQUNsRSwwRUFBMkU7Ozs7OztJQUUzRSw4REFBaUQ7Ozs7Ozs7SUFFakQsc0VBQW9FOzs7Ozs7O0lBQ3BFLHdFQUF3RTs7Ozs7OztJQUV4RSxzRUFBNEQ7Ozs7Ozs7SUFDNUQseUVBQWlFOzs7Ozs7O0lBRWpFLDZEQUE4RDs7Ozs7O0FBR2hFLHFDQUtDOzs7SUFKQyxvQ0FBNkM7O0lBQzdDLHlDQUE0Qzs7SUFDNUMsb0NBQTZCOztJQUM3QixzQ0FBa0M7Ozs7OztBQUdwQyxtQ0FTQzs7O0lBUkMsaUNBQXdCOztJQUN4QixxQ0FBa0M7Ozs7SUFDbEMsMERBQWtDOzs7Ozs7SUFDbEMsK0RBQWdFOzs7O0lBQ2hFLHVEQUFtRDs7Ozs7O0lBQ25ELGtFQUV5QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIENvbXBhcmVyU3RyPFQ+ID0gKGE6IFQsIGI6IFQpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIENvbXBhcmVyTnVtPFQ+ID0gKGE6IFQsIGI6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgQ29tcGFyZXI8VD4gPSBDb21wYXJlck51bTxUPiB8IENvbXBhcmVyU3RyPFQ+O1xuXG5leHBvcnQgdHlwZSBJZFNlbGVjdG9yU3RyPFQ+ID0gKG1vZGVsOiBUKSA9PiBzdHJpbmc7XG5leHBvcnQgdHlwZSBJZFNlbGVjdG9yTnVtPFQ+ID0gKG1vZGVsOiBUKSA9PiBudW1iZXI7XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3I8VD4gPSBJZFNlbGVjdG9yU3RyPFQ+IHwgSWRTZWxlY3Rvck51bTxUPjtcblxuZXhwb3J0IGludGVyZmFjZSBEaWN0aW9uYXJ5TnVtPFQ+IHtcbiAgW2lkOiBudW1iZXJdOiBUIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGljdGlvbmFyeTxUPiBpbXBsZW1lbnRzIERpY3Rpb25hcnlOdW08VD4ge1xuICBbaWQ6IHN0cmluZ106IFQgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlU3RyPFQ+IHtcbiAgaWQ6IHN0cmluZztcbiAgY2hhbmdlczogUGFydGlhbDxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVOdW08VD4ge1xuICBpZDogbnVtYmVyO1xuICBjaGFuZ2VzOiBQYXJ0aWFsPFQ+O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGU8VD4gPSBVcGRhdGVTdHI8VD4gfCBVcGRhdGVOdW08VD47XG5cbmV4cG9ydCB0eXBlIFByZWRpY2F0ZTxUPiA9IChlbnRpdHk6IFQpID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIEVudGl0eU1hcDxUPiA9IChlbnRpdHk6IFQpID0+IFQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U3RhdGU8VD4ge1xuICBpZHM6IHN0cmluZ1tdIHwgbnVtYmVyW107XG4gIGVudGl0aWVzOiBEaWN0aW9uYXJ5PFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eURlZmluaXRpb248VD4ge1xuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPjtcbiAgc29ydENvbXBhcmVyOiBmYWxzZSB8IENvbXBhcmVyPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIGFkZE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICBhZGRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuICBhZGRBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBzdHJpbmcsIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBudW1iZXIsIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogc3RyaW5nW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleXM6IG51bWJlcltdLCBzdGF0ZTogUyk6IFM7XG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZUFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHN0YXRlOiBTKTogUztcblxuICB1cGRhdGVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuICB1cGRhdGVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4odXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBTKTogUztcblxuICB1cHNlcnRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcbiAgdXBzZXJ0TWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICBtYXA8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFMpOiBTO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlbGVjdG9yczxULCBWPiB7XG4gIHNlbGVjdElkczogKHN0YXRlOiBWKSA9PiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBzZWxlY3RFbnRpdGllczogKHN0YXRlOiBWKSA9PiBEaWN0aW9uYXJ5PFQ+O1xuICBzZWxlY3RBbGw6IChzdGF0ZTogVikgPT4gVFtdO1xuICBzZWxlY3RUb3RhbDogKHN0YXRlOiBWKSA9PiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5QWRhcHRlcjxUPiBleHRlbmRzIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+O1xuICBzb3J0Q29tcGFyZXI6IGZhbHNlIHwgQ29tcGFyZXI8VD47XG4gIGdldEluaXRpYWxTdGF0ZSgpOiBFbnRpdHlTdGF0ZTxUPjtcbiAgZ2V0SW5pdGlhbFN0YXRlPFMgZXh0ZW5kcyBvYmplY3Q+KHN0YXRlOiBTKTogRW50aXR5U3RhdGU8VD4gJiBTO1xuICBnZXRTZWxlY3RvcnMoKTogRW50aXR5U2VsZWN0b3JzPFQsIEVudGl0eVN0YXRlPFQ+PjtcbiAgZ2V0U2VsZWN0b3JzPFY+KFxuICAgIHNlbGVjdFN0YXRlOiAoc3RhdGU6IFYpID0+IEVudGl0eVN0YXRlPFQ+XG4gICk6IEVudGl0eVNlbGVjdG9yczxULCBWPjtcbn1cbiJdfQ==