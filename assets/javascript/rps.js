
var config = {
    apiKey: "AIzaSyAk-gFHqA56OryfAmjFDBz1cM7BR581zmQ",
    authDomain: "rpsgame-4e464.firebaseapp.com",
    databaseURL: "https://rpsgame-4e464.firebaseio.com",
    projectId: "rpsgame-4e464",
    storageBucket: "rpsgame-4e464.appspot.com",
    messagingSenderId: "1033471384933"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




var connectionsRef  = database.ref("/connections");

var connectedRef = database.ref(".info/connected");



connectedRef.on("value", function(snap) {
  console.log("connected ref: ", database.ref("/connections/id"));

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);


      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();

    }else {
      database.ref("/messeges").remove();
    }
  });



$('#messageInput').keypress(function (e) {


        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
         database.ref("/messeges").push({name: name, text: text});
          $('#messageInput').val('');
        }
      });

     database.ref("/messeges").on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });

      database.ref(connectedRef).on("value")



      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };