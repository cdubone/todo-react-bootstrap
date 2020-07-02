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
  const [todoListFormValue, setTodoListFormValue] = useState('');
  const [todoItemListFormValue, setTodoItemListFormValue] = useState('');
  const [todoListEditorToOpen, setTodoListEditorToOpen] = useState('');
  const [todoListItemEditorToOpen, setTodoItemListEditorToOpen] = useState('');
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
    addSelectedIndex(todoData.length);
    setTodoListToAdd('');
  };

  const deleteTodoList = (todolist) => {
    const newArray = todoData.filter(x => x !== todolist);
    setTodoData(newArray);
    setSelectedIndex(0);
  };

  const saveEditTodoListTitle = (e) => {
    e.preventDefault();
    const id = Number(e.currentTarget.dataset.id);
    const result = todoData.find(x => x.Id === id);
    result.Title = todoListFormValue;
    closeTodoListTitleEditor();
  };

  const saveEditTodoItemListTitle = (e) => {
    e.preventDefault();
    const id = Number(e.currentTarget.dataset.id);
    const result = todoData[selectedIndex].TodoList.find(x => x.Id === id);
    result.Title = todoItemListFormValue;
    closeTodoItemListTitleEditor();
  };

  const openTodoListTitleEditor = (todo) => {
    setTodoListEditorToOpen(todo.Id);
    setTodoListFormValue(todo.Title);
  };

  const closeTodoListTitleEditor = () => {
    setTodoListEditorToOpen('');
  };

  const openTodoItemListTitleEditor = (todo) => {
    console.log(todo);
    setTodoItemListEditorToOpen(todo.Id);
    setTodoItemListFormValue(todo.Title);
  };

  const closeTodoItemListTitleEditor = () => {
    setTodoItemListEditorToOpen('');
  };

  const addTodoHandler = e => {
    e.preventDefault();
    const newItem = {
      "Id": randomNumber(),
      "Title": todoItemToAdd,
      "IsChecked": false
    };
    console.log(newItem);
    const newArray = [...todoData[selectedIndex].TodoList, newItem];
    todoData[selectedIndex].TodoList = newArray;
    setTodoItemToAdd('');
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
    const newArray = todoData[selectedIndex].TodoList.filter(x => x !== todo);
    console.log(newArray);
    todoData[selectedIndex].TodoList = newArray;
    // setSelectedIndex(0);
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 200) + 100;
  };

  const updateEditTodoList = e => {
    setTodoListFormValue(e.target.value);
  }

  const updateEditTodoItemList = e => {
    setTodoItemListFormValue(e.target.value);
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
          <div className="col-lg-4 offset-lg-1 col-md-5 offet-md-0">
            <ul className="list-group">
              {todoData.map((todo, todoIndex) => (
                <TodoListItem key={todo.Id}//Not a prop
                  onClick={() => addSelectedIndex(todoIndex)}
                  title={todo.Title}
                  length={todo.TodoList.length}
                  selected={todoData[selectedIndex].Id === todo.Id}
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
          </div>
          <div className="col-lg-6 col-md-7">
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
                      deleteClick={() => deleteTodo(todoItem)}
                      editorOpen={todoListItemEditorToOpen === todoItem.Id}
                      editClick={() => openTodoItemListTitleEditor(todoItem)}
                      updateForm={updateEditTodoItemList}
                      saveEdit={saveEditTodoItemListTitle}
                      closeEditClick={() => closeTodoListTitleEditor()} />
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