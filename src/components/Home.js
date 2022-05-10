import React from "react";
import cookie from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const columns = [
  { field: "serial", headerName: "ID" },
  { field: "bankName", headerName: "bankName", width: 100 },
  { field: "recieveDes", headerName: "recieveDes", width: 200 },
];
const Home = () => {
  const [mentees, setMentees] = useState([]);
  const [serial, setSerial] = useState([]);
  const [bankName, setBankName] = useState([]);

  // const submithandler = async (e) => {
  //     e.preventDefault();
  //     const token = cookie.get("token");
  //     try {
  //     const sendData = await axios.post(
  //       "https://support.tyam.co:3017/api/recieveMoney/save",{
  //           headers: {
  //           Authorization: `token ${token}`,
  //         }
  //       }
  //      ,
  //       {serial : 520,
  //           bankName : "saman"
  //       }
  //     );console.log(sendData)
  //   } catch (err) {
  //     console.log(err);
  //   }
  const submithandler = async (e) => {
    e.preventDefault();
    const token = cookie.get("token");
    fetch("https://support.tyam.co:3017/api/recieveMoney/save", {
      method: "POST",
      headers: { 'Content-Type' : 'application/json',
        Authorization: `token ${token}`,
      },
      body: {
          serial: 415,
        bankName: "saman",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  useEffect(() => {
    const token = cookie.get("token");
    axios
      .get("https://support.tyam.co:3017/api/recieveMoney/getall", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setMentees(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(mentees);

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={submithandler}>
        <label>
          serial:
          <input
            type="text"
            name="serial"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
        </label>
        <label>
          bankName:
          <input
            type="text"
            name="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </label>
        <button>send</button>
      </form>
      <div style={{ height: 700, width: 1000 }}>
        <DataGrid
          getRowId={(row) => row.serial}
          rows={mentees}
          columns={columns}
          pageSize={100}
        />
      </div>
    </div>
  );
};

export default Home;
