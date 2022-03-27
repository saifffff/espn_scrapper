const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require("request");
const cheerio = require("cheerio");
const getAllMatchObj = require("./getAllMatch");
const fs = require("fs");
const path = require("path");

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

 //  console.log(__dirname); // __dirname returns path of the cwd
 let iplPath = path.join(__dirname,"IPL");
 console.log(iplPath);
 if(!fs.existsSync(iplPath)){
     fs.mkdirSync(iplPath);
 }


 function handleHTML(html){
     let $ = cheerio.load(html);
     let anchorElem = $('a[data-hover="View All Results"]');
     // attr method --> Method for getting all attributes with their values
     let relativeLink = anchorElem.attr("href");
    //  console.log(relativeLink);
     let fullLink = "https://www.espncricinfo.com" + relativeLink;
    //  console.log(fullLink);
     getAllMatchObj.getAllMatch(fullLink);
 }

