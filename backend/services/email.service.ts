import * as nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (toEmail: string, resetLink: string) => {

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,                      
        auth: {
            user: "f71392ae488aa8",        
            pass: "890ec33d4c5b34"         
        }
    });

    const mailOptions = {
        from: '"Hệ thống Công an phường Sơn Trà" <no-reply@congan.vn>',
        to: toEmail, 
        subject: 'Yêu cầu đặt lại mật khẩu',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h3 style="color: #003c71;">Xin chào,</h3>
                <p>Hệ thống nhận được yêu cầu lấy lại mật khẩu cho tài khoản: <strong>${toEmail}</strong></p>
                <p>Vui lòng nhấn vào nút bên dưới để tạo mật khẩu mới (Link có hiệu lực trong 15 phút):</p>
                <a href="${resetLink}" style="
                    display: inline-block;
                    padding: 12px 24px; 
                    background-color: #ff5252; 
                    color: white; 
                    text-decoration: none; 
                    border-radius: 5px;
                    font-weight: bold;
                    margin-top: 10px;">
                    Đặt lại mật khẩu ngay
                </a>
                <p style="margin-top: 20px; color: #666; font-size: 12px;">Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId); 
    } catch (error) {
        console.error("Lỗi gửi mail: ", error);
        throw error; 
    }
};