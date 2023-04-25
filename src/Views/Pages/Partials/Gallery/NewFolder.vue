<template>
    <Popup
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-light' },
            { text: 'Create Folder', action: submit, type: 'primary' },
        ]"
    >
        <div class="row">
            <div class="col-12">
                <GeneralErrors :form="createFolderRequest"></GeneralErrors>
            </div>
            <label for="name" class="col-4 col-form-label text-end">
                Folder name
            </label>
            <div class="col-8">
                <input type="text" maxlength="32" class="form-control" name="name" id="name" v-model="createFolderRequest.name">
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import CreateFolderRequest from "../../../../Requests/CreateFolderRequest";
    import Server from "../../../../Servers/Server";
    import GeneralErrors from "../../../Components/Form/GeneralErrors.vue";

    export default {
        components: {
            GeneralErrors,
            Popup,
        },
        data () {
            return {
                createFolderRequest: new CreateFolderRequest(this.folder.id),
            };
        },
        methods: {
            submit () {
                this.createFolderRequest.submitTo(Server.getInstance())
                    .then(folder => {
                        this.$emit('success', folder)
                    })
            },
        },
        mounted() {
            if (this.folder.channel_id !== null) {
                this.createFolderRequest.channel_id = this.folder.channel_id;
            }
            if (this.folder.user_id !== null) {
                this.createFolderRequest.user_id = this.folder.user_id;
            }

            setTimeout(() => {
                this.$el.getElementsByClassName('form-control')[0].focus();
            }, 250);
        },
        props: [
            'folder',
        ],
    };
</script>
