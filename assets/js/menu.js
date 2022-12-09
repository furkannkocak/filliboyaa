var animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' };
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
var $mainNav = $('ul.main-nav'),
    $mainNavTrigger = $('button.main-nav-trigger'),
    $subnav = $('ul.subnav'),
    $subnavTrigger = $('a.has-subnav-link'),
    $subnavGoBack = '<li class=\"go-back\"><a href=\"#\"><i class="fas fa-arrow-left"></i> Geri</a></li>';
enquire.register("(max-width: 991px)", {
    setup: function() {
        $mainNavTrigger.on('click', function(e) { $(this).toggleClass('active');
            console.log('mobile menu trigger'); if (!$('.main-nav').is(':visible')) { $('body').css('overflow', 'hidden');
                $('.main-nav').show().addClass('active nav-in').on(animEndEventName, function() { $(this).removeClass('nav-in').show(); }); } else { $('body').css('overflow', 'auto');
                $('.main-nav').removeClass('active').addClass('nav-out').on(animEndEventName, function() { $(this).removeClass('nav-out').hide();
                    resetNav(); }); } });
        $subnavTrigger.each(function() {
            var trigger = $(this),
                viewAll = '',
                viewAllLoc = trigger.attr('href'),
                viewAllText = trigger.text();
            viewAll += '<li class=\"view-all\">'
            viewAll += '<a href=\"' + viewAllLoc + '\" class=\"cat-title subnav-header\">' + viewAllText + '</a>'
            viewAll += '</li>'
            trigger.next($subnav).prepend($subnavGoBack);
            trigger.next($subnav).find('li:not(.go-back):first').before(viewAll);
        });
    },
    match: function() { $subnav.addClass('is-hidden');
        $subnavTrigger.on('click', function(e) { e.preventDefault(); var selected = $(this); if (selected.next($subnav).hasClass('is-hidden')) { selected.addClass('selected').next('.subnav').removeClass('is-hidden').end().parent('.has-subnav').parent('ul').addClass('moves-in');
                selected.parent('.has-subnav').siblings('.has-subnav').children('ul').addClass('is-hidden').end().children('a').removeClass('selected'); } else { selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-subnav').parent('ul').removeClass('moves-in'); } });
        $('.go-back').on('click', function(e) { e.preventDefault();
            $(this).parent('ul').addClass('is-hidden').parent('.has-subnav').parent('ul').removeClass('moves-in'); }); },
    unmatch: function() { $mainNav.show();
        resetNav(); },
    deferSetup: true
}).register("(min-width: 992px)", { match: function() { $subnavTrigger.off('click');
        $('.main-dropdown').each(function() { var subnav = $(this).find('[data-nav]'),
                navCol = $(this).find('[data-col]');
            navCol.each(function() { var colNum = $(this).data('col').toString();
                $(this).children('.nav').append($(this).siblings('[data-nav=\"' + colNum + '\"]')); }); });
        $('.main-nav > li.has-subnav').hover(function() { $(this).addClass('hover'); }, function() { $(this).removeClass('hover'); });
        $('.main-nav > li.has-subnav > a').on({ 'touchstart': function(e) { $('.main-nav > li.has-subnav').removeClass('hover');
                $(this).parent().addClass('hover');
                $('body').on({ 'touchstart': function() { $('li.has-subnav').removeClass('hover'); } }); return false; } });
        $('.subnav').removeClass('is-hidden'); }, unmatch: function() { $('.main-nav > li.has-subnav').off('mouseenter mouseleave');
        $('.main-nav > li.has-subnav > a').off('touchstart');
        $('.main-nav').hide();
        $('.main-dropdown').each(function() { var subnav = $(this).find('[data-nav]');
            $(this).find('.nav-col:last').after(subnav); }); } });

function resetNav() { $('.has-subnav-link').removeClass('selected');
    $('.main-nav-wrap').find('ul.moves-in').removeClass('moves-in');
    $('.subnav').addClass('is-hidden'); };