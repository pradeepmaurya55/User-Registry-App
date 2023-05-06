import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserDataTable = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL);
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "ID type",
      selector: (row) => row.idType,
    },
    {
      name: "ID Number",
      selector: (row) => row.idNumber,
    },
    {
      name: "Guardian Name",
      selector: (row) => row.gaurdianName,
    },
    {
      name: "Emergency Contact",
      selector: (row) => row.email,
    },
    {
      name: "Address",
      selector: (row) => row.address.address,
    },
    {
      name: "State",
      selector: (row) => row.address.state,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
    {
      name: "Country",
      selector: (row) => row.address.country,
    },
    {
      name: "Pincode",
      selector: (row) => row.address.pincode,
    },
    {
      name: "Occupation",
      selector: (row) => row.otherDetails.occupation,
    },
    {
      name: "Religion",
      selector: (row) => row.otherDetails.religion,
    },
    {
      name: "Marital Status",
      selector: (row) => row.otherDetails.maritialStatus,
    },
    {
      name: "Blood Group",
      selector: (row) => row.otherDetails.bloodGroup,
    },
    {
      name: "Nationality",
      selector: (row) => row.otherDetails.nationality,
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <DataTable
      title="ALL USERS DETAILS"
      columns={columns}
      data={users}
      responsive
      pagination
      highlightOnHover
    />
  );
};

export default UserDataTable;
