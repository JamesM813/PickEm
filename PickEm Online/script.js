class Person {
    constructor(name, pointValue, teamsRemaining) {
        this.name = name;
        this.pointValue = pointValue;
        this.teamsRemaining = teamsRemaining;
    }

    removeTeam(stringToRemove) {
        try {
            const index = this.teamsRemaining.indexOf(stringToRemove);
            if (index !== -1) {
                this.teamsRemaining.splice(index, 1);
                console.log(`Team "${stringToRemove}" removed from ${this.name}'s teams.`);
            } else {
                console.log(`Team "${stringToRemove}" is not in ${this.name}'s teams.`);
            }
        } catch (error) {
            console.error(`Error removing team from ${this.name}: ${error}`);
        }
        this.saveToFile();
    }

    addPoint() {
        this.pointValue++;
        this.saveToFile();
    }

    hasTeam(team) {
        if (this.teamsRemaining.includes(team)) {
            console.log("The " + team + " are still available for the selected player");
        } else {
            console.log("The " + team + " have already been used previously");
        }
    }

    remainingTeams() {
        for (const team of this.teamsRemaining) {
            console.log(team + " ");
        }
        console.log(" for a total of " + this.teamsRemaining.length + " teams remaining.");
    }

    getPointValue() {
        return this.pointValue;
    }

    getName() {
        return this.name;
    }

    saveToFile() {
        try {
            console.log('Simulating save to file...');
            // Simulated save to file using console.log
        } catch (error) {
            console.error(`Error updating data.json: ${error}`);
        }
    }
}

const peopleData = [
    {
        "name": "Jake",
        "pointValue": 4,
        "teamsRemaining": [
            "Dolphins",
            "Patriots",
            "Jets",
            "Bills",
            "Ravens",
            "Browns",
            "Steelers",
            "Texans",
            "Colts",
            "Chargers",
            "Raiders",
            "Cowboys",
            "Giants",
            "Lions",
            "Vikings",
            "Packers",
            "Bears",
            "Buccaneers",
            "Falcons",
            "Panthers",
            "49ers",
            "Seahawks"
        ]
    },
    {
        "name": "James",
        "pointValue": 6,
        "teamsRemaining": [
            "Dolphins",
            "Patriots",
            "Jets",
            "Steelers",
            "Jaguars",
            "Texans",
            "Colts",
            "Titans",
            "Chiefs",
            "Chargers",
            "Raiders",
            "Giants",
            "Lions",
            "Vikings",
            "Packers",
            "Bears",
            "Saints",
            "Buccaneers",
            "Falcons",
            "Panthers",
            "49ers",
            "Rams",
            "Cardinals"
        ]
    },
    {
        "name": "Joe",
        "pointValue": 7,
        "teamsRemaining": [
            "Patriots",
            "Jets",
            "Bills",
            "Steelers",
            "Jaguars",
            "Texans",
            "Titans",
            "Chiefs",
            "Chargers",
            "Raiders",
            "Broncos",
            "Eagles",
            "Cowboys",
            "Commanders",
            "Giants",
            "Packers",
            "Bears",
            "Saints",
            "Buccaneers",
            "Panthers",
            "49ers",
            "Seahawks",
            "Cardinals"
        ]
    },
    {
        "name": "Mason",
        "pointValue": 8,
        "teamsRemaining": [
            "Patriots",
            "Jets",
            "Bengals",
            "Steelers",
            "Texans",
            "Colts",
            "Titans",
            "Chiefs",
            "Chargers",
            "Raiders",
            "Broncos",
            "Eagles",
            "Commanders",
            "Vikings",
            "Packers",
            "Bears",
            "Saints",
            "Buccaneers",
            "Falcons",
            "Panthers",
            "Seahawks",
            "Rams",
            "Cardinals"
        ]
    },
    {
        "name": "Michelle",
        "pointValue": 6,
        "teamsRemaining": [
            "Patriots",
            "Jets",
            "Bengals",
            "Browns",
            "Steelers",
            "Jaguars",
            "Titans",
            "Chiefs",
            "Chargers",
            "Raiders",
            "Broncos",
            "Eagles",
            "Cowboys",
            "Commanders",
            "Giants",
            "Bears",
            "Saints",
            "Buccaneers",
            "Panthers",
            "49ers",
            "Seahawks",
            "Rams",
            "Cardinals"
        ]
    },
    {
        "name": "Mikey",
        "pointValue": 5,
        "teamsRemaining": [
            "Patriots",
            "Jets",
            "Bills",
            "Bengals",
            "Browns",
            "Jaguars",
            "Titans",
            "Chiefs",
            "Chargers",
            "Raiders",
            "Broncos",
            "Eagles",
            "Cowboys",
            "Commanders",
            "Giants",
            "Bears",
            "Saints",
            "Buccaneers",
            "Falcons",
            "Panthers",
            "49ers",
            "Seahawks",
            "Cardinals"
        ]
    }
]

let people = []; // Initialize an empty array to hold people data

function loadPeople() {
    console.log('Loading people...');
    people = peopleData.map(data => new Person(data.name, data.pointValue, data.teamsRemaining));
    console.log('People loaded:', people);
    initialize()
}

function findPerson(x) {
    const person = people.find(person => person.name === x);
    if (!person) {
        console.log("The person you are searching for is undefined.");
        throw new Error("Person not found");
    }
    return person;
}

function updateScores(a, b, c, d, e, f) {
    a.addPoint();
    b?.addPoint();
    c?.addPoint();
    d?.addPoint();
    e?.addPoint();
    f?.addPoint();
}

function createLeaderboard(people) {
    const sortedPeople = people.sort((a, b) => b.pointValue - a.pointValue);
    const leaderboardEntries = sortedPeople.map(
        (person, index) => `
          <div class="leaderboard-entry">
            <span>${index + 1}.</span>
            <span>${person.name}</span>
            <span>${person.pointValue} points</span>
            <button onclick="showTeams(${index})">Teams</button>
          </div>`
    );
    return leaderboardEntries.join('');
}

function showLeaderboard() {
    console.log('Creating leaderboard...');
    const leaderboardHTML = createLeaderboard(people);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<h2>Leaderboard</h2>${leaderboardHTML}`;
    console.log('Leaderboard created');
}

let currentTeamsDiv = null;

function showTeams(index) {
    const person = people[index];
    const outputDiv = document.getElementById('output');

    if (currentTeamsDiv) {
        outputDiv.removeChild(currentTeamsDiv);
        currentTeamsDiv = null;
    }

    const teamsDiv = document.createElement('div');
    teamsDiv.innerHTML = `<h3>${person.name}'s Remaining Teams:</h3><p>${person.teamsRemaining.join(', ')}</p>`;
    outputDiv.appendChild(teamsDiv);

    currentTeamsDiv = teamsDiv;
}

const sitePassword = "JustinTucker";

function removeTeam() {
    const passwordAttempt = prompt("Enter site password to remove team:");

    if (passwordAttempt === sitePassword) {
        const playerName = document.getElementById('playerName').value;
        const teamToRemove = document.getElementById('teamToRemove').value;

        if (!playerName || !teamToRemove) {
            alert("Please enter both player name and team to remove.");
            return;
        }

        try {
            const person = findPerson(playerName);
            person.removeTeam(teamToRemove);
            updatePeopleData(); // Update the JSON data
            showLeaderboard();
        } catch (error) {
            console.error('Error removing team:', error);
        }
    } else {
        alert("Incorrect password. Access denied.");
    }
    updatePeopleData();
}

function addPoint() {
    const passwordAttempt = prompt("Enter site password to add point:");

    if (passwordAttempt === sitePassword) {
        const playerName = document.getElementById('playerToAddPoint').value;

        if (!playerName) {
            alert("Please select a player.");
            return;
        }

        try {
            const person = findPerson(playerName);
            person.addPoint();
            updatePeopleData(); // Update the JSON data
            showLeaderboard();
        } catch (error) {
            console.error('Error adding point:', error);
        }
    } else {
        alert("Incorrect password. Access denied.");
    }
    updatePeopleData()
}

function updatePeopleData() {
    people.forEach((person, index) => {
        peopleData[index].pointValue = person.getPointValue();
        peopleData[index].teamsRemaining = person.teamsRemaining;
    });

    console.log("Updated JSON data:", peopleData);
    // Here, you might want to save the updated JSON data to a file or perform other actions as needed
}

function authenticate() {
    const passwordAttempt = document.getElementById('sitePassword').value;

    if (passwordAttempt === sitePassword) {
        // Authentication successful
        document.getElementById('authSection').style.display = 'none'; // Hide authentication section
        document.getElementById('removeTeamSection').style.display = 'block'; // Show Remove Team section
        document.getElementById('addPointSection').style.display = 'block'; // Show Add Point section
    } else {
        alert("Incorrect password. Access denied.");
    }
}

function populatePlayerDropdown() {
    console.log("Populating player dropdown...");
    const playerNameDropdown = document.getElementById('playerName');
    people.forEach(person => {
        const option = document.createElement('option');
        option.value = person.name;
        option.textContent = person.name;
        playerNameDropdown.appendChild(option);
    });
    
}

function updateTeamsDropdown(selectedPlayer) {
    const teamsDropdown = document.getElementById('teamToRemove');
    teamsDropdown.innerHTML = '';

    const player = findPerson(selectedPlayer);
    player.teamsRemaining.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamsDropdown.appendChild(option);
    });
}
function populatePlayerDropdownForAddingPoints() {
    const playerNameDropdown = document.getElementById('playerToAddPoint');
    people.forEach(person => {
        const option = document.createElement('option');
        option.value = person.name;
        option.textContent = person.name;
        playerNameDropdown.appendChild(option);
    });
}

function initialize() {
    populatePlayerDropdown();
    populatePlayerDropdownForAddingPoints();
    showLeaderboard();
}

document.addEventListener('DOMContentLoaded', function () {
    loadPeople();
    showLeaderboard();

    document.getElementById('playerName').addEventListener('change', function () {
        const selectedPlayer = this.value;
        updateTeamsDropdown(selectedPlayer);
        updatePeopleData(selectedPlayer)
    });
});