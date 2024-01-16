<template>
    <div
        :class="{ 'mPlayer-fullscreen': videoPlayer.fullscreen }"
        class="mPlayer"
    >
        <mPlayerVideo>
            <video
                :id="videoPlayer.id"
                class="mPlayer-video"
                muted
            ></video>
        </mPlayerVideo>
        <mPlayerChoices
            @chosen="chooseSection"
            :choices="choices"
        ></mPlayerChoices>
        <mPlayerProgress
            @trackTo="trackTo"
            :progress="this.videoPlayer.progress / this.videoPlayer.duration * 100"
        ></mPlayerProgress>
        <mPlayerControls
            @setSoundVolume="v => { this.videoPlayer.element.volume = v; this.videoPlayer.volumeSound = v }"
            @setMusicVolume="null"
            @toggleFullscreen="videoPlayer.fullscreen = !videoPlayer.fullscreen"
            @togglePlay="togglePlay"
            :videoPlayer="videoPlayer"
        ></mPlayerControls>
    </div>
</template>

<script>
    import { v4 } from 'uuid';
    import mPlayerVideo from './mPlayerVideo.vue';
    import mPlayerControls from './mPlayerControls.vue'
    import mPlayerProgress from './mPlayerProgress.vue'
    import mPlayerChoices from './mPlayerChoices.vue'

    export default {
        components: {
            mPlayerVideo,
            mPlayerControls,
            mPlayerProgress,
            mPlayerChoices,
        },
        data () {
            return {
                choices: [],
                nextSection: null,
                section: null,
                videoPlayer: {
                    id: v4(),
                    duration: 0,
                    element: null,
                    fullscreen: false,
                    playInterval: null,
                    paused: false,
                    progress: 0,
                    volumeSound: 50,
                    volumeMusic: 50,
                },
            };
        },
        methods: {
            chooseSection (sectionId) {
                this.playSection(this.getSection(sectionId));
                this.choices = [];
            },
            getFirstSection () {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].is_first) {
                        return this.content.sections[i];
                    }
                }
                throw new Error('No first section :S')
            },
            getSection (id) {
                for (let i = 0; i < this.content.sections.length; i++) {
                    if (this.content.sections[i].id === id) {
                        return this.content.sections[i];
                    }
                }
                throw new Error('Not section with id "' + id + '".')
            },
            playSection (section) {
                this.section = section;

                // We set the video player to play this section's video
                this.videoPlayer.element.src = this.section.video.url;
                // We need to delay getting the video duration a little because it might not have retrieved the file
                // TODO Find a callback we can register instead of doing this arbitrary workaround
                setTimeout(() => {
                    this.videoPlayer.duration = this.videoPlayer.element.duration;
                    // Play and unmute the content (in that order). Browsers won't allow you to play unmuted content
                    // for pretty good reasons, so we have to do this little workaround.
                    this.videoPlayer.element.play();
                    this.videoPlayer.paused = false;
                    this.videoPlayer.element.muted = false;
                }, 100);

                // Work out if this is the final section
                if (this.section.destination === null) {
                    this.nextSection = null;
                } else {
                    // If it's not, preload the next section so we know what choices to make
                    this.nextSection = this.getSection(this.section.destination);
                }

                // Whenever a video is set to play
                this.videoPlayer.element.addEventListener('play', () => {
                    // Start this loop
                    this.videoPlayer.playInterval = setInterval(() => {
                        // Update the progress bar. This has to be forged because Vue won't react to video progress like
                        // it does to everything else
                        this.videoPlayer.progress = this.videoPlayer.element.currentTime;

                        let videoWithinNSecondsOfEnd = this.videoPlayer.element.currentTime > this.videoPlayer.element.duration - 10;
                        let nextSectionIsAChoice = this.nextSection !== null && this.nextSection.type === 2;
                        if (videoWithinNSecondsOfEnd && nextSectionIsAChoice) {
                            // Show the choices for the next section
                            this.choices = this.nextSection.choices;
                        } else {
                            // Hide the choices
                            this.choices = [];
                        }
                    }, 200);
                });

                // Whenever we pause a video, clear the loop from the play handler above
                this.videoPlayer.element.addEventListener('pause', () => {
                    clearInterval(this.videoPlayer.playInterval);
                })

                // When a video ends...
                this.videoPlayer.element.addEventListener('ended', () => {
                    // Determine if this is the end of the content
                    if (this.section.destination === null) {
                        // TODO We should emit an event here to say the content has finished so the parent page can load
                        // the next piece of content so that we can have endless ASMR forever instead of user-intervention
                    } else {
                        // TODO At the moment we're taking the first choice and assuming that's the default.
                        // We should add a field on the database to allow the creator to determine what the default
                        // choice is
                        this.playSection(this.getSection(this.choices[0].destination));
                    }
                    this.videoPlayer.paused = true;
                });
            },
            togglePlay () {
                if (this.videoPlayer.element.paused) {
                    this.videoPlayer.element.play();
                    // We have to set this because vue won't track the state of the video reliably
                    this.videoPlayer.paused = false;
                } else {
                    this.videoPlayer.element.pause();
                    // We have to set this because vue won't track the state of the video reliably
                    this.videoPlayer.paused = true;
                }
            },
            trackTo (progress) {
                let time = this.videoPlayer.element.duration / 100 * progress;
                this.videoPlayer.element.currentTime = time;
            }
        },
        mounted () {
            // Mounted the elements we need
            this.videoPlayer.element = document.getElementById(this.videoPlayer.id);

            // Play the first section
            this.playSection(this.getFirstSection());
        },
        props: [
            'content',
        ],
    };
</script>

<style>
    .mPlayer {
        position: relative;
        padding-top: 56.25%;
        background-color: rgba(0, 0, 0, 1);
    }

    .mPlayer-fullscreen {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>
