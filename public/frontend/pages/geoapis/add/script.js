// variables html
let spinner = document.querySelector('#spinner')
let form = document.querySelector('#cadKeyForm')
let section = document.querySelector('section')
let initialSectionHeight = section.offsetHeight
let containerApi = document.querySelector('#containerApi')
let urlInfo = document.querySelector('#urlInfo')
// get api from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const api = urlParams.get("api");
// select api
document.querySelector('#geoServiceId').options[0].text = api

initialPage()

function initialPage(){
    if (containerApi.offsetHeight > section.offsetHeight) section.style.height = '100%';
    if (containerApi.offsetHeight < initialSectionHeight) section.style.height = '100vh';
    urlInfo.innerHTML = sessionStorage.getItem('URL')?'Ex: '+sessionStorage.getItem('URL'):''
    form.elements['url'].value = sessionStorage.getItem('URL')?sessionStorage.getItem('URL'):''
    form.elements['referenceAddress'].value = sessionStorage.getItem('ID')?sessionStorage.getItem('ID'):''
}

async function cadKey(){
    // obj type of KeyGeoServiceEntity
    let data = {}
    for (const element of form.elements) {
        if (element.type == 'radio' || element.type == 'checkbox') {
            data[element.id] = element.checked
        } else if (element.type == 'number'){
            data[element.id] = element.valueAsNumber
        } else {
            data[element.id] = element.value
        }
    }
    if (validateForm(data)) await save(data)
}

async function save(data){
    try {
        const resp = await fetch("/keygeoservice", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const respJson = await resp.json();
        if (resp.status === 200) {
            alert("Chave cadastrada com SUCESSO!");
            goToPageViewApi()
        } else {
            console.error("Error: " + respJson.error);
            alert("Error: " + respJson.error);
        }
    } catch (error) {
        console.error("Error: " + error);
        alert("Error ao criar");
    }
}

function validateForm(data) {
    for (let obj of Object.entries(data)) {
        if (obj[1] === "") {
            alert("Favor preencher todos os dados")
            form.elements[obj[0]].focus()
            return false
        }
    }
    data.maxRequestPerDay?(data.maxRequestPerDay=data.request,data.maxRequestPerMonth=null):(data.maxRequestPerMonth=data.request,data.maxRequestPerDay=null)
    delete data['request']
    return true
}

function goToPageViewApi() {
    window.location.href = "/pages/geoapis/view/index.html?api=" + api;
}
