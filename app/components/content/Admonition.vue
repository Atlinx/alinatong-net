<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error'
}>(), {
  type: 'info',
})

const typeClasses: Record<NonNullable<typeof props.type>, {
    icon?: string,
    title?: string,
    container_classes?: string,
    title_classes?: string
}> = {
  info: { icon: 'mdi:information', title: "Info", container_classes: 'border-primary bg-secondary-150', title_classes: 'text-primary' },
  success: { icon: 'mdi:check-circle', title: "Success", container_classes: 'border-success bg-success/15', title_classes: 'text-success' },
  warning: { icon: 'mdi:alert', title: "Warning", container_classes: 'border-warning bg-warning/15', title_classes: 'text-warning' },
  error: { icon: 'mdi:alert-circle-outline', title: "Error", container_classes: 'border-error bg-error/15', title_classes: 'text-error' },
  danger: { icon: 'mdi:alert-circle', title: "Danger", container_classes: 'border-error bg-error/15', title_classes: 'text-error' }
}
</script>

<template>
  <aside
    :class="[
      'my-6 rounded border-l-4 px-4 py-3',
      typeClasses[type].container_classes
    ]"
  >
    <p :class="['mb-2 flex items-center gap-2 font-bold', typeClasses[type].title_classes]">
        <Icon v-if="typeClasses[type].icon" :name="typeClasses[type].icon ?? ''" size="18" />
        <span>{{ title ?? typeClasses[type].title }}</span>
    </p>

    <div class="text-secondary-400">
      <slot mdc-unwrap="p" />
    </div>
  </aside>
</template>
