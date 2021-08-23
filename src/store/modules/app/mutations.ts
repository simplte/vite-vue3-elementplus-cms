import { MutationTree } from 'vuex';
import { AppMutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [AppMutationTypes.SetSidebarCollapsed](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AppMutationTypes.SetSidebarCollapsed]: (state) => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  },
};
