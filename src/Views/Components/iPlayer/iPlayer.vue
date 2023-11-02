<template>
    <div class="iplayer">
        <div class="iplayer-video-wrapper">
            <video
                :id="videoPlayer.id"
                class="iplayer-video"
                muted
            ></video>
        </div>
        <div class="iplayer-choices" v-if="choices.length > 0">
            <div class="iplayer-choice" v-for="(choice, i) in choices" @click="doChoice(choice)">{{ choice.label }}</div>
        </div>
        <iPlayerControls
            @click="togglePlay"
            v-if="section !== null"
            :section="section"
            :videoPlayer="videoPlayer"
        ></iPlayerControls>
    </div>
</template>

<script>
    import { v4 } from 'uuid';
    import env from "@/env.js";
    import iPlayerControls from './iPlayerControls.vue'

    export default {
        components: {
            iPlayerControls,
        },
        data () {
            return {
                audioPlayer: {
                    id: v4(),
                    element: null,
                },
                videoPlayer: {
                    id: v4(),
                    element: null,
                    playInterval: null,
                },
                choices: [],
                section: null,
            };
        },
        methods: {
            togglePlay () {
                this.videoPlayer.element.paused ? this.videoPlayer.element.play() : this.videoPlayer.element.pause();
            },
            doChoice(choice) {
                this.choices = [];
                this.section = this.getSection(choice.destination);
                this.loadVideoSection(this.section);
            },
            getFirstSection() {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].is_first) {
                        return this.content.sections[i];
                    }
                }
            },
            getSection(sectionId) {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].id === sectionId) {
                        return this.content.sections[i];
                    }
                }
            },
            loadVideoSection(section) {
                console.log('Handling section ' + section.label)

                // Load up next section
                this.videoPlayer.element.src = section.video.url;
                this.videoPlayer.element.play();
                this.videoPlayer.element.muted = env.env === 'local';

                this.videoPlayer.element.addEventListener('play', () => {
                    console.log('Playing...')

                    clearInterval(this.videoPlayer.playInterval);
                    this.videoPlayer.playInterval = setInterval(() => {
                        let isPlaying = !!(this.videoPlayer.element.currentTime > 0 && !this.videoPlayer.element.paused && !this.videoPlayer.element.ended && this.videoPlayer.element.readyState > 2);
                        if (isPlaying) {
                            let progress = this.videoPlayer.element.currentTime;
                            let duration = this.videoPlayer.element.duration;
                            console.log(progress + ' - ' + duration)
                            let nextSection = this.getSection(section.destination);
                            if (nextSection.type === 2) {
                                if (progress > duration - 30) {
                                    this.choices = nextSection.choices;
                                }
                            }
                        }
                    }, 1000);
                });

                this.videoPlayer.element.addEventListener('pause', () => {
                    console.log('Pausing...')
                });

                this.videoPlayer.element.addEventListener('ended', () => {
                    if (this.section.destination === null) {
                        alert('You\'ve reached the end');
                    } else {
                        let nextSection = this.getSection(this.section.destination);

                        if (nextSection.type === 1) { // Normal video
                            this.section = nextSection;
                            this.loadVideoSection(this.section);
                        } else if (nextSection.type === 2) {
                            // TODO Add default choice here
                            this.doChoice(nextSection.choices[0]);
                        } else {
                            console.log('Don\'t know what to do with section of type "' + nextSection.type + '"');
                        }
                    }
                });
            },
        },
        mounted () {
            console.log(this.content);

            this.audioPlayer.element = document.getElementById(this.audioPlayer.id);
            this.videoPlayer.element = document.getElementById(this.videoPlayer.id);

            this.section = this.getFirstSection();
            this.loadVideoSection(this.section);
        },
        props: [
            'content',
        ],
    }
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
