<template>
    <div class="video-player">
        <div class="video-player-splash" v-if="!isInitialised">
            <Image
                :src="content.image.url"
                :alt="content.image.title"
            ></Image>
        </div>
        <div class="video-player-video-wrapper" v-if="isInitialised">
            <video :src="content.video.url" class="video-player-video">

            </video>
        </div>
        <div class="video-player-ui">
            <div class="video-player-ui-play text-white">
                <i class="fa-solid fa-play fa-3x"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import Image from "@/Views/Components/Image/Image.vue";
    import { v4 } from 'uuid';

    export default {
        components: {Image},
        data () {
            return {
                id: v4(),
                isInitialised: false,
            };
        },
        mounted () {
            console.log(this.content);
        },
        props: [
            'content',
        ],
    }
</script>

<style lang="scss">
    .video-player {
        position: relative;
        background-color: black;
        padding-top: 56.25%;

        .video-player-splash {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        .video-player-video-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            .video-player-video {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }

        .video-player-ui {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            .video-player-ui-play {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 96px;
                height: 96px;
                margin-top: -48px;
                margin-left: -48px;
                text-align: center;
                line-height: 96px;
            }
        }
    }
</style>
