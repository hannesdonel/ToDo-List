function newItem() {
  //1. Adding a new item to the list of items:
  let header = document.getElementById("sticky-header");
  let error = document.createElement("span");
  let li = document.createElement("li");
  let inputValue = document.getElementById("input").value;
  let text = document.createTextNode(inputValue);
  error.classList.add("validationError");
  error.innerText = "Please type your item to add!";
  li.appendChild(text);
  
  function clearInput() {
    document.getElementById("input").value = "";
  }
  
  if (inputValue === "") {
    header.appendChild(error);
  } else {
    let list = document.querySelector("#list");
    list.appendChild(li);
    clearInput();
    document.getElementById("button").style.backgroundColor = "#fc999b";
  }
  
  textField.addEventListener("input", function () {
    let inputValue = document.getElementById("input").value;
    if (inputValue !== "") {
      header.removeChild(error);
    }
  });

  //2. Crossing out an item from the list of items:
  function crossOut() {
    li.classList.toggle("strike");
  }

  li.addEventListener("dblclick", crossOut);

  //3(i). Adding the delete button "X":
  let crossOutButton = document.createElement("button");
  crossOutButton.appendChild(document.createTextNode("X"));
  li.appendChild(crossOutButton);

  crossOutButton.addEventListener("click", deleteListItem);
  //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:
  function deleteListItem() {
    li.classList.add("delete");
  }
  // 4. Reordering the items:
  $("#list").sortable();
  function holdItem() {
    li.style.cursor = "grabbing";
  }
  function releaseItem() {
    li.style.cursor = "grab";
  }

  li.addEventListener("mousedown", holdItem);
  li.addEventListener("mouseup", releaseItem);
}

// Change "Add" button color on input

let textField = document.querySelector("form");
let addButton = document.getElementById("button");
textField.addEventListener("input", function buttonActive() {
  let inputValue = document.getElementById("input").value;
  if (inputValue !== "") {
    addButton.style.backgroundColor = "#ff5557";
  } else {
    addButton.style.backgroundColor = "#fc999b";
  }
});

textField.addEventListener("submit", function (e) {
  e.preventDefault();
  newItem();
});
