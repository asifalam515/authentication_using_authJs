import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI as string);
    console.log(`successfully connected with uri ${process.env.MONGOOSE_URI}`);
  } catch (error: any) {
    console.log(`Error is : ${error.message}`);
  }
};
export default connectDb;
