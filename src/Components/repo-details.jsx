import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import "../Assets/styles/repo-details.css";
import { Helmet } from "react-helmet";
export const RepoDetails = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [users] = useState("muzardemoses");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const FetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/users/${users}/repos?page=1&per_page=12&sort=updated`
      );
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };

    FetchRepos();
  }, [users]);
  const repo = items.filter((item) => item.id === Number(params.id));

  return (
    <div className="repo-details-main">
      <Helmet>
        <title>Repo Details</title>
        <meta name="description" content="Repo Details" />
      </Helmet>
      <div className="single-repo">
        {repo.map((item) => {
          return (
            <div key={item.id}>
              <div className="single-repo-name">
                <h1>{item.name}</h1>
                <h4>
                  {item.private ? (
                    <p className="piv">Private</p>
                  ) : (
                    <p className="piv">Public</p>
                  )}
                </h4>
              </div>
              <div className="single-repo-desc">
                <div className="repo-line">
                <h4>{item.description}</h4>
                {/* if statement for language (css, html, javascript) */}
                <p>
                  {item.language === "JavaScript" ? (
                    <span className="lang">
                      <span className="j-circle"></span> JavaScript
                    </span>
                  ) : item.language === "HTML" ? (
                    <span className="lang">
                      <span className="h-circle"></span> HTML
                    </span>
                  ) : item.language === "CSS" ? (
                    <span className="lang">
                      <span className="c-circle"></span> CSS
                    </span>
                  ) : item.language === "TypeScript"(
                    <span className="lang">
                      <span className="t-circle"></span> TypeScript
                    </span>
                  )}
                </p>

                <p>
                  Updated on 
                  {format(new Date(item.updated_at), " dd MMMM yyyy")}
                </p>
                 {/* repo link */}
                 <p>
                  <a href={item.html_url} target="_blank" rel="noreferrer" className="url">
                    View Repository on Github
                  </a>
                 </p>
                {/* live website */}
                <p>
                  <a href={item.homepage} target="_blank" rel="noreferrer" className="live">
                    Live Website
                  </a>
                </p>
                </div> 
              </div>
              <button onClick={() => navigate(-1)} className="repo-btn" >Back</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
