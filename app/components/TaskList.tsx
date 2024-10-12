import { Task } from '../page';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSelectTask: (task: Task) => void;
}

// Helper function to truncate the task description
const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

export default function TaskList({ tasks, onDelete, onSelectTask }: TaskListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 overflow-y-auto h-96">
      {/* Gradient Header */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
        All Tasks
      </h2>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-3 mb-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer transition-all duration-300"
            onClick={() => onSelectTask(task)}
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox to mark task as done */}
              <input
                type="checkbox"
                className="h-6 w-6 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selection when checkbox is clicked
                  onDelete(task.id); // Mark task as done
                }}
              />

              {/* Task Title */}
              <p className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text transition-all duration-300 hover:underline">
                {task.title}
              </p>
            </div>

            {/* Truncated Task Description */}
            <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 truncate">
              {truncateText(task.description, 20)} {/* Limit description to 20 characters */}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
