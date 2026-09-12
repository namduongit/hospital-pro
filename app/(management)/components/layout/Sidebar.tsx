const Sidebar = () => {
    return (
        <aside className="text-white bg-[#07275A] py-3">
            <div className="text-3xl px-8 py-2 font-semibold">
                <span>Logo</span>
                <span className="text-[#00C491]">Here</span>
            </div>
            <div className="space-y-6 py-4 ps-2 text-white">
                <section>
                    <div className="space-y-1">
                        <a asp-controller="Home"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition hover:bg-[#093373]">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-house w-5 text-center"></i>
                                <span>Trang chủ</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>
                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-chart-simple w-5 text-center"></i>
                                <span>Thống kê</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </section>

                <section>
                    <div className="space-y-1">
                        <a href="/pages/admin-account"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition hover:bg-[#093373]">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-user-gear w-5 text-center"></i>
                                <span>Tài khoản</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="/pages/admin-role"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition  hover:bg-[#093373]">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-shield-halved w-5 text-center"></i>
                                <span>Phân quyền</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="/pages/admin-permission"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition hover:bg-[#093373]">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-key w-5 text-center"></i>
                                <span>Quyền hạn</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-tags w-5 text-center"></i>
                                <span>Thuộc tính</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-box-open w-5 text-center"></i>
                                <span>Sản phẩm</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                    </div >
                </section >

                <section>
                    <div className="space-y-1">
                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-file-invoice w-5 text-center"></i>
                                <span>Hóa đơn</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-clock-rotate-left w-5 text-center"></i>
                                <span>Lịch sử hóa đơn</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                    </div>
                </section>

                <section>
                    <div className="space-y-1">
                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-gear w-5 text-center"></i>
                                <span>Hệ thống</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-bell w-5 text-center"></i>
                                <span>Thông báo</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                        <a href="#"
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium transition">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-lock w-5 text-center"></i>
                                <span>Bảo mật</span>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </a>

                    </div>
                </section>
            </div >
        </aside >

    )
}

export default Sidebar;
