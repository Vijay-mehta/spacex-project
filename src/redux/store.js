import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from './slices/launchesSlice';
import rocketsReducer from './slices/rocketsSlice';

export const store = configureStore({
    reducer: {
        launches: launchesReducer,
        rockets: rocketsReducer,
    },
});
