import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import './Dash.css'
export default function Dashboard() {

  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");


  const handleSignOut = () => {
    signOut(auth);
  };

// storing data 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setDarkMode(true);
  }
}, []);

// Filter
const handleToggle = (id) => {
  setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
};

  const handleAdd = () => {
    if (task.trim()) {
      setTasks([  ...tasks,{ 
        id: Date.now(),
         text: task.trim(), 
         completed: false },
      ]);
      setTask("");
    }
  };
  const handleUpdate = (id, text) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, text } : t)));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
   
  };

 
  // dark mode
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  //showing property
  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "pending"
      ? tasks.filter((t) => !t.completed)
      : tasks;

      

  return (
    <div className="min-h-screen font-serif text-gray-900 dark:text-white p-4">
      
      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl text-center text-black font-light ms-30 ">To - Do Dashboard</h1>
       
        <div className="flex gap-3">
       
        <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={handleThemeToggle} />
        <span className="slider"></span>
      </label>


          <button onClick={handleSignOut}  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white">
            Logout
          </button>
        </div>
      </div>
{/*  */}
      <div className="flex gap-2 mb-4">
        <input className="flex-1 px-3 py-2 border rounded dark:bg-gray-700" value={task} onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add new task"/>
          
        <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"  onClick={handleAdd}> ADD </button>
      </div>
{/*  */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700"
          }`}> All </button>
        
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-green-600 text-white"
              : "bg-gray-300 dark:bg-gray-700"
          }`}>   Completed </button>

        <button onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded ${
             filter === "pending"
              ? "bg-red-600 text-black"
              : "bg-gray-300 dark:bg-gray-700"
          }`}> Pending </button>

      </div>

      <ul className="space-y-3 text-black">

        {filteredTasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between p-2 border rounded dark:border-gray-700" >

            <div className="flex items-center gap-2 w-full">
            {/* going to the  completed */}
              <input type="checkbox" checked={t.completed}  onChange={() => handleToggle(t.id)}   />
              {/* updating */}
              <input type="text" value={t.text} onChange={(e) => handleUpdate(t.id, e.target.value)}
              className={`flex-1 px-2 py-1 rounded bg-transparent border-b outline-none ${
                  t.completed ? "line-through text-gray-400" : "" }`}/>
            </div>

            <button
              onClick={() => handleDelete(t.id)}
              className="text-red-500 hover:underline ml-2"> Delete </button>
          </li>
        ))}
      </ul>
    

    </div>
  );
}
