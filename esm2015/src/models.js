/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @typedef {?} */
var ComparerStr;
export { ComparerStr };
/** @typedef {?} */
var ComparerNum;
export { ComparerNum };
/** @typedef {?} */
var Comparer;
export { Comparer };
/** @typedef {?} */
var IdSelectorStr;
export { IdSelectorStr };
/** @typedef {?} */
var IdSelectorNum;
export { IdSelectorNum };
/** @typedef {?} */
var IdSelector;
export { IdSelector };
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
/** @type {?} */
UpdateStr.prototype.id;
/** @type {?} */
UpdateStr.prototype.changes;
/**
 * @record
 * @template T
 */
export function UpdateNum() { }
/** @type {?} */
UpdateNum.prototype.id;
/** @type {?} */
UpdateNum.prototype.changes;
/** @typedef {?} */
var Update;
export { Update };
/** @typedef {?} */
var Predicate;
export { Predicate };
/** @typedef {?} */
var EntityMap;
export { EntityMap };
/**
 * @record
 * @template T
 */
export function EntityState() { }
/** @type {?} */
EntityState.prototype.ids;
/** @type {?} */
EntityState.prototype.entities;
/**
 * @record
 * @template T
 */
export function EntityDefinition() { }
/** @type {?} */
EntityDefinition.prototype.selectId;
/** @type {?} */
EntityDefinition.prototype.sortComparer;
/**
 * @record
 * @template T
 */
export function EntityStateAdapter() { }
/** @type {?} */
EntityStateAdapter.prototype.addOne;
/** @type {?} */
EntityStateAdapter.prototype.addMany;
/** @type {?} */
EntityStateAdapter.prototype.addAll;
/** @type {?} */
EntityStateAdapter.prototype.removeOne;
/** @type {?} */
EntityStateAdapter.prototype.removeOne;
/** @type {?} */
EntityStateAdapter.prototype.removeMany;
/** @type {?} */
EntityStateAdapter.prototype.removeMany;
/** @type {?} */
EntityStateAdapter.prototype.removeMany;
/** @type {?} */
EntityStateAdapter.prototype.removeAll;
/** @type {?} */
EntityStateAdapter.prototype.updateOne;
/** @type {?} */
EntityStateAdapter.prototype.updateMany;
/** @type {?} */
EntityStateAdapter.prototype.upsertOne;
/** @type {?} */
EntityStateAdapter.prototype.upsertMany;
/** @type {?} */
EntityStateAdapter.prototype.map;
/**
 * @record
 * @template T, V
 */
export function EntitySelectors() { }
/** @type {?} */
EntitySelectors.prototype.selectIds;
/** @type {?} */
EntitySelectors.prototype.selectEntities;
/** @type {?} */
EntitySelectors.prototype.selectAll;
/** @type {?} */
EntitySelectors.prototype.selectTotal;
/**
 * @record
 * @template T
 */
export function EntityAdapter() { }
/** @type {?} */
EntityAdapter.prototype.selectId;
/** @type {?} */
EntityAdapter.prototype.sortComparer;
/** @type {?} */
EntityAdapter.prototype.getInitialState;
/** @type {?} */
EntityAdapter.prototype.getInitialState;
/** @type {?} */
EntityAdapter.prototype.getSelectors;
/** @type {?} */
EntityAdapter.prototype.getSelectors;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsTUFBTSxPQUFnQixVQUFVO0NBRS9CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgQ29tcGFyZXJTdHI8VD4gPSAoYTogVCwgYjogVCkgPT4gc3RyaW5nO1xuZXhwb3J0IHR5cGUgQ29tcGFyZXJOdW08VD4gPSAoYTogVCwgYjogVCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgdHlwZSBDb21wYXJlcjxUPiA9IENvbXBhcmVyTnVtPFQ+IHwgQ29tcGFyZXJTdHI8VD47XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JTdHI8VD4gPSAobW9kZWw6IFQpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JOdW08VD4gPSAobW9kZWw6IFQpID0+IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgSWRTZWxlY3RvcjxUPiA9IElkU2VsZWN0b3JTdHI8VD4gfCBJZFNlbGVjdG9yTnVtPFQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnlOdW08VD4ge1xuICBbaWQ6IG51bWJlcl06IFQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaWN0aW9uYXJ5PFQ+IGltcGxlbWVudHMgRGljdGlvbmFyeU51bTxUPiB7XG4gIFtpZDogc3RyaW5nXTogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVTdHI8VD4ge1xuICBpZDogc3RyaW5nO1xuICBjaGFuZ2VzOiBQYXJ0aWFsPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZU51bTxUPiB7XG4gIGlkOiBudW1iZXI7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZTxUPiA9IFVwZGF0ZVN0cjxUPiB8IFVwZGF0ZU51bTxUPjtcblxuZXhwb3J0IHR5cGUgUHJlZGljYXRlPFQ+ID0gKGVudGl0eTogVCkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IHR5cGUgRW50aXR5TWFwPFQ+ID0gKGVudGl0eTogVCkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTdGF0ZTxUPiB7XG4gIGlkczogc3RyaW5nW10gfCBudW1iZXJbXTtcbiAgZW50aXRpZXM6IERpY3Rpb25hcnk8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5RGVmaW5pdGlvbjxUPiB7XG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+O1xuICBzb3J0Q29tcGFyZXI6IGZhbHNlIHwgQ29tcGFyZXI8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U3RhdGVBZGFwdGVyPFQ+IHtcbiAgYWRkT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXR5OiBULCBzdGF0ZTogUyk6IFM7XG4gIGFkZE1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG4gIGFkZEFsbDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0aWVzOiBUW10sIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXk6IHN0cmluZywgc3RhdGU6IFMpOiBTO1xuICByZW1vdmVPbmU8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXk6IG51bWJlciwgc3RhdGU6IFMpOiBTO1xuXG4gIHJlbW92ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihrZXlzOiBzdHJpbmdbXSwgc3RhdGU6IFMpOiBTO1xuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogbnVtYmVyW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHByZWRpY2F0ZTogUHJlZGljYXRlPFQ+LCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlQWxsPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oc3RhdGU6IFMpOiBTO1xuXG4gIHVwZGF0ZU9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUyk6IFM7XG4gIHVwZGF0ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFMpOiBTO1xuXG4gIHVwc2VydE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICB1cHNlcnRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuXG4gIG1hcDxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUyk6IFM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U2VsZWN0b3JzPFQsIFY+IHtcbiAgc2VsZWN0SWRzOiAoc3RhdGU6IFYpID0+IHN0cmluZ1tdIHwgbnVtYmVyW107XG4gIHNlbGVjdEVudGl0aWVzOiAoc3RhdGU6IFYpID0+IERpY3Rpb25hcnk8VD47XG4gIHNlbGVjdEFsbDogKHN0YXRlOiBWKSA9PiBUW107XG4gIHNlbGVjdFRvdGFsOiAoc3RhdGU6IFYpID0+IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlBZGFwdGVyPFQ+IGV4dGVuZHMgRW50aXR5U3RhdGVBZGFwdGVyPFQ+IHtcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD47XG4gIHNvcnRDb21wYXJlcjogZmFsc2UgfCBDb21wYXJlcjxUPjtcbiAgZ2V0SW5pdGlhbFN0YXRlKCk6IEVudGl0eVN0YXRlPFQ+O1xuICBnZXRJbml0aWFsU3RhdGU8UyBleHRlbmRzIG9iamVjdD4oc3RhdGU6IFMpOiBFbnRpdHlTdGF0ZTxUPiAmIFM7XG4gIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xufVxuIl19