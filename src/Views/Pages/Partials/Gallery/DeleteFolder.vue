<template>
    <Popup
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-light' },
            { text: 'Delete Folder', action: confirm, type: 'danger' },
        ]"
    >
        Are you sure you want to delete {{ folder.name }}? This cannot be undone!
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import DeleteFolderRequest from "../../../../Requests/DeleteFolderRequest";
    import Server from "../../../../Servers/Server";

    export default {
        components: {
            Popup,
        },
        data () {
            return {
                deleteFolderRequest: new DeleteFolderRequest(this.folder.id),
            }
        },
        methods: {
            confirm () {
                this.deleteFolderRequest.submitTo(Server.getInstance())
                    .then(() => {
                        this.$emit('success', this.folder.id);
                    });
            },
        },
        props: ['folder'],
    }
</script>
