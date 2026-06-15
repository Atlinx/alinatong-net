import { ref, onMounted, onUnmounted } from "vue";

  // Copied from TailwindCSS docs:
  // https://tailwindcss.com/docs/responsive-design#using-custom-breakpoints
const BREAKPOINT_MAP = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
}
type BreakpointType = keyof typeof BREAKPOINT_MAP
const SMALLER_BREAKPOINT_MAP: Map<BreakpointType, Set<BreakpointType>> = (() => {
  let res = new Map<BreakpointType, Set<BreakpointType>>()
  let arr: BreakpointType[] = []
  for (const _bp in BREAKPOINT_MAP) {
    const bp = _bp as BreakpointType
    res.set(bp, new Set<BreakpointType>(arr))
    arr.push(bp)
  }
  return res
})()
const BREAKPOINT_NAMES = Object.keys(BREAKPOINT_MAP) as BreakpointType[]

export function useBreakpoints() {
  const active = ref<BreakpointType>("md");

  const updateBreakpoint = () => {
    const windowWidth = window.innerWidth;
    let newBreakpoint = BREAKPOINT_NAMES[0]!; // Default to the smallest breakpoint

    for (let i = BREAKPOINT_NAMES.length - 1; i >= 0; i--) {
      const breakpointName = BREAKPOINT_NAMES[i]!;
      const minWidth = BREAKPOINT_MAP[breakpointName]!;

      if (windowWidth >= minWidth) {
        newBreakpoint = breakpointName;
        break;
      }
    }
    active.value = newBreakpoint;
  };

  const smaller = (breakpoint: BreakpointType) => SMALLER_BREAKPOINT_MAP.get(breakpoint)!.has(active.value)
  const smallerEqual = (breakpoint: BreakpointType) => smaller(breakpoint) || active.value == breakpoint
  const greater = (breakpoint: BreakpointType) => !smallerEqual(breakpoint)
  const greaterEqual = (breakpoint: BreakpointType) => !smaller(breakpoint)


  onMounted(() => {
    updateBreakpoint(); // Set initial value on mount
    window.addEventListener("resize", updateBreakpoint);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateBreakpoint);
  });

  return {
    active,
    smaller,
    greater,
    smallerEqual,
    greaterEqual
  };
}
