<template>
    <div class="container py-2">
        <div class="row">
            <div class="col-12">
                <h1>About</h1>
                <p>Welcome to {{ appName }} &mdash; our innovative platform dedicated exclusively to the mesmerising world of ASMR.</p>
                <p>At {{ appName }}, we're crafting a unique space that caters to ASMR enthusiasts and creators alike. Our mission is to provide a monetization avenue for creators, ensuring an ad-free experience for our users while fostering the growth and understanding of ASMR as an art form.</p>
                <p>At the core of our platform is the belief that ASMR creators deserve a fair and sustainable way to share their talent and connect with their audience.</p>
                <p>Beyond providing a monetization platform, we are committed to advancing and sharing knowledge and understanding of ASMR.</p>
                <p>We'd love for you to join us on this extraordinary journey.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import env from "../../env.js";

    export default {
        computed: {
            appName() {
                return env.name;
            }
        }
    }
</script>
