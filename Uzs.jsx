import  { useState, useEffect } from "react";

function CurrencyConverter() {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("EUR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(0);
  const [rate, setRate] = useState("--");

  useEffect(() => {
    calculate();
  }, [currencyOne, currencyTwo, amountOne]);

  const calculate = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
      .then((res) => res.json())
      .then((data) => {
        const exchangeRate = data.rates[currencyTwo];
        setRate(`1 ${currencyOne} = ${exchangeRate.toFixed(4)} ${currencyTwo}`);
        setAmountTwo((amountOne * exchangeRate).toFixed(2));
      });
  };

  const handleSwap = () => {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <p>Choose the currency and the amounts to get the exchange rate</p>

      <div className="container">
        <div className="currency">
          <select value={currencyOne} onChange={(e) => setCurrencyOne(e.target.value)}>
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
          </select>
          <input
            type="number"
            value={amountOne}
            onChange={(e) => setAmountOne(e.target.value)}
          />
        </div>

        <div className="swap-rate-container">
          <button className="btn" onClick={handleSwap}>
            Swap ↕️
          </button>
          <div className="rate">{rate}</div>
        </div>

        <div className="currency">
          <select value={currencyTwo} onChange={(e) => setCurrencyTwo(e.target.value)}>
            <option value="AED">AED</option>
            {/* (Repeat options) */}
            <option value="ZAR">ZAR</option>
          </select>
          <input
            type="number"
            value={amountTwo}
            onChange={(e) => setAmountTwo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
