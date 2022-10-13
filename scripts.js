// import { autoStations } from 'stations.js';
let journeyLocs = document.getElementById("journeyLocs");
let h3Mins = document.getElementById("mins");
let h3Bike = document.getElementById("bike");
let h3Compare = document.getElementById("h3Compare");
let z;
let fare = document.getElementById("fare");

let excer = document.getElementById("excer");

let kcals = document.getElementById("kcals");

let results={};
let bikeDuration="";
let inputChoiceFrom = "";
let inputChoiceTo = "";
let inputFromEle = document.getElementById("from");
let inputToEle = document.getElementById("to");
let fromSuggestions = document.getElementById("fromSuggestions");
let toSuggestions = document.getElementById("toSuggestions");
let inputSection = document.getElementById("inputsSection");
let goButton = document.getElementById("goButton");
let commuteButtons = document.getElementById("commuteButtons");
let moneyButtons = document.getElementById("moneyButtons");
let excerButtons = document.getElementById("excerButtons");
let compareContainer = document.getElementById("compareContainer");
let mainButtons = document.getElementById("mainButtons");
let returnTog = document.getElementById("togBtn");
let mainDaily = document.getElementById("mainDaily");
let mainWeekly = document.getElementById("mainWeekly");
let mainMonthly = document.getElementById("mainMonthly");
let mainYearly = document.getElementById("mainYearly");
let faresTotal = 0;

const buttonsTog = (ele) => {
    if (ele.parentNode.id == "mainButtons") {
        for (let index = 0; index < mainButtons.children.length; index++) {
            if(mainButtons.children[index].classList.contains("custoBut")){
                mainButtons.children[index].classList.remove("custoBut");
                mainButtons.children[index].classList.add("custoButInvert");
            };
        }
        ele.classList.add("custoBut");
        ele.classList.remove("custoButInvert");
        
    }

}


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
});
document.getElementById("toButtonHeading").addEventListener("click", () => {
    closeAllStations("to");
});




const buttonFadeHelper = (a) => {
    for (let i = 0; i < a.length; i++) {
        a[i].classList.remove("opac0");
        a[i].classList.remove("opac1");
        a[i].classList.add("opac0");
        setTimeout(function(){ 
            a[i].classList.add("opac1");
                        }, 250);
    }                    
}

returnTog.addEventListener("change", () => {
        for (let i = 0; i < mainButtons.children.length; i++) {
            if(mainButtons.children[i].classList.contains("custoBut")){
                mainButtons.children[i].click();
            }
            
        }
});

mainDaily.addEventListener("click", () => { 
    if(!returnTog.checked) {
        h3Mins.innerHTML = hrsAndMins(results.duration);
        h3Bike.innerHTML = hrsAndMins(bikeDuration);
        h3Compare.innerHTML= hrsAndMins(results.duration - bikeDuration);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (faresTotal*1).toFixed(2);
        excer.innerHTML = Math.round((bikeDistance)/1609.344) + " miles";                  
        kcals.innerHTML = Math.round(bikeDuration * 9.52) + " kcals";
        
    }else{
        h3Mins.innerHTML = hrsAndMins(results.duration*2);
        h3Bike.innerHTML = hrsAndMins(bikeDuration*2);
        h3Compare.innerHTML= hrsAndMins((results.duration - bikeDuration)*2);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (faresTotal*2).toFixed(2);
        excer.innerHTML = Math.round((bikeDistance)/1609.344)*2 + " miles";                  
        kcals.innerHTML = Math.round(bikeDuration * 9.52)*2 + " kcals";
    }  
});
mainWeekly.addEventListener("click", () => {    
    if(!returnTog.checked) {
        h3Mins.innerHTML = hrsAndMins((results.duration*5));
        h3Bike.innerHTML = hrsAndMins((bikeDuration*5));
        h3Compare.innerHTML= hrsAndMins((results.duration - bikeDuration)*5);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (faresTotal*5).toFixed(2);
        excer.innerHTML = Math.round(((bikeDistance)/1609.344)*5) + " miles";                  
        kcals.innerHTML = Math.round((bikeDuration * 9.52)*5) + " kcals";
    }else{
        h3Mins.innerHTML = hrsAndMins((results.duration*10));
        h3Bike.innerHTML = hrsAndMins((bikeDuration*10));
        h3Compare.innerHTML= hrsAndMins((results.duration - bikeDuration)*10);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (faresTotal*10).toFixed(2);
        excer.innerHTML = Math.round(((bikeDistance)/1609.344)*10) + " miles";                  
        kcals.innerHTML = Math.round((bikeDuration * 9.52)*10) + " kcals";
    }
});
mainMonthly.addEventListener("click", () => {    
    if(!returnTog.checked) {
        h3Mins.innerHTML = hrsAndMins((results.duration*5)*4.3);
        h3Bike.innerHTML = hrsAndMins((bikeDuration*5)*4.3);
        h3Compare.innerHTML= hrsAndMins(((results.duration - bikeDuration)*5)*4.3);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (((faresTotal)*5)*4.3).toFixed(2);
        excer.innerHTML = Math.round((((bikeDistance)/1609.344)*5)*4.3) + " miles";                  
        kcals.innerHTML = Math.round(((bikeDuration * 9.52)*5)*4.3) + " kcals";
    }else{
        h3Mins.innerHTML = hrsAndMins((results.duration*5)*8.6);
        h3Bike.innerHTML = hrsAndMins((bikeDuration*5)*8.6);
        h3Compare.innerHTML= hrsAndMins(((results.duration - bikeDuration)*5)*8.6);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]);
        fare.innerHTML = "£" + (((faresTotal)*5)*8.6).toFixed(2);
        excer.innerHTML = Math.round((((bikeDistance)/1609.344)*5)*8.6) + " miles";                  
        kcals.innerHTML = Math.round(((bikeDuration * 9.52)*5)*8.6) + " kcals";

    }
});
mainYearly.addEventListener("click", () => {   
    if(!returnTog.checked){

        h3Mins.innerHTML = hrsAndMins((results.duration*5)*52);
        h3Bike.innerHTML = hrsAndMins((bikeDuration*5)*52);
        h3Compare.innerHTML= hrsAndMins(((results.duration - bikeDuration)*5)*52);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]); 
        fare.innerHTML = "£" + (((faresTotal)*5)*52).toFixed(2);
        excer.innerHTML = Math.round((((bikeDistance)/1609.344)*5)*52) + " miles";                  
        kcals.innerHTML = Math.round(((bikeDuration * 9.52)*5)*52) + " kcals";
    }else{
        h3Mins.innerHTML = hrsAndMins((results.duration*5)*104);
        h3Bike.innerHTML = hrsAndMins((bikeDuration*5)*104);
        h3Compare.innerHTML= hrsAndMins(((results.duration - bikeDuration)*5)*104);
        buttonFadeHelper([h3Mins,h3Bike,h3Compare,fare,excer, kcals]); 
        fare.innerHTML = "£" + (((faresTotal)*5)*104).toFixed(2);
        excer.innerHTML = Math.round((((bikeDistance)/1609.344)*5)*104) + " miles";                  
        kcals.innerHTML = Math.round(((bikeDuration * 9.52)*5)*104) + " kcals";
    }
    });
    

let allStations = document.getElementsByClassName("stations");
for (let index = 0; index < allStations.length; index++) {
    if(allStations[index].getAttribute("data-parent") == "#fromPickerButton" ){
        for (let i = 0; i < allStations[index].children.length; i++) {
            allStations[index].children[i].addEventListener("click", () => {
                inputFromEle.value = allStations[index].children[i].textContent;
                inputFromEle.style.color = getComputedStyle(allStations[index].children[i], ":before").backgroundColor;
                document.getElementById("fromButtonHeading").click();
            })
        }
    } else if(allStations[index].getAttribute("data-parent") == "#toPickerButton" ){
        for (let i = 0; i < allStations[index].children.length; i++) {
            allStations[index].children[i].addEventListener("click", () => {
                inputToEle.value = allStations[index].children[i].textContent;
                inputToEle.style.color = getComputedStyle(allStations[index].children[i], ":before").backgroundColor;
                document.getElementById("toButtonHeading").click();
            })
        }
    }
}

const suggestionsAuto =  (inp, stationsObj) => { 

    inp.addEventListener("input", function(){
        let value = this.value;
        closeAllLists();
        let li;
        
        
        if(!value){return false};
        let objKeys = Object.keys(stationsObj);
            for (let i = 0; i < objKeys.length; i++) {
                
                const objValues = stationsObj[objKeys[i]];
                for (let j = 0; j < objValues.length; j++) {
                  
                    if (objValues[j].substr(0, value.length).toUpperCase() == value.toUpperCase()){
                        
                        li = document.createElement("LI");
                        li.innerHTML = "<strong>" + objValues[j].substr(0, value.length) + "</strong>";
                        li.innerHTML += objValues[j].substr(value.length);
                        li.classList.add("list-group-item");
                        li.classList.add("list-group-item-action");
                        li.classList.add(objKeys[i]);
                        li.innerHTML += "<input type='hidden' value='" + objValues[j] + "'>";
                        li.addEventListener("click" ,function(){
                            inp.style.color = getComputedStyle(this, ":before").backgroundColor;// DO THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            inp.value = this.getElementsByTagName("input")[0].value;
                            closeAllLists();
                        })
                        inp.id == "from" ? fromSuggestions.appendChild(li): toSuggestions.appendChild(li);
                        
                    }
                }  
            }
    })
    function closeAllLists() {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let f = document.getElementById("fromSuggestions");
            f.innerHTML="";
        let t = document.getElementById("toSuggestions");
            t.innerHTML="";
      }

      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



const getInputValue = () => {
            // Selecting the input element and get its value 
    inputChoiceFrom = inputFromEle.value;
    inputChoiceTo = inputToEle.value;
    inputFromEle.value = "";
    inputToEle.value = "";
    inputChoiceFrom = inputChoiceFrom.replace(/\&/g, '');
    inputChoiceTo = inputChoiceTo.replace(/\&/g, '');
    journeyPlan(inputChoiceFrom, inputChoiceTo);
    goButton.innerHTML = "LOADING.";
}

// function to get data from api and assign to variables/elements
const journeyPlan = (from, to) => {
    let appKey = "&app_key=c40967018a7f4319892ed7f05cf93392"; 
    let tflApi = "https://api.tfl.gov.uk";
    let tflJour = "/journey/journeyresults/";
   // let tflTime = "?date=20210201&time=0800&timeIs=Departing";
    let tflModes = "?mode=bus,tube,overground,dlr,tram,elizabeth-line";
   
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
            inputSection.classList.toggle("inputsSection");
            inputSection.classList.toggle("hideInputsSection");
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
                            array[index].mode.id == "elizabeth-line" ||
                            array[index].mode.id == "overground" 

                            ) {
                            tubeResults.push(array[index]);
                        }
                    } return [busResults,tubeResults] ;
                }

                
                          
                let fareBoth = fareFind(legArray);
                
                if (fareBoth[1].length > 0){
                    axios.get(`https://api.tfl.gov.uk/Stoppoint/${fareBoth[1][0].departurePoint.naptanId}/FareTo/${fareBoth[1][fareBoth[1].length - 1].arrivalPoint.naptanId}`
                    ).catch((error) => {
                        
                        console.log(error);
                    }
                    ).then((res) => {
                        
                        if (fareBoth[0].length >= 1)
                        {
                            faresTotal = (1.50 * fareBoth[0].length) + +res.data[0].rows[0].ticketsAvailable[res.data[0].rows[0].ticketsAvailable.length-1].cost ; 
                            
                            
                            fare.innerHTML = "£" + (faresTotal*1).toFixed(2);
                        
                            
                            
                        }else {
                            faresTotal = res.data[0].rows[0].ticketsAvailable[res.data[0].rows[0].ticketsAvailable.length-1].cost;
                            
                            fare.innerHTML = "£" + (faresTotal*1).toFixed(2);
                            
                            

                            
                        }
                    })

                } else {
                     faresTotal = fareBoth[0].length * 1.50.toFixed(2);
                    
                    fare.innerHTML = "£" + (faresTotal*1).toFixed(2);
                    
                    
                   
                }

            results = {from: contentParse.journeys[0].legs[0].departurePoint.commonName,
                                    to: contentParse.journeys[0].legs[toLeng].arrivalPoint.commonName,
                                    duration: contentParse.journeys[0].duration};
                                     //assigning to elements
                                    journeyLocs.children[0].innerHTML= results.from;
                                    journeyLocs.children[2].innerHTML= results.to;
                                    h3Mins.innerHTML = hrsAndMins(results.duration);
                                    

             axios.get(`${tflApi}${tflJour}${from}/to/${to}${tflBikeMode}`                                       
                ).catch((error) => {
                    console.log(error);
                }
                ).then((res) => {
                    bikeDuration = res.data.journeys[0].duration;
                    bikeDistance = res.data.journeys[0].legs[0].distance;

                    h3Bike.innerHTML =  hrsAndMins(bikeDuration);
                    if( results.duration - bikeDuration <= 0){
                        compareContainer.style.display = "none";
                    }else {
                    h3Compare.innerHTML = hrsAndMins((results.duration - bikeDuration));
                    };
                    window.addEventListener("scroll", stickyButtonsFunc);
                    excer.innerHTML = Math.round((bikeDistance)/1609.344) + " miles";  
                    
                    
                    kcals.innerHTML = Math.round(bikeDuration * 9.52) + " kcals";
                    
                    
                    
                    
                    goButton.innerHTML = "REFRESH";
                    goButton.style["margin-top"] = "0px";
                    goButton.removeAttribute("onclick");
                    for (let i = 0; i < document.getElementsByClassName("titles").length; i++) {
                        document.getElementsByClassName("titles")[i].classList.add("titleBlock")};
                    goButton.setAttribute("onclick","refreshPage()");
                    document.getElementById("para").style.height = "0px";
                    document.getElementById("para").style["padding-bottom"] = "0px";
                    document.getElementById("journey").style.height = "420vw";
                    setTimeout(function(){ document.getElementById("journey").style.overflow = "visible";
                    document.getElementById("journey").style.height = "0px";
                    butOffset = document.getElementById('stickyButtons').offsetTop;
                    }, 500);
                    
                    
                    
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
    if ( num <= 60) {
        return num + " mins";
    } else {
        if(rhours == 1){
            if(rminutes == 0){
                return rhours + " hr";
            }
            return rhours + " hr & " + rminutes + " mins";
        }
        else{
            if(rminutes == 0){
                return rhours + " hrs"; 
            }
            return rhours + " hrs & " + rminutes + " mins"; 
        }
    }}

const refreshPage= () => {
    window.location.reload();
} 

var stickyButtonsFunc = function() {
    let ypos = window.scrollY;
    let stickyButs = document.getElementById('stickyButtons');
    let butOfsetCurrent =document.getElementById('stickyButtons').offsetTop;
   

    if( ypos <= butOffset){
        stickyButs.classList.remove("sticky");
        if(document.getElementById("comFare").style.display == "flex"){
          document.getElementById("comFare").classList.remove("commuteFarePadTop")  
        }else{
            document.getElementById("commuteTime").classList.remove("commuteFarePadTop");
        }
        
    } else if(ypos >= butOfsetCurrent) {
        stickyButs.classList.add("sticky");
        if(document.getElementById("comFare").style.display == "flex"){
            document.getElementById("comFare").classList.add("commuteFarePadTop")  
          }else{
              document.getElementById("commuteTime").classList.add("commuteFarePadTop");
          }
          

    }
}






suggestionsAuto(inputFromEle,autoStations);
suggestionsAuto(inputToEle,autoStations);