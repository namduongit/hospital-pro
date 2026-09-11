# 1. Enum

## AccountStatus — Trạng thái tài khoản

- `Active`: Tài khoản đang hoạt động và có thể đăng nhập/sử dụng hệ thống.
- `InActive`: Tài khoản bị vô hiệu hóa và không được sử dụng.

## RoleStatus — Trạng thái vai trò

- `Active`: Vai trò đang được sử dụng.
- `InActive`: Vai trò đã bị vô hiệu hóa.

## Gender — Giới tính

- `Other`: Giới tính khác.
- `Male`: Nam.
- `Female`: Nữ.

## PaymentMethod — Phương thức thanh toán

- `Cash`: Thanh toán bằng tiền mặt.
- `Momo`: Thanh toán qua MoMo.
- `QrCode`: Thanh toán bằng mã QR.

## AppointmentStatus — Trạng thái lịch hẹn

- `Pending`: Lịch hẹn đang chờ xác nhận.
- `Accepted`: Lịch hẹn đã được chấp nhận.
- `Completed`: Lịch hẹn đã hoàn thành.
- `Cancelled`: Lịch hẹn đã bị hủy.

## PaymentStatus — Trạng thái thanh toán

- `UnPaid`: Chưa thanh toán.
- `Paid`: Đã thanh toán.

## MedicineUnit — Đơn vị thuốc

- `Other`: Đơn vị khác.
- `Tablet`: Viên nén.
- `Capsule`: Viên nang.
- `Bottle`: Chai.
- `Tube`: Tuýp.
- `Box`: Hộp.
- `Pack`: Gói.
- `Ampoule`: Ống thuốc.
- `Vial`: Lọ thuốc.

## MedicineStatus — Trạng thái thuốc

- `Active`: Thuốc đang được sử dụng/kinh doanh.
- `Inactive`: Thuốc đã bị vô hiệu hóa.

## DosageType — Cách sử dụng thuốc

- `Other`: Cách sử dụng khác.
- `Oral`: Uống trực tiếp.
- `Dissolve`: Hòa tan trước khi sử dụng.
- `Topical`: Dùng ngoài da.
- `Injection`: Tiêm.

## MedicineSource — Nguồn thuốc

- `InHouse`: Thuốc được cung cấp/lưu trữ nội bộ.
- `External`: Thuốc có nguồn từ bên ngoài.

## PrescriptionStatus — Trạng thái đơn thuốc

- `UnPaid`: Đơn thuốc chưa được thanh toán.
- `Paid`: Đơn thuốc đã được thanh toán.
- `Cancelled`: Đơn thuốc đã bị hủy.

## ImportTicketStatus — Trạng thái phiếu nhập

- `Pending`: Phiếu nhập đang chờ xử lý.
- `Completed`: Phiếu nhập đã hoàn thành.
- `Cancelled`: Phiếu nhập đã bị hủy.

## ExportTicketStatus — Trạng thái phiếu xuất

- `Pending`: Phiếu xuất đang chờ xử lý.
- `Completed`: Phiếu xuất đã hoàn thành.
- `Cancelled`: Phiếu xuất đã bị hủy.

## PermissionAction — Hành động quyền

- `View`: Xem dữ liệu.
- `Add`: Thêm dữ liệu.
- `Edit`: Chỉnh sửa dữ liệu.
- `Delete`: Xóa dữ liệu.

## TimeSlotStatus — Trạng thái khung giờ

- `Active`: Khung giờ đang được sử dụng.
- `InActive`: Khung giờ không còn được sử dụng.

## DistributorStatus — Trạng thái nhà phân phối

- `Active`: Nhà phân phối đang hoạt động.
- `InActive`: Nhà phân phối đang bị vô hiệu hóa.

---

# 2. Table

## **Table: Role - Vai trò**

- `Uuid`: Định danh duy nhất của vai trò.
- `Name`: Tên vai trò, ví dụ: Admin, Doctor, Staff.
- `Desc`: Mô tả vai trò.
- `Status`: Trạng thái của vai trò.

## **Table: RolePermission - Quyền của vai trò**

- `Uuid`: Định danh duy nhất của bản ghi quyền.
- `RoleUuid`: Tham chiếu đến vai trò được cấp quyền.
- `PermissionUuid`: Tham chiếu đến quyền được cấp.
- `Action`: Hành động mà vai trò được phép thực hiện.

Bảng này kết hợp `Role` và `Permission`, đồng thời xác định hành động cụ thể mà role có thể thực hiện.

## **Table: Permission - Quyền**

- `Uuid`: Định danh duy nhất của quyền.
- `Name`: Tên quyền.
- `Desc`: Mô tả quyền.
- `Endpoint`: Endpoint/API hoặc tài nguyên mà quyền áp dụng.

Ví dụ: quyền quản lý tài khoản có thể áp dụng cho endpoint liên quan đến Account.

## **Table: Account - Tài khoản người dùng**

- `Uuid`: Định danh duy nhất của tài khoản.
- `Email`: Email dùng để đăng nhập.
- `Password`: Mật khẩu của tài khoản.
- `RoleUuid`: Vai trò của tài khoản.
- `Status`: Trạng thái tài khoản.

Mỗi `Account` thuộc về một `Role`.

## **Table: PatientProfile - Hồ sơ bệnh nhân**

- `Uuid`: Định danh duy nhất của hồ sơ bệnh nhân.
- `AccountUuid`: Tài khoản liên kết với hồ sơ bệnh nhân.
- `Image`: Ảnh đại diện của bệnh nhân.
- `Name`: Họ và tên bệnh nhân.
- `Gender`: Giới tính.
- `Address`: Địa chỉ.
- `Phone`: Số điện thoại.
- `Email`: Email liên hệ.
- `MedicalCode`: Mã bệnh nhân/mã hồ sơ y tế.

## **Table: DoctorProfile - Hồ sơ bác sĩ**

- `Uuid`: Định danh duy nhất của hồ sơ bác sĩ.
- `Image`: Ảnh đại diện bác sĩ.
- `Name`: Họ và tên bác sĩ.
- `Gender`: Giới tính.
- `AverageStar`: Điểm đánh giá trung bình của bác sĩ.
- `Visit`: Số lượt khám/lượt truy cập tùy theo nghiệp vụ của hệ thống.
- `ViewDepartment`: Thông tin khoa/phòng ban được hiển thị.
- `IsFeatured`: Xác định bác sĩ có được đánh dấu nổi bật hay không.
- `AccountUuid`: Tài khoản liên kết với bác sĩ.
- `HospitalUuid`: Bệnh viện mà bác sĩ thuộc về.

Mỗi bác sĩ thuộc về một bệnh viện.

## **Table: Hospital - Bệnh viện**

- `Uuid`: Định danh duy nhất của bệnh viện.
- `Image`: Hình ảnh đại diện của bệnh viện.
- `Name`: Tên bệnh viện.
- `Address`: Địa chỉ bệnh viện.
- `Hotline`: Số điện thoại hotline.
- `Markdown`: Nội dung mô tả/markdown của bệnh viện.
- `IsFeatured`: Xác định bệnh viện có được đánh dấu nổi bật hay không.

## **Table: Department - Khoa/phòng ban**

- `Uuid`: Định danh duy nhất của khoa/phòng ban.
- `Icon`: Icon đại diện cho khoa/phòng ban.
- `Name`: Tên khoa/phòng ban.
- `Desc`: Mô tả khoa/phòng ban.
- `IsFeatured`: Xác định khoa/phòng ban có được đánh dấu nổi bật hay không.

## **Table: HospitalDepartment - Khoa thuộc bệnh viện**

- `Uuid`: Định danh duy nhất của bản ghi.
- `HospitalUuid`: Bệnh viện.
- `DepartmentUuid`: Khoa/phòng ban.

Bảng này biểu diễn quan hệ giữa `Hospital` và `Department`.

## **Table: DoctorDepartment - Bác sĩ thuộc khoa**

- `Uuid`: Định danh duy nhất của bản ghi.
- `DoctorUuid`: Bác sĩ.
- `DepartmentUuid`: Khoa/phòng ban.

Bảng này biểu diễn quan hệ giữa `DoctorProfile` và `Department`.

## **Table: Appointment - Lịch hẹn khám**

- `Uuid`: Định danh duy nhất của lịch hẹn.
- `Name`: Tên người đặt lịch.
- `Gender`: Giới tính.
- `Email`: Email liên hệ.
- `Phone`: Số điện thoại liên hệ.
- `Address`: Địa chỉ.
- `MedicalCode`: Mã bệnh nhân/hồ sơ y tế.
- `Reason`: Lý do khám.
- `StartTime`: Thời gian bắt đầu khám.
- `EndTime`: Thời gian kết thúc khám.
- `Status`: Trạng thái lịch hẹn.
- `PaymentMethod`: Phương thức thanh toán.
- `PaymentStatus`: Trạng thái thanh toán.
- `DoctorUuid`: Bác sĩ được đặt lịch.
- `PatientUuid`: Bệnh nhân đặt lịch.

## **Table: Medicine - Thuốc**

- `Uuid`: Định danh duy nhất của thuốc.
- `Name`: Tên thuốc.
- `BarCode`: Mã vạch của thuốc.
- `DefaultInstruction`: Hướng dẫn sử dụng mặc định.
- `Stock`: Số lượng thuốc hiện có trong kho.
- `Price`: Giá thuốc.
- `Unit`: Đơn vị thuốc.
- `Status`: Trạng thái thuốc.

## **Table: Prescription - Đơn thuốc**

- `Uuid`: Định danh duy nhất của đơn thuốc.
- `PatientUuid`: Bệnh nhân nhận đơn thuốc.
- `DoctorUuid`: Bác sĩ kê đơn.
- `TotalPrice`: Tổng tiền của đơn thuốc.
- `Reason`: Lý do kê đơn.
- `Note`: Ghi chú.
- `Status`: Trạng thái thanh toán của đơn thuốc.
- `CreatedDate`: Ngày tạo đơn thuốc.

## **Table: PrescriptionItem - Chi tiết đơn thuốc**

- `Uuid`: Định danh duy nhất của chi tiết đơn thuốc.
- `PrescriptionUuid`: Đơn thuốc chứa thuốc này.
- `MedicineUuid`: Thuốc được kê.
- `Price`: Giá thuốc tại thời điểm kê đơn.
- `Quantity`: Số lượng thuốc.
- `Dosage`: Cách sử dụng thuốc.
- `Frequency`: Tần suất sử dụng.
- `Instruction`: Hướng dẫn sử dụng cụ thể.
- `Source`: Nguồn thuốc.

## **Table: Distributor - Nhà phân phối**

- `Uuid`: Định danh duy nhất của nhà phân phối.
- `Name`: Tên nhà phân phối.
- `Address`: Địa chỉ.
- `Phone`: Số điện thoại.
- `ImportQuantity`: Số lượng thuốc đã nhập từ nhà phân phối.
- `Status`: Trạng thái nhà phân phối.

## **Table: ImportTicket - Phiếu nhập thuốc**

- `Uuid`: Định danh duy nhất của phiếu nhập.
- `Name`: Tên người/đơn vị liên quan đến phiếu nhập.
- `Phone`: Số điện thoại liên hệ.
- `Email`: Email liên hệ.
- `Note`: Ghi chú.
- `TotalPrice`: Tổng tiền nhập.
- `TotalQuantity`: Tổng số lượng thuốc nhập.
- `Status`: Trạng thái phiếu nhập.
- `CreatedDate`: Ngày tạo phiếu nhập.
- `AccountUuid`: Tài khoản tạo/xử lý phiếu nhập.

## **Table: ImportTicketItem - Chi tiết phiếu nhập**

- `Uuid`: Định danh duy nhất của chi tiết phiếu nhập.
- `Quantity`: Số lượng thuốc nhập.
- `Price`: Giá nhập.
- `ImportTicketUuid`: Phiếu nhập chứa chi tiết này.
- `MedicineUuid`: Thuốc được nhập.
- `DistributorUuid`: Nhà phân phối cung cấp thuốc.

## **Table: ExportTicket - Phiếu xuất thuốc**

- `Uuid`: Định danh duy nhất của phiếu xuất.
- `Name`: Tên người/đơn vị liên quan đến phiếu xuất.
- `Phone`: Số điện thoại liên hệ.
- `Email`: Email liên hệ.
- `Note`: Ghi chú.
- `TotalPrice`: Tổng giá trị phiếu xuất.
- `TotalQuantity`: Tổng số lượng thuốc xuất.
- `Status`: Trạng thái phiếu xuất.
- `CreatedDate`: Ngày tạo phiếu xuất.
- `AccountUuid`: Tài khoản tạo/xử lý phiếu xuất.

## **Table: ExportTicketItem - Chi tiết phiếu xuất**

- `Uuid`: Định danh duy nhất của chi tiết phiếu xuất.
- `Quantity`: Số lượng thuốc xuất.
- `MedicineUuid`: Thuốc được xuất.
- `ExportTicketUuid`: Phiếu xuất chứa chi tiết này.

## **Table: ReviewHospital - Đánh giá bệnh viện**

- `Uuid`: Định danh duy nhất của đánh giá.
- `PatientUuid`: Bệnh nhân thực hiện đánh giá.
- `Avatar`: Ảnh đại diện được hiển thị.
- `Name`: Tên người đánh giá được hiển thị.
- `Address`: Địa chỉ được hiển thị.
- `Content`: Nội dung đánh giá.
- `NumberOfStar`: Số sao đánh giá.
- `IsFeatured`: Xác định đánh giá có được chọn làm đánh giá nổi bật hay không.

## **Table: ReviewDoctor - Đánh giá bác sĩ**

- `Uuid`: Định danh duy nhất của đánh giá.
- `DoctorUuid`: Bác sĩ được đánh giá.
- `PatientUuid`: Bệnh nhân thực hiện đánh giá.
- `Avatar`: Ảnh đại diện được hiển thị.
- `Name`: Tên người đánh giá được hiển thị.
- `Address`: Địa chỉ được hiển thị.
- `Content`: Nội dung đánh giá.
- `NumberOfStar`: Số sao đánh giá.
- `IsFeatured`: Xác định đánh giá có được chọn làm đánh giá nổi bật hay không.

## **Table: TimeSlot - Khung giờ khám**

- `Uuid`: Định danh duy nhất của khung giờ.
- `StartTime`: Thời gian bắt đầu.
- `EndTime`: Thời gian kết thúc.
- `Status`: Trạng thái khung giờ.

Ví dụ: `08:00 - 08:30`, `08:30 - 09:00`.

## **Table: DoctorSchedule - Lịch làm việc của bác sĩ**

- `Uuid`: Định danh duy nhất của lịch làm việc.
- `TimeSlotUuid`: Khung giờ làm việc.
- `DoctorUuid`: Bác sĩ sử dụng khung giờ.

Bảng này liên kết bác sĩ với các khung giờ làm việc.

---

# 3. Relationships / References

## Role — RolePermission — Permission

- `RolePermission.RoleUuid > Role.Uuid`
  - Một `Role` có thể có nhiều `RolePermission`.
- `RolePermission.PermissionUuid > Permission.Uuid`
  - Một `Permission` có thể được cấp cho nhiều `Role`.

=> `Role` và `Permission` có quan hệ nhiều-nhiều thông qua `RolePermission`.

## Role — Account

- `Account.RoleUuid > Role.Uuid`

=> Một `Role` có thể được sử dụng bởi nhiều `Account`, mỗi `Account` thuộc một `Role`.

## Account — PatientProfile

- `PatientProfile.AccountUuid - Account.Uuid`

=> Một tài khoản có thể liên kết 1-1 với hồ sơ bệnh nhân theo thiết kế hiện tại.

## Account — DoctorProfile

- `DoctorProfile.AccountUuid - Account.Uuid`

=> Một tài khoản có thể liên kết 1-1 với hồ sơ bác sĩ theo thiết kế hiện tại.

## Hospital — DoctorProfile

- `DoctorProfile.HospitalUuid > Hospital.Uuid`

=> Một bệnh viện có nhiều bác sĩ, mỗi bác sĩ thuộc một bệnh viện.

## Hospital — Department

- `HospitalDepartment.HospitalUuid > Hospital.Uuid`
- `HospitalDepartment.DepartmentUuid > Department.Uuid`

=> `Hospital` và `Department` có quan hệ nhiều-nhiều thông qua `HospitalDepartment`.

## Doctor — Department

- `DoctorDepartment.DoctorUuid > DoctorProfile.Uuid`
- `DoctorDepartment.DepartmentUuid > Department.Uuid`

=> `DoctorProfile` và `Department` có quan hệ nhiều-nhiều thông qua `DoctorDepartment`.

## Appointment — Doctor / Patient

- `Appointment.DoctorUuid > DoctorProfile.Uuid`
- `Appointment.PatientUuid > PatientProfile.Uuid`

=> Một bác sĩ có nhiều lịch hẹn và một bệnh nhân có thể có nhiều lịch hẹn.

## Prescription — Doctor / Patient

- `Prescription.PatientUuid > PatientProfile.Uuid`
- `Prescription.DoctorUuid > DoctorProfile.Uuid`

=> Một bác sĩ có thể kê nhiều đơn thuốc và một bệnh nhân có thể có nhiều đơn thuốc.

## Prescription — PrescriptionItem — Medicine

- `PrescriptionItem.PrescriptionUuid > Prescription.Uuid`
- `PrescriptionItem.MedicineUuid > Medicine.Uuid`

=> Một đơn thuốc có nhiều chi tiết thuốc; một loại thuốc có thể xuất hiện trong nhiều đơn thuốc.

## ImportTicket — Account

- `ImportTicket.AccountUuid > Account.Uuid`

=> Một tài khoản có thể tạo/xử lý nhiều phiếu nhập.

## ImportTicket — ImportTicketItem — Medicine / Distributor

- `ImportTicketItem.ImportTicketUuid > ImportTicket.Uuid`
- `ImportTicketItem.MedicineUuid > Medicine.Uuid`
- `ImportTicketItem.DistributorUuid > Distributor.Uuid`

=> Phiếu nhập có nhiều chi tiết; mỗi chi tiết xác định thuốc và nhà phân phối.

## ExportTicket — Account

- `ExportTicket.AccountUuid > Account.Uuid`

=> Một tài khoản có thể tạo/xử lý nhiều phiếu xuất.

## ExportTicket — ExportTicketItem — Medicine

- `ExportTicketItem.ExportTicketUuid > ExportTicket.Uuid`
- `ExportTicketItem.MedicineUuid > Medicine.Uuid`

=> Phiếu xuất có nhiều chi tiết thuốc.

## ReviewHospital — Patient

- `ReviewHospital.PatientUuid > PatientProfile.Uuid`

=> Một bệnh nhân có thể đánh giá nhiều bệnh viện.

## ReviewDoctor — Patient / Doctor

- `ReviewDoctor.PatientUuid > PatientProfile.Uuid`
- `ReviewDoctor.DoctorUuid > DoctorProfile.Uuid`

=> Một bệnh nhân có thể đánh giá nhiều bác sĩ; một bác sĩ có thể nhận nhiều đánh giá.

## DoctorSchedule — Doctor / TimeSlot

- `DoctorSchedule.DoctorUuid > DoctorProfile.Uuid`
- `DoctorSchedule.TimeSlotUuid > TimeSlot.Uuid`

=> Một bác sĩ có thể có nhiều khung giờ làm việc; một khung giờ có thể được sử dụng trong nhiều lịch làm việc của bác sĩ.