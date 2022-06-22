import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repos from "../src/components/repos/Repos";
import RepoPage from "../src/components/repoPage/RepoPage";
import "./App.scss";

const App = () => {
    return (
       <BrowserRouter>
         <Routes>
            <Route path="/" element={<Repos />} />
            <Route path="/repo/:username/:reponame" element={<RepoPage />} />
            <Route path="*" element={<Repos />} />
         </Routes>
       </BrowserRouter>
    )
}

export default App;
