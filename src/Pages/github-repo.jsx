import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
//import { format } from "date-fns";
import "../Assets/styles/github-repo.css";
import { Link, useSubmit } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RotateLoader } from 'react-spinners';


export const GithubRepo = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const [users] = useState("muzardemoses");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

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

  const displayRepos = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <div className="">
          <div key={item.id} className="sub-repo">
            <Link to={`/repo/${item.id}`}>
              <h1>{item.name}</h1>
            </Link>
            <h4>
              {item.private ? (
                <p className="piv">Private</p>
              ) : (
                <p className="piv">Public</p>
              )}
            </h4>
          </div>
          <div className="line"></div>
        </div>
      );
    });

  const pageCount = Math.ceil(items.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOwner = items.slice(0, 1).map((item) => {
    return (
      <div key={item.id}>
        <img src={item.owner.avatar_url} alt="avatar" className="user-avatar" />
        <h1>{item.owner.login}</h1>
      </div>
    );
  });

  return (
    <div className="main-container">
      <Helmet>
        <title>Repo Details</title>
        <meta name="description" content="Repo Details" />
        <link
          rel="canonical" 
        />
      </Helmet>
      <header className="github-repo-header">
        <h1>Viewing {users}'s Repositories</h1>
      </header>
      
      <div className="both">
        <div className="sub-contain">
          <div className="user-profile">{displayOwner}</div>
          <section className="repos-container">
            {loading ? (
              <div className="loading">
              <RotateLoader
              size={150}
              color={"#123abc"}
              loading={loading}
            />
              </div>
            ) : (
              <>
                <div className="repos">{displayRepos}</div>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </>
            )}
          </section>
        </div>
        <div className="other">
          <h2>Play Game</h2>
          <h3><span className="luc">Lucky Number</span> <span className="sla">||</span> <span className="err">Error Boundary</span></h3>
          <h3>Rules</h3>
          <div className="about-game">
            <span className="pinned"></span>
            <p>
              Roll the dice to see if you are lucky enough to win the game.{" "}m
              <br />
              If you roll a 7, you win! <br />
              If you roll an even number, you lose!
            </p>
          </div>

          <Link to="/error-boundary">
            <button className="error">Check The Game Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
