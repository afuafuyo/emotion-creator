// 编辑组件
define('pages/draw/mod/MaterialBackgroundEdit', [
    'utils/Event'
], (Event) => {

const BackgroundEdit = {
    props: {
        'node': {default: {}}
    },
    data: function() {
        return {
            left: this.node.backgroundImage ? this.node.backgroundImage.left : 0,
            top: this.node.backgroundImage.top ? this.node.backgroundImage.top : 0
        };
    },
    methods: {
        handleDelete: function() {
            Event.getInstance().fire('event_edit_delete_background');
        },
        handleOptions: function() {
            let ret = {
                left: this.left,
                top: this.top
            };
            Event.getInstance().fire('event_edit_set_background_options', {
                options: ret
            });
        }
    },
    template:
`<div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">背景操作</div>
        <el-button class="material-edit-delete-btn" type="danger" @click="handleDelete">删除</el-button>
    </div>
    <div class="material-edit-fieldset">
        <div class="material-edit-fieldset-title">位置</div>
        <div style="margin: 0 10px">
            <div style="margin: 0 15px">
            <div>
                <div style="font-size: 12px; color: #999">top</div>
                <div>
                    <el-input-number v-model="top" @change="handleOptions"></el-input-number>
                </div>
            </div>
            <div>
                <div style="font-size: 12px; color: #999">left</div>
                <div>
                    <el-input-number v-model="left" @change="handleOptions"></el-input-number>
                </div>
            </div>
        </div>
    </div>
</div>`
};

return BackgroundEdit;
});
