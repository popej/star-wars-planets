<template>
  <div class="shooting-stars-container">
    <svg
      :class="props.className"
      class="shooting-stars-svg"
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    >
      <defs>
        <linearGradient
          v-for="star in stars"
          :key="`gradient-${star.id}`"
          :id="`gradient-${star.id}`"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" :stop-color="props.trailColor" stop-opacity="0" />
          <stop offset="100%" :stop-color="props.starColor" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect
        v-for="star in stars"
        :key="`star-${star.id}`"
        :x="star.x"
        :y="star.y"
        :width="star.width"
        :height="props.starHeight"
        :fill="`url(#gradient-${star.id})`"
        :transform="`rotate(${star.angle}, ${star.x + star.width / 2}, ${star.y + props.starHeight / 2})`"
        :style="{
          animation: `shoot-${star.id} ${star.duration}ms linear forwards`,
          opacity: 0
        }"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">

interface Star {
  id: number
  x: number
  y: number
  angle: number
  width: number
  duration: number
}

interface Props {
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  minSpeed: 10,
  maxSpeed: 30,
  minDelay: 1200,
  maxDelay: 4200,
  starColor: '#9E00FF',
  trailColor: '#2EB9DF',
  starWidth: 10,
  starHeight: 1,
  className: ''
})

const stars = ref<Star[]>([])
const svgWidth = ref(0)
const svgHeight = ref(0)
let starIdCounter = 0
let timeouts: number[] = []
let styleElement: HTMLStyleElement | null = null

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4)
  const offset = Math.random() * window.innerWidth

  switch (side) {
    case 0: return { x: offset, y: 0, angle: 45 }
    case 1: return { x: window.innerWidth, y: offset, angle: 135 }
    case 2: return { x: offset, y: window.innerHeight, angle: 225 }
    case 3: return { x: 0, y: offset, angle: 315 }
    default: return { x: 0, y: 0, angle: 45 }
  }
}

const createStar = () => {
  const { x, y, angle } = getRandomStartPoint()
  const id = starIdCounter++
  const speed = Math.random() * (props.maxSpeed - props.minSpeed) + props.minSpeed
  const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5
  const duration = (distance / speed) * 16
  const width = Math.random() * props.starWidth + props.starWidth

  if (!styleElement) {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
  }

  const keyframes = `
    @keyframes shoot-${id} {
      0% {
        transform: translate(0, 0) rotate(${angle}deg);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translate(${distance}px, ${distance}px) rotate(${angle}deg);
        opacity: 0;
      }
    }
  `

  if (styleElement.sheet) {
    styleElement.sheet.insertRule(keyframes, styleElement.sheet.cssRules.length)
  }

  const newStar: Star = {
    id,
    x,
    y,
    angle,
    width,
    duration
  }

  stars.value.push(newStar)
    //   console.log(`Created shooting star #${id} at (${x}, ${y}) with duration ${duration}ms`)

  setTimeout(() => {
    stars.value = stars.value.filter(s => s.id !== id)
  }, duration)
}

const scheduleNextStar = () => {
  const delay = Math.random() * (props.maxDelay - props.minDelay) + props.minDelay
  const timeout = window.setTimeout(() => {
    createStar()
    scheduleNextStar()
  }, delay)
  timeouts.push(timeout)
}

const updateDimensions = () => {
  svgWidth.value = window.innerWidth
  svgHeight.value = window.innerHeight
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
  scheduleNextStar()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimensions)
  timeouts.forEach(timeout => clearTimeout(timeout))
  if (styleElement && styleElement.parentNode) {
    styleElement.parentNode.removeChild(styleElement)
  }
})
</script>

<style scoped>
.shooting-stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}

.shooting-stars-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
</style>