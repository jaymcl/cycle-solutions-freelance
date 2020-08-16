   
let inputChoiceFrom = "bankstation";
let inputChoiceTo = "neasdenstation";



    let results =[];

    axios.get("https://api.tfl.gov.uk/journey/journeyresults/bank/to/neasden", {
  validateStatus: function (status) {
    return status <= 300; // Reject only if the status code is greater than 300
  }
}).then(function (response) {
    results = response  
    let blap = results["data"]["fromLocationDisambiguation"]["disambiguationOptions"][0]["uri"];
    console.log(blap);
    let boop = "htps://api.tfl.gov.uk" + blap
    console.log(boop);
});
let flip = "https://api.tfl.gov.uk/journey/journeyresults/bank/to/neasden";

const axFunc = (url) => {
    let boop ="";
    axios.get(url , {
  validateStatus: function (status) {
    return status <= 300;
  }
}).then(function (response) {
    results = response  
    let blap = results["data"]["fromLocationDisambiguation"]["disambiguationOptions"][0]["uri"];
    console.log(blap);
    boop = "htps://api.tfl.gov.uk" + blap
    console.log(boop);
});
return boop
}

axFunc(flip);
