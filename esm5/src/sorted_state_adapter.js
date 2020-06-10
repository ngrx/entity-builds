var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/sorted_state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createStateOperator, DidMutate } from './state_adapter';
import { createUnsortedStateAdapter } from './unsorted_state_adapter';
import { selectIdValue } from './utils';
/**
 * @template T
 * @param {?} selectId
 * @param {?} sort
 * @return {?}
 */
export function createSortedStateAdapter(selectId, sort) {
    var _a = createUnsortedStateAdapter(selectId), removeOne = _a.removeOne, removeMany = _a.removeMany, removeAll = _a.removeAll;
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        /** @type {?} */
        var models = newModels.filter((/**
         * @param {?} model
         * @return {?}
         */
        function (model) { return !(selectIdValue(model, selectId) in state.entities); }));
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            merge(models, state);
            return DidMutate.Both;
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function setAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function setOneMutably(entity, state) {
        /** @type {?} */
        var id = selectIdValue(entity, selectId);
        if (id in state.entities) {
            state.ids = state.ids.filter((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val !== id; }));
            merge([entity], state);
            return DidMutate.Both;
        }
        else {
            return addOneMutably(entity, state);
        }
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} models
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        /** @type {?} */
        var original = state.entities[update.id];
        /** @type {?} */
        var updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        var models = [];
        /** @type {?} */
        var didMutateIds = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        function (update) { return takeUpdatedModel(models, update, state); }))
            .length > 0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            var originalIds_1 = state.ids;
            /** @type {?} */
            var updatedIndexes_1 = [];
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @param {?} index
             * @return {?}
             */
            function (id, index) {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes_1.push(index);
                    return false;
                }
            }));
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes_1.every((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return state.ids[i] === originalIds_1[i]; }))) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    /**
     * @param {?} updatesOrMap
     * @param {?} state
     * @return {?}
     */
    function mapMutably(updatesOrMap, state) {
        /** @type {?} */
        var updates = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        function (changes, id) {
            /** @type {?} */
            var change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }), []);
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        var e_1, _a;
        /** @type {?} */
        var added = [];
        /** @type {?} */
        var updated = [];
        try {
            for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                /** @type {?} */
                var id = selectIdValue(entity, selectId);
                if (id in state.entities) {
                    updated.push({ id: id, changes: entity });
                }
                else {
                    added.push(entity);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        var didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function merge(models, state) {
        models.sort(sort);
        /** @type {?} */
        var ids = [];
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var j = 0;
        while (i < models.length && j < state.ids.length) {
            /** @type {?} */
            var model = models[i];
            /** @type {?} */
            var modelId = selectIdValue(model, selectId);
            /** @type {?} */
            var entityId = state.ids[j];
            /** @type {?} */
            var entity = state.entities[entityId];
            if (sort(model, entity) <= 0) {
                ids.push(modelId);
                i++;
            }
            else {
                ids.push(entityId);
                j++;
            }
        }
        if (i < models.length) {
            state.ids = ids.concat(models.slice(i).map(selectId));
        }
        else {
            state.ids = ids.concat(state.ids.slice(j));
        }
        models.forEach((/**
         * @param {?} model
         * @param {?} i
         * @return {?}
         */
        function (model, i) {
            state.entities[selectId(model)] = model;
        }));
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        addAll: createStateOperator(setAllMutably),
        setAll: createStateOperator(setAllMutably),
        setOne: createStateOperator(setOneMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        map: createStateOperator(mapMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9lbnRpdHkvIiwic291cmNlcyI6WyJzcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBTXhDLE1BQU0sVUFBVSx3QkFBd0IsQ0FBSSxRQUFhLEVBQUUsSUFBUztJQUc1RCxJQUFBLHlDQUVMLEVBRk8sd0JBQVMsRUFBRSwwQkFBVSxFQUFFLHdCQUU5Qjs7Ozs7O0lBR0QsU0FBUyxhQUFhLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDNUMsT0FBTyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFHRCxTQUFTLGNBQWMsQ0FBQyxTQUFnQixFQUFFLEtBQVU7O1lBQzVDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTTs7OztRQUM3QixVQUFDLEtBQUssSUFBSyxPQUFBLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBbkQsQ0FBbUQsRUFDL0Q7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjthQUFNO1lBQ0wsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7Ozs7SUFHRCxTQUFTLGFBQWEsQ0FBQyxNQUFhLEVBQUUsS0FB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QUFDLGdCQUFnQixDQUFDO1FBQ2hELE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFDNUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDO0tBQ3JDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5U3RhdGUsXG4gIElkU2VsZWN0b3IsXG4gIENvbXBhcmVyLFxuICBFbnRpdHlTdGF0ZUFkYXB0ZXIsXG4gIFVwZGF0ZSxcbiAgRW50aXR5TWFwLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZU9wZXJhdG9yLCBEaWRNdXRhdGUgfSBmcm9tICcuL3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIgfSBmcm9tICcuL3Vuc29ydGVkX3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgc2VsZWN0SWRWYWx1ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU29ydGVkU3RhdGVBZGFwdGVyPFQ+KFxuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPixcbiAgc29ydDogQ29tcGFyZXI8VD5cbik6IEVudGl0eVN0YXRlQWRhcHRlcjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oc2VsZWN0SWQ6IGFueSwgc29ydDogYW55KTogYW55IHtcbiAgdHlwZSBSID0gRW50aXR5U3RhdGU8VD47XG5cbiAgY29uc3QgeyByZW1vdmVPbmUsIHJlbW92ZU1hbnksIHJlbW92ZUFsbCB9ID0gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIoXG4gICAgc2VsZWN0SWRcbiAgKTtcblxuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiBhZGRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkobmV3TW9kZWxzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShuZXdNb2RlbHM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBtb2RlbHMgPSBuZXdNb2RlbHMuZmlsdGVyKFxuICAgICAgKG1vZGVsKSA9PiAhKHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKSBpbiBzdGF0ZS5lbnRpdGllcylcbiAgICApO1xuXG4gICAgaWYgKG1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2UobW9kZWxzLCBzdGF0ZSk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QWxsTXV0YWJseShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KG1vZGVscywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKCh2YWw6IHN0cmluZyB8IG51bWJlcikgPT4gdmFsICE9PSBpZCk7XG4gICAgICBtZXJnZShbZW50aXR5XSwgc3RhdGUpO1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYWRkT25lTXV0YWJseShlbnRpdHksIHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YWtlVXBkYXRlZE1vZGVsKG1vZGVsczogVFtdLCB1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBib29sZWFuO1xuICBmdW5jdGlvbiB0YWtlVXBkYXRlZE1vZGVsKG1vZGVsczogYW55W10sIHVwZGF0ZTogYW55LCBzdGF0ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCEodXBkYXRlLmlkIGluIHN0YXRlLmVudGl0aWVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsID0gc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICBjb25zdCB1cGRhdGVkID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWwsIHVwZGF0ZS5jaGFuZ2VzKTtcbiAgICBjb25zdCBuZXdLZXkgPSBzZWxlY3RJZFZhbHVlKHVwZGF0ZWQsIHNlbGVjdElkKTtcblxuICAgIGRlbGV0ZSBzdGF0ZS5lbnRpdGllc1t1cGRhdGUuaWRdO1xuXG4gICAgbW9kZWxzLnB1c2godXBkYXRlZCk7XG5cbiAgICByZXR1cm4gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBtb2RlbHM6IFRbXSA9IFtdO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlSWRzID1cbiAgICAgIHVwZGF0ZXMuZmlsdGVyKCh1cGRhdGUpID0+IHRha2VVcGRhdGVkTW9kZWwobW9kZWxzLCB1cGRhdGUsIHN0YXRlKSlcbiAgICAgICAgLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAobW9kZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcmlnaW5hbElkcyA9IHN0YXRlLmlkcztcbiAgICAgIGNvbnN0IHVwZGF0ZWRJbmRleGVzOiBhbnlbXSA9IFtdO1xuICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLmZpbHRlcigoaWQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtZXJnZShtb2RlbHMsIHN0YXRlKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhZGlkTXV0YXRlSWRzICYmXG4gICAgICAgIHVwZGF0ZWRJbmRleGVzLmV2ZXJ5KChpOiBudW1iZXIpID0+IHN0YXRlLmlkc1tpXSA9PT0gb3JpZ2luYWxJZHNbaV0pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIG1hcE11dGFibHkodXBkYXRlc09yTWFwOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IHVwZGF0ZXM6IFVwZGF0ZTxUPltdID0gc3RhdGUuaWRzLnJlZHVjZShcbiAgICAgIChjaGFuZ2VzOiBhbnlbXSwgaWQ6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSB1cGRhdGVzT3JNYXAoc3RhdGUuZW50aXRpZXNbaWRdKTtcbiAgICAgICAgaWYgKGNoYW5nZSAhPT0gc3RhdGUuZW50aXRpZXNbaWRdKSB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHsgaWQsIGNoYW5nZXM6IGNoYW5nZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgIH0sXG4gICAgICBbXVxuICAgICk7XG5cbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkodXBkYXRlcywgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gdXBzZXJ0TWFueU11dGFibHkoW2VudGl0eV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGFkZGVkOiBhbnlbXSA9IFtdO1xuICAgIGNvbnN0IHVwZGF0ZWQ6IGFueVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBlbnRpdGllcykge1xuICAgICAgY29uc3QgaWQgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuICAgICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICAgIHVwZGF0ZWQucHVzaCh7IGlkLCBjaGFuZ2VzOiBlbnRpdHkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRlZC5wdXNoKGVudGl0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGlkTXV0YXRlQnlVcGRhdGVkID0gdXBkYXRlTWFueU11dGFibHkodXBkYXRlZCwgc3RhdGUpO1xuICAgIGNvbnN0IGRpZE11dGF0ZUJ5QWRkZWQgPSBhZGRNYW55TXV0YWJseShhZGRlZCwgc3RhdGUpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Ob25lICYmXG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLk5vbmU6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLkJvdGggfHxcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuQm90aDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2UobW9kZWxzOiBUW10sIHN0YXRlOiBSKTogdm9pZDtcbiAgZnVuY3Rpb24gbWVyZ2UobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IHZvaWQge1xuICAgIG1vZGVscy5zb3J0KHNvcnQpO1xuXG4gICAgY29uc3QgaWRzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcblxuICAgIHdoaWxlIChpIDwgbW9kZWxzLmxlbmd0aCAmJiBqIDwgc3RhdGUuaWRzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9kZWwgPSBtb2RlbHNbaV07XG4gICAgICBjb25zdCBtb2RlbElkID0gc2VsZWN0SWRWYWx1ZShtb2RlbCwgc2VsZWN0SWQpO1xuICAgICAgY29uc3QgZW50aXR5SWQgPSBzdGF0ZS5pZHNbal07XG4gICAgICBjb25zdCBlbnRpdHkgPSBzdGF0ZS5lbnRpdGllc1tlbnRpdHlJZF07XG5cbiAgICAgIGlmIChzb3J0KG1vZGVsLCBlbnRpdHkpIDw9IDApIHtcbiAgICAgICAgaWRzLnB1c2gobW9kZWxJZCk7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpIDwgbW9kZWxzLmxlbmd0aCkge1xuICAgICAgc3RhdGUuaWRzID0gaWRzLmNvbmNhdChtb2RlbHMuc2xpY2UoaSkubWFwKHNlbGVjdElkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLmlkcyA9IGlkcy5jb25jYXQoc3RhdGUuaWRzLnNsaWNlKGopKTtcbiAgICB9XG5cbiAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwsIGkpID0+IHtcbiAgICAgIHN0YXRlLmVudGl0aWVzW3NlbGVjdElkKG1vZGVsKV0gPSBtb2RlbDtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlT25lLFxuICAgIHJlbW92ZU1hbnksXG4gICAgcmVtb3ZlQWxsLFxuICAgIGFkZE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRPbmVNdXRhYmx5KSxcbiAgICB1cGRhdGVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlT25lTXV0YWJseSksXG4gICAgdXBzZXJ0T25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE9uZU11dGFibHkpLFxuICAgIGFkZEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRBbGxNdXRhYmx5KSxcbiAgICBzZXRBbGw6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0QWxsTXV0YWJseSksXG4gICAgc2V0T25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldE9uZU11dGFibHkpLFxuICAgIGFkZE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkTWFueU11dGFibHkpLFxuICAgIHVwZGF0ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlTWFueU11dGFibHkpLFxuICAgIHVwc2VydE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0TWFueU11dGFibHkpLFxuICAgIG1hcDogY3JlYXRlU3RhdGVPcGVyYXRvcihtYXBNdXRhYmx5KSxcbiAgfTtcbn1cbiJdfQ==