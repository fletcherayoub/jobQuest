import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-lg" onSubmit={handleJobPost}>
        <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
        <div className="mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Job Title"
          />
        </div>
        <div className="mt-4">
          <select
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Category"
           > 
           <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Frontend Web Development">Frontend Web Development</option>
                <option value="MERN Stack Development">MERN STACK Development </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Software Testing">Software Testing</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="User Experience">User Experience</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Sales and Marketing ">Sales and Marketing </option>
                <option value="Human Resources">Human Resources</option>
                <option value="Game Development">Game Development</option>
                <option value="Blockchain and Cryptocurrency">Blockchain and Cryptocurrency</option>
          </select>
        </div>
        <div className="mt-4">
          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Job Description"
          />
        </div>
        
        <div className="mt-4">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Country"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
            placeholder="City"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
            placeholder="Location"
          />
        </div>
        <div className="mt-4">
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
          {salaryType === "Fixed Salary" && (
            <input
              type="number"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
              placeholder="Fixed Salary"
            />
          )}
          {salaryType === "Ranged Salary" && (
            <div className="flex">
              <input
                type="number"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 mt-2 mr-1"
                placeholder="Salary From"
              />
              <input
                type="number"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 mt-2 ml-1"
                placeholder="Salary To"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 bg-[#2d5649] text-white py-2 px-4 rounded hover:bg-green-950 transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
