// 编辑组件
define('pages/draw/mod/MaterialTextEdit', [
    'utils/Event'
], (Event) => {

const Edit = {
    props: {
        'node': {default: {}}
    },
    data: function() {
        let parsedShadow = this.parseShadow();
        return {
            color: this.node.fill,
            bold: this.node.fontWeight === 'bold',
            italic: this.node.fontStyle === 'italic',
            font: this.node.fontFamily,

            shadowX: parsedShadow.shadowX,
            shadowY: parsedShadow.shadowY,
            shadowBlur: parsedShadow.shadowBlur,
            shadowColor: parsedShadow.shadowColor
        };
    },
    methods: {
        parseShadow: function() {
            let shadow = this.node.shadow;

            if(null === shadow) {
                return {
                    shadowX: 0,
                    shadowY: 0,
                    shadowBlur: 0,
                    shadowColor: this.node.fill
                };
            }

            return {
                shadowX: shadow.offsetX,
                shadowY: shadow.offsetY,
                shadowBlur: shadow.blur,
                shadowColor: shadow.color
            };
        },
        makeShadow: function() {
            return new fabric.Shadow({
                offsetX: this.shadowX,
                offsetY: this.shadowY,
                blur: this.shadowBlur,
                color: this.shadowColor
            });
        },
        changeShadow: function(type) {
            Event.getInstance().fire('event_edit_set_shadow', {
                shadow: this.makeShadow()
            });
        },
        handleDelete: function() {
            Event.getInstance().fire('event_edit_delete_node');
        },
        handleColorChange: function(v) {
            Event.getInstance().fire('event_edit_set_color', {
                color: v
            });
        },
        handleFontWeightChange: function(v) {
            Event.getInstance().fire('event_edit_set_fontweight', {
                fontWeight: v ? 'bold' : 'normal'
            });
        },
        handleFontStyleChange: function(v) {
            Event.getInstance().fire('event_edit_set_fontstyle', {
                fontStyle: v ? 'italic' : 'normal'
            });
        },
        handleFontChange: function(v) {
            Event.getInstance().fire('event_edit_set_fontfamily', {
                fontFamily: v
            });
        }
    },
    template:
`<div style="padding-bottom: 50px">
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">操作</div>
        <el-button class="material-edit-delete-btn" type="danger" @click="handleDelete">删除</el-button>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">颜色</div>
        <div style="margin: 0 10px">
            <el-color-picker
                show-alpha
                v-model="color"
                @change="handleColorChange">
            </el-color-picker>
        </div>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">字体</div>
        <div style="margin: 0 10px">
            <el-select placeholder="选择字体" v-model="font" @change="handleFontChange">
                <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
                <el-option label="微软正黑" value="Microsoft JhengHei"></el-option>
                <el-option label="宋体" value="SimSun"></el-option>
                <el-option label="黑体" value="SimHei"></el-option>
                <el-option label="楷体" value="KaiTi"></el-option>
                <el-option label="隶书" value="LiSu"></el-option>
                <el-option label="幼圆" value="YouYuan"></el-option>
                <el-option label="方正书体" value="FZShuTi"></el-option>
                <el-option label="方正姚体" value="FZYaoti"></el-option>
                <el-option label="华文彩云" value="STCaiyun"></el-option>
                <el-option label="华文黑体" value="STHeiti"></el-option>
                <el-option label="华文行楷" value="STXingkai"></el-option>
                <el-option label="华文琥珀" value="STHupo"></el-option>
                <el-option label="华文新魏" value="STXinwei"></el-option>
                <el-option label="苹方字体" value="PingFang SC"></el-option>
                <el-option label="Helvetica" value="Helvetica"></el-option>
                <el-option label="新罗马字体" value="Times New Roman"></el-option>
                <el-option label="兰亭黑-简" value="Lantinghei SC"></el-option>
                <el-option label="思源黑体" value="Source Han Sans CN"></el-option>
                <el-option label="思源宋体" value="Source Han Serif SC"></el-option>
            </el-select>
      </div>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">样式</div>
        <div style="margin: 0 10px">
            <el-row>
                <el-col :span="12">
                    <el-switch
                        v-model="bold"
                        inactive-text="加粗"
                        active-color="#13ce66"
                        inactive-color="#dddddd"
                        @change="handleFontWeightChange">
                    </el-switch>
                </el-col>
                <el-col :span="12">
                    <el-switch
                        v-model="italic"
                        inactive-text="斜体"
                        active-color="#13ce66"
                        inactive-color="#dddddd"
                        @change="handleFontStyleChange">
                    </el-switch>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">阴影</div>
        <div style="margin: 0 15px">
            <div>
                <div style="font-size: 12px; color: #999">水平位移</div>
                <div>
                    <el-slider :min="0" :max="20" v-model="shadowX" @change="changeShadow"></el-slider>
                </div>
            </div>
            <div>
                <div style="font-size: 12px; color: #999">竖直位移</div>
                <div>
                    <el-slider :min="0" :max="20" v-model="shadowY" @change="changeShadow"></el-slider>
                </div>
            </div>
            <div>
                <div style="font-size: 12px; color: #999">模糊半径</div>
                <div>
                    <el-slider :min="0" :max="20" v-model="shadowBlur" @change="changeShadow"></el-slider>
                </div>
            </div>
            <div>
                <div style="font-size: 12px; color: #999">阴影颜色</div>
                <div>
                    <el-color-picker
                        show-alpha
                        v-model="shadowColor"
                        @change="changeShadow">
                    </el-color-picker>
                </div>
            </div>
        </div>
    </div>
</div>`
};

return Edit;
});
