import { useState } from 'react';
import { Task } from '../page';

interface TaskFormProps {
  task?: Partial<Task>;
  onSave: (task: Partial<Task>) => void;
}

export default function TaskForm({ task, onSave }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('')
    setDescription('')
  };

  return (
    <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>

      {/* Label for Title */}
      <div className="mb-4">
        <label
          htmlFor="task-title"
          className="block text-sm font-semibold mb-1 bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text"
        >
          Task Title
        </label>
        <input
          type="text"
          id="task-title"
          title="Enter a descriptive title for the task"
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
      </div>

      {/* Label for Description */}
      <div className="mb-4">
        <label
          htmlFor="task-description"
          className="block text-sm font-semibold mb-1 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text"
        >
          Task Description
        </label>
        <textarea
          id="task-description"
          title="Provide details or steps for the task"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-black placeholder-gray-400 focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 focus:ring-2 focus:ring-green-300 transition-all duration-300"
      >
        {task ? 'Save Changes' : 'Add Task'}
      </button>
    </form>
  );
}
