import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from '~/shared/api/todoService';
import { AppDispatch } from './app/store/store'; 
import {  selectTodosStatus, selectTodosError } from '~/app/store/todosSlice';
import { Todo } from '~/shared/types/todoTypes';




const TodoAppDemo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const status = useSelector(selectTodosStatus);
  const error = useSelector(selectTodosError);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id: number; title: string } | null>(null);

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    console.log(status);
    console.log(status)

    if (status === 'idle') {
      getAllTodos().then((response) => {        
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        }      });
    }
    console.log(status)

  }, [status]);
  
  // Функция для добавления новой задачи
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      createTodo({ title: newTodo, completed: false, userId: 1 }).then((response) => {
        dispatch({ type: 'todos/addTodo/fulfilled', payload: response.data });
      });
      setNewTodo('');
    }
  };

  // Функция для обновления задачи
  const handleUpdateTodo = () => {
    if (editTodo && editTodo.title.trim()) {
      updateTodoById({ id: editTodo.id, title: editTodo.title, completed: false, userId: 1 }).then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === response.data.id ? response.data : todo))
        );      
      });
      setEditTodo(null);
    }
  };

  // Функция для удаления задачи
  const handleDeleteTodo = (id: number) => {
    deleteTodoById(id).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

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