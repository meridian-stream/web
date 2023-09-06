<template>
    <div class="btn btn-outline-primary" @click="action">
        <i class="fa-solid fa-spinner fa-pulse"></i>
        {{ text }}
    </div>
</template>

<script>
    export default {
        props: [
            'text',
            'action',
        ]
    }
</script>
