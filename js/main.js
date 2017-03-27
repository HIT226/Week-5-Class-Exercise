/**
* TODO: Calculate the total for each student
*
* TODO: Highlight rows under the following rules (background colour):
*
* 85% >     #53f442
* 75% > 84% #a4f99a
* 60% > 74% #d6fc58
* 50% > 59% white
*     < 50% #f96b6b
*
* TODO: Add a paragraph before the table with a message congratulating the highest scoring student
*
*/

// Get the results table
var resultsTable = document.querySelector('#results');

//get the tbody (data)
var resultsData = resultsTable.querySelector('tbody');

//get each row
var students = resultsData.querySelectorAll('tr');

students.forEach(function(student){
  var courseResults = student.querySelectorAll('td');
  var total = 0;

  courseResults.forEach(function(mark){
    console.log(mark.textContent);
    total += Number(mark.textContent);
  });

  var totalCell = courseResults[courseResults.length - 1];
  totalCell.textContent = total;

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
