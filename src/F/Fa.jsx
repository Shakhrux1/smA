import { useEffect, useState } from "react";
import "./styl.scss";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Facilities() {
  const [a, setA] = useState([]);
  const { t, i18n } = useTranslation(); // `i18n` ni chaqiramiz

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
        <title>{t("fa")}</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>

      <div>
        <div className="container">
          <section className="facilities">
            <h2>{t("ge")}</h2>
            <p style={{ marginBottom: "80px" }}>
              {t("the")}.
            </p>
            <div className="facilities-grid">
              {a.map((facility, index) => (
                <div key={index} className="facility-card">
                  <div>
                    <img
                      className="icon"
                      src={facility.icon}
                      alt={facility.title[i18n.language] || facility.title.en} // Tili va zaxira sarlavhasi
                    />
                  </div>
                  <div>
                    <h3>{facility.title[i18n.language] || facility.title.en}</h3> {/* Tili va zaxira sarlavhasi */}
                    <p>{facility.description[i18n.language] || facility.description.en}</p> {/* Tili va zaxira tavsifi */}
                    <Link to={facility.a} href={facility.linkHref}>
                      {facility.linkText[i18n.language] || facility.linkText.en} &gt; {/* Tili va zaxira havolasi */}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bank">
            <img
              width={"500px"}
              height={'400px'}
              style={{ objectFit: "cover" }}
              src="https://www.shutterstock.com/image-photo/african-urban-people-using-atm-260nw-2502850373.jpg"
              alt=""
            />
            <div>
              <h1 style={{ fontSize: "35px", padding: "10px 0" }}>{t("money")}</h1>
              <div style={{ display: "flex", alignItems: 'center', gap: "50px" }}>
                <article className="da">
                  <img
                    width={"50px"}
                    src="https://media.istockphoto.com/id/955419460/vector/automated-teller-machine-symbol.jpg?s=612x612&w=0&k=20&c=VTOSedIhffmSkJ96FrF53bs9rnFZlX9bL1sVfIVRWxI="
                    alt=""
                  />
                  <article>
                    <h2>{t("c")}</h2>
                    <p>{t("atm")}</p>
                    <Link>{t("la")} &gt;</Link>
                  </article>
                </article>
                <article className="da">
                  <img
                    width={"30px"}
                    style={{ marginTop: "10px" }}
                    src="https://cdn-icons-png.flaticon.com/512/71/71123.png"
                    alt=""
                  />
                  <article>
                    <h2>{t("c2")}</h2>
                    <p>{t("atm2")}</p>
                    <Link>{t("la2")} &gt;</Link>
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
