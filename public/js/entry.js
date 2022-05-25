using([
    'pages/draw/Index'
], (Draw) => {

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Draw
        }
    ]
});

new Vue({
    router: router,
    data: function() {
        return {
            // data
        };
    },
    methods: {},
    template:
`<div data-role="app" style="height: 100%">
    <el-container>
        <el-header style="position:fixed; z-index:10; width:100%; height:50px; line-height:50px; top:0; left:0; background-color:#262626">
            <a href="/" style="color: #fff; margin-right: 20px">绘图</a>

            <a href="http://git.bj.dz11.com/front-end/bannercreator" target="_blank" style="float: right; margin-right: 20px; color: #fff;">源码</a>
        </el-header>
        <div id="main-wrapper" class="main-wrapper">
            <router-view></router-view>
        </div>
    </el-container>
</div>`
}).$mount('#app');

});
