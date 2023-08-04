<template>
    <div>
        <h2 v-if="channels !== null && channels.length > 0">Channels</h2>
        <div class="row" v-if="channels !== null">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3" v-for="(channel, i) in channels">
                <ChannelCard
                    :channel="channel"
                ></ChannelCard>
            </div>
        </div>
    </div>
</template>

<script>
    import Server from "@/Servers/Server.js";
    import ChannelCard from "@/Views/Components/ChannelCard/ChannelCard.vue";
    import ContentCard from "@/Views/Components/ContentCard/ContentCard.vue";

    export default {
        components: {ContentCard, ChannelCard},
        data () {
            return {
                channels: null,
            };
        },
        mounted () {
            this.request.submitTo(Server.getInstance())
                .then(response => {
                    this.channels = response.data;
                })
        },
        props: [
            'request'
        ],
    }
</script>
