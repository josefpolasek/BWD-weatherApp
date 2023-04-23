fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
  .then((response) => response.json())
  .then((data) => {
    const measurements = data.slice(0,400).reverse(); // we want number 30 to be the latest measurement
    const tableBody = document.getElementById("winddirection-table-body");

    let row_number = 1;
    measurements.forEach((measurement) => {
      console.log(Object.keys(measurement.data));

      // we want 20 measurements of wind direction
      if (
        Object.keys(measurement.data) != "wind_direction" ||
        row_number > 20
      ) {
        return;
      }

      let date = new Date(measurement.date_time);
      // console.log(date);

      const hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      const row = document.createElement("tr");

      // getMonth() returns 0-11, so we add 1 to get 1-12
      row.innerHTML = `
          <td>${row_number}</td>
          <td>${date.getDate()}. ${
        date.getMonth() + 1
      }. ${date.getFullYear()}</td>
          <td>${hours}:${minutes}:${seconds}</td>
          <td>${(+Object.values(measurement.data)).toFixed(2)}</td>
  
        `;

      row_number += 1;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));