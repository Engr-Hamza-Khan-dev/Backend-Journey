import Redis from "ioredis"
import express from "express"
import BANNER_KEY from "./constant.js"
import dotenv from "dotenv"
import { emailQueue } from "./queue.js"

dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

function Otpkey(phoneNumber) {
    return `otp:${phoneNumber}`
}

app.post("/banner", async (req, res) => {
    await redis.set(BANNER_KEY, req.body.message || "welcome to fsociety of redis")
    res.json({ success: true })
})

app.get("/banner", async (req, res) => {
    const banner = await redis.get(BANNER_KEY)
    if (!banner) {
        return res.json({ banner: "No banner found" })
    }
    res.json({ banner })
})

app.delete("/banner", async (req, res) => {
    await redis.del(BANNER_KEY)
    res.json({ success: true })
})

app.get("/banner/exists", async (req, res) => {
    const exists = await redis.exists(BANNER_KEY)
    res.json({ exists: Boolean(exists) })
})

// Otp in Redis
app.post("/otp", async (req, res) => {
    const { phoneNumber } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await redis.set(Otpkey(phoneNumber), otp, "EX", 30);
    res.json({
        success: true,
        message: "OTP sent successfully",
        otp
    })
})

app.post("/otp-verify", async (req, res) => {
    const { phoneNumber, otp } = req.body
    const getOtp = await redis.get(Otpkey(phoneNumber))
    if (!getOtp) {
        return res.json({ success: false, message: "No OTP found" })
    }
    if (getOtp !== otp) {
        return res.json({ success: false, message: "Invalid OTP" })
    }

    await redis.del(Otpkey(phoneNumber))
    res.json({ success: true, message: "OTP verified successfully" })
})

app.post("/otp/:phone/ttl", async (req, res) => {
    const { phone } = req.params
    const ttl = await redis.ttl(Otpkey(phone))
    res.json({ ttl })
})

// Save user in redis as json in single variable
app.post("/user/:id/json", async (req, res) => {
    const raw = await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body))
    res.json({
        user: raw,
        saveAs: "json"
    });
})

app.get("/user/:id/json", async (req, res) => {
    const raw = await redis.get(`user:${req.params.id}:json`)
    res.json({ user: raw ? JSON.parse(raw) : null });
})

// Store User as hash object 
app.post("/user/:id/hash", async (req, res) => {
    const user = await redis.hset(`user:${req.params.id}:hash`, req.body);
    res.json({
        user: user
    })
})

app.get("/user/:id/hash", async (req, res) => {
    const user = await redis.hgetall(`user:${req.params.id}:hash`);
    res.json({
        user: user
    })
})

// Bullmq email queue api
app.post("/email-queue", async (req, res) => {
    const job = await emailQueue.add("Send Email", {
        to: req.body.to,
        subject: req.body.subject || "Test Email",
        text: req.body.text || "This is a agent 47 testing"
    },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            }
        }
    )
    res.json({ success: true, job: job, message: "Email added to queue" })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

