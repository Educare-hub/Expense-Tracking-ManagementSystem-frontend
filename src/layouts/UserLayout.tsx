import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1 p-4">
      <Outlet /> {/* Nested routes render here */}
    </main>
  </div>
);

export default UserLayout;
