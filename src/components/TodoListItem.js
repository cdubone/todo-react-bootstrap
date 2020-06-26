import React, { useState } from 'react';
import { PencilIcon, XIcon } from '@primer/octicons-react';
// import PropTypes from "prop-types";

function TodoListItem(props) {

    return (
        <li
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={props.onClick}
        >
            {props.title}
            <span className="badge badge-primary badge-pill">
                {props.length}
            </span>
            <div className='modify-todo'>
                <button><PencilIcon size={16} /></button><button><XIcon size={16} /></button>
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