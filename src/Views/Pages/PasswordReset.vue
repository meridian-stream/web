<template>
    <div class="container py-3">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h1>Password Reset</h1>
                        <GeneralErrors :form="passwordResetRequest"></GeneralErrors>
                        <div class="row mb-3">
                            <label for="password" class="col-4 col-form-label text-end">
                                Password
                            </label>
                            <div class="col-8">
                                <input type="password" name="password" id="password" class="form-control" v-model="passwordResetRequest.password" @keydown="passwordResetRequest.clearErrors('password')">
                                <SpecificError :form="passwordResetRequest" :field="'password'"></SpecificError>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="password" class="col-4 col-form-label text-end">
                                Password confirmation
                            </label>
                            <div class="col-8">
                                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" v-model="passwordResetRequest.password_confirmation" @keydown.enter="submit" @keydown="passwordResetRequest.clearErrors('password_confirmation')">
                                <SpecificError :form="passwordResetRequest" :field="'password_confirmation'"></SpecificError>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8 offset-4">
                                <submit class="btn btn-primary" @click="submit">Reset Password</submit>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SpecificError from "@/Views/Components/Form/SpecificError.vue";
    import GeneralErrors from "@/Views/Components/Form/GeneralErrors.vue";
    import PasswordResetRequest from "@/Requests/PasswordResetRequest.js";
    import Server from "@/Servers/Server.js";

    export default {
        components: {GeneralErrors, SpecificError},
        data () {
            return {
                passwordResetRequest: new PasswordResetRequest,
            }
        },
        methods: {
            submit () {
                this.passwordResetRequest.submitTo(Server.getInstance())
                    .then(response => {
                        this.$router.push({
                            name: 'home',
                        });
                        this.$emit('openLogin');
                    })
            },
        },
        mounted () {
            this.passwordResetRequest.token = this.$route.params.token;
        }
    }
</script>
