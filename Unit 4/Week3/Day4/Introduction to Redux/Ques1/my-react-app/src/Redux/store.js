import { createStore } from 'redux';
import { counterReducer } from './reducer.js';

export const store = createStore(counterReducer);
