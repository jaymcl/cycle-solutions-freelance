
let divApi = document.getElementById("api");
let divMins = document.getElementById("mins");
let divBike = document.getElementById("bike");
let divFare = document.getElementById("fare");
let dailyFare =document.getElementById("dailyFare");
let weeklyFare =document.getElementById("weeklyFare");
let monthlyFare =document.getElementById("monthlyFare");
let yearlyFare =document.getElementById("yearlyFare");
let invested =document.getElementById("invested");
let divCom = document.getElementById("speedCom");
let results={};
let bikeResults="";
let inputChoiceFrom = "";
let inputChoiceTo = "";
let inputFromEle = document.getElementById("from");
let inputToEle = document.getElementById("to");




const showRemove = (ele) => {
    let stationLines = $(".stations");
        for (let index = 0; index < stationLines.length; index++) {
            if(stationLines[index].getAttribute("data-parent") == "#fromPickerButton" && ele == "from"){
                if(stationLines[index].classList.contains("show")){
                    stationLines[index].classList.remove("show");
                }
            }else if (stationLines[index].getAttribute("data-parent") == "#toPickerButton" && ele == "to"){
                if(stationLines[index].classList.contains("show")){
                    stationLines[index].classList.remove("show");
                }
            }
            }}

const closeAllStations = (ele) => {
    if(ele == "from" ){
        if( document.getElementById("fromPickerButton").classList.contains("show") ){
            $("#fromButtonHeading").on('hidden.bs.collapse', showRemove("from")
            )
        }
    }else if (ele == "to"){
        if( document.getElementById("toPickerButton").classList.contains("show") ){
            $("#toButtonHeading").on('hidden.bs.collapse', showRemove("to")
            )
        }
    }
}

document.getElementById("fromButtonHeading").addEventListener("click", () => {
    closeAllStations("from");
})
document.getElementById("toButtonHeading").addEventListener("click", () => {
    closeAllStations("to");
})

let allStations = document.getElementsByClassName("stations");
for (let index = 0; index < allStations.length; index++) {
    if(allStations[index].getAttribute("data-parent") == "#fromPickerButton" ){
        for (let i = 0; i < allStations[index].children.length; i++) {
            allStations[index].children[i].addEventListener("click", () => {
                inputFromEle.value = allStations[index].children[i].textContent;
                document.getElementById("fromButtonHeading").click();
            })
        }
    } else if(allStations[index].getAttribute("data-parent") == "#toPickerButton" ){
        for (let i = 0; i < allStations[index].children.length; i++) {
            allStations[index].children[i].addEventListener("click", () => {
                inputToEle.value = allStations[index].children[i].textContent;
                document.getElementById("toButtonHeading").click();
            })
        }
    }
}

const compoundInt = (years, principle) =>{
    let counter= 0;
    for (let index = 0; index < years;  index++) {
        counter = +counter + +principle
        counter = +counter * 1.135;
    } return counter
    
}

const getInputValue = () => {
            // Selecting the input element and get its value 
    inputChoiceFrom = inputFromEle.value;
    inputChoiceTo = inputToEle.value;
    inputFromEle.value = "";
    inputToEle.value = "";
    journeyPlan(inputChoiceFrom, inputChoiceTo);
}

// function to get data from api and assign to variables/elements
const journeyPlan = (from, to) => {
    let appKey = "&app_key=c40967018a7f4319892ed7f05cf93392"; 
    let tflApi = "https://api.tfl.gov.uk";
    let tflJour = "/journey/journeyresults/";
   // let tflTime = "?date=20210201&time=0800&timeIs=Departing";
    let tflModes = "?mode=bus,tube,overground,tflrail,dlr,tram";
    let tflBikeMode = "?mode=cycle&bikeProficiency=Fast";
    
    
    


axios.get(`${tflApi}${tflJour}${from}/to/${to}${tflModes}`, {
    validateStatus: (status) => {
        return status <= 300;}    
    }
    //getting data from tfl api using http 300 as a filter for user inputs on to/from location
    ).catch((error) => {
        console.log(error);
    }
    ).then((res) => {
        console.log(res);
        if (res.status == "300"){
            let fromToArgs = [];
            let DisOptions = res.data;
            
            if( DisOptions.fromLocationDisambiguation.matchStatus == "list" ){
                DisOptionsFrom = DisOptions.fromLocationDisambiguation.disambiguationOptions.slice(0,5);
                DisOptionsFrom.forEach((ele) => {
                    let newLi =document.createElement("li");
                    let newTn =document.createTextNode(ele.place.commonName);
                    newLi.appendChild(newTn);
                    newLi.classList.add("list-group-item");
                    document.getElementById("fromUL").appendChild(newLi);
                    document.getElementById("fromDisamOptions").classList.remove("hideCard");
                    newLi.addEventListener("click",() => {
                        fromToArgs[0] = ele.parameterValue;
                        if (fromToArgs.length == 2){
                            journeyPlan(fromToArgs[0], fromToArgs[1]);
                            document.getElementById("journey").classList.add("hideCard");
                        }
                        document.getElementById("fromOptions").classList.add("hideCard");
                        
                    }) 
                });
                }else {
                document.getElementById("fromOptions").classList.add("hideCard");
                fromToArgs[0] = from;
                };

                if( DisOptions.toLocationDisambiguation.matchStatus == "list" ){
                let DisOptionsTo = res.data.toLocationDisambiguation.disambiguationOptions;
                DisOptionsTo = DisOptions.toLocationDisambiguation.disambiguationOptions.slice(0,5);
                DisOptionsTo.forEach((ele) => {
                    let newLi =document.createElement("li");
                    let newTn =document.createTextNode(ele.place.commonName);
                    newLi.appendChild(newTn);
                    newLi.classList.add("list-group-item");
                    document.getElementById("toUL").appendChild(newLi);
                    document.getElementById("toDisamOptions").classList.remove("hideCard");
                    newLi.addEventListener("click",() => {
                        fromToArgs[1] = ele.parameterValue;
                        if (fromToArgs.length == 2){
                            journeyPlan(fromToArgs[0], fromToArgs[1]);

                        }
                        document.getElementById("toOptions").classList.add("hideCard");
                        })
                })} else{
                document.getElementById("toOptions").classList.add("hideCard");
                fromToArgs[1] = to;
            };
            
        }else {
            let contentParse = res.data;
            let toLeng = contentParse.journeys[0].legs.length -1;
            let legArray = contentParse.journeys[0].legs;
                const fareFind = (array) =>{ 
                    let busResults = [];
                    let tubeResults = [];
                    for (let index = 0; index < array.length; index++) {
                        if (array[index].mode.id == "bus"){
                            busResults.push(array[index]);
                        }
                        if (array[index].mode.id == "tube" ||
                            array[index].mode.id == "dlr" ||
                            array[index].mode.id == "tflrail" ||
                            array[index].mode.id == "overground" 

                            ) {
                            tubeResults.push(array[index]);
                        }
                    } return [busResults,tubeResults] ;
                }

                
                          
                let fareBoth = fareFind(legArray);
                console.log(fareBoth);
                if (fareBoth[1].length > 0){
                    axios.get(`https://api.tfl.gov.uk/Stoppoint/${fareBoth[1][0].departurePoint.naptanId}/FareTo/${fareBoth[1][fareBoth[1].length - 1].arrivalPoint.naptanId}`
                    ).catch((error) => {
                        
                        console.log(error);
                    }
                    ).then((res) => {
                        console.log(res);
                        
                        

                        if (fareBoth[0].length >= 1)
                        {
                            let faresTotal = (1.50 * fareBoth[0].length) + +res.data[0].rows[0].ticketsAvailable[res.data[0].rows[0].ticketsAvailable.length-1].cost ; 
                            const fareYear = (faresTotal* 522).toFixed(2);
                            divFare.innerHTML = "£" + faresTotal + " " + "£" + "PA:" + fareYear + " 10yr Returns: £" + compoundInt(10,fareYear).toFixed(2);
                            dailyFare.innerHTML = "£" + (faresTotal*2).toFixed(2);
                            weeklyFare.innerHTML = "£" + ((faresTotal*2)*5).toFixed(2);
                            monthlyFare.innerHTML = "£" + (((faresTotal*2)*5)*4.3).toFixed(2);
                            yearlyFare.innerHTML = "£" + fareYear;
                            invested.innerHTML = "£" + compoundInt(10,fareYear).toFixed(2);
                            console.log(faresTotal)
                            console.log(fareBoth[0].length);
                        }else {
                            let faresTotal = res.data[0].rows[0].ticketsAvailable[res.data[0].rows[0].ticketsAvailable.length-1].cost;
                            const fareYear = (faresTotal* 522).toFixed(2);
                            divFare.innerHTML = "£" + faresTotal + " " + "£" + "PA:" + fareYear + " 10yr Returns: £" + compoundInt(10,fareYear).toFixed(2);
                            dailyFare.innerHTML = "£" + (faresTotal*2).toFixed(2);
                            weeklyFare.innerHTML = "£" + ((faresTotal*2)*5).toFixed(2);
                            monthlyFare.innerHTML = "£" + (((faresTotal*2)*5)*4.3).toFixed(2);
                            yearlyFare.innerHTML = "£" + fareYear;
                            invested.innerHTML = "£" + compoundInt(10,fareYear).toFixed(2);

                            console.log(faresTotal)
                        }
                    })

                } else {
                    faresTotal = fareBoth[0].length * 1.50.toFixed(2);
                    const fareYear = (faresTotal* 522).toFixed(2);
                    divFare.innerHTML = "£" + faresTotal + " " + "£" + "PA:" + fareYear + " 10yr Returns: £" + compoundInt(10,fareYear).toFixed(2);
                    dailyFare.innerHTML = "£" + (faresTotal*2).toFixed(2);
                    weeklyFare.innerHTML = "£" + ((faresTotal*2)*5).toFixed(2);
                    monthlyFare.innerHTML = "£" + (((faresTotal*2)*5)*4.3).toFixed(2);
                    yearlyFare.innerHTML = "£" + fareYear;
                    invested.innerHTML = "£" + compoundInt(10,fareYear).toFixed(2);
                    console.log(faresTotal);
                    console.log(fareBoth[0].length);
                }

            results = {from: contentParse.journeys[0].legs[0].departurePoint.commonName,
                                    to: contentParse.journeys[0].legs[toLeng].arrivalPoint.commonName,
                                    duration: contentParse.journeys[0].duration};
                                     //assigning to elements
                                    divApi.firstElementChild.innerHTML= "From "+ results.from + "\n" + " to  " + results.to;
                                    divMins.innerHTML = "This journey takes " + hrsAndMins(results.duration);
                                    console.log(from, to);

             axios.get(`${tflApi}${tflJour}${from}/to/${to}${tflBikeMode}`                                       
                ).catch((error) => {
                    console.log(error);
                }
                ).then((res) => {
                    bikeResults = res.data.journeys[0].duration;
                    divBike.innerHTML = "This journey takes " + hrsAndMins(bikeResults) + " on a bike";
                    bikeResults <= results.duration ? divCom.innerHTML = "Bike is actually faster by " + (results.duration - bikeResults) + "mins" : divCom.innerHTML = "Bike is only " + (bikeResults - results.duration) + "mins slower than the tube"
                })               
        }
    })
    };

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

 
