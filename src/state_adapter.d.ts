import { EntityState } from './models';
export declare function createStateOperator<V, R>(mutator: (arg: R, state: EntityState<V>) => boolean): <S extends EntityState<V>>(arg: R, state: S) => S;
