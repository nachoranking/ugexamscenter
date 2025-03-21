// Exam schedule data from the provided images
const examData = [
    {
        "center": "GEOGRAPHY & RES. DEV. DEPT LAB 1",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT205",
        "paperTitle": "DATABASE FUNDAMENTALS",
        "idRangeStart": 11253205,
        "idRangeEnd": 22024353,
        "date": "March 22, 2025",
        "day": "Saturday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "GEOGRAPHY & RES. DEV. DEPT LAB 2",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT205",
        "paperTitle": "DATABASE FUNDAMENTALS",
        "idRangeStart": 22024381,
        "idRangeEnd": 22058073,
        "date": "March 22, 2025",
        "day": "Saturday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "UGCS LAB 4A",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT205",
        "paperTitle": "DATABASE FUNDAMENTALS",
        "idRangeStart": 22061250,
        "idRangeEnd": 22138805,
        "date": "March 22, 2025",
        "day": "Saturday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "UGCS LAB 4B",
        "time": "10:30 A.M - 11:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT205",
        "paperTitle": "DATABASE FUNDAMENTALS",
        "idRangeStart": 22144124,
        "idRangeEnd": 22243375,
        "date": "March 22, 2025",
        "day": "Saturday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "AKUAFO HALL LAB",
        "time": "7:30 A.M - 8:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT205",
        "paperTitle": "DATABASE FUNDAMENTALS",
        "idRangeStart": 22243673,
        "idRangeEnd": 22261297,
        "date": "March 22, 2025",
        "day": "Saturday",
        "session": "MID-MORNING SESSION 10:30 A.M - 11:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "BALME - KNOWLEDGE COMMONS",
        "time": "7:30 A.M - 8:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT207",
        "paperTitle": "COMPUTER ORGANIZATION & ARCHITECTURE",
        "idRangeStart": 11208277,
        "idRangeEnd": 22242517,
        "date": "March 23, 2025",
        "day": "Sunday",
        "session": "MORNING SESSION 7:30 A.M - 8:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    },
    {
        "center": "BALME - IAC TRAINING LAB",
        "time": "7:30 A.M - 8:30 A.M",
        "level": "LEVEL 200",
        "courseCode": "DCIT207",
        "paperTitle": "COMPUTER ORGANIZATION & ARCHITECTURE",
        "idRangeStart": 22243375,
        "idRangeEnd": 22261297,
        "date": "March 23, 2025",
        "day": "Sunday",
        "session": "MORNING SESSION 7:30 A.M - 8:30 A.M",
        "venue": "ACCRA LEARNING CENTRE"
    }
];

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

            // Sort by date
            matchingExams.sort((a, b) => new Date(a.date) - new Date(b.date));

            matchingExams.forEach(exam => {
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
                                        <div class="detail-value">${exam.center}</div>
                                    </div>

                                    <div class="detail-group">
                                        <div class="detail-label">Time</div>
                                        <div class="detail-value">${exam.time}</div>
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
                            <p>Valid ID range: 11253205 - 22261297</p>
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
