$('#categoriesToggler').click(function() {
    $('.category-dropdown-menu').slideToggle();
});

$('.blogs__content-filter-search').click(function() {
    $('.blogs__content-heading').hide();
    $('.blogs__content-filter-search-field').show();
    $('.blogs__content-filter-search-field span').focus();
});

$('.blogs__content-filter-search-field svg').click(function() {
    $('.blogs__content-heading').show();
    $('.blogs__content-filter-search-field').hide();
});