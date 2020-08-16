//example inputs for building
let divApi = document.getElementById("api");
let divMins = document.getElementById("mins");

//fake inputs for building out
let inputChoiceFrom = "bankstation";
let inputChoiceTo = "neasdenstation";


// function to run after getting inputs from user
const journeyPlanTrain = (from, to) => {
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
        //get url data from 300 status code then another GET request with new urls
        //example: channg bankstation to the underground station code 
        let fromNum = res["data"]["fromLocationDisambiguation"]["disambiguationOptions"][0]["parameterValue"];
        let toNum = res["data"]["toLocationDisambiguation"]["disambiguationOptions"][0]["parameterValue"];
        divApi.innerHTML = fromNum +"   "+ toNum;
            axios.get(tflApi + tflJour + fromNum + "/to/" + toNum
            ).catch((error) => {
                console.log(error);
            }).then((res) => {
                let results = hrsAndMins(res["data"]["journeys"][0].duration);
                divMins.innerHTML = results;
            })
        return fromNum +"   "+ toNum;
    })
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
