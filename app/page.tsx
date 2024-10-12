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
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  // Function to check if the user is logged in
  const checkLoggedIn = async () => {
    try {
      const response = await fetch('/api/auth/check'); // Check authentication status
      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setUserEmail(data.email); // Set the user's email
      } else {
        router.push('/auth'); // Redirect to the auth page if not logged in
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      router.push('/auth'); // Redirect on error
    }
  };

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks'); // Fetch tasks
      setTasks(response.data); // Set the tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle user login status and fetch tasks
  useEffect(() => {
    checkLoggedIn(); // Check login status
    fetchTasks(); // Fetch tasks
  }, []);

  // Handle delete task
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // Delete the task
      setTasks(tasks.filter((task) => task.id !== id)); // Update tasks state
      setSelectedTask(null); // Clear selected task after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle select task (for details and editing)
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(false);
  };

  // Handle add/edit task
  const handleSaveTask = async (task: Partial<Task>) => {
    try {
      if (isEditing && selectedTask) {
        const updatedTask = await axios.put(`/api/tasks/${selectedTask.id}`, task); // Update the task
        setTasks(tasks.map((t) => (t.id === updatedTask.data.id ? updatedTask.data : t))); // Update tasks state
      } else {
        const newTask = await axios.post('/api/tasks', task); // Create a new task
        setTasks([...tasks, newTask.data]); // Add new task to state
      }
      setIsEditing(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Handle marking a task as completed
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const updatedTask = await axios.put(`/api/tasks/${id}`, { completed }); // Update completion status
      // Update local state
      setTasks(tasks.map((task) => (task.id === updatedTask.data.id ? updatedTask.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      }); // Call the logout API to clear the cookie
      setUserEmail(''); // Clear the user email
      router.push('/auth'); // Redirect to the authentication page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 p-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Task Manager</h1>
        <div className="flex items-center mt-4 lg:mt-0">
          <span className="text-white mr-4">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
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
