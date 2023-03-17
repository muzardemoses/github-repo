import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import "../Assets/styles/repo-details.css";
import { Helmet } from "react-helmet";

export const RepoDetails = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const params = useParams();
  const { state } = useLocation();
  console.log(params.id);

  useEffect(() => {
    setLoading(true);
    const FetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/repos/${state.user}/${params.id}`
      );
      const data = await res.json();
      setItems(data);
      console.log(data);
      setLoading(false);
    };

    FetchRepos();
  }, [params.id]);
  // const repo = items.filter((item) => item.id === Number(params.id));
  console.log(items);
  return (
    <div className="repo-details-main">
      <Helmet>
        <title>Repo Details</title>
        <meta name="description" content="Repo Details" />
      </Helmet>
      <div className="single-repo ">
        <div key={items.id}>
          <div className="single-repo-name m-8 text-sm font-medium rounded-lg   flex justify-between items-center px-4 py-2  transition ease-in-out duration-300 " style={{background: "#f6f8ff"}}>
            <h1 className="text-blue-500 text-center mt-0 mb-0">{items.name}</h1>
            <h4 className="text-gray-400 font-medium text-sm rounded-lg text-center px-2 py-1 border-gray-400 border mt-0">
              {items.private ? (
                <p className="piv">Private</p>
              ) : (
                <p className="piv">Public</p>
              )}
            </h4>
          </div>
          <div className="single-repo-desc">
            <div className="repo-line">
              <h4>{items.description}</h4>
              {items.topics == null ? (
                <p className="topic">No Topics</p>
              ) : (
                <div>
                  {items.topics.map((item) => (
                    <p className="topic">{item}</p>
                  ))}
                </div>
              )}
              <p>
                {items.language === "JavaScript" ? (
                  <span className="lang">
                    <span className="j-circle"></span> JavaScript
                  </span>
                ) : items.language === "HTML" ? (
                  <span className="lang">
                    <span className="h-circle"></span> HTML
                  </span>
                ) : items.language === "CSS" ? (
                  <span className="lang">
                    <span className="c-circle"></span> CSS
                  </span>
                ) : items.language === "Vue" ? (
                  <span className="lang">
                    <span className="c-circle"></span> Vue
                  </span>
                ) : items.language === "TypeScript" ? (
                  <span className="lang">
                    <span className="t-circle"></span> TypeScript
                  </span>
                ) : null}
              </p>

              <p>
                Updated{" "}
                {items.created_at
                  ? format(new Date(items.created_at), "MMM dd, yyyy")
                  : null}
              </p>
              <p>
                <a
                  href={items.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="url"
                >
                  View Repository on Github
                </a>
              </p>
              <p>
                {items.homepage === null ? (
                  <p className="live">No Live Website</p>
                ) : (
                  <a
                    href={items.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="live"
                  >
                    Live Website
                  </a>
                )}
              </p>
            </div>
          </div>
          <button onClick={() => window.history.back()} className="repo-btn">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
