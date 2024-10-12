import React from "react";
import "../components/Gallery.css";
import Card from "react-bootstrap/Card";
import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery6 from "../assets/gallery-6.jpg";
import gallery7 from "../assets/gallery-7.jpg";
import gallery8 from "../assets/gallery-8.jpg";

export const Gallery = () => {
  return (
    <>
      <div class="menu-1">
        <button className="menutop">GALLERY</button>
        <h1 className="mt-3">
          Some Photos From <span>Our Restaurant</span>
        </h1>
      </div>

      <div class="carddemo">
        <div class="g-4 row row-cols-md-4 row-cols-1">
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery1} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery2} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery3} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery4} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery5} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery6} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery7} />
            </div>
          </div>
          <div class="col">
            <div id="demo" class="card">
              <Card.Img variant="top" src={gallery8} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
