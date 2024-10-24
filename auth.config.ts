import {
  Account,
  CredentialsSignin,
  NextAuthConfig,
  Profile,
  Session,
  User,
} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";

import { signJwt, verifyJwt } from "./lib/jwt";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<string, unknown>>, req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new CustomAuthError("Vui lòng nhập email và mật khẩu");
        }

        try {
          const user = await prisma.users.findUnique({
            where: { email },
            include: {
              model_has_roles: {
                include: {
                  role: {
                    include: {
                      role_permissions: {
                        include: {
                          permission: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (!user || !(await compare(password, user.password))) {
            throw new CustomAuthError("Email hoặc mật khẩu không hợp lệ");
          }

          if (user.is_verified === false) {
            throw new CustomAuthError("Tài khoản chưa được xác thực");
          }

          if (user.status === false) {
            throw new CustomAuthError("Tài khoản đã bị khóa");
          }

          const roles = user.model_has_roles.map((roleRelation) => {
            return {
              roleName: roleRelation.role.name,
              permissions: (roleRelation.role.role_permissions || []).map(
                (permissionRelation) => permissionRelation.permission.name
              ),
            };
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.full_name,
            mobile: user.mobile,
            image: user.avatar,
            social_network: user.social_network,
            is_verified: user.is_verified,
            status: user.status,
            type_user: user.type_user,
            roles,
          };
        } catch (error: any) {
          if (error instanceof ZodError)
            throw new CustomAuthError("Thông tin xác thực không hợp lệ");
          throw new CustomAuthError(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      trigger,
      isNewUser,
      session,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }) {
      return { ...token, ...user };
    },
    async session({
      session,
      token,
      newSession,
      trigger,
    }: {
      session: Session;
      token: JWT;
      newSession?: any;
      trigger?: "update";
    }) {
      return {
        ...session,
        ...token,
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    async encode({ token }) {
      const jwtPayload = {
        ...token,
        user_id: token?.sub ? parseInt(token.sub) : undefined,
        name: token?.name,
        avatar: token?.image,
        roles: token?.roles,
      };

      return signJwt(jwtPayload);
    },
    async decode({ token }) {
      return verifyJwt(token as string);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
