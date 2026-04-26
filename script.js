var getRateButton = document.getElementById("getRateButton");
var getHistoricalButton = document.getElementById("getHistoricalButton");
var calculateButton = document.getElementById("calculateTotalButton");


function checkInput() {
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
                console.log(currency1);
                console.log(currency2);
                console.log('It is in here!')
            }      
        } else {
            console.log("Please select a currency from the list.");   
        }
    } else {
        console.log("Please select a curency.");
    }
    
}
 
document.querySelector("#getRateButton")?.addEventListener("click", function() {
    checkInput();
})

document.querySelector("#getHistoricalButton")?.addEventListener("click", function() {
    checkInput();
})

document.querySelector("#calculateTotalButton")?.addEventListener("click", function() {
    checkInput();
})