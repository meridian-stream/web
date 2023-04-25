<template>
    <h2>Settings</h2>
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <label for="name" class="col-12 col-md-4 text-md-end col-form-label">
                    Channel Name
                    <p class="small text-muted">This is your channel name. If you wish to change this, please contact us.</p>
                </label>
                <div class="col-12 col-md-8">
                    <input type="text" name="name" id="name" class="form-control" :value="channel.name" disabled>
                </div>
            </div>
            <div class="row mb-3">
                <label for="slug" class="col-12 col-md-4 text-md-end col-form-label">
                    Channel Slug
                    <p class="small text-muted">You channel slug is used in the URL of your channel.</p>
                </label>
                <div class="col-12 col-md-8">
                    <input type="text" name="slug" id="slug" class="form-control" :value="channel.slug" disabled>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-12 col-md-4 col-form-label text-md-end">
                    Channel Image
                    <p class="small text-muted">Your channel image will be displayed anywhere your content is.</p>
                </label>
                <div class="col-12 col-md-8">
                    <div class="user-profile-pic" @click="$emit('openGallery', channel.folder, true, onImageSelected)">
                        <Image :src="imageUrl" :key="imageUrl"></Image>
                    </div>
                    <br>
                    <button class="btn btn-outline-secondary" @click="$emit('openGallery', channel.folder, true, onImageSelected)">Change Image</button>
                </div>
            </div>
            <div class="row mb-3">
                <label for="about" class="col-12 col-md-4 text-md-end col-form-label">
                    About
                    <p class="small text-muted">Displayed on your channel page, describe your channel here.</p>
                </label>
                <div class="col-12 col-md-8">
                    <textarea type="text" name="about" id="about" class="form-control" v-model="updateChannelRequest.about"></textarea>
                </div>
            </div>
            <div class="row mb-3">
                <label for="tagline" class="col-12 col-md-4 text-md-end col-form-label">
                    Tagline
                    <p class="small text-muted">The tagline is displayed under your name on your channel.</p>
                </label>
                <div class="col-12 col-md-8">
                    <input type="text" name="tagline" id="tagline" class="form-control" v-model="updateChannelRequest.tagline">
                </div>
            </div>
            <div class="row mb-3">
                <label for="enticement" class="col-12 col-md-4 text-md-end col-form-label">
                    Enticement
                    <p class="small text-muted">Displayed on the subscribe popup, tell users why they should subscribe to you.</p>
                </label>
                <div class="col-12 col-md-8">
                    <input type="text" name="enticement" id="enticement" class="form-control" v-model="updateChannelRequest.enticement">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 col-md-8 offset-md-4 text-center text-md-end">
                    <button class="btn btn-outline-primary" @click="submit">
                        <i class="fa-solid fa-spinner fa-pulse" v-if="updateChannelRequest.isLoading"></i>
                        <span v-if="!updateChannelRequest.isLoading">Update</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UpdateChannelRequest from "../../../Requests/UpdateChannelRequest";
    import Image from "../../Components/Image/Image.vue";
    import Server from "../../../Servers/Server";

    export default {
        components: {
            Image,
        },
        computed: {
            imageUrl () {
                if (this.imageOverride !== null) {
                    return this.imageOverride;
                }

                if (this.channel !== null && this.channel.image !== null) {
                    return this.channel.image.url;
                }

                return '/images/user-placeholder.png';
            },
        },
        data () {
            return {
                imageOverride: null,
                updateChannelRequest: new UpdateChannelRequest(this.$route.params.id, this.channel),
            }
        },
        methods: {
            onImageSelected (image) {
                this.imageOverride = image.url;
                this.updateChannelRequest.image_id = image.id;
            },
            submit () {
                this.updateChannelRequest.submitTo(Server.getInstance())
                    .then(channel => {
                        this.$emit('channelUpdated', channel);
                    })
            },
        },
        props: [
            'authUser',
            'channel',
        ]
    }
</script>
