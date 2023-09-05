<template>
    <div class="container py-sm-3" v-if="content !== null">
        <div class="row justify-content-center mb-3">
            <div class="col-12 col-xl-10 p-0 p-md-3">
                <div
                    style="width: 100%; padding-top: 56.23%; overflow: hidden; position: relative"
                    v-if="typeof content.video.url === 'undefined'"
                >
                    <Image
                        :src="'/images/subscribers-only.svg'"
                    ></Image>
                    <div class="subscribers-only-label">
                        <i class="fa-solid fa-lock text-secondary fa-2x"></i><br><br>
                        This content is for <span class="text-secondary">{{ content.channel.name }}</span> subscribers only!
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
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-9">
                        <h1>{{ content.title }}</h1>
                        <div class="text-muted small mb-2">
                            <span v-if="content.view_count > 5">{{ content.view_count }} views • </span>{{ content.nice_published_at }}
                        </div>
                        <Tags :tags="content.tags"></Tags>
                    </div>
                    <div class="col-12 col-lg-4 col-xl-3 text-end">
                        <span class="col-form-label" v-if="content.rating > 0">
                            <Stars :content="content" class="mb-2"></Stars>
                        </span>
                        <ReportButton @click="$emit('openReport', content)" class="ms-2"></ReportButton>
                        <LikeAndDislike class="ms-2" :content="content"></LikeAndDislike>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <ChannelBadge class="float-start me-3" v-if="content.channel.image !== null" :channel="content.channel"></ChannelBadge>
                        <router-link style="color: inherit; text-decoration: none;" :to="{ name: 'channels.view', params: { id: content.channel.slug || content.channel.id } }"><span style="font-size: 1.125rem; line-height: 32px">{{ content.channel.name }}</span></router-link><br>
                        <span class="text-muted small">{{ content.channel.follower_count }} followers</span>
                    </div>
                    <div class="col-12 col-lg-4 text-end mb-3">
                        <FollowButton
                            @openLogin="$emit('openLogin')"
                            class="mb-2"
                            :channel="content.channel"
                        ></FollowButton>
                        <SubscribeButton
                            v-if="content.channel.is_accepting_subscriptions"
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
    import CreateViewRequest from "../../../Requests/CreateViewRequest";
    import UpdateViewRequest from "../../../Requests/UpdateViewRequest";
    import ReportButton from "../../Components/ReportButton/ReportButton.vue";

    export default {
        components: {
            Image,
            Stars,
            ChannelBadge,
            SubscribeButton,
            Tags,
            LikeAndDislike,
            FollowButton,
            ReportButton,
        },
        data () {
            return {
                content: null,
                createOrUpdateContentRequest: null,
                getContentRequest: new GetContentRequest(this.$route.params.id),
                videoPlayer: null,
                viewInterval: null,
            };
        },
        methods: {
            getContent () {
                this.getContentRequest.submitTo(Server.getInstance())
                    .then(content => {
                        this.content = content;

                        // If the video has no URL, ask the user to sub
                        if (typeof this.content.video.url === 'undefined') {
                            setTimeout(() => {
                                this.$emit('openSubscribe', this.content.channel);
                            }, 500)
                        }

                        let view = localStorage.getItem('view-' + this.content.id);

                        // Wait because the video element might not have loaded in yet
                        setTimeout(() => {
                            this.videoPlayer = document.getElementById('video-player');

                            // When the video is played...
                            this.videoPlayer.addEventListener('play', () => {
                                this.viewInterval = setInterval(() => {
                                    if (view === null) {
                                        this.createOrUpdateContentRequest = new CreateViewRequest(this.content.id, this.authUser?.id);
                                    } else {
                                        this.createOrUpdateContentRequest = new UpdateViewRequest(view, this.authUser?.id);
                                        this.createOrUpdateContentRequest.most_recent_time = Math.round(this.videoPlayer.currentTime);
                                    }
                                    this.createOrUpdateContentRequest.submitTo(Server.getInstance())
                                        .then(v => {
                                            localStorage.setItem('view-' + this.content.id, v.id);
                                            view = v.id;
                                            this.createOrUpdateContentRequest = new UpdateViewRequest(v.id, this.authUser?.id);
                                            this.createOrUpdateContentRequest.most_recent_time = Math.round(this.videoPlayer.currentTime);
                                        })
                                }, 1000);
                            })

                            // When the video has paused
                            this.videoPlayer.addEventListener('pause', () => {
                                clearInterval(this.viewInterval);
                            });

                            // When the screen orientation changes...
                            screen.orientation.addEventListener('change', e => {
                                if (e.target.type.substring(0, 9) === 'landscape') {
                                    this.videoPlayer.requestFullscreen();
                                } else {
                                    this.videoPlayer.exitFullscreen();
                                }
                            })
                        }, 250);
                    });
            },
        },
        mounted () {
            this.getContent();
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
                        for (let i = 0; i < newVal.channels.length; i++) {
                            if (newVal.channels[i].id === this.content.channel.id) {
                                this.getContent();
                                return;
                            }
                        }
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
        height: 192px;
        line-height: 32px;
        text-align: center;
        margin-left: -100px;
        margin-top: -96px;
        text-shadow: 0 0 8px black, 0 0 16px black, 0 0 32px black, 0 0 64px black, 0 1px 0 black;
    }
</style>
