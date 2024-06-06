import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { CCard, CCardBody, CCardTitle, CCardText, CCardImage, CButton } from "@coreui/react";
import { RiSearchLine } from "react-icons/ri";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const { isAuthorized } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="flex relative items-center mb-6">
        <RiSearchLine color="black" size={20} className="absolute left-3 top-3 " />
            <input
              type="text"
              placeholder="Filter by job title"
              value={filterText}
              onChange={handleFilterChange}
              className="pl-10  pr-4 py-2 w-full border rounded-lg focus:outline-none"
            />
        </div>
        <div className="banner">
          {filteredJobs.map((job) => (
            <CCard style={{ width: '15rem', height: '23rem'}} key={job._id}>
              <CCardImage orientation="top" src="/job.png" style={{height: '10rem', }} />
              <CCardBody>
                <CCardTitle className="text-xl font-bold" style={{height: '2rem'}}>
                  {job.title}
                </CCardTitle>
                <CCardText className="text-sm" style={{height: '4rem'}}>
                  {job.category} - {job.country}
                </CCardText>
                <Link to={`/job/${job._id}`}>
                  <CButton color="primary">Job Details</CButton>
                </Link>
              </CCardBody>
            </CCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
