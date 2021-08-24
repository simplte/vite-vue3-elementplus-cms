import { GetterTree } from 'vuex';
import { State } from './state';
import { RootState } from '@/store';

export type Getters = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getters: GetterTree<State, RootState> & Getters = {};
