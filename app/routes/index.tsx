import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Header from "~/components/Header";
import { getSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) return redirect("/login");

  return null;
};
export default function IndexPage() {
  return (
    <div>
      <Header />
    </div>
  );
}
