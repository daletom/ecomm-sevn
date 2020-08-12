import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/productlist",
            name: "productlist",
            component: () => import("./components/ProductList")
        },
        {
            path: "/product/edit/:id",
            name: "productedit",
            component: () => import("./components/ProductEdit")
        },
        {
            path: "/productpub",
            name: "productpub",
            component: () => import("./components/ProductPub")
        }
    ]
})