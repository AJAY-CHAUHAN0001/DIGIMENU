import React from "react";
import "../components/Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer id="footer" class="footer dark-background">
        <div class="container">
          <div class="row gy-3">
            <div class="col-lg-3 col-md-6 d-flex">
              <i class="bi bi-geo-alt icon"></i>
              <div class="address">
                <h4>Address</h4>
                <p>A108 Sai Street</p>
                <p>Moradabad, MBD 244221</p>
                <p></p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex">
              <i class="bi bi-telephone icon"></i>
              <div>
                <h4>Contact</h4>
                <p>
                  <strong>Phone:</strong> <span>+91 800 55488 55</span>
                  <br />
                  <strong>Email:</strong> <span>abc@example.com</span>
                  <br />
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex">
              <i class="bi bi-clock icon"></i>
              <div>
                <h4>Opening Hours</h4>
                <p>
                  <strong>Mon-Sat:</strong> <span>10AM - 11PM</span>
                  <br />
                  <strong>Sunday</strong>: <span>Closed</span>
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <h4>Follow Us</h4>
              <div class="social-links d-flex cursor-pointer">
                <Link to="" class="twitter">
                  <i class="bi bi-twitter-x"></i>
                </Link>
                <Link to="" class="facebook">
                  <i class="bi bi-facebook"></i>
                </Link>
                <Link to="" class="instagram">
                  <i class="bi bi-instagram"></i>
                </Link>
                <Link to="" class="linkedin">
                  <i class="bi bi-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div class="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span> <strong class="px-1 ">Fusion</strong>
            <span className="mx-1">All Rights Reserved</span>
          </p>
          {/* <div class="credits">
            Designed by <Link to=""></Link>
          </div> */}
        </div>
      </footer>
    </>
  );
};
