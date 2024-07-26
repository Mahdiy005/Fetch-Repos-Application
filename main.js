/// https://api.github.com/users/Mahdiy005/repos
let input = document.querySelector("[type='text']");
let fetchBtn = document.querySelector(".fetch");
let reposArea = document.querySelector(".repos-area");

function getData(username) {
  return new Promise((resolve, rejected) => {
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function () {
      if (myRequest.readyState === 4 && myRequest.status === 200) {
        resolve(JSON.parse(myRequest.responseText));
      } else {
        rejected(new Error("The username is not true"));
      }
    };
    myRequest.open("GET", `https://api.github.com/users/${username}/repos`);
    myRequest.send();
  });
}
fetchBtn.onclick = function () {
  if (input.value) {
    getData(input.value).then((data) => {
      for(let i = 0; i < data.length; i++) {
        displayData(data[i]);
      }
      handleControlButtons();
    });
  }
};


function displayData(item) {
  let mainDiv = document.createElement("div")
  mainDiv.classList.add("row")


  let spanRepoName = document.createElement("span");
  spanRepoName.innerHTML = item["name"];


  let controlDiv = document.createElement("div")
  controlDiv.classList.add("controle");

  let deletBtn = document.createElement("button")
  deletBtn.innerHTML = "Delete"
  deletBtn.classList.add("delete")

  let visitBtn = document.createElement("button")
  visitBtn.innerHTML = "Visit"
  visitBtn.dataset.url = item["html_url"];
  visitBtn.classList.add("visit")


  controlDiv.append(deletBtn, visitBtn);
  mainDiv.append(spanRepoName, controlDiv)
  reposArea.append(mainDiv)
}


function handleControlButtons() {
  reposArea.onclick = function (e) {
    console.log(e.target.classList.contains('delete'));
    if(e.target.classList.contains('delete')) {
      e.target.parentElement.parentElement.remove()
    }
    if(e.target.classList.contains('visit')) {
      window.location.assign(e.target.dataset.url);
    }
  }
}