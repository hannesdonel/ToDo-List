const header = $("#sticky-header");
const error = $("<span class=\"validationError delete\"></span>");
header.append(error);

function newItem() {
  // 1. Adding a new item to the list of items:

  const inputValue = $("#input").val();
  const li = $(`<li>${inputValue}</li>`);

  function clearInput() {
    $("#input").val("");
  }

  if (inputValue === "") {
    error.text("Please type your item to add!");
    error.removeClass("delete");
  } else if (/[<>"`'$/\\{ }]/.test(inputValue)) {
    error.text("Special characters are not allowed!");
    error.removeClass("delete");
  } else {
    const list = $("#list");
    list.append(li);
    clearInput();
    $("#button").css("background-color", "#fc999b");
  }

  textField.on("input", () => {
    const inputValueNew = $("#input").value;
    if (inputValueNew !== "") {
      error.addClass("delete");
    }
  });

  // 2. Crossing out an item from the list of items:

  function crossOut() {
    li.toggleClass("strike");
  }

  li.on("dblclick", crossOut);

  // 3(i). Adding the delete button "X":

  const crossOutButton = $("<button>X</button>");
  li.append(crossOutButton);

  crossOutButton.on("click", deleteListItem);

  // 3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:

  function deleteListItem() {
    li.remove();
  }

  // 4. Reordering the items:

  $("#list").sortable();
  $("#list").on("taphold", sortable());

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
const addButton = $("#button");
textField.on("input", () => {
  const inputValue = $("#input").val();
  if (inputValue !== "") {
    addButton.css("background-color", "#ff5557");
  } else {
    addButton.css("background-color", "#fc999b");
  }
});

textField.on("submit", (e) => {
  e.preventDefault();
  newItem();
});
