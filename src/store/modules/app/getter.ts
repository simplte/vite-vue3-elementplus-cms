import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';

export type Getters = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getters: GetterTree<State, RootState> & Getters = {};
