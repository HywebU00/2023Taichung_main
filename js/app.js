$(function() {
    $('html').removeClass('no-js');
    //$('.accesskey').find('a[accesskey="U"]').focus();
    var _window = $(window),
        ww = _window.width(),
        wh = _window.height(),
        _body = $('body'),
        _webHeader = $('.header');
    //字級
    var fontSize = $('.fontSize'),
        fontSizeA = fontSize.find('button'),
        fontH1 = fontSizeA.outerHeight(true),
        fontH2 = fontH1 * 3;
    fontSize.height(fontH1);
    fontSizeA.focus(function() {
        fontSizeA.css('display', 'block');
        fontSizeA.first().focusin();
        fontSize.height(fontH2);
        $(this).keyup(function(e) {
            if (e.which == 13) {
                $(this).addClass('here keyup').siblings().removeClass('here keyup');
            }
        });
    });
    fontSize.hover(function() {
        fontSize.height(fontH2);
        fontSizeA.css('display', 'block');
        fontSizeA.click(function() {
            $(this).addClass('here').siblings().removeClass('here');
        });
    }, function() {
        fontSize.height(fontH1);
        fontSizeA.not('.here').css('display', 'none');
    });
    fontSize.nextAll().find('a').focus(function() {
        fontSize.height(fontH1);
        fontSizeA.removeClass('keyup').not('.here').css('display', 'none');
    });
    //固定版頭
    var hh = _webHeader.outerHeight(true);
    _window.scroll(function() {
        if ($(this).scrollTop() > 0) {
            _webHeader.addClass('fixed');
            _body.offset({ top: hh });
        } else {
            _webHeader.removeClass('fixed');
            _body.offset({ top: 0 });
        }
    });
    //快速鍵定位點
    var _aKey = $('a.accesskey'),
        aF_Top = $('.footer').offset().top - hh;
    _aKey.slice(0, 2).focus(function() {
        _window.scrollTop(0);
    });
    _aKey.eq(2).focus(function() {
        _window.scrollTop(aF_Top);
    });
    $('a.goCenter').keydown(function(e) {
        if (e.which == 13) {
            _window.scrollTop(-1 * hh);
            _aKey.eq(1).focus();
        }
    });
    //「福利照過來」、「服務e中心」分類平滑捲動錨點
    var _welfare = $('.welfare'),
        _welAnchor = _welfare.find('.welfCate').find('li>a'),
        _welAnchorTarget = $('.welfContent').children('div');
    //服務e中心分類
    var _esvNav = $('.eServices').find('nav'),
        _esvCate = _esvNav.find('ul'),
        _esvAnchor = _esvCate.find('li>a'),
        _esvAnchorTarget = $('.esvContent').children('div'),
        _esvCtrl = _esvNav.find('.ctrl');
    //市長政見
    var _policyCate = $('.policies'),
        _policyAnchor = _policyCate.find('li>a'),
        _policyTarget = $('.pHilight').find('h3');
    if (ww > 800) {
        _welAnchorTarget.add(_esvAnchorTarget).find('h3').wrapInner('<a href="javascript:;"></a>');
        _welAnchorTarget.add(_esvAnchorTarget).find('h3>a').click(function(e) {
            var i = $(this).parent('h3').parent('div').index();
            $('html').add(_body).stop(true, false).animate({ scrollTop: 0 }, 800, function() {
                _welAnchor.add(_esvAnchor).parent().eq(i).children('a').focus();
            });
            e.preventDefault();
        });
    }

    function getOffsetTop() {
        welTargetOffsetTop = [];
        esvTargetOffsetTop = [];
        policyTargetOffsetTop = [];
        _welAnchorTarget.each(function() {
            welTargetOffsetTop.push($(this).offset().top - hh);
        });
        _esvAnchorTarget.each(function() {
            esvTargetOffsetTop.push($(this).offset().top - hh);
        });
        _policyTarget.each(function() {
            policyTargetOffsetTop.push($(this).offset().top - hh);
        });
    }
    getOffsetTop();
    // var resizeTimer;//限制window resize要執行的function 只會在resize動作結束後執行
    // _window.resize(function(){
    //  clearTimeout(resizeTimer);
    //  hh = _webHeader.outerHeight(true);
    //  ww = _window.width();
    //  videoHeight();
    //  ifCateSld();
    //  resizeTimer = setTimeout(getOffsetTop, 300);
    // });
    _welAnchor.each(function() {
        $(this).click(function(e) {
            var i = $(this).parents('li').index();
            $('html').add(_body).stop(true, false).animate({ scrollTop: welTargetOffsetTop[i] }, 800, function() {
                if (ww > 800) { _welAnchorTarget.eq(i).find('h3>a').focus(); }
            });
            e.preventDefault();
        });
    });
    _esvAnchor.each(function() {
        $(this).click(function(e) {
            var i = $(this).parents('li').index();
            $('html').add(_body).stop(true, false).animate({ scrollTop: esvTargetOffsetTop[i] }, 600, function() {
                if (ww > 800) { _esvAnchorTarget.eq(i).find('h3>a').focus(); }
            });
            e.preventDefault();
        });
    });
    _policyAnchor.each(function() {
        $(this).click(function(e) {
            var i = $(this).parents('li').index();
            var scrollTime;
            scrollTime = 700 + 300 * i;
            $('html').add(_body).stop(true, false).animate({ scrollTop: policyTargetOffsetTop[i] }, scrollTime);
            e.preventDefault();
        });
    });
    if (ww <= 600) {
        var widthUl = _esvCate.innerWidth();
        _esvCate.css('margin-right', -1 * widthUl);
        _esvCtrl.add(_esvAnchor).click(function() {
            if (_esvCtrl.hasClass('closed')) {
                _esvCtrl.removeClass('closed');
                _esvCate.animate({ 'margin-right': 0 }, 250);
            } else {
                _esvCtrl.addClass('closed');
                _esvCate.animate({ 'margin-right': -1 * widthUl }, 250);
            }
        });
    }
    //顯示行動版查詢
    $('.searchCtrl').find('a').click(function(e) {
        $('.search').css('top', hh).slideToggle('fast');
        $('.searchCtrl').toggleClass('close');
        e.preventDefault();
    });
    //header 選單 , side bar 選單
    var _menu = $('.header .menu , .header .menu2p'),
        _megaMenu = $('.header .megaMenu>ul');
    _menu.find('li').has('ul').addClass('hasChild');
    _megaMenu.find('li').has('ul').addClass('hasChild');
    var liHasChild = _menu.find('li.hasChild'),
        subMenuWidth = liHasChild.first().children('ul').outerWidth();
    //複製所需區塊到.sidebar
    var _sidebar = $('.sidebar');
    _menu.clone().prependTo(_sidebar);
    _megaMenu.parent().clone().prependTo(_sidebar);
    $('<ul class="navigation"></ul>').prependTo(_sidebar);
    $('.header .navigation').find('li:contains(兒童版), li:contains(English)').clone().prependTo('.sidebar .navigation');
    _sidebar.find('.megaMenu').addClass('menu');
    _sidebar.find('.menu2p').addClass('menu').removeClass('menu2p');
    _sidebar.find('.menu').find('li.hasChild>a').attr("href", "#");
    var _smHaschild = _sidebar.find('.menu').find('.hasChild>a');
    _smHaschild.on('click', function() {
        let _this = $(this);
        _this.next().slideToggle();
        _this.parent().toggleClass('close');
    })
    //兩段式選單
    var _menu2p = $('.header .menu2p'),
        _liTopLevel = _menu2p.children('ul').children('li'),
        topLiLength = _liTopLevel.length,
        _menuMoreCtrl = $('.menuMoreCtrl');
    if (topLiLength > 6) {
        var hiddenMenu = _liTopLevel.slice(5).hide();
        _menu2p.after('<div class="menuMore"><ul></ul></div>');
        $('.menuMore>ul').append(hiddenMenu);
    } else {
        _menuMoreCtrl.hide();
    }
    var menuMore = $('.menuMore');
    menuMore.css('top', 'hh');
    _menuMoreCtrl.mouseover(function() { menuMore.stop().slideDown('fast'); })
    _menuMoreCtrl.click(function() { menuMore.stop().slideToggle('fast'); })
    _menuMoreCtrl.focus(function() { menuMore.stop().slideToggle('fast'); })
    $(menuMore).mouseleave(function() { menuMore.stop().fadeOut('fast'); })
    $(menuMore).find('li:last>a').focusout(function() { menuMore.stop().fadeOut('fast'); })
    liHasChild.hover(function() {
        var _showing = $(this).children('ul');
        _showing.stop().fadeIn(200);
        showingMenu(_showing);
    }, function() { $(this).children('ul').stop().fadeOut(200); });
    liHasChild.keyup(function() {
        var _showing = $(this).children('ul');
        _showing.show();
        showingMenu(_showing);
        $(this).siblings().focus(function() { $(this).hide(); });
    });

    function showingMenu(_showing) {
        var showingOffset = _showing.offset().left;
        if (showingOffset + subMenuWidth > ww) {
            _showing.css({ left: -1 * subMenuWidth + 5, top: 5 });
        }
    }
    _menu.find('li').keyup(function() { $(this).siblings().children('ul').hide(); });
    _menu.find('li:last>a').focusout(function() { _menu.find('li ul').hide(); });
    //巨型選單 megaMenu
    _megaMenu.children('li.hasChild').hover(function() { $(this).children().stop().fadeIn(200); }, function() { $(this).children('ul').stop().fadeOut(200); });
    _megaMenu.children('li.hasChild').keyup(function() {
        $(this).children().show();
        $(this).siblings().focus(function() {
            $(this).hide()
        });
    });
    _megaMenu.children('li').keyup(function() {
        $(this).siblings().children('ul').hide();
    });
    $('.header .megaMenu li:last>a').focusout(function() {
        $('.header .megaMenu li ul').hide();
    })
    //產生遮罩
    $('.main').append('<div class="overlay"></div>');
    var _overlay = $('.overlay');
    //隱藏式側欄
    function showSidebar() {
        _sidebar.css({ 'margin-left': 0, 'transition': '.5s' });
        _overlay.show(0, function() {
            _overlay.fadeTo('500', 0.5);
        });
    }

    function hideSidebar() {
        _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
        _overlay.fadeTo('500', 0, function() {
            _overlay.hide();
        });
    }
    var _sidebarClose = $('.sidebarClose'),
        _sidebarCtrl = $('.sidebarCtrl');
    _overlay.parent().css('min-height', 'inherit');
    _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
    _sidebarCtrl.click(function() {
        if (_overlay.is(':visible')) {
            hideSidebar();
        } else {
            showSidebar();
        }
    });
    _overlay.add(_sidebarClose).click(function() {
        hideSidebar();
    });
    //公版頁籤
    var tabIndex = 0;
    $('.tabContainer > section').css('position', 'absolute').hide();
    $('.tabContainer').click(function() {
        $(this).siblings().removeClass('here').find('section').hide();
        $(this).addClass('here').find('section').show();
    });
    $('.tabContainer>h2>a').focus(function() {
        $(this).parents('.tabContainer').siblings().removeClass('here').find('section').hide();
        $(this).parents('.tabContainer').addClass('here').find('section').show();
    });
    $('.news').find(".tabContainer:eq(0)").click();
    //民政局頁籤
    $('.tabs').find('.active').next('.tabContent').show();
    var tabItemHeight = $('.tabs>h1>a').outerHeight();
    $('.tabSet').each(function() {
        var tabWidth = $(this).width();
        var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight();
        var tabItemLength = $(this).find('.tabContent').length;
        var exh1 = tabItemHeight * (tabItemLength - 1);
        if (ww > 700) {
            $(this).find('.tabs>h1>a').outerWidth(tabWidth / tabItemLength);
            $(this).find('.tabContent').css('top', tabItemHeight);
        } else {
            $(this).find('.tabs>h1>a').outerWidth(tabWidth);
            $(this).height(tabContentHeight + exh1);
        }
        $('.tabs>h1>a').focus(tabs);
        $('.tabs>h1>a').click(tabs);
    });

    function tabs() {
        var _tabH1 = $(this).parent('h1');
        var _tabContent = $(this).parent('h1').next('.tabContent');
        var tabNumber = $(this).parents('.tabSet').find('.tabContent').length;
        var tabContentHeight = _tabContent.innerHeight();
        _tabH1.siblings().removeClass('active');
        _tabH1.addClass('active');
        if (ww < 700) {
            _tabContent.parents('.tabSet').height(tabContentHeight + tabItemHeight * (tabNumber - 1));
        } else if (ww < 1000) {
            $(this).parents('.tabSet').height(tabContentHeight + tabItemHeight);
        }
        return false;
    }
    //輪播圖下圖示 4~6 個 
    //  var _iconG0 = $('.iconPromote'),
    //      _iconG0Item = _iconG0.find('li'),
    //      length_iconG0 = _iconG0Item.length;
    //  _iconG0Item.css('float','left');
    //  if (ww >= 1024) {
    //      _iconG0Item.width(800/length_iconG0);
    //  } else {
    //      _iconG0Item.width(ww/length_iconG0);
    //      if (ww < 620 && length_iconG0 == 6) {
    //          _iconG0Item.width(ww/3);
    //      }
    //      if (ww < 520 && length_iconG0 == 5) {
    //          _iconG0Item.width(ww/3);
    //          _iconG0Item.eq(3).css('margin-left', ww/6);
    //      }
    //  }
    // }
    //  20190507 移除
    //gotop
    _goTop = $('.goTop');
    _goTop.click(function(e) {
        $('html').add(_body).stop(true, false).animate({ scrollTop: 0 }, 700);
        e.preventDefault();
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 250) {
            _goTop.fadeIn("fast");
        } else {
            _goTop.stop().fadeOut("fast");
        }
    });
    // Fatfooter, qrCode 開合
    $(function() {
        $('.fatfootCtrl .btn-fatfooter').click(function(e) {
            $(this).parents('.footer').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
                if ($(this).is(':visible')) {
                    $('.btn-fatfooter').html('收合/CLOSE');
                    $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
                    $('.qrcode').slideDown(100);
                } else {
                    $('.btn-fatfooter').html('展開/OPEN');
                    $('.btn-fatfooter').attr('name', '展開選單/OPEN');
                    $('.qrcode').slideUp(100);
                }
            });
            $(this).stop(true, true).toggleClass('close');
        });
    });
    // 小廣告輪播，水平
    $('.adBlockH').each(function() {
        var _adSlide = $(this),
            _showBox = _adSlide.find('.adSlide'),
            _adSlideItem = _showBox.find('li'),
            _adSlideGroup = _adSlideItem.parent(),
            itemWidth = _adSlideItem.outerWidth(true),
            count = _adSlideItem.length,
            _arrowLeft = _adSlide.find('.arbtn.left'),
            _arrowRight = _adSlide.find('.arbtn.right'),
            _pauseArea = _adSlideGroup.add(_arrowLeft).add(_arrowRight);
        speed = 600,
            timer = 4000,
            showItem = 5;
        _arrowLeft.add(_arrowRight).css('top', _showBox.position().top + _showBox.innerHeight() * .5);
        _adSlideGroup.width(itemWidth * count);
        if (count > showItem) {
            var autoAdSlide = setInterval(slideForward, timer);
            var i = 0;
            _arrowRight.click(function() {
                slideForward();
            });
            _arrowLeft.click(function() {
                i = (i - 1) % count;
                _adSlideItem.eq(i).prependTo(_adSlideGroup);
                _adSlideGroup.css('left', -1 * itemWidth);
                _adSlideGroup.stop().animate({ 'left': 0 }, speed);
            });
            _pauseArea.hover(function() { clearInterval(autoAdSlide); }, function() { autoAdSlide = setInterval(slideForward, timer); });
            var ix, tabCode;
            _adSlideItem.find('a').focus(function() {
                _pauseArea.off("mouseenter mouseleave");
                clearInterval(autoAdSlide);
                _adSlideGroup.stop().css('left', 0);
                ix = $(this).parent('li').index() + 1;
            });
            _adSlideItem.find('a').keydown(function(event) {
                tabCode = event.which || event.keyCode;
                if (event.shiftKey == 0 && ix == count && tabCode == 9) {
                    slideRestart();
                }
                if (event.shiftKey == 1 && ix == 1 && tabCode == 9) {
                    slideRestart();
                }
            });
        } else {
            _arrowLeft.add(_arrowRight).hide();
            _adSlideGroup.css({ 'left': '50%', 'margin-left': -.5 * _adSlideGroup.width() });
        }

        function slideForward() {
            _adSlideGroup.stop(true, false).animate({ 'left': -1 * itemWidth }, speed, function() {
                _adSlideItem.eq(i).appendTo(_adSlideGroup);
                _adSlideGroup.css('left', 0);
                i = (i + 1) % count;
            });
        }

        function slideRestart() {
            autoAdSlide = setInterval(slideForward, timer);
            _pauseArea.hover(function() { clearInterval(autoAdSlide); }, function() { autoAdSlide = setInterval(slideForward, timer); });
        }
    });
    // 資料大類開合
    var _category = $('.category');
    var _categoryList = _category.find('ul');
    var _categoryItem = _categoryList.find('li>a');
    _category.append('<button class="cateCtrl"></button>');
    _category.prepend('<div class="cateNow"></div>');
    var _cateCtrl = _category.find('.cateCtrl');
    var _cateNow = _category.find('.cateNow');
    _cateNow.text(_categoryList.find('li.here').text());
    _cateCtrl.click(function() {
        if (_categoryList.is(':visible')) {
            $(this).removeClass('close');
            _categoryList.slideUp();
        } else {
            $(this).addClass('close');
            _categoryList.slideDown();
        }
    });
    _categoryItem.on('click', function() {
        $(this).parent().addClass('here').siblings().removeClass('here');
        _cateNow.empty().text($(this).text());
    });
    _categoryItem.on('click', categorySlide);
    ifCateSld();

    function ifCateSld() {
        if (ww >= 800) {
            _categoryItem.off('click', categorySlide);
            _categoryList.removeAttr('style');
        } else {
            _categoryItem.on('click', categorySlide);
        }
    }

    function categorySlide() {
        _categoryList.slideUp();
        _cateCtrl.removeClass('close');
    }
    videoHeight();
    // 影片縮圖寬高
    function videoHeight() {
        vh = $('.thumbnail.videos .image>img').width() * .65;
        $('.thumbnail.videos .image>img').css('height', vh);
        $('.thumbnail.videos .play').css('height', vh);
    }
    //首頁大圖輪播參數
    $('.adloop').slick({
        accessibility: true,
        pauseOnHover: true, //滑鼠移過後暫停自動撥放
        pauseOnDotsHover: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 5000,
    });
    //首頁大圖輪播下方dot tab移動時,無障礙人工檢測要求,按enter鍵需能直接連結圖檔網址
    $(".slick-dots li button").keypress(function(e) {
        var txt = $(e.target).text();
        var achr = $(".slick-slide[data-slick-index=" + txt + "] a");
        window.open(achr.attr('href'));
    });
    //拍片景點
    var _photoThumb = $('.photoThumb').find('li'),
        _photoShow = $('.photoShow').find('li'),
        photoCount = _photoThumb.length,
        duration = 3000,
        tt = setInterval(autoShow, duration);
    _photoThumb.first().addClass('active');
    _photoShow.first().show();
    $('.photoShow').after('<div class="ppause"></div>');
    var ppCtrl = $('.ppause');
    if (ww <= 600) {
        var hini = _photoShow.first().height();
        $('.photoShow').height(hini);
        ppCtrl.click(function() {
            $(this).toggleClass('pplay')
            if (ppCtrl.hasClass('pplay')) {
                clearInterval(tt);
            } else {
                tt = setInterval(autoShow, duration);
            }
        })
    };
    _photoShow.append('<span class="photoCount"></span>');
    $('.photoShow').append('<div class="btn prev"></div><div class="btn next"></div>');
    for (n = 1; n <= photoCount; n++) {
        _photoShow.eq(n - 1).find('.photoCount').text(n + '/' + photoCount);
    }
    var i = 0;
    var _btnNext = $('.photoShow').find('.next'),
        _btnPrev = $('.photoShow').find('.prev');
    _btnNext.click(function() {
        i = (i + 1) % photoCount;
        showPhoto();
    });
    _btnPrev.click(function() {
        i = (i - 1) % photoCount;
        showPhoto();
    });
    _photoThumb.find('a').click(function() {
        i = $(this).parent('li').index();
        showPhoto();
    });
    _photoThumb.find('a').focus(function() {
        clearInterval(tt);
        i = $(this).parent('li').index();
        showPhoto();
    });
    _photoThumb.last().focusout(function() {
        tt = setInterval(autoShow, duration);
    });
    $('.photoShow, .photoThumb li').hover(function() { clearInterval(tt); }, function() {
        if (!(ppCtrl.hasClass('pplay'))) {
            tt = setInterval(autoShow, duration);
        }
    });

    function autoShow() {
        i = (i + 1) % photoCount;
        showPhoto();
    }

    function showPhoto() {
        _photoThumb.eq(i).addClass('active').siblings().removeClass('active');
        _photoShow.eq(i).fadeIn().siblings().fadeOut();
        if (ww <= 600) {
            var photoHeight = _photoShow.eq(i).height();
            $('.photoShow').animate({ height: photoHeight });
        }
    }
    //照片內容頁參數
    $('.photoSlide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: false,
        asNavFor: '.slider-nav'
    });
    $('.photoNav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.photoSlide',
        dots: false,
        centerMode: false,
        focusOnSelect: true
    });
    //分享
    var _share = $('.share');
    $('.shareThis').click(function() {
        _share.show();
        _overlay.show().fadeTo('300', 0.5);
    });
    var svt;
    _share.append('<span class="after">《</span>');
    _share.find('.after').hide();
    _share.find('span').wrap('<a href="#"></a>');

    function miniShare() {
        _share.find('.after').show();
        _share.stop(true, true).animate({ width: "1.1em" }, 600).find('ul').stop(true, true).slideUp(600);
    }

    function showShare() {
        _share.find('.after').hide();
        _share.stop(true, true).animate({ width: "48px" }, 300).find('ul').stop(true, true).slideDown(300);
    }
    if (ww > 1000) {
        svt = setTimeout(miniShare, 2000);
        _share.hover(showShare, miniShare);
        _share.children('a').focusin(showShare);
        _share.find('li').last().children('a').focusout(miniShare);
    }
    if (ww <= 1000) {
        clearTimeout(svt);
        _share.find('ul').append('<li class="close">離開</li>');
        _share.find('li').click(function() {
            _share.hide();
            _overlay.fadeTo('300', 0, function() { $(this).hide(); });
        });
        _overlay.click(function() {
            _share.hide();
        });
    }
    //彈出訊息
    $('.popMessage').before('<div class="popMask"></div>');
    $('.popMask, .popMessage').show();
    $('.popMask, .closePop').click(function() {
        $('.popMask, .popMessage, .closePop').hide(300);
        $('.accesskey').find('a[accesskey="U"]').focus();
    })
    $('.closePop').focus(function() {
        $('.popMask, .popMessage, .closePop').hide(300);
    })
    //機關通訊錄：機關階層
    $('.orgTree>ul>li:has(ul)').addClass('hasChild');
    $('.orgTree li.hasChild>ul').before('<span><a title="按enter展開下層單位" href="#">展開</a></span>');
    $('.orgTree li.hasChild').children('span').click(function(e) {
        $(this).siblings('ul').slideToggle();
        $(this).toggleClass('close');
        e.preventDefault();
    });
    $('.orgTree>ul').append('<li></li>');
    //活動行事曆查詢
    var _eventSearch = $('.eventSearch'),
        _hiddenPart = _eventSearch.find('.moreFilter , .buttonDiv'),
        _oneDay = _eventSearch.find('.oneDay'),
        _eventSearchCtrl = $('.eventSearchCtrl');
    _eventSearchCtrl.click(function() {
        if (_hiddenPart.is(':visible')) {
            _hiddenPart.slideUp(function() { $(this).hide() });
            _oneDay.slideDown(function() { $(this).show() });
            $(this).text('活動查詢').toggleClass('esHide');
        } else {
            _hiddenPart.slideDown(function() { $(this).show() });
            _oneDay.slideUp(function() { $(this).hide() });
            $(this).text('關閉查詢').toggleClass('esHide');
        }
    });
    //條列頁上方的查詢區
    var _searchInlp = $('.searchInlp');
    _searchInlp.each(function() {
        var _this = $(this);
        var _toggleArea = _this.find('.toggleArea');
        // _toggleArea.before('<button class="slideCtrl"></button>');
        _toggleArea.before('<span class="caption"></span>').before('<button class="slideCtrl" type="button" name="展開/OPEN" aria-label="查詢展開/收合">展開/OPEN</button>');
        var _caption = _this.find('.caption').text(_this.find('caption').text());
        var _slideCtrl = $(this).find('.slideCtrl');
        if (_toggleArea.is(':visible')) {
            _slideCtrl.removeClass('closed');
            _caption.hide();
        } else {
            _slideCtrl.addClass('closed');
            _caption.show();
        }
        _slideCtrl.add(_caption).click(function() {
            if (_toggleArea.is(':visible')) {
                _slideCtrl.addClass('closed');
                _toggleArea.slideUp();
                $('.slideCtrl').html('展開/OPEN');
                $('.slideCtrl').attr('name', '展開/OPEN');
            } else {
                _slideCtrl.removeClass('closed');
                _toggleArea.slideDown();
                $('.slideCtrl').html('收合/CLOSE');
                $('.slideCtrl').attr('name', '收合/CLOSE');
            }
        });
    })
    //條列頁無窮載入
    if (ww <= 800) {
        $('.list, .thumbnail').jscroll({
            contentSelector: '.list, .thumbnail'
        });
    }
    //施政計畫、報告、白皮書
    var longWord = $('.npLike').find('li:contains(研究發展考核委員會), li:contains(原住民族事務委員會), li:contains(客家事務委員會)')
    longWord.css({ 'fontSize': '17px', 'letter-spacing': '0px' });
    //  longWord.substring(1).css({'fontSize':'24px'});
    // 20220308：cp 頁相關圖檔修改 ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    var _slideAreaAtta = $('.attachment').find('.slideArea');
    _slideAreaAtta.each(function() {
        let _this = $(this);
        let _slideList = _this.find('.images');
        let _slideItem = _slideList.children('li');
        let count = _slideItem.length;
        let _slideBtnPrev = _this.find('.slideBtn.prev');
        let _slideBtnNext = _this.find('.slideBtn.next');
        let i = 0;
        _this.append(`<span class="imgCount"><em>` + (i + 1) + `</em> / ` + count + `</span>`);
        let _imgCount = _this.find('.imgCount>em');
        for (let n = 0; n < count; n++) {
            _slideItem.eq(n).attr('data-index', n);
        }
        if (count < 2) { _slideBtnPrev.add(_slideBtnNext).hide() }
        _slideBtnNext.on('click', function() {
            _slideList.animate({ 'left': '-100%' }, 400, function() {
                _slideItem.eq(i).appendTo(_slideList);
                _slideList.css('left', 0);
                i = (i + 1) % count;
                _imgCount.text(i + 1);
            });
        })
        _slideBtnPrev.on('click', function() {
            i = (i - 1 + count) % count;
            _slideItem.eq(i).prependTo(_slideList);
            _slideList.css('left', '-100%');
            _slideList.animate({ 'left': 0 }, 400, function() {
                _imgCount.text(i + 1);
            });
        })
        // 電腦版時，還原排序
        function rerank() {
            for (let i = 0; i < count; i++) {
                _slideItem.eq(i).appendTo(_slideList);
            }
            i = 0;
            _imgCount.text('1');
        }
        let winResizeTimer;
        _window.on('resize', function() {
            clearTimeout(winResizeTimer);
            winResizeTimer = setTimeout(function() {
                let wwNew = _window.width();
                if (ww <= 600 && wwNew > 600) {
                    rerank();
                }
                ww = wwNew;
            }, 300);
        })
    })
    // 開大圖燈箱 20220308
    var _lightbox = $('.lightbox');
    var _hideLightbox = _lightbox.find('.closeThis');
    var _showLightbox = $('.showLightbox');
    var _bigPhotos = _lightbox.filter('.bigPhotos');
    const lbspeed = 300;
    var bpi;
    var preserveIndex = 0;
    var _imgCount;
    // 遮罩
    _lightbox.before('<div class="coverAll"></div>');
    var _cover = $('.coverAll');
    // 回到「關閉燈箱」的跳板
    _lightbox.append(`<button type="button" class="pseudo"></button>`);
    var _pseudo = _lightbox.find('.pseudo');
    // 點擊開燈箱元件
    _showLightbox.on('click', function() {
        _lightbox.add(_cover).stop(true, false).fadeIn(lbspeed);
        _lightbox.find(_hideLightbox).trigger('focus');
        _body.addClass('noScroll');
        _pseudo.on('focus', function() {
            _lightbox.find(_hideLightbox).trigger('focus');
        })
        // ＊＊＊＊＊＊＊＊＊＊
        bpi = Number($(this).parent('li').attr('data-index'));
        preserveIndex = bpi;
        _bigPhotos.find('.imgCount>em').text(bpi + 1);
        _bigPhotos.find('.slideArea').find('li').eq(bpi).addClass('show');
    })
    _lightbox.each(function() {
        let _thisLightbox = $(this);
        let _hideLightbox = _thisLightbox.find('.closeThis');
        let _thisCover = _thisLightbox.prev('.coverAll');
        _hideLightbox.on('click', function() {
            _body.removeClass('noScroll');
            _thisLightbox.fadeOut(lbspeed, function() {
                _thisLightbox.add(_hideLightbox).removeAttr('style');
            });
            _thisCover.fadeOut(lbspeed, function() {
                _thisCover.removeAttr('style');
            });
            setTimeout(function() {
                _showLightbox.eq(preserveIndex).trigger('focus');
            }, lbspeed + 50)
        })
    })
    // 有大圖的燈箱
    _bigPhotos.each(function() {
        let _this = $(this);
        let _slideArea = _this.find('.slideArea');
        let _slideItem = _slideArea.find('li');
        let bpCount = _slideItem.length;
        let _slideBtnPrev = _slideArea.find('.slideBtn.prev');
        let _slideBtnNext = _slideArea.find('.slideBtn.next');
        let _hideLightbox = _this.find('.closeThis');
        // 為大圖燈箱加圖片計數器
        _slideArea.append(`<span class="imgCount"><em></em> / ` + bpCount + `</span>`);
        _imgCount = _slideArea.find('.imgCount>em');
        _slideItem.eq(bpi).addClass('show');
        if (bpCount < 2) {
            _slideBtnNext.add(_slideBtnPrev).hide();
        }
        _hideLightbox.on('click', function() {
            _slideItem.removeClass('show');
        })
        // 下一張圖
        _slideBtnNext.on('click', function() {
            bpi = (bpi + 1) % bpCount;
            _slideItem.removeClass('show').eq(bpi).addClass('show');
            _imgCount.text(bpi + 1);
        })
        // 上一張圖
        _slideBtnPrev.on('click', function() {
            bpi = (bpi - 1 + bpCount) % bpCount;
            _slideItem.removeClass('show').eq(bpi).addClass('show');
            _imgCount.text(bpi + 1);
        })
    })
    // 鍵盤操作：開燈箱
    _showLightbox.on('focus', function() {
        $(this).on('keyup', function(e) {
            if (e.key === 'Enter') {
                $(this).trigger('click');
            }
        });
    })
    // 鍵盤操作：關燈箱
    _hideLightbox.on('focus', function() {
        $(this).on('keydown', function(e) {
            if (e.key === 'Enter') {
                $(this).trigger('click');
            }
        });
    })
    // 點擊遮罩關燈箱
    _cover.on('click', function() {
        _hideLightbox.trigger('click');
    })
    // 改變瀏覽器寬度
    var resizeTimer; //限制window resize要執行的function 只會在resize動作結束後執行
    _window.on('resize', function() {
        clearTimeout(resizeTimer);
        // hh = _webHeader.outerHeight(true);
        // ww = _window.width();
        // videoHeight();
        // ifCateSld();
        // openLightbox();
        resizeTimer = setTimeout(function() {
            hh = _webHeader.outerHeight(true);
            ww = _window.width();
            videoHeight();
            ifCateSld();
            getOffsetTop();
        }, 300);
    });
    // 表格rwd 轉換
    rwdTable();
});