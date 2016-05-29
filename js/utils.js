$(document).ready(function(){
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

  $('.radio-btn input').click(function(){
    console.log('clicked');
    $(document).find('.radio-btn').each(function(){
      $(this).removeClass('radio-active');
    });
    $(this).parents('.radio-btn').addClass('radio-active');
  })

//Loads mtgjson object to client side for typeahead.js to reference
    // var needRefresh = false;
    // var mtgjsonLocation = "json/AllCards-x.json";


    // if(localStorage.getItem('mtgjsonLocation')==null){
    //   needRefresh = true;
    // }
    
    // if(needRefresh){
    //   $.getJSON(mtgjsonLocationPath, function( data ) {
    //           var myJson=[],
    //               variantsArray,
    //               variantsString;
    //           for (var key in data){
    //             if(data[key].title && data[key].value){
    //               if(data[key].variantslist){
    //                 variantsArray = data[key].variantslist;
    //                 variantsString = variantsArray.toString();
    //               }
    //               else {
    //                 variantsString = '';
    //               }
    //               myJson.push({
    //                 name: data[key].title,
    //                 definition: data[key].value,
    //                 variants: variantsString
    //               });
    //             }
    //           }
    //           localStorage.setItem('mtgjsonLocation', JSON.stringify(myJson));
    //   });
    // }
if($('body').hasClass('draft')){
  // Typeahead Prefetch for MTG Json 

  var onecard = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../draftleague2016/js/json/onecard.json'
  });

  $('#prefetch .typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 1
  }, {
    name: 'onecard',
    source: onecard
  });

  var inputLength = $('#form-card').outerWidth();
  $('.tt-dataset').css('width', inputLength);

  $( window ).resize(function() {
    inputLength = $('#form-card').outerWidth();
    $('.tt-dataset').css('width', inputLength);
  });
  
  $(window).on("orientationchange",function(){
    inputLength = $('#form-card').outerWidth();
    $('.tt-dataset').css('width', inputLength);
  });
}




//dropdowns();



});
