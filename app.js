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

//let currentIndex = 0;
let currentLength = 1;
let firstTime = 10;

app.get('/misc/:index?', (req, res) => {
  console.log('Accessing /misc/:index? route with index:', req.params.index);
  if (!req.params.index) {
    res.redirect('/misc/0');
    return;
  }
  updateData();
  const filteredData = data.filter(item => item.title === 'MISC');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  let currentIndex = parseInt(req.params.index, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    res.redirect(`/misc/${filteredData.length-1}`)
  }
  if (currentIndex >= filteredData.length) {
    res.redirect('/misc/0')
  }

  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('misc', {
      item,
      currentIndex: (currentIndex+1),
      dataLength: filteredData.length,
  });
});

app.get('/dyoa/:index?', (req, res) => {
  if (!req.params.index) {
    res.redirect('/dyoa/0');
    return;
  }
  updateData();
  const filteredData = data.filter(item => item.title === 'DYOA' || item.title === 'DYOAB');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  let currentIndex = parseInt(req.params.index, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    res.redirect(`/dyoa/${filteredData.length-1}`)
  }
  if (currentIndex >= filteredData.length) {
    res.redirect('/dyoa/0')
  }
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('dyoa', {
    item,
    currentIndex: (currentIndex+1),
    dataLength: filteredData.length,
  });
});

app.get('/dyoab/:index?', (req, res) => {
      if (!req.params.index) {
      res.redirect('/dyoab/0');
      return;
    }
  updateData();
  const filteredData = data.filter(item => item.title === 'DYOAB');
  currentLength = filteredData.length;
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  let currentIndex = parseInt(req.params.index, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    res.redirect(`/dyoab/${filteredData.length-1}`)
  }
  if (currentIndex >= filteredData.length) {
    res.redirect('/dyoab/0')
  }
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  //console.log("currentIndex is ", currentIndex, ", filteredData[currentIndex].caption is ", filteredData[currentIndex].caption);
  res.render('dyoab', {
    item,
    currentIndex: (currentIndex+1),
    dataLength: filteredData.length,
  });
});



//console.log("currentIndex is", currentIndex);
app.get('/:index?', (req, res) => {
    if (!req.params.index) {
      res.redirect('/0');
      return;
    }
    // Retrieve all data
    updateData();
    const filteredData = data.slice(); // Create a shallow copy of the data array
    console.log(filteredData.date);
    // Filter data by date
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(filteredData.date);
    // Handle currentIndex and firstTime
    let currentIndex = parseInt(req.params.index, 10);
    if (isNaN(currentIndex) || currentIndex < 0) {
      res.redirect(`/${filteredData.length - 1}`)
    }
    if (currentIndex >= filteredData.length) {
      res.redirect('/0')
    }
  
    const item = filteredData[currentIndex];
    item.title = item.title.toUpperCase();
  
    res.render('all', {
      item,
      currentIndex: (currentIndex+1),
      dataLength: filteredData.length,
    });
});

app.get('/date/:date/:index?', (req, res) => {
  if (!req.params.index) {
    res.redirect(`/date/${req.params.date}/0`);
    return;
  }
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
  let currentIndex = parseInt(req.params.index, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    res.redirect(`/date/${desiredDate}/${filteredData.length-1}`)
  }
  if (currentIndex >= filteredData.length) {
    res.redirect(`/date/${desiredDate}/0`)
  }
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  res.render('date', {
    item,
    currentIndex: (currentIndex+1),
    dataLength: filteredData.length,
  });
});

app.get('/person/:person/:index?', (req, res) => {
  if (!req.params.index) {
    res.redirect(`/person/${req.params.person}/0`);
    return;
  }
  updateData();
  const desiredPerson = req.params.person; //get the desired person and hold it in desiredPerson
  const filteredData = data.filter(item => item.author === desiredPerson);

  // Sort the filteredData by date
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  currentLength = filteredData.length;
  let currentIndex = parseInt(req.params.index, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    res.redirect(`/person/${desiredPerson}/${filteredData.length-1}`)
  }
  if (currentIndex >= filteredData.length) {
    res.redirect(`/person/${desiredPerson}/0`)
  }
  const item = filteredData[currentIndex];
  item.title = item.title.toUpperCase();
  res.render('person', {
    item,
    currentIndex: (currentIndex+1),
    dataLength: filteredData.length,
  });
});





// Handle left button click
app.get('/left-button/:index', (req, res) => {   
  let currentIndex = parseInt(req.params.index, 10);
  currentIndex = currentIndex - 1;
  //res.redirect('/' + currentIndex);
  window.location.href = '/' + currentIndex
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