const AccountState = () => {
    return (
        <div className="flex justify-end items-center p-2 bg-white shadow">
            <div className="relative">
                <button type="button"
                    className="flex items-center gap-3 rounded px-2 py-1.5 text-left transition hover:bg-gray-100">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07275A] text-sm font-semibold text-white">
                        D
                    </span>
                    <span className="hidden sm:block">
                        <span className="block text-sm font-semibold leading-5 text-gray-800">Nguyễn Nam Dương</span>
                        <span className="block text-xs leading-4 text-gray-500">Quản trị viên</span>
                    </span>
                    <i className="fa-solid fa-chevron-down text-xs text-gray-400 transition"></i>
                </button>
            </div>

            <div className="hidden absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded border border-gray-200 bg-white text-sm text-gray-700 shadow">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="truncate font-semibold text-gray-900">nguyennamduong205@gmail.com</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Đang hoạt động
                    </p>
                </div>

                <div className="p-1.5">
                    <a href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-gray-100">
                        <i className="fa-solid fa-globe w-5 text-center text-gray-400"></i>
                        <span>Client Page</span>
                    </a>
                    <a href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-gray-100">
                        <i className="fa-solid fa-cloud w-5 text-center text-gray-400"></i>
                        <span>GMS Cloud</span>
                    </a>
                </div>

                <div className="border-t border-gray-100 p-1.5">
                    <a href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 transition hover:bg-red-50">
                        <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
                        <span>Đăng xuất</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AccountState;