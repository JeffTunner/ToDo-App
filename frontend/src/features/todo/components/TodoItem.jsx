
export default function TodoItem({todo, onToggle, isDark}) {
return (
    <div className="flex items-center gap-4 px-4 py-4">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <p className={`${isDark ? "text-gray-200" : "text-gray-700"} ${todo.completed ? "line-through text-gray-400" : ""}`}>
        {todo.text}
      </p>
    </div>
  );
}