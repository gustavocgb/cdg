// variables html
let logsText = document.getElementById('logs')
let containerLogs = document.querySelector('#containerLogs')
let section = document.querySelector('section')
let initialSectionHeight = section.offsetHeight
let spinner = document.querySelector('#spinner')
// global variables
let date = new Date();
let dateSelected = new Date(date).toISOString().split("T")[0];

// spinner
spinner.setAttribute('style', 'display: inline;')

document.getElementById("btn-trace-download")
      .addEventListener("click", async function() {
        download();
      }, false);

// scripts
const search = async function (date) {
  try {
    const get = await fetch(`/log/logs?date=${date}`, {
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

    alert("Bad request.");
  }

  return console.log("Could not get any logs.");
}

const download = async function () {
  var element = document.createElement("a");

  var fileName = `sgm-out-${dateSelected}.log`;

  element.setAttribute("href", `/log/logs?date=${dateSelected}`);
  element.setAttribute("download", fileName);
  element.click();
}

const initial = async function () {
  await search(dateSelected);
}

// call
initial()

setInterval(async() => {
  await search(dateSelected);
}, 2000)
