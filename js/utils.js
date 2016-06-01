  
var count = 0,
    dataObject,
    serviceURL = "https://jsonblob.com/api/jsonBlob/574c63aae4b01190df708c1e",
    notificationURL = "https://pushpad.xyz/projects/1042/notifications",
    notificationAuthToken = "ed5c3eb9e6cd1a101b728ffab3256f10",
    lastPick;

var addCardToList = function(card){
    $('#feed-table tbody').append('<tr><td>' + card + '</tr></td>');
    count++;
};

var createPlayerCardList = function(playerName, cards){
    cards.forEach(function(card){
        // $('#'+ playerName).append('<li>' + card + '</li>');
        console.log("createPlayerCardList function ran successfully");
    });
};

var addPlayer = function(playerData){
    // $('.data').append(playerData.name);
    // $('.data').append("<ul id="+playerData.name+"></ul>");
    createPlayerCardList(playerData.name,playerData.cards);
    console.log("addPlayer function ran successfully");
};

var loadPlayers = function(groupData){
    // $('.data').empty();
    // addPlayer(groupData.player1);
    // addPlayer(groupData.player2);
    // addPlayer(groupData.player3);
    console.log("loadPlayers function ran successfully");
};

var returnPlayer = function(){
    //SEND THE PLAYER DATA BACK & RELOAD IT
    $.ajax({
        type: 'PUT',
        url: serviceURL,
        data: JSON.stringify(dataObject),
        success: function(response) {
          console.log("returnPlayer success");
             loadPlayers(response);
             notifyNextPlayer();
             clearForm();
         },
        contentType: "application/json",
        dataType: 'json'
    });
};

var notifyNextPlayer = function(){
    console.log(lastPick);
    var notificationData = {
        "notification" : {
            "body": "This is a test",
            "title" : lastPick,
            "target_url" : "http://andrewmaul.com/fun/draftleague2016/index.html"
        }
    };

    $.ajax({
        type: 'POST',
        url: notificationURL,
        data: JSON.stringify(notificationData),
        headers: {
            'Access-Control-Allow-Origin' : "*",
            'Authorization': 'Token token="' + notificationAuthToken + '"',
            'Accept': 'application/json'
        },
        failure: function(response) {
            console.log(response);
        },
        success: function(response) {
            console.log(response);
        },
        contentType: "application/jsonp",
        dataType: 'json'
    });
};

var clearForm = function(){
    // $('#card-input').val('');
    console.log("clearForm function ran successfully");
};

var notificationUrls = {
  "player1" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=01&uid_signature=1b716ae8523d1a5ce173c9ba70eb002714a24a58",
  "player2" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=02&uid_signature=af4aa4bab5714c4b0cde17424a34ec7c794bda76",
  "player3" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=03&uid_signature=3803bb9cc8001d02a5dd5195d15be06ee778e84e",
  "player4" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=04&uid_signature=8b0ae6731b40e09e201ebbecf587cff96eb2c125",
  "player5" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=05&uid_signature=d2d7cd4f2d7a9786eee44009507559108de91695",
  "player6" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=06&uid_signature=95691b54448ba83828cdebc2a6fcc747742f905e",
  "player7" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=07&uid_signature=03520f4841ff2a5ba32e2caaf52194edfc12b42b",
  "player8" : "https://pushpad.xyz/projects/1042/subscription/edit?uid=08&uid_signature=7cf6dbdab24fcab6c2d017a4eb52986c2586223d",
};

$(document).ready(function(){
  $.ajax({
      url: serviceURL
  }).then(function(data) {
      console.log("initialize success! Data...");
      console.log(data);
      loadPlayers(data);
      dataObject = data;
  });

  $('#card-submit').on('click', function(e){
      // var selectedVal = "";
      // var selected = $("#playerSelection input[type='radio']:checked");
      // if (selected.length > 0) {
      //     selectedVal = selected.val();
      // }
      event.preventDefault();
      selectedVal = "player1";

      lastPick = dataObject[selectedVal].name + " picked " + $('#form-card').val();

      dataObject[selectedVal].cards.push($('#card-input').val());
      returnPlayer();
  });

  var retrievedData,
      cards;

  var typeaheadLaunch = function(){
    if($('body').hasClass('draft')){
      console.log("Typeahead is launching...");
      var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
          var matches, substringRegex;
          matches = [];
          substrRegex = new RegExp(q, 'i');
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              matches.push(str);
            }
          });

          cb(matches);
        };
      };
      retrievedData = localStorage.getItem("mtgjsonLocation");
      cards = JSON.parse(retrievedData);
      $('#the-basics .typeahead').typeahead({
        hint: false,
        highlight: true,
        minLength: 1
      },
      {
        name: 'cards',
        source: substringMatcher(cards)
      });
    }
  }

  // $('.radio-btn input').click(function(){
  //   $(document).find('.radio-btn').each(function(){
  //     $(this).removeClass('radio-active');
  //   });
  //   $(this).parents('.radio-btn').addClass('radio-active');
  // })

//Loads mtgjson object to client side for typeahead.js to reference
    var needRefresh = false;
    var mtgjsonLocation = "http://andrewmaul.com/fun/draftleague2016/js/json/cardNames.json";


    if(localStorage.getItem('mtgjsonLocation')==null){
      needRefresh = true;
    }
    
    if(needRefresh){
      $.getJSON(mtgjsonLocation, function( data ) {
              // var localjson=[];
              // for (var key in data){
              //     localjson.push(data[key].name);
              // }
              localStorage.setItem('mtgjsonLocation', JSON.stringify(data));
              retrievedData = localStorage.getItem("mtgjsonLocation");
              if(retrievedData != null){
                //initialize typeahead
                typeaheadLaunch();
              }
      });
    }else {
      typeaheadLaunch();
    }









});
