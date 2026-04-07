import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jokes, setjokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => {
        setjokes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-3">
          😂 Joke App
        </h1>
        <p className="text-gray-600 text-lg">
          Enjoy some random developer humor
        </p>

        <div className="mt-4 inline-block bg-white px-6 py-2 rounded-full shadow">
          <span className="text-gray-700 font-medium">
            Total Jokes: {jokes.length}
          </span>
        </div>
      </div>

      {/* Joke Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jokes.map((joke) => (
          <div
            key={joke.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold text-blue-500 mb-3">
              {joke.title}
            </h3>

            {/* Joke */}
            <p className="text-gray-700 leading-relaxed">
              {joke.joke}
            </p>

            {/* Footer */}
            <div className="mt-4 text-sm text-gray-400">
              Joke #{joke.id}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;