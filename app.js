// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNorwCCd5bN84Ur_cA74XsttnvkqpA71s",
    authDomain: "jsr-project-9f15f.firebaseapp.com",
    databaseURL: "https://jsr-project-9f15f.firebaseio.com/",
    projectId: "jsr-project-9f15f",
    storageBucket: "jsr-project-9f15f.appspot.com",
    messagingSenderId: "604196986302"
};
firebase.initializeApp(config);

$(document).ready(function() {
  var database = firebase.database();

  // create a section for messages data in your db
  var messagesReference = database.ref('messages');

  // CREATE

  $('#message-form').submit(function(event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault();

    // grab user message input
    var message = $('#message').val();

    // clear message input (for UX purposes)
    $('#message').val('');



    // use the set method to save data to the messages
    messagesReference.push({
      message: message,
      votes: 0
    });
  });
    // READ
  getFanMessages();

  function getFanMessages() {
    // use reference to app database to listen for changes in messages data
    // hint: use something referring to 'value'
    messagesReference.on('value', function(data){
      var messageValue = data.val();
      //console.log(messageValue);
      // iterate through results coming from database call; messages
      // using a "for in" loop to iterate through values in an object
      $(".message-board").empty();
      for (var i in messageValue) {
        $(".message-board").append("<li>" +  messageValue[i].message + "<button class=\"deleteMe\">delete</button></li>");
      }
    });
  }
})
$(".deleteMe").on("click", deleteFanMessages);
//DELETE
//create the delete method for click event
function deleteFanMessages() {

  //reference ref.child(key).remove();
  messagesReference.child(message).remove();
  $(this).parent().remove();
}
//add button aligned right in line with messages
//Click to delete
