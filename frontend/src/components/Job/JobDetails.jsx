import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="jobDetail page py-10 bg-gray-100">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        <h3 className="text-3xl font-semibold mb-6">Job Details</h3>
        <div className="banner">
          <p className="mb-4">
            <strong>Title:</strong> <span className="text-gray-700">{job.title}</span>
          </p>
          <p className="mb-4">
            <strong>Category:</strong> <span className="text-gray-700">{job.category}</span>
          </p>
          <p className="mb-4">
            <strong>Location:</strong> <span className="text-gray-700">{job.city}, {job.country}</span>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> <span className="text-gray-700">{job.description}</span>
          </p>
          <p className="mb-4">
            <strong>Job Posted On:</strong> <span className="text-gray-700">{job.jobPostedOn}</span>
          </p>
          <p className="mb-4">
            <strong>Salary:</strong>{" "}
            <span className="text-gray-700">
              {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
            </span>
          </p>
          {user && user.role !== "Employer" && (
            <Link
              to={`/application/${job._id}`}
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
