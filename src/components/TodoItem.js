import React from 'react';
import { PencilIcon, XIcon } from '@primer/octicons-react';
import TextEdit from "./TextEdit";
import PropTypes from "prop-types";

function TodoItem(props) {

    let wrapperClass = "list-group-item list-group-item-action todo-item";
    if (props.isChecked === true) {
        wrapperClass += " done";
    }

    return (
        <li className={wrapperClass}>
            <input
                type="checkbox"
                id={props.id}
                name={props.id}
                checked={props.isChecked}
                onChange={props.onChange} />
            <label className='padded-content' htmlFor={props.id}>{props.title}</label>
            <div className='modify-todo'>
                <button onClick={props.editClick} ><PencilIcon size={16} /></button>
                <button onClick={props.deleteClick} data-parent={props.id}><XIcon size={16} /></button>
            </div>
            <TextEdit
                editorOpen={props.editorOpen}
                updateForm={props.updateForm}
                saveEdit={props.saveEdit}
                id={props.id}
                value={props.title}
                closeEditClick={props.closeEditClick} />
        </ li>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    editClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired,
    error: PropTypes.string
};

// TodoItem.defaultProps = {
//     error: ""
// };

export default TodoItem;