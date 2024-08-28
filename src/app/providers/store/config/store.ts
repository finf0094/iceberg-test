import {configureStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit';

import {type StateSchema, ThunkExtraArg} from './StateSchema';
import {createReducerManager} from './ReducerManager.ts';

import {rtkApi} from '@/shared/api/rtkApi';


export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {};

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: import.meta.env.NODE_ENV !== 'production',
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    });

    // eslint-disable-next-line
    // @ts-expect-error
    store.reducerManager = reducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];