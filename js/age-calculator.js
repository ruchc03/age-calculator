document.addEventListener('DOMContentLoaded', function () {
    const picker = new Pikaday({
        field: document.getElementById('datePicker'),
        format: 'YYYY-MM-DD',
        yearRange: [1900, new Date().getFullYear()]
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
          = ${age.years} years ${age.months} months ${age.days} days<br>
          = ${age.totalMonths} months ${age.days} days<br>
          = ${age.weeks} weeks and ${age.weekDays} days<br>
          = ${age.totalDays} days<br>
          <br>
          ≈ ${age.hours} hours<br>
          ≈ ${age.minutes} minutes<br>
          ≈ ${age.seconds} seconds
      `;
    });
});

function getDetailedAge(birthdate, today) {
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        let previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalDays = Math.floor((today -
