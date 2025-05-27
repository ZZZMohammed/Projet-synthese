import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical, faUserMd, faTooth, faSmile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import clinicImage from '../../../public/img/doctors.jpg';
import './about.css';

export default function About() {
  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <div className="about-hero" style={{
        backgroundColor: '#f0f7f4',
        padding: '4rem 0',
        marginBottom: '3rem'
      }}>
        <div className="about-container">
          <h1 style={{
            color: '#2a7f62',
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Bienvenue à la Clinique Dentaire Largue
          </h1>
          <p style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#4a4a4a'
          }}>
            Votre destination d'excellence pour des soins dentaires à Tiznit. 
            Notre équipe dévouée combine expertise et approche humaine pour votre confort.
          </p>
        </div>
      </div>

      <div className="about-container">
        <div className="row">
          {/* Content Column (left side) */}
          <div className="content-column">
            <header className="about-header">
              <h2 style={{
                fontSize: '2rem',
                lineHeight: '1.3',
                marginBottom: '1.5rem',
                color: '#2a7f62',
                fontWeight: '600',
                position: 'relative',
                paddingBottom: '1rem'
              }}>
                <span style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#2a7f62'
                }}></span>
                Notre Philosophie de Soins
              </h2>
              <p className="about-intro" style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                marginBottom: '2.5rem',
                color: '#555'
              }}>
                Chez Clinique Dentaire Largue, nous croyons en une approche globale 
                des soins dentaires, combinant technologie de pointe et compassion 
                humaine pour des résultats exceptionnels.
              </p>
            </header>

            <div className="about-features">
              <div className="feature-card" style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div className="feature-row">
                  <div className="feature-icon" style={{
                    color: '#2a7f62',
                    fontSize: '1.8rem',
                    minWidth: '50px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon icon={faClinicMedical} />
                  </div>
                  <div className="feature-content">
                    <h3 style={{
                      marginTop: '0',
                      marginBottom: '0.8rem',
                      color: '#333',
                      fontWeight: '600'
                    }}>Infrastructure Moderne</h3>
                    <p style={{
                      margin: '0',
                      lineHeight: '1.7',
                      color: '#666'
                    }}>
                      Notre clinique dispose d'équipements à la pointe de la technologie 
                      dentaire, permettant des diagnostics précis et des traitements efficaces.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card" style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div className="feature-row">
                  <div className="feature-icon" style={{
                    color: '#2a7f62',
                    fontSize: '1.8rem',
                    minWidth: '50px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon icon={faUserMd} />
                  </div>
                  <div className="feature-content">
                    <h3 style={{
                      marginTop: '0',
                      marginBottom: '0.8rem',
                      color: '#333',
                      fontWeight: '600'
                    }}>Expertise Médicale</h3>
                    <p style={{
                      margin: '0',
                      lineHeight: '1.7',
                      color: '#666'
                    }}>
                      Notre équipe de dentistes expérimentés suit régulièrement des formations 
                      pour vous offrir les techniques de soins les plus récentes et efficaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="features-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div className="mini-feature" style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faTooth} style={{
                    color: '#2a7f62',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                  }} />
                  <h4 style={{ margin: '0.5rem 0', color: '#333' }}>Soins Préventifs</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Prévention et détection précoce des problèmes
                  </p>
                </div>

                <div className="mini-feature" style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faSmile} style={{
                    color: '#2a7f62',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                  }} />
                  <h4 style={{ margin: '0.5rem 0', color: '#333' }}>Esthétique Dentaire</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Des sourires éclatants et naturels
                  </p>
                </div>

                <div className="mini-feature" style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{
                    color: '#2a7f62',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                  }} />
                  <h4 style={{ margin: '0.5rem 0', color: '#333' }}>Prise de RDV Facile</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Disponibilité et flexibilité pour vos besoins
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column (right side) */}
          <div className="image-column">
            <div className="about-image-container" style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}>
              <img 
                src={clinicImage} 
                alt="Clinique Dentaire Largue" 
                className="clinic-image"
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                backgroundColor: '#2a7f62',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                maxWidth: '250px'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                  Plus de 15 ans d'expérience
                </h4>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>
                  Au service de votre santé dentaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}