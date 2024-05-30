import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";



const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);

  console.log(isAuthorized);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
          console.log(res.data.jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.map((job) => {
              return (
                <>
                <div className="card" key={job._id}>
                  <p>{job.title}</p>
                  <p>{job.category}</p>
                  <p>{job.country}</p>
                  <Link to={`/job/${job._id}`}>Job Details</Link>
                  
                </div>
                </>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;