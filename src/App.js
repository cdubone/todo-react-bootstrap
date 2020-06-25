import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo';
import Header from './components/Header'
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";

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
    getTodoDetails(TodoData[0].Id);
  };

  const getTodoDetails = id => {
    const todoList = (todoData.length === 0) ? TodoData : todoData;
    const result = todoList.find(x => x.Id === id);
    setTodoDetails(result);
  };

  const addListHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoListToAdd,
      "TodoList": []
    }
    const newArray = [...todoData, newItem];
    setTodoData(newArray);
    setTodoDetails(newItem);
    setTodoListToAdd('');
  };

  const addTodoHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoItemToAdd
    }
    const newArray = [...todoDetails.TodoList, newItem];
    todoDetails.TodoList = newArray;
    setTodoItemToAdd('');
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 200) + 100;
  }

  const handleDoubleClick = () => {
    console.log('double click');
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
          <div className="list-group col-sm-4 offset-sm-1">
            {todoData.map(todos => (
              <button
                key={todos.Id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={() => getTodoDetails(todos.Id)}
                onDoubleClick={handleDoubleClick}
              >
                {todos.Title}
                <span className="badge badge-primary badge-pill">
                  {todos.TodoList.length}
                </span>
              </button>
            ))}
            <TextInput
              onSubmit={addListHandler}
              placeholder="Add New List"
              value={todoListToAdd}
              onChange={updateAddList} />
          </div>
          <div className="col-sm-6">
            {todoDetails && (
              <ul className="list-group">
                <h2>{todoDetails.Title} List</h2>
                {todoDetails.TodoList.map(details => (

                  <TodoItem
                    key={details.Id} //not a prop
                    id={details.Id}
                    name={details.Id}
                    value={details.Title}
                    htmlFor={details.Id}
                    label={details.Title}
                    isChecked={details.isChecked} />

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
