var nameInput = document.getElementById("name");
var url = document.getElementById("url");
var btn = document.getElementById("btn");
var inputs=document.getElementsByClassName("form-control")
var sites;
var globalIndex;

if(localStorage.getItem("sites")==null)
{
    sites=[];
}
else
{
sites=JSON.parse(localStorage.getItem("sites"));
displaySites();
}

btn.onclick = function () {
    if(btn.innerHTML=="sumbit")
    {
    addSite();
    }
    else
    {
        edit();
        btn.innerHTML="sumbit";

    }
    displaySites();
    reset();
}


function addSite() {
    var site =
    {
        name: nameInput.value,
        url: url.value
    }
    sites.push(site);
    localStorage.setItem("sites",JSON.stringify( sites));
}


function displaySites() {
    var rows = "";
    for (var i = 0; i < sites.length; i++) {
        rows +=
            `
            <div class="container oneSite my-4 py-5">
            <h3>${sites[i].name}</h3>
            <button class="btn btn-primary "><a target="_blank" class="text-white text-decoration-none" href='${sites[i].url}'>Visit</a></button>
            <button onclick="delet(${i})" class="btn btn-danger">Delet</button>
            <button onclick="update(${i})" class="btn btn-info">update</button>
            </div>
          `
    }
    document.getElementById("sitesList").innerHTML = rows;
}

function reset(){
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value="";
    }

}


function delet(index){
 sites.splice(index,1);
 displaySites();
 localStorage.setItem("sites",JSON.stringify( sites));
}


function update(index){
document.getElementById("btn").innerHTML="Update";
nameInput.value=sites[index].name;
url.value=sites[index].url;
globalIndex=index;
}

function edit(){
  var site=
  {
       name:nameInput.value,
       url:url.value
   }
    sites[globalIndex]=site;
    localStorage.setItem("sites",JSON.stringify( sites));
}


function search(letter){
    var rows = "";
    for (var i = 0; i < sites.length; i++) {
        if(sites[i].name.toLowerCase().includes(letter.toLowerCase()))
        rows +=
            `
            <div class="container oneSite my-4 py-5">
            <h3>${sites[i].name}</h3>
            <button class="btn btn-primary "><a target="_blank" class="text-white text-decoration-none" href='${sites[i].url}'>Visit</a></button>
            <button onclick="delet(${i})" class="btn btn-danger">Delet</button>
            <button onclick="update(${i})" class="btn btn-info">update</button>
            </div>
          `
    }
    document.getElementById("sitesList").innerHTML = rows;
}

function validatename()
{
    var rejex=/^[A-Z][a-z]{3,20}$/;
    if(!rejex.test(nameInput.value))
    {
        btn.disabled="true";
    }
    else{
        btn.removeAttribute("disabled");
    }
}

nameInput.onkeyup = function () {
    validatename();
}


url.onkeyup = function () {
    var rejxUrl = /^https?:\/\/www.[a-zA-Z0-9]{3,20}.com$/
    if (!rejxUrl.test(url.value)) {
        btn.disabled = "true"
    }
    else {
        btn.removeAttribute("disabled");
    }
}

