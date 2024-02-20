import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const SymptomEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  editValue,
  handleChange,
  confirmEdit,
}) => {
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* -------------------1--------------- */}
            <Form.Label>Symptom 1:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom1}
              onChange={handleChange}
              name={"symptom1"}
            />
            {/* -------------------2--------------- */}
            <Form.Label>Symptom 2:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom2}
              onChange={handleChange}
              name={"symptom2"}
            />
            {/* -------------------3--------------- */}
            <Form.Label>Symptom 3:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom3}
              onChange={handleChange}
              name={"symptom3"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 4:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom4}
              onChange={handleChange}
              name={"symptom3"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 5:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom5}
              onChange={handleChange}
              name={"symptom5"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 6:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom6}
              onChange={handleChange}
              name={"symptom6"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 7:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom7}
              onChange={handleChange}
              name={"symptom7"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 8:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom8}
              onChange={handleChange}
              name={"symptom8"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 9:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom9}
              onChange={handleChange}
              name={"symptom9"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 10:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom10}
              onChange={handleChange}
              name={"symptom10"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 11:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom11}
              onChange={handleChange}
              name={"symptom11"}
            />
            {/* -------------------12--------------- */}
            <Form.Label>Symptom 12:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom12}
              onChange={handleChange}
              name={"symptom12"}
            />
            {/* -------------------13--------------- */}
            <Form.Label>Symptom 13:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom13}
              onChange={handleChange}
              name={"symptom13"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 14:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom14}
              onChange={handleChange}
              name={"symptom14"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 15:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom15}
              onChange={handleChange}
              name={"symptom15"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 16:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom16}
              onChange={handleChange}
              name={"symptom16"}
            />
            {/* -------------------4--------------- */}
            <Form.Label>Symptom 17:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editValue.symptom17}
              onChange={handleChange}
              name={"symptom17"}
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

export default SymptomEditModal;
