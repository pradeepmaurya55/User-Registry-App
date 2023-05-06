import React from "react";
import Form from "./Form";
import data from "./registerFormData.json";
import * as yup from "yup";
import axios from "axios";

const RegisterForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup
      .number("Number Only")
      .positive("Positive Number Only")
      .required()
      .typeError("Age cannot be empty"),
    sex: yup.string().required(),

    mobile: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .min(1000000000)
      .max(9999999999)
      .nullable(),
    idType: yup
      .string()
      .transform((value) => (value === "" ? null : value))
      .matches(/(AADHAR|PAN)/)
      .nullable(),

    idNumber: yup
      .string()
      .nullable()
      .when("idType", {
        is: "AADHAR",
        then: () =>
          yup
            .number()
            .min(100000000000, "Invalid Id Number")
            .max(999999999999, "Invalid Id Number")
            .typeError("Invalid Id Number"),
      })
      .when("idType", {
        is: "PAN",
        then: () =>
          yup
            .string()
            .length(10, "Invalid Id Number")
            .matches(/^[a-zA-Z0-9]+$/),
      })
      .when("idType", {
        is: null,
        then: () =>
          yup
            .string()
            .transform((value) => null)
            .nullable(),
      }),

    label: yup
      .string()
      .when("guardianName", {
        is: (guardianName) => !guardianName,
        then: () =>
          yup
            .string()
            .transform((value) => null)
            .nullable(),
      })
      .when("guardianName", {
        is: (guardianName) => guardianName,
        then: () => yup.string().required("Select Honorific(Mr,Mrs...)"),
      }),
    guardianName: yup.string(),
    email: yup.string().email(),
    emergencyContact: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .min(1000000000)
      .max(9999999999)
      .nullable(),

    address: yup.object().shape({
      address: yup.string(),
      state: yup.string(),
      city: yup.string(),
      country: yup.string(),
      pincode: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .min(100000)
        .max(999999)
        .nullable(),
    }),

    otherDetails: yup.object().shape({
      occupation: yup.string(),
      religion: yup.string(),
      maritalStatus: yup.string(),
      bloodGroup: yup.string(),
      nationality: yup.string(),
    }),
  });

  const onSubmit = async (values) => {
    console.log("Submit clicked");
    console.log(values);
    try {
      if (values?.guardianName) {
        values.guardianName =
          values.label.toString() + " " + values.guardianName.toString();
      }

      delete values.label;

      let response = await axios.post(process.env.REACT_APP_API_URL, values);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (values) => {
    console.log("Error");
    console.log(values);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center text-center ">
      <Form data={data} schema={schema} onSubmit={onSubmit} onError={onError} />
    </div>
  );
};

export default RegisterForm;
