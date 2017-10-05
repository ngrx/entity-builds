import { EntityState, EntityStateStr, EntityStateNum } from './models';
export declare function getInitialEntityState<V>(): EntityState<V>;
export declare function createInitialStateFactory<V>(): {
    getInitialState: {
        (): EntityState<V>;
        <S extends object>(additionalState: S): (EntityStateStr<V> & S) | (EntityStateNum<V> & S);
    };
};
