import React from 'react';

function TextInput(props) {
    return (
        <form className="input-group my-1" onSubmit={props.onSubmit}>
            <input className='form-control' type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <button className='btn btn-primary'>+</button>
        </form>
    )
}

// addTodoHandler
// placeholder
// todoItemToAdd
// updateAddTodo


export default TextInput;