<template>
    <div class="container-fluid py-2" v-if="channel !== null">
        <div class="row mb-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h1 class="mb-0">{{ channel.name }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-3 col-lg-2 col-xl-2 mb-3">
                <div class="list-group text-light">
                    <div class="list-group-item" @click="$router.push({ name: 'cp.channels.view', params: { id: this.$route.params.id } })">
                        Dashboard
                    </div>
                    <div class="list-group-item" @click="$router.push({ name: 'cp.channels.contents.index', params: { id: this.$route.params.id } })">
                        Contents
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-9 col-lg-10 col-xl-10">
                <router-view
                    @openGallery="(f, s, o) => { $emit('openGallery', f, s, o) }"
                    :authUser="authUser"
                    :channel="channel"
                ></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import GetChannelRequest from "../../../Requests/GetChannelRequest";
    import Server from "../../../Servers/Server";

    export default {
        data () {
            return {
                channel: null,
                getChannelRequest: new GetChannelRequest(this.$route.params.id),
            };
        },
        mounted () {
            this.getChannelRequest.submitTo(Server.getInstance())
                .then(channel => {
                    this.channel = channel;
                });
        },
        props: [
            'authUser',
        ]
    };
</script>
