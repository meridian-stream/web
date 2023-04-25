<template>
    <Popup
        @close="$emit('close')"
        :buttons="[
            { text: backButtonText, action: back, type: 'dark text-light' },
            { text: nextButtonText, action: submit, type: 'secondary' },
        ]"
    >
        <div v-if="authUser !== null">
            <div class="subscribe-channel-image float-start">
                <Image v-if="channel !== null" :src="channel.image.url"></Image>
            </div>
            <h2>Subscribe to John Smith</h2>
            <p>Hi, I'm John Smith and I'm really passionate about creating and sharing ASMR.</p>
            <p class="small text-muted">John Smith has <span class="text-primary">{{ channel.exclusive_count }} exclusive videos</span> for their subscribers only.</p>
            <div class="swiper" id="subscribe-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <h3>Select a subscription duration</h3>
                        <div class="list-group bg-dark" v-if="products.length > 0">
                            <div
                                class="list-group-item text-light border-light"
                                v-for="(product, i) in products"
                                :class="createSubscriptionRequest.product_id === product.id ? 'bg-primary' : 'bg-dark'"
                                @click="createSubscriptionRequest.product_id = product.id"
                            >
                                {{ product.period_duration }} month subscription @ ${{ (product.price / 100) }} / month
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <h3>Select a payment method</h3>
                        <div class="list-group bg-dark mb-3">
                            <div
                                class="list-group-item text-light border-light"
                                v-for="(card, i) in authUser.cards"
                                :class="createSubscriptionRequest.card_id === card.id ? 'bg-primary' : 'bg-dark'"
                                @click="createSubscriptionRequest.card_id = card.id"
                            >
                                <div class="row">
                                    <div class="col-8">
                                        <i class="fa-brands fa-cc-visa me-2" v-if="card.brand === 'Visa'"></i>
                                        <i class="fa-brands fa-cc-mastercard me-2" v-if="card.brand === 'MasterCard'"></i>
                                        <i class="fa-brands fa-cc me-2" v-if="card.brand !== 'MasterCard' && card.brand !== 'Visa'"></i>
                                        {{ card.brand }} ending in {{ card.last4 }}
                                    </div>
                                    <div class="col-4 text-end small">
                                        expires {{ (card.expiry_month < 10 ? '0' : '') + card.expiry_month }}/{{ (card.expiry_year) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <a class="btn btn-sm btn-outline-primary" @click="$emit('openAddCard')">
                                Add Card
                            </a>
                        </div>
                    </div>
                    <div class="swiper-slide">c</div>
                </div>
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../Components/Popup/Popup.vue";
    import Swiper from 'swiper';
    import 'swiper/css';
    import Image from "../../Components/Image/Image.vue";
    import GetProductsRequest from "../../../Requests/GetProductsRequest";
    import GetCardsRequest from "../../../Requests/GetCardsRequest";
    import Server from "../../../Servers/Server";
    import CreateSubscriptionRequest from "../../../Requests/CreateSubscriptionRequest";
    import {toRaw} from "vue";
    import { loadStripe } from "@stripe/stripe-js";
    import env from "../../../env";
    import AddCard from "./AddCard.vue";

    export default {
        components: {
            AddCard,
            Popup,
            Image,
        },
        computed: {
            backButtonText () {
                if (this.swiper === null) {
                    return 'Close';
                }
                if (this.swiper.activeIndex === 0) {
                    return 'Close';
                }
                return 'Back';
            },
            nextButtonText () {
                if (this.swiper === null) {
                    return 'Next';
                }
                if (this.createSubscriptionRequest.isLoading) {
                    return '<i class="fa-solid fa-spinner fa-pulse"></i>';
                }
                if (this.swiper.activeIndex === 1) {
                    return 'Subscribe';
                }
                return 'Next';
            }
        },
        data () {
            return {
                cards: [],
                createSubscriptionRequest: new CreateSubscriptionRequest,
                getCardsRequest: new GetCardsRequest,
                getProductsRequest: new GetProductsRequest,
                isOpen: {
                    addCard: true,
                },
                products: [],
                stripe: null,
                swiper: null,
            }
        },
        methods: {
            back () {
                if (this.swiper.activeIndex === 0) {
                    this.$emit('close');
                } else {
                    this.swiper.slidePrev();
                }
            },
            async submit () {
                if (this.swiper.activeIndex === 1) {
                    this.createSubscriptionRequest.submitTo(Server.getInstance())
                        .then(response => {
                            this.$emit('success', response);
                        })
                } else {
                    this.swiper.slideNext();
                }
            },
        },
        async mounted () {
            if (this.authUser === null) {
                this.$emit('openLogin');
                this.$emit('close');
            }

            this.stripe = await loadStripe(env.stripe.publishable_key);

            this.createSubscriptionRequest.channel_id = this.channel.id;

            this.getProductsRequest.submitTo(Server.getInstance())
                .then(products => {
                    this.products = toRaw(products);
                });

            this.swiper = new Swiper(document.getElementById('subscribe-swiper'), {
                allowTouchMove: false,
            });
        },
        props: [
            'authUser',
            'channel',
        ],
    }
</script>

<style>
    .subscribe-channel-banner-image {
        position: relative;
        padding-top: 25%;
    }
    .subscribe-channel-image {
        position: relative;
        width: 4rem;
        height: 4rem;
        overflow: hidden;
        border-radius: 2rem;
        margin-right: 1rem;
    }
    .list-group-item:hover {
        cursor: pointer;
    }
</style>
