<template>
    <div class="container py-sm-3" v-if="content !== null">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 p-0 p-md-3">
                <div
                    style="width: 100%; padding-top: 56.23%; overflow: hidden; position: relative"
                    v-if="typeof content.video.url === 'undefined'"
                >
                    <Image
                        :src="'/images/subscribers-only.svg'"
                    ></Image>
                    <div class="subscribers-only-label">
                        This content is for <span class="text-primary">{{ content.channel.name }}</span> subscribers only!
                    </div>
                </div>
                <video
                    v-if="typeof content.video.url !== 'undefined'"
                    id="video-player"
                    controls="controls"
                    :src="content.video.url"
                    style="width: 100%;"
                ></video>
            </div>
        </div>
        <div class="row justify-content-center mb-2">
            <div class="col-12 col-md-8">
                <div class="row">
                    <div class="col-12 col-lg-9">
                        <h1>{{ content.title }}</h1>
                        <div class="text-muted small mb-2">10 views • 5 months ago</div>
                        <Tags :content="content.tags"></Tags>
                    </div>
                    <div class="col-12 col-lg-3 text-end">
                        <span class="col-form-label">
                            <Stars :content="content" class="mb-2"></Stars>
                        </span>
                        <LikeAndDislike class="ms-2" :content="content"></LikeAndDislike>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <ChannelBadge class="float-start me-3" :channel="content.channel"></ChannelBadge>
                        <span style="font-size: 1.125rem; line-height: 32px">{{ content.channel.name }}</span><br>
                        <span class="text-muted small">9 followers</span>
                    </div>
                    <div class="col-12 col-lg-4 text-end mb-3">
                        <FollowButton
                            class="mb-2"
                            :channel="content.channel"
                        ></FollowButton>
                        <SubscribeButton
                            class="ms-2 mb-2"
                            @openSubscribe="() => { this.$emit('openSubscribe', this.content.channel); }"
                            :channel="content.channel"
                            :auth-user="authUser"
                        ></SubscribeButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Server from "../../../Servers/Server";
    import GetContentRequest from "../../../Requests/GetContentRequest";
    import Stars from "../../Components/Stars/Stars.vue";
    import Image from "../../Components/Image/Image.vue";
    import ChannelBadge from "../../Components/ChannelBadge/ChannelBadge.vue";
    import SubscribeButton from "../../Components/SubscribeButton/SubscribeButton.vue";
    import Tags from "../../Components/Tags/Tags.vue";
    import LikeAndDislike from "../../Components/LikeAndDislike/LikeAndDislike.vue";
    import FollowButton from "../../Components/FollowButton/FollowButton.vue";

    export default {
        components: {
            Image,
            Stars,
            ChannelBadge,
            SubscribeButton,
            Tags,
            LikeAndDislike,
            FollowButton,
        },
        data () {
            return {
                content: null,
                getContentRequest: new GetContentRequest(this.$route.params.id),
                videoPlayer: null,
            };
        },
        methods: {
            getContent () {
                this.getContentRequest.submitTo(Server.getInstance())
                    .then(content => {
                        this.content = content;

                        console.log('got', content);

                        if (typeof this.content.video.url === 'undefined') {
                            setTimeout(() => {
                                this.$emit('openSubscribe', this.content.channel);
                            }, 500)
                        }
                    });
            },
        },
        mounted () {
            this.getContent();

            this.videoPlayer = document.getElementById('video-player');

            screen.orientation.addEventListener('change', e => {
                if (e.target.type.substring(0, 9) === 'landscape') {
                    this.videoPlayer.requestFullscreen();
                } else {
                    this.videoPlayer.exitFullscreen();
                }
            })
        },
        props: [
            'authUser',
        ],
        watch: {
            authUser: {
                deep: true,
                handler: function (newVal, oldVal) {
                    /**
                     * In short, when the authUser changes in any way, we check to see if they have a subscription
                     * to this content's channel. If there is, we load the content again to get the video's url.
                     * This stops us needing to do an ugly window.location.refresh()
                     */
                    if (newVal !== null && this.content !== null) {
                        for (let i = 0; i < newVal.subscriptions.length; i++) {
                            if (newVal.subscriptions[i].channel.id === this.content.channel.id) {
                                this.getContent();
                                return;
                            }
                        }
                    }
                }
            },
        },
    }
</script>

<style>
    .subscribers-only-label {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        height: 64px;
        line-height: 32px;
        text-align: center;
        margin-left: -100px;
        margin-top: -32px;
        text-shadow: 0 0 8px black, 0 0 16px black, 0 0 32px black, 0 0 64px black, 0 1px 0 black;
    }
</style>
