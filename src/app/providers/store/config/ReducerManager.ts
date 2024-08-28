import {combineReducers, Reducer, ReducersMapObject} from '@reduxjs/toolkit';

import {MountedReducers, ReducerManager, StateSchema, StateSchemaKey} from './StateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = {...initialReducers};

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];

    const mountedReducers: MountedReducers = {};

    return {
        // eslint-disable-next-line
        reduce: (state: StateSchema, action: any) => {
            if (keysToRemove.length > 0) {
                state = {...state};
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },
    };
}