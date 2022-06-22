import axios from "axios";

const getCurrentRepo = async (username, repoName, setRepo) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
  setRepo(response.data);
}
  
export default getCurrentRepo;
