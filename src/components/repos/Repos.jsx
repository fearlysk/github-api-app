import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos, setCurrentPage, setSearchValue } from "../../store/reducers/reposSlice";
import classNames from 'classnames';
import { createPages } from "../../utils/pagesCreator";
import Repo from "./repo/Repo";
import RepoNotFound from "./repo/RepoNotFound";
import "./repos.scss";

const Repos = () => {

  const [isEmpty, setIsEmpty] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [showPages, setShowPages] = useState(false);

  const repos = useSelector((state) => state.repos.items);
  const searchValue = useSelector((state) => state.repos.searchValue);
  let reposFetching = useSelector((state) => state.repos.isFetching);
  const currentPage = useSelector((state) => state.repos.currentPage);
  const perPage = useSelector((state) => state.repos.perPage);
  const totalCount = useSelector((state) => state.repos.totalCount);
  const pagesCount = Math.ceil(totalCount/perPage);
  const pages = [];

  createPages(pages, pagesCount, currentPage);

  let repoItems = repos.items;

  const dispatch = useDispatch();
  
  const searchRepos = useMemo(
    () => repoItems ? repoItems.filter((repo) => repo.name.toLowerCase().includes(searchValue.toLowerCase())) : [],
    [searchValue, repoItems]
  );

    const sortRepos = (order, parameter) => {
      dispatch(fetchRepos([searchValue, currentPage, perPage, order, parameter]));
    }

    const toggleActionsMenu = () => {
      setActionsVisible(!actionsVisible);
    }

    const actionsClasses = classNames({
      'order-items': true,
      'hidden': !actionsVisible,
    });

  useEffect(() => {
    setIsEmpty(false);
    const debounceSearch = setTimeout(() => {
      
      if(searchValue || searchValue === '') {
        dispatch(fetchRepos([searchValue, currentPage, perPage]));
        setTimeout(() => setShowPages(true), 600);
        reposFetching = false;
        setIsEmpty(false);
    }
 
    setTimeout(() => {
    if(!searchRepos.length && !repos.length && !reposFetching) {
      setIsEmpty(true);
      setShowPages(false);
      reposFetching = false;
    } else {
     setIsEmpty(false);
    }
  }, 1200);

  }, 1000);

    return () => {
      reposFetching = true;
      clearTimeout(debounceSearch);
    };
    
  }, [currentPage, searchValue]);

  return (
      <div className="wrapper">
        <h1>&#128269; Search on Github</h1>
        <div className="search">
          <input
              type="text"
              placeholder="&#x1F50D; Search..."
              value={searchValue}
              className="search-input"
              onChange={(event) => dispatch(setSearchValue(event.target.value))}
            />
        </div>
       
        <div className="order-items-wrapper">
          <div className="actions-header">
            <div className="actions-headline"><h1>Actions</h1></div>
            <div><button className="actions-btn" onClick={toggleActionsMenu}>{ actionsVisible ? <span>Hide &#8593;</span> : <span>Show &#8595;</span> }</button></div>
          </div>
        </div>
        
        <div className={actionsClasses}>
          <button className="action-btn" onClick={() => sortRepos("asc", "stars")}>Sort by stars &#8593;</button>
          <button className="action-btn" onClick={() => sortRepos("desc", "stars")}>Sort by stars &#8595;</button>
          <button className="action-btn" onClick={() => sortRepos("asc", "forks")}>Sort by forks &#8593;</button>
          <button className="action-btn" onClick={() => sortRepos("desc", "forks")}>Sort by forks &#8595;</button>
          <button className="action-btn" onClick={() => sortRepos("asc", "author-date-asc")}>Sort by author date &#8593;</button>
          <button className="action-btn" onClick={() => sortRepos("desc", "author-date-desc")}>Sort by author date &#8595;</button> 
        </div>
        
        {isEmpty && !reposFetching && !searchRepos.length ? <RepoNotFound /> : null}
        <div className="repos">{!reposFetching ? searchRepos.map(repo => <Repo key={repo.id} repo={repo} />) : <div className="loader"></div>}</div>
        
      {showPages && !reposFetching && repoItems && repos ? 
        <div className="pages">
          {pages.map((page, index) => 
          <span 
          key={index} 
          className={currentPage === page ? "current-page" : "page"}
          onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>)}
        </div> : null }
      </div>
    )
  }

export default Repos;
