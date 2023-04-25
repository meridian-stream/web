<template>
    <p class="text-danger mb-0" v-if="field in form.errors" v-for="(error, i) in form.errors[field]">
        {{ error }}
    </p>
</template>

<script>
    export default {
        props: [
            'form',
            'field',
        ],
    };
</script>
