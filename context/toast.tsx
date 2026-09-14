'use client'

import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type Toast = {
    uuid: string;
    message: string;
}

interface ToastContextType {
    ShowToast: (message: string) => void;
    CloseToast: (uuid: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const ShowToast = (message: string) => {
        const uuid = uuidv4 ();
        setToasts(prev => [...prev, { uuid: uuid, message: message }]);

        setTimeout(() => {
            CloseToast(uuid);
        }, 3000);
    }

    const CloseToast = (uuid: string) => {
        setToasts(prev => prev.filter(t => t.uuid != uuid));
    } 

    return (
        <ToastContext.Provider value={{
            ShowToast, CloseToast
        }}>
            <div>
                {toasts.map(toast => (
                    <div key={toast.uuid} className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
                        {toast.message}
                    </div>
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    )
}

const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used in provider");
    }
    return ctx;
}

export { ToastProvider, useToast }