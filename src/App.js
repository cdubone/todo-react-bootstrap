import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo';
import Header from './components/Header'
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";
import TodoListItem from "./components/TodoListItem";
import { PencilIcon, XIcon } from '@primer/octicons-react';

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
      "Title": todoItemToAdd,
      "IsChecked": false
    }
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

  const deleteTodo = e => {
    const id = Number(e.currentTarget.dataset.parent);
    const newArray = todoDetails.TodoList.filter(x => x.Id !== id)
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
            {todoData.map(todos => (
              <TodoListItem
                key={todos.Id}//Not a prop
                onClick={() => getTodoDetails(todos.Id)}
                title={todos.Title}
                length={todos.TodoList.length} />
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
                {todoDetails.TodoList.map(details => (
                  <TodoItem
                    key={details.Id} //not a prop
                    id={details.Id}
                    name={details.Id}
                    value={details.Title}
                    htmlFor={details.Id}
                    label={details.Title}
                    isChecked={details.IsChecked}
                    onChange={updateChecked}
                    deleteClick={deleteTodo} />
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