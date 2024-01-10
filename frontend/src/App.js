import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import './main.css';


function App() {
  const [todos, setTodos] = useState([{
    name: "Hike",
    description: "Walk around in the woods.",
    id: nanoid(),
    completed: false,
  }])

  const handleRemoveTodo = (id) => {
    setTodos((prev) => (prev.filter(todo => todo.id !== id)))
  }

  const handleCrossOrUncross = (id) => {
    setTodos((prev) => {
      const newTodos = prev.map(todo => todo.id !== id ? todo : {...todo, completed: !todo.completed})
      return newTodos
    })
  }
  
  const ConfigureTodos = () => {
    const [newTodo, setNewTodo] = useState({
      name: "",
      description: "",
      id: nanoid(),
      completed: false,
    })

    const handleNewTodo = (e) => {
      e.preventDefault()
      setTodos((prev) =>( [...prev, newTodo]))
    }

    const handleNameChange = (e) => {
      setNewTodo((prev) => ({...prev, name: e.target.value}))
    }
  
    const handleDescriptionChange = (e) => {
      setNewTodo((prev) => ({...prev, description: e.target.value}))
    }

    const deleteAllTodos = () => {
      let confirmedDeleteTodos = false
      if (todos.length > 0) {confirmedDeleteTodos = window.confirm("Are you sure you want to delete all todos?")}
      
      setTodos((prev) => {
        if (confirmedDeleteTodos) return []
        else return prev
      })
    }

    return (
      <div className="configureTodos">
        <form onSubmit={handleNewTodo}>
        <button className="addNewTodo" type="submit"> Add New Todo</button>
        <div key="firstDiv" className="inputName">
        <input name="inputName" autoFocus key="inputName" value={newTodo.name} onChange={(e) => handleNameChange(e)} type="text" placeholder="New Todo's Name..."></input>
        </div>
        <div key="secondDiv" className="inputName">
        <textarea className="inputDescription" key="inputDescription" value={newTodo.description} onChange={(e) => handleDescriptionChange(e)} placeholder="New Todo's Description..."></textarea>
        </div>
        </form>
        <button className="deleteAllTodos" onClick={() => deleteAllTodos()}> DELETE ALL TODOS</button>
      </div>
    )
  }

  const Todos = () => {
    if (todos.length >= 1) {
      return (
        todos.map(todo => <div key={todo.id} className="todoItem">
          <div style={todo.completed ? {textDecoration:"line-through"} : {textDecoration:"none"}} className="todoName">{todo.name}</div>
          <div style={todo.completed ? {textDecoration:"line-through"} : {textDecoration:"none"}} className="todoDescription">{todo.description}</div>
          <button className="removeTodo" onClick={() => handleRemoveTodo(todo.id)}>Remove Todo</button>
          <button className="crossOutOrUncross" onClick={() => handleCrossOrUncross(todo.id)}>Cross Out / Un-cross</button>
        </div>
        )
      )
    } else {
      return ""
    }
  }

  return (
    <div className="App">
      <ConfigureTodos />
      <h1>Todos</h1>
      <Todos />
    </div>
  );
}

export default App;
