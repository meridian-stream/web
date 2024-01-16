<template>
    <div class="mPlayer-controls" v-if="videoPlayer.element !== null">
        <div class="mPlayer-control mPlayer-control-play" @click="togglePlay">
            <i class="fa-solid fa-play fa-fw" v-if="videoPlayer.paused"></i>
            <i class="fa-solid fa-pause fa-fw" v-if="!videoPlayer.paused"></i>
        </div>
        <div class="mPlayer-control mPlayer-control-sound" @mouseenter="showSound = true" @mouseleave="showSound = false">
            <i class="fa-solid fa-volume-high fa-fw"></i>
            <mPlayerVolume
                v-if="showSound"
                @setSoundVolume="v => $emit('setVolume', v)"
                :volume="videoPlayer.volumeSound"
            ></mPlayerVolume>
        </div>
        <div class="mPlayer-control mPlayer-control-music" @mouseenter="showMusic = true" @mouseleave="showMusic = false">
            <i class="fa-solid fa-music fa-fw"></i>
            <mPlayerVolume
                v-if="showMusic"
                @setMusicVolume="v => $emit('setVolume', v)"
                :volume="videoPlayer.volumeMusic"
            ></mPlayerVolume>
        </div>
        <div class="mPlayer-timescore">
            {{ secondsToNiceTime(this.videoPlayer.progress) }} / {{ secondsToNiceTime(this.videoPlayer.duration) }}
        </div>
        <div class="mPlayer-control mPlayer-control-fullscreen" @click="toggleFullscreen">
            <i class="fa-solid fa-expand fa-fw" v-if="!videoPlayer.fullscreen"></i>
            <i class="fa-solid fa-compress fa-fw" v-if="videoPlayer.fullscreen"></i>
        </div>
    </div>
</template>

<script>
    import mPlayerVolume from './mPlayerVolume.vue'

    export default {
        components: {
            mPlayerVolume,
        },
        data () {
            return {
                showSound: false,
                showMusic: false,
            };
        },
        methods: {
            secondsToNiceTime (seconds) {
                let date = new Date(null);
                date.setSeconds(seconds);
                return date.toISOString().slice(seconds > 3600 ? 11 : 14, 19)
            },
            toggleFullscreen () {
                this.$emit('toggleFullscreen');
            },
            togglePlay () {
                this.$emit('togglePlay');
            },
        },
        props: [
            'videoPlayer',
        ],
    };
</script>

<style lang="scss">
    .mPlayer-controls {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, 0.66);
        color: rgba(255, 255, 255, 0.66);

        .mPlayer-control {
            position: absolute;
            width: 3rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            font-size: 1.25rem;
            transition: color 0.125s linear;
            cursor: pointer;
        }

        .mPlayer-timescore {
            position: absolute;
            width: 3rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
        }

        .mPlayer-control-play {
            left: 0;
            top: 0;
        }

        .mPlayer-control-fullscreen {
            right: 0;
            top: 0;
        }

        .mPlayer-control-sound {
            left: 48px;
            top: 0;
        }

        .mPlayer-control-music {
            left: 96px;
            top: 0;
        }

        .mPlayer-timescore {
            width: 8rem;
            left: 144px;
            top: 0;
            font-size: 1rem;
        }

        .mPlayer-control:hover {
            color: #7c3ea3;
        }
    }
</style>
