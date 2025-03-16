"use server";

import connectDb from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

const register = async (FormData: FormData) => {
  const firstName = FormData.get("firstname") as string;
  const lastName = FormData.get("lastname") as string;
  const email = FormData.get("email") as string;
  const password = FormData.get("password") as string;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all the field");
  }
  await connectDb();
  //   existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");
  const hashedPassword = await hash(password, 12);
  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log("user create succcessfully");
  redirect("/login");
};
export { register };
