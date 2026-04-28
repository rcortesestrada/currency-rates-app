var getRateButton = document.getElementById("compareSelectedCurrency");
var currencies = [];
var myChart;

const ctx = document.getElementById('myChart');

const createANewChart = (currencyToCompare) => {
  const base = currencyToCompare

  fetch(`https://currencyratesweb.netlify.app/live/chart/${base}`, {
    method: 'GET', // or 'POST', 'PUT', etc.
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  })
  .then(function(response) {

    if (response.ok === true) {
      return response.json();
    }
  })
  .then(function(data) {
    console.log(data);
    createChart(data, 'bar');
  })

  const createChart = (data, type) => {

  var usableData = data.quotes;

  delete usableData[base + "BTC"];
  delete usableData[base + "XAU"];
  delete usableData[base + "XAG"];

  const labels = Object.keys(usableData);
  const values = Object.values(usableData);


  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'Currency Pair: 1 ' + base + ' equivalents',
        data: values,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
                  myScale: {
            type: "logarithmic",
            position: "left",
          },
      }
      }
    });
  };
}

const checkCurrency = () => {
  var currency1 = document.getElementById("searchCurrency1").value.toUpperCase();

  var listOfCurrencies = document.getElementById("currency1").getElementsByTagName("option");
  var optionValues = [], i = 0;

  for (i; i < listOfCurrencies.length; i += 1) {
    optionValues.push(listOfCurrencies[i].value);
  }



  if (currency1.trim().length > 0 && optionValues.includes(currency1)) {
    currencies.push(currency1);
      return currencies
    } else {
      console.log("Please select a currency from the list.");
  }
}

const reset = () => {
  currencies = [];
  document.getElementById("searchCurrency1").value = "";
}

createANewChart("USD");

document.querySelector("#compareSelectedCurrency")?.addEventListener("click", function() {
  checkCurrency();

  currencyToCheck = currencies[0];

  if (currencies.length > 0) {
      myChart.destroy();
      createANewChart(currencyToCheck);
  } else {
    console.log("Please select a currency.");
  }


  reset();
});