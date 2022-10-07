
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

const suggestionsAuto =  (inp, obj) => { 

    inp.addEventListener("input", function(){
        let value = this.value;
        closeAllLists();
        let li;
        
        //close all lists 
        if(!value){return false};
        let objKeys = Object.keys(obj);
            for (let i = 0; i < objKeys.length; i++) {
                
                const objValues = obj[objKeys[i]];
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
                            inp.value = this.getElementsByTagName("input")[0].value;
                            console.log( this.getElementsByTagName("input")[0].value);// DO THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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





let autoStations = {
bakerloo:[
"Baker Street Underground Station",
"Charing Cross Underground Station",
"Edgware Road (Bakerloo) Underground Station",
"Elephant & Castle Underground Station",
"Embankment Underground Station",
"Harlesden Underground Station",
"Harrow & Wealdstone Underground Station",
"Kensal Green Underground Station",
"Kenton Underground Station",
"Kilburn Park Underground Station",
"Lambeth North Underground Station",
"Maida Vale Underground Station",
"Marylebone Underground Station",
"North Wembley Underground Station",
"Oxford Circus Underground Station",
"Paddington Underground Station",
"Piccadilly Circus Underground Station",
"Queen's Park Underground Station",
"Regent's Park Underground Station",
"South Kenton Underground Station",
"Stonebridge Park Underground Station",
"Warwick Avenue Underground Station",
"Waterloo Underground Station",
"Wembley Central Underground Station",
"Willesden Junction Underground Station"
],
central:[
"Bank Underground Station",
"Barkingside Underground Station",
"Bethnal Green Underground Station",
"Bond Street Underground Station",
"Buckhurst Hill Underground Station",
"Chancery Lane Underground Station",
"Chigwell Underground Station",
"Debden Underground Station",
"Ealing Broadway Underground Station",
"East Acton Underground Station",
"Epping Underground Station",
"Fairlop Underground Station",
"Gants Hill Underground Station",
"Grange Hill Underground Station",
"Greenford Underground Station",
"Hainault Underground Station",
"Hanger Lane Underground Station",
"Holborn Underground Station",
"Holland Park Underground Station",
"Lancaster Gate Underground Station",
"Leyton Underground Station",
"Leytonstone Underground Station",
"Liverpool Street Underground Station",
"Loughton Underground Station",
"Marble Arch Underground Station",
"Mile End Underground Station",
"Newbury Park Underground Station",
"North Acton Underground Station",
"Northolt Underground Station",
"Notting Hill Gate Underground Station",
"Oxford Circus Underground Station",
"Perivale Underground Station",
"Queensway Underground Station",
"Redbridge Underground Station",
"Roding Valley Underground Station",
"Ruislip Gardens Underground Station",
"Shepherd's Bush (Central) Underground Station",
"Snaresbrook Underground Station",
"South Ruislip Underground Station",
"South Woodford Underground Station",
"St. Paul's Underground Station",
"Stratford Underground Station",
"Theydon Bois Underground Station",
"Tottenham Court Road Underground Station",
"Wanstead Underground Station",
"West Acton Underground Station",
"West Ruislip Underground Station",
"White City Underground Station",
"Woodford Underground Station"
],
circle:[
"Aldgate Underground Station",
"Baker Street Underground Station",
"Barbican Underground Station",
"Bayswater Underground Station",
"Blackfriars Underground Station",
"Cannon Street Underground Station",
"Edgware Road (Circle Line) Underground Station",
"Embankment Underground Station",
"Euston Square Underground Station",
"Farringdon Underground Station",
"Gloucester Road Underground Station",
"Goldhawk Road Underground Station",
"Great Portland Street Underground Station",
"Hammersmith (H&C Line) Underground Station",
"High Street Kensington Underground Station",
"King's Cross St. Pancras Underground Station",
"Ladbroke Grove Underground Station",
"Latimer Road Underground Station",
"Liverpool Street Underground Station",
"Mansion House Underground Station",
"Monument Underground Station",
"Moorgate Underground Station",
"Notting Hill Gate Underground Station",
"Paddington Underground Station",
"Royal Oak Underground Station",
"Shepherd's Bush Market Underground Station",
"Sloane Square Underground Station",
"South Kensington Underground Station",
"St. James's Park Underground Station",
"Temple Underground Station",
"Tower Hill Underground Station",
"Victoria Underground Station",
"Westbourne Park Underground Station",
"Westminster Underground Station",
"Wood Lane Underground Station"
],
district:[
"Acton Town Underground Station",
"Aldgate East Underground Station",
"Barking Underground Station",
"Barons Court Underground Station",
"Bayswater Underground Station",
"Becontree Underground Station",
"Blackfriars Underground Station",
"Bow Road Underground Station",
"Bromley-by-Bow Underground Station",
"Cannon Street Underground Station",
"Chiswick Park Underground Station",
"Dagenham East Underground Station",
"Dagenham Heathway Underground Station",
"Ealing Broadway Underground Station",
"Ealing Common Underground Station",
"Earl's Court Underground Station",
"East Ham Underground Station",
"East Putney Underground Station",
"Edgware Road (District Line) Underground Station",
"Elm Park Underground Station",
"Embankment Underground Station",
"Fulham Broadway Underground Station",
"Gloucester Road Underground Station",
"Gunnersbury Underground Station",
"Hammersmith (Dist&Picc Line) Underground Station",
"High Street Kensington Underground Station",
"Hornchurch Underground Station",
"Kensington (Olympia) Underground Station",
"Kew Gardens Underground Station",
"Mansion House Underground Station",
"Mile End Underground Station",
"Monument Underground Station",
"Notting Hill Gate Underground Station",
"Paddington Underground Station",
"Parsons Green Underground Station",
"Plaistow Underground Station",
"Putney Bridge Underground Station",
"Ravenscourt Park Underground Station",
"Richmond Underground Station",
"Sloane Square Underground Station",
"South Kensington Underground Station",
"Southfields Underground Station",
"St. James's Park Underground Station",
"Stamford Brook Underground Station",
"Stepney Green Underground Station",
"Temple Underground Station",
"Tower Hill Underground Station",
"Turnham Green Underground Station",
"Upminster Bridge Underground Station",
"Upminster Underground Station",
"Upney Underground Station",
"Upton Park Underground Station",
"Victoria Underground Station",
"West Brompton Underground Station",
"West Ham Underground Station",
"West Kensington Underground Station",
"Westminster Underground Station",
"Whitechapel Underground Station",
"Wimbledon Park Underground Station",
"Wimbledon Underground Station"
],
HAC:[
"Aldgate East Underground Station",
"Baker Street Underground Station",
"Barbican Underground Station",
"Barking Underground Station",
"Bow Road Underground Station",
"Bromley-by-Bow Underground Station",
"East Ham Underground Station",
"Edgware Road (H&C Line) Underground Station",
"Euston Square Underground Station",
"Farringdon Underground Station",
"Goldhawk Road Underground Station",
"Great Portland Street Underground Station",
"Hammersmith (H&C Line) Underground Station",
"King's Cross St. Pancras Underground Station",
"Ladbroke Grove Underground Station",
"Latimer Road Underground Station",
"Liverpool Street Underground Station",
"Mile End Underground Station",
"Moorgate Underground Station",
"Plaistow Underground Station",
"Royal Oak Underground Station",
"Shepherd's Bush Market Underground Station",
"Stepney Green Underground Station",
"Upton Park Underground Station",
"West Ham Underground Station",
"Westbourne Park Underground Station",
"Whitechapel Underground Station",
"Wood Lane Underground Station"
],
jubilee:[
"Baker Street Underground Station",
"Bermondsey Underground Station",
"Bond Street Underground Station",
"Canada Water Underground Station",
"Canary Wharf Underground Station",
"Canning Town Underground Station",
"Canons Park Underground Station",
"Dollis Hill Underground Station",
"Finchley Road Underground Station",
"Green Park Underground Station",
"Kilburn Underground Station",
"Kingsbury Underground Station",
"London Bridge Underground Station",
"Neasden Underground Station",
"North Greenwich Underground Station",
"Queensbury Underground Station",
"Southwark Underground Station",
"St. John's Wood Underground Station",
"Stanmore Underground Station",
"Stratford Underground Station",
"Swiss Cottage Underground Station",
"Waterloo Underground Station",
"Wembley Park Underground Station",
"West Ham Underground Station",
"West Hampstead Underground Station",
"Westminster Underground Station",
"Willesden Green Underground Station"
],
metropolitan:[
"Aldgate Underground Station",
"Amersham Underground Station",
"Baker Street Underground Station",
"Barbican Underground Station",
"Chalfont & Latimer Underground Station",
"Chesham Underground Station",
"Chorleywood Underground Station",
"Croxley Underground Station",
"Eastcote Underground Station",
"Euston Square Underground Station",
"Farringdon Underground Station",
"Finchley Road Underground Station",
"Great Portland Street Underground Station",
"Harrow-on-the-Hill Underground Station",
"Hillingdon Underground Station",
"Ickenham Underground Station",
"King's Cross St. Pancras Underground Station",
"Liverpool Street Underground Station",
"Moor Park Underground Station",
"Moorgate Underground Station",
"North Harrow Underground Station",
"Northwick Park Underground Station",
"Northwood Hills Underground Station",
"Northwood Underground Station",
"Pinner Underground Station",
"Preston Road Underground Station",
"Rayners Lane Underground Station",
"Rickmansworth Underground Station",
"Ruislip Manor Underground Station",
"Ruislip Underground Station",
"Uxbridge Underground Station",
"Watford Underground Station",
"Wembley Park Underground Station",
"West Harrow Underground Station",
"Willesden Green Underground Station"
],
northern:[
"Angel Underground Station",
"Archway Underground Station",
"Balham Underground Station",
"Bank Underground Station",
"Belsize Park Underground Station",
"Borough Underground Station",
"Brent Cross Underground Station",
"Burnt Oak Underground Station",
"Camden Town Underground Station",
"Chalk Farm Underground Station",
"Charing Cross Underground Station",
"Clapham Common Underground Station",
"Clapham North Underground Station",
"Clapham South Underground Station",
"Colindale Underground Station",
"Colliers Wood Underground Station",
"East Finchley Underground Station",
"Edgware Underground Station",
"Elephant & Castle Underground Station",
"Embankment Underground Station",
"Euston Underground Station",
"Finchley Central Underground Station",
"Golders Green Underground Station",
"Goodge Street Underground Station",
"Hampstead Underground Station",
"Hendon Central Underground Station",
"High Barnet Underground Station",
"Highgate Underground Station",
"Kennington Underground Station",
"Kentish Town Underground Station",
"King's Cross St. Pancras Underground Station",
"Leicester Square Underground Station",
"London Bridge Underground Station",
"Mill Hill East Underground Station",
"Moorgate Underground Station",
"Morden Underground Station",
"Mornington Crescent Underground Station",
"Old Street Underground Station",
"Oval Underground Station",
"South Wimbledon Underground Station",
"Stockwell Underground Station",
"Tooting Bec Underground Station",
"Tooting Broadway Underground Station",
"Tottenham Court Road Underground Station",
"Totteridge & Whetstone Underground Station",
"Tufnell Park Underground Station",
"Warren Street Underground Station",
"Waterloo Underground Station",
"West Finchley Underground Station",
"Woodside Park Underground Station"
],
piccadilly:[
"Acton Town Underground Station",
"Alperton Underground Station",
"Arnos Grove Underground Station",
"Arsenal Underground Station",
"Barons Court Underground Station",
"Boston Manor Underground Station",
"Bounds Green Underground Station",
"Caledonian Road Underground Station",
"Cockfosters Underground Station",
"Covent Garden Underground Station",
"Ealing Common Underground Station",
"Earl's Court Underground Station",
"Eastcote Underground Station",
"Finsbury Park Underground Station",
"Gloucester Road Underground Station",
"Green Park Underground Station",
"Hammersmith (Dist&Picc Line) Underground Station",
"Hatton Cross Underground Station",
"Heathrow Terminal  Underground Station",
"Heathrow Terminals  &  Underground Station",
"Hillingdon Underground Station",
"Holborn Underground Station",
"Holloway Road Underground Station",
"Hounslow Central Underground Station",
"Hounslow East Underground Station",
"Hounslow West Underground Station",
"Hyde Park Corner Underground Station",
"Ickenham Underground Station",
"King's Cross St. Pancras Underground Station",
"Knightsbridge Underground Station",
"Leicester Square Underground Station",
"Manor House Underground Station",
"North Ealing Underground Station",
"Northfields Underground Station",
"Oakwood Underground Station",
"Osterley Underground Station",
"Park Royal Underground Station",
"Piccadilly Circus Underground Station",
"Rayners Lane Underground Station",
"Ruislip Manor Underground Station",
"Ruislip Underground Station",
"Russell Square Underground Station",
"South Ealing Underground Station",
"South Harrow Underground Station",
"South Kensington Underground Station",
"Southgate Underground Station",
"Sudbury Hill Underground Station",
"Sudbury Town Underground Station",
"Turnham Green Underground Station",
"Turnpike Lane Underground Station",
"Uxbridge Underground Station",
"Wood Green Underground Station"
],
victoria:[
"Blackhorse Road Underground Station",
"Brixton Underground Station",
"Euston Underground Station",
"Finsbury Park Underground Station",
"Green Park Underground Station",
"Highbury & Islington Underground Station",
"King's Cross St. Pancras Underground Station",
"Oxford Circus Underground Station",
"Pimlico Underground Station",
"Seven Sisters Underground Station",
"Stockwell Underground Station",
"Tottenham Hale Underground Station",
"Vauxhall Underground Station",
"Victoria Underground Station",
"Walthamstow Central Underground Station",
"Warren Street Underground Station"
],
WAC:[
"Bank Underground Station",
"Waterloo Underground Station"
],
londonOverground:[
"Acton Central Rail Station",
"Anerley Rail Station",
"Barking Rail Station",
"Bethnal Green Rail Station",
"Blackhorse Road Rail Station",
"Brockley Rail Station",
"Brondesbury Park Rail Station",
"Brondesbury Rail Station",
"Bruce Grove Rail Station",
"Bush Hill Park Rail Station",
"Bushey Rail Station",
"Caledonian Road & Barnsbury Rail Station",
"Cambridge Heath (London) Rail Station",
"Camden Road Rail Station",
"Canada Water Rail Station",
"Canonbury Rail Station",
"Carpenders Park Rail Station",
"Cheshunt Rail Station",
"Chingford Rail Station",
"Clapham High Street Rail Station",
"Clapham Junction Rail Station",
"Clapham Junction Rail Station",
"Clapton Rail Station",
"Crouch Hill Rail Station",
"Crystal Palace Rail Station",
"Dalston Junction Rail Station",
"Dalston Kingsland Rail Station",
"Denmark Hill Rail Station",
"Edmonton Green Rail Station",
"Emerson Park Rail Station",
"Enfield Town Rail Station",
"Finchley Road & Frognal Rail Station",
"Forest Hill Rail Station",
"Gospel Oak Rail Station",
"Gunnersbury Rail Station",
"Hackney Central Rail Station",
"Hackney Downs Rail Station",
"Hackney Wick Rail Station",
"Haggerston Rail Station",
"Hampstead Heath Rail Station",
"Harlesden Rail Station",
"Harringay Green Lanes Rail Station",
"Harrow & Wealdstone Rail Station",
"Hatch End Rail Station",
"Headstone Lane Rail Station",
"Highams Park Rail Station",
"Highbury & Islington Rail Station",
"Homerton Rail Station",
"Honor Oak Park Rail Station",
"Hoxton Rail Station",
"Imperial Wharf Rail Station",
"Kensal Green Rail Station",
"Kensal Rise Rail Station",
"Kensington (Olympia) Rail Station",
"Kentish Town West Rail Station",
"Kenton Rail Station",
"Kew Gardens Rail Station",
"Kilburn High Road Rail Station",
"Leyton Midland Road Rail Station",
"Leytonstone High Road Rail Station",
"London Euston Rail Station",
"London Fields Rail Station",
"London Liverpool Street Rail Station",
"New Cross ELL Rail Station",
"New Cross Gate Rail Station",
"North Wembley Rail Station",
"Norwood Junction Rail Station",
"Peckham Rye Rail Station",
"Penge West Rail Station",
"Queens Park (London) Rail Station",
"Queens Road Peckham Rail Station",
"Rectory Road Rail Station",
"Richmond (London) Rail Station",
"Romford Rail Station",
"Rotherhithe Rail Station",
"Seven Sisters Rail Station",
"Shadwell Rail Station",
"Shepherds Bush Rail Station",
"Shoreditch High Street Rail Station",
"Silver Street Rail Station",
"South Acton Rail Station",
"South Hampstead Rail Station",
"South Kenton Rail Station",
"South Tottenham Rail Station",
"Southbury Rail Station",
"St James Street (London) Rail Station",
"Stamford Hill Rail Station",
"Stoke Newington Rail Station",
"Stonebridge Park Rail Station",
"Stratford (London) Rail Station",
"Surrey Quays Rail Station",
"Sydenham Rail Station",
"Theobalds Grove Rail Station",
"Turkey Street Rail Station",
"Upminster Rail Station",
"Upper Holloway Rail Station",
"Walthamstow Central Rail Station",
"Walthamstow Queens Road Rail Station",
"Wandsworth Road Rail Station",
"Wanstead Park Rail Station",
"Wapping Rail Station",
"Watford High Street Rail Station",
"Watford Junction Rail Station",
"Wembley Central Rail Station",
"West Brompton Rail Station",
"West Croydon Rail Station",
"West Hampstead Rail Station",
"White Hart Lane Rail Station",
"Whitechapel Rail Station",
"Willesden Junction Rail Station",
"Wood Street Rail Station",
"Woodgrange Park Rail Station"
],
elizabethLine:[
"Abbey Wood",
"Acton Main Line Rail Station",
"Brentwood Rail Station",
"Burnham (Berks) Rail Station",
"Canary Wharf",
"Chadwell Heath Rail Station",
"Custom House",
"Ealing Broadway Rail Station",
"Farringdon",
"Forest Gate Rail Station",
"Gidea Park Rail Station",
"Goodmayes Rail Station",
"Hanwell Rail Station",
"Harold Wood Rail Station",
"Hayes & Harlington Rail Station",
"Heathrow Terminal 4 Rail Station",
"Heathrow Terminal 5 Rail Station",
"Heathrow Terminals 2 & 3 Rail Station",
"Ilford Rail Station",
"Iver Rail Station",
"Langley (Berks) Rail Station",
"Liverpool Street",
"Maidenhead Rail Station",
"Manor Park Rail Station",
"Maryland Rail Station",
"Paddington",
"Reading Rail Station",
"Romford Rail Station",
"Seven Kings Rail Station",
"Shenfield Rail Station",
"Slough Rail Station",
"Southall Rail Station",
"Stratford (London) Rail Station",
"Taplow Rail Station",
"Tottenham Court Road",
"Twyford Rail Station",
"West Drayton Rail Station ",
"West Ealing Rail Station",
"Whitechapel",
"Woolwich",
"London Paddington Rail Station",
"London Liverpool Street Rail Station"
],
DLR:[
"Abbey Road DLR Station",
"All Saints DLR Station",
"Bank DLR Station",
"Beckton DLR Station",
"Beckton Park DLR Station",
"Blackwall DLR Station",
"Bow Church DLR Station",
"Canary Wharf DLR Station",
"Canning Town DLR Station",
"Crossharbour DLR Station",
"Custom House (for ExCel) DLR Station",
"Cutty Sark (for Maritime Greenwich) DLR Station",
"Cyprus DLR Station",
"Deptford Bridge DLR Station",
"Devons Road DLR Station",
"East India DLR Station",
"Elverson Road DLR Station",
"Gallions Reach DLR Station",
"Greenwich DLR Station",
"Heron Quays DLR Station",
"Island Gardens DLR Station",
"King George V DLR Station",
"Langdon Park DLR Station",
"Lewisham DLR Station",
"Limehouse DLR Station",
"London City Airport DLR Station",
"Mudchute DLR Station",
"Pontoon Dock DLR Station",
"Poplar DLR Station",
"Prince Regent DLR Station",
"Pudding Mill Lane DLR Station",
"Royal Albert DLR Station",
"Royal Victoria DLR Station",
"Shadwell DLR Station",
"South Quay DLR Station",
"Star Lane DLR Station",
"Stratford DLR Station",
"Stratford High Street DLR Station",
"Stratford International DLR Station",
"Tower Gateway DLR Station",
"West Ham DLR Station",
"West India Quay DLR Station",
"West Silvertown DLR Station",
"Westferry DLR Station",
"Woolwich Arsenal DLR Station"
],
tram:[
"Addington Village Tram Stop",
"Addiscombe Tram Stop",
"Ampere Way Tram Stop",
"Arena Tram Stop",
"Avenue Road Tram Stop",
"Beckenham Junction Tram Stop",
"Beckenham Road Tram Stop",
"Beddington Lane Tram Stop",
"Belgrave Walk Tram Stop",
"Birkbeck Tram Stop",
"Blackhorse Lane Tram Stop",
"Centrale Tram Stop",
"Church Street Tram Stop",
"Coombe Lane Tram Stop",
"Dundonald Road Tram Stop",
"East Croydon Tram Stop",
"Elmers End Tram Stop",
"Fieldway Tram Stop",
"George Street Tram Stop",
"Gravel Hill Tram Stop",
"Harrington Road Tram Stop",
"King Henry's Drive Tram Stop",
"Lebanon Road Tram Stop",
"Lloyd Park Tram Stop",
"Merton Park Tram Stop",
"Mitcham Junction Tram Stop",
"Mitcham Tram Stop",
"Morden Road Tram Stop",
"New Addington Tram Stop",
"Phipps Bridge Tram Stop",
"Reeves Corner Tram Stop",
"Sandilands Tram Stop",
"Therapia Lane Tram Stop",
"Waddon Marsh Tram Stop",
"Wandle Park Tram Stop",
"Wellesley Road Tram Stop",
"West Croydon Tram Stop",
"Wimbledon Tram Stop",
"Woodside Tram Stop"
]};
suggestionsAuto(inputFromEle,autoStations);
suggestionsAuto(inputToEle,autoStations);