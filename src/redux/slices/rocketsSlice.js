import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const rocketsSlice = createSlice({
    name: 'rockets',
    initialState: {
        rockets: [],
        status: 'idle',
    },
    reducers: {
        setRockets: (state, action) => {
            state.rockets = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
});

export const { setRockets, setStatus } = rocketsSlice.actions;

export const fetchRockets = () => async dispatch => {
    try {
        dispatch(setStatus('loading'));
        const response = await axios.get('https://api.spacexdata.com/v4/rockets');
        dispatch(setRockets(response.data));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setStatus('failed'));
        console.error('Failed to fetch rockets:', error);
    }
};

export default rocketsSlice.reducer;
