// variables html
let spinner = document.querySelector('#spinner')
let tableHeadRow = document.querySelector('#tableHeadRow')
let tableBody = document.querySelector('#tableBody')
let containerApi = document.querySelector('#containerApi')
let section = document.querySelector('section')
let initialSectionHeight = section.offsetHeight


// filter head
let headTable = [
    {
        text: 'Api',
        id: 'api'
    },{
        text: 'Total de chaves',
        id: 'totalKey'
    },{
        text: 'Chaves ativadas',
        id: 'activatedKey'
    },{
        text: 'Chaves em uso',
        id: 'usedKey'
    },{
        text: '',
        id: 'action'
    }
]

const search = async function () {
    // display spinner on
    spinner.setAttribute('style', 'display: inline;')
    try {
        const resp = await fetch('/keygeoservice', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        })
        let respJson = await resp.json()
        if (resp.status === 200) {
            // display spinner off
            spinner.setAttribute('style', 'display: none;')
            // clear table
            tableHeadRow.textContent = ''
            tableBody.textContent = ''
            // create table head
            createTableHead()
            // sort name api
            respJson.body.sort((a,b) => (sortGeoApiId(a,b)))
            // separete of api
            const apiArray = groupByGeoapiId(respJson.body);
            // create table body
            apiArray.forEach(api => {
                createTableRows(api)
            })
            if (containerApi.offsetHeight > section.offsetHeight) section.style.height = '100%';
            if (containerApi.offsetHeight < initialSectionHeight) section.style.height = '100vh';
        } else {
            // display spinner off
            spinner.setAttribute('style', 'display: none;')
            alert('Error: '+respJson.error.code)
        }
    } catch (err) {
        console.error(err)
        // display spinner off
        spinner.setAttribute('style', 'display: none;')
        alert('Bad request.')
    }
}
search()

function createTableHead() {
    headTable.forEach(row => {
        let th = document.createElement('th')
        th.scope = 'col'
        th.innerText = `${row.text}`
        tableHeadRow.appendChild(th)
    })
}

function createTableRows(api) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");

    // api name
    th.innerText = `${api[0].geoServiceId}`;
    th.className = "h6";
    tr.appendChild(th);

    // total keys
    td.innerText = `${api.length}`;
    tr.appendChild(td);

    // total key activated
    td = document.createElement("td");
    td.innerText = `${api.filter((item) => item.isActivated).length}`;
    tr.appendChild(td);

    // total key in use
    td = document.createElement("td");
    td.innerText = `${api.filter((item) => (item.isGeocoding && item.isActivated)).length}`;
    tr.appendChild(td);

    let actionButtons = goToPageViewApi(api[0].geoServiceId);
    td = document.createElement("td");
    td.appendChild(actionButtons);
    tr.appendChild(td);

    tableBody.appendChild(tr);
}

function sortGeoApiId(a,b){
    return a.geoServiceId < b.geoServiceId ? -1 : a.geoServiceId > b.geoServiceId ? 1 : 0
}

function groupByGeoapiId(array) {
    let grouped = {};
    array.forEach(function (item) {
        grouped[item.geoServiceId] = grouped[item.geoServiceId] || [];
        grouped[item.geoServiceId].push(item);
    });
    return Object.keys(grouped).map(function (key) {
        return grouped[key];
    });
}

function goToPageViewApi(apiName) {
    let actionDiv = document.createElement("div");
    actionDiv.className = "btn-group";

    let viewButton = document.createElement("a");
    viewButton.className = "btn btn-sm btn-primary fa fa-search";
    viewButton.href = "/pages/geoapis/view/index.html?api=" + apiName;

    actionDiv.appendChild(viewButton);

    return actionDiv;
}

