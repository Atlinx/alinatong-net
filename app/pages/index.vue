<script setup lang="ts">
const email_address = useState("email_address", () => "");
function reveal_email() {
    email_address.value = atob("YWxpbmF0QGVuZ2luZWVyaW5nLnVwZW5uLmVkdQ==");
}
const last_updated = new Date("2026-7-2 7:41 PM EST")
</script>

<template>
    <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-8 sm:flex-row sm:max-w-full">
            <div class="sm:grow flex flex-col gap-2 items-start">
                <h1 class="inline-block font-league-gothic text-6xl sm:text-8xl text-primary">
                    alina tong
                </h1>
                <div class="flex gap-4">
                    <NuxtLink target="_blank" to="https://github.com/atlinx" class="link icon-btn" aria-label="Go to my Github page." >github
                        <Icon name="mdi:github" size="18"/>
                    </NuxtLink>
                    <NuxtLink target="_blank" to="https://linkedin.com/in/alinatong" class="link icon-btn" aria-label="Go to my Linkedin page." >linkedin
                        <Icon name="mdi:linkedin" size="18"/>
                    </NuxtLink>
                </div>
                <p>
                    I am an incoming MS Robotics student at the University of Pennsylvania.
                    Prior to that I was a research assistant for Professor Bekris'
                    <NuxtLink target="_blank" to="https://pracsys.cs.rutgers.edu/" class="link">Pracsys Lab</NuxtLink>
                    at Rutgers. I'm interested in robot learning, including
                    VLAs, reinforcement learning, and imitation learning. I also do a little
                    bit of
                    <NuxtLink target="_blank" to="https://fracturalstudios.com/" class="link">game development</NuxtLink>
                    in my free time. You can contact me through the email listed below.
                </p>
                <div class="flex flex-wrap gap-4 mt-4">
                    <button class="btn" @click="reveal_email">show email</button>
                    <p>{{ email_address }}</p>
                </div>
            </div>
            <NuxtImg class="aspect-square max-w-full xs:max-w-sm sm:max-w-none sm:h-80 sm:w-60 md:h-80 md:w-80 object-cover max-sm:object-[100%_40%] border border-primary bg-primary text-secondary-100"
                alt="Portrait of myself standing in front of a London skyline." src="/images/portrait.webp" densities="x1" />
        </div>
        <section id="research" class="scroll-mt-24">
            <LazyAContentSection collection="research" preview="show_stripes" />
        </section>
        <section id="projects" class="scroll-mt-24">
            <LazyAContentSection collection="projects" preview="show_stripes" />
        </section>
        <section id="experience" class="scroll-mt-24">
            <LazyAContentSection collection="experience" preview="none" logo="always" />
        </section>
        <section id="education" class="scroll-mt-24">
            <LazyAContentSection collection="education" preview="none" logo="always" />
        </section>

        <div class="mt-8 inline-flex flex-wrap text-secondary-300">
            <p class="mr-10">Last Updated:</p>
            <p>{{ last_updated }}</p>
        </div>
    </div>
</template>