import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-3 first-row">
          <div className="mb-2">
            <img className="logo-gris" src="/assets/images/8.png" alt="image" />
            <p className="description">
              vous aide à lorem ipsums simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <div className="social">
              <p>© 2016 - 2022 Inist-CNRS • V3.3.1</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div>
            <h6 className="title">NAVIGATION</h6>
            <ul className="list-footer">
              <li className="item-footer">Aide en ligne</li>
              <li className="item-footer">PGD &amp; Modèles</li>
              <li className="item-footer">Approfondir</li>
              <li className="item-footer">Actualités</li>
            </ul>
          </div>
        </div>
        <div className="col-3">
          <div>
            <h6 className="title">A PROPOS</h6>
            <ul className="list-footer">
              <li className="item-footer">A propos de DMP OPIDoR</li>
              <li className="item-footer">Mentions légales</li>
              <li className="item-footer">Politique de cookies</li>
              <li className="item-footer">Github</li>
            </ul>
          </div>
        </div>
        <div className="col-3">
          <div>
            <h6 className="title">ECOSYSTEM</h6>
            <ul className="list-footer">
              <li className="item-footer">product 1</li>
              <li className="item-footer">product 2</li>
              <li className="item-footer">product 4</li>
              <li className="item-footer">product 5</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
