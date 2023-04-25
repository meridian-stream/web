<template>
    <div class="row">
        <div class="col-6">
            <h2>Contents</h2>
        </div>
        <div class="col-6 text-end">
            <a
                class="btn btn-sm btn-outline-primary"
                href="#"
                @click="$router.push({ name: 'cp.channels.contents.edit', params: { id: $route.params.id, contentId: 'new' } })"
            >
                <i class="fa-solid fa-plus"></i>
                Create
            </a>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <table class="table bg-dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="contents !== null">
                    <tr v-for="(content, i) in contents">
                        <td>{{ content.title }}</td>
                        <td class="text-end">
                            <button
                                @click="$router.push({ name: 'cp.channels.contents.publish', params: { id: $route.params.id, contentId: content.id } })"
                                class="btn btn-outline-primary btn-sm me-2"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-primary"
                                @click="edit(content)"
                                :disabled="content.is_published"
                            >
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="contents !== null && contents.length < 1">
                        <td colspan="99">You don't have any content yet!</td>
                    </tr>
                    <tr>
                        <td colspan="99" class="text-center">
                            <a href="#" class="btn btn-outline-primary" @click="loadMore">Load More</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import GetContentsRequest from "../../../../Requests/GetContentsRequest";
    import Server from "../../../../Servers/Server";

    export default {
        data () {
            return {
                contents: null,
                getContentsRequest: new GetContentsRequest(
                    null,
                    null,
                    [this.channel.id],
                    true,
                    true,
                ),
            };
        },
        methods: {
            edit (content) {
                if (content.is_published) {
                    return;
                }

                this.$router.push({ name: 'cp.channels.contents.edit', params: { id: this.$route.params.id, contentId: content.id }});
            },
            loadMore () {
                this.getContentsRequest.loadMore(Server.getInstance())
                    .then(response => {
                        this.contents = [...this.contents, ...response.data]
                    })
            },
        },
        mounted () {
            this.getContentsRequest.submitTo(Server.getInstance())
                .then(response => {
                    this.contents = response.data;
                })
        },
        props: [
            'authUser',
            'channel',
        ],
    };
</script>
