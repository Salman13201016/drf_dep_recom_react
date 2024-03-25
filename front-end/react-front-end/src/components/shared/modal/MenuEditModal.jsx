import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const MenuEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  editValue,
  id,
  confirmEdit,
  fieldName,
  handleChange,
}) => {

  

  


  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Menu:</Form.Label>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              autoFocus
              value={editValue.menu_name}
              onChange={handleChange}
              name="menu_name"
            />
          </Form.Group>
          <Form.Label>Sub Menu:</Form.Label>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              autoFocus
              value={editValue.submenus}
              onChange={handleChange}
              name="submenu_name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MenuEditModal;
