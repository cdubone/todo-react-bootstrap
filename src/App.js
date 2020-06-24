import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo.js';
import Header from './components/Header.js'

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
    console.log(result);
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
      <div className="container-fluid">
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
            <form className="form-inline my-1" onSubmit={addListHandler}>
              <input className='form-control' type="text" placeholder="Add New List" value={todoListToAdd} onChange={updateAddList} />
              <button className='btn btn-primary'>+</button>
            </form>
          </div>
          <div className="col-sm-6">
            {todoDetails && (
              <ul className="list-group">
                <h2>{todoDetails.Title} List</h2>
                {todoDetails.TodoList.map(details => (
                  <li className="list-group-item list-group-item-action" key={details.Id}>
                    {details.Title}
                  </li>
                ))}
              </ul>
            )}
            <form className="form-inline my-1" onSubmit={addTodoHandler}>
              <input className='form-control' type="text" placeholder="Add New Todo" value={todoItemToAdd} onChange={updateAddTodo} />
              <button className='btn btn-primary'>+</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
