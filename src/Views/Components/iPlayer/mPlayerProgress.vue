<template>
    <div class="mPlayer-progress-container" @mousemove="mouseMove" @mouseleave="mouseLeave" @click="mouseClick">
        <div class="mPlayer-progress">
            <div
                v-if="tempProgress > 0"
                :style="{ 'width': tempProgress + '%' }"
                class="mPlayer-progress-hover"
            ></div>
            <div
                :style="{ 'width': progress + '%' }"
                class="mPlayer-progress-progress"
            ></div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tempProgress: 0,
            };
        },
        methods: {
            mouseClick(e) {
                this.$emit('trackTo', this.tempProgress);
            },
            mouseMove(e) {
                let percent = e.offsetX / e.target.offsetWidth * 100
                this.tempProgress = percent;
            },
            mouseLeave(e) {
                this.tempProgress = 0;
            },
        },
        props: [
            'progress',
        ]
    }
</script>

<style>
    .mPlayer-progress-container {
        position: absolute;
        left: 0;
        bottom: 3rem;
        width: 100%;
        height: 1rem;
        cursor: pointer;

        .mPlayer-progress {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 0.25rem;
            background-color: rgba(255, 255, 255, 0.33);
            pointer-events: none;

            .mPlayer-progress-hover {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.33);
                pointer-events: none;
            }

            .mPlayer-progress-progress {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
                height: 100%;
                background-color: #7c3ea3;
                pointer-events: none;
            }
        }
    }
</style>
