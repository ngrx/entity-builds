/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    /** @typedef {?} */
    var R;
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
        const models = newModels.filter(model => !(selectIdValue(model, selectId) in state.entities));
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
        const didMutateIds = updates.filter(update => takeUpdatedModel(models, update, state)).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            const originalIds = state.ids;
            /** @type {?} */
            const updatedIndexes = [];
            state.ids = state.ids.filter((id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            });
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((i) => state.ids[i] === originalIds[i])) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
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
        models.forEach((model, i) => {
            state.entities[selectId(model)] = model;
        });
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
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zcmMvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBTXhDLE1BQU0sbUNBQXNDLFFBQWEsRUFBRSxJQUFTOzs7SUFHbEUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsMEJBQTBCLENBQ3JFLFFBQVEsQ0FDVCxDQUFDOzs7Ozs7SUFHRix1QkFBdUIsTUFBVyxFQUFFLEtBQVU7UUFDNUMsT0FBTyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN4Qzs7Ozs7O0lBR0Qsd0JBQXdCLFNBQWdCLEVBQUUsS0FBVTs7UUFDbEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQzdELENBQUM7UUFFRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjthQUFNO1lBQ0wsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7S0FDRjs7Ozs7O0lBR0QsdUJBQXVCLE1BQWEsRUFBRSxLQUFVO1FBQzlDLEtBQUssQ0FB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QyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO0tBQ25ELENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eVN0YXRlLFxuICBJZFNlbGVjdG9yLFxuICBDb21wYXJlcixcbiAgRGljdGlvbmFyeSxcbiAgRW50aXR5U3RhdGVBZGFwdGVyLFxuICBVcGRhdGUsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlT3BlcmF0b3IsIERpZE11dGF0ZSB9IGZyb20gJy4vc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlciB9IGZyb20gJy4vdW5zb3J0ZWRfc3RhdGVfYWRhcHRlcic7XG5pbXBvcnQgeyBzZWxlY3RJZFZhbHVlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3J0ZWRTdGF0ZUFkYXB0ZXI8VD4oXG4gIHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+LFxuICBzb3J0OiBDb21wYXJlcjxUPlxuKTogRW50aXR5U3RhdGVBZGFwdGVyPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvcnRlZFN0YXRlQWRhcHRlcjxUPihzZWxlY3RJZDogYW55LCBzb3J0OiBhbnkpOiBhbnkge1xuICB0eXBlIFIgPSBFbnRpdHlTdGF0ZTxUPjtcblxuICBjb25zdCB7IHJlbW92ZU9uZSwgcmVtb3ZlTWFueSwgcmVtb3ZlQWxsIH0gPSBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcihcbiAgICBzZWxlY3RJZFxuICApO1xuXG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIGFkZE1hbnlNdXRhYmx5KFtlbnRpdHldLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShuZXdNb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KG5ld01vZGVsczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IG1vZGVscyA9IG5ld01vZGVscy5maWx0ZXIoXG4gICAgICBtb2RlbCA9PiAhKHNlbGVjdElkVmFsdWUobW9kZWwsIHNlbGVjdElkKSBpbiBzdGF0ZS5lbnRpdGllcylcbiAgICApO1xuXG4gICAgaWYgKG1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2UobW9kZWxzLCBzdGF0ZSk7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkQWxsTXV0YWJseShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIGFkZEFsbE11dGFibHkobW9kZWxzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcbiAgICBzdGF0ZS5pZHMgPSBbXTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KG1vZGVscywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseShbdXBkYXRlXSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IFRbXSwgdXBkYXRlOiBVcGRhdGU8VD4sIHN0YXRlOiBSKTogYm9vbGVhbjtcbiAgZnVuY3Rpb24gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHM6IGFueVtdLCB1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghKHVwZGF0ZS5pZCBpbiBzdGF0ZS5lbnRpdGllcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG5cbiAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcblxuICAgIG1vZGVscy5wdXNoKHVwZGF0ZWQpO1xuXG4gICAgcmV0dXJuIG5ld0tleSAhPT0gdXBkYXRlLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgbW9kZWxzOiBUW10gPSBbXTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICB1cGRhdGVzLmZpbHRlcih1cGRhdGUgPT4gdGFrZVVwZGF0ZWRNb2RlbChtb2RlbHMsIHVwZGF0ZSwgc3RhdGUpKS5sZW5ndGggPlxuICAgICAgMDtcblxuICAgIGlmIChtb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSWRzID0gc3RhdGUuaWRzO1xuICAgICAgY29uc3QgdXBkYXRlZEluZGV4ZXM6IGFueVtdID0gW107XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChpZCBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWRJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1lcmdlKG1vZGVscywgc3RhdGUpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFkaWRNdXRhdGVJZHMgJiZcbiAgICAgICAgdXBkYXRlZEluZGV4ZXMuZXZlcnkoKGk6IG51bWJlcikgPT4gc3RhdGUuaWRzW2ldID09PSBvcmlnaW5hbElkc1tpXSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZShtb2RlbHM6IFRbXSwgc3RhdGU6IFIpOiB2b2lkO1xuICBmdW5jdGlvbiBtZXJnZShtb2RlbHM6IGFueVtdLCBzdGF0ZTogYW55KTogdm9pZCB7XG4gICAgbW9kZWxzLnNvcnQoc29ydCk7XG5cbiAgICBjb25zdCBpZHM6IGFueVtdID0gW107XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBtb2RlbHMubGVuZ3RoICYmIGogPCBzdGF0ZS5pZHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IG1vZGVsc1tpXTtcbiAgICAgIGNvbnN0IG1vZGVsSWQgPSBzZWxlY3RJZFZhbHVlKG1vZGVsLCBzZWxlY3RJZCk7XG4gICAgICBjb25zdCBlbnRpdHlJZCA9IHN0YXRlLmlkc1tqXTtcbiAgICAgIGNvbnN0IGVudGl0eSA9IHN0YXRlLmVudGl0aWVzW2VudGl0eUlkXTtcblxuICAgICAgaWYgKHNvcnQobW9kZWwsIGVudGl0eSkgPD0gMCkge1xuICAgICAgICBpZHMucHVzaChtb2RlbElkKTtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWRzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPCBtb2RlbHMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBpZHMuY29uY2F0KG1vZGVscy5zbGljZShpKS5tYXAoc2VsZWN0SWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuaWRzID0gaWRzLmNvbmNhdChzdGF0ZS5pZHMuc2xpY2UoaikpO1xuICAgIH1cblxuICAgIG1vZGVscy5mb3JFYWNoKChtb2RlbCwgaSkgPT4ge1xuICAgICAgc3RhdGUuZW50aXRpZXNbc2VsZWN0SWQobW9kZWwpXSA9IG1vZGVsO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVPbmUsXG4gICAgcmVtb3ZlTWFueSxcbiAgICByZW1vdmVBbGwsXG4gICAgYWRkT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZE9uZU11dGFibHkpLFxuICAgIHVwZGF0ZU9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cGRhdGVPbmVNdXRhYmx5KSxcbiAgICB1cHNlcnRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0T25lTXV0YWJseSksXG4gICAgYWRkQWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZEFsbE11dGFibHkpLFxuICAgIGFkZE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkTWFueU11dGFibHkpLFxuICAgIHVwZGF0ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlTWFueU11dGFibHkpLFxuICAgIHVwc2VydE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0TWFueU11dGFibHkpLFxuICB9O1xufVxuIl19