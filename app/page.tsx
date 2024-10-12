'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      }
    };
    fetchTasks();
  }, []);

  // Handle delete task
  const handleDelete = async (id: number) => {
    await axios.delete(`/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null); // Clear selected task after deletion
  };

  // Handle select task (for details and editing)
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(false);
  };

  // Handle add/edit task
  const handleSaveTask = async (task: Partial<Task>) => {
    if (isEditing && selectedTask) {
      const updatedTask = await axios.put(`/api/tasks/${selectedTask.id}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.map((t) => (t.id === updatedTask.data.id ? updatedTask.data : t)));
    } else {
      const newTask = await axios.post('/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks([...tasks, newTask.data]);
    }
    setIsEditing(false);
    setSelectedTask(null);
  };

  // Handle marking a task as completed
  const handleToggleComplete = async (id: number, completed: boolean) => {
    const updatedTask = await axios.put(`/api/tasks/${id}`, { completed }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Update local state
    setTasks(tasks.map((task) => (task.id === updatedTask.data.id ? updatedTask.data : task)));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    router.push('/auth'); // Redirect to the authentication page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-10 overflow-x-hidden">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Task Manager</h1>
      
      <div className="flex justify-between mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Responsive grid layout: stack TaskList below TaskForm on smaller screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Form (Will take full width on small screens) */}
        <div className="col-span-1 lg:col-span-2">
          {selectedTask ? (
            isEditing ? (
              <TaskForm task={selectedTask} onSave={handleSaveTask} />
            ) : (
              <TaskDetails task={selectedTask} onEdit={() => setIsEditing(true)} onDelete={handleDelete} onBack={() => setSelectedTask(null)} />
            )
          ) : (
            <TaskForm onSave={handleSaveTask} />
          )}
        </div>

        {/* Task List (Will move below TaskForm on small screens) */}
        <TaskList 
          tasks={tasks} 
          onDelete={handleDelete} 
          onSelectTask={handleSelectTask} 
          onToggleComplete={handleToggleComplete} // Pass the toggle function
        />
      </div>
    </div>
  );
}
