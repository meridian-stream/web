<template>
    <div class="iplayer-controls">
        <div class="iplayer-control" @click="togglePlay">
            <i class="fa-solid fa-play fa-fw" v-if="!videoPlayer.element.paused"></i>
            <i class="fa-solid fa-pause fa-fw" v-if="videoPlayer.element.paused"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'section',
            'videoPlayer',
        ],
        methods: {
            togglePlay () {
                this.$emit('togglePlay');
            },
        },
    };
</script>

<style>
    .iplayer-controls {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, 0.66);
        color: rgba(255, 255, 255, 0.66);

        .iplayer-control {
            position: absolute;
            left: 0;
            top: 0;
            width: 3rem;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
        }

        .iplayer-control:hover {
            color: #7c3ea3;
        }
    }
</style>
