import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const DepartmentEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  depInfo,
  handleChange,
  handleEditSubmit,
}) => {
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoFocus
              value={depInfo.name}
              onChange={handleChange}
            />
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              name="details"
              autoFocus
              value={depInfo.details}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepartmentEditModal;
