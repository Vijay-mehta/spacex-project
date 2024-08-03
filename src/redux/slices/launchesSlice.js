import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const launchesSlice = createSlice({
    name: 'launches',
    initialState: {
        upcoming: [],
        previous: [],
        status: 'idle',
    },
    reducers: {
        setUpcomingLaunches: (state, action) => {
            state.upcoming = action.payload;
        },
        setPreviousLaunches: (state, action) => {
            state.previous = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
});

export const { setUpcomingLaunches, setPreviousLaunches, setStatus } = launchesSlice.actions;

export const fetchLaunches = () => async dispatch => {
    try {
        dispatch(setStatus('loading'));
        const upcoming = await axios.get('https://api.spacexdata.com/v4/launches/upcoming');
        const previous = await axios.get('https://api.spacexdata.com/v4/launches/past');
        dispatch(setUpcomingLaunches(upcoming.data));
        dispatch(setPreviousLaunches(previous.data));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setStatus('failed'));
        console.error('Failed to fetch launches:', error);
    }
};

export default launchesSlice.reducer;
