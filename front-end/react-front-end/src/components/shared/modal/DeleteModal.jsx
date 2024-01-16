import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const DeleteModal = ({ isOpen, onClose, onConfirm, itemId }) => {

  const handleConfirm = () => {
    onConfirm(itemId);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };



  return (
    <Modal show={isOpen} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to delete? {itemId} </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={handleCancel}>
          Close
        </Button>
        <Button className="btn btn-danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
