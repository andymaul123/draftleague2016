$(document).ready(function(){
  var dropdowns = function () {
  	console.log("init");
    var $hiddenFields = $('form').find('.hidden-select'),
        $selected = $('form').find('.selected'),
        $menuItems = $('form').find('.dropdown-menu li'),
        field;
    $selected.on('click', function (e) {
        e.preventDefault();
    });
    $menuItems.on('click', function () {
        field = $(this).parents('.dropdown-menu').data('field');
        $selected.filter('[data-field="' + field + '"]').text($(this).text());
        $hiddenFields.filter('[data-field="' + field + '"]').val($(this).data('value'));
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });
  };
  dropdowns();
});
