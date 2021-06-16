let header = $("#sticky-header");
let error = $(
  '<span class="validationError delete">"Please type your item to add!"</span>'
);
header.append(error);

function newItem() {

  //1. Adding a new item to the list of items:

  let inputValue = $("#input").val();
  let li = $("<li></li>");
  li.append(inputValue);

  function clearInput() {
    $("#input").val("");
  }

  if (inputValue === "") {
    error.removeClass("delete");
  } else {
    let list = $("#list");
    list.append(li);
    clearInput();
    $("#button").css("background-color", "#fc999b");
  }

  textField.on("input", function () {
    let inputValue = $("#input").value;
    if (inputValue !== "") {
      error.addClass("delete");
    }
  });

  //2. Crossing out an item from the list of items:

  function crossOut() {
    li.toggleClass("strike");
  }

  li.on("dblclick", crossOut);

  //3(i). Adding the delete button "X":

  let crossOutButton = $("<button>X</button>");
  li.append(crossOutButton);

  crossOutButton.on("click", deleteListItem);

  //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:

  function deleteListItem() {
    li.remove();
  }

  // 4. Reordering the items:

  $("#list").sortable();
  function holdItem() {
    li.css("cursor", "grabbing");
  }
  function releaseItem() {
    li.css("cursor", "grab");
  }

  li.on("mousedown", holdItem);
  li.on("mouseup", releaseItem);
}

// Change "Add" button color on input

let textField = $("form");
let addButton = $("#button");
textField.on("input", function buttonActive() {
  let inputValue = $("#input").val();
  if (inputValue !== "") {
    addButton.css("background-color", "#ff5557");
  } else {
    addButton.css("background-color", "#fc999b");
  }
});

textField.on("submit", function (e) {
  e.preventDefault();
  newItem();
});
