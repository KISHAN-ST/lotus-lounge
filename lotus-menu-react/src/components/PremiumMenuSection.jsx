import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const DESKTOP_BREAKPOINT = 1024
const TABLET_BREAKPOINT = 768

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < TABLET_BREAKPOINT) return 1
  if (window.innerWidth < DESKTOP_BREAKPOINT) return 2
  return 4
}

export default function PremiumMenuSection({
  dishes,
  autoPlayMs = 1800,
  menuLink = '/menu',
  buttonText = 'View Complete Menu'
}) {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [activeIndex, setActiveIndex] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [sectionHovered, setSectionHovered] = useState(false)
  const [manualHover, setManualHover] = useState(false)

  const total = dishes.length
  const maxStart = Math.max(0, total - visibleCount)
  const shouldAutoplay = sectionHovered && !manualHover && total > 1

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!shouldAutoplay) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, autoPlayMs)

    return () => window.clearInterval(timer)
  }, [autoPlayMs, shouldAutoplay, total])

  useEffect(() => {
    setStartIndex((prev) => Math.min(prev, Math.max(0, total - visibleCount)))
  }, [visibleCount, total])

  useEffect(() => {
    if (activeIndex < startIndex) {
      setStartIndex(activeIndex)
      return
    }

    if (activeIndex > startIndex + visibleCount - 1) {
      setStartIndex(activeIndex - visibleCount + 1)
    }
  }, [activeIndex, startIndex, visibleCount])

  const translatePercent = useMemo(() => {
    return (startIndex * 100) / visibleCount
  }, [startIndex, visibleCount])

  const goPrev = () => {
    setManualHover(false)
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const goNext = () => {
    setManualHover(false)
    setActiveIndex((prev) => Math.min(total - 1, prev + 1))
  }

  if (!dishes?.length) return null

  return (
    <section
      className="relative overflow-hidden bg-[#07060a] py-16 text-[#f0ead8] md:py-20"
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => {
        setSectionHovered(false)
        setManualHover(false)
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(201,162,52,0.2),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(201,162,52,0.12),transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a234]/85">Top Picks</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-wide text-[#f6e7bf] md:text-4xl">Chef Curated Highlights</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#b8ab90] md:text-base">
            Premium signatures from Lotus Lounge, presented in a refined interactive showcase.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#c9a234]/20 bg-black/45 p-4 backdrop-blur-sm md:p-5">
          <motion.div
            className="flex"
            animate={{ x: `-${translatePercent}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {dishes.map((dish, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={dish.name + index}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                  onMouseEnter={() => {
                    setManualHover(true)
                    setActiveIndex(index)
                  }}
                  onMouseLeave={() => {
                    setManualHover(false)
                  }}
                >
                  <motion.article
                    className="group relative overflow-hidden rounded-2xl border border-[#c9a234]/25 bg-[#0a090d]"
                    animate={{
                      scale: isActive ? 1.035 : 0.98,
                      y: isActive ? -7 : 0,
                      opacity: isActive ? 1 : 0.52,
                      filter: isActive ? 'brightness(1.08)' : 'brightness(0.68)'
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: isActive
                        ? '0 0 0 1px rgba(201,162,52,0.55), 0 18px 32px rgba(201,162,52,0.22)'
                        : '0 10px 22px rgba(0,0,0,0.45)'
                    }}
                  >
                    <div className="relative h-56 overflow-hidden md:h-60">
                      <motion.img
                        src={dish.image}
                        alt={dish.name}
                        className="h-full w-full object-cover"
                        animate={{ scale: isActive ? 1.08 : 1.01 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                      <span className="absolute left-3 top-3 rounded-full border border-[#c9a234]/70 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f5d77f]">
                        {dish.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-medium leading-tight text-[#f0e6cb]">{dish.name}</h3>
                    </div>
                  </motion.article>
                </div>
              )
            })}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a234]/55 bg-black/55 text-xl text-[#f5d77f] transition hover:border-[#c9a234] hover:bg-[#c9a234]/15 disabled:cursor-not-allowed disabled:opacity-35"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            disabled={activeIndex === total - 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a234]/55 bg-black/55 text-xl text-[#f5d77f] transition hover:border-[#c9a234] hover:bg-[#c9a234]/15 disabled:cursor-not-allowed disabled:opacity-35"
          >
            →
          </button>
        </div>

        <div className="mt-11 flex justify-center">
          <a
            href={menuLink}
            className="group relative inline-flex items-center overflow-hidden rounded-full border border-[#c9a234]/80 px-8 py-3 text-xs uppercase tracking-[0.22em] text-[#f4e2b4] md:text-sm"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#c9a234] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{buttonText}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
