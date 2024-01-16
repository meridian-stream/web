<template>
    <div class="mPlayer-choices" v-if="choices !== null && choices.length > 0">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-12 my-auto">
                    <div class="row h-100 justify-content-center">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3 my-auto mb-3" v-for="(choice, i) in choices">
                            <div class="mPlayer-choice" @click="$emit('chosen', choice.destination)">
                                {{ i+1 }}. {{ choice.label }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'choices',
            'position',
            'orientation',
        ],
    }
</script>

<style>
    .mPlayer-choices {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .mPlayer-choice {
            display: inline-block;
            width: 100%;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            background-color: rgba(0, 0, 0, 0.66);
            cursor: pointer;
            transition: background-color 0.125s linear, color 0.125s linear;
        }

        .mPlayer-choice:hover {
            background-color: #7c3ea3;
        }
    }
</style>
