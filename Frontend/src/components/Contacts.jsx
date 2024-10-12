import React, { useEffect, useState } from "react";
import "../components/Contacts.css";
import { Button } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const addcontactsApi = "https://digimenu-backend.onrender.com/addcontacts";

export const Contacts = () => {
  const naviget = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    subject: "",
    usermessage: "",
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const userhandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(addcontactsApi, input);
      if (res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
          naviget("/response");
        }, 3000);
      } else {
        toast.error("Message failed");
      }
    } catch (error) {
      console.log(error);
      setTimeout(()=>{
        toast.error(error.message);
      },3000)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <section id="contact" class="contact section mt-20">
        <div class="container section-title  text-center" data-aos="fade-up">
          <h2 className="mt-3">CONTACT</h2>
          <div className="mt-2">
            <span>Check Our </span>{" "}
            <span class="description-title">Contact</span>
          </div>
        </div>
        <div class="mb-5 mt-4">
          <iframe
            style={{ width: "100%", height: "450px" }}
            src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Moradabad%20sai%20mandir%20india+(Fusion%20Restaurant)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            allowfullscreen=""
          ></iframe>
        </div>

        <div class="container" data-aos="fade ">
          <div class="row gy-5 gx-lg-5 ">
            <div class="col-lg-4 ">
              <div class="info">
                <h3>Get in touch</h3>
                <p>
                  Et id eius voluptates atque nihil voluptatem enim in tempore
                  minima sit ad mollitia commodi minus.
                </p>

                <div class="info-item d-flex">
                  <i class="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h4>Location:</h4>
                    <p>A108 Sai Street, Moradabad, MBD 244221</p>
                  </div>
                </div>

                <div class="info-item d-flex">
                  <i class="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h4>Email:</h4>
                    <p>abc@example.com</p>
                  </div>
                </div>

                <div class="info-item d-flex">
                  <i class="bi bi-phone flex-shrink-0"></i>
                  <div>
                    <h4>Call:</h4>
                    <p>+91 800 55488 55</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-8">
              <form onSubmit={userhandler} role="form" class="email-form">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    name="subject"
                    value={input.subject}
                    onChange={changeEventHandler}
                    id="subject"
                    placeholder="Subject (Optional)"
                    // required
                  />
                </div>
                <div class="form-group mt-3">
                  <textarea
                    class="form-control"
                    type="message"
                    name="usermessage"
                    value={input.usermessage}
                    onChange={changeEventHandler}
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                          className="me-2"  
                        />
                        Please wait...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
