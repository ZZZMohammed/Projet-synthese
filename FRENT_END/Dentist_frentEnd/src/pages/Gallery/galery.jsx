import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

import './Gallery.css';

const Galery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data - replace with your actual images
 const galleryImages = [
  { id: 1, src: 'https://picsum.photos/id/1018/800/600', alt: 'Clinic Exterior', category: 'exterior' },
  { id: 2, src: 'https://picsum.photos/id/1025/800/600', alt: 'Clinic Waiting Area', category: 'interior' },
  { id: 3, src: 'https://picsum.photos/id/1029/800/600', alt: 'Medical Equipment', category: 'equipment' },
  { id: 4, src: 'https://picsum.photos/id/1033/800/600', alt: 'Clinic Building', category: 'exterior' },
  { id: 5, src: 'https://picsum.photos/id/1035/800/600', alt: 'Examination Room', category: 'interior' },
  { id: 6, src: 'https://picsum.photos/id/1040/800/600', alt: 'Surgical Tools', category: 'equipment' },
  { id: 7, src: 'https://picsum.photos/id/1044/800/600', alt: 'Clinic Garden', category: 'exterior' },
  { id: 8, src: 'https://picsum.photos/id/1047/800/600', alt: 'Reception Area', category: 'interior' },
  { id: 9, src: 'https://picsum.photos/id/1052/800/600', alt: 'X-ray Machine', category: 'equipment' },
];

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'exterior', name: 'Extérieur' },
    { id: 'interior', name: 'Intérieur' },
    { id: 'equipment', name: 'Équipements' },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="gallery-page">
      <Container>
        <h1 className="gallery-title text-center my-5">Galerie Photos</h1>
        
        {/* Category Filter */}
        <div className="gallery-filter mb-5 text-center">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn mx-2 ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <Row className="gallery-grid">
          {filteredImages.map(image => (
            <Col key={image.id} xs={12} sm={6} md={4} className="mb-4 gallery-item">
              <div className="gallery-thumbnail" onClick={() => openModal(image)}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="img-fluid"
                />
                <div className="image-overlay">
                  <span className="zoom-icon">+</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* Image Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="img-fluid"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Galery;