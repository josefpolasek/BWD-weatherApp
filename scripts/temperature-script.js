fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature")
  .then((response) => response.json())
  .then((data) => {
    const measurements = data.slice(0, 20); // they're in the correct order for temperature
    const tableBody = document.getElementById("temperature-table-body");

    let row_number = 1;

    measurements.forEach((measurement) => {
      const row = document.createElement("tr");
      console.log(measurement);

      let date = new Date(measurement.date_time);
      const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      row.innerHTML = `
          <td>${row_number}</td>
          <td>${date.getDate()}. ${date.getMonth()+1}. ${date.getFullYear()}</td>
          <td>${hours}:${minutes}:${seconds}</td>
          <td>${(+measurement.temperature).toFixed(2)}</td>

          `;

      row_number += 1;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
