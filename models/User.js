const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  username: {
    type: String,
    minlength: 4,
    reuired: true,
    unique: true,
  },
  passwordHash: String,
  key: {
    type: String,
    default: "",
  },
});

schema.plugin(uniqueValidator);

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
    delete returnedObject.key;
  },
});

const User = mongoose.model("User", schema);
module.exports = User;
