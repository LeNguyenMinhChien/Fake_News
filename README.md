# TrustCheck: AI-Powered Misinformation Detector

Đây là một ứng dụng Next.js được thiết kế để giúp người dùng xác định thông tin sai lệch tiềm ẩn trên các nền tảng mạng xã hội. Ứng dụng tận dụng sức mạnh của mô hình AI Gemini của Google thông qua Genkit để phân tích nội dung văn bản, phương tiện đính kèm và xác minh uy tín của các nguồn tin tức, tất cả đều bằng tiếng Việt.

## Tính năng chính

- **Phân tích Nội dung:** Dán nội dung từ mạng xã hội (và tùy chọn tải lên hình ảnh) để nhận đánh giá từ AI về khả năng nội dung đó có phải là thông tin sai lệch hay không.
- **Xác minh Nguồn tin:** Nhập tên của một hãng tin hoặc tổ chức để kiểm tra mức độ uy tín của họ, dựa trên đánh giá của AI.
- **Giao diện song ngữ:** Giao diện người dùng được thiết kế bằng tiếng Việt.

## Công nghệ sử dụng

Dự án này được xây dựng trên một ngăn xếp công nghệ hiện đại:

- **Framework:** [Next.js](https://nextjs.org/) (với App Router)
- **Ngôn ngữ:** TypeScript
- **Giao diện (UI):** [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), và [ShadCN UI](https://ui.shadcn.com/)
- **Trí tuệ nhân tạo (AI):** [Genkit (Google)](https://firebase.google.com/docs/genkit) để điều phối các luồng AI và [Google Gemini](https://ai.google.dev/) làm mô hình nền tảng.

## Bắt đầu

Để chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau.

### Yêu cầu tiên quyết

- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- `npm` hoặc `yarn`

### Cài đặt và Chạy ứng dụng

1.  **Sao chép và cài đặt các thư viện:**

    Mở terminal và chạy lệnh sau để cài đặt tất cả các thư viện cần thiết được liệt kê trong `package.json`.

    ```bash
    npm install
    ```

2.  **Cấu hình Khóa API:**

    Ứng dụng này cần một khóa API Google Gemini để thực hiện các lệnh gọi AI.

    -   Tạo một tệp mới có tên là `.env` trong thư mục gốc của dự án.
    -   Thêm dòng sau vào tệp `.env`, thay thế `"YOUR_API_KEY"` bằng khóa API thực của bạn:

    ```
    GEMINI_API_KEY="YOUR_API_KEY"
    ```

    Bạn có thể nhận khóa API miễn phí từ [Google AI Studio](https://aistudio.google.com/app/apikey).

3.  **Chạy máy chủ phát triển:**

    Sau khi cài đặt xong, hãy chạy lệnh sau để khởi động ứng dụng:

    ```bash
    npm run dev
    ```

4.  **Mở ứng dụng:**

    Mở trình duyệt của bạn và truy cập [http://localhost:9002](http://localhost:9002).
