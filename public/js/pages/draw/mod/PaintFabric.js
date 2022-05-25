define('pages/draw/mod/PaintFabric', [
    'utils/Event',
    'utils/Drag'
], (Event, Drag) => {

const Paint = {
    data: function() {
        return {
            banner: {
                width: 500,
                height: 500
            }
        }
    },
    methods: {
        // 插入背景
        globalinsertBackground: function(data) {
            this.fabricCanvas.setBackgroundImage(
                data.url,
                this.fabricCanvas.renderAll.bind(this.fabricCanvas),
                {
                    left: 0,
                    top: 0,
                    originX: 'left',
                    originY: 'top'
                }
            );
        },
        globalInsertImage: function(data) {
            let img = new Image();
            img.onload = () => {
                // 添加到中心
                let yoda = new fabric.Image(img, {
                    left: 0,
                    top: 0,
                    selectable: true
                });

                this.fabricCanvas.add(yoda);
                this.fabricCanvas.renderAll();
            };
            img.src = data.url;
        },
        globalInsertText: function() {
            let text = new fabric.IText('这里是文本', {
                fill: '#000000',
                fontFamily: 'Microsoft YaHei'
            });

            this.fabricCanvas.add(text);
            this.fabricCanvas.renderAll();
        },
        globalDeleteBackground: function() {
            if(null !== this.fabricCanvas.backgroundImage) {
                this.fabricCanvas.backgroundImage = null;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetBackgroundOptions: function(data) {
            if(null !== this.fabricCanvas.backgroundImage) {
                this.fabricCanvas.backgroundImage._setOptions(data.options);

                this.fabricCanvas.renderAll();
            }
        },
        globalDeleteNode: function() {
            if(null !== this.selectedNode) {
                this.fabricCanvas.remove(this.selectedNode);
                this.selectedNode = null;
            }
        },
        globalSetNodeOpacity: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.opacity = data.opacity / 100;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetNodeColor: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.dirty = true;
                this.selectedNode.fill = data.color;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetFontWeight: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.dirty = true;
                this.selectedNode.fontWeight = data.fontWeight;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetFontStyle: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.dirty = true;
                this.selectedNode.fontStyle = data.fontStyle;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetFontFamily: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.dirty = true;
                this.selectedNode.fontFamily = data.fontFamily;
                this.fabricCanvas.renderAll();
            }
        },
        globalSetShadow: function(data) {
            if(null !== this.selectedNode) {
                this.selectedNode.dirty = true;
                this.selectedNode.shadow = data.shadow;
                this.fabricCanvas.renderAll();
            }
        },
        resetDragWrapper: function() {
            this.dragWrapper = document.getElementById('dragWrapper');

            this.dragWrapper.style.position = 'absolute';
            this.dragWrapper.style.left = (this.contentWidth - this.banner.width) / 2 + 'px';
            this.dragWrapper.style.top = (this.contentHeight - this.banner.height) / 2 + 'px';
            this.dragWrapper.style.width = this.banner.width + 'px';
            this.dragWrapper.style.height = this.banner.height + 'px';
        },
        initDraw: function() {
            this.drawCanvas = document.getElementById('drawCanvas');

            this.fabricCanvas = new fabric.Canvas(this.drawCanvas, {
                width: this.banner.width,
                height: this.banner.height,
                backgroundColor: 'rgb(255, 255, 255)'
            });
        },
        resetFabricContainer: function() {
            let fabricContainer = document.querySelector('.canvas-container');

            fabricContainer.style.width = '100%';
            fabricContainer.style.height = '100%';

            let canvas = fabricContainer.querySelectorAll('canvas');
            for(let v of canvas) {
                v.style.width = '100%';
                v.style.height = '100%';
            }
        },
        initDownloadEvent: function() {
            let download = document.getElementById('drawDownload');

            download.onclick = () => {
                let base64 = this.fabricCanvas.toDataURL();

                let link = document.createElement('a');
                link.download = 'download.png';
                link.href = base64;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                link = null;
            };
            download = null;
        },
        initZoomEvent: function() {
            this.dragWrapper.onmousewheel = (e) => {
                // evt.deltaY > 0 表示放大
                let v = e.deltaY > 0 ? -1 : 1;

                this.scaleRatio += v;
                if(this.scaleRatio <= 0) {
                    return;
                }

                let newWidth = this.banner.width * this.scaleRatio / 100;
                let newHeight = this.banner.height * this.scaleRatio / 100;
                let newLeft = this.dragWrapper.offsetLeft + (this.dragWrapper.clientWidth - newWidth) / 2;
                let newTop = this.dragWrapper.offsetTop + (this.dragWrapper.clientHeight - newHeight) / 2;

                this.dragWrapper.style.width = newWidth + 'px';
                this.dragWrapper.style.height = newHeight + 'px';
                this.dragWrapper.style.left = newLeft + 'px';
                this.dragWrapper.style.top = newTop + 'px';
            };
        },
        initDragEvent: function() {
            this.drag = new Drag();
            this.drag.drag({
                srcDragObj: this.mainWrapper,
                targetDragObj: this.dragWrapper
            });

            document.onkeydown = (e) => {
                if(32 === e.keyCode) {
                    if(this.isDraging) {
                        return;
                    }
                    this.isDraging = true;
                    this.mainWrapper.style.cursor = 'grab';
                    this.drag.options.dragable = true;
                }
            };
            document.onkeyup = (e) => {
                this.isDraging = false;
                this.mainWrapper.style.cursor = 'default';
                this.drag.options.dragable = false;
            };
        },
        initSelectEvent: function() {
            this.mainWrapper.onclick = (e) => {
                // 点击空白 关掉编辑
                if(e.target.className !== 'main-wrapper') {
                    return;
                }

                this.selectedNode = null;
                Event.getInstance().fire('event_edit_clear', {
                    node: null,
                    name: ''
                });
            };
            this.fabricCanvas.on('mouse:up', (e) => {
                let t = e.target;

                // 直接点击 canvas
                if(null === t) {
                    if(null !== this.fabricCanvas.backgroundImage) {
                        this.selectedNode = this.fabricCanvas;
                        Event.getInstance().fire('event_edit_set', {
                            node: this.fabricCanvas,
                            name: 'background'
                        });
                    }
                    return;
                }

                // 使用内置 type 属性区分不同节点
                this.selectedNode = t;
                Event.getInstance().fire('event_edit_set', {
                    node: t,
                    name: t.type
                });
            });
        },
        init: function() {
            this.mainWrapper = document.getElementById('main-wrapper');
            this.contentWidth = this.mainWrapper.clientWidth;
            this.contentHeight = this.mainWrapper.clientHeight;

            this.resetDragWrapper();
            this.initDraw();
            this.resetFabricContainer();

            this.initDownloadEvent();
            this.initZoomEvent();
            this.initDragEvent();
            this.initSelectEvent();
        }
    },
    created: function() {
        this.drag = null;
        this.isDraging = false;

        // 选中的节点
        this.selectedNode = null;

        // 默认缩放比例
        this.scaleRatio = 100;

        this.mainWrapper = null;
        this.dragWrapper = null;
        this.fabricCanvas = null;

        this.drawCanvas = null;
        // 主内容区大小
        this.contentWidth = 0;
        this.contentHeight = 0;
        // canvas 中心点坐标 用于缩放定位
        this.centerPoint = null;
    },
    mounted: function() {
        this.init();

        // 插入节点
        Event.getInstance().on('insertBackground', this.globalinsertBackground, this);
        Event.getInstance().on('insertImage', this.globalInsertImage, this);
        Event.getInstance().on('insertText', this.globalInsertText, this);
        // 删除节点
        Event.getInstance().on('event_edit_delete_background', this.globalDeleteBackground, this);
        Event.getInstance().on('event_edit_set_background_options', this.globalSetBackgroundOptions, this);
        Event.getInstance().on('event_edit_delete_node', this.globalDeleteNode, this);
        // 透明度
        Event.getInstance().on('event_edit_set_opacity', this.globalSetNodeOpacity, this);
        // 文字
        Event.getInstance().on('event_edit_set_color', this.globalSetNodeColor, this);
        Event.getInstance().on('event_edit_set_fontweight', this.globalSetFontWeight, this);
        Event.getInstance().on('event_edit_set_fontstyle', this.globalSetFontStyle, this);
        Event.getInstance().on('event_edit_set_fontfamily', this.globalSetFontFamily, this);
        Event.getInstance().on('event_edit_set_shadow', this.globalSetShadow, this);
    },
    destroyed: function() {
        document.onkeydown = null;
        document.onkeyup = null;

        this.dragWrapper.onmousewheel = null;
        this.mainWrapper.onclick = null;
        this.fabricCanvas.off();

        Event.getInstance().off('insertBackground', this.globalinsertBackground, this);
        Event.getInstance().off('insertImage', this.globalInsertImage, this);
        Event.getInstance().off('insertText', this.globalInsertText, this);
        Event.getInstance().off('insertText', this.globalInsertText, this);
        Event.getInstance().off('event_edit_delete_background', this.globalDeleteBackground, this);
        Event.getInstance().off('event_edit_set_background_options', this.globalSetBackgroundOptions, this);
        Event.getInstance().off('event_edit_delete_node', this.globalDeleteNode, this);
        Event.getInstance().off('event_edit_set_opacity', this.globalSetNodeOpacity, this);
        Event.getInstance().off('event_edit_set_color', this.globalSetNodeColor, this);
        Event.getInstance().off('event_edit_set_fontweight', this.globalSetFontWeight, this);
        Event.getInstance().off('event_edit_set_fontstyle', this.globalSetFontStyle, this);
        Event.getInstance().off('event_edit_set_fontfamily', this.globalSetFontFamily, this);
        Event.getInstance().off('event_edit_set_shadow', this.globalSetShadow, this);
    },
    template:
`<div id="dragWrapper" v-if="null !== banner">
    <canvas id="drawCanvas"></canvas>
    <div id="drawDownload" class="paint-download" title="下载"><i class="el-icon-download"></i></div>
</div>`
};

return Paint;

});
