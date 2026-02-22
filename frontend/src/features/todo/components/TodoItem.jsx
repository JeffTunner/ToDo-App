
export default function TodoItem({todo, onToggle}) {
return (
    <div className="flex gap-2.5 items-center px-4 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <p className={todo.completed ? "line-through" : ""}>
        {todo.text}
      </p>
    </div>
  );
}