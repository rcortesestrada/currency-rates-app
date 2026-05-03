var getRateButton = document.getElementById("compareSelectedCurrency");
var currencies = [];
var myChart;

const ctx = document.getElementById('myChart');

const getNewChart = async (currency1) => {

  const base = currency1;
  let url = `/chart/${base}`;

  try {
    const res = await fetch(url);
    const data = await res.json()

    var usableData = data.quotes;

    delete usableData[base + "BTC"];
    delete usableData[base + "XAU"];
    delete usableData[base + "XAG"];

    const labels = Object.keys(usableData);
    const values = Object.values(usableData);

    myChart = new Chart(ctx, {
      type: "bar",
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

    console.log(data);
  } catch(e) {
    console.log(e);
  }
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

getNewChart("USD");

document.querySelector("#compareSelectedCurrency")?.addEventListener("click", function() {
  checkCurrency();

  currencyToCheck = currencies[0];

  if (currencies.length > 0) {
      myChart.destroy();
      getNewChart(currencyToCheck);
  } else {
    console.log("Please select a currency.");
  }
  
  reset();
});


function hamMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}