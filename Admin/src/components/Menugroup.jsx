import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../components/Menugroup.css";
import { toast } from "sonner";

const menuGroupApi = "https://digimenu-backend.onrender.com/menu";
const addMenuApi = "https://digimenu-backend.onrender.com/addmenu";
const updateMenuApi = "https://digimenu-backend.onrender.com/updatemenu";
const delMenuApi = "https://digimenu-backend.onrender.com/delmenu";

export const Menugroup = () => {
  useEffect(() => {
    menuGroup();
  }, []);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleaddmenuclick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const [data, setData] = useState([]);

  const menuGroup = async () => {
    try {
      const res = await axios.get(menuGroupApi);
      let l = res.data.menulist;
      console.log(l);
      setData(l);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  //addMenu =>

  const [menuname, setMenuname] = useState("");
  const [menuprice, setMenuprice] = useState("");
  const [gid, setGid] = useState(0);
  const [qid, setQid] = useState(0);

  const handlemenuname = (e) => {
    setMenuname(e.target.value);
  };

  const handlemenuprice = (e) => {
    setMenuprice(e.target.value);
  };

  const handlegid = (e) => {
    setGid(e.target.value);
  };

  const handleqid = (e) => {
    setQid(e.target.value);
  };

  const handleraddData = async (event) => {
    event.preventDefault();

    if (!menuname || !menuprice || !gid || !qid) {
      toast("Please fill out all fields");
      return;
    }

    let data = {
      menu_name: menuname,
      menu_price: menuprice,
      gid: gid,
      qid: qid,
    };
    try {
      const response = await axios.post(addMenuApi, data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
      menuGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // window.location.href = "/menugroup";
  };

  //UpdateMenu =>

  const [isPopupVisibles, setIsPopupVisibles] = useState(false);
  const [fid, setFid] = useState(0);

  const handleUpdatemenuClick = (mid) => {
    setIsPopupVisibles(true);
    setFid(mid);
    console.log(mid);
  };

  const handleClosePopups = () => {
    setIsPopupVisibles(false);
  };

  const [upmenuname, setUpmenuname] = useState("");
  const [upmenuprice, setUpmenuprice] = useState("");
  const [upgid, setUpgid] = useState(0);
  const [upqid, setUpqid] = useState(0);

  const menuNamehandler = (e) => {
    setUpmenuname(e.target.value);
  };
  const menuPricehandler = (e) => {
    setUpmenuprice(e.target.value);
  };
  const gIdhandler = (e) => {
    setUpgid(e.target.value);
  };
  const qIdhandler = (e) => {
    setUpqid(e.target.value);
  };

  const handleupdatedata = async (e) => {
    e.preventDefault();
    let fids = fid;
    console.log(fids);

    if (!upmenuname || !upmenuprice || !upgid || !upqid) {
      toast("Please fill out all fields");
      return;
    }

    try {
      const res = await axios.put(updateMenuApi, {
        mid: fids,
        menu_name: upmenuname,
        menu_price: upmenuprice,
        gid: upgid,
        qid: upqid,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else if (res.data.status == 400) {
        toast.status(res.data.message);
      }

      menuGroup();
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  //delMenu=>

  const [popupVisible, setPopupVisible] = useState(false);
  const [delid, setDelid] = useState(0);

  const handleDelmenuClick = (mid) => {
    setPopupVisible(true);
    setDelid(mid);
    // console.log(mid);
  };

  const handleClosePopuped = () => {
    setPopupVisible(false);
  };

  const delMenu = async (e) => {
    let delids = delid;
    console.log(delids);

    try {
      const res = await axios.delete(delMenuApi, {
        data: {
          id: delids,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else if (res.data.status == 200) {
        toast.error(res.data.message);
      }
      // window.location.href = "/menugroup";
      setPopupVisible(false);
      menuGroup();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="mt-20">
        <div className="text-center">
          <Button
            onClick={handleaddmenuclick}
            className="mt-3"
            variant="warning"
          >
            Add Menu
          </Button>

          {isPopupVisible && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "100px 150px",
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
                  left: "170px",
                  fontSize: "20px",
                }}
              >
                Add Menu Details
              </h2>
              <form onSubmit={handleraddData}>
                <div className="menu-input1">
                  <p>Menu-Name</p>
                  <input type="text" placeholder="" onChange={handlemenuname} />
                  <br />
                </div>
                <div className="menu-input2">
                  <p>Menu-Price</p>
                  <input
                    type="text"
                    placeholder=""
                    onChange={handlemenuprice}
                  />
                  <br />
                </div>
                <div className="menu-input3">
                  <p>G-Id</p>
                  <input type="text" placeholder="" onChange={handlegid} />
                  <br />
                </div>
                <div className="menu-input4">
                  <p>Q-Id</p>
                  <input type="text" placeholder="" onChange={handleqid} />
                  <br />
                </div>
                <div className="add-data">
                  <Button type="submit" variant="warning">
                    Add Data
                  </Button>
                </div>
              </form>

              {/* Close Button */}
              <div className="menu-btn1">
                <i
                  class="bi bi-x-lg"
                  onClick={handleClosePopup}
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
              onClick={handleClosePopup}
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
        </div>
        <div className="mx-5 mt-5 text-center">
          <div id="">
            <Table responsive="sm" bordered>
              <thead className="">
                <tr>
                  <th>Mid</th>
                  <th>Menu_name</th>
                  <th>Menu_price</th>
                  <th>G_Id</th>
                  <th>Q_Id</th>
                  <th>Created_At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((val) => {
                  return (
                    <tr>
                      <td>{val.mid}</td>
                      <td>{val.menu_name}</td>
                      <td>{val.menu_price}</td>
                      <td className="">{val.gid}</td>
                      <td>{val.qid}</td>
                      <td>{val.created_at}</td>
                      <td>
                        <Button
                          onClick={(e) => handleDelmenuClick(val.mid)}
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
                              boxShadow: "0px 0px 5px rgba(0,0,0,0.01)",
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
                                onClick={delMenu}
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
                          onClick={(e) => handleUpdatemenuClick(val.mid)}
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
                              padding: "100px 150px",
                              backgroundColor: "#fff",
                              boxShadow: "0px 0px 5px rgba(0,0,0,0.01)",
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
                                left: "170px",
                                fontSize: "20px",
                              }}
                            >
                              Add Menu Details
                            </h2>
                            <p
                              style={{
                                position: "absolute",
                                top: "40px",
                                left: "225px",
                              }}
                            >
                              Mid:{fid}
                            </p>
                            <form onSubmit={handleupdatedata}>
                              <div className="menu-input1">
                                <p>Menu-Name</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  onChange={menuNamehandler}
                                />
                                <br />
                              </div>
                              <div className="menu-input2">
                                <p>Menu-Price</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  onChange={menuPricehandler}
                                />
                                <br />
                              </div>
                              <div className="menu-input3">
                                <p>G-Id</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  onChange={gIdhandler}
                                />
                                <br />
                              </div>
                              <div className="menu-input4">
                                <p>Q-Id</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  onChange={qIdhandler}
                                />
                                <br />
                              </div>
                              <div className="add-data1">
                                <Button type="submit" variant="warning">
                                  Update Data
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
                              backgroundColor: "rgba(0, 0, 0, 0.02)",
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
    </>
  );
};
