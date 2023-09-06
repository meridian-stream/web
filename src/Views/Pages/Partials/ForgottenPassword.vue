<template>
    <Popup
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-white' },
            { text: 'Reset Password', action: submit, type: 'primary', isLoading: forgottenPasswordRequest.isLoading }
        ]"
    >
        <p class="text-center">Please enter your email address below to start the password reset process.</p>
        <p class="text-center text-success" v-if="success">Thanks! If we can find your email address, we'll send you a password reset request momentarily.</p>
        <GeneralErrors :form="forgottenPasswordRequest"></GeneralErrors>
        <div class="row mb-3">
            <label for="email" class="col-4 col-form-label text-end">
                Email
            </label>
            <div class="col-8">
                <input type="email" name="email" id="email" class="form-control" v-model="forgottenPasswordRequest.email" @keydown="forgottenPasswordRequest.clearErrors('email')">
                <SpecificError :form="forgottenPasswordRequest" :field="'email'"></SpecificError>
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "@/Views/Components/Popup/Popup.vue";
    import SpecificError from "@/Views/Components/Form/SpecificError.vue";
    import GeneralErrors from "@/Views/Components/Form/GeneralErrors.vue";
    import ForgottenPasswordRequest from "@/Requests/ForgottenPasswordRequest.js";
    import Server from "@/Servers/Server.js";

    export default {
        components: {
            GeneralErrors,
            SpecificError,
            Popup,
        },
        data () {
            return {
                forgottenPasswordRequest: new ForgottenPasswordRequest,
                success: false,
            }
        },
        methods: {
            submit () {
                this.forgottenPasswordRequest.submitTo(Server.getInstance())
                    .then(response => {
                        this.success = true;
                    })
            }
        }
    }
</script>
