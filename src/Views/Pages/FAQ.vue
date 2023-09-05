<template>
    <div class="container py-2">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <h1>FAQ</h1>

                <h2 class="text-primary">For Users</h2>

                <h3>What's the problem with ASMR?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <h4 class="text-decoration-underline">Ads are incompatible with ASMR</h4>
                        <p>In order for ASMR creators to make money, they have to place (pre-roll only) ads on their YouTube videos. These are often loud and immersion-breaking for listeners. We think there's a better way.</p>
                        <h4 class="text-decoration-underline">Ads pay creators poorly</h4>
                        <p>The amount a channel can get paid for their ads can vary, but it averages to about $5 for 1,000 views. ASMR creators are often paid even less (~$3) because their audience is not "actively engaged".</p>
                        <h4 class="text-decoration-underline">Big platforms are creator-unfriendly</h4>
                        <p>Big platforms often make sudden and unannounced changes to their algorithm that can hurt the profitability or exposure of a channel with little recourse for the creators.</p>
                        <h4 class="text-decoration-underline">Audio quality</h4>
                        <p>Audio is the most important aspect of ASMR - but video is the most important aspect of almost all other content on YouTube. {{ appName }} provides ASMR content with uncompressed audio so that you get the maximum benefit of high-quality audio.</p>
                    </div>
                </div>

                <h3>What if I don't want to pay for ASMR?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>{{ appName }} allows for totally free content alongside special, subscribers-only content.</p>
                        <p>By enabling subscriptions for certain content, we hope creators can spend more time creating high-quality (or experimental) content, and less time appeasing algorithms.</p>
                    </div>
                </div>

                <h3>Which creators are on {{ appName }}?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>Have a look around! {{ appName }} doesn't impose any limits on who can join - we're open to big and small creators alike!</p>
                    </div>
                </div>

                <h3>What about other platforms?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>There are many platforms that provide a paywall for content, such as Patreon, OnlyFans, and many others. The problem is, not all the content on them is ASMR. By creating our own space for ASMR, we can ensure users are only seeing relevant content.</p>
                    </div>
                </div>

                <h2 class="text-primary">For Creators</h2>
                <h3>How much can I earn?</h3>
                <div class="card mb-3">
                    <div class="card-body pb-0">
                        <p>At the moment, creators receive 80% of the subscription price. This means that from a subscription of $2.99, the creator will receive $2.39. All card-processing and banking fees are taken from the 20%.</p>
                        <p>Creators who join us early are added to a special "Founders Plan". This entitles them to 100% of their subscription revenue, forever.</p>
                    </div>
                </div>
                <h3></h3>
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
