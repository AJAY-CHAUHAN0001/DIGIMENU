import React from "react";
import "./Menu.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "sonner";

const digiMenuApi = "http://localhost:5000/menucard";

const Menu = () => {
  useEffect(() => {
    digiMenu();
  }, []);

  // MenuCard =>
  const [data, setData] = useState([]);

  const digiMenu = async () => {
    try {
      const response = await axios.get(digiMenuApi);
      const l = response.data.menucard;
      if (response.data.success) {
        setData(l);
      }
      digiMenu();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div class="menu-1">
        <center>
          <button className="menutops">Menu</button>

          <h1 className="mt-3">
            Check Our Tasty <span>Menu</span>
          </h1>
        </center>
      </div>

      {/* <div class="menu-2">
        <Link to="/menu">All</Link>
        <Link to="/menu">Veg</Link>
        <Link to="/menu">Non-Veg</Link>
        <Link to="/menu">Salads</Link>
        <Link to="/menu">Specialty</Link>
      </div> */}

      <div className="mx-20 mt-5">
        <div id="menuborder ">
          <Table responsive="sm" bordered>
            <thead className="menutable">
              <tr>
                <th>Menu_name</th>
                <th>Menu_price</th>
                <th>Qty</th>
                <th>Group_name</th>
              </tr>
            </thead>
            <tbody className="menubody">
              {data.map((val) => {
                return (
                  <tr>
                    <td>{val.menu_name}</td>
                    <td className="menuprice">{val.menu_price}</td>
                    <td>{val.qty_type}</td>
                    <td>{val.group_name}</td>
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

export default Menu;
