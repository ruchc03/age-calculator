document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#datePicker", {
        dateFormat: "Y-m-d",
        maxDate: new Date().toISOString().split("T")[0]  // Set maximum date as today
    });

    document.getElementById('calculate-btn').addEventListener('click', function (event) {
        event.preventDefault();

        const birthdateValue = document.getElementById('datePicker').value;
        if (!birthdateValue) {
            document.getElementById('words-output').innerText = 'Please select a date.';
            return;
        }

        const birthdate = new Date(birthdateValue);
        const today = new Date();
        const age = getDetailedAge(birthdate, today);

        document.getElementById('words-output').innerHTML = `
          Your Exact Age :<br>
          = ${age.years} years ${age.months} months ${age.days} days ${age.hours} hours ${age.seconds} seconds<br>
          = ${age.months * 12 + age.years} months ${age.days} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          = ${Math.floor(age.totalDays / 7)} weeks ${age.totalDays % 7} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          = ${age.totalDays} days ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          <br>
          ≈ ${age.hours} hours ${age.minutes} minutes ${age.seconds} seconds<br>
          ≈ ${age.minutes * 60 + age.seconds} seconds<br>
          ≈ ${age.seconds} seconds
      `;
    });

    function getDetailedAge(birthdate, today) {
        const diffTime = today.getTime() - birthdate.getTime();
        const diffSeconds = Math.floor(diffTime / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const weeks = Math.floor(((diffDays % 365) % 30) / 7);
        const days = ((diffDays % 365) % 30) % 7;
        const hours = diffHours % 24;
        const minutes = diffMinutes % 60;
        const seconds = diffSeconds % 60;

        return {
            years: years,
            months: months,
            weeks: weeks,
            days: days,
            totalDays: diffDays,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
});
