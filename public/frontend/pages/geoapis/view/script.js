// variables html
let section = document.querySelector('section')
let initialSectionHeight = section.offsetHeight
let containerApi = document.querySelector('#containerApi')
let spinner = document.querySelector('#spinner')
let tableHeadRow = document.querySelector('#tableHeadRow')
let tableBody = document.querySelector('#tableBody')
// get api from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const api = urlParams.get("api");

// filter rows
let titleRowsTable = [
    {
        text: "Chave",
        id: "key",
    },
    {
        text: "Url",
        id: "url",
    },
    {
        text: "Req. feitas",
        id: "requests",
    },
    {
        text: "Req. diárias",
        id: "maxRequestPerDay",
    },
    {
        text: "Data de validade diária",
        id: "date",
    },
    {
        text: "Está geocodificando",
        id: "isGeocoding",
    },
    {
        text: "Tem requisições",
        id: "isRequests",
    },
    {
        text: "Tem endereço disponível",
        id: "isAddress",
    },
    {
        text: "Está dentro da data",
        id: "isDate",
    },
    {
        text: "Data inicial",
        id: "initialDate",
    },
    {
        text: "ID endereço atual",
        id: "currentAddress",
    },
    {
        text: "Email",
        id: "email",
    },
    {
        text: "Status",
        id: "isActivated",
    },
    {
        text: "Ativar/Desativar",
        id: "status",
    },
    {
        text: "Deletar",
        id: "id",
    },
]

const search = async function () {
    try {
        // display spinner on
        spinner.setAttribute('style', 'display: inline;')
        document.getElementById("api-title").innerText = api ? api : "API keys";
        let query = api ? "?api=" + api : "";

        const resp = await fetch("/keygeoservice" + query, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
        let respJson = await resp.json()
        if (resp.status === 200) {
            // section.style.height = '100%'
            // display spinner off
            spinner.setAttribute('style', 'display: none;')
            // clear table
            tableHeadRow.textContent = ''
            tableBody.textContent = ''
            // create table rows
            createTableRows()
            // sort name api
            respJson.body.sort((a,b) => (sortGeoApiId(a,b)))
            // create table body
            respJson.body.forEach((obj) => {
                createColOnTableBody(obj);
            });

            if(respJson.body[0]){
                sessionStorage.setItem('URL', respJson.body[0].url);
                sessionStorage.setItem('ID', respJson.body[0].referenceAddress);
            }

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

function sortGeoApiId(a,b){
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

function createTableRows() {
    let th = document.createElement('th')
    th.scope = 'col'
    th.innerText = ''
    tableHeadRow.appendChild(th)

    titleRowsTable.forEach(row => {
        let tr = document.createElement('tr')
        tr.id = `${row.id}`
        tableBody.appendChild(tr)
        let th = document.createElement('th')
        th.scope = 'row'
        th.innerText = `${row.text}`
        if (row.id === 'date' || row.id === 'initialDate') th.innerText = `${row.text}`+' *'
        tr.appendChild(th)
    })
}

// create table inverted
function createColOnTableBody(obj) {
    let th = document.createElement('th')
    th.scope = 'col'
    th.innerText = obj.name?`${obj.name}`: "---"
    th.className = 'text-center'
    tableHeadRow.appendChild(th)

    for (let data of tableBody.children) {
        let td = document.createElement("td");
        td.className = "text-center";
        obj["status"] = null
        Object.entries(obj).forEach((objApi) => {
            if (objApi[0] === data.id) {
                // format date
                if (objApi[0] === "date" || objApi[0] === "initialDate") {
                    let date = new Date(objApi[1]);
                    td.innerText = `${date.toLocaleDateString() + " " + date.toLocaleTimeString()}`;
                } else if (objApi[0] === "id") {
                    // delete button
                    let itemDelete = document.createElement("i");
                    itemDelete.className = "fa fa-trash";
                    let buttonDelete = document.createElement("button");
                    buttonDelete.className = "btn btn-sm btn-danger";
                    buttonDelete.appendChild(itemDelete);
                    buttonDelete.onclick = (event) => {
                        // attributes type of KeyGeoServiceEntity
                        updateApi({
                            where: {id: obj.id},
                            set: {
                                isExcluded: true
                            }
                        },
                            "Você tem certeza que deseja EXCLUIR essa chave?"
                        );
                    };
                    td.appendChild(buttonDelete);
                } else if (objApi[0] === "status") {
                    // status button
                    let buttonStatus = document.createElement("button");
                    // attributes type of KeyGeoServiceEntity
                    let objUpdateStatus = {
                        where: {id: obj.id},
                        set: {
                            isActivated: null
                        }
                    }
                    let textStatus = null
                    if (obj.isActivated === true) {
                        buttonStatus.className = "btn btn-sm btn-warning";
                        buttonStatus.innerText = "DESATIVAR CHAVE"
                        objUpdateStatus.set.isActivated = false
                        textStatus = "Você tem certeza que deseja DESATIVAR essa chave?"
                    } else if (obj.isActivated === false) {
                        buttonStatus.className = "btn btn-sm btn-success";
                        buttonStatus.innerText = "ATIVAR CHAVE"
                        objUpdateStatus.set.isActivated = true
                        textStatus = "Você tem certeza que deseja ATIVAR essa chave?"
                    }
                    buttonStatus.onclick = (event) => {
                        updateApi(
                            objUpdateStatus,
                            textStatus
                        );
                    };
                    td.appendChild(buttonStatus);
                } else if (objApi[0] === "isActivated") {
                    // status button
                    td.className = "text-center "
                    if (objApi[1] === true){
                        td.className += "text-success";
                        td.innerText = "ATIVADA"
                    } else if (objApi[1] === false) {
                        td.className += "text-warning";
                        td.innerText = "DESATIVADA"
                    }
                } else if (objApi[1] === true) {
                    // 'sim' instead 'true'
                    td.innerText = "Sim";
                    td.className = "text-success text-center";
                } else if (objApi[1] === false) {
                    // 'não' instead 'false'
                    td.innerText = "Não";
                    td.className = "text-danger text-center";
                } else td.innerText = `${objApi[1] !== null ? objApi[1].toLocaleString("pt-BR") : "---"}`;
            }
        });
        data.appendChild(td);
    }
}

async function updateApi(obj, text) {
    if (confirm(text)) {
        try {
            const resp = await fetch("/keygeoservice", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const respJson = await resp.json();
            if (resp.status === 200) {
                search()
                scroll(0, section.scrollHeight)
            } else {
                console.error("Error: " + respJson.error);
                alert("Error: "+ respJson.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error: "+error);
        }
    }
}

function goToPageAddApi() {
    window.location.href = "/pages/geoapis/add/index.html?api=" + api;
}


