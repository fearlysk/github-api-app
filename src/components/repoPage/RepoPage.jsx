import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCurrentRepo from "../../actions/getCurrentRepo";
import './repoPage.scss';

const RepoPage = () => {

  const navigate = useNavigate();
  const {username, reponame} = useParams();
  const [repo, setRepo] = useState({owner: {}});

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
  }, [])

  const handleClick = () => {
    navigate(-1, {replace: true});
  };

  return (
    <div className="repo_wrapper">
      <h2>{repo.name}</h2>
      <div className="repo__page">
          <img className="repo__page-img" src={repo.owner.avatar_url} alt="NO IMAGE" />
          <div className="repo__page-name"><span className="title">Repository name: </span>{repo.name}</div>
          <div className="repo__page-stars"><span className="title">Stars: </span>{repo.stargazers_count}</div>
          <div className="repo__page-watchers"><span className="title">Watchers: </span>{repo.watchers_count}</div>
          <div className="repo__page-forks"><span className="title">Forks: </span>{repo.forks}</div>
          <div className="repo__page-time">
            <p><span className="title">Pushed at: </span>{repo.pushed_at}</p>
            <p><span className="title">Created at: </span>{repo.created_at}</p>
            <p><span className="title">Updated at: </span>{repo.updated_at}</p>
          </div>
          <div className="repo__page-description"><span className="title">Description: </span>{repo.description}</div>
        <div className="back-btn"><button onClick={handleClick}>&larr; Go back</button></div>
      </div>
    </div>
  )
}

export default RepoPage;
