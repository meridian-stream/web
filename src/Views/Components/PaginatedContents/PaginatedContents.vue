<template>
    <div>
        <h2 class="d-none">Latest Content</h2>
        <div class="row" v-if="contents !== null">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(content, i) in contents">
                <ContentCard :content="content" @openSubscribe="channel => { $emit('openSubscribe', channel); }"></ContentCard>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
                <div class="btn btn-outline-primary" @click="loadMore" v-html="request.isLoading ? '<i class=\'fa-solid fa-spinner fa-pulse\'></i>' : 'Load More'"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Server from "../../../Servers/Server";
    import ContentCard from "../ContentCard/ContentCard.vue";

    export default {
        components: {
            ContentCard,
        },
        data () {
            return {
                contents: null,
            }
        },
        methods: {
            loadMore() {
                this.request.loadMore(Server.getInstance())
                    .then(response => {
                        this.contents = [...this.contents, ...response.data]
                    })
            },
        },
        mounted () {
            this.request.submitTo(Server.getInstance())
                .then(response => {
                    this.contents = response.data;
                })
        },
        props: [
            'request',
        ],
    };
</script>
