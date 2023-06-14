<template>
    <div class="container py-2">
        <div class="row">
            <div class="col-12">
                <h1>FAQ</h1>

                <h2 class="text-primary">For Users</h2>

                <h3>What's the problem with YouTube?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <h4 class="text-decoration-underline">Ads on YouTube are disruptive</h4>
                        <p>In order for ASMR creators to make money, they have to place ads on their YouTube videos. These are often loud and immersion-breaking for listeners. Let's get rid of them, shall we?</p>
                        <h4 class="text-decoration-underline">Ads pay creators poorly</h4>
                        <p>The amount a channel can get paid for their ads can vary, but it averages to about $5 for 1,000 views. ASMR creators are often paid even less because their audience is not actively engaged.</p>
                        <h4 class="text-decoration-underline">YouTube is creator-unfriendly</h4>
                        <p>YouTube often makes unannounced changes to their algorithm that can hurt the profitability or exposure of a channel.</p>
                        <h4 class="text-decoration-underline">Audio quality</h4>
                        <p>Audio is the most important aspect of ASMR - but video is the most important aspect of almost all other YouTube content. {{ appName }} provides ASMR content with uncompressed audio so that you get the maximum benefit of high-quality audio.</p>
                    </div>
                </div>

                <h3>What if I don't want to pay for ASMR?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>{{ appName }} allows for totally free content alongside premium, subscribers-only content.</p>
                        <p>By enabling subscriptions for premium content, we hope creators can spend more time creating high-quality (or experimental) content, and less time appeasing algorithms.</p>
                    </div>
                </div>

                <h3>Which creators are on {{ appName }}?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>{{ appName }} is not limited to specific creators. Anyone can join.</p>
                    </div>
                </div>

                <h3>What about other platforms?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>There are many platforms that provide a paywall for content, such as Patreon, OnlyFans, and many others. The problem is, not all the content on them is ASMR. By creating a platform specifically for ASMR, we can build features designed specifically around ASMR.</p>
                    </div>
                </div>

                <h2 class="text-primary">For Creators</h2>
                <h3>How much can I earn?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>At the moment, creators receive 80% of the subscription price. This means that from a subscription of $2.99, the creator will receive $2.39. All card-processing and banking fees are taken from
                            {{ appName }}'s 20%.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import env from "../../env";

    export default {
        computed: {
            appName () {
                return env.name;
            }
        }
    }
</script>
