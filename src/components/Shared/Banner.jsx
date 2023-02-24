import React from "react";

function Banner() {
  return (
    <section>
      <div className="banner">
        <img className="banner-logo" src="/assets/images/banner.png" alt="image" />
        <div className="banner-content">
          <div className="banner-text">
            <h2>La gestion des données de recherche</h2>
          </div>
          <div className="banner-sous-text">
            <h6>Un élément clé pour la mise en oeuvre de bonnes pratiaues de gestion et rendre les données FAIR</h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
