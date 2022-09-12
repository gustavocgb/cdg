// variables html
let logsText = document.getElementById('logs')
let containerLogs = document.querySelector('#containerLogs')
let section = document.querySelector('section')
let initialSectionHeight = section.offsetHeight
let spinner = document.querySelector('#spinner')
let selection = document.querySelector('select')
let returnDate = document.querySelector('h4#date-title')

// global variables
let date = new Date();
let dateSelected = new Date(date).toISOString().split("T")[0];
let daysInterval = 7;

// spinner
spinner.setAttribute('style', 'display: inline;')

// events
selection.addEventListener("change", (event) => {
  dateSelected = event.target.value;
  search(dateSelected);

  returnDate.innerText = selection.options[selection.selectedIndex].value;
})

document.getElementById("btn-trace-download")
      .addEventListener("click", async function() {
        download();
      }, false);

// scripts
const search = async function (date) {
  try {
    const get = await fetch(`/log/error?date=${date}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'text/plain'
      }
    })

    logsText.innerText = await get.text();
    if (containerLogs.offsetHeight > section.offsetHeight) section.style.height = '100%';
    if (containerLogs.offsetHeight < initialSectionHeight) section.style.height = '100vh';
    spinner.setAttribute('style', 'display: none;');

    return logsText.innerText;

  } catch (err) {
    console.error(err);
    spinner.setAttribute('style', 'display: none;');

    // alert("Bad request.");
  }

  return console.log("Could not get any logs.");
}

const update = async function () {
  var dateSelect = document.getElementById("date");
  var dates = new Array();


  for (let i = 0; i <= daysInterval - 2; i++) {
    var option = document.createElement("option");

    dates.push(new Date(date).toISOString().split("T")[0]);

    option.value = dates[i];
    option.innerHTML = dates[i];

    dateSelect.appendChild(option);
    date.setDate(date.getDate() - 1);
  }
}

const download = async function () {
  var element = document.createElement("a");

  const selectedValue = document.getElementById("date");

  var fileName = `sgm-out-${dateSelected}.log`;

  element.setAttribute("href", `/log/error?date=${dateSelected}`);
  element.setAttribute("download", fileName);
  element.click();
}

const initial = async function () {
  await search(dateSelected);
  await update();
}

// call
initial()

setInterval(async() => {
  await search(dateSelected);
}, 2000)
