//  // eslint-disable-next-line
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const name = 'USA'
//   const goose = 'https://content.codecademy.com/courses/React/react_photo-goose.jpg';

//   return (
//     <div className="App">
//       {/* <header className="App-header"> */}
//        {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           WELCOME come
//         </a>
//       </header> */}
//       <h1 style={{color: "red", backgroundColor:'pink'}}>Welcome to React!</h1>
//       <h2>HELLO {name}</h2>
//       <p id="rcorners1">React is an open-source, front end, JavaScript library for building user interfaces or UI components. 
//       It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the 
//       development of single-page or mobile applications!</p>
//       <p id="rcorners2"></p>
//       <p id="rcorners3"></p>
//      <h2>table-layout: center; width: 100%:</h2>
//     <table class="c">
//       <tr>
//          <th>Company</th>
//          <th>CEO</th>
//          <th>Country</th>
//      </tr>
//      <tr>
//         <td>GOOGLE</td>
//         <td>SUNDAR PICHAI</td>
//         <td>USA</td>
//      </tr>
//      <tr>
//         <td>Facebook</td>
//         <td>MARK ZUCKERBERG</td>
//         <td>USA</td>
//      </tr>
//      <tr>
//         <td>APPLE</td>
//         <td>TIM COOK</td>
//         <td>USA</td>
//      </tr>
//     </table>
//     <button class="button">Goose</button>
//     <img src={goose} />
//     <button class="button">Button</button>
//     </div>
//   );
// }

// export default App;

import React, {useState,useRef,useEffect} from 'react';
import './App.css';
import Table1 from './pages/tables';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid';

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id) {
    const newTodos =[...todos]
    const todo= newTodos.find(todo=>todo.id===id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
   const name= todoNameRef.current.value
   if (name==='') return
   setTodos(prevTodos=>{
     return[...prevTodos,{id : uuidv1(),name: name,complete:false}]
   })
   todoNameRef.current.value= null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo=>todo.complete)
    setTodos(newTodos)
  }
  return(
    <>
     <TodoList todos={todos} toggleTodo={toggleTodo} />
     <input ref={todoNameRef} type ="text"/>
     <button onClick={handleAddTodo}>Add Todo</button>
     <button onClick={handleClearTodos}>Clear Complete</button>
     <div>{todos.filter(todo=>!todo.complete).length}left to do</div>
    </>
  )
}
export default App;