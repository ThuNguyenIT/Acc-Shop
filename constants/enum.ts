export enum RoleName {
    SUPER_ADMIN = 'Quản trị viên cao cấp',
    ADMIN = 'Quản trị viên',
    ACCOUNTANT = 'Quản lý các vấn đề tài chính và thanh toán',
    MODERATOR = 'Kiểm duyệt nội dung tài khoản',
    SUPPORTER = 'Hỗ trợ kỹ thuật cho tài khoản',
    MARKETING = 'Chuyên viên tiếp thị và quảng bá',
    EDITOR = 'Chỉnh sửa và biên tập nội dung',
    AUTHOR = 'Tác giả viết truyện',
    TRANSLATOR = 'Dịch giả dịch nội dung truyện',
    VIP_USER = 'Tài khoản VIP với quyền lợi đặc biệt',
    CONTRIBUTOR = 'Cộng tác viên đóng góp nội dung',
    SPONSOR = 'Nhà tài trợ nội dung hoặc chương',
    BETA_READER = 'Độc giả thử nghiệm nội dung',
    READER = 'Độc giả thông thường',
}


export enum NovelStatus {
    OnGoing = 'Chưa hoàn thành',
    Completed = 'Hoàn thành',
    Paused = 'Tạm dừng',
    Dropped = 'Kết thúc',
    Licensed = 'Đã cấp phép',
    Cancelled = 'Đã hủy',
    Planned = 'Đang lên kế hoạch',
}
