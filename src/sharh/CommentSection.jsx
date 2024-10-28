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
    return savedTime ? JSON.parse(savedTime) : 300;
  });
  const [canComment, setCanComment] = useState(timeLeft === 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("timeLeft", newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setCanComment(true); // Enable commenting when timer finishes
      setTimeLeft(300); // Reset the timer
    }

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (comment.trim().length > 0 && comment.split(" ").length <= 120) {
      if (canComment) {
        setComments((prev) => [...prev, { name, comment }]);
        setComment(""); // Clear the comment input
        setCanComment(false); // Disable further comments for 5 minutes
        setIsSubmitted(true); // Mark as submitted to stop the timer reset
        setTimeLeft(300); // Reset the timer to 5 minutes
        setError("Your comment has been accepted!");
        setTimeout(() => setError(""), 3000);
      } else {
        setErrorMessage("Please wait 5 minutes before submitting another comment.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } else {
      setErrorMessage("Your comment must be between 1 and 120 words.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create("cases", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;
    chart.projection = new am4maps.projections.Miller();

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3),
    });
    polygonSeries.useGeodata = true;
    polygonSeries.data = [
      { id: "US", value: 4447100 },
      { id: "FR", value: 626932 },
      { id: "GB", value: 5130632 },
      { id: "LB", value: 2673400 },
    ];

    const heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "center";
    heatLegend.valign = "bottom";
    heatLegend.width = am4core.percent(20);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 40000000;

    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "Little";
    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "A lot!";
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", () => "");

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;
    const hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#FF6633");

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <>
      <Helmet>
        <title>Comments</title>
        <meta name="description" content="This is my awesome page description." />
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
                  onChange={(e) => setName(e.target.value || "Automatic Name User")}
                  disabled={!canComment}
                />
                <textarea
                  placeholder="Write your comment (max 120 words)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={120}
                  disabled={!canComment}
                />
                <button type="submit" disabled={!canComment}>
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
          <div className="not" style={{ border: "2px solid red" }}>
            <h2>{errorMessage}</h2>
          </div>
        )}
        {error && (
          <div className="not" style={{ border: "2px solid green" }}>
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
