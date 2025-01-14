const userModel = require('../models/user.model')
const generateUniqueUsername = async (baseName) => {
  let username = baseName.toLowerCase().replace(/\s+/g, '');
  let isUsernameTaken = await userModel.findOne({ username });
  let count = 1;

  while (isUsernameTaken) {
    username = `${baseName.toLowerCase().replace(/\s+/g, '')}${count}`;
    isUsernameTaken = await userModel.findOne({ username });
    count++;
  }
  
  console.log('Generated Unique username: ', username);
  return username;
};

module.exports = {
  generateUniqueUsername,
};
