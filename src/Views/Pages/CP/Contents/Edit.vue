<template>
    <div class="card">
        <div class="card-body" v-if="cOUContentRequest !== null">
            <div class="row mb-3">
                <label for="title" class="col-12 col-md-4 text-md-end col-form-label">
                    Title<br>
                    <p class="small text-muted">First, let's come up with a title for your new content. E.g "A relaxing hospital exam"</p>
                </label>
                <div class="col-12 col-md-8">
                    <input type="text" id="title" name="title" class="form-control" v-model="cOUContentRequest.title">
                </div>
            </div>
            <div class="row mb-3" v-if="cOUContentRequest.id !== 'new'">
                <label for="image_id" class="col-12 col-md-4 text-md-end col-form-label">
                    Cover image<br>
                    <p class="small text-muted">We'll display this as a preview of your video.</p>
                </label>
                <div class="col-12 col-md-8">
                    <div style="position: relative; width: 100%; padding-top: 56.25%" v-if="cOUContentRequest.image !== null && cOUContentRequest.image_id !== null">
                        <Image :key="cOUContentRequest.image" :src="cOUContentRequest.image.url"></Image>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-outline-primary me-2" @click="$emit('openGallery', channel.folder, true, (image) => { cOUContentRequest.image = image; cOUContentRequest.image_id = image.id; })">
                            {{ cOUContentRequest.image_id === null ? 'Select' : 'Change' }}
                        </button>
                        <button class="btn btn-outline-danger" v-if="cOUContentRequest.image_id !== null" @click="cOUContentRequest.image = { id: null }; cOUContentRequest.image_id = null;">Remove</button>
                    </div>
                    <input type="text" id="image_id" name="image_id" class="d-none form-control" v-model="cOUContentRequest.image_id" @click="$emit('openGallery', channel.folder, true, (image) => { cOUContentRequest.image = image; cOUContentRequest.image_id = image.id; })">
                </div>
            </div>
            <div class="row mb-3" v-if="cOUContentRequest.id !== 'new'">
                <label for="video_id" class="col-12 col-md-4 text-md-end col-form-label">
                    Video<br>
                    <p class="small text-muted">The focus of your content!</p>
                </label>
                <div class="col-12 col-md-8">
                    <video v-if="cOUContentRequest.video_id !== null" :src="cOUContentRequest.video?.url" :key="cOUContentRequest.video_id" style="width: 100%" controls></video>
                    <div class="mb-3">
                        <button class="btn btn-outline-primary me-2" @click="$emit('openGallery', channel.folder, true, (video) => { cOUContentRequest.video = video; cOUContentRequest.video_id = video.id })">
                            {{ cOUContentRequest.video_id === null ? 'Select' : 'Change' }}
                        </button>
                        <button class="btn btn-outline-danger" v-if="cOUContentRequest.video_id !== null" @click="cOUContentRequest.video = { id: null }; cOUContentRequest.video_id = null;">Remove</button>
                    </div>
                    <input type="text" id="video_id" name="video_id" class="d-none form-control" v-model="cOUContentRequest.video_id" @click="$emit('openGallery', channel.folder, true, (video) => { cOUContentRequest.video = video; cOUContentRequest.video_id = video.id; })">
                </div>
            </div>
            <div class="row mb-3" v-if="cOUContentRequest.id !== 'new'">
                <label for="is_listed" class="col-12 col-md-4 text-md-end">
                    Is listed
                    <p class="small text-muted">If unchecked, this content won't appear on the home page</p>
                </label>
                <div class="col-12 col-md-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="is_listed" v-model="cOUContentRequest.is_listed">
                    </div>
                </div>
            </div>
            <div class="row mb-3" v-if="cOUContentRequest.id !== 'new'">
                <label for="is_subscribers_only" class="col-12 col-md-4 text-md-end">
                    Is subscribers only
                    <p class="small text-muted">If checked, this content will only be available for your subscribers</p>
                </label>
                <div class="col-12 col-md-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="is_subscribers_only" v-model="cOUContentRequest.is_subscribers_only">
                    </div>
                </div>
            </div>
            <div class="row mb-3" v-if="cOUContentRequest.id !== 'new'">
                <label for="tags" class="col-12 col-md-4 text-md-end col-form-label">Tags</label>
                <div class="col-12 col-md-8">
                    <Tags :tags="cOUContentRequest.tags"></Tags>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-8 offset-4">
                    <button class="btn btn-outline-primary" @click="save">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateContentRequest from "../../../../Requests/CreateContentRequest";
    import UpdateContentRequest from "../../../../Requests/UpdateContentRequest";
    import GetContentRequest from "../../../../Requests/GetContentRequest";
    import Server from "../../../../Servers/Server";
    import Tags from "../../../Components/Tags/Tags.vue";
    import Image from "../../../Components/Image/Image.vue";

    export default {
        components: {
            Image,
            Tags,
        },
        data () {
            return {
                cOUContentRequest: null,
                getTagsRequest: null,
            }
        },
        methods: {
            save () {
                this.cOUContentRequest.submitTo(Server.getInstance())
                    .then(content => {
                        this.cOUContentRequest = new UpdateContentRequest(content);
                    })
            }
        },
        mounted () {
            console.log(this.channel);
            if (this.$route.params.contentId === 'new') {
                this.cOUContentRequest = new CreateContentRequest(this.channel.id, this.$route.params.contentId);
            } else {
                (new GetContentRequest(this.$route.params.contentId)).submitTo(Server.getInstance())
                    .then(content => {
                        this.cOUContentRequest = new UpdateContentRequest(content)
                    })
            }
        },
        props: [
            'authUser',
            'channel',
        ],
    }
</script>
