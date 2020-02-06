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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFVQSxtQ0FFQzs7Ozs7QUFFRCxNQUFNLE9BQWdCLFVBQVU7Q0FFL0I7Ozs7O0FBRUQsK0JBR0M7OztJQUZDLHVCQUFXOztJQUNYLDRCQUFvQjs7Ozs7O0FBR3RCLCtCQUdDOzs7SUFGQyx1QkFBVzs7SUFDWCw0QkFBb0I7Ozs7OztBQVN0QixpQ0FHQzs7O0lBRkMsMEJBQXlCOztJQUN6QiwrQkFBd0I7Ozs7OztBQUcxQixzQ0FHQzs7O0lBRkMsb0NBQXdCOztJQUN4Qix3Q0FBa0M7Ozs7OztBQUdwQyx3Q0F5QkM7Ozs7Ozs7O0lBeEJDLG1FQUF5RDs7Ozs7OztJQUN6RCxzRUFBOEQ7Ozs7Ozs7O0lBRzlELHFFQUE2RDs7Ozs7OztJQUU3RCxxRUFBNkQ7Ozs7Ozs7SUFFN0QsbUVBQThEOzs7Ozs7O0lBQzlELG1FQUE4RDs7Ozs7OztJQUU5RCxxRUFBa0U7Ozs7Ozs7SUFDbEUscUVBQWtFOzs7Ozs7O0lBQ2xFLDBFQUEyRTs7Ozs7O0lBRTNFLDhEQUFpRDs7Ozs7OztJQUVqRCxzRUFBb0U7Ozs7Ozs7SUFDcEUsd0VBQXdFOzs7Ozs7O0lBRXhFLHNFQUE0RDs7Ozs7OztJQUM1RCx5RUFBaUU7Ozs7Ozs7SUFFakUsNkRBQThEOzs7Ozs7QUFHaEUscUNBS0M7OztJQUpDLG9DQUE2Qzs7SUFDN0MseUNBQTRDOztJQUM1QyxvQ0FBNkI7O0lBQzdCLHNDQUFrQzs7Ozs7O0FBR3BDLG1DQVNDOzs7SUFSQyxpQ0FBd0I7O0lBQ3hCLHFDQUFrQzs7OztJQUNsQywwREFBa0M7Ozs7OztJQUNsQywrREFBZ0U7Ozs7SUFDaEUsdURBQW1EOzs7Ozs7SUFDbkQsa0VBRXlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgQ29tcGFyZXJTdHI8VD4gPSAoYTogVCwgYjogVCkgPT4gc3RyaW5nO1xuZXhwb3J0IHR5cGUgQ29tcGFyZXJOdW08VD4gPSAoYTogVCwgYjogVCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgdHlwZSBDb21wYXJlcjxUPiA9IENvbXBhcmVyTnVtPFQ+IHwgQ29tcGFyZXJTdHI8VD47XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JTdHI8VD4gPSAobW9kZWw6IFQpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JOdW08VD4gPSAobW9kZWw6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgSWRTZWxlY3RvcjxUPiA9IElkU2VsZWN0b3JTdHI8VD4gfCBJZFNlbGVjdG9yTnVtPFQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnlOdW08VD4ge1xuICBbaWQ6IG51bWJlcl06IFQgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaWN0aW9uYXJ5PFQ+IGltcGxlbWVudHMgRGljdGlvbmFyeU51bTxUPiB7XG4gIFtpZDogc3RyaW5nXTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVTdHI8VD4ge1xuICBpZDogc3RyaW5nO1xuICBjaGFuZ2VzOiBQYXJ0aWFsPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZU51bTxUPiB7XG4gIGlkOiBudW1iZXI7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZTxUPiA9IFVwZGF0ZVN0cjxUPiB8IFVwZGF0ZU51bTxUPjtcblxuZXhwb3J0IHR5cGUgUHJlZGljYXRlPFQ+ID0gKGVudGl0eTogVCkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IHR5cGUgRW50aXR5TWFwPFQ+ID0gKGVudGl0eTogVCkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTdGF0ZTxUPiB7XG4gIGlkczogc3RyaW5nW10gfCBudW1iZXJbXTtcbiAgZW50aXRpZXM6IERpY3Rpb25hcnk8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5RGVmaW5pdGlvbjxUPiB7XG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+O1xuICBzb3J0Q29tcGFyZXI6IGZhbHNlIHwgQ29tcGFyZXI8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U3RhdGVBZGFwdGVyPFQ+IHtcbiAgYWRkT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXR5OiBULCBzdGF0ZTogUyk6IFM7XG4gIGFkZE1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgLyoqIEBkZXByZWNhdGVkIGFkZEFsbCBoYXMgYmVlbiByZW5hbWVkLiBVc2Ugc2V0QWxsIGluc3RlYWQuICovXG4gIGFkZEFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICBzZXRBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBzdHJpbmcsIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBudW1iZXIsIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogc3RyaW5nW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleXM6IG51bWJlcltdLCBzdGF0ZTogUyk6IFM7XG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZUFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHN0YXRlOiBTKTogUztcblxuICB1cGRhdGVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFMpOiBTO1xuICB1cGRhdGVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4odXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBTKTogUztcblxuICB1cHNlcnRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcbiAgdXBzZXJ0TWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICBtYXA8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFMpOiBTO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlbGVjdG9yczxULCBWPiB7XG4gIHNlbGVjdElkczogKHN0YXRlOiBWKSA9PiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBzZWxlY3RFbnRpdGllczogKHN0YXRlOiBWKSA9PiBEaWN0aW9uYXJ5PFQ+O1xuICBzZWxlY3RBbGw6IChzdGF0ZTogVikgPT4gVFtdO1xuICBzZWxlY3RUb3RhbDogKHN0YXRlOiBWKSA9PiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5QWRhcHRlcjxUPiBleHRlbmRzIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+O1xuICBzb3J0Q29tcGFyZXI6IGZhbHNlIHwgQ29tcGFyZXI8VD47XG4gIGdldEluaXRpYWxTdGF0ZSgpOiBFbnRpdHlTdGF0ZTxUPjtcbiAgZ2V0SW5pdGlhbFN0YXRlPFMgZXh0ZW5kcyBvYmplY3Q+KHN0YXRlOiBTKTogRW50aXR5U3RhdGU8VD4gJiBTO1xuICBnZXRTZWxlY3RvcnMoKTogRW50aXR5U2VsZWN0b3JzPFQsIEVudGl0eVN0YXRlPFQ+PjtcbiAgZ2V0U2VsZWN0b3JzPFY+KFxuICAgIHNlbGVjdFN0YXRlOiAoc3RhdGU6IFYpID0+IEVudGl0eVN0YXRlPFQ+XG4gICk6IEVudGl0eVNlbGVjdG9yczxULCBWPjtcbn1cbiJdfQ==