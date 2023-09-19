(async () => {
  const URL = "/api/v1/data";

  const getData = async () => {
    try {
      const resp = await fetch(URL);
      const { data } = await resp.json();
      // console.log({ URL });
      // console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const tabel_Data = await getData();

  // console.log(tabel_Data);

  const tableElement = document.getElementById("Data_Table");
  tableElement.innerHTML = `<ul class="text-zinc-400 table_row bg-transparent">
      <li>#</li>
      <li>Platform</li>
      <li>Last Traded Price</li>
      <li>Buy / Sell Price</li>
      <li>Difference</li>
      <li>Savings</li>
    </ul>`;

  let Total_Last_trade = 0;

  // Assuming tabel_Data is an array of objects with the data you want to display
  tabel_Data.forEach((item, index) => {
    // Create a new row for each item in the data
    const row = document.createElement("ul");
    row.classList.add("table_row");
    row.innerHTML = `
        <li>${index + 1}</li>
        <a href='/public/index.html'>${item.name}</a>
        <li>₹ ${item.last}</li>
        <li>₹ ${item.buy} / ₹ ${item.sell}</li>
        <li class='${
          ((item.sell - item.buy) / item.last).toFixed(2) < 0.05
            ? "text-red-400"
            : "text-[#5dc7c2ff]"
        }' >${((item.sell - item.buy) / item.last).toFixed(2)} %</li>
        <li class=' flex justify-center items-center ${
          Math.trunc(item.sell - item.buy) < 500
            ? "text-red-400"
            : "text-[#5dc7c2ff]"
        }' >
        ${
          Math.trunc(item.sell - item.buy) < 500
            ? "<img src='/assets/down.png' alt='down' />"
            : "<img src='/assets/up.png' alt='up' />"
        }
        
        ₹ ${Math.trunc(item.sell - item.buy)}</li>
      `;
    tableElement.appendChild(row);

    Total_Last_trade = Total_Last_trade + parseInt(item.last);
  });

  // console.log({ Total_Last_trade });

  const numberString = Math.trunc(Total_Last_trade / 10).toString();
  const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  document.getElementById(
    "Avg_Trade_Number"
  ).innerText = `₹ ${formattedNumber}`;

  const timerElement = document.getElementById("timer");
  let count = 0;

  function updateTimer() {
    if (count <= 60) {
      timerElement.textContent = count;
      count++;
    } else {
      clearInterval(interval);
    }
  }

  const interval = setInterval(updateTimer, 1000);

  let ON = document.getElementById("ON");
  let OFF = document.getElementById("OFF");

  ON.addEventListener("click", function () {
    if (!ON.classList.contains("active")) {
      ON.classList.add("active");
      OFF.classList.remove("active");
    }

    let theme = localStorage.getItem("theme");

    if (!theme || theme === "light") {
      localStorage.setItem("theme", "dark");
      document.getElementsByTagName("body")[0].classList.add("darkTheme");
      theme = localStorage.getItem("theme");
    }

    console.log({ theme });
  });

  OFF.addEventListener("click", function () {
    if (!OFF.classList.contains("active")) {
      OFF.classList.add("active");
      ON.classList.remove("active");
    }

    let theme = localStorage.getItem("theme");

    if (!theme || theme === "dark") {
      localStorage.setItem("theme", "light");
      document.getElementsByTagName("body")[0].classList.remove("darkTheme");
      theme = localStorage.getItem("theme");
    }

    console.log({ theme });
  });
})();
