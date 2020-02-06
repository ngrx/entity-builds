/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/unsorted_state_adapter.ts
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
        update => update.id in state.entities));
        /** @type {?} */
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            const didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            update => takeNewKey(newKeys, update, state))).length > 0;
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
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
        map: createStateOperator(mapMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7OztBQUt4QyxNQUFNLFVBQVUsMEJBQTBCLENBQUksUUFBdUI7Ozs7OztJQUluRSxTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsS0FBVTs7Y0FDdEMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBRTNDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFN0IsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUdELFNBQVMsY0FBYyxDQUFDLFFBQWUsRUFBRSxLQUFVOztZQUM3QyxTQUFTLEdBQUcsS0FBSztRQUVyQixLQUFLLE1BQU0sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUM3QixTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztTQUMxRTtRQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7Ozs7OztJQUdELFNB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QUFLLFNBQVMsQ0FBQyxJQUFJO2dCQUNyQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDeEI7Z0JBQ0UsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxTQUFTO1FBQ1QsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxDQUFDO1FBQzVDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDO0tBQ3JDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5U3RhdGUsXG4gIEVudGl0eVN0YXRlQWRhcHRlcixcbiAgSWRTZWxlY3RvcixcbiAgVXBkYXRlLFxuICBQcmVkaWNhdGUsXG4gIEVudGl0eU1hcCxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVPcGVyYXRvciwgRGlkTXV0YXRlIH0gZnJvbSAnLi9zdGF0ZV9hZGFwdGVyJztcbmltcG9ydCB7IHNlbGVjdElkVmFsdWUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyPFQ+KFxuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPlxuKTogRW50aXR5U3RhdGVBZGFwdGVyPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyPFQ+KHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+KTogYW55IHtcbiAgdHlwZSBSID0gRW50aXR5U3RhdGU8VD47XG5cbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXkgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuXG4gICAgaWYgKGtleSBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH1cblxuICAgIHN0YXRlLmlkcy5wdXNoKGtleSk7XG4gICAgc3RhdGUuZW50aXRpZXNba2V5XSA9IGVudGl0eTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGxldCBkaWRNdXRhdGUgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBkaWRNdXRhdGUgPSBhZGRPbmVNdXRhYmx5KGVudGl0eSwgc3RhdGUpICE9PSBEaWRNdXRhdGUuTm9uZSB8fCBkaWRNdXRhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbGxNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRBbGxNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuaWRzID0gW107XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzLCBzdGF0ZSk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVPbmVNdXRhYmx5KGtleTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU9uZU11dGFibHkoa2V5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiByZW1vdmVNYW55TXV0YWJseShba2V5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkoa2V5czogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkocHJlZGljYXRlOiBQcmVkaWNhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShcbiAgICBrZXlzT3JQcmVkaWNhdGU6IGFueVtdIHwgUHJlZGljYXRlPFQ+LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXlzID1cbiAgICAgIGtleXNPclByZWRpY2F0ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8ga2V5c09yUHJlZGljYXRlXG4gICAgICAgIDogc3RhdGUuaWRzLmZpbHRlcigoa2V5OiBhbnkpID0+IGtleXNPclByZWRpY2F0ZShzdGF0ZS5lbnRpdGllc1trZXldKSk7XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPVxuICAgICAga2V5c1xuICAgICAgICAuZmlsdGVyKChrZXk6IGFueSkgPT4ga2V5IGluIHN0YXRlLmVudGl0aWVzKVxuICAgICAgICAubWFwKChrZXk6IGFueSkgPT4gZGVsZXRlIHN0YXRlLmVudGl0aWVzW2tleV0pLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55KSA9PiBpZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbGw8UyBleHRlbmRzIFI+KHN0YXRlOiBTKTogUztcbiAgZnVuY3Rpb24gcmVtb3ZlQWxsPFMgZXh0ZW5kcyBSPihzdGF0ZTogYW55KTogUyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBpZHM6IFtdLFxuICAgICAgZW50aXRpZXM6IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IFJcbiAgKTogdm9pZDtcbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogYW55IH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IGFueVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZDogVCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG4gICAgY29uc3QgaGFzTmV3S2V5ID0gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG5cbiAgICBpZiAoaGFzTmV3S2V5KSB7XG4gICAgICBrZXlzW3VwZGF0ZS5pZF0gPSBuZXdLZXk7XG4gICAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICB9XG5cbiAgICBzdGF0ZS5lbnRpdGllc1tuZXdLZXldID0gdXBkYXRlZDtcblxuICAgIHJldHVybiBoYXNOZXdLZXk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBuZXdLZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAgIHVwZGF0ZXMgPSB1cGRhdGVzLmZpbHRlcih1cGRhdGUgPT4gdXBkYXRlLmlkIGluIHN0YXRlLmVudGl0aWVzKTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZUVudGl0aWVzID0gdXBkYXRlcy5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGRpZE11dGF0ZUVudGl0aWVzKSB7XG4gICAgICBjb25zdCBkaWRNdXRhdGVJZHMgPVxuICAgICAgICB1cGRhdGVzLmZpbHRlcih1cGRhdGUgPT4gdGFrZU5ld0tleShuZXdLZXlzLCB1cGRhdGUsIHN0YXRlKSkubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKGRpZE11dGF0ZUlkcykge1xuICAgICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMubWFwKChpZDogYW55KSA9PiBuZXdLZXlzW2lkXSB8fCBpZCk7XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcE11dGFibHkobWFwOiBFbnRpdHlNYXA8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBtYXBNdXRhYmx5KG1hcDogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBjaGFuZ2VzOiBVcGRhdGU8VD5bXSA9IHN0YXRlLmlkcy5yZWR1Y2UoXG4gICAgICAoY2hhbmdlczogYW55W10sIGlkOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gbWFwKHN0YXRlLmVudGl0aWVzW2lkXSk7XG4gICAgICAgIGlmIChjaGFuZ2UgIT09IHN0YXRlLmVudGl0aWVzW2lkXSkge1xuICAgICAgICAgIGNoYW5nZXMucHVzaCh7IGlkLCBjaGFuZ2VzOiBjaGFuZ2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgICB9LFxuICAgICAgW11cbiAgICApO1xuICAgIGNvbnN0IHVwZGF0ZXMgPSBjaGFuZ2VzLmZpbHRlcigoeyBpZCB9KSA9PiBpZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG5cbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkodXBkYXRlcywgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gdXBzZXJ0TWFueU11dGFibHkoW2VudGl0eV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGFkZGVkOiBhbnlbXSA9IFtdO1xuICAgIGNvbnN0IHVwZGF0ZWQ6IGFueVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBlbnRpdGllcykge1xuICAgICAgY29uc3QgaWQgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuICAgICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICAgIHVwZGF0ZWQucHVzaCh7IGlkLCBjaGFuZ2VzOiBlbnRpdHkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRlZC5wdXNoKGVudGl0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGlkTXV0YXRlQnlVcGRhdGVkID0gdXBkYXRlTWFueU11dGFibHkodXBkYXRlZCwgc3RhdGUpO1xuICAgIGNvbnN0IGRpZE11dGF0ZUJ5QWRkZWQgPSBhZGRNYW55TXV0YWJseShhZGRlZCwgc3RhdGUpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Ob25lICYmXG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLk5vbmU6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLkJvdGggfHxcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuQm90aDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVBbGwsXG4gICAgYWRkT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE9uZU11dGFibHkpLFxuICAgIGFkZE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkTWFueU11dGFibHkpLFxuICAgIGFkZEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRBbGxNdXRhYmx5KSxcbiAgICBzZXRBbGw6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0QWxsTXV0YWJseSksXG4gICAgdXBkYXRlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU9uZU11dGFibHkpLFxuICAgIHVwZGF0ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlTWFueU11dGFibHkpLFxuICAgIHVwc2VydE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRPbmVNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICByZW1vdmVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IocmVtb3ZlT25lTXV0YWJseSksXG4gICAgcmVtb3ZlTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihyZW1vdmVNYW55TXV0YWJseSksXG4gICAgbWFwOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKG1hcE11dGFibHkpLFxuICB9O1xufVxuIl19