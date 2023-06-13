<template>
    <Popup
        @close="$emit('close')"
        :hasClose="true"
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-white' },
            { text: 'Log In', action: submit, type: 'primary' },
        ]"
    >
        <div class="row mb-3">
            <div class="col-12 text-center">
                <img src="/images/logo-only-natural-256.png" height="64" width="64" alt="">
                <br>
                Put on your warmest socks and get ready to relax.
                <br>
                <div class="small text-muted">First time? <a href="#" @click="() => { $emit('close'); $emit('openRegister') }">Create an account</a>, instead.</div>
            </div>
        </div>
        <GeneralErrors :form="loginRequest"></GeneralErrors>
        <div class="row mb-3">
            <label for="email" class="col-4 col-form-label text-end">
                Email
            </label>
            <div class="col-8">
                <input type="email" name="email" id="email" class="form-control" v-model="loginRequest.email">
                <SpecificError :form="loginRequest" :field="'email'"></SpecificError>
            </div>
        </div>
        <div class="row">
            <label for="password" class="col-4 col-form-label text-end">
                Password
            </label>
            <div class="col-8">
                <input type="password" name="password" id="password" class="form-control" v-model="loginRequest.password" @keydown.enter="submit">
                <SpecificError :form="loginRequest" :field="'password'"></SpecificError>
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../Components/Popup/Popup.vue";
    import LoginRequest from "../../../Requests/LoginRequest";
    import Server from "../../../Servers/Server";
    import env from "../../../env";
    import GeneralErrors from "../../Components/Form/GeneralErrors.vue";
    import SpecificError from "../../Components/Form/SpecificError.vue";

    export default {
        components: {
            GeneralErrors,
            Popup,
            SpecificError,
        },
        computed: {
            appName () {
                return env.name;
            },
        },
        data () {
            return {
                loginRequest: new LoginRequest({
                    email: localStorage.getItem('remembered_email') || '',
                    password: '',
                })
            };
        },
        methods: {
            submit () {
                this.loginRequest.submitTo(Server.getInstance())
                    .then(apiKey => {
                        Server.setAPIKey(apiKey);
                        this.$emit('success');
                        this.$emit('close');
                    })
            },
        },
    }
</script>
