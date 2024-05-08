import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const AddCourse = () => {
  const [show, setShow] = useState(false); // Define the show state variable
  const handleClose = () => setShow(false); // Define the handleClose function
  const handleShow = () => setShow(true); // Define the handleShow function

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddCourse;
