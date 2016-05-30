$(document).ready(function(){
  var retrievedData,
      cards;
  // var dropdowns = function () {
  // 	console.log("init");
  //   var $hiddenFields = $('form').find('.hidden-select'),
  //       $selected = $('form').find('.selected'),
  //       $menuItems = $('form').find('.dropdown-menu li'),
  //       field;
  //   $selected.on('click', function (e) {
  //       e.preventDefault();
  //   });
  //   $menuItems.on('click', function () {
  //       field = $(this).parents('.dropdown-menu').data('field');
  //       $selected.filter('[data-field="' + field + '"]').text($(this).text());
  //       $hiddenFields.filter('[data-field="' + field + '"]').val($(this).data('value'));
  //       $(this).siblings('li').removeClass('active');
  //       $(this).addClass('active');
  //   });
  // };

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

  $('.radio-btn input').click(function(){
    $(document).find('.radio-btn').each(function(){
      $(this).removeClass('radio-active');
    });
    $(this).parents('.radio-btn').addClass('radio-active');
  })

//Loads mtgjson object to client side for typeahead.js to reference
    var needRefresh = false;
    var mtgjsonLocation = "http://andrewmaul.com/fun/draftleague2016/js/json/allcards.json";


    if(localStorage.getItem('mtgjsonLocation')==null){
      needRefresh = true;
    }
    
    if(needRefresh){
      $.getJSON(mtgjsonLocation, function( data ) {
              var localjson=[];
              for (var key in data){
                  localjson.push(data[key].name);
              }
              localStorage.setItem('mtgjsonLocation', JSON.stringify(localjson));
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
