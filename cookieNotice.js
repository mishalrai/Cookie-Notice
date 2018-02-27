+(function($){ 

    function cookieNotice(){

        this.init = function(){
            if (typeof rhScript == 'undefined'){return;};
            this.title = rhScript.cookieNoticeInfo.title ;
            this.description = rhScript.cookieNoticeInfo.description ;
            this.acceptBtnTxt = rhScript.cookieNoticeInfo.acceptBtnTxt ;
            this.readMoreTxt = rhScript.cookieNoticeInfo.readMoreTxt ;
            this.readMoreLink = rhScript.cookieNoticeInfo.readMoreLink ;
            this.isCookieAccepted(); 
        };

        this.setCookieNotice = function () {
            var noticeTemp = '<div class="ge-cookie-notice" id="ge-cookie-notice">\
                                <div class="title-n-desc">\
                                    <h4>'+ this.title + '</h4>\
                                    <p>'+ this.description + '</p>\
                                </div>\
                                <div class="btn-coll">\
                                    <button class="ge-btn-accept" id="ge-accept">'+this.acceptBtnTxt+ '</button> &nbsp;\
                                    <a href="'+ this.readMoreLink + '" class="ge-btn-read-more">' + this.readMoreTxt + '</a>\
                                </div>\
						    </div> <!-- ge-cookie-notice --> '; 
            $('body').append(noticeTemp);
        };

        this.isCookieAccepted = function(){
            if (!this.getCookie('cookieNotice')) {
                this.setCookieNotice();
                this.acceptCookieTerms();
            }
        };

        this.acceptCookieTerms = function(){
            var self = this;
            $(document).on('click', '#ge-accept', function () {
                self.setCookie('cookieNotice', 1, 365 * 20);
                jQuery('#ge-cookie-notice').fadeOut(700, 'linear', function () {
                    $(this).remove();
                });
            });
        }; 

        this.getCookie = function(cname){
            var name = cname + "=",
                decodedCookie = decodeURIComponent(document.cookie),
                ca = decodedCookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    var ck = c.substring(name.length);
                    return ck;
                }
            }
            return "";  
        };

        this.setCookie = function (cname, cvalue, exdays ){
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        };
    }

    var instance = new cookieNotice();
    
    $(document).ready(function(){
        instance.init();
    });

})(jQuery)