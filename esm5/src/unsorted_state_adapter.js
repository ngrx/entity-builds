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
 * Generated from: src/unsorted_state_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createStateOperator, DidMutate } from './state_adapter';
import { selectIdValue } from './utils';
/**
 * @template T
 * @param {?} selectId
 * @return {?}
 */
export function createUnsortedStateAdapter(selectId) {
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        /** @type {?} */
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        var e_1, _a;
        /** @type {?} */
        var didMutate = false;
        try {
            for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function setAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function setOneMutably(entity, state) {
        /** @type {?} */
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            state.entities[key] = entity;
            return DidMutate.EntitiesOnly;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    /**
     * @param {?} keysOrPredicate
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keysOrPredicate, state) {
        /** @type {?} */
        var keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return keysOrPredicate(state.entities[key]); }));
        /** @type {?} */
        var didMutate = keys
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key in state.entities; }))
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return delete state.entities[key]; })).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return id in state.entities; }));
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    /**
     * @param {?} keys
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeNewKey(keys, update, state) {
        /** @type {?} */
        var original = state.entities[update.id];
        /** @type {?} */
        var updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        var newKey = selectIdValue(updated, selectId);
        /** @type {?} */
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
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
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        var newKeys = {};
        updates = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        function (update) { return update.id in state.entities; }));
        /** @type {?} */
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            var didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            function (update) { return takeNewKey(newKeys, update, state); })).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((/**
                 * @param {?} id
                 * @return {?}
                 */
                function (id) { return newKeys[id] || id; }));
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    /**
     * @param {?} map
     * @param {?} state
     * @return {?}
     */
    function mapMutably(map, state) {
        /** @type {?} */
        var changes = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        function (changes, id) {
            /** @type {?} */
            var change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }), []);
        /** @type {?} */
        var updates = changes.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var id = _a.id;
            return id in state.entities;
        }));
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
        var e_2, _a;
        /** @type {?} */
        var added = [];
        /** @type {?} */
        var updated = [];
        try {
            for (var entities_2 = __values(entities), entities_2_1 = entities_2.next(); !entities_2_1.done; entities_2_1 = entities_2.next()) {
                var entity = entities_2_1.value;
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
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (entities_2_1 && !entities_2_1.done && (_a = entities_2.return)) _a.call(entities_2);
            }
            finally { if (e_2) throw e_2.error; }
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
    return {
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        addAll: createStateOperator(setAllMutably),
        setAll: createStateOperator(setAllMutably),
        setOne: createStateOperator(setOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
        map: createStateOperator(mapMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2VudGl0eS8iLCJzb3VyY2VzIjpbInNyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBS3hDLE1BQU0sVUFBVSwwQkFBMEIsQ0FBSSxRQUF1Qjs7Ozs7O0lBSW5FLFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVOztZQUN0QyxHQUFHLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFFM0MsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN6QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUU3QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsUUFBZSxFQUFFLEtBQVU7OztZQUM3QyxTQUFTLEdBQUcsS0FBSzs7WUFFckIsS0FBcUIsSUFBQSxhQUFBLFNBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO2dCQUExQixJQUFNLE1BQU0scUJBQUE7Z0JBQ2YsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7YUFDMUU7Ozs7Ozs7OztRQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxT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QyxpQkFBaUIsQ0FBQztRQUNsRCxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsR0FBRyxFQUFFLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztLQUNyQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eVN0YXRlLFxuICBFbnRpdHlTdGF0ZUFkYXB0ZXIsXG4gIElkU2VsZWN0b3IsXG4gIFVwZGF0ZSxcbiAgUHJlZGljYXRlLFxuICBFbnRpdHlNYXAsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlT3BlcmF0b3IsIERpZE11dGF0ZSB9IGZyb20gJy4vc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBzZWxlY3RJZFZhbHVlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcjxUPihcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD5cbik6IEVudGl0eVN0YXRlQWRhcHRlcjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcjxUPihzZWxlY3RJZDogSWRTZWxlY3RvcjxUPik6IGFueSB7XG4gIHR5cGUgUiA9IEVudGl0eVN0YXRlPFQ+O1xuXG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3Qga2V5ID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcblxuICAgIGlmIChrZXkgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pZHMucHVzaChrZXkpO1xuICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBsZXQgZGlkTXV0YXRlID0gZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBlbnRpdGllcykge1xuICAgICAgZGlkTXV0YXRlID0gYWRkT25lTXV0YWJseShlbnRpdHksIHN0YXRlKSAhPT0gRGlkTXV0YXRlLk5vbmUgfHwgZGlkTXV0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiBkaWRNdXRhdGUgPyBEaWRNdXRhdGUuQm90aCA6IERpZE11dGF0ZS5Ob25lO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QWxsTXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gc2V0QWxsTXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHN0YXRlLmlkcyA9IFtdO1xuICAgIHN0YXRlLmVudGl0aWVzID0ge307XG5cbiAgICBhZGRNYW55TXV0YWJseShlbnRpdGllcywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXkgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuXG4gICAgaWYgKGtleSBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgc3RhdGUuZW50aXRpZXNba2V5XSA9IGVudGl0eTtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgIH1cblxuICAgIHN0YXRlLmlkcy5wdXNoKGtleSk7XG4gICAgc3RhdGUuZW50aXRpZXNba2V5XSA9IGVudGl0eTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uZU11dGFibHkoa2V5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gcmVtb3ZlT25lTXV0YWJseShrZXk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHJlbW92ZU1hbnlNdXRhYmx5KFtrZXldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShrZXlzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU1hbnlNdXRhYmx5KFxuICAgIGtleXNPclByZWRpY2F0ZTogYW55W10gfCBQcmVkaWNhdGU8VD4sXG4gICAgc3RhdGU6IGFueVxuICApOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGtleXMgPVxuICAgICAga2V5c09yUHJlZGljYXRlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBrZXlzT3JQcmVkaWNhdGVcbiAgICAgICAgOiBzdGF0ZS5pZHMuZmlsdGVyKChrZXk6IGFueSkgPT4ga2V5c09yUHJlZGljYXRlKHN0YXRlLmVudGl0aWVzW2tleV0pKTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZSA9XG4gICAgICBrZXlzXG4gICAgICAgIC5maWx0ZXIoKGtleTogYW55KSA9PiBrZXkgaW4gc3RhdGUuZW50aXRpZXMpXG4gICAgICAgIC5tYXAoKGtleTogYW55KSA9PiBkZWxldGUgc3RhdGUuZW50aXRpZXNba2V5XSkubGVuZ3RoID4gMDtcblxuICAgIGlmIChkaWRNdXRhdGUpIHtcbiAgICAgIHN0YXRlLmlkcyA9IHN0YXRlLmlkcy5maWx0ZXIoKGlkOiBhbnkpID0+IGlkIGluIHN0YXRlLmVudGl0aWVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlkTXV0YXRlID8gRGlkTXV0YXRlLkJvdGggOiBEaWRNdXRhdGUuTm9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbDxTIGV4dGVuZHMgUj4oc3RhdGU6IFMpOiBTO1xuICBmdW5jdGlvbiByZW1vdmVBbGw8UyBleHRlbmRzIFI+KHN0YXRlOiBhbnkpOiBTIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgIGlkczogW10sXG4gICAgICBlbnRpdGllczoge30sXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YWtlTmV3S2V5KFxuICAgIGtleXM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgICB1cGRhdGU6IFVwZGF0ZTxUPixcbiAgICBzdGF0ZTogUlxuICApOiB2b2lkO1xuICBmdW5jdGlvbiB0YWtlTmV3S2V5KFxuICAgIGtleXM6IHsgW2lkOiBzdHJpbmddOiBhbnkgfSxcbiAgICB1cGRhdGU6IFVwZGF0ZTxUPixcbiAgICBzdGF0ZTogYW55XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG9yaWdpbmFsID0gc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICBjb25zdCB1cGRhdGVkOiBUID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWwsIHVwZGF0ZS5jaGFuZ2VzKTtcbiAgICBjb25zdCBuZXdLZXkgPSBzZWxlY3RJZFZhbHVlKHVwZGF0ZWQsIHNlbGVjdElkKTtcbiAgICBjb25zdCBoYXNOZXdLZXkgPSBuZXdLZXkgIT09IHVwZGF0ZS5pZDtcblxuICAgIGlmIChoYXNOZXdLZXkpIHtcbiAgICAgIGtleXNbdXBkYXRlLmlkXSA9IG5ld0tleTtcbiAgICAgIGRlbGV0ZSBzdGF0ZS5lbnRpdGllc1t1cGRhdGUuaWRdO1xuICAgIH1cblxuICAgIHN0YXRlLmVudGl0aWVzW25ld0tleV0gPSB1cGRhdGVkO1xuXG4gICAgcmV0dXJuIGhhc05ld0tleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkoW3VwZGF0ZV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IFVwZGF0ZTxUPltdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IG5ld0tleXM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgdXBkYXRlcyA9IHVwZGF0ZXMuZmlsdGVyKHVwZGF0ZSA9PiB1cGRhdGUuaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlRW50aXRpZXMgPSB1cGRhdGVzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlRW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICAgIHVwZGF0ZXMuZmlsdGVyKHVwZGF0ZSA9PiB0YWtlTmV3S2V5KG5ld0tleXMsIHVwZGF0ZSwgc3RhdGUpKS5sZW5ndGggPiAwO1xuXG4gICAgICBpZiAoZGlkTXV0YXRlSWRzKSB7XG4gICAgICAgIHN0YXRlLmlkcyA9IHN0YXRlLmlkcy5tYXAoKGlkOiBhbnkpID0+IG5ld0tleXNbaWRdIHx8IGlkKTtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIG1hcE11dGFibHkobWFwOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGNoYW5nZXM6IFVwZGF0ZTxUPltdID0gc3RhdGUuaWRzLnJlZHVjZShcbiAgICAgIChjaGFuZ2VzOiBhbnlbXSwgaWQ6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSBtYXAoc3RhdGUuZW50aXRpZXNbaWRdKTtcbiAgICAgICAgaWYgKGNoYW5nZSAhPT0gc3RhdGUuZW50aXRpZXNbaWRdKSB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHsgaWQsIGNoYW5nZXM6IGNoYW5nZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgIH0sXG4gICAgICBbXVxuICAgICk7XG4gICAgY29uc3QgdXBkYXRlcyA9IGNoYW5nZXMuZmlsdGVyKCh7IGlkIH0pID0+IGlkIGluIHN0YXRlLmVudGl0aWVzKTtcblxuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgYWRkTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRNYW55TXV0YWJseSksXG4gICAgYWRkQWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRBbGxNdXRhYmx5KSxcbiAgICBzZXRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0T25lTXV0YWJseSksXG4gICAgdXBkYXRlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU9uZU11dGFibHkpLFxuICAgIHVwZGF0ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlTWFueU11dGFibHkpLFxuICAgIHVwc2VydE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRPbmVNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICByZW1vdmVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IocmVtb3ZlT25lTXV0YWJseSksXG4gICAgcmVtb3ZlTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihyZW1vdmVNYW55TXV0YWJseSksXG4gICAgbWFwOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKG1hcE11dGFibHkpLFxuICB9O1xufVxuIl19