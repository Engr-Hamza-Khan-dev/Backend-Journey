
import { Worker } from "bullmq";
import { emailQueue } from "../queues/email-queue.js";
import  sendEmail  from "../services/email.service.js";


const worker = new Worker('email-queue',
    async (job) => {
        const { to, subject, text } = job.data;
        await sendEmail(to, subject, text);
        console.log("email send :",job.name,job.id,job.data)
    },
    {
        connection: emailQueue.connection,
    });

worker.on("completed", (job) => {
    console.log("Email completed:", job.name, job.id, job.data);
});

worker.on("failed", (job, err) => {
    console.log("Email failed:", job.name, job.id, job.data, err);
});
export default worker;  