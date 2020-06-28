import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo';
import Header from './components/Header'
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";
import TodoListItem from "./components/TodoListItem";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [activeTodoList, setActiveTodoList] = useState(null);
  const [todoListFormValue, setTodoListFormValue] = useState('');
  const [todoListEditorToOpen, setTodoListEditorToOpen] = useState('');
  const [todoListToAdd, setTodoListToAdd] = useState('');
  const [todoItemToAdd, setTodoItemToAdd] = useState('');

  useEffect(() => {
    setTodoData(TodoData);
    setActiveTodoList(TodoData[0]);
  }, []);

  const addTodoList = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoListToAdd,
      "TodoList": []
    };
    const newArray = [...todoData, newItem];
    setTodoData(newArray);
    setActiveTodoList(newItem);
    setTodoListToAdd('');
  };

  const deleteTodoList = (todolist) => {
    const newArray = todoData.filter(x => x !== todolist);
    setTodoData(newArray);
    console.log(newArray);
    setActiveTodoList(newArray[0]);
  };

  const saveEditTodoListTitle = (todo) => {
    todo.Title = todoListFormValue;
    console.log(todoListFormValue);
    closeTodoListTitleEditor();
  };

  const openTodoListTitleEditor = (todo) => {
    setTodoListEditorToOpen(todo.Id);
    setTodoListFormValue(todo.Title);
  };

  const closeTodoListTitleEditor = () => {
    setTodoListEditorToOpen('');
  };

  const addTodoHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoItemToAdd,
      "IsChecked": false
    };
    const newArray = [...activeTodoList.TodoList, newItem];
    activeTodoList.TodoList = newArray;
    setTodoItemToAdd('');
  };

  const updateChecked = todo => {
    todo.IsChecked = !todo.IsChecked;
  };

  const deleteTodo = (todo) => {
    const newArray = activeTodoList.TodoList.filter(x => x !== todo);
    console.log(newArray);
    activeTodoList.TodoList = newArray;
    setActiveTodoList(activeTodoList);
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 200) + 100;
  };

  const updateEditTodoList = e => {
    setTodoListFormValue(e.target.value);
  }

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
                onClick={() => setActiveTodoList(todo)}
                title={todo.Title}
                length={todo.TodoList.length}
                selected={activeTodoList.Id === todo.Id}
                deleteClick={() => deleteTodoList(todo)}
                editClick={() => openTodoListTitleEditor(todo)}
                saveEdit={() => saveEditTodoListTitle(todo)}
                closeEditClick={() => closeTodoListTitleEditor()}
                editorOpen={todoListEditorToOpen === todo.Id}
                updateForm={updateEditTodoList}
                value={todoListFormValue} />
            ))}
            <TextInput
              onSubmit={addTodoList}
              placeholder="Add New List"
              value={todoListToAdd}
              onChange={updateAddList} />
          </ul>
          <div className="col-sm-6">
            {activeTodoList && (
              <ul className="list-group">
                <h2>{activeTodoList.Title} List</h2>
                {activeTodoList.TodoList.map(todo => (
                  <TodoItem key={todo.Id} //not a prop
                    id={todo.Id}
                    title={todo.Title}
                    isChecked={todo.IsChecked}
                    onChange={() => updateChecked(todo)}
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