$(function() {
    $("#compileCards").on("click", () => {
        let data = $("textarea#cardData").val();
        let block = data.match(/\b(blockquote)[\s\S]{0,}(\/blockquote)/gi);
        let tables = block[0].match(/<table([\s\S]*?)<\/table>/gi);
 
        let cards = tables.map((table, index) => {
            let name = table.match(/(?<=<b>)(.*?)(?=<\/b>)/gi)[0];
            let nickname = table.match(/(?<=<b>Nickname:&nbsp;<\/b>)([\S]*?[\s]{0,1}[\S]*?)(?=<\/td>)/gi)[0].trim();
            let email = table.match(/(?<=<a href=\"mailto:)([\s\S]*?)(?=\")/gi)[0];
            let employeeId = table.match(/(?<=<b>EmplID:&nbsp;<\/b>)([0-9]*?)(?=<br>)/gi)[0].trim();
            let netId = table.match(/(?<=(<b>NetID:<\/b>)(&nbsp;){0,1})([\S]*?)(?=<\/td>)/gi)[0].trim(); 
            let program = table.match(/(?<=<b>Program:&nbsp;<\/b>)([\s\S]*?)(?=<\/td>)/gi)[0].trim();
            let gradYear = table.match(/(?<=<b>Expected Grad Year:&nbsp;<\/b>)([\s\S]*?)(?=<\/td>)/gi)[0].trim();
            let recentEmployer = table.match(/(?<=<b>Most Recent Employer:&nbsp;<\/b>[\s]{0,}(&nbsp;){0,1})([\s\S]*?)(?=<br>)/gi)[0].trim();
            let titlePerson = table.match(/(?<=(<b>[\s]{0,}Title:&nbsp;[\s]{0,}<\/b>[\s]{0,})(&nbsp;){0,1})([\s\S]*?)(?=<\/td>)/gi)[0].trim();
            let image = table.match(/(?<=<img id=\"ContentPlaceHolder1_imgStudentPicURL\"[\s]{0,} src=\")([\s\S]*?)(?=\")/gi)[0];

            // add space in name

            name = name.replace(/(,)/g, ", ")

            // edge cases

            if (gradYear.search(/[0-9]{1,}/gi) === -1) {
                gradYear = "";
            }

            if (recentEmployer.search(/(&amp;)/g) !== -1) {
                recentEmployer = recentEmployer.replace(/(&amp;)/g, "&");
            }

            if (titlePerson.search(/(&amp;)/g) !== -1) {
                titlePerson = titlePerson.replace(/(&amp;)/g, "&");
            }

            if (image === "../Rosters/images/NoPicture.png" || image === "images/NoPicture.png") {
                image = "./images/wikiplaceholder.png";
            }

            // adds in names, nicknames
            // $('div#namesHolder').append(`<p> ${name} </p>`);
            // $('div#nicknamesHolder').append(`<p> ${nickname} </p>`);
            
            $("#cardHolder").append(`
                <div class="card">
                    <div class="cardData">
                        <div class="topRow">
                            <div class="topColumn">
                                <h2> ${name} </h2> </p>
                                <p class="paraNick"> <b> Nickname: </b> ${nickname} </p>
                            </div>
                        </div>
                
                        <div class="bottomRow">
                            <div class="leftColumn">
                                <img class="profileImage" src="${image}">
                            </div>
                            <div class="rightColumn">
                                <p class="paraShort"> <b> Email: </b> ${email} </p>
                                <p class="paraShort"> <b> Program: </b> ${program} </p>
                                <p class="paraShort"> <b> Expected Grad Year: </b> ${gradYear} </p>
                                <p class="paraShort"> <b> Most Recent Employer: </b> ${recentEmployer} </p>
                                <p class="paraShort"> <b> Title: </b> ${titlePerson} </p>
                                <p class="paraShort"> <b> EmplID: </b> ${employeeId} </p>
                                <p class="paraShort"> <b> NetID: </b> ${netId} </p>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            try {
                let undergraduate = table.match(/(?<=<b>Undergraduate:&nbsp;<\/b>)([\s\S]*?)(?=<\/td>)/gi)[0].trim();
                let undergraduateMajor = table.match(/(?<=<b>Undergraduate Major:&nbsp;<\/b>)([\s\S]*?)(?=<\/td>)/gi)[0].trim();
                let majors = table.match(/(?<=<b>Major\(s\):&nbsp;<\/b>)([\s\S]*?)(?=<\/td>)/gi)[0].trim();
                
                if (undergraduateMajor.search(/[a-zA-Z]{1,}/gi)  === -1) {
                    undergraduateMajor= "";
                }

                if (majors.search(/[a-zA-Z]{1,}/gi)  === -1) {
                    majors= "";
                }

                $(".rightColumn").last().append(`<p class="paraShort"> <b> Major(s): </b> ${majors} </p>`);
                $(".rightColumn").last().append(`<p class="paraShort"> <b> Undergraduate: </b> ${undergraduate} </p>`);
                $(".rightColumn").last().append(`<p class="paraShort"> <b> Undergraduate Major: </b> ${undergraduateMajor} </p>`);
            } catch (error) {
            }

            try {
                let embaCohort = table.match(/(?<=<b>EMBA Cohort:&nbsp;<\/b>[\s]{0,})([a-zA-Z0-9]*?)(?=<\/td>)/gi)[0].trim();

                if (embaCohort.search(/[a-zA-Z0-9]{1,}/gi)  === -1) {
                    embaCohort= "";
                }

                $(".rightColumn").last().append(`<p class="paraShort"> <b> EMBACohort: </b> ${embaCohort} </p>`);
            } catch (error) {
            } 
            
        });
        
        $("#addHTML").remove();
    });
});
