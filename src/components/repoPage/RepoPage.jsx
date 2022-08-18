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
  }, [username, reponame])

  const handleClick = () => {
    navigate(-1, {replace: true});
  };

  const localeTime = 'en-GB'

  const showDate = (date, loc) => {
    const options = { month: 'long', year: 'numeric', day: 'numeric' }
    return date.toLocaleDateString(loc, options)
  }

 
  const updated_at = showDate(new Date(`${repo.updated_at}`), localeTime)
  const created_at = showDate(new Date(`${repo.created_at}`), localeTime)
  const pushed_at = showDate(new Date(`${repo.pushed_at}`), localeTime)


  return (
    <div className="repo_wrapper">
      <h2>{repo.name}</h2>
      <div className="repo__page">
      <div className="repo__page-header">
          <div className="repo__page-img-wrapper"><img className="repo__page-img" src={repo.owner.avatar_url} alt="" /></div>
          <div className="repo__page-header-info">
            <div className="repo__page-name"><span className="title">Repository name: </span>{repo.name}</div>
            <div className="repo__page-owner"><span className="title">&#127774; Owner: </span>{repo.owner.login}</div>
            <div className="repo__page-ownergh"><span className="title">&#9872; Owner's Github: </span><a href={repo.owner.html_url} target="_blank" rel="noreferrer">{repo.owner.html_url}</a></div>
            <div className="repo__page-stars"><span className="title">&#127775; Stars: </span>{repo.stargazers_count}</div>
            <div className="repo__page-watchers"><span className="title">&#128083; Watchers: </span>{repo.watchers_count}</div>
            <div className="repo__page-forks"><span className="title">&#9735; Forks: </span>{repo.forks}</div>
          </div>
          </div>
          <div className="repo__page-time">
            <p>&#128344; <span className="title">Pushed on: </span>{pushed_at}</p>
            <p>&#128344; <span className="title">Created on: </span>{created_at}</p>
            <p>&#128344; <span className="title">Updated on: </span>{updated_at}</p>
          </div>
          <div className="repo-info">
            <p>&#9735; Allowed forking: {repo.allow_forking ? <span>Yes</span> : <span>No</span>}</p>
            <p>&#128083; Visibility: {repo.visibility ? <span>Public</span> : <span>Private</span>}</p>
            <div className="sep"></div>
            <p>&#128466; {repo.description}</p>
            <div className="sep"></div>
            <div className="repo-link">&#128242; Link: <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></div>
          </div>
        <div className="back-btn"><button onClick={handleClick}>&larr; Go back</button></div>
      </div>
    </div>
  )
}

export default RepoPage;
