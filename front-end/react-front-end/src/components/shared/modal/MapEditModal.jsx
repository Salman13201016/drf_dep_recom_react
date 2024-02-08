import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const MapEditModal = ({
  isShow,
  handleClose,
  modalTitle,
  mapInfo,
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
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              name="latitude"
              autoFocus
              value={mapInfo.latitude}
              onChange={handleChange}
            />
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              name="longitude"
              autoFocus
              value={mapInfo.longitude}
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

export default MapEditModal;
