define('pages/draw/mod/Material', [
    'utils/Event',
    'pages/draw/mod/MaterialImage',
    'pages/draw/mod/MaterialText',
    'pages/draw/mod/MaterialImageEdit',
    'pages/draw/mod/MaterialTextEdit',
    'pages/draw/mod/MaterialBackgroundEdit'
], (Event, MaterialImage, MaterialText, MaterialImageEdit, MaterialTextEdit, MaterialBackgroundEdit) => {

const Material = {
    components: {
        'vue-material-image': MaterialImage,
        'vue-material-text': MaterialText,
        'vue-material-image-edit': MaterialImageEdit,
        'vue-material-text-edit': MaterialTextEdit,
        'vue-material-background-edit': MaterialBackgroundEdit
    },
    data: function() {
        return {
            // 编辑的节点名
            editName: '',
            // 编辑的节点
            node: null,

            // 选中的菜单
            menuType: ''
        }
    },
    methods: {
        switchMenu: function(e) {
            let t = e.target;
            let nodeName = t.nodeName.toUpperCase();

            if('I' === nodeName) {
                t = t.parentNode.parentNode;
            } else {
                t = t.parentNode;
            }

            let role = t.dataset.role;

            // 二次点击关闭
            if('' !== this.menuType && this.menuType === role) {
                this.menuType = '';
                return;
            }

            switch(role) {
                case 'image':
                    this.menuType = 'image';
                    break;
                case 'text':
                    this.menuType = 'text';
                    break;
                default:
                    break;
            }
        },
        editClear: function() {
            this.node = null;
            this.editName = '';
        },
        editSet: function(data) {
            this.node = data.node;
            this.editName = data.name;
        }
    },
    mounted: function() {
        // 编辑图片
        Event.getInstance().on('event_edit_set', this.editSet, this);
        Event.getInstance().on('event_edit_clear', this.editClear, this);
    },
    template:
`<div class="material-wrapper">
    <div class="material-menu" @click="switchMenu">
        <div :class="'material-menu-item' + (this.menuType==='image'?' active':'')" data-role="image">
            <div class="material-menu-item-icon">
                <i class="el-icon-picture-outline"></i>
            </div>
            <div class="material-menu-item-label">图片</div>
        </div>
        <div :class="'material-menu-item' + (this.menuType==='text'?' active':'')" data-role="text">
            <div class="material-menu-item-icon">
                <i class="el-icon-edit"></i>
            </div>
            <div class="material-menu-item-label">文字</div>
        </div>
    </div>
    <!-- 左侧选择内容 -->
    <div v-if="'' !== menuType" class="material-content">
        <vue-material-image v-if="menuType==='image'"></vue-material-image>
        <vue-material-text v-if="menuType==='text'"></vue-material-text>
    </div>

    <!-- 右侧属性栏 -->
    <div class="material-edit-pop" v-if="''!==editName">
        <vue-material-background-edit
            v-if="'background'===editName"
            :node="node"></vue-material-background-edit>

        <vue-material-image-edit
            v-if="'image'===editName"
            :node="node"></vue-material-image-edit>

        <vue-material-text-edit
            v-if="'i-text'===editName"
            :node="node"></vue-material-text-edit>
    </div>
</div>`
};

return Material;

});
