<template>
    <div class="card">
        <div class="card-body text-center">
            <ChannelBadge
                :channel="channel"
                :size="'large'"
                class="mb-3"
            ></ChannelBadge><br>
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'channels.view', params: { id: channel.slug || channel.id } }"><h3>{{ channel.name }}</h3></router-link>
        </div>
    </div>
</template>

<script>
    import ChannelBadge from "@/Views/Components/ChannelBadge/ChannelBadge.vue";

    export default {
        components: {ChannelBadge},
        props: [
            'channel',
        ]
    }
</script>
