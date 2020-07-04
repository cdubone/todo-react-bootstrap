import React from 'react';
// import PropTypes from "prop-types";
import { CheckIcon, ReplyIcon } from '@primer/octicons-react';

function TextInput(props) {

    return (
        <div className={"edit-title " + (props.editorOpen ? '' : 'd-none')}>
            <form action="">
                <input onChange={props.updateForm} type="text" value={props.value} />
                <button onClick={props.saveEdit} data-id={props.id} type="submit"><CheckIcon size={16} /></button>
                <button onClick={props.closeEditClick} type="reset"><ReplyIcon size={16} /></button>
            </form>
        </div>
    )
}


export default TextInput;