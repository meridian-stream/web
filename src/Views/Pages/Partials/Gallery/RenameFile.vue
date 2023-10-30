<template>
    <Popup
        :buttons="[
            // { text: 'Close', action: () => { $emit('close') }, type: 'dark text-light' },
            { text: 'Rename File', action: confirm, type: 'danger' },
        ]"
    >
        <GeneralErrors :form="updateFileRequest"></GeneralErrors>
        <div class="row">
            <label for="name" class="col-4 col-form-label text-end">Name</label>
            <div class="col-8">
                <input type="text" name="name" id="name" class="form-control" v-model="updateFileRequest.nice_name">
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import Server from "../../../../Servers/Server";
    import GeneralErrors from "../../../Components/Form/GeneralErrors.vue";
    import UpdateFileRequest from "../../../../Requests/UpdateFileRequest";

    export default {
        components: {
            Popup,
            GeneralErrors,
        },
        data () {
            return {
                updateFileRequest: new UpdateFileRequest(this.file.id, this.file.nice_name),
            }
        },
        methods: {
            confirm () {
                this.updateFileRequest.submitTo(Server.getInstance())
                    .then(file => {
                        this.$emit('success', file);
                    });
            },
        },
        mounted() {
            setTimeout(() => {
                this.$el.getElementsByClassName('form-control')[0].focus();
            }, 250);
        },
        props: ['file'],
    }
</script>
