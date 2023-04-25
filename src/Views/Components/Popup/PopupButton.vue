<template>
    <div class="btn btn-outline-primary" @click="action">{{ text }}</div>
</template>

<script>
    export default {
        props: [
            'text',
            'action',
        ]
    }
</script>
