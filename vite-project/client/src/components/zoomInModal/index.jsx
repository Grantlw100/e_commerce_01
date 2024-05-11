import {useState, useEffect} from "react";
import {useGlobalState} from "../../utils/Store/GlobalState";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const ZoomInModal = ({show, handleClose, children, title}) => {
    const [currentImage, setCurrentImage] = useState(image);
    const { state, toggleModal } = useGlobalState();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={currentImage} alt={title} className='w-100' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
    