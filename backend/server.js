import * as dotenv from "dotenv"
dotenv.config()

import express from "express";
import cors from "cors";
import {connectToDb} from "./config/connectToDb.js"
import {user} from "./model/userData.js"

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

connectToDb();

app.get('/users', async (req, res) => {
  const Users = await user.find();
  res.json({data: Users});
})

app.post('/users', async (req, res) => {
  const govId           = req.body.govId;
  const govIdNum        = req.body.govIdNum;
  const emergencyContact= req.body.emergencyContact;
  const mobile          = req.body.mobile;
  const sex             = req.body.sex;
  const age             = req.body.age;
  const name            = req.body.name;
  const genderLabel     = req.body.genderLabel;
  const email           = req.body.email;
  const address         = req.body.address;
  const stateName       = req.body.stateName;
  const cityName        = req.body.cityName;
  const countryName     = req.body.countryName;
  const pin             = req.body.pin;
  const occupation      = req.body.occupation;
  const religion        = req.body.religion;

  const User = await user.create({
    govId           : govId,
    govIdNum        : govIdNum,
    emergencyContact: emergencyContact,
    mobile          : mobile,
    sex             : sex,
    age             : age,
    name            : name,
    genderLabel     : genderLabel,
    email           : email,
    address         : address,
    stateName       : stateName,
    cityName        : cityName,
    countryName     : countryName,
    pin             : pin,
    occupation      : occupation,
    religion        : religion,
  });

  res.json({data: User});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
