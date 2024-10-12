import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";
import "../components/Food.css";

const foodGroupApi = "http://localhost:5000/foodgroup";
const addfoodgroupApi = "http://localhost:5000/addfoodgroup";
const updateFoodGroupApi = "http://localhost:5000/updatefoodgroup";
const delFoodGroupApi = "http://localhost:5000/delfoodgroup";

export const Food = () => {
  useEffect(() => {
    foodGroup();
  }, []);

  const [data, setData] = useState([]);

  const foodGroup = async () => {
    try {
      const res = await axios.get(foodGroupApi);
      let d = res.data.foodgroup;
      setData(d);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // addFoodGroup

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlegroupvisible = () => {
    setIsPopupVisible(true);
  };

  const handlegroupClose = () => {
    setIsPopupVisible(false);
  };

  const [fg, setFg] = useState("");

  const foodgrouphandler = (e) => {
    setFg(e.target.value);
  };

  const addFoodgrouphandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(addfoodgroupApi, {
        group_name: fg,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast(res.data.message);
      }
      foodGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // delFoodGroup =
  const [popupVisible, setPopupVisible] = useState(false);
  const [delgid, setDelgid] = useState(0);

  const handleDelfoodgroupClick = (gid) => {
    setPopupVisible(true);
    setDelgid(gid);
  };

  const handleClosePopuped = () => {
    setPopupVisible(false);
  };

  const delFoodgroup = async (e) => {
    let delgids = delgid;
    console.log(delgids);

    try {
      const res = await axios.delete(delFoodGroupApi, {
        data: {
          id: delgids,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else if (res.data.status == 200) {
        toast.error(res.data.message);
      }
      setPopupVisible(false);
      foodGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //updateFoodGroup =>
  const [isPopupVisibles, setIsPopupVisibles] = useState(false);
  const [fgid, setGid] = useState(0);

  const handleUpdatefgClick = (gid) => {
    setIsPopupVisibles(true);
    setGid(gid);
  };

  const handleClosePopups = () => {
    setIsPopupVisibles(false);
  };

  const [upfgname, setUpfgname] = useState("");

  const upfoodgrouphandler = (e) => {
    setUpfgname(e.target.value);
  };

  const handleupdatefoodgroup = async (e) => {
    e.preventDefault();
    let fgids = fgid;
    console.log(fgids);

    try {
      const res = await axios.put(updateFoodGroupApi, {
        gid: fgids,
        group_name: upfgname,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else if (res.data.status == 400) {
        toast.status(res.data.message);
      }
      foodGroup();
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  return (
    <>
      <div className="mt-20">
        <div className="text-center">
          <Button
            onClick={handlegroupvisible}
            className="mt-2"
            variant="warning"
          >
            Add Group
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
                  left: "80px",
                  fontSize: "18px",
                }}
              >
                Add Food-Group Detail
              </h2>
              <form onSubmit={addFoodgrouphandler}>
                <div className="food-input">
                  <p>Group-Name</p>
                  <input
                    type="text"
                    required="true"
                    onChange={foodgrouphandler}
                  />
                </div>
                <div className="add-group">
                  <Button type="submit" variant="warning">
                    Add Group
                  </Button>
                </div>
              </form>
              {/* Close Button */}
              <div className="menu-btn1">
                <i
                  class="bi bi-x-lg"
                  onClick={handlegroupClose}
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
              onClick={handlegroupClose}
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
              <div className="mx-20">
                <Table responsive="sm" bordered>
                  <thead className="">
                    <tr>
                      <th>G_Id</th>
                      <th>Group_name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data.map((val) => {
                      return (
                        <tr>
                          <td>{val.gid}</td>
                          <td>{val.group_name}</td>
                          <td>
                            <Button
                              onClick={(e) => handleDelfoodgroupClick(val.gid)}
                              variant="danger"
                            >
                              Delete
                            </Button>

                            {popupVisible && (
                              <div
                                className="popup"
                                style={{
                                  position: "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  padding: "60px 130px",
                                  backgroundColor: "#fff",
                                  boxShadow: "0px 0px 5px rgba(0,0,0,0.03)",
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
                                  Do you want to delete id {delgid}?
                                </h2>

                                {/* yes Button */}
                                <div id="menuclose">
                                  <i
                                    onClick={delFoodgroup}
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
                                    onClick={handleClosePopuped}
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
                              onClick={(e) => handleUpdatefgClick(val.gid)}
                              className="mx-3"
                            >
                              Update
                            </Button>

                            {isPopupVisibles && (
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
                                  Add Food-Group Detail
                                </h2>
                                <p
                                  style={{
                                    position: "absolute",
                                    top: "40px",
                                    left: "150px",
                                    transition: "0.8s",
                                  }}
                                >
                                  Gid:{fgid}
                                </p>
                                <form onSubmit={handleupdatefoodgroup}>
                                  <div className="food-input1">
                                    <p>Group_name</p>
                                    <input
                                      type="text"
                                      required="true"
                                      onChange={upfoodgrouphandler}
                                    />
                                    <br />
                                  </div>
                                  <div className="add-group">
                                    <Button type="submit" variant="warning">
                                      Update Group
                                    </Button>
                                  </div>
                                </form>
                                {/* Close Button */}
                                <div className="menu-btn2">
                                  <i
                                    class="bi bi-x-lg"
                                    onClick={handleClosePopups}
                                    style={{
                                      border: "none", 
                                    }}
                                  ></i>
                                </div>
                              </div>
                            )}
                            {isPopupVisibles && (
                              <div
                                onClick={handleClosePopups}
                                style={{
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
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
