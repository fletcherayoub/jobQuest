import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import {  SiIbm } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 knoxville, florida",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
   
    {
      id: 2,
      title: "Apple",
      location: "Street 10 knoxville, los angeles",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 3,
      title: "Amazon",
      location: "Street 10 knoxville, wachington",
      openPositions: 89,
      icon: <FaAmazon />,
    },
    {
      id: 4,
      title: "IBM",
      location: "Street 10 knoxville, london",
      openPositions: 89,
      icon: <SiIbm />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;