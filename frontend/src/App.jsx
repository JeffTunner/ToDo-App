import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeaderBackground from './features/todo/components/HeaderBackground'
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";
import TodoItem from './features/todo/components/TodoItem';
import { getTodos, createTodo, completeTodo, deleteTodo } from "./api/api";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  },[isDark]);

  async function handleAddTodo() {
    if(input.trim() === "") return;
    const newTodo = await createTodo(input);
    setTodos(prev => [...prev, newTodo]);
    setInput("");
  }

  async function handleCompleted(id) {
    const updated = await handleCompleted(id);
    setTodos(prev => prev.map(todo => 
      todo.id == id ? updated : todo
    ));
  }

  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const textPrimary = isDark ? "text-gray-200" : "text-gray-700";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const filteredTodos = todos.filter(todo => {
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true;
  });

  const filterStyle = (value) => filter === value ? "text-blue-500" : textMuted;

  function clearCompleted() {
    return setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function handleDragEnd(event) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setTodos((prev) => {
    const oldIndex = prev.findIndex((t) => t.id === active.id);
    const newIndex = prev.findIndex((t) => t.id === over.id);
    return arrayMove(prev, oldIndex, newIndex);
  });

  async function handleDelete(id) {
  await deleteTodo(id);

  setTodos(prev => prev.filter(todo => todo.id !== id));
}
}

  return (
    <>
     <main className={`relative min-h-screen ${isDark ? "bg-black" : "bg-gray-100"}`}>
      <div className="absolute top-0 left-0 w-full">
        <HeaderBackground isDark={isDark} />
      </div>
      <div className="relative z-10 flex flex-col items-center pt-20">

        <div className="w-full max-w-md flex justify-between items-center text-white">
          <h1 className="text-3xl tracking-[10px] font-bold">TODO</h1>
          <button onClick={() => setIsDark(prev => !prev)} className='cursor-pointer'>
            <img src={isDark ? sunIcon : moonIcon} />
          </button>
        </div>

        <div className={`w-full max-w-md ${cardBg} rounded-md p-4 mt-8 shadow-lg flex gap-2.5`}>
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${isDark ? "border-gray-600" : "border-gray-300"}`}>
          </div>
          <input type="text" placeholder='Create a new todo...' className={`w-full bg-transparent outline-none ${textPrimary}`} value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleAddTodo() : null}/>
        </div>

        <div className={`w-full max-w-md ${cardBg} rounded-md mt-4 shadow-lg divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
          {filteredTodos.length === 0 && (
            <div className={`px-4 py-6 text-center ${textMuted}`}>
              No todos found
            </div>
          )}
          
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={filteredTodos.map(todo => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleCompleted}
                  onDelete={handleDelete}
                  isDark={isDark}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className={`flex justify-between px-4 py-3 text-sm ${textMuted}`}>
          <span>{activeTodos} items left</span>
          <div className="flex gap-4 hidden sm:flex">
            <button onClick={() => setFilter("all")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("all")}`}>All</button>
            <button onClick={() => setFilter("active")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("active")}`}>Active</button>
            <button onClick={() => setFilter("completed")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("completed")}`}>Completed</button>
          </div>
          <button onClick={clearCompleted} className='cursor-pointer hover:text-blue-500 transition-colors'>Clear Completed</button>
        </div>
        </div>
        <div className={`sm:hidden mt-4 ${cardBg} rounded-md w-full max-w-md shadow-lg py-3 flex justify-center gap-6 ${textMuted}`}>
            <button onClick={() => setFilter("all")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("all")}`}>All</button>
            <button onClick={() => setFilter("active")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("active")}`}>Active</button>
            <button onClick={() => setFilter("completed")} className={`cursor-pointer hover:text-blue-500 transition-colors ${filterStyle("completed")}`}>Completed</button>
        </div>

      </div>
     </main>
    </>
  )
}

export default App
