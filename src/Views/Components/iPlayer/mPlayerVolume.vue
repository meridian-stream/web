<template>
    <div class="mPlayer-volume-container" @mousemove="mouseMove" @mouseleave="mouseLeave" @click="mouseClick">
        <div class="mPlayer-volume">
            <div class="mPlayer-volume-hover" :style="{ 'height': tempVolume + '%' }"></div>
            <div class="mPlayer-volume-volume" :style="{ 'height': volume + '%' }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tempVolume: 75,
            };
        },
        methods: {
            mouseClick () {
                this.$emit('setVolume', this.tempVolume);
            },
            mouseLeave () {
                this.tempVolume = 0;
            },
            mouseMove (e) {
                let tempVolume = (128 - (e.offsetY - 8)) / (e.target.offsetHeight - 8) * 100;
                this.tempVolume = tempVolume;
            },
        },
        props: [
            'volume',
        ],
    };
</script>

<style lang="scss">
    .mPlayer-volume-container {
        position: absolute;
        left: 0;
        top: -8rem;
        width: 3rem;
        height: 8rem;
        background: rgba(0, 0, 0, 0.66);

        .mPlayer-volume {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 0.25rem;
            height: 6rem;
            margin-left: -0.125rem;
            margin-top: -3rem;
            background-color: rgba(255, 255, 255, 0.33);
            pointer-events: none;

            .mPlayer-volume-hover {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 50%;
                background-color: rgba(255, 255, 255, 0.33);
                pointer-events: none;
            }

            .mPlayer-volume-volume {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: #7c3ea3;
                pointer-events: none;
            }
        }
    }
</style>
