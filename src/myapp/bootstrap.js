// Determine theme depending on device
var isIos = Framework7.prototype.device.ios;
var isAndroid = !isIos;
    // Set Template7 global devices flags
Template7.global = {
    android: isAndroid,
    ios: isIos
};

// Define Dom7
var $$ = Dom7;
    // Add CSS Styles
if (isAndroid) {
    $$('head').prepend(
        '<link rel="stylesheet" href="css/framework7.material.css">' +
        '<link rel="stylesheet" href="css/framework7.material.colors.css">'
    );
}
else
{
    $$('head').prepend(
        '<link rel="stylesheet" href="css/framework7.ios.css">' +
        '<link rel="stylesheet" href="css/framework7.ios.colors.css">'
    );
}
// Change Through navbar layout to Fixed
if(isAndroid)
{
    $$('.view .navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    $$('.view .page').each(function()
    {
        $$(this).prepend($$(this).parent().parent().find('.navbar'));
    })
}
// Init App
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: isAndroid,
    // Enable Template7 pages
    template7Pages: true,
    animateNavBackIcon: true,
    example: true
});

// Init View
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: !isAndroid
});
