import View from "../../../Views/Pages/CP/View.vue";
import ContentsIndex from "../../../Views/Pages/CP/Contents/Index.vue";
import ContentsCreate from "../../../Views/Pages/CP/Contents/Edit.vue";
import Publish from "../../../Views/Pages/CP/Contents/Publish.vue";
import PayoutsIndex from "../../../Views/Pages/CP/Payouts/Index.vue";
import Settings from "../../../Views/Pages/CP/Settings.vue";
import CP from "../../../Views/Pages/Partials/CP.vue";
import PayoutsCreate from "../../../Views/Pages/CP/Payouts/Create.vue";

export default {
    path: '/cp/channels/:id',
    name: 'cp.channels',
    children: [
        {
            path: '/cp/channels/:id/dashboard',
            name: 'cp.channels.view',
            component: View,
        },
        {
            path: '/cp/channels/:id/contents',
            name: 'cp.channels.contents.index',
            component: ContentsIndex,
        },
        {
            path: '/cp/channels/:id/contents/:contentId',
            name: 'cp.channels.contents.edit',
            component: ContentsCreate,
        },
        {
            path: '/cp/channels/:id/contents/:contentId/publish',
            name: 'cp.channels.contents.publish',
            component: Publish,
        },
        {
            path: '/cp/channels/:id/payouts',
            name: 'cp.channels.payouts.index',
            component: PayoutsIndex,
        },
        {
            path: '/cp/channels/:id/payouts/create',
            name: 'cp.channels.payouts.create',
            component: PayoutsCreate,
        },
        {
            path: '/cp/channels/:id/settings',
            name: 'cp.channels.settings',
            component: Settings,
        },
    ],
    component: CP,
};
