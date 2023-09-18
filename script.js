const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("unordered-list")
const deleteEl = document.getElementById("delete-btn")
const tabEl = document.getElementById("tab-el")
let myLeads = []


let localStorageLeads = JSON.parse(localStorage.getItem("myLeads"))

if (localStorageLeads){
    myLeads = localStorageLeads
    render(myLeads)
}
saveBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value=""
    render(myLeads)   
})

function render(leads) {
    listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += `<li>${leads[i]}</li>`
    }
    ulEl.innerHTML = listItems
}

deleteEl.addEventListener("click", function() {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

tabEl.addEventListener("click", function () {
    let queryInfo = {
        currentWindow: true,
        active: true
    }
    chrome.tabs.query(queryInfo, function(tabs){
        let url = tabs[0].url;
        myLeads.push(url)
        render(myLeads)
    })
})