import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

export default mongoose.model("document", schema);
