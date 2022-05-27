import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession, commitSession } from "~/session";
import { useEffect } from "react";

export default function Login() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.error) alert(actionData.error);
  }, [actionData]);

  return (
    <div className="flex h-full items-center justify-center">
      <Form method="post" className="flex flex-col">
        <input className="rounded-t-md p-3" name="email" placeholder="email" />
        <input
          className="rounded-b-md p-3"
          name="password"
          placeholder="password"
          type="password"
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-indigo-300 px-3 py-2"
        >
          Login
        </button>
      </Form>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) return redirect("/");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (email !== "dan" || password !== "dan") {
    return { error: "Invalid credentials" };
  }

  session.set("userId", "dan");
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};
