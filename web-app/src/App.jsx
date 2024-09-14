import { addLocale, locale, PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Table from "./Table";

const value = {
  locale: "vi",
};

addLocale("vi", {
  startsWith: "Bắt đầu với từ",
  contains: "Chứa từ",
  notContains: "Không chứa từ",
  endsWith: "Kết thúc với từ",
  equals: "Bằng",
  notEquals: "Không bằng",
  noFilter: "Không lọc",
  filter: "Lọc",
  lt: "Nhỏ hơn",
  lte: "Nhỏ hơn hoặc bằng",
  gt: "Lớn hơn",
  gte: "Lớn hơn hoặc bằng",
  dateIs: "Ngày",
  dateIsNot: "Không phải ngày",
  dateBefore: "Trước ngày",
  dateAfter: "Sau ngày",
  custom: "Tùy chỉnh",
  clear: "Xóa",
  apply: "Áp dụng",
  matchAll: "Khớp tất cả",
  matchAny: "Khớp bất kỳ",
  addRule: "Thêm điều kiện",
  removeRule: "Xóa điều kiện",
  accept: "Đồng ý",
  reject: "Từ chối",
  choose: "Chọn",
  upload: "Tải lên",
  cancel: "Hủy",
  dayNames: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  today: "Hôm nay",
  weekHeader: "Tuần",
  firstDayOfWeek: 1,
  dateFormat: "dd/mm/yy",
  weak: "Yếu",
  medium: "Trung bình",
  strong: "Mạnh",
  passwordPrompt: "Nhập mật khẩu",
  emptyMessage: "Không có kết quả",
  emptyFilterMessage: "Không có kết quả tìm kiếm",
});

function App() {
  return (
    <PrimeReactProvider value={value}>
      <Table />
    </PrimeReactProvider>
  );
}

export default App;
