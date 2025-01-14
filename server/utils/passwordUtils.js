const bcrypt = require("bcryptjs");

const hashPassword = async (password) => bcrypt.hash(password, 10);
const comparePassword = async (inputPassword, hashedPassword) => bcrypt.compare(inputPassword, hashedPassword);

module.exports = { hashPassword, comparePassword };