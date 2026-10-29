
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

const requiredEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `Variável de ambiente em falta: ${key}`
    );
  }
}

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "database",
  },

  pages: {
    signIn: "/eCoinCloudWallet",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Aceitar caminhos relativos da própria aplicação.
      if (url.startsWith("/") && !url.startsWith("//")) {
        return `${baseUrl}${url}`;
      }

      // Aceitar URLs absolutas apenas da mesma origem.
      try {
        const parsedUrl = new URL(url);

        if (parsedUrl.origin === baseUrl) {
          return url;
        }
      } catch {
        // URL inválido: usar o destino padrão.
      }

      return `${baseUrl}/eCoinCloudWallet`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Evitar registos de depuração OAuth detalhados.
  debug: false,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
