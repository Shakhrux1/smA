import { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Marquee from "react-fast-marquee";
import us from '../icon/user.png';
import "./style.css";
import { Helmet } from "react-helmet";

const CommentSection = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState("");
  const [name, setName] = useState("UserName1");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? JSON.parse(savedTime) : 300; // default to 5 minutes
  });
  const [canComment, setCanComment] = useState(timeLeft === 0); // Start with true if timer is expired
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submit action

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isSubmitted) { // Only set the timer if not submitted
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("timeLeft", newTime); // Save updated time to localStorage

          // Check if the timer has reached zero
          

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setCanComment(true); // Ensure canComment is set to true when timer expires
      localStorage.setItem("timeLeft", 300); // Reset in localStorage if it was set to 0
      setTimeLeft(300); // Reset the timer state to 5 minutes
    }

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]); // Add isSubmitted to dependency array

  const handleSubmit = () => {
    setIsSubmitted(true); // Mark as submitted to stop the timer
  };

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    const chart = am4core.create("cases", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    polygonSeries.exclude = ["AQ"];

    // Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3),
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    polygonSeries.data = [
      { id: "US", value: 4447100 },
      { id: "FR", value: 626932 },
      { id: "GB", value: 5130632 },
      { id: "LB", value: 2673400 },
    ];

    // Set up heat legend
    const heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "center";
    heatLegend.valign = "bottom";
    heatLegend.width = am4core.percent(20);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 40000000;

    // Set up custom heat map legend labels using axis ranges
    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "Little";
    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "A lot!";

    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add(
      "text",
      function (labelText) {
        return "";
      }
    );

    // Configure series tooltip
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#FF6633");

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    // Save comments to localStorage whenever they change
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (comment.trim().length > 0 && comment.split(" ").length <= 120) {
      if (canComment) {
        setComments((prev) => [...prev, { name: "User", comment }]); // Adjust 'name' accordingly
        setComment(""); // Clear the comment input
        setCanComment(false); // Prevent further comments
        setError("Your comment has been accepted!");
        setTimeout(() => setError(""), 3000); // Clear success message after 3 seconds
      } else {
        setErrorMessage("Please wait for the timer to finish before submitting another comment.");
        setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
      }
    } else {
      setErrorMessage("Your comment must be between 1 and 120 words.");
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <>
      <Helmet>
        <title>Comments</title> {/* Do'kon nomi titlega kiritildi */}
        <meta
          name="description"
          content="This is my awesome page description."
        />
      </Helmet>
      <div className="container">
        <div className="fl">
          <div>
            <div className="comment-section">
              <h2>Leave a Comment</h2>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Enter your name (optional)"
                  onChange={(e) =>
                    setName(e.target.value || "Automatic Name User")
                  }
                  disabled={!canComment} // Disable input if timer is active
                />
                <textarea
                  placeholder="Write your comment (max 120 words)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={120}
                  disabled={!canComment} // Disable textarea if timer is active
                />
                <button type="submit" disabled={!canComment} onClick={handleSubmit}>
                  Send
                </button>
              </form>
              <div className="timer">
                {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
              </div>
            </div>
          </div>
          <div id="cases" style={{ width: "600px", height: "500px" }}></div>
        </div>
        {errorMessage && (
    <div className="not" style={{border: errorMessage.includes("timer") ? "2px solid green" : "2px solid red"}}>
      <h2>{errorMessage}</h2>
    </div>
    
  )}
  {error && (
    <div className="not" style={{border: error.includes("timer") ? "2px solid green" : "2px solid green"}}>
      <h2>{error}</h2>
    </div>
    
  )}
        <div className="girdCom">
          <div className="comments">
            <Marquee pauseOnHover={true} gradient={false}>
              {comments.map((c, index) => (
                <div key={index} className="comment">
                  <article>
                    <img width={'30px'} src={us} alt="" />
                    <h3>{c.name}</h3>
                  </article>
                  <p>{c.comment}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
