import React, { useState } from 'react';
import { PencilIcon, XIcon } from '@primer/octicons-react';
// import PropTypes from "prop-types";

function TodoItem(props) {

    // const [isChecked, setIsChecked] = useState(false);

    let wrapperClass = "list-group-item list-group-item-action";
    if (props.isChecked === true) {
        wrapperClass += " done";
    }

    return (
        <li className={wrapperClass}>
            <input
                type="checkbox"
                id={props.id}
                name={props.name}
                value={props.value}
                checked={props.isChecked}
                onChange={props.onChange}
            />
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <div className='modify-todo'>
                <button><PencilIcon size={16} /></button>
                <button data-parent={props.id} onClick={props.deleteClick}><XIcon size={16} /></button>
            </div>

        </ li>
    )
}

// TodoItem.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     error: PropTypes.string
// };

// TodoItem.defaultProps = {
//     error: ""
// };

export default TodoItem;