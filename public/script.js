var getRateButton = document.getElementById("getRateButton");
var getHistoricalButton = document.getElementById("getHistoricalButton");
var calculateButton = document.getElementById("calculateTotalButton");

if (window.location.pathname === "/historical.html") {
    historicalDate.max = new Date().toISOString().split("T")[0];
    historicalDate.value = new Date().toISOString().split("T")[0];
}

var currencies = [];
var action = "";

const rate = document.querySelector(".rate");

const getRate = async (currency1, currency2, action, amount, date) => {
    console.log(currency1, currency2, action, amount, date);
    
    const base = currency1;
    const symbol = currency2;
    const typeOfRequest = action;
    let amountToConvert = amount;
    const historicalDateSelected = date;
    var url = "";

    if (action === "live") {
        url = `live/${typeOfRequest},${base},${symbol}`;
        console.log("live");
    } else if (action === "convert") {
        url = `convert/${typeOfRequest},${base},${symbol},${amountToConvert}`;
        console.log("convert");
    } else if (action === "historical") {
        url = `historical/${typeOfRequest},${base},${symbol},${historicalDateSelected}`;
        console.log("historical");
    } else {
        console.log("Nothing matched");
    }
    
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (action === "live") {

            const liveData = data.quotes
            let liveRateConstant = 1
            let liveRate = Object.values(liveData)[0]
            liveRateConstant = liveRateConstant.toLocaleString(undefined, {style: "currency", currency: base});
            liveRate = liveRate.toLocaleString(undefined, {style: "currency", currency: symbol});  
            
            rate.textContent = liveRateConstant + " = " + liveRate

        } else if (action === "convert") {

            amountToConvert = amountToConvert.toLocaleString(undefined, {style: "currency", currency: base});
            let convertedAmount = data.result
            convertedAmount = convertedAmount.toLocaleString(undefined, {style: "currency", currency: symbol});
            rate.textContent = amountToConvert + " = " + convertedAmount;
            console.log(data);

        } else if (action === "historical") {
            const responseHistoricalData = data.quotes

            let historicalRateConstant = 1
            let historicalRate = Object.values(responseHistoricalData)[0];

            historicalRateConstant = historicalRateConstant.toLocaleString(undefined, {style: "currency", currency: base});
            historicalRate = historicalRate.toLocaleString(undefined, {style: "currency", currency: symbol});

            rate.textContent = historicalRateConstant + " was worth " + historicalRate + " in " + historicalDateSelected;


            console.log(historicalRate);
            console.log(data);
            console.log("historical");

        } else {
            console.log("Nothing matched.");
        }

    } catch(e) {
        console.log(e)
    }
}

const checkInput = () => {
    var currency1 = document.getElementById("searchCurrency1").value.toUpperCase();
    var currency2 = document.getElementById("searchCurrency2").value.toUpperCase();

    var listOfCurrencies = document.getElementById("currency1").getElementsByTagName("option");
    var optionValues = [], i = 0;

    for (i; i < listOfCurrencies.length; i += 1) {
        optionValues.push(listOfCurrencies[i].value);
    }

    if (currency1.trim().length > 0 && currency2.trim().length > 0) {
        if (optionValues.includes(currency1) && optionValues.includes(currency2)) { 
            if (currency1 === currency2) {
                console.log("Please select different currencies.");
            } else {
                currencies.push(currency1) + currencies.push(currency2)
                return currencies
            }      
        } else {
            console.log("Please select a currency from the list.");   
        }
    } else {
        console.log("Please select a curency.");
    }
}

const validAmount = () => {
    let amountToConvert = document.getElementById("amountToConvert").value;
    let roundedAmount = Math.round(amountToConvert * 100) / 100;

    if (amountToConvert === NaN || amountToConvert <= 0) {
        console.log("Please enter a valid amount.")
    } else {
        return roundedAmount
    }
}
 
const validDate = () => {
    let selectedDate = document.getElementById("historicalDate").value;
    if (selectedDate.length <= 0) {
        console.log("Please select a valid date.");
    } else {
        console.log(selectedDate);
        return selectedDate;
    }
}

const reset = () => {
    currencies = [];
    action = "";
}

document.querySelector("#getRateButton")?.addEventListener("click", function() {
    action = "live";
    checkInput();

    if (currencies.length > 1) {
        getRate(currencies[0], currencies[1], action);
    }

    reset();
})

document.querySelector("#getHistoricalButton")?.addEventListener("click", function() {
    action = "historical";
    checkInput();
    console.log(currencies);
    selectedDate = validDate();
    console.log(selectedDate);

    if (selectedDate === undefined) {
        reset();
        return console.log("Select a date.")
    }

    if (currencies.length > 0 && selectedDate.length > 0) {
        getRate(currencies[0], currencies[1], action, undefined, selectedDate);
    } else {
        console.log("There is missing info.");
    }

    reset();
})

document.querySelector("#calculateTotalButton")?.addEventListener("click", function() {
    action = "convert";
    checkInput();
    validatedAmount = validAmount();

    console.log(validatedAmount);

    if (currencies.length > 1 && validatedAmount > 0) {
        getRate(currencies[0], currencies[1], action, validatedAmount);
    }

    reset();
});