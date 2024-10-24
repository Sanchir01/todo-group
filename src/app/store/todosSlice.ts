import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById } from '~/shared/api/todoService';
import { RootState } from '~/app/store/store';

// Интерфейс задачи (Todo)
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

export const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

// CRUD
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await getAllTodos();
  return response.data;
});

export const fetchTodoById = createAsyncThunk('todos/fetchTodoById', async (id: number) => {
  const response = await getTodoById(id);
  return response.data;
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (newTodo: { title: string; completed: boolean; userId: number }) => {
    const response = await createTodo(newTodo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo: Todo) => {
    const response = await updateTodoById(updatedTodo);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  await deleteTodoById(id);
  return id;
});




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

// Экспорт селекторов и редьюсера
export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
export const selectTodoById = (state: RootState, id: number) =>
  state.todos.items.find((todo) => todo.id === id);

export default todosSlice.reducer;