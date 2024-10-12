import React from "react";
import logo from "../assets/hero-carousel-2.jpg";
import "../components/Home.css";
import { Link } from "react-router-dom";
import { About } from "./About.jsx";
import { Gallery } from "./Gallery";
import Menu from "./Menu";
import { Chefs } from "./Chefs";
import { Footer } from "./Footer";
import { Contacts } from "./Contacts";
import { BookAtable } from "./BookAtable";

export const Home = () => {
  return (
    <>
      <div className="hero">
        <img className="rounded" src={logo} alt="first" />
        <div className="carousel-container">
          <h2>
            <span>Fusion</span> Restaurant
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div>
            <Link to="/menu" class="btn-get-started">
              Our Menu
            </Link>
            <Link to="/booktable" class="btn-get-started">
              Book a table
            </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="about-section">
          <About />
        </div>
        <div className="menu-section">
          <Menu />
        </div>
        <div className="chefs-section">
          <Chefs />
        </div>
        <div className="tablebook-section">
          <BookAtable />
        </div>
        <div className="gallery-section">
          <Gallery />
        </div>
        <div className="contacts-section">
          <Contacts />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </section>
    </>
  );
};
