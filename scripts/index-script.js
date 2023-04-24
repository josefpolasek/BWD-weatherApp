const types = {
  Air_pres_1: "Air pressure",
  DHT11_hum_1: "Humidity",
  humidity_in: "Humidity in",
  humidity_out: "Humidity out",
  BMP_temp_1: "Temperature",
  DHT11_temp_1: "Temperature",
  DS1820_temp_1: "Temperature",
  temperature: "Temperature",
  wind_direction: "Wind direction",
  wind_speed: "Wind speed",
  "Balls Tuulen nopeus": "Wind speed",
  "Amogus tuulen suunta": "Wind speed",
  wind_speed: "Wind speed",
  light: "Light",
  rain: "Rain",
};

fetch("https://webapi19sa-1.course.tamk.cloud/v1/weather")
  .then((response) => response.json())
  .then((data) => {
    const measurements = data; // we want number 30 to be the latest measurement
    const tableBody = document.getElementById("measurements-table-body");

    let new_data = []; // only the last 30 measurements

    let counter = 0;
    measurements.forEach((measurement) => {
      console.log(Object.keys(measurement.data));

      if (types[Object.keys(measurement.data)] !== undefined && counter < 30) {
        new_data.push(measurement);
        counter += 1;
      }
    });

    new_data.reverse();
    let row_number = 1;
    new_data.forEach((measurement) => {
      console.log(measurement);

      if (types[Object.keys(measurement.data)] == undefined) {
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
        <td>${types[Object.keys(measurement.data)]}</td>
        <td>${(+Object.values(measurement.data)).toFixed(2)}</td>

      `;

      row_number += 1;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
