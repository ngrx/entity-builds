import { Comparer, IdSelector, EntityAdapter } from './models';
export declare function createEntityAdapter<T>(options: {
    selectId: IdSelector<T>;
    sort?: false | Comparer<T>;
}): EntityAdapter<T>;
