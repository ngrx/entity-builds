/**
 * @fileoverview added by tsickle
 * Generated from: modules/entity/src/sorted_state_adapter.ts
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
        model => !(selectIdValue(model, selectId) in state.entities)));
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
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
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
        update => takeUpdatedModel(models, update, state))).length >
            0;
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
        addAll: createStateOperator(addAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        map: createStateOperator(mapMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7OztBQU14QyxNQUFNLFVBQVUsd0JBQXdCLENBQUksUUFBYSxFQUFFLElBQVM7VUFHNUQsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLDBCQUEwQixDQUNyRSxRQUFRLENBQ1Q7Ozs7OztJQUdELFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsU0FBZ0IsRUFBRSxLQUFVOztjQUM1QyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07Ozs7UUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQzdEO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7YUFBTTtZQUNMLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxhQUFhLENBQUMsTUFB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QUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLFNBQVM7UUFDVCxVQUFVO1FBQ1YsU0FBUztRQUNULE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFDNUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDO0tBQ3JDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5U3RhdGUsXG4gIElkU2VsZWN0b3IsXG4gIENvbXBhcmVyLFxuICBFbnRpdHlTdGF0ZUFkYXB0ZXIsXG4gIFVwZGF0ZSxcbiAgRW50aXR5TWFwLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZU9wZXJhdG9yLCBEaWRNdXRhdGUgfSBmcm9tICcuL3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIgfSBmcm9tICcuL3Vuc29ydGVkX3N0YXRlX2FkYXB0ZXInO1xuaW1wb3J0IHsgc2VsZWN0SWRWYWx1ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU29ydGVkU3RhdGVBZGFwdGVyPFQ+KFxuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPixcbiAgc29ydDogQ29tcGFyZXI8VD5cbik6IEVudGl0eVN0YXRlQWRhcHRlcjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oc2VsZWN0SWQ6IGFueSwgc29ydDogYW55KTogYW55IHtcbiAgdHlwZSBSID0gRW50aXR5U3RhdGU8VD47XG5cbiAgY29uc3QgeyByZW1vdmVPbmUsIHJlbW92ZU1hbnksIHJlbW92ZUFsbCB9ID0gY3JlYXRlVW5zb3J0ZWRTdGF0ZUFkYXB0ZXIoXG4gICAgc2VsZWN0SWRcbiAgKTtcblxuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiBhZGRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkobmV3TW9kZWxzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShuZXdNb2RlbHM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBtb2RlbHMgPSBuZXdNb2RlbHMuZmlsdGVyKFxuICAgICAgbW9kZWwgPT4gIShzZWxlY3RJZFZhbHVlKG1vZGVsLCBzZWxlY3RJZCkgaW4gc3RhdGUuZW50aXRpZXMpXG4gICAgKTtcblxuICAgIGlmIChtb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlKG1vZGVscywgc3RhdGUpO1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEFsbE11dGFibHkobW9kZWxzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRBbGxNdXRhYmx5KG1vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHN0YXRlLmVudGl0aWVzID0ge307XG4gICAgc3RhdGUuaWRzID0gW107XG5cbiAgICBhZGRNYW55TXV0YWJseShtb2RlbHMsIHN0YXRlKTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkoW3VwZGF0ZV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRha2VVcGRhdGVkTW9kZWwobW9kZWxzOiBUW10sIHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IGJvb2xlYW47XG4gIGZ1bmN0aW9uIHRha2VVcGRhdGVkTW9kZWwobW9kZWxzOiBhbnlbXSwgdXBkYXRlOiBhbnksIHN0YXRlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoISh1cGRhdGUuaWQgaW4gc3RhdGUuZW50aXRpZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZS5lbnRpdGllc1t1cGRhdGUuaWRdO1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbCwgdXBkYXRlLmNoYW5nZXMpO1xuICAgIGNvbnN0IG5ld0tleSA9IHNlbGVjdElkVmFsdWUodXBkYXRlZCwgc2VsZWN0SWQpO1xuXG4gICAgZGVsZXRlIHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG5cbiAgICBtb2RlbHMucHVzaCh1cGRhdGVkKTtcblxuICAgIHJldHVybiBuZXdLZXkgIT09IHVwZGF0ZS5pZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IFVwZGF0ZTxUPltdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IG1vZGVsczogVFtdID0gW107XG5cbiAgICBjb25zdCBkaWRNdXRhdGVJZHMgPVxuICAgICAgdXBkYXRlcy5maWx0ZXIodXBkYXRlID0+IHRha2VVcGRhdGVkTW9kZWwobW9kZWxzLCB1cGRhdGUsIHN0YXRlKSkubGVuZ3RoID5cbiAgICAgIDA7XG5cbiAgICBpZiAobW9kZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcmlnaW5hbElkcyA9IHN0YXRlLmlkcztcbiAgICAgIGNvbnN0IHVwZGF0ZWRJbmRleGVzOiBhbnlbXSA9IFtdO1xuICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLmZpbHRlcigoaWQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtZXJnZShtb2RlbHMsIHN0YXRlKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhZGlkTXV0YXRlSWRzICYmXG4gICAgICAgIHVwZGF0ZWRJbmRleGVzLmV2ZXJ5KChpOiBudW1iZXIpID0+IHN0YXRlLmlkc1tpXSA9PT0gb3JpZ2luYWxJZHNbaV0pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IEVudGl0eU1hcDxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIG1hcE11dGFibHkodXBkYXRlc09yTWFwOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IHVwZGF0ZXM6IFVwZGF0ZTxUPltdID0gc3RhdGUuaWRzLnJlZHVjZShcbiAgICAgIChjaGFuZ2VzOiBhbnlbXSwgaWQ6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSB1cGRhdGVzT3JNYXAoc3RhdGUuZW50aXRpZXNbaWRdKTtcbiAgICAgICAgaWYgKGNoYW5nZSAhPT0gc3RhdGUuZW50aXRpZXNbaWRdKSB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHsgaWQsIGNoYW5nZXM6IGNoYW5nZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgIH0sXG4gICAgICBbXVxuICAgICk7XG5cbiAgICByZXR1cm4gdXBkYXRlTWFueU11dGFibHkodXBkYXRlcywgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gdXBzZXJ0TWFueU11dGFibHkoW2VudGl0eV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGFkZGVkOiBhbnlbXSA9IFtdO1xuICAgIGNvbnN0IHVwZGF0ZWQ6IGFueVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBlbnRpdGllcykge1xuICAgICAgY29uc3QgaWQgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuICAgICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICAgIHVwZGF0ZWQucHVzaCh7IGlkLCBjaGFuZ2VzOiBlbnRpdHkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRlZC5wdXNoKGVudGl0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGlkTXV0YXRlQnlVcGRhdGVkID0gdXBkYXRlTWFueU11dGFibHkodXBkYXRlZCwgc3RhdGUpO1xuICAgIGNvbnN0IGRpZE11dGF0ZUJ5QWRkZWQgPSBhZGRNYW55TXV0YWJseShhZGRlZCwgc3RhdGUpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Ob25lICYmXG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLk5vbmU6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLkJvdGggfHxcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuQm90aDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2UobW9kZWxzOiBUW10sIHN0YXRlOiBSKTogdm9pZDtcbiAgZnVuY3Rpb24gbWVyZ2UobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IHZvaWQge1xuICAgIG1vZGVscy5zb3J0KHNvcnQpO1xuXG4gICAgY29uc3QgaWRzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcblxuICAgIHdoaWxlIChpIDwgbW9kZWxzLmxlbmd0aCAmJiBqIDwgc3RhdGUuaWRzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9kZWwgPSBtb2RlbHNbaV07XG4gICAgICBjb25zdCBtb2RlbElkID0gc2VsZWN0SWRWYWx1ZShtb2RlbCwgc2VsZWN0SWQpO1xuICAgICAgY29uc3QgZW50aXR5SWQgPSBzdGF0ZS5pZHNbal07XG4gICAgICBjb25zdCBlbnRpdHkgPSBzdGF0ZS5lbnRpdGllc1tlbnRpdHlJZF07XG5cbiAgICAgIGlmIChzb3J0KG1vZGVsLCBlbnRpdHkpIDw9IDApIHtcbiAgICAgICAgaWRzLnB1c2gobW9kZWxJZCk7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpIDwgbW9kZWxzLmxlbmd0aCkge1xuICAgICAgc3RhdGUuaWRzID0gaWRzLmNvbmNhdChtb2RlbHMuc2xpY2UoaSkubWFwKHNlbGVjdElkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLmlkcyA9IGlkcy5jb25jYXQoc3RhdGUuaWRzLnNsaWNlKGopKTtcbiAgICB9XG5cbiAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwsIGkpID0+IHtcbiAgICAgIHN0YXRlLmVudGl0aWVzW3NlbGVjdElkKG1vZGVsKV0gPSBtb2RlbDtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlT25lLFxuICAgIHJlbW92ZU1hbnksXG4gICAgcmVtb3ZlQWxsLFxuICAgIGFkZE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRPbmVNdXRhYmx5KSxcbiAgICB1cGRhdGVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlT25lTXV0YWJseSksXG4gICAgdXBzZXJ0T25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE9uZU11dGFibHkpLFxuICAgIGFkZEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRBbGxNdXRhYmx5KSxcbiAgICBhZGRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE1hbnlNdXRhYmx5KSxcbiAgICB1cGRhdGVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU1hbnlNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gIH07XG59XG4iXX0=