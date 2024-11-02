import { useEffect, useState } from "react";
import "./styl.scss";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Facilities() {
  const [a, setA] = useState([]);
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setA(data.fa));
  }, []);
  if (!a) {
    return <Loading />;
  }
  return (
    <>
        <Helmet>
        <title>Facilities</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      
    <div >
      <div className="container" >
        
        <section className="facilities">
          <h2>General Facilities</h2>
          <p style={{ marginBottom: "80px" }}>
            All the convenience you might need.
          </p>
          <div className="facilities-grid">
            {a.map((facility, index) => (
              <div key={index} className="facility-card">
                <div>
                  <img
                    className="icon"
                    src={facility.icon}
                    alt={facility.title}
                  />
                </div>
                <div>
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                  <Link to={facility.a} href={facility.linkHref}>{facility.linkText} &gt;</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="bank">
          <img width={"500px"}
          height={'400px'}
          style={{objectFit:"cover"}}
            src="https://www.shutterstock.com/image-photo/african-urban-people-using-atm-260nw-2502850373.jpg"
            alt=""
          />
          <div >
            <h1 style={{fontSize:"35px", padding:"10px 0"}}>Money services</h1>
            <div  style={{display:"flex", alignItems:'center',gap:"50px"}}>
              <article className="da"  >
                <img
                  width={"50px"}
                  src="https://media.istockphoto.com/id/955419460/vector/automated-teller-machine-symbol.jpg?s=612x612&w=0&k=20&c=VTOSedIhffmSkJ96FrF53bs9rnFZlX9bL1sVfIVRWxI="
                  alt=""
                />
                <article>
                  <h2>Cash Machines</h2>
                  <p>ATMs for quick and convenient cash transactions.</p>
                  <Link>See Cash Machines &gt;</Link>
                </article>
              </article>
              <article className="da" >
                <img width={"30px"}
                style={{marginTop:"10px"}}
                  src="https://cdn-icons-png.flaticon.com/512/71/71123.png"
                  alt=""
                />

                <article>
                  <h2>Currency exchange</h2>
                  <p>Exchange your money for any currency you need.</p>
                  <Link> Find Currency Exchange  &gt;</Link>
                </article>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Facilities;
