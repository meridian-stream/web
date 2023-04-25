<template>
    <div class="container-fluid py-2" v-if="channel !== null">
        <div class="row">
            <div class="col-12">
                <ChannelBadge
                    v-if="channel.image !== null"
                    class="float-start me-3"
                    :channel="channel"
                    :size="'large'"
                ></ChannelBadge>
                <h1>{{ channel.name }}</h1>
                <p class="small text-muted">{{ channel.tagline }}</p>
                <div v-html="channel.about" class="mb-2"></div>
                <div class="row">
                    <div class="col-6 small">
                        {{ channel.follower_count }} followers • <span class="text-primary">{{ channel.exclusive_count }} exclusive videos</span>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <FollowButton :channel="channel" class="mb-2 mb-sm-0"></FollowButton>
                            <SubscribeButton @openSubscribe="$emit('openSubscribe')" :auth-user="authUser" :channel="channel"></SubscribeButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <PaginatedContents
                    v-if="getChannelContentsRequest !== null"
                    :request="getChannelContentsRequest"
                ></PaginatedContents>
            </div>
        </div>
    </div>
</template>

<script>
    import ChannelBadge from "../../Components/ChannelBadge/ChannelBadge.vue";
    import GetChannelRequest from "../../../Requests/GetChannelRequest";
    import Server from "../../../Servers/Server";
    import PaginatedContents from "../../Components/PaginatedContents/PaginatedContents.vue";
    import GetContentsRequest from "../../../Requests/GetContentsRequest";
    import FollowButton from "../../Components/FollowButton/FollowButton.vue";
    import SubscribeButton from "../../Components/SubscribeButton/SubscribeButton.vue";
    import {marked} from "marked";

    export default {
        components: {
            ChannelBadge,
            PaginatedContents,
            FollowButton,
            SubscribeButton,
        },
        computed: {
            about () {
                if (this.channel.about !== '') {
                    return marked.parse(this.channel.about);
                }
                return '';
            }
        },
        data () {
            return {
                channel: null,
                getChannelRequest: new GetChannelRequest(this.$route.params.id),
                getChannelContentsRequest: null,
            }
        },
        mounted () {
            this.getChannelRequest.submitTo(Server.getInstance())
                .then(channel => {
                    this.getChannelContentsRequest = new GetContentsRequest(null, null, [channel.id]);
                    console.log(channel);
                    this.channel = channel;
                })
        },
        props: [
            'authUser',
        ],
    };
</script>
