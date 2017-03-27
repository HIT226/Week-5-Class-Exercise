/**
* Do all the following with JS only
*
* TODO: Calculate the total for each student
*
* TODO: Highlight rows under the following rules (background colour):
*
* HD 85% >     #53f442
* D  75% > 84% #a4f99a
* C  60% > 74% #d6fc58
* P  50% > 59% white
* F      < 50% #f96b6b
*
* TODO: Add a paragraph before the table with a summary of how many students recieved each grade
*
* TODO: Bonus, congratulate the highest scoring student in the summary paragraph
*
* TODO: Bonus, Add a heading for "These students need to study harder" and list those whom recieved F's
*
*/

// Get the results table
var resultsTable = document.querySelector('#results');

//get the tbody (data)
var resultsData = resultsTable.querySelector('tbody');

//get each row
var students = resultsData.querySelectorAll('tr');

//calculate and add totals
students.forEach(function(student){
  var courseResults = student.querySelectorAll('td');
  var total = 0;

  courseResults.forEach(function(mark){
    total += Number(mark.textContent);
  });

  var totalCell = courseResults[courseResults.length - 1];
  totalCell.textContent = total;

});

// Highlight based on totals
students.forEach(function(student){
  var totalCol = student.querySelector('td:last-child');
  var total = Number(totalCol.textContent);

  switch (true) {
    case total >= 85:
      student.style.backgroundColor = '#53f442';
      break;
    case total < 85 && total >= 75:
      student.style.backgroundColor = '#a4f99a';
      break;
    case total < 75 && total >= 60:
      student.style.backgroundColor = '#d6fc58';
      break;
    case total < 50:
      student.style.backgroundColor = '#f96b6b';
      break;
    default:
      student.style.backgroundColor = '#ffffff';
  }

});


// count how many students achieved each grade
var grades = {
  HD : 0,
  D : 0,
  C : 0,
  P : 0,
  F : 0
};
students.forEach(function(student){
  var totalCol = student.querySelector('td:last-child');
  var total = Number(totalCol.textContent);

  switch (true) {
    case total >= 85:
      grades.HD++;
      break;
    case total < 85 && total >= 75:
      grades.D++;
      break;
    case total < 75 && total >= 60:
      grades.C++;
      break;
    case total < 50:
      grades.F++;
      break;
    default:
      grades.P++;
  }
});

var summaryParagraph = document.createElement('p');

summaryParagraph.innerText = 'Totals for each grade: HD:'+ grades.HD +', D:'+ grades.D + ', C: '+ grades.C +', P:'+ grades.P +', F:'+ grades.F;

var rowDiv = resultsTable.parentNode;

rowDiv.insertBefore(summaryParagraph, resultsTable);
