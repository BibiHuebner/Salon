import mongoose from "mongoose";
const { Schema } = mongoose;

//we create schema for documents

const bookSchema = new Schema({
  booktitle: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
});
//important: naming of first parameter: capital letter, singular
//vs.Collection in Mongo: plural - has to match
export default mongoose.model("Book", bookSchema);
