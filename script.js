const examData = [
    {
        "center": "BALME - KNOWLEDGE COMMONS",
        "time": "4:30 P.M - 5:30 PM",
        "level": "LEVEL 200",
        "courseCode": "DCIT209",
        "paperTitle": "E-BUSINESS ARCHITECTURES",
        "idRangeStart": 10953391,
        "idRangeEnd": 22238344,
        "date": "April 5, 2025",
        "day": "Saturday",
        "session": "AFTERNOON SESSION 4:30 P.M - 5:30 PM",
        "studentsAllocated": 104,
        "location": {
            "latitude": 5.6507,
            "longitude": -0.1863,
            "name": "Balme Library Knowledge Commons, University of Ghana",
            "address": "Balme Library, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/jTMnKHo7ehVUsTz87"
        }
    },
    {
        "center": "BALME - IAC TRAINING LAB",
        "time": "4:30 P.M - 5:30 PM",
        "level": "LEVEL 200",
        "courseCode": "DCIT209",
        "paperTitle": "E-BUSINESS ARCHITECTURES",
        "idRangeStart": 22238895,
        "idRangeEnd": 22261297,
        "date": "April 5, 2025",
        "day": "Saturday",
        "session": "AFTERNOON SESSION 4:30 P.M - 5:30 PM",
        "studentsAllocated": 25,
        "location": {
            "latitude": 5.6505,
            "longitude": -0.1865,
            "name": "Balme Library IAC Training Lab, University of Ghana",
            "address": "Balme Library, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/jTMnKHo7ehVUsTz87"
        }
    }
];

function createMapLinks(location) {
    return {
        googleMaps: location.googleMapsLink || `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
        googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`,
        openStreetMap: `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=19/${location.latitude}/${location.longitude}`,
        appleMap: `https://maps.apple.com/?ll=${location.latitude},${location.longitude}&q=${encodeURIComponent(location.name)}`
    };
}

function findSchedule() {
    const studentId = parseInt(document.getElementById('studentId').value.trim());
    const scheduleDisplay = document.getElementById('scheduleDisplay');

    // Reset display
    scheduleDisplay.innerHTML = '';
    scheduleDisplay.classList.remove('visible');

    if (isNaN(studentId)) {
        // Handle invalid input
        scheduleDisplay.innerHTML = `
                    <div class="no-results">
                        <h3>Invalid Student ID</h3>
                        <p>Please enter a valid numeric Student ID.</p>
                        <p>Example: 22144124</p>
                    </div>
                `;
        scheduleDisplay.classList.add('visible');
        return;
    }

    // Find matching exams
    const matchingExams = examData.filter(exam =>
        studentId >= exam.idRangeStart && studentId <= exam.idRangeEnd
    );

    // Short delay to allow for animation
    setTimeout(() => {
        if (matchingExams.length > 0) {
            let scheduleHTML = '';

            matchingExams.forEach(exam => {
                // Create map links
                const mapLinks = createMapLinks(exam.location);

                scheduleHTML += `
                            <div class="exam-card">
                                <div class="exam-card-header">
                                    <div class="exam-date">${exam.day}, ${exam.date}</div>
                                    <div class="exam-session">${exam.session}</div>
                                </div>

                                <div class="paper-title">${exam.paperTitle}</div>

                                <div class="exam-details">
                                    <div class="detail-group">
                                        <div class="detail-label">Course Code</div>
                                        <div class="detail-value">${exam.courseCode}</div>
                                    </div>

                                    <div class="detail-group">
                                        <div class="detail-label">Level</div>
                                        <div class="detail-value">${exam.level}</div>
                                    </div>

                                    <div class="detail-group">
                                        <div class="detail-label">Exam Hall</div>
                                        <div class="detail-value exam-hall-dropdown">
                                            ${exam.center}
                                            <div class="map-links">
                                                <button onclick="window.open('${mapLinks.googleMaps}', '_blank')">Google Maps</button>
                                                <button onclick="window.open('${mapLinks.googleDirections}', '_blank')">Directions</button>
                                                <button onclick="window.open('${mapLinks.openStreetMap}', '_blank')">OpenStreetMap</button>
                                                <button onclick="window.open('${mapLinks.appleMap}', '_blank')">Apple Maps</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="detail-group">
                                        <div class="detail-label">Time</div>
                                        <div class="detail-value">${exam.time}</div>
                                    </div>

                                    <div class="detail-group">
                                        <div class="detail-label">Students Allocated</div>
                                        <div class="detail-value">${exam.studentsAllocated}</div>
                                    </div>

                                    <div class="id-range">
                                        Your ID <span class="id-highlight">${studentId}</span> falls within range: ${exam.idRangeStart} - ${exam.idRangeEnd}
                                    </div>
                                </div>
                            </div>
                        `;
            });

            scheduleDisplay.innerHTML = scheduleHTML;
        } else {
            // No results found
            scheduleDisplay.innerHTML = `
                        <div class="no-results">
                            <h3>No Exams Found</h3>
                            <p>No exams found for Student ID: ${studentId}</p>
                            <p>Please check your ID and try again.</p>
                            <p>Valid ID ranges for DCIT209: 10953391-22238344 or 22238895-22261297</p>
                        </div>
                    `;
        }

        // Make the display visible (for animation)
        scheduleDisplay.classList.add('visible');
    }, 300);
}

// Add event listener for Enter key
document.getElementById('studentId').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        findSchedule();
    }
});

// Close dropdowns when clicking elsewhere
document.addEventListener('click', function(event) {
    if (!event.target.classList.contains('exam-hall-dropdown') &&
        !event.target.closest('.map-links')) {
        const openDropdowns = document.querySelectorAll('.map-links.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Toggle clicked dropdown
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('exam-hall-dropdown')) {
        const mapLinks = event.target.querySelector('.map-links');
        mapLinks.classList.toggle('show');
    }
});