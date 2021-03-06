// khai bao thu vien
// khai bao cu phap, giong file xcmodel
// export no ra

var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var schemaOption = {
  toJSON: {
    virtuals: true
  }
};

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: "Book", required: true }, //reference to the associated book
    imprint: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Maintenance", "Loaned", "Reserved"],
      default: "Maintenance"
    },
    due_back: { type: Date, default: Date.now }
  },
  schemaOption
);

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function() {
  return "/bookinstance/" + this._id;
});

BookInstanceSchema.virtual("due_back_formatted").get(function() {
  return moment(this.due_back).format("MMMM Do, YYYY");
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function() {
  return moment(this.due_back).format("YYYY-MM-DD");
});

//Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
