<template>
    <div class="btn-group">
        <div class="btn btn-outline-primary" :class="{ 'bg-primary text-dark': content.authUser.likes }" @click="like(content.authUser.likes)">
            <i class="fa-solid fa-thumbs-up" :class="{ 'text-white': content.authUser.likes }"></i>
        </div>
        <div class="btn btn-outline-primary" :class="{ 'bg-primary text-dark': content.authUser.dislikes }" @click="dislike(content.authUser.dislikes)">
            <i class="fa-solid fa-thumbs-down" :class="{ 'text-white': content.authUser.dislikes }"></i>
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
                            this.content.authUser.likes = true;
                            this.content.authUser.dislikes = false;
                        })
                } else {
                    (new DeleteLikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.authUser.likes = false;
                            this.content.authUser.dislikes = false;
                        });
                }
            },
            dislike (alreadyDislikes) {
                if (!alreadyDislikes) {
                    (new CreateDislikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.authUser.likes = false;
                            this.content.authUser.dislikes = true;
                        })
                } else {
                    (new DeleteDislikeRequest(this.content.id)).submitTo(Server.getInstance())
                        .then(() => {
                            this.content.authUser.likes = false;
                            this.content.authUser.dislikes = false;
                        });
                }
            },
        }
    };
</script>
