import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLayoutStore } from "@/lib"

export default function StoryChapter() {
    const { textColor } = useLayoutStore()
    return (
        <div className="mx-auto bg-transparent text-gray-300">
            <CardHeader className="space-y-1 p-4">
                <CardTitle className="text-2xl font-medium text-male-blue text-center">
                    Ngã Hữu Chư Thiên Vạn
                </CardTitle>
                <p className="text-sm text-gray-400 text-center">Tác giả: <span className="text-15px text-male-blue">Bạch Phật Lăng</span> </p>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <h2 className="text-xl font-bold text-custom-gray text-center mb-6">
                    Chương 5: Vạn nhất nếm đi mạng nhỏ làm thế nào
                </h2>
                <div className={`text-[${textColor}] grid gap-y-4 text-justify`}>

                    <p>
                        Cái kia mộc kiếm vừa rơi xuống nhập trong nồi, không có có cái gì đặc biệt biến hóa, Bạch Tiểu Thuần khẽ di một
                        tiếng, không cam lòng mở to mắt, cẩn thận nhìn chằm chằm vào mộc kiếm.
                    </p>
                    <p>
                        Có thể đợt cả buổi, thủy chung không thấy có cái gì chuyện kỳ dị phát sinh, Bạch Tiểu Thuần hơi suy nghĩ một chút,
                        mắt nhìn Quỷ vân nồi bên trên đường vân, lại nhìn một chút bếp lò bên trong mảnh gỗ tro tàn, như có điều suy nghĩ,
                        quay người ra gian phòng, một lát sau khi trở về, trong tay đã hơn nhiều mấy khối cùng lúc trước bếp lò bên trong
                        giống nhau mảnh gỗ.
                    </p>
                    <p>
                        Cái này mảnh gỗ tại Phòng Bếp bên trong cũng không phải đặc biệt vật tầm thường, hắn hãy tìm rồi Trương Đại Bàn
                        mới muốn đi một tí.
                    </p>
                    <p>
                        Đem mảnh gỗ nhen nhóm, Bạch Tiểu Thuần lập tức chứng kiến Quỷ vân nồi bên trên đầu thử nhất đường vân, lần
                        nữa sáng lên, mà cái kia gỗ lửa cấp tốc thiêu đốt, dần dần đắp tắt, Bạch Tiểu Thuần tâm thần khẽ động lúc, trong nồi
                        mộc kiếm đột nhiên ngân quang chói mắt.
                    </p>
                    <p>
                        Bạch Tiểu Thuần lui về phía sau vài bước, không bao lâu hào quang tiêu tán, hắn lập tức cảm nhận được một cỗ lãng
                        lệ ác liệt chi ý từ trong nồi truyền ra.
                    </p>
                    <p>
                        Hắn thở sâu, cẩn thận tới gần, thấy được trong nồi mộc kiếm, xuất hiện một đạo cùng Linh Mễ giống nhau dấy, chói
                        mắt ngân vân, nay vẫn đang từ từ ẩn đi, cuối cùng đã trở thành ám ngân sắc!
                    </p>
                    <p>
                        Toàn bộ thân kiếm đều cùng lúc trước thoáng bất đồng, mặc dù hay vẫn là bằng gỗ, nhưng lại làm cho người ta một
                        loại kim loại sắc bén chi ý, Bạch Tiểu Thuần hai mắt tỏa sáng, tiến lên cẩn thận đem cái thanh này mộc kiếm lấy ra,
                        cảm giác nặng một ít, bất quá chỉ có loại hàm mang bức người cảm giác.
                    </p>
                    <p>
                        "Đã thành, cái này mộc kiếm thành công Luyện Linh một lần." Bạch Tiểu Thuần cười hì, cầm lấy mộc kiếm yêu thích
                        không buông tay, lại nhìn một chút cái kia nồi nấu, suy nghĩ vật ấy nên xử trí như thế nào, cuối cùng quyết định liền để
                        ở chỗ này, càng là như thế, lại càng là không có người để ý.
                    </p>
                </div>
            </CardContent>
        </div>
    )
}