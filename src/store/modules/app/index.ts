import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex';
import { state } from './state';
import { getters, Getters } from './getter';
import { Mutations, mutations } from './mutations';
import { actions, Actions } from './actions';
import { RootState } from '@/store';

import type { State } from './state';
export { State };

export type AppStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
