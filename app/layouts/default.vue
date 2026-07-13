<template>
    <div class="bg-secondary-100 text-secondary-400 min-h-dvh font-ubuntu">
        <AHeader></AHeader>
        <div class="p-4 xs:p-8 sm:py-16 md:px-16 flex justify-center scroll-mt-24">
            <main class="max-w-4xl w-full">
                <slot />
            </main>
        </div>
        <ALightboxOverlay />
    </div>
</template>