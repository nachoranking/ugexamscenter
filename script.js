const examData = [];

function findSchedule() {
    const studentIdInput = document.getElementById('studentId');
    const studentId = parseInt(studentIdInput.value.trim());
    const scheduleDisplay = document.getElementById('scheduleDisplay');

    scheduleDisplay.innerHTML = '';
    scheduleDisplay.classList.remove('visible');

    if (!studentIdInput.value.trim()) {
        scheduleDisplay.innerHTML = `
            <div class="no-results">
                <h3>Invalid Input</h3>
                <p>Please enter your Student ID.</p>
            </div>
        `;
        scheduleDisplay.classList.add('visible');
        return;
    }

    if (isNaN(studentId) || studentId < 11253205 || studentId > 22261297) {
        scheduleDisplay.innerHTML = `
            <div class="no-results">
                <h3>Invalid Student ID</h3>
                <p>Please enter a valid Student ID within the range 11253205 - 22261297.</p>
            </div>
        `;
        scheduleDisplay.classList.add('visible');
        return;
    }

    scheduleDisplay.innerHTML = `
        <div class="no-results">
            <h3>No exams schedule at the moment.</h3>
            <p>Schedule will be available before 29th March 2024.</p>
            <h4> Upcomming Exams </h4>
              <p>DCIT 201 - 30th March 2025</p>
              <p>DCIT 209 - 5th April 2025</p>
        </div>
    `;

    scheduleDisplay.classList.add('visible');
}

document.getElementById('studentId').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        findSchedule();
    }
});
