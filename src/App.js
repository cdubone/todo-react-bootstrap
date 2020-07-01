import React, { useState } from 'react';
import './styles/App.scss';
import TodoData from './data/Todo';
import Header from './components/Header'
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";
import TodoListItem from "./components/TodoListItem";

function App() {
  const [todoData, setTodoData] = useState(TodoData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [activeTodoList, setActiveTodoList] = useState(null);
  const [todoListFormValue, setTodoListFormValue] = useState('');
  const [todoListEditorToOpen, setTodoListEditorToOpen] = useState('');
  const [todoListToAdd, setTodoListToAdd] = useState('');
  const [todoItemToAdd, setTodoItemToAdd] = useState('');

  const addSelectedIndex = index => {
    setSelectedIndex(index);
  };


  const addTodoList = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoListToAdd,
      "TodoList": []
    };
    const newArray = [...todoData, newItem];
    setTodoData(newArray);
    // setActiveTodoList(newItem);
    setTodoListToAdd('');
  };

  const deleteTodoList = (todolist) => {
    const newArray = todoData.filter(x => x !== todolist);
    setTodoData(newArray);
    // setActiveTodoList(newArray[0]);
  };

  const saveEditTodoListTitle = (e) => {
    e.preventDefault();
    const id = Number(e.currentTarget.dataset.id);
    const result = todoData.find(x => x.Id === id);
    result.Title = todoListFormValue;
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
    console.log(newItem);
    // const newArray = [...activeTodoList.TodoList, newItem];
    // activeTodoList.TodoList = newArray;
    // setTodoItemToAdd('');
  };

  const updateChecked = todoItem => {
    setTodoData(prev =>
      prev.map((list, listIndex) => {
        if (listIndex !== selectedIndex) return list;

        return {
          ...list,
          TodoList: list.TodoList.map(todo => {
            if (todo.Id !== todoItem.Id) return todo;
            return {
              ...todo,
              IsChecked: !todo.IsChecked,
            };
          }),
        };
      }),
    );
  };

  const deleteTodo = (todo) => {
    // const newArray = activeTodoList.TodoList.filter(x => x !== todo);
    // activeTodoList.TodoList = newArray;
    // setActiveTodoList(activeTodoList);
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
            {todoData.map((todo, todoIndex) => (
              <TodoListItem key={todo.Id}//Not a prop
                onClick={() => addSelectedIndex(todoIndex)}
                title={todo.Title}
                length={todo.TodoList.length}
                // selected={activeTodoList.Id === todo.Id}
                deleteClick={() => deleteTodoList(todo)}
                editClick={() => openTodoListTitleEditor(todo)}
                saveEdit={saveEditTodoListTitle}
                closeEditClick={() => closeTodoListTitleEditor()}
                editorOpen={todoListEditorToOpen === todo.Id}
                updateForm={updateEditTodoList}
                value={todoListFormValue}
                id={todo.Id} />
            ))}
            <TextInput
              onSubmit={addTodoList}
              placeholder="Add New List"
              value={todoListToAdd}
              onChange={updateAddList} />
          </ul>
          <div className="col-sm-6">
            {todoData[selectedIndex] && (
              <React.Fragment>
                <h2>{todoData[selectedIndex].Title} List</h2>
                <ul className="list-group">
                  {todoData[selectedIndex].TodoList.map((todoItem, todoItemIndex) => (
                    <TodoItem key={todoItem.Id} //not a prop
                      id={todoItem.Id}
                      title={todoItem.Title}
                      onChange={() => updateChecked(todoItem, todoItemIndex)}
                      isChecked={todoItem.IsChecked}
                      deleteClick={() => deleteTodo(todoItem)} />
                  ))}
                </ul>
              </React.Fragment>
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