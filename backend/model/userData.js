import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  govId: String,
  govIdNum: String,
  emergencyContact: String,
  mobile: String,
  sex: String,
  age: String,
  name: String,
  genderLabel: String,
  email: String,
  address: String,
  stateName: String,
  cityName: String,
  countryName: String,
  pin: String,
  occupation: String,
  religion: String,
});

const user = mongoose.model("User", userSchema);

export {user}
