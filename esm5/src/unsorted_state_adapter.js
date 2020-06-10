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
            function (update) { return takeNewKey(newKeys, update, state); })).length >
                0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2VudGl0eS8iLCJzb3VyY2VzIjpbInNyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBS3hDLE1BQU0sVUFBVSwwQkFBMEIsQ0FBSSxRQUF1Qjs7Ozs7O0lBSW5FLFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVOztZQUN0QyxHQUFHLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFFM0MsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN6QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUU3QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsUUFBZSxFQUFFLEtBQVU7OztZQUM3QyxTQUFTLEdBQUcsS0FBSzs7WUFFckIsS0FBcUIsSUFBQSxhQUFBLFNBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO2dCQUExQixJQUFNLE1BQU0scUJBQUE7Z0JBQ2YsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7YUFDMUU7Ozs7Ozs7OztRQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxT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QUMsaUJBQWlCLENBQUM7UUFDbEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7S0FDckMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnRpdHlTdGF0ZSxcbiAgRW50aXR5U3RhdGVBZGFwdGVyLFxuICBJZFNlbGVjdG9yLFxuICBVcGRhdGUsXG4gIFByZWRpY2F0ZSxcbiAgRW50aXR5TWFwLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZU9wZXJhdG9yLCBEaWRNdXRhdGUgfSBmcm9tICcuL3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgc2VsZWN0SWRWYWx1ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oXG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+XG4pOiBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD4pOiBhbnkge1xuICB0eXBlIFIgPSBFbnRpdHlTdGF0ZTxUPjtcblxuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGtleSA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG5cbiAgICBpZiAoa2V5IGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfVxuXG4gICAgc3RhdGUuaWRzLnB1c2goa2V5KTtcbiAgICBzdGF0ZS5lbnRpdGllc1trZXldID0gZW50aXR5O1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgbGV0IGRpZE11dGF0ZSA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgIGRpZE11dGF0ZSA9IGFkZE9uZU11dGFibHkoZW50aXR5LCBzdGF0ZSkgIT09IERpZE11dGF0ZS5Ob25lIHx8IGRpZE11dGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlkTXV0YXRlID8gRGlkTXV0YXRlLkJvdGggOiBEaWRNdXRhdGUuTm9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcbiAgICBzdGF0ZS5lbnRpdGllcyA9IHt9O1xuXG4gICAgYWRkTWFueU11dGFibHkoZW50aXRpZXMsIHN0YXRlKTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3Qga2V5ID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcblxuICAgIGlmIChrZXkgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pZHMucHVzaChrZXkpO1xuICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVPbmVNdXRhYmx5KGtleTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU9uZU11dGFibHkoa2V5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiByZW1vdmVNYW55TXV0YWJseShba2V5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkoa2V5czogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkocHJlZGljYXRlOiBQcmVkaWNhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShcbiAgICBrZXlzT3JQcmVkaWNhdGU6IGFueVtdIHwgUHJlZGljYXRlPFQ+LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXlzID1cbiAgICAgIGtleXNPclByZWRpY2F0ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8ga2V5c09yUHJlZGljYXRlXG4gICAgICAgIDogc3RhdGUuaWRzLmZpbHRlcigoa2V5OiBhbnkpID0+IGtleXNPclByZWRpY2F0ZShzdGF0ZS5lbnRpdGllc1trZXldKSk7XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPVxuICAgICAga2V5c1xuICAgICAgICAuZmlsdGVyKChrZXk6IGFueSkgPT4ga2V5IGluIHN0YXRlLmVudGl0aWVzKVxuICAgICAgICAubWFwKChrZXk6IGFueSkgPT4gZGVsZXRlIHN0YXRlLmVudGl0aWVzW2tleV0pLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55KSA9PiBpZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbGw8UyBleHRlbmRzIFI+KHN0YXRlOiBTKTogUztcbiAgZnVuY3Rpb24gcmVtb3ZlQWxsPFMgZXh0ZW5kcyBSPihzdGF0ZTogYW55KTogUyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBpZHM6IFtdLFxuICAgICAgZW50aXRpZXM6IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IFJcbiAgKTogdm9pZDtcbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogYW55IH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IGFueVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZDogVCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG4gICAgY29uc3QgaGFzTmV3S2V5ID0gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG5cbiAgICBpZiAoaGFzTmV3S2V5KSB7XG4gICAgICBrZXlzW3VwZGF0ZS5pZF0gPSBuZXdLZXk7XG4gICAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICB9XG5cbiAgICBzdGF0ZS5lbnRpdGllc1tuZXdLZXldID0gdXBkYXRlZDtcblxuICAgIHJldHVybiBoYXNOZXdLZXk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBuZXdLZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAgIHVwZGF0ZXMgPSB1cGRhdGVzLmZpbHRlcigodXBkYXRlKSA9PiB1cGRhdGUuaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlRW50aXRpZXMgPSB1cGRhdGVzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlRW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICAgIHVwZGF0ZXMuZmlsdGVyKCh1cGRhdGUpID0+IHRha2VOZXdLZXkobmV3S2V5cywgdXBkYXRlLCBzdGF0ZSkpLmxlbmd0aCA+XG4gICAgICAgIDA7XG5cbiAgICAgIGlmIChkaWRNdXRhdGVJZHMpIHtcbiAgICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLm1hcCgoaWQ6IGFueSkgPT4gbmV3S2V5c1tpZF0gfHwgaWQpO1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBNdXRhYmx5KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgY2hhbmdlczogVXBkYXRlPFQ+W10gPSBzdGF0ZS5pZHMucmVkdWNlKFxuICAgICAgKGNoYW5nZXM6IGFueVtdLCBpZDogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IG1hcChzdGF0ZS5lbnRpdGllc1tpZF0pO1xuICAgICAgICBpZiAoY2hhbmdlICE9PSBzdGF0ZS5lbnRpdGllc1tpZF0pIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2goeyBpZCwgY2hhbmdlczogY2hhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKTtcbiAgICBjb25zdCB1cGRhdGVzID0gY2hhbmdlcy5maWx0ZXIoKHsgaWQgfSkgPT4gaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXMsIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwc2VydE1hbnlNdXRhYmx5KFtlbnRpdHldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBhZGRlZDogYW55W10gPSBbXTtcbiAgICBjb25zdCB1cGRhdGVkOiBhbnlbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGlkID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcbiAgICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgICB1cGRhdGVkLnB1c2goeyBpZCwgY2hhbmdlczogZW50aXR5IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkZWQucHVzaChlbnRpdHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRpZE11dGF0ZUJ5VXBkYXRlZCA9IHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZWQsIHN0YXRlKTtcbiAgICBjb25zdCBkaWRNdXRhdGVCeUFkZGVkID0gYWRkTWFueU11dGFibHkoYWRkZWQsIHN0YXRlKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuTm9uZSAmJlxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Ob25lOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Cb3RoIHx8XG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLkJvdGg6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlQWxsLFxuICAgIGFkZE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRPbmVNdXRhYmx5KSxcbiAgICBhZGRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE1hbnlNdXRhYmx5KSxcbiAgICBhZGRBbGw6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0QWxsTXV0YWJseSksXG4gICAgc2V0QWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRPbmVNdXRhYmx5KSxcbiAgICB1cGRhdGVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlT25lTXV0YWJseSksXG4gICAgdXBkYXRlTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cGRhdGVNYW55TXV0YWJseSksXG4gICAgdXBzZXJ0T25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE9uZU11dGFibHkpLFxuICAgIHVwc2VydE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0TWFueU11dGFibHkpLFxuICAgIHJlbW92ZU9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihyZW1vdmVPbmVNdXRhYmx5KSxcbiAgICByZW1vdmVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHJlbW92ZU1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gIH07XG59XG4iXX0=