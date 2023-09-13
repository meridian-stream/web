<template>
    <div class="container py-2" v-if="authUser !== null">
        <div class="row">
            <div class="col-12">
                <h1>My Subscriptions</h1>
            </div>
            <div class="col-12 col-md-6 col-lg-4" v-for="(subscription, i) in authUser.subscriptions">
                <div class="card mb-3">
                    <div class="card-header text-center">
                        <ChannelBadge class="d-inline-block" v-if="subscription.channel.image !== null" :channel="subscription.channel" size="large"></ChannelBadge><br>
                        <h2>{{ subscription.channel.name }}</h2>
                        ${{ (subscription.product.price / 100).toFixed(2) }} / month
                    </div>
                    <div class="card-body">
                        <div v-if="subscription.cancelled_at !== null">
                            <i class="fa-solid fa-circle-xmark text-danger"></i> Expired {{ subscription.nice_renews_at }}
                        </div>
                        <div v-if="subscription.cancelled_at === null">
                            <i class="fa-solid fa-circle-check text-success"></i> Renews {{ subscription.nice_renews_at }}
                        </div>
                        <p class="small text-muted mb-0">Billed on {{ subscription.card.brand }} ending in {{ subscription.card.last4 }} ({{ subscription.card.expiry_month < 10 ? '0' + subscription.card.expiry_month : subscription.card.expiry_month }}/{{ subscription.card.expiry_year }})</p>
                    </div>
                    <div class="card-footer">
                        <div class="btn btn-outline-danger" v-if="subscription.cancelled_at === null" @click="cancel(subscription)">Cancel</div>
                        <div class="btn btn-outline-dark text-light" disabled="disabled" v-if="subscription.cancelled_at !== null">Cancelled</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" v-if="authUser.subscriptions.length <= 0">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        You don't have any subscriptions.
                    </div>
                </div>
            </div>
        </div>
        <Popup
            v-if="isOpen.cancel"
            :buttons="[
                { text: 'Cancel', action: () => { isOpen.cancel = false; toCancel = null; }, type: 'dark text-light' },
                { text: 'Cancel', action: confirmCancel, type: 'danger' }
            ]"
        >
            <p>Are you sure you want to cancel you subscription to <span class="text-primary">{{ toCancel.channel.name }}</span>?</p>
            <p v-if="toCancel.channel.exclusive_count > 0">You'll lose access to <span class="text-primary">{{ toCancel.channel.exclusive_count }}</span> exclusive videos.</p>
        </Popup>
    </div>
</template>

<script>
    import ChannelBadge from "../../Components/ChannelBadge/ChannelBadge.vue";
    import Popup from "../../Components/Popup/Popup.vue";
    import UpdateSubscriptionRequest from "../../../Requests/UpdateSubscriptionRequest";
    import Server from "../../../Servers/Server";

    export default {
        components: {
            ChannelBadge,
            Popup,
        },
        data () {
            return {
                isOpen: {
                    cancel: false,
                },
                toCancel: null,
                updateSubscriptionRequest: new UpdateSubscriptionRequest,
            };
        },
        methods: {
            cancel (subscription) {
                this.toCancel = subscription;
                this.isOpen.cancel = true;
            },
            confirmCancel () {
                this.updateSubscriptionRequest = new UpdateSubscriptionRequest(this.toCancel.id)
                this.updateSubscriptionRequest.state = 2;
                this.updateSubscriptionRequest.submitTo(Server.getInstance())
                    .then(s => {
                        this.$emit('subscriptionUpdated', s);
                        this.isOpen.cancel = false;
                    });
            }
        },
        props: [
            'authUser',
        ],
    };
</script>
