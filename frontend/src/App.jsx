import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeaderBackground from './features/todo/components/HeaderBackground'
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";
import TodoItem from './features/todo/components/TodoItem';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleAddTodo() {
    if(input.trim() === "") return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  }

  function handleCompleted(id) {
    setTodos(prev => prev.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    }));
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

  function clearCompleted() {
    return setTodos(prev => prev.filter(todo => !todo.completed));
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
          <input type="checkbox" name="completed" />
          <input type="text" placeholder='Create a new todo...' className={`w-full bg-transparent outline-none ${textPrimary}`} value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleAddTodo() : null}/>
        </div>

        <div className={`w-full max-w-md ${cardBg} rounded-md mt-4 shadow-lg divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleCompleted} isDark={isDark}/>
          ))}

          <div className="flex justify-between px-4 py-3 text-sm text-gray-500">
          <span>{activeTodos} items left</span>
          <div className="flex gap-4">
            <button onClick={() => setFilter("all")} className='cursor-pointer'>All</button>
            <button onClick={() => setFilter("active")} className='cursor-pointer'>Active</button>
            <button onClick={() => setFilter("completed")} className='cursor-pointer'>Completed</button>
          </div>
          <button onClick={clearCompleted} className='cursor-pointer'>Clear Completed</button>
        </div>
        </div>

      </div>
     </main>
    </>
  )
}

export default App
