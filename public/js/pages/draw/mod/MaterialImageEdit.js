// 编辑组件
define('pages/draw/mod/MaterialImageEdit', [
    'utils/Event'
], (Event) => {

const EditImage = {
    props: {
        'node': {default: {}}
    },
    data: function() {
        return {
            opacity: this.node.opacity ? this.node.opacity * 100 : 100
        };
    },
    methods: {
        handleDelete: function() {
            Event.getInstance().fire('event_edit_delete_node');
        },
        handleOpacityChange: function(v) {
            Event.getInstance().fire('event_edit_set_opacity', {
                opacity: v
            });
        }
    },
    template:
`<div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">操作</div>
        <el-button class="material-edit-delete-btn" type="danger" @click="handleDelete">删除</el-button>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">不透明度</div>
        <div style="margin: 0 10px">
            <el-slider v-model="opacity" @change="handleOpacityChange"></el-slider>
        </div>
    </div>
</div>`
};

return EditImage;
});
