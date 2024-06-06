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
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-4xl font-semibold mb-6 text-center">Job Details</h3>
        <div className="border-t border-gray-200 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900">Title:</h4>
              <p className="text-gray-700">{job.title}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900">Category:</h4>
              <p className="text-gray-700">{job.category}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900">Location:</h4>
              <p className="text-gray-700">{job.city}, {job.country}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900">Job Posted On:</h4>
              <p className="text-gray-700">{new Date(job.jobPostedOn).toLocaleDateString()}</p>
            </div>
            <div className="mb-4 md:col-span-2">
              <h4 className="text-xl font-bold text-gray-900">Description:</h4>
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="mb-4 md:col-span-2">
              <h4 className="text-xl font-bold text-gray-900">Salary:</h4>
              <p className="text-gray-700">
                {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
              </p>
            </div>
          </div>
          {user && user.role !== "Employer" && (
            <div className="text-center mt-6">
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-[#2d5649] text-white px-6 py-3 rounded-lg hover:bg-green-950 transition"
              >
                Apply Now
                
              </Link>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
