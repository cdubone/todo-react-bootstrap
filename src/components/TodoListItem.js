import React from 'react';
import { PencilIcon, XIcon, CheckIcon, ArrowLeftIcon } from '@primer/octicons-react';
// import PropTypes from "prop-types";

function TodoListItem(props) {

    let wrapperClass = "list-group-item list-group-item-action";
    if (props.selected === true) {
        wrapperClass += " selected";
    }

    return (
        <li className={wrapperClass}>
            <div onClick={props.onClick}>
                {props.title}
                <span className="badge badge-primary badge-pill">
                    {props.length}
                </span>
            </div>
            <div className='modify-todo'>
                <button onClick={props.editClick}><PencilIcon size={16} /></button>
                <button onClick={props.deleteClick}><XIcon size={16} /></button>
            </div>
            <div className={"edit-title " + (props.editorOpen ? '' : 'd-none')}>
                <input onChange={props.updateForm} type="text" value={props.value} />
                <button onClick={props.saveEdit}><CheckIcon size={16} /></button>
                <button onClick={props.closeEditClick}><ArrowLeftIcon size={16} /></button>
            </div>
        </li>
    )
}

// TodoListItem.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     error: PropTypes.string
// };

// TodoListItem.defaultProps = {
//     error: ""
// };

export default TodoListItem;