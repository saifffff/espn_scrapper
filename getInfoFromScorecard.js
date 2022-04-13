const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function getScorecardInfo(url) {
    request(url, cb);
    // console.log(url);
}

function cb(err, res, html) {
    if (err){ console.error(err);}
    else {
        handleHtml(html);
        //console.log("in gifs handle html "+count);
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
    // let htmlString = "";
    // let count = 0;
    for(let i = 0; i< allBatsmenTable.length; i++){
        // htmlString += $(allBatsmenTable[i]).html();
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
                
               // processInfo(dateOfMatch,venueOfMatch,matchRes,team1,team2,playerName,runs,balls,numberOf4,numberOf6,sr);

            }

            
        }

    }
    

    

}

function processInfo(dateOfMatch,venueOfMatch,matchRes,team1,team2,playerName,runs,balls,numberOf4,numberOf6,sr){
    let teamNamePath = path.join(__dirname,"IPL",team1);
    if(!fs.existsSync(teamNamePath)){
        fs.mkdirSync(teamNamePath);
    }

    let playerPath = path.join(teamNamePath,playerName+".xlsx");
    let content = excelReader(playerPath,playerName);

    let playerObj = {
        dateOfMatch,venueOfMatch,matchRes,team1,team2,playerName,runs,balls,numberOf4,numberOf6,sr
    };

    content.push(playerObj);

    excelWriter(playerPath,content,playerName);


}

function excelReader(playerPath,sheetName){
    if(!fs.existsSync(playerPath)){
        // if file does not exist return an empty array
        return [];
    }
    // if exists read file
    let workBook = xlsx.readFile(playerPath);
    // A dictionary of the worksheets in the workbook. using SheetNames to reference these
    let excelData = workBook.Sheets[sheetName];
    let playerObj = xlsx.utils.sheet_to_json(excelData);
    return playerObj;

    
}

function excelWriter(playerPath, jsObject, sheetName) {
    //Creates a new workbook
    let newWorkBook = xlsx.utils.book_new();
    //Converts an array of JS objects to a worksheet.
    let newWorkSheet = xlsx.utils.json_to_sheet(jsObject);
    //it appends a worksheet to a workbook
    xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, sheetName);
    // Attempts to write or download workbook data to file
    xlsx.writeFile(newWorkBook, playerPath);
  }

module.exports = {
    gifs: getScorecardInfo,
};