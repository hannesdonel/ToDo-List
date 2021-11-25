const header = $( "#sticky-header" );
const error = $( "<span class=\"validationError delete\"></span>" );
header.append( error );
const textField = $( "form" );
const addButton = $( "#button" );
const list = $( "#list" );
const checkedList = $( "#checkedList" );

let validation = false;

// Input validation
textField.on( "input", () => {
  const inputValue = $( "#input" ).val();

  if ( inputValue === "" ) {
    addButton.css( "background-color", "#fc999b" );
    error.addClass( "delete" );
    validation = false;
  } else if ( /[<>"`'$/\\{}]/.test( inputValue ) ) {
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
  const li = $( `<li><span>${inputValue}<span></li>` );

  function clearInput() {
    $( "#input" ).val( "" );
  }

  if ( validation ) {
    li.addClass( "add" );
    list.append( li );
    setTimeout( () => li.removeClass( "add" ), 300 );
    clearInput();
    $( "#button" ).css( "background-color", "#fc999b" );
    validation = false;
  }

  // Add delete button and checkbox to list entry
  const crossOutButton = $( "<button>X</button>" );
  crossOutButton.on( "click", deleteListItem );
  const checkBox = $( "<input type=\"checkbox\" />" );
  checkBox.on( "click", ( e ) => console.log( e.target.checked ) );
  li.append( crossOutButton, checkBox );

  // Crossing out an item from the list of items
  function crossOut( value ) {
    if ( value ) {
      li.addClass( "toCheckedList" );
      setTimeout( () => {
        checkedList.prepend( li );
        li.removeClass( "toCheckedList" );
      }, 1000 );
      li.toggleClass( "strike" );
    } else {
      li.addClass( "fadeOut" );
      setTimeout( () => {
        list.prepend( li );
        li.removeClass( "fadeOut" );
        li.addClass( "toList" );
      }, 250 );
      setTimeout( () => {
        li.removeClass( "toList" );
      }, 1400 );
      li.toggleClass( "strike" );
    }
  }
  checkBox.on( "click", ( e ) => crossOut( e.target.checked ) );

  // Delete item from list
  function deleteListItem() {
    li.addClass( "remove" );
    setTimeout( () => li.remove(), 500 );
  }

  // Reordering the items
  $( "#list" ).sortable();
  $( "#checkedList" ).sortable();
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
