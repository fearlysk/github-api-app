import React from "react";
import { NavLink } from "react-router-dom";
import "./repo.scss";

const Repo = (props) => {

  const repo = props.repo;

  return (
      <div className="repo">
        <div className="repo__header">
            <div className="repo__header-headline"><NavLink to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink></div>
            <div className="repo__header-stars">&#127775; Stars: {repo.stargazers_count}</div>
        </div>
        <div className="repo-last-commit">&#x1F4C5; Updated at: {repo.updated_at}</div>
        <div className="repo-link">Link: <a href={repo.html_url} target="_blank">{repo.html_url}</a></div>
      </div>
    )
}

export default Repo;
