import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store/store'; 

const API_URL = 'http://localhost:3001/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (newTodo: { title: string; completed: boolean; userId: number }) => {
    const response = await axios.post(API_URL, newTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo: Todo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);


export const fetchTodoById = createAsyncThunk('todos/fetchTodoById', async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export interface Todo { 
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch todos';
    });

    builder.addCase(fetchTodoById.fulfilled, (state, action) => {
      const todo = action.payload;
      const index = state.items.findIndex((item) => item.id === todo.id);
      if (index !== -1) {
        state.items[index] = todo;
      } else {
        state.items.push(todo);
      }
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedTodo.id);
      if (index !== -1) {
        state.items[index] = updatedTodo;
      }
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
  },
});

export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
export const selectTodoById = (state: RootState, id: number) =>
  state.todos.items.find((todo) => todo.id === id);

export default todosSlice.reducer;