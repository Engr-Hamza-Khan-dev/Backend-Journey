import { emailQueue } from "../queues/email-queue.js";


const EmailController =async(req, res) => {
    const {to, subject, text} = req.body;
    await emailQueue.add("Send email ",
        {
            to,
            subject,
            text
        },
         {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            }
        }
    )
    res.json({message: 'Email sent successfully'});
}

export default EmailController;