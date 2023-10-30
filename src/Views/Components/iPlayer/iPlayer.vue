<template>
    <div class="iplayer" :class="{ 'iplayer-fullscreen': fullscreen }">
        <audio :id="musicPlayerId"></audio>
        <div class="iplayer-video-wrapper">
            <video class="iplayer-video" :id="videoPlayerId" muted></video>
        </div>

        <div class="iplayer-comments" v-if="comment !== null">
            <div class="iplayer-comments-comment">
                ❤️ Love this!
            </div>
        </div>
        <div class="iplayer-choices" v-if="choices.length > 0">
            <div class="iplayer-choice">Option A</div>
            <div class="iplayer-choice">Option B</div>
            <div class="iplayer-choice">Option C</div>
            <div class="iplayer-choice">Option D</div>
        </div>

        <div class="iplayer-controls" v-if="videoPlayer !== null">
            <div class="iplayer-button" @click="togglePlay">
                <i
                    class="fa-solid fa-fw"
                    :class="{ 'fa-pause': !isPaused, 'fa-play': isPaused }"
                ></i>
            </div>
            <div class="iplayer-button iplayer-button-volume">
                <i class="fa-solid fa-volume-high fa-fw"></i>
            </div>
            <div class="iplayer-button iplayer-button-music">
                <i class="fa-solid fa-music fa-fw"></i>
            </div>
            <div
                @click="toggleFullscreen"
                class="iplayer-button iplayer-button-fullscreen"
                :class="{ 'iplayer-button-active': fullscreen }"
            >
                <i
                    class="fa-solid fa-fw"
                    :class="{ 'fa-expand': !fullscreen, 'fa-compress': fullscreen }"
                ></i>
            </div>
        </div>
        <div class="iplayer-progress">
            <div class="iplayer-progress-progress"></div>
        </div>
    </div>
</template>

<script>
    import { v4 } from 'uuid';

    export default {
        computed: {
            paused () {
                return this.videoPlayer.paused;
            }
        },
        data () {
            return {
                choices: [],
                comment: null,
                fullscreen: false,
                isPaused: false,
                musicPlayer: null,
                musicPlayerId: v4(),
                videoPlayer: null,
                videoPlayerId: v4(),
                videoPlayerPlayListener: null,
                videoPlayerPauseListener: null,
                videoPlayerProgressInterval: null,
            }
        },
        methods: {
            getSection(sectionId) {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].id === sectionId) {
                        return this.content.sections[i];
                    }
                }
            },
            getFirstSection() {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].is_first) {
                        return this.content.sections[i];
                    }
                }
            },
            loadVideoSection(section) {
                this.videoPlayer.src = section.video.url;
                this.videoPlayerPlayListener = this.videoPlayer.addEventListener('play', () => {
                    this.videoPlayerProgressInterval = setInterval(() => {
                        if (this.videoPlayer.currentTime > this.videoPlayer.duration - 10) {
                            let newSection = this.getSection(section.destination);
                            console.log(newSection);
                            if (newSection.type === 2) {
                                this.choices = newSection.choices;
                            }
                        }
                        console.log(this.videoPlayer.currentTime);
                        console.log(this.videoPlayer.duration);
                    }, 1000);
                });
                this.videoPlayerPauseListener = this.videoPlayer.addEventListener('pause', () => {
                    clearInterval(this.videoPlayerProgressInterval);
                });
                this.videoPlayer.addEventListener('ended', () => {
                    this.loadVideoSection(this.getSection(section.destination));
                });
                this.videoPlayer.muted = true;
                this.videoPlayer.play();
                this.videoPlayer.muted = false;
            },
            toggleFullscreen () {
                this.fullscreen = !this.fullscreen;
            },
            togglePlay () {
                if (this.videoPlayer.paused) {
                    this.videoPlayer.play();
                    this.isPaused = false;
                } else {
                    this.videoPlayer.pause();
                    this.isPaused = true;
                }
            }
        },
        mounted () {
            this.videoPlayer = document.getElementById(this.videoPlayerId);
            this.musicPlayer = document.getElementById(this.musicPlayerId);

            console.log(this.content);

            this.loadVideoSection(this.getFirstSection());
        },
        props: [
            'content',
        ],
    };
</script>

<style>
    .iplayer {
        position: relative;
        background-color: #000;
        padding-top: 56.25%;

        .iplayer-comments {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 48px;
            text-align: center;

            .iplayer-comments-comment {
                display: inline-block;
                height: 32px;
                line-height: 32px;
                margin-top: 8px;
                margin-bottom: 8px;
                padding-left: 8px;
                padding-right: 8px;
                background-color: rgba(0, 0, 0, 0.33);
                border-radius: 16px;
                max-width: calc(100% - 16px);
                overflow: hidden;
            }
        }

        .iplayer-choices {
            position: absolute;
            left: 0;
            bottom: 60px;
            height: 48px;
            width: 100%;

            .iplayer-choice {
                display: inline-block;
                float: left;
                width: calc(25% - 16px);
                margin-right: 8px;
                margin-left: 8px;
                text-align: center;
                line-height: 48px;
                height: 48px;
                background-color: rgba(0, 0, 0, 0.33);
                border: 1px solid rgba(255, 255, 255, 0.33);
            }

            .iplayer-choice:hover {
                cursor: pointer;
                background-color: #7c3ea3;
            }
        }

        .iplayer-video-wrapper {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            padding-top: 56.25%;
            margin-top: -28.125%;

            .iplayer-video {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }

        .iplayer-controls {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 48px;
            background-color: rgba(0, 0, 0, 0.3);

            .iplayer-button {
                position: absolute;
                top: 0;
                width: 48px;
                height: 48px;
                text-align: center;
                line-height: 48px;
                color: rgba(255, 255, 255, 0.33);
                cursor: pointer;
            }

            .iplayer-button:hover {
                color: #7c3ea3;
            }

            .iplayer-button-active {}

            .iplayer-button-active:hover {}

            .iplayer-button-fullscreen {
                right: 0;
            }

            .iplayer-button-volume {
                left: 48px;
            }

            .iplayer-button-music {
                left: 96px;
            }
        }

        .iplayer-progress {
            position: absolute;
            left: 0;
            bottom: 48px;
            width: 100%;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);

            .iplayer-progress-progress {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
                height: 100%;
                background-color: #7C3EA3;
            }
        }
    }

    .iplayer-fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
</style>
