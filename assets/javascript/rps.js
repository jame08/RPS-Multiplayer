
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



var myDataRef = new Firebase("https://rpsgame-4e464.firebaseio.com");
      
$('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });

      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });

      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };