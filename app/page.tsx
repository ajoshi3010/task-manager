'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('/api/tasks').then((response) => setTasks(response.data));
  }, []);

  // Handle delete task
  const handleDelete = async (id: number) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle select task (for details and editing)
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(false);
  };

  // Handle add/edit task
  const handleSaveTask = async (task: Partial<Task>) => {
    if (isEditing && selectedTask) {
      const updatedTask = await axios.put(`/api/tasks/${selectedTask.id}`, task);
      setTasks(tasks.map((t) => (t.id === updatedTask.data.id ? updatedTask.data : t)));
    } else {
      const newTask = await axios.post('/api/tasks', task);
      setTasks([...tasks, newTask.data]);
    }
    setIsEditing(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-10">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Task Manager</h1>
      <div className="grid grid-cols-3 gap-8">
        <TaskList tasks={tasks} onDelete={handleDelete} onSelectTask={handleSelectTask} />
        <div className="col-span-2">
          {selectedTask ? (
            isEditing ? (
              <TaskForm task={selectedTask} onSave={handleSaveTask} />
            ) : (
              <TaskDetails task={selectedTask} onEdit={() => setIsEditing(true)} />
            )
          ) : (
            <TaskForm onSave={handleSaveTask} />
          )}
        </div>
      </div>
    </div>
  );
}
