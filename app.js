// Express
const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8493;                 // Set a port number at the top so it's easy to change in the future
const exphbs = require('express-handlebars');     // Import express-handlebars
const fs = require('fs');
const bodyParser = require('body-parser');


//Leftover code from old app.js
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))

// Handlebars
//const { engine } = require('express-handlebars');

app.engine('.handlebars', exphbs.engine({ defaultLayout: 'main'}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.handlebars');                 // Tell express to use the handlebars engine whenever it encounters an.hbs file.

app.use(express.json());
app.use(express.static('public'));


function updateData() {
  data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
}

let currentIndex = 0;
let currentLength = 1;
let firstTime = 10;

console.log("currentIndex is", currentIndex);
app.get('/', (req, res) => {
    // Retrieve all data
    updateData();
    const filteredData = data.slice(); // Create a shallow copy of the data array
    console.log(filteredData.date);
    // Filter data by date
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(filteredData.date);
    // Handle currentIndex and firstTime
    if (firstTime !== 6) {
      currentIndex = 0;
      firstTime = 6;
    }
    if (currentIndex < 0) {
      currentIndex = filteredData.length - 1;
    }
    if (currentIndex >= filteredData.length) {
      currentIndex = 0;
    }
  
    const currentIndexPlusOne = currentIndex + 1;
    const item = filteredData[currentIndex];
    item.title = item.title.toUpperCase();
  
    res.render('all', {
      item,
      currentIndex: currentIndexPlusOne,
      dataLength: filteredData.length,
    });
});

app.get('/date/:date', (req, res) => {
  updateData();
  const desiredDate = req.params.date; //get the desired date and hold it in desiredDate
  const filteredData = data.filter(item => item.date === desiredDate);
  if (filteredData.length === 0) {
    res.render('dateError', {
      desiredDate: desiredDate
    });
    return; // Exit the function early
  }
  currentLength = filteredData.length;
  if(firstTime != 1) {
    currentIndex = 0;
  }
  if(currentIndex < 0) {
    currentIndex = filteredData.length-1;
  }
  if(currentIndex >= filteredData.length) {
    currentIndex = 0;
  }
  firstTime = 1;
  const currentIndexPlusOne = currentIndex + 1;
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  res.render('date', {
    item,
    currentIndex: currentIndexPlusOne,
    dataLength: filteredData.length,
  });
});

app.get('/person/:person', (req, res) => {
  updateData();
  const desiredPerson = req.params.person; //get the desired person and hold it in desiredPerson
  const filteredData = data.filter(item => item.author === desiredPerson);

  // Sort the filteredData by date
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  currentLength = filteredData.length;
  if(firstTime != 2) {
    currentIndex = 0;
  }
  if(currentIndex < 0) {
    currentIndex = filteredData.length-1;
  }
  if(currentIndex >= filteredData.length) {
    currentIndex = 0;
  }
  firstTime = 2;
  const currentIndexPlusOne = currentIndex + 1;
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  res.render('person', {
    item,
    currentIndex: currentIndexPlusOne,
    dataLength: filteredData.length,
  });
});

app.get('/misc', (req, res) => {
  updateData();
  const filteredData = data.filter(item => item.title === 'MISC');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  if(firstTime != 3) {
    currentIndex = 0;
  }
  if(currentIndex < 0) {
    currentIndex = filteredData.length-1;
  }
  if(currentIndex >= filteredData.length) {
    currentIndex = 0;
  }
  firstTime = 3;
  const currentIndexPlusOne = currentIndex + 1;
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('misc', {
    item,
    currentIndex: currentIndexPlusOne,
    dataLength: filteredData.length,
  });
});

app.get('/dyoa', (req, res) => {
  updateData();
  const filteredData = data.filter(item => item.title === 'DYOA' || item.title === 'DYOAB');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  if(firstTime != 4) {
    currentIndex = 0;
  }
  if(currentIndex < 0) {
    currentIndex = filteredData.length-1;
  }
  if(currentIndex >= filteredData.length) {
    currentIndex = 0;
  }
  firstTime = 4;
  const currentIndexPlusOne = currentIndex + 1;
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('dyoa', {
    item,
    currentIndex: currentIndexPlusOne,
    dataLength: filteredData.length,
  });
});

app.get('/dyoab', (req, res) => {
  updateData();
  const filteredData = data.filter(item => item.title === 'DYOAB');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  if(firstTime != 5) {
    currentIndex = 0;
  }
  if(currentIndex < 0) {
    currentIndex = filteredData.length-1;
  }
  if(currentIndex >= filteredData.length) {
    currentIndex = 0;
  }
  firstTime = 5;
  const currentIndexPlusOne = currentIndex + 1;
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('dyoab', {
    item,
    currentIndex: currentIndexPlusOne,
    dataLength: filteredData.length,
  });
});


// Handle left button click
app.get('/left-button', (req, res) => {   
  currentIndex = currentIndex - 1;
  res.send('Left button clicked!');
  
});

// Handle right button click
app.get('/right-button', (req, res) => {  
  currentIndex = currentIndex + 1;
  res.send('Right button clicked!');
  
});

app.get('/date-button', (req, res) => {
  currentIndex = 0;
  res.status(200).send("Date button route was called");
});


// Your server-side logging route
app.post('/add-post', (req, res) => {
  console.log(req.body); // Log the data from the client-side


  // Read the existing data from data.json
  const rawData = fs.readFileSync('data.json');
  const jsonData = JSON.parse(rawData);

  // Append the new data to the array
  jsonData.push(req.body);

  // Write the updated data back to data.json
  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

  res.sendStatus(200); // Respond to the client
});


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
  });