<template>
    <div class="mPlayer-video-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .mPlayer-video-container {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        padding-top: 56.25%;
        margin-top: -28.125%;

        .mPlayer-video {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
