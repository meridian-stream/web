<template>
    <div class="row" v-if="typeof form.errors.general !== 'undefined' && form.errors.general.length > 0">
        <div class="col-12">
            <p class="text-danger text-center" v-for="error in form.errors['general']">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['form'],
    }
</script>
