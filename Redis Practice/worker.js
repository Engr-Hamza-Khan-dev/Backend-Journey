
import { Worker } from "bullmq";
import { connection } from "./queue.js";

const emailWorker = new Worker("email",
    async (job) => {
        console.log("Processing email:", job.name, job.id, job.data);
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Email processed:", job.name, job.id, job.data);
    },
    { connection });

emailWorker.on("completed", (job) => {
    console.log("Email completed:", job.name, job.id, job.data);
});

emailWorker.on("failed", (job, err) => {
    console.log("Email failed:", job.name, job.id, job.data, err);
});