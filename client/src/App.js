import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/all")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="App">
      <h1>Books</h1>
      {books.length &&
        books.map((book) => (
          <div key={book._id}>
            <h2>
              <strong>
                {book.booktitle}, {book.author}
              </strong>
            </h2>
            <p>{book.year}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
