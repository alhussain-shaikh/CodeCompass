import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const bigContainerStyle = {
  background: "#be29ec",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
  padding: "20px",
};

const RepoRecommend = () => {
  const [username, setUsername] = useState("");
  const [contributedData, setContributedData] = useState([]);
  const [toggle, setToggle] = useState(false);

  let uniqueRequests = [];
  let uniqueRepos = [];
  let uniqueInterested = [];

  const config = {
    headers: {
      Authorization: `Bearer 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`,
    },
  };

  const recommendRepos = () => {
    setToggle(true);
  };

  const fetchContributions = async () => {
    const allEvents = [];
    let page = 1;

    while (allEvents.length < 90) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/events?page=${page}`,
          config
        );

        if (response.data.length === 0) {
          break;
        }

        allEvents.push(...response.data);
        page++;
      } catch (error) {
        console.error(error);
        break;
      }
    }
    setContributedData(allEvents);
  };

  return (
    <Card style={bigContainerStyle}>
      <TextField
        id="standard-basic"
        label="GitHub Username"
        variant="standard"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        sx={{
          textAlign: "center",
          margin: "auto",
          marginTop: "30px",
          width: "300px",
          display: "flex",
          justifyContent: "center",
          color: "#6131AD"
        }}
      />
      <Typography
        variant="h6"
        component="h4"
        sx={{ textAlign: "center", marginTop: "20px", color: "#6131AD" }}
      >
        {username} Past Contributions <FiSearch size={20} onClick={fetchContributions} />{" "}
      </Typography>
      <br />
      <Typography variant="h5" component="h4" sx={{ textAlign: "center", marginTop: "20px" }}>
        Based on Pull Requests
      </Typography>
      <br />
      <div style={{ display: "flex", overflowX: "auto" }}>
        {contributedData.map((contribution, index) => {
          if (
            contribution.type === "PullRequestEvent" &&
            !uniqueRequests.includes(contribution.payload.pull_request.title)
          ) {
            uniqueRequests.push(contribution.payload.pull_request.title);
            return (
              <Card
                key={index}
                style={{ minWidth: 350, margin: 10, borderRadius: 15, background: "#fff" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {contribution.repo.name}
                    {!uniqueRepos.includes(contribution.repo.name) ? uniqueRepos.push(contribution.repo.name) : null}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {contribution.payload.pull_request.title}{" "}
                    <div style={containerStyle}>
                      <Button variant="contained" color="primary">
                        <BsArrowRightCircle />
                      </Button>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
        ;
      </div>

      <br />
      <Typography variant="h5" component="h4" sx={{ textAlign: "center", marginTop: "20px" }}>
        Based on Comments
      </Typography>
      <br />

      <div style={{ display: "flex", overflowX: "auto" }}>
        {contributedData.map((contribution, index) => {
          if (
            contribution.type === "IssueCommentEvent" &&
            !uniqueInterested.includes(contribution.payload.issue.title) &&
            !uniqueRequests.includes(contribution.payload.issue.title)
          ) {
            uniqueInterested.push(contribution.payload.issue.title);
            return (
              <Card key={index} style={{ minWidth: 300, margin: 10, borderRadius: 15, background: "#fff" }}>
                <CardContent>
                  <Typography variant="h5" component="div" style={{ color: "#7E0D80" }}>
                    {contribution.repo.name}
                    {!uniqueRepos.includes(contribution.repo.name) ? uniqueRepos.push(contribution.repo.name) : null}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {contribution.payload.issue.title}{" "}
                    <div style={containerStyle}>
                      <Button variant="contained" color="primary">
                        <BsArrowRightCircle />
                      </Button>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
        ;
      </div>

      <br />
      <br />
      <div style={containerStyle}>
        <Button variant="contained" color="primary" onClick={recommendRepos}>
          Recommend
        </Button>
      </div>
      <br /><br />
      {toggle ? <>{/* Your recommendation component */}</> : <></>}
    </Card>
  );
};

export default RepoRecommend;
