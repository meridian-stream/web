<template>
    <div class="btn btn-outline-primary" :class="{ 'bg-primary text-dark': channel.auth_user.follows }" @click="follow(channel.auth_user.follows)">
        <i class="fa-solid fa-user-plus"></i>&nbsp;Follow
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
                            this.channel.auth_user.follows = true;
                        })
                } else {
                    (new DeleteFollowRequest(this.channel.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.channel.auth_user.follows = false;
                        })
                }
            }
        },
        props: [
            'channel',
        ],
    };
</script>
