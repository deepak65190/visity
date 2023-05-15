const mongoose=require("mongoose") ;
const VisitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    maxlength: 10,
  },
});
const visityModal =mongoose.model("item", VisitySchema);
module.exports={
    visityModal
}