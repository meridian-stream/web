<template>
    <div class="btn btn-outline-primary" :class="{ 'bg-primary text-white': channel.auth_user.follows }" @click="follow(channel.auth_user.follows)">
        <i class="fa-solid fa-user-plus"></i>&nbsp;{{ channel.auth_user.follows ? 'Following' : 'Follow' }}
    </div>
</template>

<script>
    import CreateFollowRequest from "../../../Requests/CreateFollowRequest";
    import Server from "../../../Servers/Server";
    import DeleteFollowRequest from "../../../Requests/DeleteFollowRequest";
    import Unauthorised from "../../../Core/Responses/Unauthorised";

    export default {
        methods: {
            follow(alreadyFollows) {
                if (!alreadyFollows) {
                    (new CreateFollowRequest(this.channel.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.channel.auth_user.follows = true;
                        })
                        .catch(error => {
                            if (error instanceof Unauthorised) {
                                this.$emit('openLogin');
                            }
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
