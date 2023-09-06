import { createRouter, createWebHistory } from 'vue-router'
import Home from "./Routes/Home";
import ChannelsView from "./Routes/Channels/View";
import ChannelsCreate from "./Routes/Channels/Create";
import ContentsView from "./Routes/Contents/View";
import DocumentsView from "./Routes/Documents/View";
import SubscriptionsIndex from "./Routes/Subscriptions/Index.js";
import TagsView from "./Routes/Tags/View";
import RoadMap from "./Routes/RoadMap";
import Profile from "./Routes/Profile";
import Search from "./Routes/Search";
import FAQ from "./Routes/FAQ";

import CP from "./Routes/CP/View";
import env from "../env.js";
import About from "./Routes/About.js";
import PasswordReset from "@/Router/Routes/PasswordReset.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        Home,
        About,
        ChannelsView,
        ChannelsCreate,
        ContentsView,
        DocumentsView,
        FAQ,
        Profile,
        RoadMap,
        Search,
        SubscriptionsIndex,
        TagsView,
        PasswordReset,

        CP,
    ],
    scrollBehavior() {
        setTimeout(() => {
            document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        }, 100)
    },
});

router.afterEach((to, from) => {
    let title = env.name;
    if (typeof to.meta !== 'undefined' && typeof to.meta.title !== 'undefined') {
        title += ' | ' + to.meta.title;
    }
    document.title = title;
})

export default router
