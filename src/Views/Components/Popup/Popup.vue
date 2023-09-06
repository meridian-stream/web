<template>
    <div class="popup-container popup-close" @click="close">
        <div class="container-fluid h-100 popup-close" @click="close">
            <div class="row h-100 justify-content-center popup-close" @click="close">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 my-auto popup-close" @click="close" :class="{ 'col-md-12 col-lg-12 col-xl-12': wide }">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <slot></slot>
                        </div>
                        <div class="card-footer text-end" v-if="(typeof buttons !== 'undefined' && buttons.length > 0)">
                            <div
                                class="btn ms-1"
                                :class="[ 'btn-outline-' + (button.type || 'dark') ]"
                                @click="button.action"
                                v-for="(button, i) in buttons"
                                v-html="button.isLoading ? '<i class=\'fa-solid fa-spinner fa-pulse\'></i>' : button.text"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            wide () {
                if (typeof this.isWide === 'undefined') {
                    return false;
                }
                return this.isWide;
            },
        },
        methods: {
            close(e) {
                if (e.target.classList.contains('popup-close')) {
                    this.$el.classList.remove('shown');
                    setTimeout(() => {
                        this.$emit('close')
                    }, 125);
                }
            },
        },
        mounted() {
            setTimeout(() => {
                this.$el.classList.add('shown')
            }, 125)
        },
        props: [
            'buttons',
            'isWide',
        ],
    }
</script>

<style lang="scss">
    .popup-container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.125s linear;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.66);
    }

    .popup-container.shown {
        opacity: 1;
    }
</style>
