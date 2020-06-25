import React, { useState } from 'react';
// import PropTypes from "prop-types";

function TodoItem(props) {

    // const [isChecked, setIsChecked] = useState(false);

    const handleCheck = e => {
        console.log(e.target.checked);
    };

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
                onChange={handleCheck}
                checked={props.isChecked}
            />
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