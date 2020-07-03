import React from 'react';
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BootstrapModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Item
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Warning: This is permanent!</h4>
                <p>Are you sure you want to delete this? If so click 'Yes'. Otherwise click cancel.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onConfirm}>Confirm</Button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BootstrapModal;