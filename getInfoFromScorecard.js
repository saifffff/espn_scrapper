const request = require("request");
const cheerio = require("cheerio");

 function getScorecardInfo(url){
    request(url,cb);
 }

 function cb(err,res,html){
     if(err){console.error(err);}
     else{
        handleHtml(html);
     }
 }

 function handleHtml(html){
     let $ = cheerio.load(html);
    // get venue 
    
    //get date 

    //get team names
    let names = $(".event .name");
    let team1 = $(names[0]).text();
    let team2 = $(names[1]).text();
    console.log("Match : \n"+team1+" VS "+team2);
    
    //get result

 }




module.exports = {
    gifs:getScorecardInfo,
};