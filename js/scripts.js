const header = $( "#sticky-header" );
const error = $( "<span class=\"validationError delete\"></span>" );
header.append( error );
const textField = $( "form" );
const addButton = $( "#button" );
let validation = false;

// Input validation
textField.on( "input", () => {
  const inputValue = $( "#input" ).val();

  if ( inputValue === "" ) {
    addButton.css( "background-color", "#fc999b" );
    error.addClass( "delete" );
    validation = false;
  } else if ( /[<>"`'$/\\{ }]/.test( inputValue ) ) {
    addButton.css( "background-color", "#fc999b" );
    error.text( "Special characters are not allowed!" );
    error.removeClass( "delete" );
    validation = false;
  } else {
    validation = true;
    error.addClass( "delete" );
    addButton.css( "background-color", "#ff5557" );
  }
} );

// Adding a new item to the list of items
function newItem() {
  const inputValue = $( "#input" ).val();
  const li = $( `<li>${inputValue}</li>` );

  function clearInput() {
    $( "#input" ).val( "" );
  }

  if ( validation ) {
    const list = $( "#list" );
    list.append( li );
    clearInput();
    $( "#button" ).css( "background-color", "#fc999b" );
  }

  // Crossing out an item from the list of items
  function crossOut() {
    li.toggleClass( "strike" );
  }
  li.on( "dblclick", crossOut );

  // Add delete button to list entry
  const crossOutButton = $( "<button>X</button>" );
  li.append( crossOutButton );
  crossOutButton.on( "click", deleteListItem );

  // Delete item from list
  function deleteListItem() {
    li.remove();
  }

  // Reordering the items
  $( "#list" ).draggable();
  function holdItem() {
    li.css( "cursor", "grabbing" );
  }
  function releaseItem() {
    li.css( "cursor", "grab" );
  }

  li.on( "mousedown", holdItem );
  li.on( "mouseup", releaseItem );
}

textField.on( "submit", ( e ) => {
  e.preventDefault();
  newItem();
} );
