import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "sonner";

const booktableApi = "http://localhost:5000/booktable";
const delbooktableApi = "http://localhost:5000/delbooktables";

export const BookAtableMessage = () => {
  useEffect(() => {
    booktablehandler();
  }, []);
  const [data, setData] = useState([]);

  const booktablehandler = async () => {
    try {
      const res = await axios.get(booktableApi, data);
      const l = res.data.bookingData;

      if (res.data.success) {
        setData(l);
      }
      booktablehandler();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // deleteData=>

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [delid, setDelid] = useState(0);

  const onChangeHandler = (id) => {
    setIsPopupVisible(true);
    setDelid(id);
  };

  const handledelBooktableClose = () => {
    setIsPopupVisible(false);
  };

  const delbooktable = async () => {
    const delids = delid;
    try {
      const res = await axios.delete(delbooktableApi, {
        data: {
          id: delids,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setIsPopupVisible(false);
      booktablehandler();
    } catch (error) {
      console.log();
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className=" text-center mx-40 mt-20">
      <div className="font-medium text-3xl">BookedTable</div>
        <div className="mt-4">
          <Table responsive="sm" bordered>
            <thead className="">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>BookingDate</th>
                <th>BookingTime</th>
                <th>NoOfPeople</th>
                <th>BookingMessage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((val) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mob}</td>
                    <td>{val.bdate}</td>
                    <td>{val.btime}</td>
                    <td>{val.noofpeople}</td>
                    <td>{val.bmessage}</td>
                    <td>
                      <Button
                        onClick={() => onChangeHandler(val.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>

                      {isPopupVisible && (
                        <div
                          style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "60px 130px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 0px 5px rgba(0,0,0,0.04)",
                            borderRadius: "10px",
                            zIndex: 1000,
                            transition: "0.9s",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <h2
                            style={{
                              marginBottom: "20px",
                              position: "absolute",
                              top: "40px",
                              left: "43px",
                              fontSize: "15px",
                              transition: "0.5s",
                            }}
                          >
                            Do you want to delete id {delid}?
                          </h2>

                          {/* yes Button */}
                          <div id="menuclose">
                            <i
                              onClick={delbooktable}
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                left: "40px",
                                top: "85px",
                                transition: "0.5s",
                              }}
                            >
                              Yes
                            </i>
                          </div>

                          {/* No Button */}
                          <div className="menu-close1">
                            <i
                              onClick={handledelBooktableClose}
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                left: "200px",
                                top: "85px",
                                transition: "0.5s",
                                color: "blue",
                              }}
                            >
                              No
                            </i>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
