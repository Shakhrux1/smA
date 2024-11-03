import "./style.scss";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import airFrom from "../icon/icons8-airplane-take-off-48 (1).png";
import airTo from "../icon/icons8-airplane-landing-48.png";
import al from "../icon/replace.png";
import cal from "../icon/icons8-calendar-24.png";
import add from "../icon/icons8-add-48 (1).png";
import sub from "../icon/icons8-subtraction-32.png";
import peop from "../icon/icons8-people-24.png";
import seat from "../icon/icons8-seating-50.png";
import next from "../icon/next.png";
import humo from '../icon/Humo-01.jpg'
import { useTranslation } from "react-i18next";
import uz from '../icon/uzcard1.png'
import visa from '../icon/Visa_Inc._logo.svg.png'
const cities = [
  {
    value: "DEL",
    label: "Indira Gandhi International Airport (DEL), New Delhi, India",
  },
  {
    value: "BKK",
    label: "Suvarnabhumi International Airport (BKK), Bangkok, Thailand",
  },
  { value: "LON", label: "London (LON), United Kingdom" },
  { value: "AMS", label: "Schiphol Airport (AMS), Amsterdam, Netherlands" },
  { value: "LAX", label: "Los Angeles (LAX), United States" },
  { value: "SYD", label: "Sydney Airport (SYD), Australia" },
  { value: "MEL", label: "Melbourne (MEL), Australia" },
  { value: "DXB", label: "Dubai International Airport (DXB), UAE" },
  { value: "HKG", label: "Hong Kong International Airport (HKG), Hong Kong" },
  { value: "SIN", label: "Singapore International Airport (SIN), Singapore" },
  {
    value: "JFK",
    label: "John F. Kennedy International Airport (JFK), New York, USA",
  },
  { value: "CDG", label: "Charles de Gaulle Airport (CDG), Paris, France" },
  { value: "ICN", label: "Incheon International Airport (ICN), Korea" },
  { value: "MUC", label: "Munich International Airport (MUC), Germany" },
  { value: "FRA", label: "Frankfurt International Airport (FRA), Germany" },
  { value: "SFO", label: "San Francisco International Airport (SFO), USA" },
  { value: "ZRH", label: "Zurich International Airport (ZRH), Switzerland" },
  {
    value: "YYZ",
    label: "Toronto Pearson International Airport (YYZ), Canada",
  },
  {
    value: "BOM",
    label:
      "Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai, India",
  },
  {
    value: "CPT",
    label: "Cape Town International Airport (CPT), South Africa",
  },
  { value: "TLV", label: "Ben Gurion International Airport (TLV), Israel" },
  { value: "DUS", label: "Dusseldorf International Airport (DUS), Germany" },
];

const FlightBooking = () => {
  const {t} = useTranslation()
  const [showNextModal, setShowNextModal] = useState(false);
  const accordionRef = useRef(null);
  const classAccordionRef = useRef(null);
  const [selectedClass, setSelectedClass] = useState("Economy Class");
  const [alish, setAlish] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isReturnChecked, setIsReturnChecked] = useState(false);
  const rotet = ()=>{
    setAlish(pev => !pev)
  }
  const [errors, setErrors] = useState({
    from: false,
    to: false,
    returnDate: false,
  });
  const handleClickOutside = (event) => {
    if (accordionRef.current && !accordionRef.current.contains(event.target)) {
      setIsAccordionOpen(false);
    }
    if (
      classAccordionRef.current &&
      !classAccordionRef.current.contains(event.target)
    ) {
      setIsClassAccordionOpen(false);
    }
  };
  const validateInputs = () => {
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last-name');
    const cardNumberInput = document.getElementById('card-number');

    // Ism va familiya bo'yicha tekshirish
    nameInput.style.border = name ? '1px solid black' : '1px solid red';
    lastNameInput.style.border = lastName ? '1px solid black' : '1px solid red';

    // Kartalar raqamini tekshirish
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/; // Format: 1234 5678 9123 4567
    cardNumberInput.style.border = cardNumberPattern.test(cardNumber) ? '1px solid black' : '1px solid red';

    // Shopping tugmasi bosilganda
    if (name && lastName && cardNumberPattern.test(cardNumber)) {
      closeModal(); // Modalni yopish
      setTimeout(() => {
        setShowNextModal(true); // 2 sekunddan so'ng yangi modalni ko'rsatish
      }, 2000);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, ''); // Bo'sh joylarni olib tashlash

    // 16 raqamdan oshmasligini tekshirish
    if (value.length > 16) return;

    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' '; // Har 4 raqamdan so'ng bo'sh joy qo'shish
      }
      formattedValue += value[i];
    }

    setCardNumber(formattedValue); // Formatlangan qiymatni saqlash
  };
  const [showModal, setShowModal] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isClassAccordionOpen, setIsClassAccordionOpen] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("flightBookingData"));
    if (savedData) {
      setSelectedClass(savedData.selectedClass);
      setFrom(savedData.from);
      setTo(savedData.to);
      setDepartureDate(new Date(savedData.departureDate));
      setReturnDate(new Date(savedData.returnDate));
      setAdults(savedData.adults);
      setChildren(savedData.children);
      setInfants(savedData.infants);
      setIsReturnChecked(savedData.isReturnChecked);
    }
  }, []);

  // Save data to local storage whenever relevant state changes
  useEffect(() => {
    const flightBookingData = {
      selectedClass,
      from,
      to,
      departureDate: departureDate.toISOString(),
      returnDate: returnDate.toISOString(),
      adults,
      children,
      infants,
      isReturnChecked,
    };
    localStorage.setItem(
      "flightBookingData",
      JSON.stringify(flightBookingData)
    );
  }, [
    selectedClass,
    from,
    to,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    isReturnChecked,
  ]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const newErrors = {
      from: !from,
      to: !to,
      returnDate: isReturnChecked && returnDate <= departureDate,
    };
    setErrors(newErrors);

    if (!newErrors.from && !newErrors.to && !newErrors.returnDate) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div id="bgc" >
      <div className="container">
        <div className="flight-booking" >
          <div className="flexbox">
            <h2 >{t("z")}</h2>
            <article id="article">
              <div className="passengers" ref={accordionRef}>
                <button
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  className="accordion-button"
                >
                  <img src={peop} alt="" />({adults} {t("ab")} {children} {t("ch")},{" "}
                  {infants} Infant)
                </button>
                {isAccordionOpen && (
                  <div className="accordion-content">
                    {/* Adults Count Section */}
                    <div className="passenger-count">
                      <article
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                        }}
                      >
                        <label>{t("ad")}</label>
                        <span style={{ fontSize: "8px", padding: 0 }}>
                          {t("age")}
                        </span>
                      </article>
                      <div className="counter">
                        <img
                          src={sub}
                          alt="subtract"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                        />
                        <span>{adults}</span>
                        <img
                          src={add}
                          alt="add"
                          onClick={() => setAdults(adults + 1)}
                        />
                      </div>
                    </div>

                    {/* Children Count Section */}
                    <div className="passenger-count">
                      <article
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                        }}
                      >
                        <label>{t("chil")}</label>
                        <span style={{ fontSize: "8px", padding: 0 }}>
                          {t("age2")}
                        </span>
                      </article>
                      <div className="counter">
                        <img
                          src={sub}
                          alt="subtract"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                        />
                        <span>{children}</span>
                        <img
                          src={add}
                          alt="add"
                          onClick={() => setChildren(children + 1)}
                        />
                      </div>
                    </div>

                    {/* Infants Count Section */}
                    <div className="passenger-count">
                      <article
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                        }}
                      >
                        <label>{t("in")}</label>
                        <span style={{ fontSize: "8px", padding: 0 }}>
                          {t("bel")}
                        </span>
                      </article>
                      <div className="counter">
                        <img
                          src={sub}
                          alt="subtract"
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                        />
                        <span>{infants}</span>
                        <img
                          src={add}
                          alt="add"
                          onClick={() => setInfants(infants + 1)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setIsAccordionOpen(false)}
                      id="click"
                    >
                      {t("done")}
                    </button>
                  </div>
                )}
              </div>

              {/* Economy Class Accordion */}
              <div className="accordionn" ref={classAccordionRef}>
                <button
                  className="accordion-buttons"
                  onClick={() => setIsClassAccordionOpen(!isClassAccordionOpen)}
                >
                  <img width={"24px"} src={seat} alt="" />
                  {selectedClass}
                </button>
                {isClassAccordionOpen && (
                  <div className="accordion-contents">
                    <ul>
                      <li
                        onClick={() => {
                          setSelectedClass("Class: Premium ");
                          setIsClassAccordionOpen(false);
                        }}
                      >
                        {t("pr")}{" "}
                      </li>
                      <li
                        onClick={() => {
                          setSelectedClass("Class: Business");
                          setIsClassAccordionOpen(false);
                        }}
                      >
                        {t("bu")}
                      </li>
                      <li
                        onClick={() => {
                          setSelectedClass("Class: Economy");
                          setIsClassAccordionOpen(false);
                        }}
                      >
                        {t("ec")}
                      </li>
                      <li
                        onClick={() => {
                          setSelectedClass("Class: First Class");
                          setIsClassAccordionOpen(false);
                        }}
                      >
                        {t("fi")}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </article>
          </div>
          <div className="booking-section">
            <div className="flex">
              <div className="from-to">
                <div className="from">
                  <label htmlFor="from">{t("from")}</label>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="border1"
                  >
                    <img src={airFrom} alt="airFrom" width={"30px"} />
                    <Select
                      id="from"
                      options={cities}
                      value={from}
                      onChange={setFrom}
                      placeholder="From"
                      className={errors.from ? "error" : ""}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: "280px",
                          position: "relative",
                        }),
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "20px 0px 0 20px",
                          margin: "0",
                          padding: "10px 0",
                          border: "0",
                          boxShadow: "none",
                          textAlign: "center",
                          "&:focus": {
                            border: "0",
                            boxShadow: "none",
                          },
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          display: "none",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="swap-icon" onClick={handleSwap}>
                  <img
                    onClick={() => rotet()}
                    className={
                      alish ? "activess" : "actives"
                    }
                    width={"38px"}
                    style={{ cursor: "pointer" }}
                    src={al}
                    alt=""
                  />
                </div>

                <div className="to">
                  <label htmlFor="to">{t("to")}</label>
                  <div
                    className="border"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={airTo} alt="airTo" width={"30px"} />
                    <Select
                      id="to"
                      options={cities}
                      value={to}
                      onChange={setTo}
                      placeholder="To"
                      className={errors.to ? "error" : ""}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: "280px",
                          position: "relative",
                        }),
                        control: (provided) => ({
                          ...provided,
                          padding: "10px",
                          border: "0",
                          borderRadius: "0px 20px 20px 0",
                          boxShadow: "none",
                          textAlign: "center",
                          "&:focus": {
                            border: "0",
                            boxShadow: "none",
                          },
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          display: "none",
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="dates">
                <div className="departure-date">
                  <label htmlFor="departure">{t("date")}</label>
                  <br />
                  <div
                    className="calendar"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={cal} alt="calendar" />
                    <DatePicker
                      selected={departureDate}
                      onChange={(date) => setDepartureDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="custom-datepicker"
                    />
                  </div>
                </div>

                <div className="return-date">
                  <label>
                    <input
                      type="checkbox"
                      checked={isReturnChecked}
                      onChange={() => setIsReturnChecked(!isReturnChecked)}
                    />
                    {t("return")}
                  </label>
                  <br />
                  <div
                    className="clendar2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={cal} alt="calendar" />
                    <DatePicker
                      selected={returnDate}
                      id="bor"
                      onChange={setReturnDate}
                      dateFormat="MMMM d, yyyy"
                      className={errors.returnDate ? "error" : ""}
                      disabled={!isReturnChecked}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="margin">
              <button onClick={handleSearch} className="search-button">
                {t("next")}{" "}
                <span>
                  <img src={next} alt="next" />
                </span>
              </button>
            </div>
          </div>

          {showModal && ( // Agar showModal true bo'lsa, modalni ko'rsatish
        <div className="modal">
          <div className="modal-contents">
            <span className="close" onClick={closeModal}>
              &times; {/* Modalni yopish uchun tugma */}
            </span>
            <div className="dad">
              <div>
                <label htmlFor="name">{t("name")}</label><br />
                <input
                  id="name"
                  type="text"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Ismni o'zgartirish
                /><br />
                <label htmlFor="last-name">{t("Lname")}</label><br />
                <input
                  id="last-name"
                  type="text"
                  placeholder="Last name..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} // Familiyani o'zgartirish
                />
              </div>
              <div>
                <label htmlFor="card-number">{t("cNumber")}</label><br />
                <input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  value={cardNumber}
                  onChange={handleCardNumberChange} // Kartalar raqamini o'zgartirish
                />
                <article style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={humo} width={"40px"} alt="" />
                  <img src={uz} width={"40px"} alt="" />
                  <img src={visa} width={"40px"} alt="" />
                </article>
              </div>
            </div>
            <div className="a">
              <button className="oky" onClick={validateInputs}>{t("shop")}</button> {/* Shopping tugmasi */}
            </div>
          </div>
        </div>
      )}

      {/* Yangi modal */}
      {showNextModal && ( // Agar showNextModal true bo'lsa, yangi modalni ko'rsatish
        <div className="modal">
          <div className="modal-contents">
            <span className="close" onClick={() => setShowNextModal(false)}>
              &times; {/* Yangi modalni yopish uchun tugma */}
            </span>
            {/* <p>{`Name: ${name}, Last Name: ${lastName}`}</p>
            <p>{`From: ${from ? from.label : 'Not selected'}`}</p> 
      <p>{`To: ${to ? to.label : 'Not selected'}`}</p>  */}
            <div className="cards">
              <div className="alis">
              <h1>{name} {lastName}</h1>
              <p>{selectedClass}</p>
              </div>
              <div className="al">
                <article>
                <p>{`To: ${to ? to.label : 'Not selected'}`}</p>
                <p>{`From: ${from ? from.label : 'Not selected'}`}</p>
                </article>
                <article>
                <p>{`Departure Date: ${departureDate ? departureDate.toLocaleDateString() : 'Not selected'}`}</p>
                <p>{`Return Date: ${isReturnChecked ? (returnDate ? returnDate.toLocaleDateString() : 'Not selected') : 'Not applicable'}`}</p>
                </article>
              <img width={'100px'} src="https://cdn.prod.website-files.com/5f493c28a3dde53ac5e21dd2/5f5f9b61aa3c75138ea4421d_ZKgujxyClGEHousdrECljq_GrBC7HXrfS6CEs8K7lAx93m2Ev4fr1-clA5fUD8ai6SM7Ea0FUi1shYO1-BrTjBy3dMGzF9lQfy5rk5PlM4jYaqMtpxaEyZNn7ndiG3L2db5gz6n5.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
