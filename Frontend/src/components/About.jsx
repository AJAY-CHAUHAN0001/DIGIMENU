import React, { useState } from 'react'
import '../components/About.css'
import about from '../assets/about.jpg'
import Card from "react-bootstrap/Card";
import gallery from '../assets/Gallery-1.jpg';
import  Modal  from 'react-modal';
import video from '../assets/resto-videp.mp4'

Modal.setAppElement('#root');
export const About = () => {
  const [modelIsopen, setModelIsOpen] = useState(false);

  const openModel = () => {
    setModelIsOpen(true);
  };

  const closeModel = () => {
    setModelIsOpen(false);
  };

  return (
    <>
      <div className="mt-10 flex">
        <section id="about" class="about section light-background">
          <div class="container">
            <div class="row gy-4">
              <div
                class="col-lg-6 align-self-start"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img src={about} class="img-fluid" alt="img-2" />

                <div>
                  <a
                    id="play-video"
                    class="video-launch video-play-button cursor-pointer"
                    onClick={openModel}
                    rel="shadowbox;height=450;width=800"
                  >
                    <span></span>
                  </a>
                  <Modal
                    isOpen={modelIsopen}
                    onRequestClose={closeModel}
                    contentLabel="Video Model"
                    className="model"
                    overlayClassname="overlay"
                  >
                    <div className="video-container">
                      <button
                        onClick={closeModel}
                        className="close-button bi bi-x-lg"
                      ></button>
                      <video width="100%" controls>
                        <source src={video} type="video/mp4" value="autoplay" />
                      </video>
                    </div>
                  </Modal>

                  {modelIsopen && (
                    <div
                      onClick={closeModel}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        opacity: "0.1",
                        zIndex: 0,
                        cursor: "pointer",
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div id="about-1">
                <div
                  class="col-lg-6 content float-right "
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h3>
                    Voluptatem dignissimos provident quasi corporis voluptates
                    sit assumenda.
                  </h3>
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        trideta storacalaperda mastiro dolore eu fugiat nulla
                        pariatur.
                      </span>
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="">
        <section className="why-us">
          <div className="why">
            <h2>WHY US</h2>
            <div className="title">
              <span>Why Choose</span>
              <span className="description-title"> Our Restaurant</span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div class="aboutcarddemo">
            <div class="g-4 row row-cols-md-3 row-cols-1">
              <div class="col">
                <div id="aboutdemo" class="card">
                  <div class="card-body">
                    <div class="card-title h3">1</div>
                    <p class="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div id="aboutdemo" class="card">
                  <div class="card-body">
                    <div class="card-title h3">2</div>
                    <p class="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div id="aboutdemo" class="card">
                  <div class="card-body  transform: scale(1.1)">
                    <div class="card-title h3">3</div>
                    <p class="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
