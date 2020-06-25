import React from 'react';
import PropTypes from "prop-types";

function TodoItem(props) {

    return (
        <li className="list-group-item list-group-item-action" key={props.key} >
            <input type="checkbox" id={props.id} name={props.name} value={props.value} />
            <label htmlFor={props.htmlFor}>{props.label}</label>
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