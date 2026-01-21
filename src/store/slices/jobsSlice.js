import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    filter: "All",
};

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.list = action.payload;
        },

        addJobToState: (state, action) => {
            state.list.push(action.payload);
        },

        updateJobInState: (state, action) => {
            const index = state.list.findIndex(
                (job) => job.id === action.payload.id
            );
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },

        deleteJobFromState: (state, action) => {
            state.list = state.list.filter(
                (job) => job.id !== action.payload
            );
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        clearJobs: (state) => {
            state.list = [];
            state.filter = "All";
        },
    },
});

export const {
    setJobs,
    addJobToState,
    updateJobInState,
    deleteJobFromState,
    setFilter,
    clearJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;
