<template>
    <div
        class="btn btn-outline-secondary"
        @click="!isSubscriber ? $emit('openSubscribe', channel) : () => {}"
        :class="{ 'btn-secondary text-dark': isSubscriber }"
    >
        <i class="fa-solid fa-star"></i>&nbsp;Subscribe<span v-if="isSubscriber">d</span>
    </div>
</template>

<script>
    export default {
        computed: {
            isSubscriber () {
                if (this.authUser === null) {
                    return false;
                }
                for (let i = 0; i < this.authUser.subscriptions.length; i++) {
                    let subscription = this.authUser.subscriptions[i];
                    if (subscription.channel.id === this.channel.id) {
                        return true;
                    }
                }
                return false;
            }
        },
        props: [
            'authUser',
            'channel',
        ],
    };
</script>
