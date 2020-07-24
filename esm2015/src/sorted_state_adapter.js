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
    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);
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
        const models = newModels.filter((/**
         * @param {?} model
         * @return {?}
         */
        (model) => !(selectIdValue(model, selectId) in state.entities)));
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
        const id = selectIdValue(entity, selectId);
        if (id in state.entities) {
            state.ids = state.ids.filter((/**
             * @param {?} val
             * @return {?}
             */
            (val) => val !== id));
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
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
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
        const models = [];
        /** @type {?} */
        const didMutateIds = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        (update) => takeUpdatedModel(models, update, state)))
            .length > 0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            const originalIds = state.ids;
            /** @type {?} */
            const updatedIndexes = [];
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @param {?} index
             * @return {?}
             */
            (id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            }));
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((/**
                 * @param {?} i
                 * @return {?}
                 */
                (i) => state.ids[i] === originalIds[i]))) {
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
        const updates = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
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
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function merge(models, state) {
        models.sort(sort);
        /** @type {?} */
        const ids = [];
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let j = 0;
        while (i < models.length && j < state.ids.length) {
            /** @type {?} */
            const model = models[i];
            /** @type {?} */
            const modelId = selectIdValue(model, selectId);
            /** @type {?} */
            const entityId = state.ids[j];
            /** @type {?} */
            const entity = state.entities[entityId];
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
        (model, i) => {
            state.entities[selectId(model)] = model;
        }));
    }
    return {
        removeOne,
        removeMany,
        removeAll,
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
        mapOne: createStateOperator(mapOneMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFVQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7OztBQU14QyxNQUFNLFVBQVUsd0JBQXdCLENBQUksUUFBYSxFQUFFLElBQVM7VUFHNUQsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLDBCQUEwQixDQUNyRSxRQUFRLENBQ1Q7Ozs7OztJQUdELFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsU0FBZ0IsRUFBRSxLQUFVOztjQUM1QyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07Ozs7UUFDN0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDL0Q7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjthQUFNO1lBQ0wsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7Ozs7SUFHRCxTQUFTLGFBQWEsQ0FBQyxN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QUFDLEVBQUUsRUFBRTtZQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsU0FBUztRQUNULFVBQVU7UUFDVixTQUFTO1FBQ1QsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFDNUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7S0FDM0MsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnRpdHlTdGF0ZSxcbiAgSWRTZWxlY3RvcixcbiAgQ29tcGFyZXIsXG4gIEVudGl0eVN0YXRlQWRhcHRlcixcbiAgVXBkYXRlLFxuICBFbnRpdHlNYXAsXG4gIEVudGl0eU1hcE9uZU51bSxcbiAgRW50aXR5TWFwT25lU3RyLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZU9wZXJhdG9yLCBEaWRNdXRhdGUgfSBmcm9tICcuL3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIgfSBmcm9tICcuL3Vuc29ydGVkX3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgc2VsZWN0SWRWYWx1ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU29ydGVkU3RhdGVBZGFwdGVyPFQ+KFxuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPixcbiAgc29ydDogQ29tcGFyZXI8VD5cbik6IEVudGl0eVN0YXRlQWRhcHRlcjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oc2VsZWN0SWQ6IGFueSwgc29ydDogYW55KTogYW55IHtcbiAgdHlwZSBSID0gRW50aXR5U3RhdGU8VD47XG5cbiAgY29uc3QgeyByZW1vdmVPbmUsIHJlbW92ZU1hbnksIHJlbW92ZUFsbCB9ID0gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIoXG4gICAgc2VsZWN0SWRcbiAgKTtcblxuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiBhZGRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkobmV3TW9kZWxzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShuZXdNb2RlbHM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBtb2RlbHMgPSBuZXdNb2RlbHMuZmlsdGVyKFxuICAgICAgKG1vZGVsKSA9PiAhKHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKSBpbiBzdGF0ZS5lbnRpdGllcylcbiAgICApO1xuXG4gICAgaWYgKG1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2UobW9kZWxzLCBzdGF0ZSk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QWxsTXV0YWJseShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KG1vZGVscywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKCh2YWw6IHN0cmluZyB8IG51bWJlcikgPT4gdmFsICE9PSBpZCk7XG4gICAgICBtZXJnZShbZW50aXR5XSwgc3RhdGUpO1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYWRkT25lTXV0YWJseShlbnRpdHksIHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YWtlVXBkYXRlZE1vZGVsKG1vZGVsczogVFtdLCB1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBib29sZWFuO1xuICBmdW5jdGlvbiB0YWtlVXBkYXRlZE1vZGVsKG1vZGVsczogYW55W10sIHVwZGF0ZTogYW55LCBzdGF0ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCEodXBkYXRlLmlkIGluIHN0YXRlLmVudGl0aWVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsID0gc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICBjb25zdCB1cGRhdGVkID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWwsIHVwZGF0ZS5jaGFuZ2VzKTtcbiAgICBjb25zdCBuZXdLZXkgPSBzZWxlY3RJZFZhbHVlKHVwZGF0ZWQsIHNlbGVjdElkKTtcblxuICAgIGRlbGV0ZSBzdGF0ZS5lbnRpdGllc1t1cGRhdGUuaWRdO1xuXG4gICAgbW9kZWxzLnB1c2godXBkYXRlZCk7XG5cbiAgICByZXR1cm4gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBtb2RlbHM6IFRbXSA9IFtdO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlSWRzID1cbiAgICAgIHVwZGF0ZXMuZmlsdGVyKCh1cGRhdGUpID0+IHRha2VVcGRhdGVkTW9kZWwobW9kZWxzLCB1cGRhdGUsIHN0YXRlKSlcbiAgICAgICAgLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAobW9kZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcmlnaW5hbElkcyA9IHN0YXRlLmlkcztcbiAgICAgIGNvbnN0IHVwZGF0ZWRJbmRleGVzOiBhbnlbXSA9IFtdO1xuICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLmZpbHRlcigoaWQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtZXJnZShtb2RlbHMsIHN0YXRlKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhZGlkTXV0YXRlSWRzICYmXG4gICAgICAgIHVwZGF0ZWRJbmRleGVzLmV2ZXJ5KChpOiBudW1iZXIpID0+IHN0YXRlLmlkc1tpXSA9PT0gb3JpZ2luYWxJZHNbaV0pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIG1hcE11dGFibHkodXBkYXRlc09yTWFwOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IHVwZGF0ZXM6IFVwZGF0ZTxUPltdID0gc3RhdGUuaWRzLnJlZHVjZShcbiAgICAgIChjaGFuZ2VzOiBhbnlbXSwgaWQ6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSB1cGRhdGVzT3JNYXAoc3RhdGUuZW50aXRpZXNbaWRdKTtcbiAgICAgICAgaWYgKGNoYW5nZSAhPT0gc3RhdGUuZW50aXRpZXNbaWRdKSB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHsgaWQsIGNoYW5nZXM6IGNoYW5nZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgIH0sXG4gICAgICBbXVxuICAgICk7XG5cbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkodXBkYXRlcywgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwT25lTXV0YWJseShtYXA6IEVudGl0eU1hcE9uZU51bTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIG1hcE9uZU11dGFibHkobWFwOiBFbnRpdHlNYXBPbmVTdHI8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBtYXBPbmVNdXRhYmx5KHsgbWFwLCBpZCB9OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGVudGl0eSA9IHN0YXRlLmVudGl0aWVzW2lkXTtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZWRFbnRpdHkgPSBtYXAoZW50aXR5KTtcbiAgICByZXR1cm4gdXBkYXRlT25lTXV0YWJseShcbiAgICAgIHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBjaGFuZ2VzOiB1cGRhdGVkRW50aXR5LFxuICAgICAgfSxcbiAgICAgIHN0YXRlXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwc2VydE1hbnlNdXRhYmx5KFtlbnRpdHldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBhZGRlZDogYW55W10gPSBbXTtcbiAgICBjb25zdCB1cGRhdGVkOiBhbnlbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGlkID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcbiAgICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgICB1cGRhdGVkLnB1c2goeyBpZCwgY2hhbmdlczogZW50aXR5IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkZWQucHVzaChlbnRpdHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRpZE11dGF0ZUJ5VXBkYXRlZCA9IHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZWQsIHN0YXRlKTtcbiAgICBjb25zdCBkaWRNdXRhdGVCeUFkZGVkID0gYWRkTWFueU11dGFibHkoYWRkZWQsIHN0YXRlKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuTm9uZSAmJlxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Ob25lOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Cb3RoIHx8XG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLkJvdGg6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlKG1vZGVsczogVFtdLCBzdGF0ZTogUik6IHZvaWQ7XG4gIGZ1bmN0aW9uIG1lcmdlKG1vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiB2b2lkIHtcbiAgICBtb2RlbHMuc29ydChzb3J0KTtcblxuICAgIGNvbnN0IGlkczogYW55W10gPSBbXTtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaiA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IG1vZGVscy5sZW5ndGggJiYgaiA8IHN0YXRlLmlkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxzW2ldO1xuICAgICAgY29uc3QgbW9kZWxJZCA9IHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKTtcbiAgICAgIGNvbnN0IGVudGl0eUlkID0gc3RhdGUuaWRzW2pdO1xuICAgICAgY29uc3QgZW50aXR5ID0gc3RhdGUuZW50aXRpZXNbZW50aXR5SWRdO1xuXG4gICAgICBpZiAoc29ydChtb2RlbCwgZW50aXR5KSA8PSAwKSB7XG4gICAgICAgIGlkcy5wdXNoKG1vZGVsSWQpO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZHMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA8IG1vZGVscy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmlkcyA9IGlkcy5jb25jYXQobW9kZWxzLnNsaWNlKGkpLm1hcChzZWxlY3RJZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5pZHMgPSBpZHMuY29uY2F0KHN0YXRlLmlkcy5zbGljZShqKSk7XG4gICAgfVxuXG4gICAgbW9kZWxzLmZvckVhY2goKG1vZGVsLCBpKSA9PiB7XG4gICAgICBzdGF0ZS5lbnRpdGllc1tzZWxlY3RJZChtb2RlbCldID0gbW9kZWw7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZU9uZSxcbiAgICByZW1vdmVNYW55LFxuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgdXBkYXRlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU9uZU11dGFibHkpLFxuICAgIHVwc2VydE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRPbmVNdXRhYmx5KSxcbiAgICBhZGRBbGw6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0QWxsTXV0YWJseSksXG4gICAgc2V0QWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRPbmVNdXRhYmx5KSxcbiAgICBhZGRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE1hbnlNdXRhYmx5KSxcbiAgICB1cGRhdGVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU1hbnlNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gICAgbWFwT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKG1hcE9uZU11dGFibHkpLFxuICB9O1xufVxuIl19