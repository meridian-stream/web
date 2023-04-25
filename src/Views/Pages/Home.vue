<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="py-2">
                    <h1 class="d-none">Home</h1>
                    <PaginatedContents
                        @openSubscribe="channel => { this.$emit('openSubscribe', channel) }"
                        :request="getContentsRequest"
                    ></PaginatedContents>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "../../Core/Views/Components/Form.vue";
    import GetContentsRequest from "../../Requests/GetContentsRequest";
    import PaginatedContents from "../Components/PaginatedContents/PaginatedContents.vue";

    export default {
        components: {
            Form,
            PaginatedContents,
        },
        data () {
            return {
                getContentsRequest: new GetContentsRequest,
            }
        },
        mounted () {
            if (this.$route.query.withRegister === 'true') {
                this.$emit('openRegister');
            }
        }
    }
</script>
