<template>
    <div class="container py-2">
        <div class="row">
            <div class="col-12">
                <div v-if="documentBody !== null" v-html="markdown"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import env from "../../../env";
    import { marked } from 'marked';

    export default {
        computed: {
            markdown () {
                if (this.documentBody === null) {
                    return '';
                } else {
                    return marked.parse(this.documentBody);
                }
            },
        },
        data () {
            return {
                documentBody: null,
            };
        },
        mounted () {
            let documentName = this.$route.params.id;

            let axiosInstance = axios.create({
                baseURL: 'https://raw.githubusercontent.com/meridian-stream/documents/main/',
                timeout: env.api.timeout,
            })

            axiosInstance['get']('/' + documentName + '.md')
                .then(response => {
                    this.documentBody = response.data;
                })
        }
    }
</script>
