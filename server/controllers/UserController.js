const UserModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).send(users);
};

const getPaginatedUsers = async (req, res) => {
  let page = Number(req.params.pageNumber) || 1;
  let limit = Number(req.query.limit) || 8;
  let skip = (page - 1) * limit;

  const users = await UserModel.find().skip(skip).limit(limit);

  res.status(200).send(users);
};

const saveUser = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  UserModel.create(data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
module.exports = { getUsers, saveUser, getPaginatedUsers };
