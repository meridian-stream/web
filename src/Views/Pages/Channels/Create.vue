<template>
    <div class="container py-2">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h1 class="text-center">Create Channel</h1>
                        <p class="text-center">Ready to start uploading your content? We just need a few pieces of information to get you started.</p>
                        <div class="row mb-3">
                            <label for="name" class="col-4 col-form-label text-end">
                                Channel Name
                            </label>
                            <div class="col-8">
                                <input type="text" name="name" id="name" class="form-control" v-model="createChannelRequest.name">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="slug" class="col-4 col-form-label text-end">
                                Channel Slug<br>
                                <span class="small text-muted">Slugs can only contain the letters A-Z, a-z, numbers 0-9 and hyphens.</span>
                            </label>
                            <div class="col-8">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            {{ appUrl }}/channels/
                                        </span>
                                    </div>
                                    <input type="text" name="slug" id="slug" class="form-control" v-model="createChannelRequest.slug">
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="offset-4 col-8">
                                <button class="btn btn-outline-primary" @click="submit">Create Channel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateChannelRequest from "../../../Requests/CreateChannelRequest";
    import env from "../../../env";
    import Server from "../../../Servers/Server";

    export default {
        computed: {
            appUrl () {
                return env.url;
            },
        },
        data () {
            return {
                createChannelRequest: new CreateChannelRequest,
            }
        },
        methods: {
            submit () {
                this.createChannelRequest.submitTo(Server.getInstance())
                    .then(channel => {
                        this.$router.push({
                            name: 'cp.channels.view',
                            params: {
                                id: channel.slug || channel.id,
                            },
                        })
                    })
            }
        },
        watch: {
            'createChannelRequest.name': {
                deep: true,
                handler: function (newValue, oldValue) {
                    if (oldValue !== newValue) {
                        let regExp = /[^0-9a-z-]/gi;
                        this.createChannelRequest.slug = newValue.replace(' ', '-').toLowerCase().replace(regExp, '');
                    }
                }
            }
        }
    }
</script>
