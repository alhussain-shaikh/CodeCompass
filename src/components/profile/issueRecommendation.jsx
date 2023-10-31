import React, { useState } from 'react';
import axios from 'axios';
import './issueRecommendation.css'

function GitHubIssueFetcher() {
  const [issueTypes, setIssueTypes] = useState('');
  const [numIssues, setNumIssues] = useState(0);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const githubToken = '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';

  const fetchGitHubIssues = async () => {
    try {
      setLoading(true);

      const labels = issueTypes.split(',').map(issueType => `label:${issueType.trim()}`).join('+');
      const apiUrl = `https://api.github.com/search/issues?q=state:open+is:issue+${labels}`;
      const headers = {
        Authorization: `token ${githubToken}`,
      };
      const response = await axios.get(apiUrl, { headers });

      // const response = await axios.get(apiUrl);
      const data = response.data;

      if ('items' in data) {
        const issues = data.items.slice(0, numIssues).map((item, index) => {
          const repoName = item.repository_url.split('/')[4];
          const ownerName = item.repository_url.split('/')[3];

          return (
            <div key={index}>
              <p>
                {index + 1}.{' '}
                <a href={item.html_url}>{item.title}</a> ({repoName}, {item.stargazers_count} stars):
              </p>
              <p>{item.body}</p>
            </div>
          );
        });

        setResult(issues);
      } else {
        setResult('No issues found for the given type.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GitHub Issue Fetcher</h1>
      <label>
        Enter the types of issues you want to work on (e.g., bug, enhancement):
        <input
          type="text"
          value={issueTypes}
          onChange={(e) => setIssueTypes(e.target.value)}
        />
      </label>
      <br />
      <label>
        Enter the number of issues you want to see:
        <input
          type="number"
          value={numIssues}
          onChange={(e) => setNumIssues(e.target.value)}
        />
      </label>
      <br />
      <button sx={{color: "white"}} onClick={fetchGitHubIssues}>Fetch Issues</button>
      <div>
        {loading ? <p>Loading...</p> : result}
      </div>
    </div>
  );
}

export default GitHubIssueFetcher;
