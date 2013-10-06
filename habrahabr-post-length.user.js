// ==UserScript==
// @name        Habrahabr: Post Length
// @version     1.0
// @description Augments window title with the post length and inserts progress meter into the page itself.
// @include     http://habrahabr.ru/post/*/
// @include     http://habrahabr.ru/company/*/blog/*/
// ==/UserScript==

!function() {
    var header = document.getElementById('header');
    var computeLength = new function() {
        var originalTitle = document.title;
        var infopanel = document.getElementsByClassName('infopanel_wrapper')[0];
        return function() {
            var length = infopanel.offsetTop - header.offsetHeight;
            // Augment page title
            document.title = '[' + length + '] ' + originalTitle;
            return length;
        };
    }();
    computeLength();
    // Create indicator element
    var indicator = (function() {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = 0;
        div.style.bottom = '50%';
        div.style.paddingLeft = '2px';
        return div;
    }());
    var updateIndicator = new function() {
        var clientHeight = document.documentElement.clientHeight;
        return function() {
            var position = window.pageYOffset + clientHeight / 2 - header.offsetHeight;
            var progress = Math.floor(position / computeLength() * 100);
            indicator.innerText = progress <= 100 ? progress + '%' : '';
        };
    }();
    // Set the indicator up
    updateIndicator();
    document.body.appendChild(indicator);
    document.addEventListener('scroll', updateIndicator);
}();
