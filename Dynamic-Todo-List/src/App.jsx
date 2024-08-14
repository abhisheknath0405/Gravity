import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
  });

  return (
    <div className="Todo">
      <div className="TodoApp">
        <h1>Todo App</h1>
        <AddTodo
          newTodo={newTodo}
          handleAddTodo={handleAddTodo}
          setNewTodo={setNewTodo}
        />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <TodoList
          todos={filteredTodos}
          handleToggleCompleted={handleToggleCompleted}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

function AddTodo({ newTodo, handleAddTodo, setNewTodo }) {
  return (
    <form onSubmit={handleAddTodo} className="add-todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
        className="add-todo-input"
      />
      <button type="submit" className="add-todo-btn">
        Add
      </button>
    </form>
  );
}

function Filter({ filter, handleFilterChange }) {
  return (
    <select
      value={filter}
      onChange={handleFilterChange}
      className="filter-select"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  );
}

function TodoList({ todos, handleToggleCompleted, handleDeleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          handleToggleCompleted={() => handleToggleCompleted(index)}
          handleDeleteTodo={() => handleDeleteTodo(index)}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, handleToggleCompleted, handleDeleteTodo }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleCompleted}
        className="todo-checkbox"
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        className="todo-text"
      >
        {todo.text}
      </span>
      <button onClick={handleDeleteTodo} className="todo-delete-btn">
        Delete
      </button>
    </li>
  );
}

export default App;
