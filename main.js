let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require("request");
const cheerio = require("cheerio");

// get html form url
request(url,cb);

 function cb(err,res,body){
     //if error log error or call function handleHTML and pass body of html as arg
     if(err){
         console.error("error",err);
     }else{
         handleHTML(body);
     }
 }

 function handleHTML(html){
     let selecTool = cheerio.load(html);
     let anchorElem = selecTool('a[data-hover="View All Results"]');
     // attr method --> Method for getting all attributes with their values
     let relativeLink = anchorElem.attr("href");
     console.log(relativeLink);
     let fullLink = "https://www.espncricinfo.com" + relativeLink;
     console.log(fullLink);
 }

