import { EntityState } from './models';
export declare function createStateOperator<V, R>(mutator: (arg: R, state: EntityState<V>) => void): <S extends EntityState<V>>(arg: R, state: S) => S;
