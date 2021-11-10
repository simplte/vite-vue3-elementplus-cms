import { ActionContext, ActionTree } from 'vuex';

import { RootState } from '@/store';

import { AppActionTypes } from './action-types';
import { AppMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

type ActionAugents = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
// 定义action方法类型
export type Actions = {
  [AppActionTypes.SidebarCollapsed](context: ActionAugents): void;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const actions: ActionTree<State, RootState> & Actions = {
  [AppActionTypes.SidebarCollapsed]({ commit }) {
    commit(AppMutationTypes.SetSidebarCollapsed);
  },
};
