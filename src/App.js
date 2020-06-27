import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo';
import Header from './components/Header'
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";
import TodoListItem from "./components/TodoListItem";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todoDetails, setTodoDetails] = useState(null);
  const [todoListToAdd, setTodoListToAdd] = useState('');
  const [todoItemToAdd, setTodoItemToAdd] = useState('');

  useEffect(() => {
    getTodoData();
  }, []);

  const getTodoData = () => {
    setTodoData(TodoData);
    setTodoDetails(TodoData[0]);
  };

  const addListHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoListToAdd,
      "TodoList": []
    };
    const newArray = [...todoData, newItem];
    setTodoData(newArray);
    setTodoDetails(newItem);
    setTodoListToAdd('');
  };

  const addTodoHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoItemToAdd,
      "IsChecked": false
    };
    const newArray = [...todoDetails.TodoList, newItem];
    todoDetails.TodoList = newArray;
    setTodoItemToAdd('');
  };

  const updateChecked = e => {
    const id = Number(e.target.id);
    const selected = todoDetails.TodoList.find(x => x.Id === id);
    selected.IsChecked = !selected.IsChecked;
    console.log(selected);
  };

  const deleteTodo = (todo) => {
    const newArray = todoDetails.TodoList.filter(x => x !== todo)
    console.log(newArray);
    todoDetails.TodoList = newArray;
    setTodoDetails(todoDetails);
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 200) + 100;
  };

  const updateAddList = e => {
    setTodoListToAdd(e.target.value);
  };

  const updateAddTodo = e => {
    setTodoItemToAdd(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="row">
          <ul className="list-group col-sm-4 offset-sm-1">
            {todoData.map(todo => (
              <TodoListItem key={todo.Id}//Not a prop
                onClick={() => setTodoDetails(todo)}
                title={todo.Title}
                length={todo.TodoList.length} />
            ))}
            <TextInput
              onSubmit={addListHandler}
              placeholder="Add New List"
              value={todoListToAdd}
              onChange={updateAddList} />
          </ul>
          <div className="col-sm-6">
            {todoDetails && (
              <ul className="list-group">
                <h2>{todoDetails.Title} List</h2>
                {todoDetails.TodoList.map(todo => (
                  <TodoItem key={todo.Id} //not a prop
                    id={todo.Id}
                    title={todo.Title}
                    isChecked={todo.IsChecked}
                    onChange={updateChecked}
                    deleteClick={() => deleteTodo(todo)} />
                ))}
              </ul>
            )}
            <TextInput
              onSubmit={addTodoHandler}
              placeholder="Add New Todo"
              value={todoItemToAdd}
              onChange={updateAddTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;