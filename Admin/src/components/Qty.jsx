import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";

const qtyGroupApi = "https://digimenu-backend.onrender.com/qtymast";
const addQtygroupApi = "https://digimenu-backend.onrender.com/addqtymast";
const upQtygroupApi = "https://digimenu-backend.onrender.com/updateqtymast";
const delQtygroupApi = "https://digimenu-backend.onrender.com/delqtymast";

export const Qty = () => {
  useEffect(() => {
    qtyGroup();
  }, []);

  const [data, setData] = useState([]);

  const qtyGroup = async () => {
    try {
      const res = await axios.get(qtyGroupApi);

      const l = res.data.qtymast;
      setData(l);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  //addQytGroup =>

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddqty = () => {
    setIsPopupVisible(true);
  };

  const handleqtyClose = () => {
    setIsPopupVisible(false);
  };

  const [addqty, setAddqty] = useState("");

  const addQtygroup = (e) => {
    setAddqty(e.target.value);
  };

  const addQtyhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(addQtygroupApi, {
        qty_type: addqty,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      qtyGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // delQtygroup =>

  const [isPopupVisibles, setIsPopupVisibles] = useState(false);
  const [dqid, setDqid] = useState(0);

  const handledelQtygroup = (qid) => {
    setIsPopupVisibles(true);
    setDqid(qid);
  };

  const handledelQtyClose = () => {
    setIsPopupVisibles(false);
  };

  const delQtygroup = async () => {
    const dqids = dqid;
    try {
      const res = await axios.delete(delQtygroupApi, {
        data: {
          id: dqids,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setIsPopupVisibles(false);
      qtyGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // updateQtygroup =>

  const [popupVisible, setPopupVisible] = useState(false);
  const [upqid, setUpqid] = useState(0);

  const handleupQtygroup = (qid) => {
    setPopupVisible(true);
    setUpqid(qid);
  };

  const handleCloseQty = () => {
    setPopupVisible(false);
  };

  const [upgname, setUpgname] = useState("");

  const upQtygrouphandler = (e) => {
    setUpgname(e.target.value);
  };

  const upQtygroup = async (e) => {
    e.preventDefault();
    let upqids = upqid;
    try {
      const res = await axios.put(upQtygroupApi, {
        qid: upqids,
        qty_type: upgname,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      qtyGroup();
      // setPopupVisible(false)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="mt-20">
        <div className="text-center">
          <Button onClick={handleAddqty} className="mt-2" variant="warning">
            Add QTY
          </Button>

          {isPopupVisible && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "80px 90px",
                backgroundColor: "#fff",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                zIndex: 1000,
                transition: "0.9s",
              }}
            >
              <h2
                style={{
                  marginBottom: "20px",
                  position: "absolute",
                  top: "20px",
                  left: "90px",
                  fontSize: "18px",
                }}
              >
                Add QTY-Type Detail
              </h2>
              <form onSubmit={addQtyhandler}>
                <div className="food-input">
                  <p className="mx-3">Qty-Type</p>
                  <input type="text" required="true" onChange={addQtygroup} />
                </div>
                <div className="add-group">
                  <Button type="submit" variant="warning">
                    Add QTY
                  </Button>
                </div>
              </form>
              {/* Close Button */}
              <div className="menu-btn1">
                <i
                  class="bi bi-x-lg"
                  onClick={handleqtyClose}
                  style={{
                    color: "black",
                    border: "none",
                    fontSize: "30px",
                  }}
                ></i>
              </div>
            </div>
          )}
          {isPopupVisible && (
            <div
              onClick={handleqtyClose}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            />
          )}
          <div className="mx-40 mt-5">
            <div className="mx-40">
              <div className="mx-10">
                <Table responsive="sm" bordered>
                  <thead className="">
                    <tr>
                      <th>Q_Id</th>
                      <th>Qty_Type</th>
                      <th>Created_At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data.map((val) => {
                      return (
                        <tr>
                          <td>{val.qid}</td>
                          <td className="">{val.qty_type}</td>
                          <td>{val.created_at}</td>
                          <td>
                            <Button
                              onClick={() => handledelQtygroup(val.qid)}
                              variant="danger"
                            >
                              Delete
                            </Button>
                            {isPopupVisibles && (
                              <div
                                className="popup"
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
                                  Do you want to delete id {dqid}?
                                </h2>

                                {/* yes Button */}
                                <div id="menuclose">
                                  <i
                                    onClick={delQtygroup}
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
                                    onClick={handledelQtyClose}
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

                            <Button
                              onClick={() => handleupQtygroup(val.qid)}
                              className="mx-3"
                            >
                              Update
                            </Button>

                            {popupVisible && (
                              <div
                                style={{
                                  position: "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  padding: "80px 90px",
                                  backgroundColor: "#fff",
                                  boxShadow: "0px 0px 15px rgba(0,0,0,0.01)",
                                  borderRadius: "10px",
                                  zIndex: 1000,
                                  transition: "0.9s",
                                  border: "none",
                                }}
                              >
                                <h2
                                  style={{
                                    marginBottom: "20px",
                                    position: "absolute",
                                    top: "15px",
                                    left: "80px",
                                    fontSize: "20px",
                                    transition: "0.8s",
                                  }}
                                >
                                  Add Qty-Type Detail
                                </h2>
                                <p
                                  style={{
                                    position: "absolute",
                                    top: "40px",
                                    left: "150px",
                                    transition: "0.8s",
                                  }}
                                >
                                  Qid : {upqid}
                                </p>
                                <form onSubmit={upQtygroup}>
                                  <div className="food-input1">
                                    <p className="mx-3">Qty_Type</p>
                                    <input
                                      type="text"
                                      required="true"
                                      onChange={upQtygrouphandler}
                                    />
                                    <br />
                                  </div>
                                  <div className="add-group">
                                    <Button type="submit" variant="warning">
                                      Update Qty
                                    </Button>
                                  </div>
                                </form>
                                <div className="menu-btn2">
                                  <i
                                    class="bi bi-x-lg"
                                    onClick={handleCloseQty}
                                    style={{
                                      border: "none",
                                    }}
                                  ></i>
                                </div>
                              </div>
                            )}
                            {popupVisible && (
                              <div
                                onClick={handleCloseQty}
                                style={{
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                                  zIndex: 999,
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
