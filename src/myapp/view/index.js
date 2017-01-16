myApp.onPageInit('index', function()
{
    if(isAndroid)
    {
        $$('.view .navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
        // And move Navbar into Page
        $$('.view .page').each(function()
        {
            $$(this).prepend($$(this).parent().parent().find('.navbar'));
        })
    }
}).trigger();
