var getRateButton = document.getElementById("getRateButton");
var getHistoricalButton = document.getElementById("getHistoricalButton");
var calculateButton = document.getElementById("calculateTotalButton");

var currencies = []
var action = ""
var amount = ""

const rate = document.querySelector(".rate");

const apiKey = process.env .API_KEY


const getRate = async (currency1, currency2, action, amount) => {
    console.log(currency1, currency2, action, amount);
    
    const base = currency1;
    const symbol = currency2;
    const typeOfRequest = action
    const amountToConvert = amount
    var url = "";

    if (action === "live") {
        url = "https://api.exchangerate.host/" + typeOfRequest + "?source=" + base + "&currencies=" + symbol + "&access_key=" + apiKey
    } else if (action === "convert") {
        url = "https://api.exchangerate.host/" + typeOfRequest + "?from=" + base + "&to=" + symbol + "&amount=" + amount + "&access_key=" + apiKey
        console.log("convert");
    } else if (action === "historical") {
        console.log("historical");
    } else {
        console.log("Nothing matched");
    }
    
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (action === "live") {
            const liveData = data.quotes
            const firstKey = Object.values(liveData)[0]        
            console.log(firstKey);
            rate.textContent = "1 " + base + " = " + firstKey + " symbol"
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
 

const reset = () => {
    currencies = [];
    amount = "";
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
    checkInput();
})

document.querySelector("#calculateTotalButton")?.addEventListener("click", function() {
    checkInput();
})