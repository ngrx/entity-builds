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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5LyIsInNvdXJjZXMiOlsic3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxtQ0FFQzs7Ozs7QUFFRCxNQUFNLE9BQWdCLFVBQVU7Q0FFL0I7Ozs7O0FBRUQsK0JBR0M7OztJQUZDLHVCQUFXOztJQUNYLDRCQUFvQjs7Ozs7O0FBR3RCLCtCQUdDOzs7SUFGQyx1QkFBVzs7SUFDWCw0QkFBb0I7Ozs7OztBQVN0QixxQ0FHQzs7O0lBRkMsNkJBQVc7O0lBQ1gsOEJBQWtCOzs7Ozs7QUFHcEIscUNBR0M7OztJQUZDLDZCQUFXOztJQUNYLDhCQUFrQjs7Ozs7O0FBS3BCLGlDQUdDOzs7SUFGQywwQkFBeUI7O0lBQ3pCLCtCQUF3Qjs7Ozs7O0FBRzFCLHNDQUdDOzs7SUFGQyxvQ0FBd0I7O0lBQ3hCLHdDQUFrQzs7Ozs7O0FBR3BDLHdDQXdCQzs7Ozs7Ozs7SUF2QkMsbUVBQXlEOzs7Ozs7O0lBQ3pELHNFQUE4RDs7Ozs7OztJQUU5RCxxRUFBNkQ7Ozs7Ozs7SUFDN0QsbUVBQXlEOzs7Ozs7O0lBRXpELG1FQUE4RDs7Ozs7OztJQUM5RCxtRUFBOEQ7Ozs7Ozs7SUFFOUQscUVBQWtFOzs7Ozs7O0lBQ2xFLHFFQUFrRTs7Ozs7OztJQUNsRSwwRUFBMkU7Ozs7OztJQUUzRSw4REFBaUQ7Ozs7Ozs7SUFFakQsc0VBQW9FOzs7Ozs7O0lBQ3BFLHdFQUF3RTs7Ozs7OztJQUV4RSxzRUFBNEQ7Ozs7Ozs7SUFDNUQseUVBQWlFOzs7Ozs7O0lBRWpFLGdFQUFvRTs7Ozs7OztJQUNwRSw2REFBOEQ7Ozs7OztBQUdoRSxxQ0FLQzs7O0lBSkMsb0NBQTZDOztJQUM3Qyx5Q0FBNEM7O0lBQzVDLG9DQUE2Qjs7SUFDN0Isc0NBQWtDOzs7Ozs7QUFHcEMsbUNBU0M7OztJQVJDLGlDQUF3Qjs7SUFDeEIscUNBQWtDOzs7O0lBQ2xDLDBEQUFrQzs7Ozs7O0lBQ2xDLCtEQUFnRTs7OztJQUNoRSx1REFBbUQ7Ozs7OztJQUNuRCxrRUFFeUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBDb21wYXJlcjxUPiA9IChhOiBULCBiOiBUKSA9PiBudW1iZXI7XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JTdHI8VD4gPSAobW9kZWw6IFQpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JOdW08VD4gPSAobW9kZWw6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgSWRTZWxlY3RvcjxUPiA9IElkU2VsZWN0b3JTdHI8VD4gfCBJZFNlbGVjdG9yTnVtPFQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnlOdW08VD4ge1xuICBbaWQ6IG51bWJlcl06IFQgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaWN0aW9uYXJ5PFQ+IGltcGxlbWVudHMgRGljdGlvbmFyeU51bTxUPiB7XG4gIFtpZDogc3RyaW5nXTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVTdHI8VD4ge1xuICBpZDogc3RyaW5nO1xuICBjaGFuZ2VzOiBQYXJ0aWFsPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZU51bTxUPiB7XG4gIGlkOiBudW1iZXI7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZTxUPiA9IFVwZGF0ZVN0cjxUPiB8IFVwZGF0ZU51bTxUPjtcblxuZXhwb3J0IHR5cGUgUHJlZGljYXRlPFQ+ID0gKGVudGl0eTogVCkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IHR5cGUgRW50aXR5TWFwPFQ+ID0gKGVudGl0eTogVCkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlNYXBPbmVOdW08VD4ge1xuICBpZDogbnVtYmVyO1xuICBtYXA6IEVudGl0eU1hcDxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlNYXBPbmVTdHI8VD4ge1xuICBpZDogc3RyaW5nO1xuICBtYXA6IEVudGl0eU1hcDxUPjtcbn1cblxuZXhwb3J0IHR5cGUgRW50aXR5TWFwT25lPFQ+ID0gRW50aXR5TWFwT25lTnVtPFQ+IHwgRW50aXR5TWFwT25lU3RyPFQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVN0YXRlPFQ+IHtcbiAgaWRzOiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBlbnRpdGllczogRGljdGlvbmFyeTxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlEZWZpbml0aW9uPFQ+IHtcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD47XG4gIHNvcnRDb21wYXJlcjogZmFsc2UgfCBDb21wYXJlcjxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD4ge1xuICBhZGRPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdHk6IFQsIHN0YXRlOiBTKTogUztcbiAgYWRkTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICBzZXRBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG4gIHNldE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZU9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleTogc3RyaW5nLCBzdGF0ZTogUyk6IFM7XG4gIHJlbW92ZU9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleTogbnVtYmVyLCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleXM6IHN0cmluZ1tdLCBzdGF0ZTogUyk6IFM7XG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXlzOiBudW1iZXJbXSwgc3RhdGU6IFMpOiBTO1xuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4ocHJlZGljYXRlOiBQcmVkaWNhdGU8VD4sIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihzdGF0ZTogUyk6IFM7XG5cbiAgdXBkYXRlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4odXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBTKTogUztcbiAgdXBkYXRlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHVwZGF0ZXM6IFVwZGF0ZTxUPltdLCBzdGF0ZTogUyk6IFM7XG5cbiAgdXBzZXJ0T25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXR5OiBULCBzdGF0ZTogUyk6IFM7XG4gIHVwc2VydE1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgbWFwT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4obWFwOiBFbnRpdHlNYXBPbmU8VD4sIHN0YXRlOiBTKTogUztcbiAgbWFwPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4obWFwOiBFbnRpdHlNYXA8VD4sIHN0YXRlOiBTKTogUztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTZWxlY3RvcnM8VCwgVj4ge1xuICBzZWxlY3RJZHM6IChzdGF0ZTogVikgPT4gc3RyaW5nW10gfCBudW1iZXJbXTtcbiAgc2VsZWN0RW50aXRpZXM6IChzdGF0ZTogVikgPT4gRGljdGlvbmFyeTxUPjtcbiAgc2VsZWN0QWxsOiAoc3RhdGU6IFYpID0+IFRbXTtcbiAgc2VsZWN0VG90YWw6IChzdGF0ZTogVikgPT4gbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eUFkYXB0ZXI8VD4gZXh0ZW5kcyBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD4ge1xuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPjtcbiAgc29ydENvbXBhcmVyOiBmYWxzZSB8IENvbXBhcmVyPFQ+O1xuICBnZXRJbml0aWFsU3RhdGUoKTogRW50aXR5U3RhdGU8VD47XG4gIGdldEluaXRpYWxTdGF0ZTxTIGV4dGVuZHMgb2JqZWN0PihzdGF0ZTogUyk6IEVudGl0eVN0YXRlPFQ+ICYgUztcbiAgZ2V0U2VsZWN0b3JzKCk6IEVudGl0eVNlbGVjdG9yczxULCBFbnRpdHlTdGF0ZTxUPj47XG4gIGdldFNlbGVjdG9yczxWPihcbiAgICBzZWxlY3RTdGF0ZTogKHN0YXRlOiBWKSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgVj47XG59XG4iXX0=