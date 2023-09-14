<template>
    <div class="image-loading" v-if="url === null && showLoader"><i class="fa-solid fa-spinner fa-pulse"></i></div>
    <div
        :alt="alt"
        :class="{ show: url !== null }"
        :style="{ backgroundImage: 'url(' + url + ')'}"
        class="image"
        role="img"
    ></div>
</template>

<script>
    export default {
        computed: {
            delayTime() {
                if (typeof this.delay === 'undefined') {
                    return 1;
                }
                return this.delay;
            }
        },
        data () {
            return {
                image: null,
                showLoader: false,
                url: null,
            };
        },
        mounted() {
            const load = () => {
                setTimeout(() => {
                    this.showLoader = true
                }, 125)
                setTimeout(() => {
                    this.image = new Image;
                    this.image.onload = () => {
                        this.url = this.image.src;
                    };
                    this.image.src = this.src;
                }, this.delayTime);
            }

            let containerY = this.$el.parentElement.getBoundingClientRect().y;
            if (containerY < window.innerHeight) {
                load();
            } else {
                document.getElementById('app').addEventListener('scroll', e => {
                    if (containerY < window.innerHeight + e.target.scrollTop) {
                        load();
                    }
                });
            }
        },
        props: [
            'alt',
            'delay',
            'src',
        ],
    }
</script>

<style lang="scss" scoped>
    .image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        opacity: 0;
        transition: opacity 0.125s linear;
    }
    .image.show {
        opacity: 1;
    }
    .image-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -32px;
        margin-top: -32px;
        width: 64px;
        height: 64px;
        text-align: center;
        line-height: 64px;
        font-size: 1rem;
    }
</style>
