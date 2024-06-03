import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { CCard, CCardBody, CCardTitle, CCardText, CCardImage, CButton } from "@coreui/react";

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
              <CCard style={{ width: '16rem', height: '19rem'}} key={job._id}>
                <CCardImage orientation="top" src="/heroS.jpg" />
                <CCardBody>
                  <CCardTitle>{job.title}</CCardTitle>
                  <CCardText>
                    {job.category} - {job.country}
                  </CCardText>
          

                  <Link to={`/job/${job._id}`}>
                    <CButton color="primary">Job Details</CButton>
                  </Link>
                </CCardBody>
              </CCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
