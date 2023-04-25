<template>
    <div id="form">
        The form
        <div class="row mb-3" v-for="(field, fieldName) in request.fields">
            <label :for="fieldName" class="col-form-label d-none d-md-flex col-4 text-end">
                {{ fieldName }}
            </label>
            <div class="col-12 col-md-8">
                <input
                    class="form-control"
                    type="email"
                    :name="fieldName"
                    :id="fieldName"
                    v-if="field.indexOf('email') > -1"
                    :placeholder="fieldName"
                >
            </div>
        </div>
        <div class="row">
            <label for=""></label>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['request'],
    }
</script>
