
import transporter from '../config/mail.js';
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
            to,
            subject,
            html: text,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;
