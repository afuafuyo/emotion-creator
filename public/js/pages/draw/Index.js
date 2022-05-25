define('pages/draw/Index', [
    'pages/draw/mod/PaintFabric',
    'pages/draw/mod/Material',
], (Paint, Material) => {

const Index = {
    components: {
        'vue-paint': Paint,
        'vue-material': Material
    },
    data: function() {
        return {
            id: this.$route.query.id
        }
    },
    template:
`<div>
    <vue-material></vue-material>
    <vue-paint ref="paint" :id="id"></vue-paint>
</div>`
};

return Index;

});
