const request = require("request");
const cheerio = require("cheerio");
const homeurl = "https://www.espncricinfo.com";
const {gifs} = require("./getInfoFromScorecard");
// getAllMatch(url);

function getAllMatch(url){
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
    let allMatchArray = $('.ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent a'); 
    // console.log("allmatcharr= "+allMatchArray.length);
    for(let i = 2; i < allMatchArray.length; i=i+4){
        let scLinkRelative = $(allMatchArray[i]).attr("href");
         //console.log(scLinkRelative); // this is a relative link
         let scLinkFull = homeurl+scLinkRelative;
       //  console.log(scLinkFull);
         gifs(scLinkFull);

    }
}




 module.exports = {
     getAllMatch : getAllMatch,
 };