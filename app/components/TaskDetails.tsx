import { Task } from '../page';

interface TaskDetailsProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskDetails({ task, onEdit }: TaskDetailsProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Task Details
      </h2>
      
      <p className="text-lg font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text transition-all duration-300 hover:underline">
        {task.title}
      </p>
      
      <p className="text-sm text-gray-700 mb-4 hover:text-gray-900 transition-colors duration-300">
        {task.description}
      </p>
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
        onClick={onEdit}
      >
        Edit Task
      </button>
    </div>
  );
}
