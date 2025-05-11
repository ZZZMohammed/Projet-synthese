import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h2>
          Bienvenue Chez Clinique <br />
          Dentaire Largue à <br />
          Tiznit
        </h2>
        <p className="about-intro">
          Votre premier choix de clinique dentaire à Tiznit. Que ce soit les dentistes, 
          les assistantes dentaires ou les prothésistes, tous ont une philosophie 
          d'approche en douceur et de savoir-faire que vous apprécierez.
        </p>
      </header>

      <div className="about-features">
        <div className="feature-row row">
          <div className="feature-icon col-md-1">
            <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>
          <div className="feature-content col-md-11">
            <h3>Clinique Professionnelle près de chez vous</h3>
            <p>
              Le regroupement de chirurgiens-dentistes et des spécialistes en esthétique 
              dentaire sous un même toit permet au patient un accès à l'ensemble des 
              professionnels du milieu sans avoir à se déplacer.
            </p>
          </div>
        </div>

        <div className="feature-row row">
          <div className="feature-icon col-md-1">
            <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>
          <div className="feature-content col-md-11">
            <h3>Dentistes Expérimentés</h3>
            <p>
              Soucieux d'offrir un service personnalisé, nous avons une équipe solide, 
              qui se montre toujours à l'écoute des besoins des gens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}