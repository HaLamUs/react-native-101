var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemOption = {
  toJSON: {
    virtuals: true
  }
};

var GenreSchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 100 }
  },
  schemOption
);

GenreSchema.virtual("url").get(function() {
  return "/genre/" + this._id;
});

module.exports = mongoose.model("Genre", GenreSchema);
