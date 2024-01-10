import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'

function App() {
  const [todos, setTodos] = useState([{
    name: "Hike",
    description: "Walk around in the woods.",
    id: nanoid(),
    completed: false,
  }])

  const handleRemoveTodo = (e) => {
    setTodos((prev) => [prev.filter(todo => todo !== e.target.id)])
  }
  
  const ConfigureTodos = () => {
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
    const [newTodo, setNewTodo] = useState({
      name: "",
      description: "",
      id: nanoid(),
      completed: false,
    })
    return (
      <div className="configureTodos">
        <form onSubmit={handleNewTodo}>
        <button type="submit"> Add New Todo:</button>
        <div key="firstDiv" className="inputName">
        <input name="inputName" autoFocus key="inputName" value={newTodo.name} onChange={(e) => handleNameChange(e)} type="text" placeholder="Your New Todo's Header..."></input>
        </div>
        <div key="secondDiv" className="inputName">
        <input name="inputDescription" autoFocus key="inputDescription" value={newTodo.description} onChange={(e) => handleDescriptionChange(e)} type="text" placeholder="Your New Todo's Description..."></input>
        </div>
        </form>
      </div>
    )
  }

  const Todos = () => {
    if (todos.length >= 1) {
      return (
        todos.map(todo => <div key={todo.id} className="todoItem">
          <div>{todo.name}</div>
          <div>{todo.description}</div>
          <button onClick={handleRemoveTodo}>Remove Todo</button>
          <button>Cross Over Todo</button>
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
