import React from "react";
import "./App.css";
import { RepoDetails, PageNotFound } from "./Components";
import { GithubRepo, ErrorBoundaryExample } from "./Pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<GithubRepo />} />
          <Route path="/repo/:id"  element={<RepoDetails />} />
        </Route>
        <Route path="/error-boundary" element={<ErrorBoundaryExample />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div className="author">
        <h5>
          Exam by{" "}
          <a
            href=" https://www.altschoolafrica.com/"
            target="_blank"
            className="author-name"
          >
            AltSchool Africa
          </a>
          . Coded by{" "}
          <a
            className="author-name"
            href=" https://www.linkedin.com/in/muzardemoses/ "
            target="_blank"
          >
            Moses Adebayo
          </a>
          .
        </h5>
      </div>
    </div>
  );
}

export default App;
