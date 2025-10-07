import { cookies } from "next/headers";
import DashBoard from "./Dashboard/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // 👈 comes from AuthProvider cookie
  if (!token) {
    redirect("/AuthPage");
  }
  return <DashBoard />;
}
