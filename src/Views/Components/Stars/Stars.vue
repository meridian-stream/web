<template>
    <span v-html="stars"></span>
</template>

<script>
    export default {
        computed: {
            stars() {
                let toReturn = '';
                const stars = Math.round(this.content.rating);
                for (let i = 0; i < stars; i++) {
                    toReturn += '&starf;'
                }
                for (let i = 0; i < 5 - stars; i++) {
                    toReturn += '&star;'
                }
                return toReturn;
            },
        },
        props: [
            'content',
        ],
    };
</script>
