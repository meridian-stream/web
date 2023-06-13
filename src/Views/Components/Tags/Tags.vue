<template>
    <div class="badge bg-primary me-1 tag" v-for="(tag, i) in tags" @click="filter(tag.name)">
        {{ tag.name }}
    </div>
</template>

<script>
    export default {
        props: [
            'tags',
        ],
        methods: {
            filter (tag) {
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
