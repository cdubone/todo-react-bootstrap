import React from 'react';
import PropTypes from "prop-types";
import { PlusIcon } from '@primer/octicons-react';

function TextInput(props) {

    let wrapperClass = "input-group my-1";
    if (props.error.length > 0) {
        wrapperClass += " has-error";
    }

    return (
        <form className={wrapperClass} onSubmit={props.onSubmit}>
            <input className='form-control' type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <button className='btn btn-primary'><PlusIcon size={16} /></button>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </form>
    )
}

TextInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

TextInput.defaultProps = {
    error: ""
};

export default TextInput;