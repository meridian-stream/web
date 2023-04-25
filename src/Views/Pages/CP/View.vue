<template>
    <h2>Dashboard</h2>
    <div class="row">
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-solid fa-video fa-3x"></i></p>
                    <h3 class="text-primary">Total Videos</h3>
                    {{ channel.content_count }}
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-lock fa-solid fa-3x"></i></p>
                    <h3 class="text-primary">Exclusive Videos</h3>
                    {{ channel.exclusive_count }}
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-solid fa-users fa-3x"></i></p>
                    <h3 class="text-primary">Followers</h3>
                    {{ channel.follower_count }}
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <p><i class="fa-solid fa-dollar fa-3x"></i></p>
                    <h3 class="text-primary">Subscribers</h3>
                    {{ channel.subscriber_count }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'authUser',
            'channel',
        ],
    };
</script>
