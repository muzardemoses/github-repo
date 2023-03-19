import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../Assets/styles/repo-details.css";
import { Helmet } from "react-helmet";
import linkSvg from "../Assets/images/link.svg";
import linkNullSvg from "../Assets/images/link-null.svg";
import repositorySvg from "../Assets/images/repository.svg";

export const RepoDetails = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
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
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div key={items.id}>
            <div
              className="single-repo-name m-8 text-sm font-medium rounded-lg   flex justify-between items-center px-4 py-2  transition ease-in-out duration-300 sm:px-2"
              style={{ background: "#f6f8ff" }}
            >
              <h1 className="text-blue-500 text-center mt-0 mb-0 sm:text-lg sm:font-semibold">
                {items.name}
              </h1>
              <h4 className="text-gray-400 font-medium text-sm rounded-lg text-center px-2 py-1 border-gray-400 border mt-0">
                {items.private ? (
                  <p className="piv">Private</p>
                ) : (
                  <p className="piv">Public</p>
                )}
              </h4>
            </div>
            <div className="single-repo-desc sm:w-11/12">
              <div className="repo-line flex flex-col gap-3 ">
                <h4
                className="sm:text-base sm:font-semibold"
                >
                  {items.description ? items.description : "No Description"}
                </h4>
                {items.topics && items.topics.length > 0 ? (
                  <div className="flex gap-2 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:justify-between">
                    {items.topics.map((item) => (
                      // eslint-disable-next-line react/jsx-no-target-blank
                      <a
                        href={`https://www.github.com/topics/${item}`}
                        target="_blank"
                        className="px-2 py-1 border border-blue-600 w-max rounded-full font-normal text-sm hover:text-white hover:bg-blue-600 cursor-pointer transition ease-in-out duration-300 "
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-blue-600 ">No Topics</p>
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
                      <span className=" w-5 h-5 rounded-full bg-green-700 mr-2"></span>{" "}
                      Vue
                    </span>
                  ) : items.language === "TypeScript" ? (
                    <span className="lang">
                      <span className="t-circle"></span> TypeScript
                    </span>
                  ) : null}
                </p>

                <p>
                  Created on{" "}
                  {items.created_at
                    ? format(new Date(items.created_at), "MMM dd, yyyy")
                    : null}
                </p>
                <p>
                  Last Update on{" "}
                  {items.updated_at
                    ? format(new Date(items.updated_at), "MMM dd, yyyy")
                    : null}
                </p>
                <div className="flex gap-2 items-center" color="#697c9a">
                   <img src={repositorySvg} className="w-5 h-5 " alt="" />
                  <a
                    href={items.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="url"
                  >
                    View Repository on Github
                  </a>
                </div>
                <div>
                  {items.homepage === null ? (
                    <div className="flex gap-2 items-center" color="#697c9a">
                      <img src={linkNullSvg} className="w-5 h-5 " alt="" />
                      <p
                        className=" font-medium text-base"
                        style={{ color: "#697c9a" }}
                      >
                        Not Available
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center" color="#697c9a">
                      <img src={linkNullSvg} className="w-5 h-5 " alt="" />
                      <a
                        href={items.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="live"
                      >
                        Live Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => navigate(-1)}
              className="text-white  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 "
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
