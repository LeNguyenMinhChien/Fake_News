# HƯỚNG DẪN SỬ DỤNG TRUSTCHECK

Ứng dụng TrustCheck có hai chức năng chính, được bố trí theo các tab:

1.  **Phân tích Nội dung**
    Tính năng này cho phép dán nội dung từ một bài đăng trên mạng xã hội (Facebook, Instagram, hoặc các nền tảng khác) để hệ thống AI phân tích và đánh giá khả năng chứa thông tin sai lệch.
    
    <img width="602" height="417" alt="image" src="https://github.com/user-attachments/assets/ce2a8d24-b060-42f8-8db6-7ab56ced30b9" />

3.  **Xác minh Nguồn**
    Tương tự với phân tích nội dung, tính năng này cho phép người dùng kiểm tra các nguồn tin khác nhau, để từ đó đánh giá độ tin cậy.
    
    <img width="563" height="233" alt="image" src="https://github.com/user-attachments/assets/1805fce7-537e-43b8-9422-b611adc44e77" />


---

## TÍNH NĂNG PHÂN TÍCH NỘI DUNG

Cách thực hiện:

1.  **Mở tab "Phân tích Nội dung".**
    
<img width="602" height="413" alt="image" src="https://github.com/user-attachments/assets/de7af250-06bf-4a6c-8da9-d51d0f2ac3d5" />
 
 *Dán nội dung:** Sao chép văn bản từ bài đăng cần kiểm tra và dán vào ô "Nội dung".
 
3.  **Chọn nền tảng:** Chọn nơi bạn thấy bài đăng (Facebook, Instagram hoặc Khác).
<img width="366" height="187" alt="image" src="https://github.com/user-attachments/assets/b12b6af2-0946-43e8-a72f-17ef364e11a2" />

4.  **Đính kèm hình ảnh (tùy chọn):** Nếu bài đăng có hình ảnh, có thể tải lên để AI phân tích cùng văn bản. Đây là bước không bắt buộc.
   <img width="351" height="83" alt="image" src="https://github.com/user-attachments/assets/cadc9b9b-45b2-485f-a80e-924ec11fa624" />
   
5.  **Nhấn nút "Phân tích".**
Kết quả trả về sẽ bao gồm:
<img width="588" height="354" alt="image" src="https://github.com/user-attachments/assets/08d11db6-7e56-478d-b9eb-ac21b0f9106f" />

*   **Đánh giá chung:** Khả năng cao là tin giả, đáng tin cậy, hoặc không chắc chắn.
*   **Độ tin cậy:** Mức độ tự tin của AI về đánh giá (tính theo %).
*   **Lý giải của AI:** Giải thích chi tiết lý do AI đưa ra kết luận.

---

## TÍNH NĂNG XÁC MINH NGUỒN

Cách thực hiện:

1.  **Mở tab "Xác minh Nguồn".**
<img width="602" height="251" alt="image" src="https://github.com/user-attachments/assets/92d07ab7-ecc8-4dbe-9e28-6283d608b80d" />

2.  **Nhập tên nguồn tin:** Gõ tên của hãng tin muốn kiểm tra vào ô "Tên Nguồn tin" (ví dụ: BBC News, Reuters, VnExpress...).
<img width="602" height="236" alt="image" src="https://github.com/user-attachments/assets/b4981319-61ca-4539-b2c4-224abedb6f48" />


4.  **Nhấn nút "Xác minh".**
Kết quả trả về sẽ bao gồm:

<img width="602" height="261" alt="image" src="https://github.com/user-attachments/assets/1dde4358-3d01-467f-94af-61422a8104d3" />

*   **Đánh giá uy tín:** Uy tín, không đáng tin cậy hoặc hỗn hợp.
*   **Điểm uy tín:** Con số từ 0 đến 100 thể hiện mức độ đáng tin cậy.
*   **Lý giải chi tiết:** Giải thích về lịch sử, phương pháp làm việc và các yếu tố ảnh hưởng đến uy tín của nguồn tin.
