import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctors }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card m-2"
        style={{cursor:"pointer"}}
        onClick={() => navigate(`/doctor/book-appointment/${doctors._id}`)}
      >
        <div className="card-header">
          Dr. {doctors.firstName} {doctors.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctors.specialization}
          </p>
          <p>
            <b>Experience</b> {doctors.experience}
          </p>
          <p>
            <b>Fee per Consultation</b> {doctors.feesPerCusaltation}
          </p>
          <p>
            <b>Timings</b> {doctors.timings[0]} - {doctors.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
