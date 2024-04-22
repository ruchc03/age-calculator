document.addEventListener('DOMContentLoaded', function () {
    let intervalId; // Variable to store the interval ID for updating the age
    const picker = flatpickr("#datePicker", {
        dateFormat: "Y-m-d",
        maxDate: new Date().toISOString().split("T")[0]  // Set maximum date as today
    });

    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', function () {
        if (intervalId) {
            clearInterval(intervalId); // Stop the update interval if it's already running
            calculateBtn.textContent = 'Calculate Age'; // Change button text back to "Calculate Age"
            intervalId = null;
        } else {
            updateAge(); // Calculate and display the age immediately
            intervalId = setInterval(updateAge, 1000); // Start updating the age every second
            calculateBtn.textContent = 'Stop Calculation'; // Change button text to "Stop Calculation"
        }
    });

    function updateAge() {
        const birthdateValue = picker.selectedDates[0];
        if (!birthdateValue) {
            document.getElementById('words-output').innerText = 'Please select a date.';
            return;
        }

        const birthdate = new Date(birthdateValue);
        const today = new Date();
        const age = getDetailedAge(birthdate, today);

        const totalSeconds = age.years * 365 * 24 * 60 * 60 + age.months * 30 * 24 * 60 * 60 + age.days * 24 * 60 * 60 + age.hours * 60 * 60 + age.minutes * 60 + age.seconds;
        const totalMinutes = totalSeconds / 60;
        const totalHours = totalMinutes / 60;

        document.getElementById('words-output').innerHTML = `
          Your Exact Age :<br>
          ≈ ${age.years} years ${age.months} months ${age.days} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          ≈ ${age.months * 12 + age.years} months ${age.days} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          ≈ ${Math.floor(age.totalDays / 7)} weeks ${age.totalDays % 7} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          ≈ ${age.totalDays} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          ≈ ${addCommas(Math.floor(totalHours))} hours ${addCommas(Math.floor(totalMinutes % 60))} minutes ${addCommas(Math.floor(totalSeconds % 60))} seconds<br>
          ≈ ${addCommas(Math.floor(totalMinutes))} minutes ${addCommas(Math.floor(totalSeconds % 60))} seconds<br>
          ≈ ${addCommas(Math.floor(totalSeconds))} seconds
        `;
    }

    function getDetailedAge(birthdate, today) {
        const diffTime = today.getTime() - birthdate.getTime();
        const diffSeconds = Math.floor(diffTime / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        const hours = diffHours % 24;
        const minutes = diffMinutes % 60;
        const seconds = diffSeconds % 60;

        return {
            years: years,
            months: months,
            days: days,
            totalDays: diffDays,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
