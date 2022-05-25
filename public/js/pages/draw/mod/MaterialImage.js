define('pages/draw/mod/MaterialImage', [
    'utils/Event'
], (Event) => {

const MaterialImage = {
    data: function() {
        return {
            tabs: [],
            list: null
        };
    },
    methods: {
        fetchList: function(type) {
            axios.get('/api/images/list?type=' + type).then((json) => {
                this.tabs = json.data.tabs;
                this.list = json.data.list;
            });
        },
        selectTab: function(e) {
            let t = e.target;
            let type = t.dataset.type;

            if(!type) {
                return;
            }

            this.fetchList(type);
        },
        selectImage: function(e) {
            let t = e.target;
            let role = t.dataset.role;

            if('bg' === role) {
                Event.getInstance().fire('insertBackground', {
                    url: t.parentNode.parentNode.dataset.image
                });
                return;
            }

            if('image' === role) {
                Event.getInstance().fire('insertImage', {
                    url: t.parentNode.parentNode.dataset.image
                });
                return;
            }
        }
    },
    mounted: function() {
        this.fetchList('');
    },
    template:
`<div class="material-content-image">
    <div class="material-content-image-tab" @click="selectTab">
        <span
            class="material-content-image-tab-item"
            v-for="item in tabs"
            :data-type="item.type"
        >
            {{item.name}}
        </span>
    </div>
    <div v-if="list" class="material-content-image-list" @click="selectImage">
        <div
            v-for="item in list"
            class="material-content-image-item"
            :data-image="item.uri"
            :style="'background-image:url('+ item.uri +')'">
            <div class="material-content-image-item-button-wrapper">
                <span class="material-content-image-item-button" data-role="bg">插入背景</span>
                <span class="material-content-image-item-button" data-role="image">插入图片</span>
            </div>
        </div>
    </div>

</div>`
};

return MaterialImage;

});
