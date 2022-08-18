import React from "react";
import { NavLink } from "react-router-dom";
import "./repo.scss";

const Repo = (props) => {

  const repo = props.repo;

  const localeTime = 'en-GB'

  const showDate = (date, loc) => {
    const options = { month: 'long', year: 'numeric', day: 'numeric' }
    return date.toLocaleDateString(loc, options)
  }

 
  const updated_at = showDate(new Date(`${repo.updated_at}`), localeTime)
  const created_at = showDate(new Date(`${repo.created_at}`), localeTime)

  return (

      <div className="repo">
        <div className="front">
          <div className="repo__header">
            <img className="repopage-img" src={repo.owner.avatar_url} alt="" />
            <div className="repo__header-headline">{repo.name}</div>
            <div className="repo__header-info">
              <div className="repo__header-language">✍ Language: {repo.language ?  <span className="repo-bold">{repo.language}</span> : <span className="repo-no-language">Unspecified</span>}</div>
              <div className="repo__header-stars">&#127775; Stars: {repo.stargazers_count}</div>
              <div className="repo-last-commit">&#x1F4C5; Updated on {updated_at}</div>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="repo__header-headline">About {repo.name}</div>
          <div className="repo-last-commit">&#x1F4C5; Created on {created_at}</div>
          <div className="repo-last-commit">&#x1F4C5; Updated on {updated_at}</div>
          <div className="sep"></div>
          <div className="repo__header-headline">&#128466; <NavLink to={`/repo/${repo.owner.login}/${repo.name}`}>More about {repo.name}</NavLink></div>
          <div className="repo-link">&#128242; Link: <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></div>
        </div>
      </div>
   
   )
}

export default Repo;
