<template>
    <div class="badge bg-primary me-1 tag" v-for="(tag, i) in tags" @click="clickable ? filter(tag.name) : null">
        {{ tag.name }} <span v-if="deletable" class="delete" @click="$emit('delete', tag)"><i class="fa-solid fa-times fa-fw"></i></span>
    </div>
</template>

<script>
    export default {
        computed: {
            clickable () {
                if (typeof this.isClickable === 'undefined') {
                    return true;
                }
                return this.isClickable;
            },
            deletable () {
                if (typeof this.isDeletable === 'undefined') {
                    return false;
                }
                return this.isDeletable;
            }
        },
        props: [
            'isClickable',
            'isDeletable',
            'tags',
        ],
        methods: {
            filter (e, tag) {
                let existingTags = [];
                if (
                    typeof this.$route.query.tags !== 'undefined' &&
                    this.$route.query.tags !== []
                ) {
                    existingTags = this.$route.query.tags;
                }
                if (existingTags.indexOf(tag) === -1) {
                    existingTags.push(tag);
                }
                this.$router.push({
                    name: 'search',
                    query: {
                        tags: existingTags,
                    },
                    force: true,
                });
            },
        },
    };
</script>

<style>
    .tag {
        cursor: pointer;
    }
</style>
