import View from "../../../Views/Pages/CP/View.vue";
import ContentsIndex from "../../../Views/Pages/CP/Contents/Index.vue";
import ContentsCreate from "../../../Views/Pages/CP/Contents/Edit.vue";
import Publish from "../../../Views/Pages/CP/Contents/Publish.vue";
import CP from "../../../Views/Pages/Partials/CP.vue";

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
    ],
    component: CP,
};
