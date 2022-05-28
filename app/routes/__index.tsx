import { Outlet } from "@remix-run/react";

export default function IndexPage() {
  return (
    <div className="h-screen bg-red-500">
      <Outlet />
    </div>
  );
}
