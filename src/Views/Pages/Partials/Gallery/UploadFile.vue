<template>
    <Popup>
        <p>Please ensure that...</p>
        <ul>
            <li>Videos do not exceed 1 hour in length</li>
            <li>Videos do not exceed 60 GiB</li>
            <li>You have permission to share/reproduce the content you're uploaded</li>
        </ul>
        <div id="file-upload" class="dropzone">
            <div class="dz-message">Click here or drag files to upload</div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import { Dropzone } from "dropzone";
    import Server from "../../../../Servers/Server";
    import env from "../../../../env";

    export default {
        components: {
            Popup,
        },
        methods: {

        },
        mounted() {
            this.dropzone = new Dropzone('#file-upload', {
                accept: (file, done) => {
                    done();
                },
                chunking: true,
                chunkSize: 4194304, // 4MiB, we don't want to go much higher than this
                forceChunking: true,
                headers: {
                    Authorization: Server.getAPIKey().value,
                },
                parallelUploads: 1,
                parallelChunkUploads: false,
                paramName: "file", // The name that will be used to transfer the file
                // params: {
                //     process: this.shouldProcess,
                // },
                maxFiles: 1,
                maxFilesize: 64424509440, // 1 GiB per minute for 60 minutes
                retryChunks: true,
                retryChunksLimit: 3,
                sending: (file, xhr, formData) => {
                    // formData.append('process', true);
                    // if (isSecret) {
                    //     formData.append('secret', true);
                    // }
                },
                success: (file, response) => {
                    this.$emit('success', response.data);
                },
                url: env.api.endpoint + '/folders/' + this.folder.id + '/files',
                acceptedFiles: 'image/*,video/mp4,video/quicktime',
            });
        },
        props: [
            'folder',
        ],
    };
</script>
