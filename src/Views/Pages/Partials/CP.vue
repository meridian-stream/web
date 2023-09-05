<template>
    <div class="container-fluid py-2" v-if="channel !== null">
        <div class="row mb-2">
            <div class="col-12">
                <h1 class="mb-0">{{ channel.name }} Control Panel</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-3 col-lg-2 col-xl-2 mb-3">
                <h2>Main</h2>
                <div class="list-group mb-3 text-light">
                    <div class="list-group-item list-group-item-cp-menu" @click="$router.push({ name: 'cp.channels.view', params: { id: this.$route.params.id } })">
                        Dashboard
                    </div>
                    <div class="list-group-item list-group-item-cp-menu" @click="$router.push({ name: 'cp.channels.contents.index', params: { id: this.$route.params.id } })">
                        Contents
                    </div>
                </div>
                <h2>Affiliation</h2>
                <div class="list-group mb-3 text-light">
                    <div class="list-group-item list-group-item-cp-menu" @click="$router.push({ name: 'cp.channels.payouts.index', params: { id: this.$route.params.id } })">
                        Payouts
                    </div>
                </div>
                <h2>Other</h2>
                <div class="list-group mb-3 text-light" @click="$router.push({ name: 'cp.channels.settings', params: { id: this.$route.params.id } })">
                    <div class="list-group-item list-group-item-cp-menu" @click="">
                        Settings
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-9 col-lg-10 col-xl-10">
                <router-view
                    @channelUpdated="channel => { this.channel = channel }"
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

<style>
    .list-group-item-cp-menu:hover {
        background-color: #7C3EA3;
    }
</style>
