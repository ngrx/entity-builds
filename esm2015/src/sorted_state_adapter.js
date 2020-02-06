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
    function setAllMutably(models, state) {
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
        addAll: createStateOperator(setAllMutably),
        setAll: createStateOperator(setAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        map: createStateOperator(mapMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7OztBQU14QyxNQUFNLFVBQVUsd0JBQXdCLENBQUksUUFBYSxFQUFFLElBQVM7VUFHNUQsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLDBCQUEwQixDQUNyRSxRQUFRLENBQ1Q7Ozs7OztJQUdELFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsU0FBZ0IsRUFBRSxLQUFVOztjQUM1QyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07Ozs7UUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQzdEO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7YUFBTTtZQUNMLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxhQUFhLENBQUMsTUFB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QUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLFNBQVM7UUFDVCxVQUFVO1FBQ1YsU0FBUztRQUNULE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7S0FDckMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnRpdHlTdGF0ZSxcbiAgSWRTZWxlY3RvcixcbiAgQ29tcGFyZXIsXG4gIEVudGl0eVN0YXRlQWRhcHRlcixcbiAgVXBkYXRlLFxuICBFbnRpdHlNYXAsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlT3BlcmF0b3IsIERpZE11dGF0ZSB9IGZyb20gJy4vc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlciB9IGZyb20gJy4vdW5zb3J0ZWRfc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBzZWxlY3RJZFZhbHVlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oXG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+LFxuICBzb3J0OiBDb21wYXJlcjxUPlxuKTogRW50aXR5U3RhdGVBZGFwdGVyPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvcnRlZFN0YXRlQWRhcHRlcjxUPihzZWxlY3RJZDogYW55LCBzb3J0OiBhbnkpOiBhbnkge1xuICB0eXBlIFIgPSBFbnRpdHlTdGF0ZTxUPjtcblxuICBjb25zdCB7IHJlbW92ZU9uZSwgcmVtb3ZlTWFueSwgcmVtb3ZlQWxsIH0gPSBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcihcbiAgICBzZWxlY3RJZFxuICApO1xuXG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIGFkZE1hbnlNdXRhYmx5KFtlbnRpdHldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShuZXdNb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KG5ld01vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IG1vZGVscyA9IG5ld01vZGVscy5maWx0ZXIoXG4gICAgICBtb2RlbCA9PiAhKHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKSBpbiBzdGF0ZS5lbnRpdGllcylcbiAgICApO1xuXG4gICAgaWYgKG1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2UobW9kZWxzLCBzdGF0ZSk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QWxsTXV0YWJseShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KG1vZGVscywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseShbdXBkYXRlXSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IFRbXSwgdXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBSKTogYm9vbGVhbjtcbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IGFueVtdLCB1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghKHVwZGF0ZS5pZCBpbiBzdGF0ZS5lbnRpdGllcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG5cbiAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcblxuICAgIG1vZGVscy5wdXNoKHVwZGF0ZWQpO1xuXG4gICAgcmV0dXJuIG5ld0tleSAhPT0gdXBkYXRlLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgbW9kZWxzOiBUW10gPSBbXTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICB1cGRhdGVzLmZpbHRlcih1cGRhdGUgPT4gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHMsIHVwZGF0ZSwgc3RhdGUpKS5sZW5ndGggPlxuICAgICAgMDtcblxuICAgIGlmIChtb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSWRzID0gc3RhdGUuaWRzO1xuICAgICAgY29uc3QgdXBkYXRlZEluZGV4ZXM6IGFueVtdID0gW107XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWRJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1lcmdlKG1vZGVscywgc3RhdGUpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFkaWRNdXRhdGVJZHMgJiZcbiAgICAgICAgdXBkYXRlZEluZGV4ZXMuZXZlcnkoKGk6IG51bWJlcikgPT4gc3RhdGUuaWRzW2ldID09PSBvcmlnaW5hbElkc1tpXSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXBNdXRhYmx5KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwTXV0YWJseSh1cGRhdGVzT3JNYXA6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgdXBkYXRlczogVXBkYXRlPFQ+W10gPSBzdGF0ZS5pZHMucmVkdWNlKFxuICAgICAgKGNoYW5nZXM6IGFueVtdLCBpZDogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IHVwZGF0ZXNPck1hcChzdGF0ZS5lbnRpdGllc1tpZF0pO1xuICAgICAgICBpZiAoY2hhbmdlICE9PSBzdGF0ZS5lbnRpdGllc1tpZF0pIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2goeyBpZCwgY2hhbmdlczogY2hhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKTtcblxuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiB2b2lkO1xuICBmdW5jdGlvbiBtZXJnZShtb2RlbHM6IGFueVtdLCBzdGF0ZTogYW55KTogdm9pZCB7XG4gICAgbW9kZWxzLnNvcnQoc29ydCk7XG5cbiAgICBjb25zdCBpZHM6IGFueVtdID0gW107XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBtb2RlbHMubGVuZ3RoICYmIGogPCBzdGF0ZS5pZHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IG1vZGVsc1tpXTtcbiAgICAgIGNvbnN0IG1vZGVsSWQgPSBzZWxlY3RJZFZhbHVlKG1vZGVsLCBzZWxlY3RJZCk7XG4gICAgICBjb25zdCBlbnRpdHlJZCA9IHN0YXRlLmlkc1tqXTtcbiAgICAgIGNvbnN0IGVudGl0eSA9IHN0YXRlLmVudGl0aWVzW2VudGl0eUlkXTtcblxuICAgICAgaWYgKHNvcnQobW9kZWwsIGVudGl0eSkgPD0gMCkge1xuICAgICAgICBpZHMucHVzaChtb2RlbElkKTtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWRzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPCBtb2RlbHMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBpZHMuY29uY2F0KG1vZGVscy5zbGljZShpKS5tYXAoc2VsZWN0SWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuaWRzID0gaWRzLmNvbmNhdChzdGF0ZS5pZHMuc2xpY2UoaikpO1xuICAgIH1cblxuICAgIG1vZGVscy5mb3JFYWNoKChtb2RlbCwgaSkgPT4ge1xuICAgICAgc3RhdGUuZW50aXRpZXNbc2VsZWN0SWQobW9kZWwpXSA9IG1vZGVsO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVPbmUsXG4gICAgcmVtb3ZlTWFueSxcbiAgICByZW1vdmVBbGwsXG4gICAgYWRkT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE9uZU11dGFibHkpLFxuICAgIHVwZGF0ZU9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cGRhdGVPbmVNdXRhYmx5KSxcbiAgICB1cHNlcnRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0T25lTXV0YWJseSksXG4gICAgYWRkQWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldEFsbDogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRBbGxNdXRhYmx5KSxcbiAgICBhZGRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE1hbnlNdXRhYmx5KSxcbiAgICB1cGRhdGVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU1hbnlNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gIH07XG59XG4iXX0=