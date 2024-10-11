'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('/api/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const deleteTask = async (id: number) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
