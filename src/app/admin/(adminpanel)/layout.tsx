import type { Metadata } from "next";
import AdminNavbar from "../(adminpanel)/navbar/page";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel | Rajwadi Restaurant",
  description: "Generated by create next app",
};

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <AdminNavbar />
      <main className="w-4/5 bg-blue-500 fixed right-2 top-2">
        <Link href="/" target="_blank" className="absolute right-4 top-4 font-bold underline text-gray-100">View Site</Link>
        {children}
      </main>
    </section>
  );
}
