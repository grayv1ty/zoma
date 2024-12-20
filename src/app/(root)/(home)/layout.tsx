import { Metadata } from "next";
import React, { ReactNode } from "react";

import Navbar from "@/components/root/Navbar";
import Sidebar from "@/components/root/Sidebar";

export const metadata: Metadata = {
  title: "SOOM",
  description: "A workspace for your team",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
