import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "sonner";

const userDetailsApi = "https://digimenu-backend.onrender.com/contacts";
const delContactApi = "https://digimenu-backend.onrender.com/delcontacts";

export const Contact = () => {
  useEffect(() => {
    userDetails();
  }, []);

  const [data, setData] = useState([]);

  const userDetails = async () => {
    try {
      const res = await axios.get(userDetailsApi);
      const l = res.data.userData;
      if (res.data.success) {
        setData(l);
      }
      userDetails();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // DeleteSection =>
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [delid, setDelid] = useState(0);
  const delDatahandler = (id) => {
    setIsPopupVisible(true);
    setDelid(id);
  };
  const handledelContactClose = () => {
    setIsPopupVisible(false);
  };

  const delContact = async () => {
    const delids = delid;
    try {
      const res = await axios.delete(delContactApi, {
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
      userDetails();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="text-center mx-40 mt-20">
        <div className="font-medium text-3xl">Contact</div>
        <div className="mt-4">
          <Table responsive="sm" bordered>
            <thead className="">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>UserMessage</th>
                <th>Created_At</th>
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
                    <td>{val.subject}</td>
                    <td>{val.usermessage}</td>
                    <td>{val.created_at}</td>
                    <td>
                      <Button
                        onClick={() => delDatahandler(val.id)}
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
                              onClick={delContact}
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
                              onClick={handledelContactClose}
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
