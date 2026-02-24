
export default function TodoItem({todo, onToggle, isDark}) {
return (
    <div className="flex items-center gap-4 px-4 py-4">
      <div
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer
          ${todo.completed 
            ? "bg-gradient-to-r from-blue-400 to-purple-500 border-none"
            : isDark 
              ? "border-gray-600" 
              : "border-gray-300"
          }`}
      >
        {todo.completed && (
          <span className="text-white text-xs">✓</span>
        )}
      </div>
      <p className={`${isDark ? "text-gray-200" : "text-gray-700"} ${todo.completed ? "line-through text-gray-400" : ""}`}>
        {todo.text}
      </p>
    </div>
  );
}