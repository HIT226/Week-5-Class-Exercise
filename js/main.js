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


/*
* PART ONE
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

/*
* PART TWO
*/

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


/*
* PART THREE
*/

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

//create a new paragraph
var summaryParagraph = document.createElement('p');

//set text
summaryParagraph.innerText = 'Totals for each grade: HD:'+ grades.HD +', D:'+ grades.D + ', C: '+ grades.C +', P:'+ grades.P +', F:'+ grades.F;

//get a referance to the div around our table
var rowDiv = resultsTable.parentNode;

//insert paragrpah before table
rowDiv.insertBefore(summaryParagraph, resultsTable);


/*
* PART FOUR
*/

// find highest scoring student

//setup a variable to hold our student and score
var highestMark = {
  mark: 0,
  student: null
};

students.forEach(function(student){
  var totalCol = student.querySelector('td:last-child');
  var total = Number(totalCol.textContent);

  if(total > highestMark.mark){
    highestMark.mark = total;
    highestMark.student = student;
  }

});
// get the students name
var studentName = highestMark.student.querySelector('th').innerText;
// update the summary paragraph
summaryParagraph.innerHTML = 'Congradulations to ' + studentName + ' For having the highest mark in the class with a <strong>'+ highestMark.mark +'</strong>. ' + summaryParagraph.innerHTML;


/*
* PART FIVE
*/

// find all failing students
var failingStudents = [];
students.forEach(function(student){
  var totalCol = student.querySelector('td:last-child');
  var total = Number(totalCol.textContent);

  if(total < 50){
    var failingStudentName = student.querySelector('th').innerText;
    failingStudents.push(failingStudentName);
  }
});

// create an aside to house our message
var failingMessage = document.createElement('aside');

//give it a title
failingMessage.innerHTML = '<h2>These students need to study harder</h2>';

//create a list for our student names
var failingList = document.createElement('ul');

// add our failing students to the list
failingStudents.forEach(function(studentName){
    var listItem = document.createElement('li');
    listItem.innerText = studentName;
    failingList.appendChild(listItem);
});

// add the list to our aside
failingMessage.appendChild(failingList);

//add our aside beofore the table
rowDiv.insertBefore(failingMessage, resultsTable);
