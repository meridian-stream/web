<template>
    <header class="fixed-top py-1 bg-dark">
        <div class="container-fluid">
            <div class="row">
                <div class="col-2">
                    <router-link :to="{ name: 'home' }">
                        <img src="/images/logo-only-natural-256.png" width="38" height="38" alt="Our logo">
                    </router-link>
                </div>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="query">
                </div>
                <div class="col-2 text-end">
<!--                    <div class="btn btn-outline-primary" v-if="authUser === null" @click="$emit('openLogin')">Log In</div>-->

                    <div class="dropdown dropdown-menu-end" v-if="authUser === null">
<!--                        <div class="profile-pic" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                            <i class="fa-solid fa-bars"></i>-->
<!--                        </div>-->
                        <div class="btn btn-outline-dark text-light" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-bars"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a class="dropdown-item" href="#" @click="$emit('openLogin')">Log In</a></li>
                        </ul>
                    </div>

                    <div class="dropdown dropdown-menu-end" v-if="authUser !== null">
                        <div class="profile-pic" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image :src="authUser.image?.url || '/images/user-placeholder.png'"></Image>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li>
                                <router-link :to="{ name: 'profile' }" class="dropdown-item">My Profile</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'subscriptions.index' }" class="dropdown-item">My Subscriptions</router-link>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li>
                                <router-link :to="{ name: 'channels.create' }" class="dropdown-item">Create a Channel</router-link>
                            </li>
                            <li v-for="(channel, i) in authUser.channels">
                                <router-link :to="{ name: 'cp.channels.view', params: { id: channel.slug || channel.id } }" class="dropdown-item">Manage {{ channel.name }}</router-link>
                            </li>
                            <li class="dropdown-divider"></li>
<!--                            <li><a class="dropdown-item" href="#">Another action</a></li>-->
                            <li><a class="dropdown-item" href="#" @click="$emit('logout')">Log out</a></li>
                        </ul>
                    </div>
<!--                    <div class="btn btn-outline-primary" v-if="authUser !== null" @click="$emit('logout')">{{ authUser.name }}</div>-->
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import Image from "../../Components/Image/Image.vue";

    export default {
        components: {
            Image,
        },
        data () {
            return {
                query: '',
            };
        },
        props: [
            'authUser',
        ],
        watch: {
            query () {
                this.$router.push({
                    name: 'search',
                    query: {
                        query: this.query
                    },
                })
            },
        },
    };
</script>

<style lang="scss" scoped>
    .profile-pic {
        position: relative;
        overflow: hidden;
        width: 38px;
        height: 38px;
        border-radius: 19px;
        display: inline-block;
        vertical-align: middle;
    }
    .profile-pic:hover {
        cursor: pointer;
    }
</style>
