import React from "react";
import Sidebar from "./components/layout/Sidebar";
import AccountState from "./components/ui/AccountState";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 bg-white">
                <AccountState />

                <main className="p-5">
                    {children}
                </main>
            </div>
        </div>
    )
}