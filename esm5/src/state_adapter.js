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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var DidMutate = {
    EntitiesOnly: 0,
    Both: 1,
    None: 2,
};
export { DidMutate };
DidMutate[DidMutate.EntitiesOnly] = 'EntitiesOnly';
DidMutate[DidMutate.Both] = 'Both';
DidMutate[DidMutate.None] = 'None';
/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
export function createStateOperator(mutator) {
    return (/**
     * @template S
     * @param {?} arg
     * @param {?} state
     * @return {?}
     */
    function operation(arg, state) {
        /** @type {?} */
        var clonedEntityState = {
            ids: __spread(state.ids),
            entities: __assign({}, state.entities),
        };
        /** @type {?} */
        var didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return __assign(__assign({}, state), { entities: clonedEntityState.entities });
        }
        return state;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2VudGl0eS8iLCJzb3VyY2VzIjpbInNyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFZLFNBQVM7SUFDbkIsWUFBWSxHQUFBO0lBQ1osSUFBSSxHQUFBO0lBQ0osSUFBSSxHQUFBO0VBQ0w7Ozs7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLE9BQTRDO0lBRTVDOzs7Ozs7SUFBTyxTQUFTLFNBQVMsQ0FBMkIsR0FBTSxFQUFFLEtBQVU7O1lBQzlELGlCQUFpQixHQUFtQjtZQUN4QyxHQUFHLFdBQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNuQixRQUFRLGVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBRTtTQUNoQzs7WUFFSyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztRQUVqRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3hDLDZCQUNLLEtBQUssS0FDUixRQUFRLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxJQUNwQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RhdGUgfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBlbnVtIERpZE11dGF0ZSB7XG4gIEVudGl0aWVzT25seSxcbiAgQm90aCxcbiAgTm9uZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlT3BlcmF0b3I8ViwgUj4oXG4gIG11dGF0b3I6IChhcmc6IFIsIHN0YXRlOiBFbnRpdHlTdGF0ZTxWPikgPT4gRGlkTXV0YXRlXG4pOiBFbnRpdHlTdGF0ZTxWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZU9wZXJhdG9yPFYsIFI+KFxuICBtdXRhdG9yOiAoYXJnOiBhbnksIHN0YXRlOiBhbnkpID0+IERpZE11dGF0ZVxuKTogYW55IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9wZXJhdGlvbjxTIGV4dGVuZHMgRW50aXR5U3RhdGU8Vj4+KGFyZzogUiwgc3RhdGU6IGFueSk6IFMge1xuICAgIGNvbnN0IGNsb25lZEVudGl0eVN0YXRlOiBFbnRpdHlTdGF0ZTxWPiA9IHtcbiAgICAgIGlkczogWy4uLnN0YXRlLmlkc10sXG4gICAgICBlbnRpdGllczogeyAuLi5zdGF0ZS5lbnRpdGllcyB9LFxuICAgIH07XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPSBtdXRhdG9yKGFyZywgY2xvbmVkRW50aXR5U3RhdGUpO1xuXG4gICAgaWYgKGRpZE11dGF0ZSA9PT0gRGlkTXV0YXRlLkJvdGgpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgY2xvbmVkRW50aXR5U3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChkaWRNdXRhdGUgPT09IERpZE11dGF0ZS5FbnRpdGllc09ubHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBlbnRpdGllczogY2xvbmVkRW50aXR5U3RhdGUuZW50aXRpZXMsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==