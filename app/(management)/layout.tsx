import React from "react";
import Sidebar from "./components/layout/Sidebar";
import AccountState from "./components/ui/AccountState";
import { ToastProvider } from "@/context/toast";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ToastProvider>
            <div className="flex h-screen">
                <Sidebar />

                <div className="flex-1 bg-white h-full overflow-y-auto">
                    <AccountState />

                    <main className="p-5">
                        {children}
                    </main>
                </div>
            </div>
        </ToastProvider>
    )
}