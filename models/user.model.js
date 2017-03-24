var mongoose = require ('mongoose');

var Schema = mongoose.Schema;



var userSchema = new Schema ({
  github: {
    id: String,
    username:String,
    publicRepos: Number
  }
});

module.exports = mongoose.model('user', userSchema);
