import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../Assets/styles/github-repo.css";
import { Link, useSubmit } from "react-router-dom";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";
import { format } from "date-fns";
import locationSvg from "../Assets/images/location.svg";
import locationNullSvg from "../Assets/images/location-null.svg";
import companySvg from "../Assets/images/company.svg";
import companyNullSvg from "../Assets/images/company-null.svg";
import twitterSvg from "../Assets/images/twitter.svg";
import twitterNullSvg from "../Assets/images/twitter-null.svg";
import linkSvg from "../Assets/images/link.svg";
import linkNullSvg from "../Assets/images/link-null.svg";

export const GithubRepo = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState("muzardemoses");
  const [updateUsers, setUpdateUsers] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const [profile, setProfile] = useState([]);

  const fetchRepos = () => {
    setLoading(true);
    fetch(
      `https://api.github.com/users/${users}/repos?page=1&per_page=20&sort=updated`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };
  const debouncedFetchGitHubRepos = debounce(fetchRepos, 500);

  useEffect(() => {
    fetchRepos();
  }, [users]);

  useEffect(() => {
    setLoading(true);
    const FetchProfile = async () => {
      const res = await fetch(`https://api.github.com/users/${users}`);
      const data = await res.json();
      setProfile(data);
      setLoading(false);
      console.log(data);
    };
    FetchProfile();
  }, [users]);

  const displayRepos = Array.isArray(items)
    ? items.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => {
        return (
          <div className="" key={item.id}>
            <Link
              to={{ pathname: `/repo/${item.name}` }}
              state={{ user: item.owner.login }}
              className="sub-repo  text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white flex justify-between items-center px-4 py-2 hover:bg-gray-600 cursor-pointer focus:ring-2   focus:outline-none focus:ring-gray-500 mb-2 transition ease-in-out duration-300"
            >
              <h3 class="text-blue-300 text-center mt-0">
                {item.name}
              </h3>
              <h4
              className="text-gray-300 font-medium text-sm rounded-lg text-center px-2 py-1 border-gray-300 border mt-0"
              >
                {item.private ? (
                  <p className="">Private</p>
                ) : (
                  <p className="">Public</p>
                )}
              </h4>
            </Link>
          </div>
        );
      })
    : null;

  const pageCount = Math.ceil(items.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOwner = items.slice(0, 1).map((item) => {
    return (
      <div key={item.id} className="flex flex-row p-6 rounded-lg gap-5">
        <img src={item.owner.avatar_url} alt="avatar" className="user-avatar" />
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="text-left">
              <h4 className="text-white font-bold text-2xl">{profile.name}</h4>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href={profile.html_url}
                rel="noreferer"
                target="_blank"
                className="text-base font-medium"
                style={{ color: "#0079ff" }}
              >
                @{item.owner.login}
              </a>
            </div>
            <h3 className=" font-medium text-base" style={{ color: "#697c9a" }}>
              Joined {format(new Date(profile.created_at), "MMM dd, yyyy")}
            </h3>
          </div>
          <div>
            <p className="text-white text-left"> {profile.bio}</p>
          </div>
          <div
            className=" p-3 rounded-lg"
            style={{ backgroundColor: "#141d2f" }}
          >
            <table className="w-full">
              <tbody className="flex flex-row justify-between w-full  p-1">
                <tr>
                  <td className="text-center">
                    <h4 className="text-center text-white">Repos</h4>
                    <h4 className="text-2xl font-bold text-zinc-200">
                      {profile.public_repos}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <h4 className="text-center text-white">Followers</h4>
                    <h4 className="text-2xl font-bold text-zinc-200">
                      {profile.followers}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <h4 className="text-center text-white">Following</h4>
                    <h4 className="text-2xl font-bold text-zinc-200">
                      {profile.following}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              {profile.location ? (
                <div className="flex gap-2 items-center">
                  <img
                    src={locationSvg}
                    className="w-5 h-5 "
                    color="white"
                    alt=""
                  />
                  <h4 className="text-white font-medium text-base">
                    {profile.location}
                  </h4>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <img src={locationNullSvg} className="w-5 h-5 " alt="" />
                  <h4
                    className=" font-medium text-base"
                    style={{ color: "#697c9a" }}
                  >
                    Not Available
                  </h4>
                </div>
              )}
            </div>
            <div>
              {profile.twitter_username ? (
                <div className="flex gap-2 items-center">
                  <img
                    src={twitterSvg}
                    className="w-5 h-5 "
                    color="white"
                    alt=""
                  />
                  <h4 className="text-white font-medium text-base">
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a
                      target="_blank"
                      href={`https://www.twitter.com/${profile.twitter_username}`}
                    >
                      @{profile.twitter_username}
                    </a>
                  </h4>
                </div>
              ) : (
                <div className="flex gap-2 items-center" color="#697c9a">
                  <img src={twitterNullSvg} className="w-5 h-5 " alt="" />
                  <h4
                    className=" font-medium text-base"
                    style={{ color: "#697c9a" }}
                  >
                    Not Available
                  </h4>
                </div>
              )}
            </div>
            <div>
              {profile.blog ? (
                <div className="flex gap-2 items-center">
                  <img
                    src={linkSvg}
                    className="w-5 h-5 "
                    color="white"
                    alt=""
                  />
                  <h4 className="text-white font-medium text-sm pr-1">
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a target="_blank" href={profile.blog}>
                      {profile.blog}
                    </a>
                  </h4>
                </div>
              ) : (
                <div className="flex gap-2 items-center" color="#697c9a">
                  <img src={linkNullSvg} className="w-5 h-5 " alt="" />
                  <h4
                    className=" font-medium text-base"
                    style={{ color: "#697c9a" }}
                  >
                    Not Available
                  </h4>
                </div>
              )}
            </div>
            <div>
              {profile.company ? (
                <div className="flex gap-2 items-center">
                  <img
                    src={companySvg}
                    className="w-5 h-5 "
                    color="white"
                    alt=""
                  />
                  <h4 className="text-white font-medium text-base">
                    {profile.company}
                  </h4>
                </div>
              ) : (
                <div className="flex gap-2 items-center" color="">
                  <img src={companyNullSvg} className="w-5 h-5 " alt="" />
                  <h4
                    className=" font-medium text-base"
                    style={{ color: "#697c9a" }}
                  >
                    Not Available
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="main-container">
      <Helmet>
        <title>Repo Details</title>
        <meta name="description" content="Repo Details" />
        <link rel="canonical" />
      </Helmet>
      {/* <header className="github-repo-header">
        <h1>Viewing {users}'s Repositories</h1>
      </header> */}

      <div className="both">
        <div className="sub-contain">
          <form className="search-form">
            <div className="search-container">
              <div className="search-con-con  inset-y-0 ">
                <svg
                  aria-hidden="true"
                  className=" text-gray-500 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>

              <input
                type="search"
                placeholder="Search GitHub Username"
                value={updateUsers}
                onChange={(e) => setUpdateUsers(e.target.value)}
                required
              />
              <button
                type="submit"
                className="search-btn"
                onClick={(e) => {
                  e.preventDefault();
                  debouncedFetchGitHubRepos();
                  setUsers(updateUsers);
                }}
              >
                Search
              </button>
            </div>
          </form>

          <div className="profile-detailer">
            <div className="user-profile">{displayOwner}</div>
            <section className="repos-container">
              {loading ? (
                <div className="loading text-white">
                  Wait a moment while we fetch your repos
                </div>
              ) : (
                <><h2
                 className="text-white mb-6"
                >
                    {profile.name}'s Repositories({profile.public_repos})
                </h2>
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
        </div>
        <div className="other">
          <h2>Play Game</h2>
          <h3>
            <span className="luc">Lucky Number</span>{" "}
            <span className="sla">||</span>{" "}
            <span className="err">Error Boundary</span>
          </h3>
          <h3
          className="text-white"
          >Rules</h3>
          <div className="about-game">
            <span className="pinned"></span>
            <p>
              Roll the dice to see if you are lucky enough to win the game. 
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
