<template>
    <div class="container py-3">
        <div class="row justify-content-center" v-if="content === null && getContentRequest.isLoading">
            <div class="col-12 col-xl-10 p-0 p-md-3 text-center">
                <i class="fa-solid fa-spinner fa-pulse fa-2x"></i>
            </div>
        </div>
        <div class="row justify-content-center" v-if="content !== null">
            <div class="col-12 col-xl-10 p-0 p-md-3">
                <iPlayer
                    :content="content"
                ></iPlayer>
            </div>
        </div>
    </div>
</template>

<script>
    import GetContentRequest from "@/Requests/GetContentRequest.js";
    import Server from "@/Servers/Server.js";
    import iPlayer from '@/Views/Components/iPlayer/iPlayer.vue';

    export default {
        components: {
            iPlayer,
        },
        data () {
            return {
                content: null,
                getContentRequest: new GetContentRequest(this.$route.params.id),
            };
        },
        methods: {
            getContent () {
                this.getContentRequest.submitTo(Server.getInstance()).then(content => this.content = content);
            },
        },
        mounted () {
            this.getContent();
        },
        props: [
            'authUser'
        ]
    };
</script>
