define('pages/draw/mod/MaterialText', [
    'utils/Event'
], (Event) => {

const MaterialText = {
    props: {
        'data': {default: null}
    },
    methods: {
        insertText: function() {
            Event.getInstance().fire('insertText');
        }
    },
    template:
`<div class="material-content-text">
    <span class="material-content-text-item" @click="insertText">插入文字</span>
</div>`
};

return MaterialText;

});
