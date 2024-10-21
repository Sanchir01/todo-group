import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, selectAllTodos, selectTodosStatus, selectTodosError, updateTodo, deleteTodo } from './app/todosSlice'; // Путь к todosSlice
import { AppDispatch } from './app/store/store'; 

const TodoAppDemo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectAllTodos);
  const status = useSelector(selectTodosStatus);
  const error = useSelector(selectTodosError);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id: number; title: string } | null>(null);

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  // Функция для добавления новой задачи
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ title: newTodo, completed: false, userId: 1 }));
      setNewTodo('');
    }
  };

  // Функция для обновления задачи
  const handleUpdateTodo = () => {
    if (editTodo && editTodo.title.trim()) {
      dispatch(updateTodo({ id: editTodo.id, title: editTodo.title, completed: false, userId: 1 }));
      setEditTodo(null);
    }
  };

  // Функция для удаления задачи
  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1>Todo List</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {status === 'succeeded' && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editTodo && editTodo.id === todo.id ? (
                <input
                  type="text"
                  value={editTodo.title}
                  onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                />
              ) : (
                <span>{todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}</span>
              )}
              <button onClick={() => setEditTodo({ id: todo.id, title: todo.title })}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {editTodo && (
        <div>
          <button onClick={handleUpdateTodo}>Update Todo</button>
          <button onClick={() => setEditTodo(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TodoAppDemo;