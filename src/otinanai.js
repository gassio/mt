// Misc video.vue functions

goCurrentRibbon() {
    var that = this

    $(document).ready(function(){
        var getWidth = $('.videoline-ribbon').css('margin-left') 
        var getWidthParent =  $('.videoline').width()
        var getPercent = parseInt(parseFloat(getWidth) / getWidthParent * 100)

        console.log(getPercent)
        
        console.log("goto")
        var goToDrag = that.videoDuration/ ( 100 / getPercent )
        that.player.seek(goToDrag);
    });
};

showAnnoMenu() {
        $(document).ready(function() {
            var annoMenu = `
                    <div class="annomenu">
                            <div class="annomenu-option">
                            1
                            </div>
                            <div class="annomenu-option">
                            2
                            </div>
                            <div class="annomenu-option">
                            3
                            </div>
                            <div class="annomenu-option">
                            4
                            </div>
                            <div class="annomenu-option">
                            5
                            </div>
                    </div>
            `;
            $('.jw-nextup-container').append(annoMenu)
        })
};

// Append inside the JWPlayer div
$(document).ready(function() {
    var annotateBtn = $('.annotate-btn')
    $('.jw-controls').append(annotateBtn)

    var annotate = $('.annotate')
    $('#player').append(annotate)
});

// If from-to bar div is clicked, set from/to data
document.getElementById('videoline-crop').addEventListener('click', function (e) {
    var offset = this.getClientRects()[0];
    that.clickCoords = e.clientX - offset.left; 
    var clickCoordsPercent = ( that.clickCoords / $('.videoline-crop').width() ) * 100

    $('.crop__start').animate({ marginLeft: clickCoordsPercent + "%" }, 50);

    var clickTime = (clickCoordsPercent * that.videoDuration) / 100
    that.player.seek(clickTime)
    clickTime = that.secondsToMMSS(clickTime)
    console.log('from: ' + clickTime)
    that.annotateStart = clickTime
}, false);