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

    const dateList = ['10.01.2022', '10.02.2022', '10.03.2022', '10.04.2022', '10.05.2022', '10.06.2022', '10.07.2022', '10.08.2022', '10.09.2022', '10.10.2022', '10.11.2022', '10.12.2022', '10.13.2022', '10.14.2022', '10.15.2022', '10.16.2022', '10.17.2022', '10.18.2022', '10.19.2022', '10.20.2022', '10.21.2022', '10.22.2022', '10.23.2022', '10.24.2022', '10.25.2022', '10.26.2022', '10.27.2022', '10.28.2022', '10.29.2022', '10.30.2022', '10.31.2022', '10.01.2023', '10.02.2023', '10.03.2023', '10.04.2023', '10.05.2023', '10.06.2023', '10.07.2023', '10.08.2023']
    
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



});


