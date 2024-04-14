document.addEventListener('DOMContentLoaded', function () {
    // Utility function to fetch data from the server
    async function fetchData(url, method = 'GET', body = null) {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null; // Return null in case of error
        }
    }

    // Function to handle button 1 click
    document.getElementById('button1').addEventListener('click', function () {
        // Get the value from the input text box
        const inputValue = document.getElementById('inputElement').value;

        // Clear the content div
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';

        // Create a new message
        const message = document.createElement('h1');
        message.textContent = inputValue + ' 000895164'; // Append ' 000895164' to the input value
        message.style.textAlign = 'center';
        // Append the message to the content div
        contentDiv.appendChild(message);
        
    });
   
    // Function to handle button 2 click
    document.getElementById('button2').addEventListener('click', async function () {
        const inputElementValue = document.getElementById('inputElement').value;
        if (inputElementValue !== 'mario' && inputElementValue !== 'starwars') {
            console.error('Invalid input value for Button 2.');
            displayErrorMessage('Invalid input value for Button 2.');
            return;
        }
        const response = await fetchData(`https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=${inputElementValue}`);
        if (response !== null) {
            displayData(response, 'content');
            document.getElementById('inputElement').disabled = true;
        } else {
            displayErrorMessage('Error fetching data for Button 2.');
        }
    });

    // Function to handle button 3 click
    document.getElementById('button3').addEventListener('click', async function () {
        const inputElementValue = document.getElementById('inputElement').value;
        if (inputElementValue !== 'mario' && inputElementValue !== 'starwars') {
            console.error('Invalid input value for Button 3.');
            displayErrorMessage('Invalid input value for Button 3.');
            return;
        }
        const response = await fetchData('https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php', 'POST', `choice=${inputElementValue}`);
        if (response !== null) {
            displayTable(response, 'content');
            document.getElementById('inputElement').disabled = true;
        } else {
            displayErrorMessage('Error fetching data for Button 3.');
        }
    });

    // Function to display error message
    function displayErrorMessage(message) {
        const errorContainer = document.getElementById('error');
        errorContainer.textContent = message;
        errorContainer.style.color = 'red';
    }

    // Function to display data for Button 2
    function displayData(data, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'col-sm-4'; // Bootstrap column size for responsive layout
            const h2 = document.createElement('h2');
            h2.textContent = item.series;
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.name;
            const p = document.createElement('p');
            p.textContent = item.name;
            div.appendChild(h2);
            div.appendChild(img);
            div.appendChild(p);
            container.appendChild(div);
        });
        updateCopyrightNotice(containerId);
    }

    // Function to display data for Button 3 in a table
    function displayTable(data, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'table'; // Bootstrap table class for styling
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');
        for (const key in data[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
    }

    // Function to update the copyright notice
    function updateCopyrightNotice(containerId) {
        const copyrightNotice = document.getElementById('copyrightNotice');
        copyrightNotice.innerHTML = '';
        const notice = document.createElement('p');
        notice.textContent = containerId === 'content' ?
            'Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. © 2019 Nintendo.' :
            'Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.';
        copyrightNotice.appendChild(notice);
    }
});