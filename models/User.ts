import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  //   whenever we are protectiong our route we will need this
  role: { type: String, default: "user" },
  image: { type: String },
  //   google and github providers
  authProviderId: { type: String },
});

export const User = models.User || model("User", userSchema);
