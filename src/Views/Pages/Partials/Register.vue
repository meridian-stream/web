<template>
    <Popup
        :buttons="[
            { text: 'Close', action: () => { $emit('close') }, type: 'dark text-light' },
            { text: 'Register', action: register, type: 'primary' },
        ]"
    >
        <div class="row mb-3">
            <div class="col-12 text-center">
                <img src="/images/logo-only-natural-256.png" height="64" width="64" alt="">
                <br>
                Create your meridian account
                <br>
                <div class="small text-muted">Been here before? <a href="#" @click="() => { $emit('close'); $emit('openLogin') }">Log in</a>, instead.</div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="name" class="col-4 col-form-label text-end">
                Name
            </label>
            <div class="col-8">
                <input type="text" name="name" id="name" class="form-control" v-model="registerRequest.name">
            </div>
        </div>
        <div class="row mb-3">
            <label for="email" class="col-4 col-form-label text-end">
                Email
            </label>
            <div class="col-8">
                <input type="email" name="email" id="email" class="form-control" v-model="registerRequest.email">
            </div>
        </div>
        <div class="row mb-3">
            <label for="password" class="col-4 col-form-label text-end">
                Password
            </label>
            <div class="col-8">
                <input type="password" name="password" id="password" class="form-control" v-model="registerRequest.password">
            </div>
        </div>
        <div class="row mb-3">
            <label for="password_confirmation" class="col-4 col-form-label text-end">
                Confirmed
            </label>
            <div class="col-8">
                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" v-model="registerRequest.password_confirmation">
            </div>
        </div>
    </Popup>
</template>

<script>
    import Popup from "../../Components/Popup/Popup.vue";
    import RegisterRequest from "../../../Requests/RegisterRequest";
    import Server from "../../../Servers/Server";

    export default {
        components: {
            Popup,
        },
        data () {
            return {
                registerRequest: new RegisterRequest,
            };
        },
        methods: {
            register () {
                this.registerRequest.submitTo(Server.getInstance())
                    .then(apiKey => {
                        Server.setAPIKey(apiKey);
                        this.$emit('success');
                        this.$emit('close');
                    });
            },
        },
    };
</script>
