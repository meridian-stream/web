<template>
    <Popup
        :buttons="[
            { text: 'Cancel', action: () => { $emit('close') }, type: 'dark text-light' },
        ]"
    >
        <div class="reason p-2" v-for="(reason, i) in reportReasons" @click="report(reason)">
            <p class="fw-bold mb-0">{{ reason.name }}</p>
            <p class="mb-0">{{ reason.description }}</p>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../Components/Popup/Popup.vue";
    import GetReportReasonsRequest from "../../../Requests/GetReportReasonsRequest";
    import Server from "../../../Servers/Server";
    import CreateReportRequest from "../../../Requests/CreateReportRequest";

    export default {
        components: {
            Popup,
        },
        data () {
            return {
                createReportRequest: new CreateReportRequest(this.content.id),
                getReportReasons: new GetReportReasonsRequest,
                reportReasons: [],
            };
        },
        methods: {
            report (reason) {
                this.createReportRequest.report_reason_id = reason.id;
                this.createReportRequest.submitTo(Server.getInstance())
                    .then(report => {
                        alert('Thanks, the content has been reported!');
                        this.$emit('close');
                    })
            }
        },
        mounted() {
            const localReportReasons = localStorage.getItem('report_reasons');
            if (localReportReasons !== null) {
                this.reportReasons = JSON.parse(localReportReasons);
            } else {
                this.getReportReasons.submitTo(Server.getInstance())
                    .then(reportReasons => {
                        localStorage.setItem('report_reasons', JSON.stringify(reportReasons))
                        this.reportReasons = reportReasons;
                    })
            }
        },
        props: [
            'content',
        ],
    };
</script>

<style>
    .reason {
        border: 1px solid;
    }
    .reason:hover {
        border: 1px solid #EF626C;
    }
</style>
