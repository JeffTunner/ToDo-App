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

  return (
    <>
     <main className={`relative min-h-screen ${isDark ? "bg-black" : "bg-white"}`}>
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

        <div className="w-full max-w-md bg-white rounded-md p-4 mt-8 shadow-lg flex gap-2.5">
          <input type="checkbox" name="completed" />
          <input type="text" placeholder='Create a new todo...' className='w-full bg-transparent outline-none' value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleAddTodo() : null}/>
        </div>

        <div className="w-full max-w-md bg-white rounded-md mt-4 shadow-lg divide-y">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleCompleted} />
          ))}
        </div>

        <div className="flex justify-between px-4 py-3 text-sm text-gray-500">
          <span>{todos.length} items left</span>
          <div className="flex gap-4">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <button>Clear Completed</button>
        </div>

      </div>
     </main>
    </>
  )
}

export default App
