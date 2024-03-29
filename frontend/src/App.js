import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import './main.css';
import axios from "axios";



function App() {
  const [todos, setTodos] = useState([{
    name: "Hike",
    description: "Walk around in the woods.",
    id: nanoid(),
    completed: false,
  }])
  const [todoView, setTodoView] = useState("all")
  const [items, setItems] = useState([]); 

  useEffect(() => {
    axios.get("/todos")
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleRemoveTodo = (id) => {
    setTodos((prev) => (prev.filter(todo => todo.id !== id)))
  }

  const handleCrossOrUncross = (id) => {
    setTodos((prev) => {
      const newTodos = prev.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed })
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
      setTodos((prev) => ([...prev, newTodo]))
    }

    const handleNameChange = (e) => {
      setNewTodo((prev) => ({ ...prev, name: e.target.value }))
    }

    const handleDescriptionChange = (e) => {
      setNewTodo((prev) => ({ ...prev, description: e.target.value }))
    }

    const deleteAllTodos = () => {
      let confirmedDeleteTodos = false
      if (todos.length > 0) { confirmedDeleteTodos = window.confirm("Are you sure you want to delete all todos?") }

      setTodos((prev) => {
        if (confirmedDeleteTodos) return []
        else return prev
      })
    }

    return (
      <div className="configureTodos">
        <form onSubmit={handleNewTodo}>
          <button className="addNewTodo" type="submit"> ADD NEW TODO</button>
          <div key="firstDiv" className="inputName">
            <label htmlFor="inputName">Name</label>
            <br/>
            <input id="inputName" name="inputName" autoFocus key="inputName" value={newTodo.name} onChange={(e) => handleNameChange(e)} type="text" placeholder="New Todo's Name..."></input>
            
          </div>
          <div key="secondDiv" className="inputName">
            <label htmlFor="inputDescription">Description</label>
            <br/>
            <textarea id="inputDescription" className="inputDescription" key="inputDescription" value={newTodo.description} onChange={(e) => handleDescriptionChange(e)} placeholder="New Todo's Description..."></textarea>
          </div>
        </form>
        <button className="deleteAllTodos" onClick={() => deleteAllTodos()}> DELETE ALL</button>

      </div>
    )
  }

  const View = () => {
    return (
      <div className="viewOptions">
        <button style={todoView === "all" ? {backgroundColor: "yellow"} : {backgroundColor: "none"}} onClick={() => setTodoView("all")} value="all">ALL</button>
        <button style={todoView === "remaining" ? {backgroundColor: "yellow"} : {backgroundColor: "none"}} onClick={() => setTodoView("remaining")}  value="remaining">REMAINING</button>
        <button style={todoView === "completed" ? {backgroundColor: "yellow"} : {backgroundColor: "none"}} onClick={() => setTodoView("completed")}  value="completed">COMPLETED</button>
      </div>
    )
  }

  const Todos = () => {

    if (todos.length >= 1) {
      return (
        todos.filter(todo => {
          if (todoView === "all") {return true}
          else if (todoView === "remaining" && !todo.completed) return  true
          else if (todoView === "completed" && todo.completed) return  true
          else return false

        }).map(todo => <div key={todo.id} className="todoItem">
          <div style={todo.completed ? { textDecoration: "line-through" } : { textDecoration: "none" }} className="todoName">{todo.name}</div>
          <div style={todo.completed ? { textDecoration: "line-through" } : { textDecoration: "none" }} className="todoDescription">{todo.description}</div>
          <button className="removeTodo" onClick={() => handleRemoveTodo(todo.id)}>DELETE</button>
          <button className="crossOutOrUncross" onClick={() => handleCrossOrUncross(todo.id)}>{todo.completed ? "REVERSE IS COMPLETED" : "IS COMPLETED"}</button>
        </div>
        )
      )
    } 
  }

  return (
    <div className="App">
      <ConfigureTodos />
      <h1>Todos</h1>
      <View />
      <Todos />
    </div>
  );
}

export default App;
