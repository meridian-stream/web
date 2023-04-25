<template>
    <h1>Request Payout</h1>
    <p>When you request a payout, we'll begin the process of sending you your account balance. If this is your first payout, please keep an eye on your emails as we may require more information from you for legal purposes.</p>
    <p class="text-muted">Note: Whilst {{ appName }} covers the fees associated with you your balance, we can't guarantee an exchange rate if you're paid out in a currency other than USD.</p>
    <GeneralErrors :form="createPayoutRequest"></GeneralErrors>
    <button
        @click="readyToSubmit ? submit() : readyToSubmit = true"
        class="btn btn-outline-primary"
        v-html="readyToSubmit ? 'Confirm' : 'Request Payout'"
    ></button>
</template>

<script>
    import CreatePayoutRequest from "../../../../Requests/CreatePayoutRequest";
    import Server from "../../../../Servers/Server";
    import GeneralErrors from "../../../Components/Form/GeneralErrors.vue";
    import env from "../../../../env";

    export default {
        components: {
            GeneralErrors,
        },
        computed: {
            appName () {
                return env.name;
            }
        },
        data () {
            return {
                readyToSubmit: false,
                createPayoutRequest: new CreatePayoutRequest(this.channel.id),
            };
        },
        methods: {
            submit () {
                this.createPayoutRequest.submitTo(Server.getInstance())
                    .then(payout => {
                        alert('Your payout has been successfully requested!');
                        this.$router.push({ name: 'cp.channels.payouts.index', params: { id: this.$route.params.id }})
                    })
            },
        },
        props: [
            'authUser',
            'channel',
        ],
    };
</script>
