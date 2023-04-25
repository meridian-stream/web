<template>
    <div class="btn-group">
        <div class="btn btn-outline-primary" :class="{ 'bg-primary text-dark': content.auth_user.likes }" @click="like(content.auth_user.likes)">
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        <div class="btn btn-outline-primary" :class="{ 'bg-primary text-dark': content.auth_user.dislikes }" @click="dislike(content.auth_user.dislikes)">
            <i class="fa-solid fa-thumbs-down"></i>
        </div>
    </div>
</template>

<script>
    import CreateLikeRequest from "../../../Requests/CreateLikeRequest";
    import Server from "../../../Servers/Server";
    import DeleteLikeRequest from "../../../Requests/DeleteLikeRequest";
    import CreateDislikeRequest from "../../../Requests/CreateDislikeRequest";
    import DeleteDislikeRequest from "../../../Requests/DeleteDislikeRequest";

    export default {
        props: [
            'content',
        ],
        methods: {
            like (alreadyLikes) {
                if (!alreadyLikes) {
                    (new CreateLikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.auth_user.likes = true;
                            this.content.auth_user.dislikes = false;
                        })
                } else {
                    (new DeleteLikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.auth_user.likes = false;
                            this.content.auth_user.dislikes = false;
                        });
                }
            },
            dislike (alreadyDislikes) {
                if (!alreadyDislikes) {
                    (new CreateDislikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.auth_user.likes = false;
                            this.content.auth_user.dislikes = true;
                        })
                } else {
                    (new DeleteDislikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.auth_user.likes = false;
                            this.content.auth_user.dislikes = false;
                        });
                }
            },
        }
    };
</script>
