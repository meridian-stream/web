<template>
    <div class="video-player" :class="{ 'fullscreen': fullscreen }">
        <div class="video-player-video-wrapper">
            <video class="video-player-video" :id="id"></video>
        </div>
        <div class="video-player-reaction" v-if="reaction !== null">
            <span class="video-player-reaction-reaction">{{ reaction.emoji }}{{ reaction.comment !== null ? ' ' + reaction.comment : '' }}</span>
        </div>
        <div class="video-player-progress" v-if="video !== null" @mousemove="progressHover" @mouseleave="tempProgress = null" @click="progressClick">
            <div class="video-player-progress-hover" :style="{ width: (tempProgress !== null ? tempProgress : 0) + '%' }"></div>
            <div class="video-player-progress-progress" :style="{ width: (currentTime / video.duration * 100) + '%' }"></div>
        </div>
        <div class="video-player-controls" v-if="video !== null">
            <div class="video-player-control video-player-control-play" @click="togglePlay">
                <i class="fa-solid fa-play fa-fw" v-if="video.paused"></i>
                <i class="fa-solid fa-pause fa-fw" v-if="!video.paused"></i>
            </div>
            <div class="video-player-control video-player-control-volume" @click="video.muted = !video.muted">
                <i class="fa-solid fa-volume-mute fa-fw" v-if="volume <= 0 || video.muted"></i>
                <i class="fa-solid fa-volume-low fa-fw" v-if="!video.muted && volume < .5 && volume > 0"></i>
                <i class="fa-solid fa-volume-high fa-fw" v-if="!video.muted && volume >= .5"></i>
            </div>
            <div class="video-player-control video-player-control-volume-slider shown" @mousemove="mouseOverSlider" @mousedown="volumeSet">
                <div class="video-player-control-volume-slider-progress">
                    <div class="video-player-control-volume-slider-progress-progress" :style="{ width: (volume * 100) + '%' }"></div>
                </div>
            </div>
            <div class="video-player-control video-player-control-duration">
                {{ timestamps }}
            </div>
            <div class="video-player-control video-player-control-fullscreen" @click="enterFullscreen">
                <i class="fa-solid fa-expand fa-fw"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import Image from "@/Views/Components/Image/Image.vue";
    import { v4 } from 'uuid';

    export default {
        components: {
            Image
        },
        computed: {
            timestamps () {
                function toHoursAndMinutes(totalSeconds) {
                    const totalMinutes = Math.floor(totalSeconds / 60);

                    const seconds = totalSeconds % 60;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;

                    return { h: hours, m: minutes, s: seconds };
                }

                let timeStart = toHoursAndMinutes(Math.round(this.currentTime));
                let timeEnd = toHoursAndMinutes(Math.round(this.video.duration));

                return (timeStart.h > 0 ? (timeStart.h < 10 ? '0' + timeStart.h : timeStart.h) + ':' : '') +
                    (timeStart.m < 10 ? '0' + timeStart.m : timeStart.m) + ':' +
                    (timeStart.s < 10 ? '0' + timeStart.s : timeStart.s) +
                    ' / ' +
                    (timeEnd.h > 0 ? (timeEnd.h < 10 ? '0' + timeEnd.h : timeEnd.h) + ':' : '') +
                    (timeEnd.m < 10 ? '0' + timeEnd.m : timeEnd.m) + ':' +
                    (timeEnd.s < 10 ? '0' + timeEnd.s : timeEnd.s);
            }
        },
        data () {
            return {
                id: v4(),
                tempVolume: null,
                video: null,
                volume: 0,
                playInterval: null,
                currentTime: 0,
                tempProgress: null,
                fullscreen: false,
                reaction: null,
                reactions: [
                    { emoji: '👍', comment: 'tinglesss', time: 2 },
                    { emoji: '😴', comment: 'goodnight my loves', time: 3 },
                    { emoji: '❤️', comment: '', time: 7 },
                    { emoji: '👍', comment: 'purrrr', time: 9 },
                ],
                clearReactionTimeout: null,
            }
        },
        methods: {
            progressClick () {
                if (this.tempProgress !== null) {
                    this.video.currentTime = this.video.duration / 100 * this.tempProgress;
                    this.video.play();
                }
            },
            progressHover (e) {
                if (e.target.classList.contains('video-player-progress')) {
                    this.tempProgress = e.offsetX / e.target.clientWidth * 100;
                }
            },
            volumeSet (e) {
                let x = e.offsetX - 8;
                if (x < 0) {
                    x = 0;
                }
                if (x > 80) {
                    x = 80;
                }
                this.tempVolume = x / 80;
                if (this.tempVolume !== null) {
                    this.video.volume = this.tempVolume;
                }
            },
            togglePlay () {
                this.video.paused ? this.video.play() : this.video.pause();
            },
            enterFullscreen () {
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted() {
            let video = document.getElementById(this.id);
            video.src = this.content.video.url;
            video.volume = 1;
            this.volume = 1;
            video.oncanplaythrough = () => {
                this.video = video;
                console.log('Loaded')
            }
            video.onvolumechange = () => {
                this.volume = video.volume;
            }
            video.onplay = () => {
                this.playInterval = setInterval(() => {
                    this.currentTime = this.video.currentTime;

                    let time = Math.round(this.video.currentTime);
                    for (let i = 0; i < this.reactions.length; i++) {
                        if (this.reactions[i].time === time) {
                            this.reaction = this.reactions[i];
                            this.clearReactionTimeout = setTimeout(() => {
                                this.reaction = null;
                            }, 3000)
                        }
                    }
                }, 50);
            }
            video.onpause = () => {
                this.currentTime = this.video.currentTime;
                clearInterval(this.playInterval);
            }
        },
        props: [
            'content',
        ],
    };
</script>

<style>
    .video-player {
        position: relative;
        padding-top: 56.25%;
        background-color: black;
        box-shadow: -100px -100px 4rem rgba(239, 98, 108, 0.2);

        .video-player-video-wrapper {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            padding-top: 56.25%;
            margin-top: -28.125%;

            .video-player-video {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                //margin-left: -240px;
                //margin-top: -135px;
            }
        }

        .video-player-progress {
            position: absolute;
            left: 0;
            bottom: 48px;
            width: 100%;
            height: 0.5rem;
            background-color: rgba(255, 255, 255, 0.2);
            cursor: pointer;

            .video-player-progress-hover {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                pointer-events: none;
            }

            .video-player-progress-progress {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
                height: 100%;
                background-color: #ef626c;
                pointer-events: none;
                //transition: width 0.1s linear;

                .video-player-progress-progress-handle {
                    position: absolute;
                    top: -7px;
                    right: -8px;
                    width: 16px;
                    height: 16px;
                    background-color: #ef626c;
                    border-radius: 8px;
                    z-index: 2;
                }
            }
        }

        .video-player-controls {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 48px;
            background-color: rgba(0, 0, 0, 0.5);

            .video-player-control {
                position: absolute;
                width: 48px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                cursor: pointer;
            }

            .video-player-control:hover {
                color: #ef626c;
            }

            .video-player-control-play {
                left: 0;
                top: 0;
            }

            .video-player-control-volume {
                left: 48px;
                top: 0;
            }

            .video-player-control-volume-slider {
                left: 96px;
                top: 0;
                width: 0;
                overflow: hidden;

                .video-player-control-volume-slider-progress {
                    position: absolute;
                    left: 8px;
                    top: 23px;
                    width: 80px;
                    height: 2px;
                    background-color: rgba(255, 255, 255, 0.1);

                    .video-player-control-volume-slider-progress-progress {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 50%;
                        height: 100%;
                        background-color: #ef626c;
                    }
                }
            }

            .video-player-control-volume-slider.shown {
                width: 96px;
            }

            .video-player-control-fullscreen {
                right: 0;
                top: 0;
            }

            .video-player-control-duration {
                width: 96px;
                left: 192px;
                font-size: 12px;
            }
            .video-player-control-duration:hover {
                cursor: default;
                color: inherit;
            }
        }
        .video-player-reaction {
            position: absolute;
            left: 50%;
            bottom: 56px;
            width: 256px;
            margin-left: -128px;
            height: 48px;
            text-align: center;
            font-size: 0.75rem;

            .video-player-reaction-reaction {
                display: inline-block;
                line-height: 48px;
                height: 48px;
                background-color: rgba(0, 0, 0, 0.33);
                padding-left: 8px;
                padding-right: 8px;
                animation: fadeIn 0.125s linear;
                border-radius: 24px;
            }
        }
    }
    .video-player.fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    @keyframes fadeIn {
        0% { opacity: 0 }
        100% { opacity: 1 }
    }
</style>
