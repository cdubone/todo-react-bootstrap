import React from 'react';
import { PencilIcon, XIcon } from '@primer/octicons-react';
import TextEdit from "./TextEdit";
// import PropTypes from "prop-types";

function TodoListItem(props) {

    let wrapperClass = "list-group-item list-group-item-action";
    if (props.selected === true) {
        wrapperClass += " selected";
    }

    return (
        <li className={wrapperClass}>
            <div className='padded-content' onClick={props.onClick}>
                {props.title}
                <span className="badge badge-primary badge-pill">
                    {props.length}
                </span>
            </div>
            <div className='modify-todo'>
                <button onClick={props.editClick}><PencilIcon size={16} /></button>
                <button onClick={props.deleteClick} data-parent={props.id}><XIcon size={16} /></button>
            </div>
            <TextEdit
                editorOpen={props.editorOpen}
                updateForm={props.updateForm}
                saveEdit={props.saveEdit}
                id={props.id}
                value={props.value}
                closeEditClick={props.closeEditClick} />
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