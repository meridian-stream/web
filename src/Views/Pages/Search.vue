<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="py-2">
                    <h1>Search: {{ $route.query.query }}</h1>
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

    export default {
        components: {
            Form,
            PaginatedContents,
        },
        data () {
            return {
                getContentsRequest: null,
                searchTimeout: null,
            }
        },
        methods: {
            search (query, tags) {
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
