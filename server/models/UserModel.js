const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    address: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  { _id: false }
);

const OtherDetailsSchema = new mongoose.Schema(
  {
    occupation: { type: String },
    religion: { type: String },
    maritialStatus: { type: String },
    bloodGroup: { type: String },
    nationality: { type: String },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name Required"] },
  age: { type: Number, required: [true, "Age Required"] },
  sex: { type: String, required: [true, "Sex field cannot be empty"] },

  mobile: { type: Number, min: 1000000000, max: 9999999999 },
  idType: { type: String },
  idNumber: { type: String },

  gaurdianName: { type: String },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  emergencyContact: { type: Number, min: 1000000000, max: 9999999999 },

  address: { type: AddressSchema },
  otherDetails: { type: OtherDetailsSchema },
});

UserSchema.path("idType").validate(function (value) {
  if (value === "AADHAR" || value === "PAN" || value === null) return true;
  return false;
}, "Invalid ID Type");

UserSchema.path("idNumber").validate(function (value) {
  if (this.idType === "AADHAR") return value.length === 12 && !isNaN(value);
  else if (this.idType === "PAN")
    return value.length === 10 && /^[a-zA-Z0-9]+$/.test(value);
  else if (this.idType === null && value === null) return true;
  else return false;
}, "Invalid  ID Number");

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
