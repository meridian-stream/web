<template>
    <div class="content-card card bg-dark mb-3">
        <div class="content-card-image-container" @click="$router.push({ name: 'contents.view', params: { id: content.id } })">
            <Image :src="content.image.url" :alt="content.title"></Image>
            <div class="content-card-duration small">00:34:03</div>
            <div class="content-card-subscribers-only text-secondary" v-if="content.is_subscribers_only">
                <i class="fa-solid fa-lock"></i>
            </div>
        </div>
        <div class="card-body pt-0 pb-2 px-2">
            <div class="row">
                <div class="col-12 text-nowrap">
                    <ChannelBadge v-if="content.channel.image !== null" :channel="content.channel" class="float-start me-2" style="margin-top: -2rem;"></ChannelBadge>
                    <router-link :to="{ name: 'channels.view', params: { id: content.channel.slug || content.channel.id } }">
                        <span class="small text-muted">
                            {{ content.channel.name }}
                        </span>
                    </router-link>
                    <router-link :to="{ name: 'contents.view', params: { id: content.id } }">
                        <h3>{{ content.title }}</h3>
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-8 content-card-tags">
                    <Tags :tags="content.tags"></Tags>
                </div>
                <Stars class="stars col-4 small text-end" :content="content"></Stars>
            </div>
        </div>
    </div>
</template>

<script>
    import Image from "../Image/Image.vue";
    import Stars from "../Stars/Stars.vue";
    import ChannelBadge from "../ChannelBadge/ChannelBadge.vue";
    import Tags from "../Tags/Tags.vue";

    export default {
        components: {
            Image,
            Stars,
            ChannelBadge,
            Tags,
        },
        props: [
            'content',
        ],
    };
</script>

<style lang="scss">
    .content-card {
        position: relative;

        a {
            text-decoration: none;
            color: inherit;
        }

        .content-card-image-container {
            position: relative;
            overflow: hidden;
            padding-top: 56.25%;

            :hover {
                cursor: pointer;
            }

            .content-card-duration {
                position: absolute;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.75);
                padding: 0.25rem;
                border-top-left-radius: 1rem;
            }

            .content-card-subscribers-only {
                position: absolute;
                right: 0;
                top: 0;
                padding: 0.5rem;
                background-color: rgba(0, 0, 0, 0.75);
                border-bottom-left-radius: 1rem;
            }
        }

        .card-body {
            .content-card-tags {
                white-space: nowrap;
                overflow-x: auto;
            }

            h3 {
                font-size: 1rem;
                line-height: 2rem;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 0;
            }
        }
    }
</style>
