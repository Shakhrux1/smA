import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [arrivalTime, setArrivalTime] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [exitTime, setExitTime] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    startDate: "",
    arrivalTime: "",
    endDate: "",
    exitTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrorMessages = {
      startDate: "",
      arrivalTime: "",
      endDate: "",
      exitTime: "",
    };

    let isValid = true;

    if (!startDate) {
      newErrorMessages.startDate = "Please select 'Start' date";
      isValid = false;
    }

    if (!arrivalTime) {
      newErrorMessages.arrivalTime = "Please select estimated time of arrival";
      isValid = false;
    }

    if (!endDate) {
      newErrorMessages.endDate = "Please select 'End' date";
      isValid = false;
    }

    if (!exitTime) {
      newErrorMessages.exitTime = "Please select estimated time of exit";
      isValid = false;
    }

    if (startDate && endDate && startDate >= endDate) {
      newErrorMessages.endDate = "End date must be after start date";
      isValid = false;
    }

    setErrorMessages(newErrorMessages);
    setFormValid(isValid);

    if (isValid) {
      setTimeout(() => {
        setShowModal(true);
      }, 1200);
    }
  };

  const handleArrivalTimeChange = (e) => {
    const value = e.target.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (regex.test(value) || value === "") {
      setArrivalTime(value);
    }
  };

  const handleExitTimeChange = (e) => {
    const value = e.target.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (regex.test(value) || value === "") {
      setExitTime(value);
    }
  };

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          
        <div className="ff">
        <article>
            <h4>Car Park Name</h4>
            <h3>Terminal Car Park
            </h3>
            <p>
            Covered parking and short walking distance to check-in within 2 minutes
            </p>
         </article>
         <article>
                <h4>Price</h4>
                <h6>325.00 AED</h6>
         </article>
         <article>
            <h4>Payment Instructions
            </h4>
            <h5>ote: No Advance Payments required</h5>
            <ul>
                <li>Cash/Credit/Debit card payment - At automatic payment machines located at lobbies</li>
                <li>Debit/Credit card payment – At exit lanes</li>
            </ul>
         </article>
        </div>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="booking-form">
      <div className="container">
        <h1 style={{ fontSize: "25px" }}>Car Park Pre-booking</h1>
        <div className="color">
          <form onSubmit={handleSubmit}>
            <div
              className={`form-group ${
                errorMessages.startDate ? "has-error" : ""
              }`}
            >
              <label htmlFor="start-date">Start Date*</label>
              <br />
              <div className="calendar">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className={`custom-datepicker ${
                    errorMessages.startDate ? "has-errors" : ""
                  }`}
                  minDate={new Date()}
                />
              </div>
              {errorMessages.startDate && (
                <span className="error-message">
                  {errorMessages.startDate}
                </span>
              )}
            </div>

            <div
              className={`form-group ${
                errorMessages.arrivalTime ? "has-error" : ""
              }`}
            >
              <label htmlFor="arrival-time">Estimated Time of Arrival*</label>
              <br />
              <input
                type="time"
                id="arrival-time"
                className={`form-control ${
                  errorMessages.arrivalTime ? "border-red" : ""
                }`}
                value={arrivalTime}
                onChange={handleArrivalTimeChange}
              />
              <br />
              {errorMessages.arrivalTime && (
                <span className="error-message">
                  {errorMessages.arrivalTime}
                </span>
              )}
            </div>

            <div
              className={`form-group ${
                errorMessages.endDate ? "has-error" : ""
              }`}
            >
              <label htmlFor="end-date">End Date*</label>
              <br />
              <div className="calendar">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className={`custom-datepicker ${
                    errorMessages.endDate ? "has-errors" : ""
                  }`}
                  minDate={new Date()}
                />
              </div>
              {errorMessages.endDate && (
                <span className="error-message">{errorMessages.endDate}</span>
              )}
            </div>

            <div
              className={`form-group ${
                errorMessages.exitTime ? "has-error" : ""
              }`}
            >
              <label htmlFor="exit-time">Estimated Time of Exit*</label>
              <br />
              <input
                type="time"
                id="exit-time"
                className={`form-control ${
                  errorMessages.exitTime ? "border-red" : ""
                }`}
                value={exitTime}
                onChange={handleExitTimeChange}
              />
              <br />
              {errorMessages.exitTime && (
                <span className="error-message">{errorMessages.exitTime}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Booking
            </button>
          </form>

          <Modal />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
