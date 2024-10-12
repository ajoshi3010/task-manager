import { Task } from '../page';
import axios from 'axios';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSelectTask: (task: Task) => void;
  onToggleComplete: (id: number, completed: boolean) => void; // New prop for toggling completion status
}

// Helper function to truncate the task description
const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

export default function TaskList({ tasks, onDelete, onSelectTask, onToggleComplete }: TaskListProps) {
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
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox to mark task as done */}
              <input
                type="checkbox"
                checked={task.completed} // Set checkbox based on task completion status
                className="h-6 w-6 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
                onChange={async (e) => {
                  const completed = e.target.checked; // Get new completed status
                  await onToggleComplete(task.id, completed); // Update completion status
                }}
              />

              {/* Task Title with Strikethrough if completed */}
              <p
                className={`font-semibold transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'}`}
                onClick={() => onSelectTask(task)}
              >
                {task.title}
              </p>
            </div>

            {/* Remove text for completed tasks */}
            {task.completed ? (
              <p
                className="text-red-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selection when Remove text is clicked
                  onDelete(task.id); // Trigger delete
                }}
              >
                Remove
              </p>
            ) : (
              <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 truncate">
                {truncateText(task.description, 20)} {/* Limit description to 20 characters */}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
