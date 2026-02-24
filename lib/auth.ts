import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo users — in production these would come from a database
// Passwords are compared directly since these are demo accounts.
const USERS = [
  {
    id: "1",
    username: "admin",
    name: "Admin User",
    email: "admin@ticketbot.dev",
    role: "admin",
    password: "admin",
  },
  {
    id: "2",
    username: "angel",
    name: "Angel",
    email: "angel@ticketbot.dev",
    role: "user",
    password: "angel",
  },
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = USERS.find(
          (u) => u.username === credentials.username.toLowerCase()
        );
        if (!user) return null;

        if (credentials.password !== user.password) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
