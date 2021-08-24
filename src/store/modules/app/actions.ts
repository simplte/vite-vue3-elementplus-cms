import { ActionContext, ActionTree } from 'vuex';
import { Mutations } from './mutations';
import { AppMutationTypes } from './mutation-types';
import { AppActionTypes } from './action-types';
import { State } from './state';
import { RootState } from '@/store';

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
