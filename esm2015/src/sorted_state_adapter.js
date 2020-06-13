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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7OztBQU14QyxNQUFNLFVBQVUsd0JBQXdCLENBQUksUUFBYSxFQUFFLElBQVM7VUFHNUQsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLDBCQUEwQixDQUNyRSxRQUFRLENBQ1Q7Ozs7OztJQUdELFNBQVMsYUFBYSxDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxjQUFjLENBQUMsU0FBZ0IsRUFBRSxLQUFVOztjQUM1QyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07Ozs7UUFDN0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDL0Q7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjthQUFNO1lBQ0wsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7Ozs7SUFHRCxTQUFTLGFBQWEsQ0FBQyxN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O1FBQzFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxDQUFDO1FBQzVDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsR0FBRyxFQUFFLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztLQUNyQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eVN0YXRlLFxuICBJZFNlbGVjdG9yLFxuICBDb21wYXJlcixcbiAgRW50aXR5U3RhdGVBZGFwdGVyLFxuICBVcGRhdGUsXG4gIEVudGl0eU1hcCxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVPcGVyYXRvciwgRGlkTXV0YXRlIH0gZnJvbSAnLi9zdGF0ZV9hZGFwdGVyJztcbmltcG9ydCB7IGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyIH0gZnJvbSAnLi91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyJztcbmltcG9ydCB7IHNlbGVjdElkVmFsdWUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvcnRlZFN0YXRlQWRhcHRlcjxUPihcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD4sXG4gIHNvcnQ6IENvbXBhcmVyPFQ+XG4pOiBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU29ydGVkU3RhdGVBZGFwdGVyPFQ+KHNlbGVjdElkOiBhbnksIHNvcnQ6IGFueSk6IGFueSB7XG4gIHR5cGUgUiA9IEVudGl0eVN0YXRlPFQ+O1xuXG4gIGNvbnN0IHsgcmVtb3ZlT25lLCByZW1vdmVNYW55LCByZW1vdmVBbGwgfSA9IGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyKFxuICAgIHNlbGVjdElkXG4gICk7XG5cbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gYWRkTWFueU11dGFibHkoW2VudGl0eV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KG5ld01vZGVsczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkobmV3TW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgbW9kZWxzID0gbmV3TW9kZWxzLmZpbHRlcihcbiAgICAgIChtb2RlbCkgPT4gIShzZWxlY3RJZFZhbHVlKG1vZGVsLCBzZWxlY3RJZCkgaW4gc3RhdGUuZW50aXRpZXMpXG4gICAgKTtcblxuICAgIGlmIChtb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlKG1vZGVscywgc3RhdGUpO1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFsbE11dGFibHkobW9kZWxzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRBbGxNdXRhYmx5KG1vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHN0YXRlLmVudGl0aWVzID0ge307XG4gICAgc3RhdGUuaWRzID0gW107XG5cbiAgICBhZGRNYW55TXV0YWJseShtb2RlbHMsIHN0YXRlKTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gc2V0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgaWQgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLmZpbHRlcigodmFsOiBzdHJpbmcgfCBudW1iZXIpID0+IHZhbCAhPT0gaWQpO1xuICAgICAgbWVyZ2UoW2VudGl0eV0sIHN0YXRlKTtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkZE9uZU11dGFibHkoZW50aXR5LCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseShbdXBkYXRlXSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IFRbXSwgdXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBSKTogYm9vbGVhbjtcbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IGFueVtdLCB1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghKHVwZGF0ZS5pZCBpbiBzdGF0ZS5lbnRpdGllcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG5cbiAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcblxuICAgIG1vZGVscy5wdXNoKHVwZGF0ZWQpO1xuXG4gICAgcmV0dXJuIG5ld0tleSAhPT0gdXBkYXRlLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgbW9kZWxzOiBUW10gPSBbXTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICB1cGRhdGVzLmZpbHRlcigodXBkYXRlKSA9PiB0YWtlVXBkYXRlZE1vZGVsKG1vZGVscywgdXBkYXRlLCBzdGF0ZSkpXG4gICAgICAgIC5sZW5ndGggPiAwO1xuXG4gICAgaWYgKG1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb3JpZ2luYWxJZHMgPSBzdGF0ZS5pZHM7XG4gICAgICBjb25zdCB1cGRhdGVkSW5kZXhlczogYW55W10gPSBbXTtcbiAgICAgIHN0YXRlLmlkcyA9IHN0YXRlLmlkcy5maWx0ZXIoKGlkOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGlkIGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZEluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbWVyZ2UobW9kZWxzLCBzdGF0ZSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWRpZE11dGF0ZUlkcyAmJlxuICAgICAgICB1cGRhdGVkSW5kZXhlcy5ldmVyeSgoaTogbnVtYmVyKSA9PiBzdGF0ZS5pZHNbaV0gPT09IG9yaWdpbmFsSWRzW2ldKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcE11dGFibHkobWFwOiBFbnRpdHlNYXA8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBtYXBNdXRhYmx5KHVwZGF0ZXNPck1hcDogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCB1cGRhdGVzOiBVcGRhdGU8VD5bXSA9IHN0YXRlLmlkcy5yZWR1Y2UoXG4gICAgICAoY2hhbmdlczogYW55W10sIGlkOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gdXBkYXRlc09yTWFwKHN0YXRlLmVudGl0aWVzW2lkXSk7XG4gICAgICAgIGlmIChjaGFuZ2UgIT09IHN0YXRlLmVudGl0aWVzW2lkXSkge1xuICAgICAgICAgIGNoYW5nZXMucHVzaCh7IGlkLCBjaGFuZ2VzOiBjaGFuZ2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgICB9LFxuICAgICAgW11cbiAgICApO1xuXG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXMsIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0T25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwc2VydE1hbnlNdXRhYmx5KFtlbnRpdHldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRNYW55TXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBhZGRlZDogYW55W10gPSBbXTtcbiAgICBjb25zdCB1cGRhdGVkOiBhbnlbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGlkID0gc2VsZWN0SWRWYWx1ZShlbnRpdHksIHNlbGVjdElkKTtcbiAgICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgICB1cGRhdGVkLnB1c2goeyBpZCwgY2hhbmdlczogZW50aXR5IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkZWQucHVzaChlbnRpdHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRpZE11dGF0ZUJ5VXBkYXRlZCA9IHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZWQsIHN0YXRlKTtcbiAgICBjb25zdCBkaWRNdXRhdGVCeUFkZGVkID0gYWRkTWFueU11dGFibHkoYWRkZWQsIHN0YXRlKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuTm9uZSAmJlxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Ob25lOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgICBjYXNlIGRpZE11dGF0ZUJ5QWRkZWQgPT09IERpZE11dGF0ZS5Cb3RoIHx8XG4gICAgICAgIGRpZE11dGF0ZUJ5VXBkYXRlZCA9PT0gRGlkTXV0YXRlLkJvdGg6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuRW50aXRpZXNPbmx5O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlKG1vZGVsczogVFtdLCBzdGF0ZTogUik6IHZvaWQ7XG4gIGZ1bmN0aW9uIG1lcmdlKG1vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiB2b2lkIHtcbiAgICBtb2RlbHMuc29ydChzb3J0KTtcblxuICAgIGNvbnN0IGlkczogYW55W10gPSBbXTtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaiA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IG1vZGVscy5sZW5ndGggJiYgaiA8IHN0YXRlLmlkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxzW2ldO1xuICAgICAgY29uc3QgbW9kZWxJZCA9IHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKTtcbiAgICAgIGNvbnN0IGVudGl0eUlkID0gc3RhdGUuaWRzW2pdO1xuICAgICAgY29uc3QgZW50aXR5ID0gc3RhdGUuZW50aXRpZXNbZW50aXR5SWRdO1xuXG4gICAgICBpZiAoc29ydChtb2RlbCwgZW50aXR5KSA8PSAwKSB7XG4gICAgICAgIGlkcy5wdXNoKG1vZGVsSWQpO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZHMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA8IG1vZGVscy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmlkcyA9IGlkcy5jb25jYXQobW9kZWxzLnNsaWNlKGkpLm1hcChzZWxlY3RJZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5pZHMgPSBpZHMuY29uY2F0KHN0YXRlLmlkcy5zbGljZShqKSk7XG4gICAgfVxuXG4gICAgbW9kZWxzLmZvckVhY2goKG1vZGVsLCBpKSA9PiB7XG4gICAgICBzdGF0ZS5lbnRpdGllc1tzZWxlY3RJZChtb2RlbCldID0gbW9kZWw7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZU9uZSxcbiAgICByZW1vdmVNYW55LFxuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgdXBkYXRlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU9uZU11dGFibHkpLFxuICAgIHVwc2VydE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRPbmVNdXRhYmx5KSxcbiAgICBhZGRBbGw6IGNyZWF0ZVN0YXRlT3BlcmF0b3Ioc2V0QWxsTXV0YWJseSksXG4gICAgc2V0QWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRPbmVNdXRhYmx5KSxcbiAgICBhZGRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE1hbnlNdXRhYmx5KSxcbiAgICB1cGRhdGVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU1hbnlNdXRhYmx5KSxcbiAgICB1cHNlcnRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gIH07XG59XG4iXX0=