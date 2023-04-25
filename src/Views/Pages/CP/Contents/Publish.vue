<template>
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <label for="published_at_date" class="col-4 text-end">
                    Published<br>
                    <p class="small text-muted">Tell us what time your content should be published</p>
                </label>
                <div class="col-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="is_published" v-model="showDates">
                    </div>
                    <div class="row mt-2" v-if="showDates">
                        <div class="col-6">
                            <input type="date" id="published_at_date" name="published_at_date" class="form-control" v-model="publishedAtDate">
                        </div>
                        <div class="col-6">
                            <input type="time" id="published_at_time" name="published_at_time" class="form-control" v-model="publishedAtTime">
                        </div>
                        <SpecificError :field="'published_at'" :form="publishContentRequest" v-if="publishContentRequest !== null"></SpecificError>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-8 offset-4">
                    <button class="btn btn-outline-primary" @click="update" v-html="publishContentRequest?.isLoading ?? false ? '<i class=\'fa-solid fa-pulse fa-spinner\'></i>' : 'Save'"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GetContentRequest from "../../../../Requests/GetContentRequest";
    import Server from "../../../../Servers/Server";
    import PublishContentRequest from "../../../../Requests/PublishContentRequest";
    import GeneralErrors from "../../../Components/Form/GeneralErrors.vue";
    import SpecificError from "../../../Components/Form/SpecificError.vue";

    export default {
        components: {
            GeneralErrors,
            SpecificError,
        },
        data () {
            return {
                publishedAt: new Date(),
                publishedAtDate: null,
                publishedAtTime: null,
                publishContentRequest: null,
                showDates: false,
            }
        },
        methods: {
            update () {
                this.publishContentRequest = new PublishContentRequest(this.$route.params.contentId);
                if (this.showDates) {
                    this.publishContentRequest.published_at = this.publishedAtDate + ' ' + this.publishedAtTime;
                } else {
                    this.publishContentRequest.published_at = null;
                }
                this.publishContentRequest.submitTo(Server.getInstance())
                    .then(content => {

                    })
            },
        },
        mounted () {
            (new GetContentRequest(this.$route.params.contentId)).submitTo(Server.getInstance())
                .then(content => {
                    let publishedAt = new Date(content.published_at);

                    if (content.published_at !== null) {
                        this.showDates = true;
                        this.publishedAt = publishedAt;
                        this.publishedAtDate = publishedAt.getFullYear() + '-' + (publishedAt.getMonth() < 9 ? '0' + (publishedAt.getMonth() + 1) : (publishedAt.getMonth() + 1)) + '-' + publishedAt.getUTCDate();
                        this.publishedAtTime = publishedAt.getUTCHours() + ':' + (publishedAt.getUTCMinutes() < 10 ? '0' + publishedAt.getUTCMinutes() : publishedAt.getUTCMinutes());
                    }
                })
        },
    }
</script>
