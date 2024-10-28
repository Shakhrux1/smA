import { Helmet } from "react-helmet";
import "./style.css";

const Dashboard = () => {
  return (
    <div className="body">
      <Helmet>
        <title>Dashboard</title> {/* Do'kon nomi titlega kiritildi */}
        <meta
          name="description"
          content="This is my awesome page description."
        />
      </Helmet>
      <div className="container">
        <div className="db" style={{paddingTop:"130px "}}>
          <div className="db__toolbar">
            <h1 className="db__heading">Samarkand Air</h1>
            <div className="db__toolbar-btns">
              <button className="db__select" type="button">
                <svg
                  className="db__select-icon"
                  width="24px"
                  height="24px"
                  aria-hidden="true"
                >
                  <use xlinkHref="#calendar" />
                </svg>
                Date
              </button>
              <button className="db__select" type="button">
                <svg
                  className="db__select-icon"
                  width="24px"
                  height="24px"
                  aria-hidden="true"
                >
                  <use xlinkHref="#export" />
                </svg>
                Export
              </button>
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__top-stat">Today’s Revenue</h2>
            <div className="db__progress">
              <div
                className="db__progress-fill"
                style={{ transform: "translateX(15%)" }}
              ></div>
            </div>
            <div className="db__counter">
              <div className="db__counter-value" title="$3,330,050.90">
                $3.33M
              </div>
              <div className="db__counter-label">
                <strong>+15%</strong>
                <br />
                <small>vs yesterday</small>
              </div>
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__top-stat">Today’s Orders</h2>
            <div className="db__progress">
              <div
                className="db__progress-fill"
                style={{ transform: "translateX(20%)" }}
              ></div>
            </div>
            <div className="db__counter">
              <div className="db__counter-value">7,410</div>
              <div className="db__counter-label">
                <strong>+20%</strong>
                <br />
                <small>vs yesterday</small>
              </div>
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__top-stat">Avg. Order Value</h2>
            <div className="db__progress">
              <div
                className="db__progress-fill"
                style={{ transform: "translateX(42%)" }}
              ></div>
            </div>
            <div className="db__counter">
              <div className="db__counter-value">$449.40</div>
              <div className="db__counter-label">
                <strong>+42%</strong>
                <br />
                <small>vs yesterday</small>
              </div>
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__subheading">Sales in Last 7 Days</h2>
            <div className="db__bars">
              {[
                "$4,610,555.90",
                "$3,612,857.76",
                "$2,137,371.54",
                "$4,856,109.94",
                "$3,662,766.81",
                "$2,895,150.25",
                "$3,330,050.90",
              ].map((value, index) => (
                <div className="db__bars-cell" key={index}>
                  <div className="db__bars-cell-bar" title={value}>
                    <div
                      className="db__bars-cell-bar-fill"
                      style={{ transform: `translateY(-${(index + 1) * 10}%)` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="db__bars-cell">$5M</div>
              <div className="db__bars-cell">$4M</div>
              <div className="db__bars-cell">$3M</div>
              <div className="db__bars-cell">$2M</div>
              <div className="db__bars-cell">$1M</div>
              <div className="db__bars-cell"></div>
              {["5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7"].map(
                (date, index) => (
                  <div className="db__bars-cell" key={index}>
                    <time dateTime={`2022-05-0${index + 1}`}>{date}</time>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__subheading">Famous places</h2>
            <table className="db__product-table">
              <thead>
                <tr>
                  <th>Place name</th>
                  <th>Bought It</th>
                  <th>Price</th>
                  
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "China",
                    orders: 2710,
                    status: "In Stock",
                    price: "$599.99",
                    statusClass: "db__status--green",
                  },
                  {
                    name: "Dubai",
                    orders: 1066,
                    status: "Out of Stock",
                    price: "$1199.99",
                    statusClass: "db__status--red",
                  },
                  {
                    name: "Fransy",
                    orders: 102,
                    status: "In Stock",
                    price: "$49.99",
                    statusClass: "db__status--green",
                  },
                ].map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div className="db__product">
                        <div className="db__product-details">
                          <div className="db__product-detail-line">
                            {product.name}
                          </div>
                          <div className="db__product-detail-line">
                            <small>{product.orders} Orders</small>
                          </div>
                          <div className={`db__status ${product.statusClass}`}>
                            {product.status}
                          </div>
                        </div>
                        <div className="db__product-details">
                          <strong>{product.price}</strong>
                        </div>
                      </div>
                    </td>
                    <td>{product.orders}</td>
                    <td className={`db__status ${product.statusClass}`}>
                      {product.status}
                    </td>
                    <td>
                      <strong>{product.price}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="db__cell">
            <h2 className="db__subheading">Most visited places</h2>
            <div className="db__bubbles">
              <div className="db__bubble">
                <span className="db__bubble-text">
                Turkey<br />
                  <strong className="db__bubble-value">4,183</strong><br />
                  per day
                </span>
              </div>
              <div className="db__bubble">
                <span className="db__bubble-text">
                  Germany<br />
                  <strong className="db__bubble-value">2,215</strong><br />
                  per day
                </span>
              </div>
              <div className="db__bubble">
                <span className="db__bubble-text">
                  Russia<br />
                  <strong className="db__bubble-value">1,012</strong><br />
                  per day
                </span>
              </div>
            </div>
          </div>
          <div className="db__cell">
            <h2 className="db__subheading">Last visited location</h2>
            {[{
              name: "Fransy", date: "May 7 at 6:49 PM", price: "$599.99", icon: "#smartphone"
            }, {
              name: "US", date: "May 7 at 6:49 PM", price: "$1199.99", icon: "#laptop"
            }, {
              name: "Portugal", date: "May 7 at 6:49 PM", price: "$44.99", icon: "#pants"
            }].map((order, index) => (
              <div className="db__order" key={index}>
                <div className="db__order-cat">
                  <svg className="db__order-cat-icon" width="24px" height="24px" aria-hidden="true">
                    <use xlinkHref={order.icon} />
                  </svg>
                </div>
                <div className="db__order-name">
                  {order.name}<br />
                  <small>
                    <time dateTime="2022-05-07 18:49:00">{order.date}</time>
                  </small>
                </div>
                <div><strong>{order.price}</strong></div>
              </div>
            ))}
          </div>
          <svg>
            <symbol id="calendar" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="8,1 8,6" />
                <polyline points="16,1 16,6" />
                <polyline points="2,10 22,10" />
                <circle cx="7" cy="14" r="1" />
                <circle cx="12" cy="14" r="1" />
                <circle cx="17" cy="14" r="1" />
                <circle cx="7" cy="19" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="17" cy="19" r="1" />
                <rect x="2" y="3" rx="3" ry="3" width="20" height="20" />
              </g>
            </symbol>
            <symbol id="export" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="8,5 12,1 16,5" />
                <polyline points="12,1 12,16" />
                <rect x="2" y="10" rx="3" ry="3" width="20" height="13" />
              </g>
            </symbol>
            
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
