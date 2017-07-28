import { EntityState, EntitySelectors } from './models';
export declare function createSelectorsFactory<T>(): {
    getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
};
