import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthContext = {
  userId: string | null;
};

export async function createContext(): Promise<AuthContext> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return { userId: null };
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    return { userId: payload.userId };
  } catch {
    return { userId: null };
  }
}

// Em resumo, pego os cookies do navegador, checo se o jwt é valido, caso seja valido avança, caso não seja retorna nulo.
