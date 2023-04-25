<template>
    <div class="container py-2">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h1>Profile</h1>
                        <div class="row mb-3">
                            <label for="name" class="col-4 col-form-label text-end">Name</label>
                            <div class="col-8">
                                <input type="text" name="name" id="name" class="form-control" v-model="updateUserRequest.name">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-4 col-form-label text-end">Profile picture</label>
                            <div class="col-8">
                                <div class="user-profile-pic" @click="$emit('openGallery', authUser.folder, true, onImageSelected)">
                                    <Image :src="imageUrl" :key="imageUrl"></Image>
                                </div>
                                <br>
                                <button class="btn btn-outline-secondary" @click="$emit('openGallery', authUser.folder, true, onImageSelected)">Change Image</button>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-8 offset-4">
                                <button class="btn btn-outline-primary" @click="submit">
                                    <i class="fa-solid fa-spinner fa-pulse" v-if="updateUserRequest.isLoading"></i>
                                    <span v-if="!updateUserRequest.isLoading">Update</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Image from "../Components/Image/Image.vue";
    import UpdateUserRequest from "../../Requests/UpdateUserRequest";
    import Server from "../../Servers/Server";

    export default {
        components: {
            Image,
        },
        computed: {
            imageUrl () {
                if (this.imageOverride !== null) {
                    return this.imageOverride;
                }

                if (this.authUser !== null && this.authUser.image !== null) {
                    return this.authUser.image.url;
                }

                return '/images/user-placeholder.png';
            },
        },
        data () {
            return {
                imageOverride: null,
                updateUserRequest: new UpdateUserRequest,
            };
        },
        emits: [
            'openGallery',
        ],
        methods: {
            onImageSelected (image) {
                this.imageOverride = image.url;
                this.updateUserRequest.image_id = image.id;
                // console.log('image is', image);
                // this.authUser.image = image;
            },
            submit () {
                this.updateUserRequest.submitTo(Server.getInstance())
                    .then(user => {
                        this.$emit('setUser', user);
                    });
            },
        },
        mounted () {
            if (this.authUser !== null) {
                this.updateUserRequest = new UpdateUserRequest(
                    this.authUser.id,
                    this.authUser.name,
                    this.authUser.image_id
                )
            }
        },
        props: [
            'authUser',
        ],
        watch: {
            authUser () {
                if (this.authUser !== null) {
                    this.updateUserRequest = new UpdateUserRequest(
                        this.authUser.id,
                        this.authUser.name,
                        this.authUser.image_id
                    )
                }
            },
        },
    };
</script>

<style>
    .user-profile-pic {
        overflow: hidden;
        position: relative;
        border-radius: 64px;
        width: 128px;
        height: 128px;
    }
</style>
