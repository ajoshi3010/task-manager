import { Task } from '../page';

interface TaskDetailsProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: number) => void; // Add onDelete prop
  onBack: () => void; // Add onBack prop
}

export default function TaskDetails({ task, onEdit, onDelete, onBack }: TaskDetailsProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Task Details
      </h2>
      
      <p className="text-lg font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text transition-all duration-300 hover:underline">
        {task.title}
      </p>
      
      <p className="text-sm text-gray-700 mb-4 break-words">
        {task.description}
      </p>
      
      <div className="flex space-x-4">
        {/* Back Button to return to TaskForm */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300"
          onClick={onBack} // Call the onBack function when clicked
        >
          Back
        </button>

        {/* Edit Task Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={onEdit}
        >
          Edit Task
        </button>

        {/* Done Button to Delete Task */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
          onClick={() => onDelete(task.id)} // Trigger onDelete with task ID
        >
          Remove Task
        </button>
      </div>
    </div>
  );
}
