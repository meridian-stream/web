<template>
    <div
        @click="$router.push({ name: 'channels.view', params: { id: channel.slug || channel.id } })"
        class="channel-badge"
        :class="{ 'channel-badge-large': getSize === 'large', 'channel-badge-small': getSize === 'small' }"
        v-if="channel !== null"
    >
        <Image
            :src="channel.image.url"
        ></Image>
    </div>
</template>

<script>
    import Image from "../Image/Image.vue";

    export default {
        computed: {
            getSize () {
                if (typeof this.size === 'undefined') {
                    return 'medium';
                }
                if (['small', 'medium', 'large'].indexOf(this.size) < 0) {
                    return 'medium';
                }
                return this.size;
            },
        },
        components: {
            Image,
        },
        props: [
            'channel',
            'size',
        ],
    };
</script>

<style lang="scss" scoped>
    .channel-badge {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        border-radius: 32px;
        overflow: hidden;
        border: 4px solid #3F3F3F;

        :hover {
            cursor: pointer;
        }
    }

    .channel-badge-large {
        width: 128px;
        height: 128px;
        border-radius: 64px;
    }

    .channel-badge-small {
        width: 32px;
        height: 32px;
        border-radius: 16px;
    }
</style>
