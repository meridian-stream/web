<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="py-2">
                    <h1 v-if="typeof $route.query.query !== 'undefined' && $route.query.query !== null">Search: {{ $route.query.query }}</h1>
                    <PaginatedChannels
                        v-if="getChannelsRequest !== null"
                        :request="getChannelsRequest"
                        :key="getChannelsRequest"
                    ></PaginatedChannels>
                    <h1 v-if="typeof $route.query.tags !== 'undefined' && $route.query.tags.length > 0">Tags: <span v-for="(tag, i) in $route.query.tags" class="badge bg-primary me-1">{{ tag }}</span></h1>
                    <PaginatedContents
                        v-if="getContentsRequest !== null"
                        @openSubscribe="channel => { this.$emit('openSubscribe', channel) }"
                        :request="getContentsRequest"
                        :key="getContentsRequest"
                    ></PaginatedContents>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "../../Core/Views/Components/Form.vue";
    import GetContentsRequest from "../../Requests/GetContentsRequest";
    import PaginatedContents from "../Components/PaginatedContents/PaginatedContents.vue";
    import GetChannelsRequest from "@/Requests/GetChannelsRequest.js";
    import PaginatedChannels from "@/Views/Components/PaginatedChannels/PaginatedChannels.vue";

    export default {
        components: {
            PaginatedChannels,
            Form,
            PaginatedContents,
        },
        data () {
            return {
                getChannelsRequest: null,
                getContentsRequest: null,
                searchTimeout: null,
            }
        },
        methods: {
            search (query, tags) {
                this.getChannelsRequest = new GetChannelsRequest(query);
                this.getContentsRequest = new GetContentsRequest(query, tags);
            }
        },
        mounted () {
            this.search(this.$route.query.query, this.$route.query.tags);
        },
        watch: {
            '$route.query': {
                handler: function(query) {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = setTimeout(() => {
                        this.search(query.query, query.tags);
                    }, 250);
                },
                deep: true,
                immediate: true
            },
        },
    }
</script>
