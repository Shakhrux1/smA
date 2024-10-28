import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom"; // useNavigate qo'shildi
import './style.css';

function Yonalish({ showAll = false }) { // showAll props qo'shildi
    const [yol, setYol] = useState([]);
    const [filteredYol, setFilteredYol] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); 
    const [fill, setFill] = useState(""); 
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        fetch("https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json")
            .then((response) => response.json())
            .then((data) => {
                const updatedData = data.yonalish.map(item => {
                    const today = new Date();
                    const futureDate = new Date(today);
                    futureDate.setDate(today.getDate() + 6);
                    const options = { month: 'long', day: 'numeric' };
                    const formattedDate = futureDate.toLocaleDateString('en-US', options);

                    return {
                        ...item,
                        ketish: `Departure Date: ${formattedDate}`,
                    };
                });
                setYol(updatedData);
                setFilteredYol(updatedData);
            })
            .catch((error) => console.error(`apidan xatolik ${error}`));
    }, []);

    useEffect(() => {
        if (selectedRegion === "") {
            setFilteredYol(yol);
        } else {
            setFilteredYol(yol.filter(item => item.region === selectedRegion));
        }
    }, [selectedRegion, yol]);

    const handleFilterChange = (region, label) => {
        setSelectedRegion(region);
        setFill(label);
        setIsAccordionOpen(false);
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleMoreClick = () => {
        navigate("/Direction"); // More tugmasi bosilganda /yonalish sahifasiga yo'naltirish
    };

    return (
        <div className="container">
            <div className="yonalish" style={{marginTop:'120px   '}}>
                <div className="flex">
                    <h1>Main Directions</h1>
                    <article>
                        <div className="accordion">
                            <div className="accordion-header" onClick={toggleAccordion}>
                                <h2>{fill || "Select a category"}</h2>
                                <span>{isAccordionOpen ? "-" : "+"}</span>
                            </div>
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
                        {!showAll && <button className="btn" onClick={handleMoreClick}>More</button>} {/* More tugmasi */}
                    </article>
                </div>
                <div className="grid">
                    {(showAll ? filteredYol : filteredYol.slice(0, 7)).map((item, id) => ( // showAll ga qarab ko'rsatish
                        <div key={id} className="box">
                            <img src={item.img} alt="" />
                            <h2>{item.t}</h2>
                            <h5>{item.ketish}</h5>
                            <article>
                                <p>From: <span>{item.narx}</span></p>
                                
                                
                                <button className="btn2">{item.btn}</button>
                                
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Yonalish;
