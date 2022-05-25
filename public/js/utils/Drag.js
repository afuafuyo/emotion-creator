define('utils/Drag', null, () => {

function Drag() {
    this.doc = document;

    this.diffX = 0;
    this.diffY = 0;
    this.options = {
        sensitivity: 5,
        fixed: false,
        dragable : false,
        targetDragObj : null,
        srcDragObj : null,
        dragX : true,  // 横向拖动
        dragY : true  // 纵向拖动
    };
    this.start = 0;
    this.onEnd = null;
    this.onMove = null;
}
Drag.prototype = {
    constructor : Drag
    ,extend : function(src, configs) {
        for(var key in configs) {
            src[key] = configs[key];
        }
    }
    ,_mousedown : function(e) {
        var _this = this;

        this.options.targetDragObj.style.position =
            this.options.fixed ? 'fixed' : 'absolute';

        this.diffX = e.clientX - this.options.targetDragObj.offsetLeft;
        this.diffY = e.clientY - this.options.targetDragObj.offsetTop;

        this.start = e.clientX;

        this.doc.onmousemove = (evt) => { _this._mousemove(evt); };
        this.doc.onmouseup = (evt) => { _this._mouseup(evt); };
    }
    ,_mousemove : function(e) {
        if(this.options.dragable) {
            this.options.dragX && (this.options.targetDragObj.style.left = e.clientX - this.diffX + 'px');
            this.options.dragY && (this.options.targetDragObj.style.top = e.clientY - this.diffY + 'px');

            if(null !== this.onMove && Math.abs(e.clientX - this.start) > this.options.sensitivity) {
                this.onMove();
            }
        }
    }
    ,_mouseup : function(e) {
        this.doc.onmousemove = null;
        this.doc.onmouseup = null;

        if(null !== this.onEnd) {
            this.onEnd();
        }
    }
    ,drag : function(opt) {
        let _this = this;
        this.extend(this.options, opt);

        null === this.options.srcDragObj
            ? this.options.targetDragObj.onmousedown = (e) => {
                _this._mousedown(e);
            }
            : this.options.srcDragObj.onmousedown = (e) => {
                _this._mousedown(e);
            };
    }
};

return Drag;
});
