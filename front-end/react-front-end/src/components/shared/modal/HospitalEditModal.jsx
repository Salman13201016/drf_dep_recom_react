import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const HospitalEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  hospitalInfo,
  id,
  handleChange,
  handleEditSubmit
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
              value={hospitalInfo.name}
              onChange={handleChange}
            />
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              autoFocus
              value={hospitalInfo.address}
              onChange={handleChange}
            />
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              name="zip_code"
              autoFocus
              value={hospitalInfo.zip_code}
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

export default HospitalEditModal;
