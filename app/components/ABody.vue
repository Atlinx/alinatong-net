<script setup lang="ts">
const email_address = useState("email_address", () => "");
function reveal_email() {
  email_address.value = atob("YWxpbmF0QGVuZ2luZWVyaW5nLnVwZW5uLmVkdQ==");
}
const last_updated = new Date("2026-6-15 12:08 PM EST")
</script>

<template>
  <div id="top" class="p-8 sm:py-16 md:px-16 flex justify-center scroll-mt-24">
    <div class="max-w-4xl flex flex-col gap-16">
      <div class="flex flex-col gap-8 sm:flex-row sm:max-w-full">
        <div class="sm:grow flex flex-col gap-2 items-start">
          <h1 class="inline-block font-bebas text-6xl sm:text-8xl text-primary">
            alina tong
          </h1>
          <div class="flex gap-2">
            <a target="_blank" href="https://github.com/atlinx">github</a>
            <a target="_blank" href="https://linkedin.com/in/alinatong">linkedin</a>
          </div>
          <p>
            I am an incoming MS Robotics student at the University of Pennsylvania. 
            Prior to that I was a research assistant for Professor Bekris'
            <a target="_blank" href="https://pracsys.cs.rutgers.edu/">Pracsys Lab</a>
            at Rutgers. I'm interested in robot learning, including
            reinforcement learning and imitation learning. I also do a little
            bit of
            <a target="_blank" href="https://fracturalstudios.com/">game development</a>
            in my free time. You can contact me through the email listed below.
          </p>
          <div class="flex flex-wrap gap-4 mt-4">
            <button class="btn" @click="reveal_email">show email</button>
            <p>{{ email_address }}</p>
          </div>
        </div>
        <img
          class="hidden aspect-square max-w-100 sm:block sm:max-w-none sm:h-80 sm:w-60 md:h-80 md:w-80 object-cover max-sm:object-[100%_40%] border border-primary bg-primary"
          alt="Portrait of myself standing in front of a London skyline." src="/images/portrait.webp" />
      </div>
      <section id="publications" class="scroll-mt-24">
        <AContentSection collection="publications" preview="show_stripes" />
      </section>
      <section id="projects" class="scroll-mt-24">
        <AContentSection collection="projects" preview="show_stripes" />
      </section>
      <section id="experience" class="scroll-mt-24">
        <AContentSection collection="experience" preview="none" />
      </section>
      <section id="education" class="scroll-mt-24">
        <AContentSection collection="education" preview="none" />
      </section>

      <div class="mt-8 inline-flex flex-wrap text-fg-muted">
        <p class="mr-10">Last Updated:</p>
        <p>{{ last_updated }}</p>
      </div>
    </div>
  </div>
</template>