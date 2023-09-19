const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');
// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
    lowercase: true, // Converts email to lowercase,
    validate: [(value) => {}, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [4, "Minimum password length is 6 characters"] // Minimum password length of 4 characters
  },
});
 
//fire this function after a document has been saved
userSchema.post('save', function (doc, next){
  console.log("New User has been added to the database", doc);
  next();
})

//fire this function before a document has been saved
userSchema.pre('save', async function (next){
  //console.log("User about to be added to the database", this);
  //generate a salt
  let salt = await bcrypt.genSalt();
  //this refers to the instance of the user we are trying to create
  this.password =  await bcrypt.hash(this.password, salt);
  next();
})


//static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email});

  if (user) {
   const auth = await bcrypt.compare(password, user.password);

   if (auth) {
    return user;
   }
   throw Error('Incorrect password');
  }

  throw Error("Incorrect email"); 

}

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
