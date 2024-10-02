import logo from './logo.svg';
import './App.css';
import {User} from './User.js';
import {Planet} from './Planet.js';
import {Task} from './Task.js';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useEffect, useState, createContext } from 'react';
import Axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Home } from './pages/Home.js';
import { Menu } from './pages/Menu.js';
import { Contact } from './pages/Contact2.js';
import { Navbar } from './Navbar.js';

export const AppContext = createContext();
function App() {
  const [username, setUsername] = useState("empty");
  const[excuse, setExcuse] = useState("0");
  const fetchExcuse = (category) => {    
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}/`).then(
      (res) => 
        {setExcuse(res.data[0].excuse);
        }
    );
  };
  const [pname,setPname] = useState("");
  const [page, setPage] = useState(0);
  const fetchData = () => {
    Axios.get(`https://api.agify.io/?name=${pname}`).then( res => {
      // console.log(res.data);
      setPage(res.data.age);
    } );
  };

  const [inputValue, setInputValue] = useState("");
  const [ageVar, setAgeVar]= useState(0);
  const [showText, setShowText] = useState(true);
  const [textColor, setTextColor] = useState("blue");
  const increase = () => {
    setAgeVar(ageVar+1);
    console.log(ageVar);
  };
  const [count, setCount] = useState(0);

  const age = 17;
  const isGreen = true;
  const names =["name 1", "name 2", "names 3"];
  const users =[{name: "name 1", age:23}, {name: "name 2", age:25}, {name: "names 3", age:32}];
  const planets =[
    {name:"Mars", isGasPlanet:false},
    {name:"Earth", isGasPlanet:false},
    {name:"Jupiter", isGasPlanet:true},
    {name:"Venus", isGasPlanet:false},
    {name:"Neptune", isGasPlanet:true},
    {name:"Uranus", isGasPlanet:true},
  ];
  const handleInputChange = (event)  => {
    setInputValue(event.target.value);

  };

  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [complete, setComplete] = useState(false);
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };
  const addTask = () => {
    const task = {
      id: todoList.length == 0 ? 1: todoList[todoList.length - 1].id + 1,
      name:newTask,
      completed:false,
    };
    setTodoList([...todoList, task]);

  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => {
      return !(task.id===id);
    }))
    
  };

  const completeTask = (id) => {
    setTodoList( 
      todoList.map((task) => {
        if(task.id === id) {
          return {...task, completed:true};
        }else
          return task;
      })
    )
  }
  const [catFact, setcatFact] = useState("");

  fetch("https://catfact.ninja/fact")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
    });
    const fetchCatFact = () => {
      Axios.get("https://catfact.ninja/fact").then((res) => {setcatFact(res.data.fact);});
    }
    useEffect( () => {fetchCatFact();}, []);
  return (
    <div className="App">
    <AppContext.Provider value={{username, setUsername}}>
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>}/>
        </Routes>
      </Router>
      </AppContext.Provider>

      <h1>Generate An excuse</h1>
      <button onClick={() => fetchExcuse("party")}>Party</button>
      <button onClick={() => fetchExcuse("family")}>Family</button>
      <button onClick={() => fetchExcuse("office")}>Office</button>
      <p >
        excuse: {excuse}
      </p>
      <input placeholder='a name' onChange={ (event) => setPname(event.target.value)}></input>
      <button onClick={fetchData}> Predict age</button>
      <h1> Predicted age: {page}</h1>
      <div>
        <button onClick={fetchCatFact}> get cat info </button>
        <p>{catFact}

        </p>

      </div>

      <div className='addTask'>
        <input onChange={handleChange}/>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='list'>
        {todoList.map((task) => {return <Task name={task.name} id = {task.id} completed = {task.completed} 
        completeTask = {completeTask} deleteTask = {deleteTask}/>})}
      </div>
      <div>
        <button onClick={() => {setCount(count+1);}}>IncreaseNum</button>
        <button onClick={() => {setCount(count-1);}}>DecreaseNum</button>
        <button onClick={() => {setCount(0);}}>Set to Zero</button>
        {count}
      </div>
      <button onClick={() => {setShowText(!showText);}}>show/hide</button>
      {showText && <h1 style={{color:textColor}}>My name is Qi</h1>}
      <button onClick={() => {setTextColor(textColor=="blue"?"red":"blue");}}>Toggle Color</button>
  <div><input type="text" onChange={handleInputChange}/>{inputValue}</div>
      Hello {ageVar}
      <button onClick={increase}>increase by one</button>
    {/* 
      <h2 className='name'>Xinjian</h2>
      <h1 style={{color: isGreen?"green":"red"}}>This line has color</h1>
      {isGreen && <button> This is a button</button>}
      <Job salary={9000} position="SDE" company="Amazon"/>
    */}
      {planets.map((planet,index) => {
        if(planet.isGasPlanet)
          return <Planet name = {planet.name}/>;
      })}
      {names.map((value,index) => {
        return <h1 key={index}>{value}</h1>;
      })
      }
      {
        users.map((user,index) => {
          return <User name = {user.name} age = {user.age}/>;

        })
      }

    </div>
  );
}

const Job = (props) => {
  return (
    <div>
      <h1>{props.salary}</h1>
      <h1>{props.position}</h1>
      <h1>{props.company}</h1>
    </div>
  );
}
export default App;
