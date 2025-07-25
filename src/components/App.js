import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions))
      .catch((error) => {
        console.error('Error fetching questions:', error);
        // Optionally set an empty array or show an error state
        setQuestions([]);
      });
  }, []);

  // Add a new question to the list
  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Delete a question from the list
  function deleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  // Update a question in the list
  function updateQuestion(id, correctIndex) {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctIndex } : q
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
