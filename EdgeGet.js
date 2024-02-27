// ==UserScript==
// @name        EdgeMatrix Data Extractor
// @version     0.1
// @description Extract data from https://dashboard.edgematrix.pro/#/nodes/16Uiu2HAkyVLcY4tikffGfmTW5ejRqT3ikDRQNmkftVYLvRczUpKh and send it to you by email every hour.
// @author       Bard
// @match        https://dashboard.edgematrix.pro/#/nodes/16Uiu2HAkyVLcY4tikffGfmTW5ejRqT3ikDRQNmkftVYLvRczUpKh
// @grant        none
// ==/UserScript==

(function() {
  // Get the data from the web page.
 function getDataFromWebPage() {
  // Get the table element that contains the data.
  var table = document.querySelector(".table");

  // Create an array to store the data.
  var data = [];

  // Iterate over the rows in the table.
  for (var i = 0; i < table.rows.length; i++) {
    // Get the cells in the row.
    var cells = table.rows[i].cells;

    // Add the data from the cells to the array.
    data.push({
      name: cells[0].textContent,
      value: cells[1].textContent
    });
  }

  // Return the data.
  return data;
}

  // Send the data to the user by email.
 function sendEmail(data) {
  // Create an email message.
  var message = {
    to: "your_email_address@example.com",
    from: "edgematrix-data-extractor@example.com",
    subject: "EdgeMatrix Data Extractor Report",
    body: "The following data was extracted from https://dashboard.edgematrix.pro/#/nodes/16Uiu2HAkyVLcY4tikffGfmTW5ejRqT3ikDRQNmkftVYLvRczUpKh:\n\n" + JSON.stringify(data, null, 2)
  };

  // Send the email message.
  var smtp = require("smtp-js");

  smtp.send(message, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully!");
    }
  });
}

  // Schedule the next data extraction.
  setTimeout(function() {
    // This function will be called every hour.
    getDataFromWebPage();
    sendEmail(data);
  }, 3600000);




})();
