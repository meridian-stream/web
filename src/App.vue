<template>
    <Header
        @logout="logout"
        @openLogin="isOpen.login = true"
        :authUser="user"
    ></Header>
    <main>
        <RouterView
            :authUser="user"
            @openGallery="openGallery"
            @openReport="openReport"
            @openRegister="isOpen.register = true"
            @openLogin="isOpen.login = true"
            @openSubscribe="openSubscribe"
            @setUser="getUser"
            @subscriptionUpdated="subscriptionUpdated"
        ></RouterView>
    </main>
    <Footer></Footer>
    <Subscribe
        v-if="isOpen.subscribe"
        @close="isOpen.subscribe = false"
        @openAddCard="openAddCard"
        @openLogin="isOpen.login = true;"
        @success="subscriptionAdded"
        :channel="subChannel"
        :auth-user="user"
    ></Subscribe>
    <Login
        v-if="isOpen.login"
        @close="isOpen.login = false;"
        @openRegister="isOpen.register = true;"
        @openPasswordReset="isOpen.passwordReset = true"
        @success="getUser"
    ></Login>
    <Register
        v-if="isOpen.register"
        @close="isOpen.register = false"
        @openLogin="isOpen.login = true"
        @openPasswordReset="isOpen.passwordReset = true"
        @success="getUser"
    ></Register>
    <AddCard
        v-if="user !== null && isOpen.addCard"
        @close="isOpen.addCard = false"
        @success="cardAdded"
        :auth-user="user"
    ></AddCard>
    <Gallery
        @openGallery="openGallery"
        @openNewFolder="openNewFolder"
        @fileSelected="fileSelected"
        @close="isOpen.gallery = false"
        :authUser="user"
        :folder-id="galleryFolder.id"
        :has-selectable-files="gallerySelectableFiles"
        v-if="user !== null && isOpen.gallery"
    ></Gallery>
    <Report
        @close="isOpen.report = false; reportContent = null;"
        :content="reportContent"
        v-if="isOpen.report"
    ></Report>
    <ForgottenPassword
        @close="isOpen.passwordReset = false;"
        v-if="isOpen.passwordReset"
    ></ForgottenPassword>
</template>

<script>
    import Footer from "./Views/Pages/Partials/Footer.vue";
    import Header from "./Views/Pages/Partials/Header.vue";
    import GetUserRequest from "./Requests/GetUserRequest";
    import Server from "./Servers/Server";
    import Login from "./Views/Pages/Partials/Login.vue";
    import NotFound from "./Core/Responses/NotFound";
    import Subscribe from "./Views/Pages/Partials/Subscribe.vue";
    import AddCard from "./Views/Pages/Partials/AddCard.vue";
    import Gallery from "./Views/Pages/Partials/Gallery/Gallery.vue";
    import NewFolder from "./Views/Pages/Partials/Gallery/NewFolder.vue";
    import Register from "./Views/Pages/Partials/Register.vue";
    import Report from "./Views/Pages/Partials/Report.vue";
    import PasswordReset from "@/Views/Pages/PasswordReset.vue";
    import ForgottenPassword from "@/Views/Pages/Partials/ForgottenPassword.vue";

    export default {
        components: {
            ForgottenPassword,
            PasswordReset,
            Footer,
            Header,
            Login,
            Subscribe,
            AddCard,
            Gallery,
            NewFolder,
            Register,
            Report,
        },
        data () {
            return {
                galleryFolder: null,
                gallerySelectableFiles: false,
                getUserRequest: new GetUserRequest,
                isOpen: {
                    addCard: false,
                    gallery: false,
                    login: false,
                    passwordReset: false,
                    register: false,
                    report: false,
                    subscribe: false,
                },
                newFolderFolder: null,
                onCardAdded: null,
                onLoginRegister: null,
                reportContent: null,
                subChannel: null,
                user: null,
            };
        },
        methods: {
            cardAdded (card) {
                this.user.cards.push(card);
                if (this.onCardAdded !== null) {
                    this.onCardAdded(card);
                    setTimeout(() => {
                        this.onCardAdded = null;
                    }, 250);
                }
            },
            fileSelected (file) {
                if (this.gallerySelectableFiles) {
                    this.galleryOnSelect(file);
                }
                this.isOpen.gallery = false;
            },
            getUser () {
                let vue = this;
                this.getUserRequest = new GetUserRequest(Server.getAPIKey().user_id);
                this.getUserRequest.submitTo(Server.getInstance())
                    .then(user => {
                        this.user = user;

                        if (vue.onLoginRegister !== null) {
                            vue.onLoginRegister();
                            setTimeout(() => {
                                vue.onLoginRegister = null;
                            }, 1000)
                        }
                    })
                    .catch(error => {
                        if (error instanceof NotFound) {
                            this.logout();
                        }
                    })
            },
            logout () {
                Server.setAPIKey(null);
                this.$router.push({ name: 'home' })
                this.user = null;
            },
            openAddCard (onCardAdded) {
                this.onCardAdded = onCardAdded;
                this.isOpen.addCard = true;
            },
            openGallery (folder, selectableFiles, onSelect) {
                if (typeof folder === 'undefined') {
                    return;
                }
                if (typeof selectableFiles === 'undefined') {
                    selectableFiles = false;
                }
                this.gallerySelectableFiles = selectableFiles;
                this.galleryFolder = folder;
                this.galleryOnSelect = onSelect;
                this.isOpen.gallery = true;
            },
            openNewFolder (folder) {
                this.newFolderFolder = folder;
                this.isOpen.newFolder = true;
            },
            openReport (content) {
                this.isOpen.report = true;
                this.reportContent = content;
            },
            openSubscribe (channel) {
                this.onLoginRegister = () => {
                    this.subChannel = channel;
                    this.isOpen.subscribe = true;
                };

                // If the user is not logged in...
                if (this.user === null) {
                    this.isOpen.login = true;
                    return;
                }

                this.onLoginRegister();
            },
            subscriptionAdded (subscription) {
                this.user.subscriptions.push(subscription);
                this.isOpen.subscribe = false;
            },
            subscriptionUpdated (subscription) {
                for (let i = 0; i < this.user.subscriptions.length; i++) {
                    if (this.user.subscriptions[i].id === subscription.id) {
                        this.user.subscriptions[i] = subscription;
                    }
                }
            },
            folderAdded (folder) {
                this.galleryFolder.folders.push(folder);
            },
        },
        mounted () {
            let apiKey = Server.getAPIKey();
            if (apiKey !== null) {
                this.getUser();
            }
        },
    }
</script>

<style scoped>

</style>
