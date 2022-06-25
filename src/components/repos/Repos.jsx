import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos, setCurrentPage, setSearchValue } from "../../store/reducers/reposSlice";
import { createPages } from "../../utils/pagesCreator";
import Repo from "./repo/Repo";
import "./repos.scss";

const Repos = () => {

  const repos = useSelector((state) => state.repos.items);
  const searchValue = useSelector((state) => state.repos.searchValue);
  let reposFetching = useSelector((state) => state.repos.isFetching);
  const currentPage = useSelector((state) => state.repos.currentPage);
  const perPage = useSelector((state) => state.repos.perPage);
  const totalCount = useSelector((state) => state.repos.totalCount);
  const pagesCount = Math.ceil(totalCount/perPage);
  const pages = [];

  let order = "desc";

  createPages(pages, pagesCount, currentPage);

  const repoItems = repos.items;

  const dispatch = useDispatch();
  
  const searchRepos = useMemo(
    () => repoItems ? repoItems.filter((repo) => repo.name.toLowerCase().includes(searchValue.toLowerCase())) : [],
    [searchValue, repoItems]
  );

    const orderByStarsAsc = () => {
      order = "asc";
      dispatch(fetchRepos([searchValue, currentPage, perPage, order]));
    }
    const orderByStarsDesc = () => {
      order = "desc";
      dispatch(fetchRepos([searchValue, currentPage, perPage, order]));
    }

  useEffect(() => {
    
    const debounceSearch = setTimeout(() => {
      if(searchValue || searchValue === '') {
        dispatch(fetchRepos([searchValue, currentPage, perPage, order]));
        reposFetching = false;
      }
    }, 2000);

    return () => {
      reposFetching = true;
      clearTimeout(debounceSearch);
    };
    
  }, [currentPage, searchValue]);

  return (
      <div className="wrapper">
        <h1>Repositories</h1>
        <div className="search">
        <input
            type="text"
            placeholder="Query..."
            value={searchValue}
            className="search-input"
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
          />
        </div>

        <div className="order-items">
          <button onClick={orderByStarsAsc}>Sort by stars &#8593;</button>
          <button onClick={orderByStarsDesc}>Sort by stars &#8595;</button>
        </div>

        {repoItems !== undefined && !reposFetching ? searchRepos.map(repo => <Repo key={repo.id} repo={repo} />) : <div className="loader"></div>}
      
        <div className="pages">
          {pages.map((page, index) => 
          <span 
          key={index} 
          className={currentPage === page ? "current-page" : "page"}
          onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>)}
        </div>
      </div>
    )
}

export default Repos;
