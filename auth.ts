import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/db";
import { User } from "./models/User";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new Error("please provide both email and password");
        }
        await connectDb();
        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("email and password invalid");
        }
        if (!user.password) {
          throw new Error("email and password invalid");
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
          throw new Error("passowrd didn't matched");
        }
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
