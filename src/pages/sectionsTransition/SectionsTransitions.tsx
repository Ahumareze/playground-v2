import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  '/images/img-1.jpg',
  '/images/img-2.jpg',
  '/images/img-3.jpg',
]

export default function SectionsTransitions() {
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imagesRef.current, {
        scale: 0,
        transformOrigin: 'center center'
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${images.length * 100}%`,
          scrub: true,
          pin: true,
        }
      })

      imagesRef.current.forEach((img, i) => {
        tl.to(
          img,
          {
            scale: 1,
            ease: 'none',
            duration: 1
          },
          i
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => (imagesRef.current[i] = el)}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
    </div>
  )
}
