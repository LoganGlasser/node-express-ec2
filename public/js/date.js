document.addEventListener('DOMContentLoaded', () => {   //makign sure all of the DOM is loaded
    //populate the available dates
    const dateDropdown = document.getElementById('dateDropdown');

    function handleDateClick(dateName) {
        // Modify the URL without reloading the page
        const baseURL = window.location.protocol + '//' + window.location.host;
    
        // Construct the new URL based on the current base URL and the person's name
        const newURL = `${baseURL}/date/${dateName}`;
        return newURL;

    }

    const dateList = ['10.01.2021', '10.02.2021', '10.03.2021', '10.04.2021', '10.05.2021', '10.06.2021', '10.07.2021', '10.08.2021', '10.09.2021', '10.10.2021', '10.11.2021', '10.12.2021', '10.13.2021', '10.14.2021', '10.15.2021', '10.16.2021', '10.17.2021', '10.18.2021', '10.19.2021', '10.20.2021', '10.21.2021', '10.22.2021', '10.23.2021', '10.24.2021', '10.25.2021', '10.26.2021', '10.27.2021', '10.28.2021', '10.29.2021', '10.30.2021', '10.31.2021', '10.01.2022', '10.02.2022', '10.03.2022', '10.04.2022', '10.05.2022', '10.06.2022', '10.07.2022', '10.08.2022', '10.09.2022', '10.10.2022', '10.11.2022', '10.12.2022', '10.13.2022', '10.14.2022', '10.15.2022', '10.16.2022', '10.17.2022', '10.18.2022', '10.19.2022', '10.20.2022', '10.21.2022', '10.22.2022', '10.23.2022', '10.24.2022', '10.25.2022', '10.26.2022', '10.27.2022', '10.28.2022', '10.29.2022', '10.30.2022', '10.31.2022', '10.01.2023', '10.02.2023', '10.03.2023', '10.04.2023', '10.05.2023', '10.06.2023', '10.07.2023', '10.08.2023', '10.09.2023', '10.10.2023', '10.11.2023', '10.12.2023', '10.13.2023', '10.14.2023', '10.15.2023', '10.16.2023', '10.17.2023', '10.18.2023', '10.19.2023', '10.20.2023', '10.21.2023', '10.22.2023', '10.23.2023', '10.24.2023', '10.25.2023', '10.26.2023', '10.27.2023', '10.28.2023', '10.29.2023', '10.30.2023', '10.31.2023']
    
    dateList.forEach(date => {
        const dateLink = document.createElement('a');
        dateLink.textContent = date;
        dateLink.href = handleDateClick(date);
        dateDropdown.appendChild(dateLink);
    })
    
    //Populate the available people in the button
    const personDropdown = document.getElementById('personDropdown');

    function handlePersonClick(personName) {
        // Modify the URL without reloading the page
        const baseURL = window.location.protocol + '//' + window.location.host;
    
        // Construct the new URL based on the current base URL and the person's name
        const newURL = `${baseURL}/person/${personName}`;
        return newURL;

    }

    const personList = ['Logan', 'Connor', 'Tanner', 'Mangoes', 'TannerD', 'Derp', 'AJ', 'Daniel', 'Clara']
    
    personList.forEach(person => {
        const personLink = document.createElement('a');
        personLink.textContent = person;
        personLink.href = handlePersonClick(person);
        personDropdown.appendChild(personLink);
    })


    document.getElementById("allButton").addEventListener("click", function() {
        const baseURL = window.location.protocol + '//' + window.location.host;
    
        // Construct the new URL based on the current base URL and the person's name
        const newURL = `${baseURL}`;
        window.location.href = newURL;
    })

    document.getElementById("dateButton").addEventListener('click', function() {
        toggleDropdown('dateDropdown');
    })

    document.getElementById("personButton").addEventListener('click', function() {
        toggleDropdown('personDropdown');
    })

    function toggleDropdown(dropdownID) {
        var dropdown = document.getElementById(dropdownID);
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }
    
    document.getElementById("miscButton").addEventListener("click", function() {
        const baseURL = window.location.protocol + '//' + window.location.host;
    
        // Construct the new URL based on the current base URL and the person's name
        const newURL = `${baseURL}/misc`;
        window.location.href = newURL;
    })

    document.getElementById("DYOAButton").addEventListener("click", function() {
        const baseURL = window.location.protocol + '//' + window.location.host;
    
        // Construct the new URL based on the current base URL and the person's name
        const newURL = `${baseURL}/dyoa`;
        window.location.href = newURL;
    })

    
    document.getElementById("right-button").addEventListener("click", function() {
        // Get the current URL
        const currentUrl = window.location.pathname;

        // Split the URL path on '/'
        const parts = currentUrl.split('/');

        // Extract the last part which should be the index
        let currentIndex = parseInt(parts.pop());

        // Handle different URL formats
        if (isNaN(currentIndex)) {
            // If the last part is not a number, it might be the :person part
            currentIndex = parseInt(parts.pop());
        }

        // Subtract 1 from the currentIndex
        currentIndex++;

        // Reconstruct the URL
        const newUrl = parts.join('/') + '/' + currentIndex;

        // Navigate to the new URL
        window.location.href = newUrl;
            
    });

    document.getElementById("left-button").addEventListener("click", function() {
        // Get the current URL
        const currentUrl = window.location.pathname;

        // Split the URL path on '/'
        const parts = currentUrl.split('/');

        // Extract the last part which should be the index
        let currentIndex = parseInt(parts.pop());

        // Handle different URL formats
        if (isNaN(currentIndex)) {
            // If the last part is not a number, it might be the :person part
            currentIndex = parseInt(parts.pop());
        }

        // Subtract 1 from the currentIndex
        currentIndex--;

        // Reconstruct the URL
        const newUrl = parts.join('/') + '/' + currentIndex;

        // Navigate to the new URL
        window.location.href = newUrl;
            
    });

    document.getElementById("left-date").addEventListener("click", function() {
        navigateToAdjacentDate(-1); // -1 for the previous date
    });

    document.getElementById("right-date").addEventListener("click", function() {
        navigateToAdjacentDate(1); // 1 for the next date
    });

    function navigateToAdjacentDate(direction) {
        const currentUrl = window.location.href;
        
        //The following code outputs this: dateMatch[0]: http://flip1.engr.oregonstate.edu:8493/specific/10.08.2023, dateMatch[1]:10.08.2023
        const dateMatch = currentUrl.match(/\/date\/(\d{2}.\d{2}.\d{4})/);

        const currentDate = dateMatch[1];   //currentDate is the current date in the url

        //parse the current date into components. now, month = "10", day = "08", and year = "2023". These are still strings
        const [month, day, year] = currentDate.split('.')

        // Convert the components to numbers titled currentMonth, currentDay, and currentYear.
        const currentMonth = parseInt(month, 10);
        const currentDay = parseInt(day, 10);
        const currentYear = parseInt(year, 10);

        // Define the minimum and maximum dates for October
        const minDate = new Date(currentYear, 9, 1); // October 1st (in java, january is 0 and december is 11, so 9 is october (who did this))
        const maxDate = new Date(currentYear, 9, 31); // October 31st

        let newDate;
        if(direction == -1) {   //if we are moving left
            newDate = new Date(currentYear, currentMonth - 1, currentDay - 1);
            changeIndex();
            console.log(newDate);
        }
        else {  //if we are moving right
            newDate = new Date(currentYear, currentMonth - 1, currentDay + 1);
            changeIndex();
        }
        
        if(newDate < minDate) {
            newDate = new Date(currentYear-1, 9, 31);
        }
        else if (newDate > maxDate) {
            newDate = new Date(currentYear+1, 9, 1);;
        }
        // Format the new date as "MM.DD.YYYY"
        const newDateString = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}.${newDate.getDate().toString().padStart(2, '0')}.${newDate.getFullYear()}`;

        // Replace the date part of the URL and navigate to the updated URL
        const updatedUrl = currentUrl.replace(dateMatch[0], `/date/${newDateString}`);
        window.location.href = updatedUrl;
    }

    function changeIndex() {
        fetch("/date-button")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // assuming the server sends JSON
            })
            .then(data => {
                console.log("Successfully updated currentIndex", data);
                // You can also update the UI or perform other actions as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Get references to the button and post-form elements
    const createPostButton = document.getElementById('create-post-button');
    const postForm = document.getElementById('post-form');
    const backdrop = document.getElementById('backdrop')

    // Add a click event listener to the button
    createPostButton.addEventListener('click', () => {
    // Toggle the "hidden" class on the post-form to show/hide it
    postForm.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
    var submitButton = document.getElementById("submit")
    submitButton.addEventListener('click', submitListener)        //This might have to be submitButton[0]
    var cancelButton = document.getElementById("cancel")
    cancelButton.addEventListener('click', cancelListener)
    console.log("posted")

    });


    function submitListener(event) {
        event.preventDefault(); //stops the url from going wacky?

        var dateInput = document.getElementById("date")
        var titleInput = document.getElementById("title")
        var urlInput = document.getElementById("url")
        var authorInput = document.getElementById("author")
        var captionInput = document.getElementById("caption")

        var date = dateInput.value;
        var title = titleInput.value;
        var url = urlInput.value;
        var author = authorInput.value;
        var caption = captionInput.value;
        

        if(date.length == 0 || title.length == 0 || url.length == 0 || author.length == 0) {
            alert("Fill out all of the required fields!")
        }
        else {
            //send over the stuff so it can get console.logged
            fetch('/add-post', {
                method: 'POST',
                body: JSON.stringify({ date, title, author, url, caption }),
                headers: {
                'Content-Type': 'application/json',
                },
            });
            postForm.classList.toggle('hidden');
            backdrop.classList.toggle('hidden');

            dateInput.value = ""
            titleInput.value = ""
            urlInput.value = ""
            authorInput.value = ""
            captionInput.value = ""
        }

    }

    function cancelListener(event) {
        event.preventDefault(); //stops the url from going wacky?   

        var dateInput = document.getElementById("date")
        var titleInput = document.getElementById("title")
        var urlInput = document.getElementById("url")
        var authorInput = document.getElementById("author")
        var captionInput = document.getElementById("caption")

        dateInput.value = ""
        titleInput.value = ""
        urlInput.value = ""
        authorInput.value = ""
        captionInput.value = ""

        postForm.classList.toggle('hidden');
        backdrop.classList.toggle('hidden');
    }

/*
    var inputText = document.getElementById("twit-text-input")
    console.log("== inputText.value:", inputText.value)
    console.log("== inputText.value.length:", inputText.value.length)
    var authorName = document.getElementById("twit-attribution-input")
    console.log("== authorName.value:", authorName.value)
    console.log("== authorName.value.length:", authorName.value.length)
    if (authorName.value.length == 0 || inputText.value.length == 0) {
        alert("Enter text in both the author and text boxes!")
    }
    else {
        //Hiding things after creating twit
        createTwit(inputText.value, authorName.value)
        var inputText = document.getElementById("twit-text-input")
        var authorName = document.getElementById("twit-attribution-input")
        authorName.value = ''
        inputText.value = ''
        //This clears fields
        var backdrop = document.getElementById('modal-backdrop')
        console.log(" - backdrop:", backdrop)
        backdrop.classList.toggle('hidden')
        var modal = document.getElementById('create-twit-modal')
        console.log(" -modal:", backdrop)
        modal.classList.toggle('hidden')
    }
*/

});


