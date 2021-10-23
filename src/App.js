
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const[users, setUsers] = useState([])       // 1 import api

  const nameRef = useRef() ;        // 4 use dynamic reffernce
  const emailRef = useRef();

  useEffect( ()=> {
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data =>setUsers(data));
  } ,[])


    const handleAddUser =e=>{
      const name = nameRef.current.value;     // 3 send data
      const email = emailRef.current.value;
      const newUser = {name : name, email: email}

      // send data to the server using POST
      fetch('http://localhost:5000/users', {  // 4 fetch for POST 
        method : 'post',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(newUser)
      })          
      .then (res =>res.json())        // 5 add and show data to UI
      .then (data => {
        console.log(data);
        const addedUser = data ;
        const newUsers = [...users, addedUser] // (all users copied and paste into newUsers)
        setUsers(newUsers);

        // empty input fields         // 5 
        nameRef.current.value = '' ;
        emailRef.current.value = '' ;
      })
      

        e.preventDefault()
    }


  return (
    <div className="App">
      <h2> found users : {users.length}</h2>  {/*  // 2 show api  */}



    <form onSubmit={handleAddUser}>   {/* 3 send data to server */}
    <input type="text" ref={nameRef} placeholder="name" />
    <input type="email" name="" ref={emailRef} id="" placeholder="email" />
    <input type="submit" value="submit" />
    </form>


    <ul>
      {
        users.map(user => <li key={user.id}> {user.id} : {user.name} -- {user.email} </li>)
      }
    </ul>
    
    </div>
  );
}

export default App;
