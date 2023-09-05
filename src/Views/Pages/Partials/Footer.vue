<template>
    <footer class="py-5">
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-12 text-center text-md-start">
                    <img src="/images/logo-only-natural-256.png" width="64" height="64" alt="">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-4 text-center text-md-start mb-3">
                    <h2>Links</h2>
                    <ul>
                        <li><router-link :to="{ name: 'about' }">About {{ appName }}</router-link></li>
                        <li><router-link :to="{ name: 'roadmap' }">Road Map</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 text-center text-md-start mb-3">
                    <h2>Support</h2>
                    <ul>
                        <li><router-link :to="{ name: 'faq' }">FAQ</router-link></li>
                        <li><router-link :to="{ name: 'documents.view', params: { id: 'terms-of-service' } }">Terms of Service</router-link></li>
                        <li><router-link :to="{ name: 'documents.view', params: { id: 'refund-policy' } }">Refund Policy</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 text-center text-md-end">
                    <h2>Let's be sociable</h2>
                    <div class="socials">
                        <a href="https://twitter.com/meridian_stream" target="_blank" class="social">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://discord.gg/HuUqd5wHSb" target="_blank" class="social">
                            <i class="fa-brands fa-discord"></i>
                        </a>
                        <a href="https://www.reddit.com/r/meridian_stream" target="_blank" class="social">
                            <i class="fa-brands fa-reddit-alien"></i>
                        </a>
                        <a href="https://www.instagram.com/meridian.stream" target="_blank" class="social">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 small text-muted text-center text-md-start">
                    &copy; {{ appName }} ({{ appVersion }}) 2023 {{ (new Date()).getFullYear() > 2023 ? ('- ' + (new Date()).getFullYear()) : '' }}
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import env from "../../../env";
    import p from "../../../../package.json";

    export default {
        computed: {
            appName() {
                return env.name;
            },
            appVersion() {
                return p.version;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .socials {
        .social {
            display: inline-block;
            width: 48px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            font-size: 32px;
            transition: background-color 0.125s linear;
        }

        .social:hover {
            //background-color: #EF626C;
            //color: black;
        }
    }

    ul {
        padding-left: 0;
        list-style: none;

        a {
            text-decoration: none;
        }
    }
</style>
