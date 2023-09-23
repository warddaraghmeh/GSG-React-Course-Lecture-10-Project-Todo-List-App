import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState( );
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function completeTask(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function editTask(taskId, newText) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
  }

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="add-task"
          type="text"
          placeholder="Add a new task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" className="add-button" onClick={addTask}>
          Add Task
        </button>
      </form>

      <div className="todo">
        {tasks.map((task) => (
          <div key={task.id} className="todo-item">
            <div className="todo-text">
              <input
                className="checkbox"
                type="checkbox"
                id={`isCompleted${task.id}`}
                checked={task.completed}
                onChange={() => completeTask(task.id)}
              />
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
              ) : (
                <label htmlFor={`isCompleted${task.id}`}>
                  {task.completed ? (
                    <del>{task.text}</del>
                  ) : (
                    <span>{task.text}</span>
                  )}
                </label>
              )}
            </div>
            <div className="todo-actions">
              {editTaskId === task.id ? (
                <>
                  <button
                    className="submit-edits"
                    onClick={() => editTask(task.id, editedTaskText)}
                  >
                    Save
                  </button>
                  <button
                    className="submit-edits"
                    onClick={() => setEditTaskId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="submit-edits"
                  onClick={() => setEditTaskId(task.id)}
                >
                  Edit
                </button>
              )}
              <button
                className="submit-edits"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
