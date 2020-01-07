import { __assign, __read, __spread } from "tslib";
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
            return __assign(__assign({}, state), { entities: clonedEntityState.entities });
        }
        return state;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlEQUFZLENBQUE7SUFDWix5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtBQUNOLENBQUMsRUFKVyxTQUFTLEtBQVQsU0FBUyxRQUlwQjtBQUtELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsT0FBNEM7SUFFNUMsT0FBTyxTQUFTLFNBQVMsQ0FBMkIsR0FBTSxFQUFFLEtBQVU7UUFDcEUsSUFBTSxpQkFBaUIsR0FBbUI7WUFDeEMsR0FBRyxXQUFNLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDbkIsUUFBUSxlQUFPLEtBQUssQ0FBQyxRQUFRLENBQUU7U0FDaEMsQ0FBQztRQUVGLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3hDLDZCQUNLLEtBQUssS0FDUixRQUFRLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxJQUNwQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RhdGUgfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBlbnVtIERpZE11dGF0ZSB7XG4gIEVudGl0aWVzT25seSxcbiAgQm90aCxcbiAgTm9uZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlT3BlcmF0b3I8ViwgUj4oXG4gIG11dGF0b3I6IChhcmc6IFIsIHN0YXRlOiBFbnRpdHlTdGF0ZTxWPikgPT4gRGlkTXV0YXRlXG4pOiBFbnRpdHlTdGF0ZTxWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZU9wZXJhdG9yPFYsIFI+KFxuICBtdXRhdG9yOiAoYXJnOiBhbnksIHN0YXRlOiBhbnkpID0+IERpZE11dGF0ZVxuKTogYW55IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9wZXJhdGlvbjxTIGV4dGVuZHMgRW50aXR5U3RhdGU8Vj4+KGFyZzogUiwgc3RhdGU6IGFueSk6IFMge1xuICAgIGNvbnN0IGNsb25lZEVudGl0eVN0YXRlOiBFbnRpdHlTdGF0ZTxWPiA9IHtcbiAgICAgIGlkczogWy4uLnN0YXRlLmlkc10sXG4gICAgICBlbnRpdGllczogeyAuLi5zdGF0ZS5lbnRpdGllcyB9LFxuICAgIH07XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPSBtdXRhdG9yKGFyZywgY2xvbmVkRW50aXR5U3RhdGUpO1xuXG4gICAgaWYgKGRpZE11dGF0ZSA9PT0gRGlkTXV0YXRlLkJvdGgpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgY2xvbmVkRW50aXR5U3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChkaWRNdXRhdGUgPT09IERpZE11dGF0ZS5FbnRpdGllc09ubHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBlbnRpdGllczogY2xvbmVkRW50aXR5U3RhdGUuZW50aXRpZXMsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==