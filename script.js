const examData = [
    {
        "center": "UGCS LAB 4A",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT201",
        "paperTitle": "PROGRAMMING I",
        "idRangeStart": 11253205,
        "idRangeEnd": 22036410,
        "date": "March 30, 2025",
        "day": "Sunday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "studentsAllocated": 30,
        "location": {
            "latitude": 5.6475321,
            "longitude": -0.1869869,
            "name": "UGCS Lab 4A, University of Ghana",
            "address": "UGCS Lab 4A, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/78vKWL8A9ZsZz8qB9"
        }
    },
    {
        "center": "UGCS LAB 4B",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT201",
        "paperTitle": "PROGRAMMING I",
        "idRangeStart": 22036904,
        "idRangeEnd": 22102174,
        "date": "March 30, 2025",
        "day": "Sunday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "studentsAllocated": 30,
        "location": {
            "latitude": 5.6476541,
            "longitude": -0.1871234,
            "name": "UGCS Lab 4B, University of Ghana",
            "address": "UGCS Lab 4B, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/nZxHBKkdfUUjVmst7"
        }
    },
    {
        "center": "AKUAFO HALL LAB",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT201",
        "paperTitle": "PROGRAMMING I",
        "idRangeStart": 22102729,
        "idRangeEnd": 22187603,
        "date": "March 30, 2025",
        "day": "Sunday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "studentsAllocated": 20,
        "location": {
            "latitude": 5.6481234,
            "longitude": -0.1858672,
            "name": "Akuafo Hall, University of Ghana",
            "address": "Akuafo Hall, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/WHJwwaGE5UzrmfLf6"
        }
    },
    {
        "center": "GEOGRAPHY & RES. DEV. DEPT LAB 1",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT201",
        "paperTitle": "PROGRAMMING I",
        "idRangeStart": 22187752,
        "idRangeEnd": 22243375,
        "date": "March 30, 2025",
        "day": "Sunday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "studentsAllocated": 20,
        "location": {
            "latitude": 5.6470876,
            "longitude": -0.1867754,
            "name": "Geography & Resource Development Department, University of Ghana",
            "address": "Geography & Resource Development Department, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/NoqCyZPDKDxMPWVA7"
        }
    },
    {
        "center": "COE - SCDE COMPUTER LAB",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT201",
        "paperTitle": "PROGRAMMING I",
        "idRangeStart": 22243673,
        "idRangeEnd": 22261297,
        "date": "March 30, 2025",
        "day": "Sunday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "studentsAllocated": 18,
        "location": {
            "latitude": 5.6478123,
            "longitude": -0.1864432,
            "name": "College of Education SCDE Computer Lab, University of Ghana",
            "address": "College of Education SCDE Computer Lab, University of Ghana, Legon, Accra, Ghana",
            "googleMapsLink": "https://maps.app.goo.gl/R2t24X3Q9HVkDWuV6"
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

// Optional: Add a click event to show/hide map links
document.addEventListener('click', function(event) {
    // Close any open map links dropdowns
    const openDropdowns = document.querySelectorAll('.map-links.show');
    openDropdowns.forEach(dropdown => {
        if (dropdown !== event.target.nextElementSibling) {
            dropdown.classList.remove('show');
        }
    });

    // Toggle clicked dropdown
    if (event.target.classList.contains('exam-hall-dropdown')) {
        const mapLinks = event.target.querySelector('.map-links');
        mapLinks.classList.toggle('show');
    }
});
