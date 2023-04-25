<template>
    <div class="btn btn-outline-primary" :class="{ 'bg-primary text-white': channel.authUser.follows }" @click="follow(channel.authUser.follows)">
        <i class="fa-solid fa-user-plus"></i>&nbsp;{{ channel.authUser.follows ? 'Following' : 'Follow' }}
    </div>
</template>

<script>
    import CreateFollowRequest from "../../../Requests/CreateFollowRequest";
    import Server from "../../../Servers/Server";
    import DeleteFollowRequest from "../../../Requests/DeleteFollowRequest";

    export default {
        methods: {
            follow(alreadyFollows) {
                if (!alreadyFollows) {
                    (new CreateFollowRequest(this.channel.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.channel.authUser.follows = true;
                        })
                } else {
                    (new DeleteFollowRequest(this.channel.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.channel.authUser.follows = false;
                        })
                }
            }
        },
        props: [
            'channel',
        ],
    };
</script>
