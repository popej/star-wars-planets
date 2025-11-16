<template>
  <div class="stars-background-container" :class="props.className">
    <canvas ref="canvasRef" class="stars-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number | null
}

interface Props {
  starDensity?: number
  allStarsTwinkle?: boolean
  twinkleProbability?: number
  minTwinkleSpeed?: number
  maxTwinkleSpeed?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  starDensity: 0.00015,
  allStarsTwinkle: true,
  twinkleProbability: 0.7,
  minTwinkleSpeed: 0.5,
  maxTwinkleSpeed: 1,
  className: ''
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let stars: Star[] = []
let animationFrameId: number | null = null

const generateStars = (width: number, height: number): Star[] => {
  const area = width * height
  const numStars = Math.floor(area * props.starDensity)
  const generatedStars: Star[] = []

  for (let i = 0; i < numStars; i++) {
    const shouldTwinkle = props.allStarsTwinkle || Math.random() < props.twinkleProbability

    generatedStars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.8 + 0.4,
      opacity: Math.random() * 0.6 + 0.4,
      twinkleSpeed: shouldTwinkle
        ? Math.random() * (props.maxTwinkleSpeed - props.minTwinkleSpeed) + props.minTwinkleSpeed
        : null
    })
  }

  return generatedStars
}

const drawStars = (ctx: CanvasRenderingContext2D, currentTime: number) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  stars.forEach(star => {
    let opacity = star.opacity

    if (star.twinkleSpeed !== null) {
      const twinkle = Math.sin(currentTime * 0.001 * star.twinkleSpeed) * 0.5 + 0.5
      opacity = star.opacity * twinkle
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()
  })
}

const animate = (currentTime: number) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawStars(ctx, currentTime)
  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = window.devicePixelRatio || 1

  canvas.style.width = '100vw'
  canvas.style.height = '100vh'

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  stars = generateStars(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  animationFrameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.stars-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

.stars-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>