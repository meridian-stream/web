<template>
    <Popup
        :buttons="[
            // { text: 'Close', action: () => $emit('close'), type: 'dark text-light' },
            { text: addCardText, action: addCard, type: 'primary' },
        ]"
    >
        <h2 class="mb-3">Add Card</h2>
        <p class="mb-3">Cards are securely stored and processed with <a href="https://stripe.com/gb">Stripe</a>.</p>
        <div id="card-element"></div>
    </Popup>
</template>

<script>
    import Popup from "../../Components/Popup/Popup.vue";
    import { loadStripe } from "@stripe/stripe-js";
    import env from "../../../env";
    import CreateCardRequest from "../../../Requests/CreateCardRequest";
    import Server from "../../../Servers/Server";

    export default {
        components: {
            Popup,
        },
        computed: {
            addCardText() {
                if (this.createCardRequest.isLoading) {
                    return '<i class="fa-solid fa-spinner fa-pulse"></i>';
                }
                return 'Add Card';
            }
        },
        data () {
            return {
                createCardRequest: new CreateCardRequest(this.authUser.id),
                element: null,
                stripe: null,
            };
        },
        methods: {
            addCard () {
                this.createCardRequest.isLoading = true;
                this.stripe.createToken(this.element).then(tokenResponse => {
                    this.createCardRequest.token = tokenResponse.token.id;
                    this.createCardRequest.submitTo(Server.getInstance(), true)
                        .then(card => {
                            this.createCardRequest.isLoading = true;
                            this.stripe.confirmCardSetup(card.stripe_setup_intent_cs, {
                                payment_method: {
                                    card: this.element,
                                },
                            }).then(result => {
                                this.$emit('success', card);
                                setTimeout(() => {
                                    this.$emit('close');
                                }, 125)
                            })
                        })
                })
            },
        },
        async mounted () {
            this.stripe = await loadStripe(env.stripe.publishable_key);
            const elements = this.stripe.elements();
            const style = {
                base: {
                    color: "#EFEFEF",
                    fontFamily: '"Red Hat Display", sans-serif',
                }
            };
            this.element = elements.create('card', {
                style: style,
            });
            this.element.mount('#card-element');
        },
        props: [
            'authUser',
        ],
    };
</script>
