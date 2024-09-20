import mongoose from "mongoose";

const connection =
  "mongodb+srv://Krishna:XVGYETFmKSoOd5ic@cluster0.rlvy4at.mongodb.net/?retryWrites=true&w=majority";

const Connect = () => {
  mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
};

export default Connect;
