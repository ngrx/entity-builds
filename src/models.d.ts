export declare type ComparerStr<T> = {
    (a: T, b: T): string;
};
export declare type ComparerNum<T> = {
    (a: T, b: T): number;
};
export declare type Comparer<T> = ComparerNum<T> | ComparerStr<T>;
export declare type IdSelectorStr<T> = {
    (model: T): string;
};
export declare type IdSelectorNum<T> = {
    (model: T): number;
};
export declare type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;
export declare type DictionaryStr<T> = {
    [id: string]: T;
};
export declare type DictionaryNum<T> = {
    [id: number]: T;
};
export declare type Dictionary<T> = DictionaryStr<T> | DictionaryNum<T>;
export declare type UpdateStr<T> = {
    id: string;
    changes: Partial<T>;
};
export declare type UpdateNum<T> = {
    id: number;
    changes: Partial<T>;
};
export declare type Update<T> = UpdateStr<T> | UpdateNum<T>;
export interface EntityStateStr<T> {
    ids: string[];
    entities: Dictionary<T>;
}
export interface EntityStateNum<T> {
    ids: number[];
    entities: Dictionary<T>;
}
export declare type EntityState<T> = EntityStateStr<T> | EntityStateNum<T>;
export interface EntityDefinition<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
}
export interface EntityStateAdapter<T> {
    addOne<S extends EntityState<T>>(entity: T, state: S): S;
    addMany<S extends EntityState<T>>(entities: T[], state: S): S;
    addAll<S extends EntityState<T>>(entities: T[], state: S): S;
    removeOne<S extends EntityState<T>>(key: string, state: S): S;
    removeOne<S extends EntityState<T>>(key: number, state: S): S;
    removeMany<S extends EntityState<T>>(keys: string[], state: S): S;
    removeMany<S extends EntityState<T>>(keys: number[], state: S): S;
    removeAll<S extends EntityState<T>>(state: S): S;
    updateOne<S extends EntityState<T>>(update: Update<T>, state: S): S;
    updateMany<S extends EntityState<T>>(updates: Update<T>[], state: S): S;
}
export declare type EntitySelectorsBase<T, V> = {
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
};
export interface EntitySelectorsStr<T, V> extends EntitySelectorsBase<T, V> {
    selectIds: (state: V) => string[];
}
export interface EntitySelectorsNum<T, V> extends EntitySelectorsBase<T, V> {
    selectIds: (state: V) => number[];
}
export declare type EntitySelectors<T, V> = EntitySelectorsNum<T, V> | EntitySelectorsStr<T, V>;
export interface EntityAdapter<T> extends EntityStateAdapter<T> {
    getInitialState(): EntityState<T>;
    getInitialState<S extends object>(state: S): EntityState<T> & S;
    getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}
