import React, { useState } from "react";
import "../components/BookAtable.css";
import booktable from "../assets/booktable-img.jpg";
import booktale from "../assets/table.avif";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const booktableApi = "https://digimenu-backend.onrender.com/booktables";

export const BookAtable = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const inputEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const tablebookhandler = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    console.log(input);

    try {
      const res = await axios.post(booktableApi, input);

      if (res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
          navigate("/bookingresponse");
        },3000);
      }else{
        toast.error("Failed to book table");
      }
    } catch (error) {
      console.log(error);
      setTimeout(()=>{
        toast.error(error.message);
      },3000)
    } finally{
      setTimeout(()=>{
        setLoading(false);
      },3000)
    }
  };

  return (
    <>
      <section id="book-a-table" class="book-a-table section mt-20 mx-20 mb-10">
        <div className="container section-title text-center" data-aos="fade-up">
          <h2 className="mt-3">Book A Table</h2>
          <div className="mt-3">
            <span>Book a</span> <span class="description-title">Table</span>
          </div>
        </div>

        <div className="container">
          <div className="row g-0" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-4 reservation-img">
              <img src={booktale} alt="" />
            </div>

            <div
              className="col-lg-8 d-flex align-items-center reservation-form-bg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <form onSubmit={tablebookhandler} role="form" class="table-form">
                <div className="row gy-4">
                  <div className="col-lg-4 col-md-6">
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={inputEventhandler}
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={input.email}
                      onChange={inputEventhandler}
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      value={input.phone}
                      onChange={inputEventhandler}
                      id="phone"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <input
                      type="date"
                      name="date"
                      value={input.date}
                      onChange={inputEventhandler}
                      class="form-control"
                      id="date"
                      placeholder="Date"
                      required
                    />
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <input
                      type="time"
                      class="form-control"
                      name="time"
                      value={input.time}
                      onChange={inputEventhandler}
                      id="time"
                      placeholder="Time"
                      required
                    />
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <input
                      type="number"
                      class="form-control"
                      name="people"
                      value={input.people}
                      onChange={inputEventhandler}
                      id="people"
                      placeholder="# of people"
                      required
                    />
                  </div>
                </div>

                <div class="form-group mt-3">
                  <textarea
                    class="form-control"
                    name="message"
                    value={input.message}
                    onChange={inputEventhandler}
                    rows="5"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div class="text-center mt-3">
                  <button type="submit" disabled={loading}>
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
                      "Book a Table"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
