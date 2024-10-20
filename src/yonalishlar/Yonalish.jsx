import { useEffect, useState } from "react";
import './style.css';

function Yonalish() {
    const [yol, setYol] = useState([]);
    const [filteredYol, setFilteredYol] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(""); // O'zgaruvchini belgilash
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Accordion holati
    const [fill, setFill] = useState(""); // Tanlangan kategoriya

    useEffect(() => {
        fetch("/db.json")
            .then((response) => response.json())
            .then((data) => {
                const updatedData = data.yonalish.map(item => {
                    const today = new Date();
                    // 6 kun keyin sanani olish
                    const futureDate = new Date(today);
                    futureDate.setDate(today.getDate() + 6); // 6 kun keyin
                    const options = { month: 'long', day: 'numeric' }; // "October 26"
                    const formattedDate = futureDate.toLocaleDateString('en-US', options); // Formatted date

                    return {
                        ...item,
                        ketish: `Departure Date: ${formattedDate}`, // "Departure Date: October 26"
                    };
                });
                setYol(updatedData);
                setFilteredYol(updatedData); // Dastlab barcha yo'nalishlarni ko'rsatish
            })
            .catch((error) => console.error(`apidan xatolik ${error}`));
    }, []);

    useEffect(() => {
        // Filter the data whenever the selected region changes
        if (selectedRegion === "") {
            setFilteredYol(yol); // "All" tanlanganda barcha yo'nalishlarni ko'rsatish
        } else {
            setFilteredYol(yol.filter(item => item.region === selectedRegion));
        }
    }, [selectedRegion, yol]);

    const handleFilterChange = (region, label) => {
        setSelectedRegion(region);
        setFill(label); // Tanlangan kategoriya
        setIsAccordionOpen(false); // Accordionni yopish
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <>
            <div className="container">
                <div className="yonalish">
                    <div className="flex">
                        <h1>Main Directions</h1>
                        <article>
                            <div className="accordion">
                                <div className="accordion-header" onClick={toggleAccordion}>
                                    <h2>{fill || "Select a category"}</h2> {/* Tanlangan kategoriya yoki matn */}
                                    <span>{isAccordionOpen ? "-" : "+"}</span> {/* Plus/Minus belgisi */}
                                </div>

                                {/* Accordion faqat ochiq bo'lganda ko'rsatiladi */}
                                {isAccordionOpen && (
                                    <div className="accordion-content">
                                        <ul>
                                            <li onClick={() => handleFilterChange("", "All")}>All</li>
                                            <li onClick={() => handleFilterChange("osiyo", "Asia")}>Asia</li>
                                            <li onClick={() => handleFilterChange("yevropa", "Europe")}>Europe</li>
                                            <li onClick={() => handleFilterChange("aqsh", "US")}>US</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button className="btn">View All</button>
                        </article>
                    </div>
                    <div className="grid">
                        {filteredYol.map((item, id) => (
                            <div key={id} className="box">
                                <img src={item.img} alt="" />
                                <h2>{item.t}</h2>
                                <h5>{item.ketish}</h5>
                                <article>
                                    <p>From: <span>{item.narx}</span></p>
                                    <button className="btn2">
                                        {item.btn}
                                    </button>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Yonalish;
