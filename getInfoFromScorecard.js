const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function getScorecardInfo(url) {
    request(url, cb);
    // console.log(url);
}

function cb(err, res, html) {
    if (err){ console.error(err);}
    else {
        handleHtml(html);
    }
}

function handleHtml(html) {
    let $ = cheerio.load(html);
    //get team names
    let names = $(".event .name");
    let team1 = $(names[0]).text();
    let team2 = $(names[1]).text();
    console.log("" + team1 + " VS " + team2);
    // get venue get date
    let desc = $(".match-header-info.match-info-MATCH");
    // console.log(desc.text());
    let descArr = desc.text().split(",");
    //Match (N), Abu Dhabi, Oct 25 2020, Indian Premier League
    // console.log(descArr);
    let dateOfMatch = descArr[2];
    let venueOfMatch = descArr[1];
    console.log(dateOfMatch);
    console.log(venueOfMatch);
    // get result
    let matchRes = $(
        ".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text"
    ).text();
    console.log(matchRes);

    // get innings
    let allBatsmenTable = $(".table.batsman tbody");
    let htmlString = "";
    let count = 0;
    for(let i = 0; i< allBatsmenTable.length; i++){
        htmlString += $(allBatsmenTable[i]).html();
        // get the descendants(table rows) of each element (table)
        let allRows = $(allBatsmenTable[i]).find("tr"); //all filled and empty rows
        for(let j = 0; j < allRows.length; j++){
            let row = $(allRows[j]);
            let fColRow = $(row).find("td")[0]; // cheerio??
            if($(fColRow).hasClass("batsman-cell")){
                let playerName = $(row.find("td")[0]).text().trim();
                // console.log(playerName);
                let runs = $(row.find("td")[2]).text();
                let balls = $(row.find("td")[3]).text();
                let numberOf4 = $(row.find("td")[5]).text();
                let numberOf6 = $(row.find("td")[6]).text();
                let sr = $(row.find("td")[7]).text();

                console.log(
                    `playerName -> ${playerName} runsScored ->  ${runs} ballsPlayed ->  ${balls} numbOfFours -> ${numberOf4} numbOfSixes -> ${numberOf6}  strikeRate-> ${sr}`
                  );
                


            }

            
        }

    }
    

    

}




module.exports = {
    gifs: getScorecardInfo,
};