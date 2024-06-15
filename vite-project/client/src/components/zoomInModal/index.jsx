import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ZoomInModal = ({ show, handleClose, image, item }) => {
    const [currentImage, setCurrentImage] = useState(image);
    const [title, setTitle] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [transformOrigin, setTransformOrigin] = useState('center center'); // [1
    const imageRef = useRef(null);

    const handleMove = (e) => {
        e.preventDefault();
        if (zoomLevel > 1) {
            /* getBoundingClientRect() returns the size of an element and its position relative to the viewport */
            const bounds = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - bounds.left) / bounds.width) * 100;
            const y = ((e.clientY - bounds.top) / bounds.height) * 100;
            setTransformOrigin(`${x}% ${y}%`);
        }
    }


    const handleWheel = (e) => {
        e.preventDefault();
        const {deltaY} = e;
        const direction = deltaY > 0 ? -1 : 1;
        setZoomLevel(zoom => {
            const newZoom = zoom + direction * 0.1;
            return newZoom < 1 ? 1 : newZoom;
        });
    };

    useEffect(() => {
        setCurrentImage(image);
        // Update title based on whether the image is a main image, a description image, or an include image
        if (image === item.image) {
            setTitle(item.name);
        } else if (item.descriptionImages.includes(image)) {
            setTitle(`Detail of ${item.name}`);
        } else {
            const include = item.includes.find(include => include.images.includes(image));
            setTitle(include ? `Part of ${item.name} - ${include.name}` : 'Detail');
        }
    }, [image, item]);


    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ overflow: 'hidden'}}>
                <img 
                ref={imageRef} 
                src={currentImage} 
                alt={title} 
                className="w-100"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: transformOrigin, cursor: zoomLevel > 1 ? 'move' : 'auto'}}
                onWheel={handleWheel}
                onMouseMove={handleMove} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ZoomInModal;
