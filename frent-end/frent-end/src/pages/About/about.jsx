import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical, faUserMd, faTooth, faSmile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import clinicImage from '../../../public/img/doctors.jpg';
import './about.css';

export default function About() {
  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container text-center">
          <h1 className="about-title">Bienvenue à la Clinique Dentaire Largue</h1>
          <p className="about-subtitle">
            Votre destination d'excellence pour des soins dentaires à Tiznit. 
            Notre équipe dévouée combine expertise et approche humaine pour votre confort.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="about-container row">
        {/* Left Column */}
        <div className="content-column">
          <header className="about-header">
            <h2 className="section-title">Notre Philosophie de Soins</h2>
            <p className="about-intro">
              Chez Clinique Dentaire Largue, nous croyons en une approche globale 
              des soins dentaires, combinant technologie de pointe et compassion 
              humaine pour des résultats exceptionnels.
            </p>
          </header>

          <div className="about-features">
            <div className="feature-card">
              <div className="feature-row">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faClinicMedical} />
                </div>
                <div className="feature-content">
                  <h3>Infrastructure Moderne</h3>
                  <p>
                    Notre clinique dispose d'équipements à la pointe de la technologie 
                    dentaire, permettant des diagnostics précis et des traitements efficaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-row">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUserMd} />
                </div>
                <div className="feature-content">
                  <h3>Expertise Médicale</h3>
                  <p>
                    Notre équipe de dentistes expérimentés suit régulièrement des formations 
                    pour vous offrir les techniques de soins les plus récentes et efficaces.
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Features */}
            <div className="features-grid">
              <div className="mini-feature">
                <FontAwesomeIcon icon={faTooth} className="mini-icon" />
                <h4>Soins Préventifs</h4>
                <p>Prévention et détection précoce des problèmes</p>
              </div>

              <div className="mini-feature">
                <FontAwesomeIcon icon={faSmile} className="mini-icon" />
                <h4>Esthétique Dentaire</h4>
                <p>Des sourires éclatants et naturels</p>
              </div>

              <div className="mini-feature">
                <FontAwesomeIcon icon={faCalendarAlt} className="mini-icon" />
                <h4>Prise de RDV Facile</h4>
                <p>Disponibilité et flexibilité pour vos besoins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="image-column">
          <div className="about-image-container">
            <img 
              src={clinicImage} 
              alt="Clinique Dentaire Largue" 
              className="clinic-image"
            />
            <div className="experience-badge">
              <h4>Plus de 15 ans d'expérience</h4>
              <p>Au service de votre santé dentaire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
