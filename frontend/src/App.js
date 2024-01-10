import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'

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
      setNewTodo([])
    }

    return (
      <div className="configureTodos">
        <form onSubmit={handleNewTodo}>
        <button type="submit"> Add New Todo:</button>
        <div key="firstDiv" className="inputName">
        <input name="inputName" autoFocus key="inputName" value={newTodo.name} onChange={(e) => handleNameChange(e)} type="text" placeholder="Your New Todo's Name..."></input>
        </div>
        <div key="secondDiv" className="inputName">
        <input name="inputDescription" autoFocus key="inputDescription" value={newTodo.description} onChange={(e) => handleDescriptionChange(e)} type="text" placeholder="Your New Todo's Description..."></input>
        </div>
        </form>
        <button onClick={() => deleteAllTodos()}> DELETE ALL TODOS</button>
      </div>
    )
  }

  const Todos = () => {
    if (todos.length >= 1) {
      return (
        todos.map(todo => <div key={todo.id} className="todoItem">
          <div>{todo.name}</div>
          <div>{todo.description}</div>
          <button onClick={() => handleRemoveTodo(todo.id)}>Remove Todo</button>
          <button onClick={() => handleCrossOrUncross(todo.id)}>Cross Out / Un-cross</button>
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
      <Todos />
    </div>
  );
}

export default App;
