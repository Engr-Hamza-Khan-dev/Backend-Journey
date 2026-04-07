import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server is ready");
});


app.get('/api/jokes',(req,res)=>{
  const jokes = [
  {
    id: 1,
    title: "Dark Mode",
    joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
  },
  {
    id: 2,
    title: "Java Glasses",
    joke: "Why do Java developers wear glasses? Because they don’t C#.",
  },
  {
    id: 3,
    title: "Cold Computer",
    joke: "Why was the computer cold? It left its Windows open.",
  },
  {
    id: 4,
    title: "Nature Problem",
    joke: "Why do programmers hate nature? Too many bugs.",
  },
  {
    id: 5,
    title: "Broke Developer",
    joke: "Why did the developer go broke? Because he used up all his cache.",
  },
  {
    id: 6,
    title: "Loop Breakup",
    joke: "Why did the function break up with the loop? It couldn’t handle the repetition.",
  },
  {
    id: 7,
    title: "Halloween vs Christmas",
    joke: "Why do programmers mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
  },
  {
    id: 8,
    title: "Array Therapy",
    joke: "Why did the array go to therapy? It had too many issues.",
  },
  {
    id: 9,
    title: "Sad Developer",
    joke: "Why was the JavaScript developer sad? Because he didn’t null his feelings.",
  },
  {
    id: 10,
    title: "No Arrays",
    joke: "Why did the coder quit his job? Because he didn’t get arrays.",
  },
];
    res.json(jokes)
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
