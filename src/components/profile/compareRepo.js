import "./compareRepo.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
// import { colorpallete } from "../validation/colors";

function CompareRepo() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [projectUser, setProjectUser] = useState('');
  const [projectRepo,setProjectRepo]= useState('');
  const [projectType,setProjectType]= useState('');
  const [userDependencies, setUserDependencies] = useState([]);
  const [projectDependencies, setProjectDependencies] = useState([]);
  const [cosineSimilarity, setCosineSimilarity] = useState(null);
  const [skill, setSkill] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const githubToken = useSelector((state)=>state.github.github_token)

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: `${skill}+in:readme`,
          sort: 'stars',
          order: 'desc',
        },
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const repositories = data.items || [];
        setRecommendations(repositories);
      } else {
        console.error('Error fetching recommendations:', response.status);
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skill.trim() !== '') {
      getRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [skill]);



  const fetchRepositoryContents = async (owner, repo, filePath) => {
    
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const headers = {
        Authorization: `token ${githubToken}`,
      };
      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        return response.data;
      } else {
        console.log("Repository Not Found");
        throw new Error(`Failed to fetch repository contents: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const parseFlutterProject = (pubspecContent) => {
    const dependencies = [];
    let parsingDependencies = false;

    for (const line of pubspecContent.split('\n')) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('dependencies:')) {
        parsingDependencies = true;
      } else if (
        trimmedLine.startsWith('dev_dependencies:') ||
        trimmedLine.startsWith('dependency_overrides:')
      ) {
        parsingDependencies = false;
      } else if (parsingDependencies && trimmedLine) {
        const packageName = trimmedLine.split(':')[0].trim();
        dependencies.push(packageName);
      }
    }

    return dependencies;
  };
  const parseReactProject = (packagejsonContent) => {
    const dependencies = [];
    let parsingDependencies = false;

    for (const line of packagejsonContent.split('\n')) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('"dependencies":') || trimmedLine.startsWith('"devDependencies":')) {
        parsingDependencies = true;
      } else if (
        trimmedLine.startsWith('}') ||
        trimmedLine.startsWith('dependency_overrides:')
      ) {
        parsingDependencies = false;
      } else if (parsingDependencies && trimmedLine) {
        const packageName = trimmedLine.split(':')[0].trim();
        dependencies.push(packageName);
      }
    }

    return dependencies;
  };

  const fetchAndParseDependencies = async (projectType) => {
    try {
      let userRepoContents;
      let projectRepoContents;
  
      if (projectType === "flutter") {
        userRepoContents = await fetchRepositoryContents(owner, repo, 'pubspec.yaml');
        projectRepoContents = await fetchRepositoryContents(projectUser, projectRepo, 'pubspec.yaml');
      } else if (projectType === "react") {
        userRepoContents = await fetchRepositoryContents(owner, repo, 'package.json');
        projectRepoContents = await fetchRepositoryContents(projectUser, projectRepo, 'package.json');
      } else if (projectType === "python") {
        userRepoContents = await fetchRepositoryContents(owner, repo, 'requirements.txt');
        projectRepoContents = await fetchRepositoryContents(projectUser, projectRepo, 'requirements.txt');
      } else if (projectType === "nodejs") {
        userRepoContents = await fetchRepositoryContents(owner, repo, 'package.json'); // Update the filename
        projectRepoContents = await fetchRepositoryContents(projectUser, projectRepo, 'package.json'); // Update the filename
      } else if (projectType === "colab") {
        // You can add the relevant logic here for "colab"
      } else {
        console.error('Unsupported project type');
        return; // Exit the function for unsupported types
      }
  
      const userPubspecContent = atob(userRepoContents.content);
      const projectPubspecContent = atob(projectRepoContents.content);
  
      let userDependencies;
      let projectDependencies;
  
      if (projectType === "flutter") {
        userDependencies = parseFlutterProject(userPubspecContent);
        projectDependencies = parseFlutterProject(projectPubspecContent);
      } else if (projectType === "react") {
        userDependencies = parseReactProject(userPubspecContent);
        projectDependencies = parseReactProject(projectPubspecContent);
      }else if(projectType == "nodejs"){
        userDependencies = parseReactProject(userPubspecContent);
        projectDependencies = parseReactProject(projectPubspecContent);
      } 
      else {
        console.error('Unsupported project type');
        return; // Exit the function for unsupported types
      }
  
      setUserDependencies(userDependencies);
      setProjectDependencies(projectDependencies);
      calculateCosineSimilarity(userDependencies, projectDependencies);
    } catch (error) {
      console.error(error);
    }
  };
  
  const calculateCosineSimilarity = (userDependencies, projectDependencies) => {
    const set1 = new Set(userDependencies);
    const set2 = new Set(projectDependencies);

    const intersectionSize = [...set1].filter(value => set2.has(value)).length;
    const unionSize = set1.size + set2.size - intersectionSize;
    const cosineSimilarity = intersectionSize / unionSize;

    setCosineSimilarity(cosineSimilarity);
  };
  const openRepositoryInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="recommed-section">
      <h1 className="recommed-info-title">GitHub Repository Recommendations</h1>
      <br></br>
      <label htmlFor="skill"><b>Enter a skill or keyword:</b></label>
      <input
        className="searchinput"
        type="text"
        id="skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <br></br>
      {loading && <h4>Loading...</h4>}
      
      <ul className="text-area">
        {recommendations.map((repo, index) =>{
          if(index%2==0) return (
            <li key={repo.id}>
              <h4 className="rec even" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              {' '}
              - Stars: {repo.stargazers_count}<button className="search" onClick={() => openRepositoryInNewTab(repo.html_url)}>View Repository</button>
              </h4>
            </li>
          )
          else return(
            <li key={repo.id}>
            <h4 className="rec odd" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            {' '}
             - Stars: {repo.stargazers_count}<button className="search" onClick={() => openRepositoryInNewTab(repo.html_url)}>View Repository</button>
            </h4>
          </li>  
          )
          // <li key={repo.id}>
          //   <h4 className="rec" href={repo.html_url} target="_blank" rel="noopener noreferrer">
          //     {repo.name}
          //   {' '}
          //    - Stars: {repo.stargazers_count}<button className="search" onClick={repo.html_url}>View Repository</button>
          //   </h4>
          // </li>
          })}
      </ul>
      {recommendations.length === 0 && !loading && skill.trim() !== '' && (
        <p>No recommendations found.</p>
      )}
    </div>
    <div className="recommed-section">
    <h2 className="recommed-info-title">Compare GitHub Repositories</h2>
    <br></br>
      <div>
        <select className="searchin" onChange={(e) => setProjectType(e.target.value)}>
          <option>Select Type of Project</option>
          {/* <option value="python">Python</option> */}
          <option value="react">React JS</option>
          <option value="flutter">Flutter</option>
          <option value="nodejs">Node js</option>
          {/* <option value="colab">Colab</option> */}
        </select>
      </div>
      <div>
        <label ><b>Owner:</b></label>
        <input className="searchin" type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </div>
      <div>
        <label><b>Repo:</b></label>
        <input className="searchin" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
      </div>
      <div>
        <label><b>Project User:</b></label>
        <input className="searchin" type="text" value={projectUser} onChange={(e) => setProjectUser(e.target.value)} />
      </div>
      <div>
        <label><b>Project Repo:</b></label>
        <input className="searchin" type="text" value={projectRepo} onChange={(e) => setProjectRepo(e.target.value)} />
      </div>
      {/* <button className="search" onClick={fetchAndParseDependencies(projectType)}>Fetch and Parse Dependencies</button> */}
      <button className="search" onClick={() => fetchAndParseDependencies(projectType)}>Fetch and Parse Dependencies</button>

      <div>
        <h3> Dependencies of User:</h3>
        <ul>
          {userDependencies.map((dependency, index) => (
            <li key={index}>{dependency}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3> Dependencies of Project:</h3>
        <ul>
          {projectDependencies.map((dependency, index) => (
            <li key={index}>{dependency}</li>
          ))}
        </ul>
      </div>
      {cosineSimilarity !== null && (
        <div>
          <h3>Cosine Similarity Score:</h3>
          <h5><b>{cosineSimilarity.toFixed(2)}</b></h5>
        </div>
      )}
     </div>
    </div>
  );
}

export default CompareRepo;
