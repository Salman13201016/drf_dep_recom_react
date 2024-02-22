import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const DistrictEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  editValue,
  handleChange,
  confirmEdit,
  fieldName,
  allDivision
}) => {
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>District:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.name}
              onChange={handleChange}
              name={fieldName}
            />
            {/* <Form.Label>Select a division:</Form.Label> */}
            {/* <Form.Select onChange={handleChange} name="division">
              <option value="">Select</option>
              {allDivision.map((singleDivision) => (
                <option key={singleDivision.id} value={singleDivision.id}>
                  {singleDivision.name}
                </option>
              ))}
            </Form.Select> */}
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

export default DistrictEditModal;
