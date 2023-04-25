<template>
    <h2>Payouts</h2>
    <table class="table bg-dark" v-if="payouts !== null">
        <thead>
            <tr>
                <th>ID</th>
                <th>Value</th>
                <th>State</th>
                <th>Created</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(payout, i) in payouts.data" v-if="payouts.data.length > 0">
                <td>{{ payout.id }}</td>
                <td>${{ (payout.value / 100).toFixed(2) }}</td>
                <td>
                    <span v-if="payout.state === 1"><i class="fa-solid fa-ellipsis text-warning"></i> Pending</span>
                    <span v-if="payout.state === 2"><i class="fa-solid fa-check text-success"></i> Complete</span>
                </td>
                <td>
                    {{ payout.nice_created_at }}
                </td>
            </tr>
            <tr>
                <td colspan="99" v-if="payouts.data.length === 0">
                    You don't have any payouts yet!
                </td>
            </tr>
            <tr>
                <td colspan="99" class="text-center">
                    <button class="btn btn-outline-primary">Load More</button>
                </td>
            </tr>
        </tbody>
    </table>
    <h3>Transfers</h3>
    <p>Transfers are the share of subscription payments that have been allocated to you. Transfers are pending until they're allocated to a payout.</p>
    <div class="row">
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-solid fa-money-bill-transfer fa-3x"></i></p>
                    <h4 class="text-primary">Pending Transfers</h4>
                    {{ channel.pending_transfers_count }}
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-solid fa-money-bill-wave fa-3x"></i></p>
                    <h4 class="text-primary">Your Balance</h4>
                    <p class="mb-0">${{ (channel.pending_transfers_value / 100).toFixed(2) }}</p>
                    <button v-if="channel.pending_transfers_value > payoutThreshold" class="mt-3 btn btn-outline-primary" @click="$router.push({ name: 'cp.channels.payouts.create', params: { id: $route.params.id } })">Request Payout</button>
                </div>
            </div>
        </div>
    </div>
    <h3>Settings</h3>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row mb-3" v-if="updateChannelRequest !== null">
                        <label for="is_accepting_subscriptions" class="col-12 col-md-4 text-md-end">
                            Accept subscriptions
                            <p class="small text-muted mb-0">This marks your channel as accepting subscriptions.</p>
                        </label>
                        <div class="col-12 col-md-8">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="is_accepting_subscriptions" v-model="updateChannelRequest.is_accepting_subscriptions">
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-8 offset-4">
                            <button class="btn btn-outline-primary" @click="submit">
                                <i class="fa-solid fa-spinner fa-pulse" v-if="updateChannelRequest.isLoading"></i>
                                <span v-if="!updateChannelRequest.isLoading">Update</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GetChannelPayoutsRequest from "../../../../Requests/GetChannelPayoutsRequest";
    import Server from "../../../../Servers/Server";
    import AcceptSubscriptionsRequest from "../../../../Requests/AcceptSubscriptionsRequest";
    import env from "../../../../env";

    export default {
        computed: {
            payoutThreshold () {
                return env.payout_threshold;
            },
        },
        data () {
            return {
                getPayoutsRequest: new GetChannelPayoutsRequest(this.channel.id),
                updateChannelRequest: new AcceptSubscriptionsRequest(this.channel.id, this.channel),
                payouts: null,
            }
        },
        methods: {
            submit () {
                this.updateChannelRequest.submitTo(Server.getInstance())
                    .then(c => {
                        this.$emit('channelUpdated', c);
                    })
            }
        },
        mounted () {
            this.getPayoutsRequest.submitTo(Server.getInstance())
                .then(payouts => {
                    this.payouts = payouts;
                })
        },
        props: [
            'authUser',
            'channel',
        ],
    }
</script>
