<template>
    <Popup
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-light' },
            { text: 'Rename Folder', action: confirm, type: 'danger' },
        ]"
    >
        <GeneralErrors :form="updateFolderRequest"></GeneralErrors>
        <div class="row">
            <label for="name" class="col-4 col-form-label text-end">Name</label>
            <div class="col-8">
                <input type="text" name="name" id="name" class="form-control" v-model="updateFolderRequest.name">
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import UpdateFolderRequest from "../../../../Requests/UpdateFolderRequest";
    import Server from "../../../../Servers/Server";
    import GeneralErrors from "../../../Components/Form/GeneralErrors.vue";

    export default {
        components: {
            Popup,
            GeneralErrors,
        },
        data () {
            return {
                updateFolderRequest: new UpdateFolderRequest(this.folder.id, this.folder.name),
            }
        },
        methods: {
            confirm () {
                this.updateFolderRequest.submitTo(Server.getInstance())
                    .then(folder => {
                        this.$emit('success', folder);
                    });
            },
        },
        mounted() {
            setTimeout(() => {
                this.$el.getElementsByClassName('form-control')[0].focus();
            }, 250);
        },
        props: ['folder'],
    }
</script>
