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
import { createInitialStateFactory } from './entity_state';
import { createSelectorsFactory } from './state_selectors';
import { createSortedStateAdapter } from './sorted_state_adapter';
import { createUnsortedStateAdapter } from './unsorted_state_adapter';
export function createEntityAdapter(options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ sortComparer: false, selectId: function (instance) { return instance.id; } }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
    var stateFactory = createInitialStateFactory();
    var selectorsFactory = createSelectorsFactory();
    var stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return __assign({ selectId: selectId,
        sortComparer: sortComparer }, stateFactory, selectorsFactory, stateAdapter);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvY3JlYXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV0RSxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLE9BR007SUFITix3QkFBQSxFQUFBLFlBR007SUFFQSxJQUFBLHNHQUlMLEVBSk8sc0JBQVEsRUFBRSw4QkFJakIsQ0FBQztJQUVGLElBQU0sWUFBWSxHQUFHLHlCQUF5QixFQUFLLENBQUM7SUFDcEQsSUFBTSxnQkFBZ0IsR0FBRyxzQkFBc0IsRUFBSyxDQUFDO0lBQ3JELElBQU0sWUFBWSxHQUFHLFlBQVk7UUFDL0IsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7UUFDbEQsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpDLGtCQUNFLFFBQVEsVUFBQTtRQUNSLFlBQVksY0FBQSxJQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNmO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgRW50aXR5RGVmaW5pdGlvbixcbiAgQ29tcGFyZXIsXG4gIElkU2VsZWN0b3IsXG4gIEVudGl0eUFkYXB0ZXIsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNyZWF0ZUluaXRpYWxTdGF0ZUZhY3RvcnkgfSBmcm9tICcuL2VudGl0eV9zdGF0ZSc7XG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvcnNGYWN0b3J5IH0gZnJvbSAnLi9zdGF0ZV9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgY3JlYXRlU29ydGVkU3RhdGVBZGFwdGVyIH0gZnJvbSAnLi9zb3J0ZWRfc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlciB9IGZyb20gJy4vdW5zb3J0ZWRfc3RhdGVfYWRhcHRlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbnRpdHlBZGFwdGVyPFQ+KFxuICBvcHRpb25zOiB7XG4gICAgc2VsZWN0SWQ/OiBJZFNlbGVjdG9yPFQ+O1xuICAgIHNvcnRDb21wYXJlcj86IGZhbHNlIHwgQ29tcGFyZXI8VD47XG4gIH0gPSB7fVxuKTogRW50aXR5QWRhcHRlcjxUPiB7XG4gIGNvbnN0IHsgc2VsZWN0SWQsIHNvcnRDb21wYXJlciB9OiBFbnRpdHlEZWZpbml0aW9uPFQ+ID0ge1xuICAgIHNvcnRDb21wYXJlcjogZmFsc2UsXG4gICAgc2VsZWN0SWQ6IChpbnN0YW5jZTogYW55KSA9PiBpbnN0YW5jZS5pZCxcbiAgICAuLi5vcHRpb25zLFxuICB9O1xuXG4gIGNvbnN0IHN0YXRlRmFjdG9yeSA9IGNyZWF0ZUluaXRpYWxTdGF0ZUZhY3Rvcnk8VD4oKTtcbiAgY29uc3Qgc2VsZWN0b3JzRmFjdG9yeSA9IGNyZWF0ZVNlbGVjdG9yc0ZhY3Rvcnk8VD4oKTtcbiAgY29uc3Qgc3RhdGVBZGFwdGVyID0gc29ydENvbXBhcmVyXG4gICAgPyBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXIoc2VsZWN0SWQsIHNvcnRDb21wYXJlcilcbiAgICA6IGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyKHNlbGVjdElkKTtcblxuICByZXR1cm4ge1xuICAgIHNlbGVjdElkLFxuICAgIHNvcnRDb21wYXJlcixcbiAgICAuLi5zdGF0ZUZhY3RvcnksXG4gICAgLi4uc2VsZWN0b3JzRmFjdG9yeSxcbiAgICAuLi5zdGF0ZUFkYXB0ZXIsXG4gIH07XG59XG4iXX0=