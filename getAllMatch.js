const request = require("request");
const cheerio = require("cheerio");
const homeurl = "https://www.espncricinfo.com";
const {gifs} = require("./getInfoFromScorecard");
// getAllMatch(url);

function getAllMatch(url){
    // console.log(url);
    request(url,cb);
}

function cb(err,res,body){
    if(err){console.log(err);}
    else{
        handleHtml(body);
    }
}

function handleHtml(html){
    let $ = cheerio.load(html);
    let allMatchArray = $('a[data-hover="Scorecard"]'); 
    // console.log(allMatchArray.length);
    for(let i = 0; i < allMatchArray.length; i++){
        let scLinkRelative = $(allMatchArray[i]).attr("href");
        // console.log(scLinkRelative); // this is a relative link
        let scLinkFull = homeurl+scLinkRelative;
        // console.log(scLinkFull);
        gifs(scLinkFull);

    }
}




 module.exports = {
     getAllMatch : getAllMatch,
 };