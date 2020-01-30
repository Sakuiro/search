// JavaScript DIVCSS5 Document
(function($){
    var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        //$(this).hide();
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var controlLeft;
            if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
                controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
            }else{
                controlLeft = $window.width()- opts.pageWidthJg-$this.width();
            }
            jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

            var cssfixedsupport=$.browser.msie && parseFloat($.browser.version) < 7;//判断是否ie6

            var controlTop=$window.height() - $this.height()-opts.pageHeightJg;

            controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;

            if (shouldvisible){
                $this.stop().show();
            }else{
                $this.stop().hide();
            }

            $this.css({
                position: cssfixedsupport ? 'absolute' : 'fixed',
                right: 10
            });
        },30);

        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };

    $.fn.goToTop.def={
        pageWidth:960,//页面宽度
        pageWidthJg:15,//按钮和页面的间隔距离
        pageHeightJg:130,//按钮和页面底部的间隔距离
        startline:150,//出现回到顶部按钮的滚动条scrollTop距离
        duration:1000,//回到顶部的速度时间
        targetObg:"body"//目标位置
    };
})(jQuery);
$(function(){
    $('<a href="javascript:;" class="toTop" title="返回顶部"></a>').appendTo("body");
});

//返顶效果
$(function(){
  $(".toTop").goToTop();
      $(window).bind('scroll resize',function(){
        $(".toTop").goToTop({
          pageWidth:960,
          duration:1000
        });
    });
});
//切换效果
