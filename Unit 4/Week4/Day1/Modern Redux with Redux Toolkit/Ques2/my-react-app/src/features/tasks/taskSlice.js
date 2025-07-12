import { createSlice, nanoid } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ id: nanoid(), text: action.payload, completed: false });
        },
        toggleTask: (state, action) => {
            const task = state.find(t => t.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        removeTask: (state, action) => {
            return state.filter(t => t.id !== action.payload);
        },
    },
});

export const { addTask, toggleTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
