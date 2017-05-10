$(function() {

    //拖动鼠标时不选中图片
    document.onselectstart = new Function('event.returnVlue=false;');

    var main = document.getElementById('main')
    var divs = main.children;
    var clip = document.getElementById('img2')
    var $clip = $('#img2')
    var preview = document.getElementById('img3')
    var $preview = $('#img3')
    var isPresDown = false;
    var contact = "";

    //设置拖动div时的事件
    $(main).draggable({ containment: 'parent', drag: dragPic })


    $.each(divs, function() {
        this.onmousedown = function(e) {
            e.stopPropagation();
            isPresDown = true;
            contact = this.id;
        }
    })

    window.onmouseup = function(e) {
        e.stopPropagation();

        isPresDown = false;
    }

    window.onmousemove = function(e) {
        if (isPresDown === false) {
            return;
        }
        var x = e.clientX;
        var y = e.clientY;

        var $main = $(main);

        switch (contact) {
            case "left":
                moveleft(main, x);
                break;
            case "right":
                moveright(main, x);
                break;

            case "down":
                movedown(main, y);
                break;
            case "up":
                moveup(main, y);
                break;

            case "right-down":
                moveright(main, x);
                movedown(main, y);
                break;
            case "left-down":
                moveleft(main, x);
                movedown(main, y);
                break;
            case "right-up":
                moveright(main, x);
                moveup(main, y);
                break;
            case "left-up":
                moveleft(main, x);
                moveup(main, y)
                break;
            default:
                return;
        }

        dragPic();

    };
});

function moveright(main, x) {
    var $main = $(main)

    var left = $main.offset().left;
    var oldwidth = $main.width();

    var addWidth = x - oldwidth - left;
    width = addWidth + oldwidth;
    if (width < 0) {
        return;
    }
    $main.width(addWidth + oldwidth);
}

function moveleft(main, x) {
    var $main = $(main);
    var left = main.offsetLeft;
    var oldwidth = main.offsetWidth - 2;
    var mainDivLeft = $(main).offset().left;
    var addWidth = x - mainDivLeft;

    width = oldwidth - addWidth;

    var leftAfter = main.offsetLeft + addWidth;

    if (width < 0) {
        return;
    }

    $main.css('left', leftAfter + 'px')

    $main.width(width);
}

function movedown(main, y) {
    var $main = $(main)

    var top = $main.offset().top;
    var oldheight = $main.height();

    var addHeight = y - oldheight - top;
    var height = addHeight + oldheight;
    if (height < 0) {
        return;
    }
    $main.height(height);
}

function moveup(main, y) {
    var topBefore = main.offsetTop;
    var addHeight = 0;
    var mainY = $(main).offset().top; //选取框相对于屏幕上边的距离
    addHeight = y - mainY; //增加的高度
    var heightBefore = main.offsetHeight - 2;
    var bottom = topBefore + heightBefore;

    var heightAfter = heightBefore - addHeight;
    var topAfter = main.offsetTop + addHeight;

    if (topAfter < bottom && topAfter > -2) {
        main.style.height = heightAfter + "px";
        main.style.top = topAfter + "px";
    }
}

function adjustPicSize(main, clip) {
    var top = main.offsetTop;
    var right = main.offsetLeft + $(main).width();
    var bottom = main.offsetTop + $(main).height();
    var left = main.offsetLeft;

    $(clip).css('clip', 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px' + ')');
}


function adjustPreviewPicSize(main, clip) {
    var top = main.offsetTop;
    var right = main.offsetLeft + $(main).width();
    var bottom = main.offsetTop + $(main).height();
    var left = main.offsetLeft;
    var x = document.getElementById('img2')

    $(clip).css('clip', 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px' + ')');
    $(clip).css('top', -top + 'px');
    $(clip).css('left', (x.offsetWidth + 10 - left) + 'px');

}

function dragPic() {
    var main = document.getElementById('main')
    var clip = document.getElementById('img2')
    var preview = document.getElementById('img3')

    adjustPicSize(main, clip)
    adjustPreviewPicSize(main, preview)
}