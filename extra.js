let iData = $(".card.content-block.match-scorecard-table .Collapsible");
    // --- replace below with loop ----
        // Inning tittle 
        let InningTitle = $(iData[0]).find("h5");
        let fInning = $(InningTitle[0]).text();
        console.log("SCORECARD : \n");
        console.log(fInning+"\n");
        // finning batsman data 
        let tableBatsman = $(iData[0]).find(".table.batsman");
        let allRowsTBman = $(tableBatsman).find("tbody tr");
        for(let i = 0; i < allRowsTBman.length-1; i++){
            cRowDetails = $(allRowsTBman[i]).text();
            console.log(cRowDetails);
        }
        // fining bowling data 
        console.log("----------------------------------------------");
            let bowlingData = $(iData[0]).find(".table.bowler");
            let allRowsTBowl = $(bowlingData).find("tbody tr");
            for(let j = 0; j < allRowsTBman.length; j++){
                cbRowDetails = $(allRowsTBowl[j]).text();
                console.log(cbRowDetails);
         
            }
    // --- replace above with looop ----