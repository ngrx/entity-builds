var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
export var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
    DidMutate[DidMutate["Both"] = 1] = "Both";
    DidMutate[DidMutate["None"] = 2] = "None";
})(DidMutate || (DidMutate = {}));
export function createStateOperator(mutator) {
    return function operation(arg, state) {
        var clonedEntityState = {
            ids: __spread(state.ids),
            entities: __assign({}, state.entities),
        };
        var didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return __assign({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlEQUFZLENBQUE7SUFDWix5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtHQUhNLFNBQVMsS0FBVCxTQUFTLFFBSXBCO0FBS0QsTUFBTSw4QkFDSixPQUE0QztJQUU1QyxNQUFNLENBQUMsbUJBQTZDLEdBQU0sRUFBRSxLQUFVO1FBQ3BFLElBQU0saUJBQWlCLEdBQW1CO1lBQ3hDLEdBQUcsV0FBTSxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ25CLFFBQVEsZUFBTyxLQUFLLENBQUMsUUFBUSxDQUFFO1NBQ2hDLENBQUM7UUFFRixJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNwRDtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLGNBQ0QsS0FBSyxJQUNSLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLElBQ3BDO1NBQ0g7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2QsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RhdGUsIEVudGl0eVN0YXRlQWRhcHRlciB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGVudW0gRGlkTXV0YXRlIHtcbiAgRW50aXRpZXNPbmx5LFxuICBCb3RoLFxuICBOb25lLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGVPcGVyYXRvcjxWLCBSPihcbiAgbXV0YXRvcjogKGFyZzogUiwgc3RhdGU6IEVudGl0eVN0YXRlPFY+KSA9PiBEaWRNdXRhdGVcbik6IEVudGl0eVN0YXRlPFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlT3BlcmF0b3I8ViwgUj4oXG4gIG11dGF0b3I6IChhcmc6IGFueSwgc3RhdGU6IGFueSkgPT4gRGlkTXV0YXRlXG4pOiBhbnkge1xuICByZXR1cm4gZnVuY3Rpb24gb3BlcmF0aW9uPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxWPj4oYXJnOiBSLCBzdGF0ZTogYW55KTogUyB7XG4gICAgY29uc3QgY2xvbmVkRW50aXR5U3RhdGU6IEVudGl0eVN0YXRlPFY+ID0ge1xuICAgICAgaWRzOiBbLi4uc3RhdGUuaWRzXSxcbiAgICAgIGVudGl0aWVzOiB7IC4uLnN0YXRlLmVudGl0aWVzIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZSA9IG11dGF0b3IoYXJnLCBjbG9uZWRFbnRpdHlTdGF0ZSk7XG5cbiAgICBpZiAoZGlkTXV0YXRlID09PSBEaWRNdXRhdGUuQm90aCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBjbG9uZWRFbnRpdHlTdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpZE11dGF0ZSA9PT0gRGlkTXV0YXRlLkVudGl0aWVzT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVudGl0aWVzOiBjbG9uZWRFbnRpdHlTdGF0ZS5lbnRpdGllcyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9O1xufVxuIl19