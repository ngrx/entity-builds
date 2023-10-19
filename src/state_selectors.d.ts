import { EntityState, EntitySelectors, MemoizedEntitySelectors } from './models';
export declare function createSelectorsFactory<T>(): {
    getSelectors: {
        (): EntitySelectors<T, EntityState<T>>;
        <V>(selectState: (state: V) => EntityState<T>): MemoizedEntitySelectors<T, V>;
    };
};
