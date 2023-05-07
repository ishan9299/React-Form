import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import axios from "axios";

const PHONE_NO_REGX = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const GENDER_OPTS = [
  {text: "Male",   value: "male"},
  {text: "Female", value: "female"},
  {text: "Other",  value: "other"},
]

const GOVID_OPTS = [
  {text: "Aadhar ID", value: "aadhar"},
  {text: "Pan",       value: "pan"},
]

const GENDER_LABEL = [
  {text: "Mr",  value: "mr"},
  {text: "Mrs", value: "mrs"},
  {text: "Dr",  value: "dr"},
]

const RELIGION = [
  {text: "Christian", value: "christian"},
  {text: "Muslim",    value: "muslim"},
  {text: "Atheist",   value: "atheist"},
  {text: "Hindu",     value: "hindu"},
  {text: "Buddhist",  value: "buddhist"},
  {text: "Other",     value: "other"},
]

const STATE_NAMES = [
  {text: "Andhra Pradesh",    value: "Andhra Pradesh"},
  {text: "Arunachal Pradesh", value: "Arunachal Pradesh"},
  {text: "Assam",             value: "Assam"},
  {text: "Bihar",             value: "Bihar"},
  {text: "Chhattisgarh",      value: "Chhattisgarh"},
  {text: "Goa",               value: "Goa"},
  {text: "Gujarat",           value: "Gujarat"},
  {text: "Haryana",           value: "Haryana"},
  {text: "Himachal Pradesh",  value: "Himachal Pradesh"},
  {text: "Jharkhand",         value: "Jharkhand"},
  {text: "Karnataka",         value: "Karnataka"},
  {text: "Kerala",            value: "Kerala"},
  {text: "Madhya Pradesh",    value: "Madhya Pradesh"},
  {text: "Maharashtra",       value: "Maharashtra"},
  {text: "Manipur",           value: "Manipur"},
  {text: "Meghalaya",         value: "Meghalaya"},
  {text: "Mizoram",           value: "Mizoram"},
  {text: "Nagaland",          value: "Nagaland"},
  {text: "Odisha",            value: "Odisha"},
  {text: "Punjab",            value: "Punjab"},
  {text: "Rajasthan",         value: "Rajasthan"},
  {text: "Sikkim",            value: "Sikkim"},
  {text: "Tamil Nadu",        value: "Tamil Nadu"},
  {text: "Telangana",         value: "Telangana"},
  {text: "Tripura",           value: "Tripura"},
  {text: "Uttar Pradesh",     value: "Uttar Pradesh"},
  {text: "Uttarakhand",       value: "Uttarakhand"},
  {text: "West Bengal",       value: "West Bengal"},
]

const MARITAL_STATS = [
  {text: "Married",   value: "married"},
  {text: "Unmarried", value: "unmarried"}
]

const BLOOD_GROUP = [
  {text: "A+",  value: "A+"},
  {text: "A-",  value: "A-"},
  {text: "B+",  value: "B+"},
  {text: "B-",  value: "B-"},
  {text: "O+",  value: "O+"},
  {text: "O-",  value: "O-"},
  {text: "AB+", value: "AB+"},
  {text: "AB-", value: "AB-"},
]

const schema = Yup
  .object({
    name: Yup.string().required("Name is required"),
    age: Yup.date().required("Date is required"),
    sex: Yup.string().oneOf(["male", "female", "other"])
    .required("Sex is required"),
    mobile: Yup.string().matches(PHONE_NO_REGX, {
      message: "Phone is not valid",
      excludeEmptyString: true
    }),
    emergencyContact: Yup.string().matches(PHONE_NO_REGX, {
      message: "Phone is not valid",
      excludeEmptyString: true
    }),
    govId: Yup.string().oneOf(["aadhar", "pan"], {
      exlcudeEmptyString: true
    }),
    govIdNum: Yup
    .string()
    .when("govId", {
      is: "aadhar",
      then: (schema) => schema.length(12),
      otherwise: (schema) => schema.length(10),
    })
  });

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({resolver: yupResolver(schema)});

  const onSubmitHandler = async (data) => {
    // console.log(JSON.stringify(data));
    console.log(data)
    const res = await axios.post("http://localhost:3000/users", data)
    console.log(res)
    // reset();
  };

  return (
      <form onSubmit={handleSubmit(onSubmitHandler)} method="POST">
        <h5>Personal Details</h5>

        <div className="details-section">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", {required: true})}/>
          {errors.name &&
              (<span className="field-error">
                {errors.name?.message}
              </span>)}
        </div>

        <div className="details-section">
          <label htmlFor="age">Date of Birth</label>
          <input
            type="date"
            {...register("age", {required: true})}/>
          {errors.age &&
              (<span className="field-error">
                {errors.age?.message}
              </span>)}
        </div>

        <div className="details-section">
          <label htmlFor="sex">Sex</label>
          <select {...register("sex", {required: true})}>
            <option value="">Enter Sex</option>
            {GENDER_OPTS.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          {errors.sex &&
              (<span className="field-error">
                {errors.sex?.message}
              </span>)}
        </div>

        <div className="details-section">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            placeholder="Enter Mobile"
            {...register("mobile")}/>
          {errors.mobile &&
              (<span className="field-error">
                {errors.mobile?.message}
              </span>)}
        </div>

        <div className="details-section">
          <label htmlFor="govtId">Govt Issued ID</label>
          <select name="govtId" {...register("govId")}>
            <option value="">ID Type</option>
            {GOVID_OPTS.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Govt ID"
            {...register("govIdNum")}/>
          {errors.govIdNum &&
              (<span className="field-error">
                {errors.govIdNum?.message}
              </span>)}
        </div>

        <h5>Contact Details</h5>

        <div className="details-section">
          <label htmlFor="guardianLabel">Guardian Details</label>
          <select name="guardianLabel" {...register("guardianLabel")}>
            <option value="">Enter Label</option>
            {GENDER_LABEL.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <input type="text" 
            placeholder="Enter Guardian Name"
            {...register("guardianName")}/>
        </div>

        <div className="details-section">
            <label htmlFor="email">Email</label>
            <input placeholder="Enter Email" {...register("email")}/>
        </div>

        <div className="details-section">
          <label htmlFor="emergencyContact">
            Emergency Contact Number
          </label>
          <input
            type="text"
            placeholder="Enter Emergency No."
            {...register("emergencyContact")}/>
          {errors.emergencyContact &&
              (<span className="field-error">
                {errors.emergencyContact?.message}
              </span>)}
        </div>

        <h5>Address Details</h5>

        <div className="details-section">
          <label htmlFor="address">Address</label>
          <input type="text"
            placeholder="Enter Address" {...register("address")}/>
        </div>

        <div className="details-section">
          <label htmlFor="stateName">State</label>
          <select name="stateName" {...register("stateName")}>
            <option value="">Enter State</option>
            {STATE_NAMES.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="details-section">
          <label htmlFor="cityName">City</label>
          <select name="cityName" {...register("cityName")}>
            <option value="">Enter City</option>
            <option value="kolkata">Kolkata</option>
          </select>
        </div>

        <div className="details-section">
          <label>Country</label>
          <select name="countryName" {...register("countryName")}>
            <option value="india" selected>India</option>
          </select>
        </div>

        <div className="details-section">
            <label>Pincode</label>
            <input placeholder="Enter pincode" {...register("pin")}/>
        </div>

        <h5>Other Details</h5>

        <div className="details-section">
          <label htmlFor="occupation">Occupation</label>
          <input placeholder="Enter occupation"
            {...register("occupation")}/>
        </div>

        <div className="details-section">
          <label htmlFor="religion">Religion</label>
          <select name="religion" {...register("religion")}>
            <option value="">Enter State</option>
            {RELIGION.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="details-section">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select name="maritalStatus" id="maritalStatus"
            {...register("maritalStatus")}>
            <option value="">Enter Marital Status</option>
            {MARITAL_STATS.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="details-section">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select name="bloodGroup" id="bloodGroup" {...register("bloodGroup")}>
            <option value="">Group</option>
            {BLOOD_GROUP.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="details-section">
          <label htmlFor="nationality">Nationality</label>
          <select name="nationality" id="nationality"
            {...register("nationality")}>
            <option value="india" selected>India</option>
          </select>
        </div>

        <input type="submit"/>
        <input type="reset"/>
      </form>
  );
}
