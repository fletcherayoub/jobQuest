import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();


  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-lg" onSubmit={handleApplication}>
        <h2 className="text-2xl font-bold mb-4">Job Application Form</h2>
        <div>
          <div className="mt-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              placeholder="Enter First Name"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Your Email"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1">Number</label>
          <input
            type="number"
            name="email"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Your Phone Number"
          
          />
        </div>
        
        <div className="mt-4">
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Enter Address"
          />
        </div>

        
          <label className="block mb-1">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="CoverLetter..."
          />
          

        <div className="mt-4">
          <label className="block mb-1">Upload Your resume</label>
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={handleFileChange}
            style={{ width: "100%" }}
            className="w-full"
          />
        </div>
        <button type="submit" className="mt-6 bg-[#2d5649] text-white py-2 px-4 rounded hover:bg-green-950 transition">
          Apply Now
        </button>

      </form>
    </div>
  );
};

export default Application;
