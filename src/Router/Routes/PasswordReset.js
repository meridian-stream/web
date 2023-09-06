import PasswordReset from "@/Views/Pages/PasswordReset.vue";

export default {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: PasswordReset,
    meta: {
        title: 'Password Reset',
    },
};
