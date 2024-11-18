import type { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// import { Env } from './Env.mjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '',
          type: 'text',
        },
        password: {
          label: '',
          type: 'text',
        },
      },
      async authorize(credentials) {
        try {
          // TODO Login by credential
          if (credentials?.email && credentials?.password) {
            const res = {
              id: "abc",
            }
            return res;
          }
          return null;
        } catch (err: any) {
          console.error('Failed authorized ', err);
          throw new Error(err.message);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, trigger, session, user, profile, account }: any) {
      if (trigger === 'update') {
        return { ...token, user: session.user };
      }
      console.log('1.user', user);
      console.log('2.profile', profile);
      console.log('3.account', account);

      try {
        // TODO Login by google
        return token as unknown as any;
      } catch (er) {
        // console.log('1.....er', er);
        throw new Error();
      }
    },

    async session({ session, token }: { session: Session; token: any }) {
      // console.log('token', token);
      session.user = token.user;
      return session;
    },

    async signIn() {
      // console.log('user::', user);
      try {
        return true;
      } catch (err: any) {
        // console.log('err', err);
        throw new Error();
      }
    },
  },
};
