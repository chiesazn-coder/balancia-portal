
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// ... import Credentials jika masih mau dipakai

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider tetap bisa di sini kalau mau double method
  ],
  pages: {
    signIn: '/login',
  }
});

export { handler as GET, handler as POST };