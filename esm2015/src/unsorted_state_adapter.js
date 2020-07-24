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
        const key = selectIdValue(entity, selectId);
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
        /** @type {?} */
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
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
        const key = selectIdValue(entity, selectId);
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
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => keysOrPredicate(state.entities[key])));
        /** @type {?} */
        const didMutate = keys
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        (key) => key in state.entities))
            .map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => delete state.entities[key])).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @return {?}
             */
            (id) => id in state.entities));
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
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        /** @type {?} */
        const hasNewKey = newKey !== update.id;
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
        const newKeys = {};
        updates = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        (update) => update.id in state.entities));
        /** @type {?} */
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            const didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            (update) => takeNewKey(newKeys, update, state))).length >
                0;
            if (didMutateIds) {
                state.ids = state.ids.map((/**
                 * @param {?} id
                 * @return {?}
                 */
                (id) => newKeys[id] || id));
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
        const changes = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        /** @type {?} */
        const updates = changes.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ id }) => id in state.entities));
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} __0
     * @param {?} state
     * @return {?}
     */
    function mapOneMutably({ map, id }, state) {
        /** @type {?} */
        const entity = state.entities[id];
        if (!entity) {
            return DidMutate.None;
        }
        /** @type {?} */
        const updatedEntity = map(entity);
        return updateOneMutably({
            id: id,
            changes: updatedEntity,
        }, state);
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
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
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
        removeAll,
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
        mapOne: createStateOperator(mapOneMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBVUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7OztBQUt4QyxNQUFNLFVBQVUsMEJBQTBCLENBQUksUUFBdUI7Ozs7OztJQUluRSxTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsS0FBVTs7Y0FDdEMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBRTNDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFN0IsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUdELFNBQVMsY0FBYyxDQUFDLFFBQWUsRUFBRSxLQUFVOztZQUM3QyxTQUFTLEdBQUcsS0FBSztRQUVyQixLQUFLLE1BQU0sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUM3QixTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztTQUMxRTtRQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7Ozs7OztJQUdELFNBQVMs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QUFhLENBQUM7UUFDMUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7UUFDcEMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztLQUMzQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eVN0YXRlLFxuICBFbnRpdHlTdGF0ZUFkYXB0ZXIsXG4gIElkU2VsZWN0b3IsXG4gIFVwZGF0ZSxcbiAgUHJlZGljYXRlLFxuICBFbnRpdHlNYXAsXG4gIEVudGl0eU1hcE9uZU51bSxcbiAgRW50aXR5TWFwT25lU3RyLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZU9wZXJhdG9yLCBEaWRNdXRhdGUgfSBmcm9tICcuL3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgc2VsZWN0SWRWYWx1ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oXG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+XG4pOiBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD4pOiBhbnkge1xuICB0eXBlIFIgPSBFbnRpdHlTdGF0ZTxUPjtcblxuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGtleSA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG5cbiAgICBpZiAoa2V5IGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfVxuXG4gICAgc3RhdGUuaWRzLnB1c2goa2V5KTtcbiAgICBzdGF0ZS5lbnRpdGllc1trZXldID0gZW50aXR5O1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgbGV0IGRpZE11dGF0ZSA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgIGRpZE11dGF0ZSA9IGFkZE9uZU11dGFibHkoZW50aXR5LCBzdGF0ZSkgIT09IERpZE11dGF0ZS5Ob25lIHx8IGRpZE11dGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlkTXV0YXRlID8gRGlkTXV0YXRlLkJvdGggOiBEaWRNdXRhdGUuTm9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcbiAgICBzdGF0ZS5lbnRpdGllcyA9IHt9O1xuXG4gICAgYWRkTWFueU11dGFibHkoZW50aXRpZXMsIHN0YXRlKTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3Qga2V5ID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcblxuICAgIGlmIChrZXkgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pZHMucHVzaChrZXkpO1xuICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVPbmVNdXRhYmx5KGtleTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU9uZU11dGFibHkoa2V5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiByZW1vdmVNYW55TXV0YWJseShba2V5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkoa2V5czogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkocHJlZGljYXRlOiBQcmVkaWNhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShcbiAgICBrZXlzT3JQcmVkaWNhdGU6IGFueVtdIHwgUHJlZGljYXRlPFQ+LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXlzID1cbiAgICAgIGtleXNPclByZWRpY2F0ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8ga2V5c09yUHJlZGljYXRlXG4gICAgICAgIDogc3RhdGUuaWRzLmZpbHRlcigoa2V5OiBhbnkpID0+IGtleXNPclByZWRpY2F0ZShzdGF0ZS5lbnRpdGllc1trZXldKSk7XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPVxuICAgICAga2V5c1xuICAgICAgICAuZmlsdGVyKChrZXk6IGFueSkgPT4ga2V5IGluIHN0YXRlLmVudGl0aWVzKVxuICAgICAgICAubWFwKChrZXk6IGFueSkgPT4gZGVsZXRlIHN0YXRlLmVudGl0aWVzW2tleV0pLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55KSA9PiBpZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbGw8UyBleHRlbmRzIFI+KHN0YXRlOiBTKTogUztcbiAgZnVuY3Rpb24gcmVtb3ZlQWxsPFMgZXh0ZW5kcyBSPihzdGF0ZTogYW55KTogUyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBpZHM6IFtdLFxuICAgICAgZW50aXRpZXM6IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IFJcbiAgKTogdm9pZDtcbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogYW55IH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IGFueVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZDogVCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG4gICAgY29uc3QgaGFzTmV3S2V5ID0gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG5cbiAgICBpZiAoaGFzTmV3S2V5KSB7XG4gICAgICBrZXlzW3VwZGF0ZS5pZF0gPSBuZXdLZXk7XG4gICAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICB9XG5cbiAgICBzdGF0ZS5lbnRpdGllc1tuZXdLZXldID0gdXBkYXRlZDtcblxuICAgIHJldHVybiBoYXNOZXdLZXk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBuZXdLZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAgIHVwZGF0ZXMgPSB1cGRhdGVzLmZpbHRlcigodXBkYXRlKSA9PiB1cGRhdGUuaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlRW50aXRpZXMgPSB1cGRhdGVzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlRW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICAgIHVwZGF0ZXMuZmlsdGVyKCh1cGRhdGUpID0+IHRha2VOZXdLZXkobmV3S2V5cywgdXBkYXRlLCBzdGF0ZSkpLmxlbmd0aCA+XG4gICAgICAgIDA7XG5cbiAgICAgIGlmIChkaWRNdXRhdGVJZHMpIHtcbiAgICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLm1hcCgoaWQ6IGFueSkgPT4gbmV3S2V5c1tpZF0gfHwgaWQpO1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBNdXRhYmx5KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgY2hhbmdlczogVXBkYXRlPFQ+W10gPSBzdGF0ZS5pZHMucmVkdWNlKFxuICAgICAgKGNoYW5nZXM6IGFueVtdLCBpZDogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IG1hcChzdGF0ZS5lbnRpdGllc1tpZF0pO1xuICAgICAgICBpZiAoY2hhbmdlICE9PSBzdGF0ZS5lbnRpdGllc1tpZF0pIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2goeyBpZCwgY2hhbmdlczogY2hhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKTtcbiAgICBjb25zdCB1cGRhdGVzID0gY2hhbmdlcy5maWx0ZXIoKHsgaWQgfSkgPT4gaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXMsIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcE9uZU11dGFibHkobWFwOiBFbnRpdHlNYXBPbmVOdW08VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBtYXBPbmVNdXRhYmx5KG1hcDogRW50aXR5TWFwT25lU3RyPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwT25lTXV0YWJseSh7IG1hcCwgaWQgfTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBlbnRpdHkgPSBzdGF0ZS5lbnRpdGllc1tpZF07XG4gICAgaWYgKCFlbnRpdHkpIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkRW50aXR5ID0gbWFwKGVudGl0eSk7XG4gICAgcmV0dXJuIHVwZGF0ZU9uZU11dGFibHkoXG4gICAgICB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgY2hhbmdlczogdXBkYXRlZEVudGl0eSxcbiAgICAgIH0sXG4gICAgICBzdGF0ZVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgYWRkTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRNYW55TXV0YWJseSksXG4gICAgYWRkQWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRBbGxNdXRhYmx5KSxcbiAgICBzZXRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0T25lTXV0YWJseSksXG4gICAgdXBkYXRlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU9uZU11dGFibHkpLFxuICAgIHVwZGF0ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlTWFueU11dGFibHkpLFxuICAgIHVwc2VydE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRPbmVNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICByZW1vdmVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IocmVtb3ZlT25lTXV0YWJseSksXG4gICAgcmVtb3ZlTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihyZW1vdmVNYW55TXV0YWJseSksXG4gICAgbWFwOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKG1hcE11dGFibHkpLFxuICAgIG1hcE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihtYXBPbmVNdXRhYmx5KSxcbiAgfTtcbn1cbiJdfQ==