//selectors and placeholders
let divApi = document.getElementById("api");
let divMins = document.getElementById("mins");
let divBike = document.getElementById("bike");
let divFare = document.getElementById("fare");
let divCom = document.getElementById("speedCom");
let results={};
let bikeResults="";
let inputChoiceFrom = "";
let inputChoiceTo = "";
let inputFromEle = document.getElementById("from");
let inputToEle = document.getElementById("to");

function getInputValue(){
    // Selecting the input element and get its value 
    inputChoiceFrom = inputFromEle.value;
    inputChoiceTo = inputToEle.value;
    inputFromEle.value = "";
    inputToEle.value = "";
    journeyPlan(inputChoiceFrom, inputChoiceTo);
}

// function to get data from api and assign to variables/elements
const journeyPlan = (from, to) => {
    let tflApi = "https://api.tfl.gov.uk";
    let tflJour = "/journey/journeyresults/";
    return axios.get( tflApi + tflJour + from + "/to/" + to, {
    validateStatus: (status) => {
        return status <= 300;
        //getting data from tfl api using http 300 as a filter for user inputs on to/from location
    }}
    ).catch((error) => {
        console.log(error);
    }
    
    ).then((res) => {
        if (res.status == "300"){
            let fromToArr = disambiguationSort(from, to, res);
            //picking first option from list of 300 status request
            axios.get(tflApi + tflJour + fromToArr[0] + "/to/" + fromToArr[1]
            ).catch((error) => {
                console.log(error);
            }).then((res) => {
            //using length to get last leg of journey to get arrival point
                let toLeng = res.data.journeys[0].legs.length -1;
                results = {from: res.data.journeys[0].legs[0].departurePoint.commonName,
                    to: res.data.journeys[0].legs[toLeng].arrivalPoint.commonName,
                    duration: res.data.journeys[0].duration};
                    //assigning to elements
                divApi.innerHTML = "From "+ results.from + " to  " + results.to;
                divMins.innerHTML = "This journey takes " + hrsAndMins(results.duration);
            });
            //getting bike distance data
            axios.get(tflApi + tflJour + fromToArr[0] + "/to/" + fromToArr[1] + "?mode=cycle&bikeProficiency=Fast", {
                validateStatus: (status) => {
                    return status <= 300;
                    //getting data from tfl api using http 300 as a filter for user inputs on to/from location
                }}
            ).catch((error) => {
                console.log(error);
            }).then((res) => {
                console.log(res);
                bikeResults = res.data.journeys[0].duration;
                console.log(bikeResults);
                divBike.innerHTML = "This journey takes " + hrsAndMins(bikeResults) + " on a bike";
                bikeResults < results.duration ? divCom.innerHTML = "Bike is actually faster by " + (results.duration - bikeResults) + "mins" : divCom.innerHTML = "Bike is only " + (bikeResults - results.duration) + "mins";
            });


        }
        else{
            tubeDuration = res.data.journeys[0].duration;
             divApi.innerHTML = "from " + res.data.journeyVector.from + " to  " + res.data.journeyVector.to;
             divMins.innerHTML = "This journey takes " + hrsAndMins(tubeDuration);
                         //getting bike distance data
            axios.get(tflApi + tflJour + from + "/to/" + to + "?mode=cycle&bikeProficiency=Fast", {
                validateStatus: (status) => {
                    return status <= 300;
                    //getting data from tfl api using http 300 as a filter for user inputs on to/from location
                }}
            ).catch((error) => {
                console.log(error);
            }).then((res) => {
                if (res.status == "300"){
                    let fromToBikeArr = disambiguationSort(from,to,res);
                    axios.get(tflApi + tflJour + fromToBikeArr[0] + "/to/" + fromToBikeArr[1] + "?mode=cycle&bikeProficiency=Fast"
                    ).catch((error)=> {
                        console.log(error);
                    }).then((res) => {
                        bikeResults = res.data.journeys[0].duration;
                         console.log(bikeResults);
                        divBike.innerHTML = "This journey takes " + hrsAndMins(bikeResults) + " on a bike";
                        bikeResults < tubeDuration ? divCom.innerHTML = "Bike is actually faster by " + (tubeDuration - bikeResults) + "mins" : divCom.innerHTML = "Bike is only " + (bikeResults - tubeDuration) + "mins";
                    })
                }else{
                    bikeResults = res.data.journeys[0].duration;
                    console.log(bikeResults);
                    divBike.innerHTML = "This journey takes " + hrsAndMins(bikeResults) + " on a bike";
                    bikeResults < tubeDuration ? divCom.innerHTML = "Bike is actually faster by " + (tubeDuration - bikeResults) + "mins" : divCom.innerHTML = "Bike is only " + (bikeResults - tubeDuration) + "mins";

                }

            });
        }

    })
};

//Sort disabiguation from 300 status request, using the first option to request the data needed
const disambiguationSort= (from, to, res) => {
    let disamSort = [];

    if(res.data.fromLocationDisambiguation.matchStatus === "identified"){
        disamSort[0]= from;
    }else{
        disamSort[0] = res.data.fromLocationDisambiguation.disambiguationOptions[0].place.icsCode;
    };
    
    if(res.data.toLocationDisambiguation.matchStatus === "identified"){
        disamSort[1] = to;
    }else{
        disamSort[1] = res.data.toLocationDisambiguation.disambiguationOptions[0].place.icsCode;
    }
    return disamSort;

}


// take duration from api and convert into a string of mins or hour and mins
const hrsAndMins = (n) => {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if ( num < 60) {
        return num + " minutes"
    } else {
        return rhours + " hour(s) and " + rminutes + "minutes"  
    }}
