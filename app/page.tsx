"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Music, Calendar, MapPin, Mail, Phone, Instagram, Facebook, Youtube, Play, User, MessageSquare, CheckCircle } from "lucide-react"
import LoadingScreen from "@/components/LoadingScreen"
import VideoSlider from "@/components/VideoSlider"

export default function MusicaholicBandWebsite() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 7000) // 7 seconds

    return () => clearTimeout(timer)
  }, [])

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState("hero")
  const { scrollY } = useScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "members", "gallery", "shows", "music", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const bandMembers = [
    {
      name: "Ankit",
      role: "Lead Vocalist, Rhythm Guitarist",
      bio: "The soulful voice and dynamic frontman of MUSICAHOLIC द Band. With his charismatic stage presence and versatile vocals, he sets the vibe for every performance.",
      image: "/images/ankit-performance.jpg",
    },
    {
      name: "Shane",
      role: "Drummer, Percussionist",
      bio: "Shane drives the heartbeat of the band with his tight grooves and energetic drumming. His mastery over percussion adds a unique fusion feel to their sound.",
      image: "/images/shane.jpg",
    },
    {
      name: "Abhay",
      role: "Keys & Synths",
      bio: "Abhay brings a modern, ambient layer to the band's music with his keys and synths. From semi-classical textures to cinematic Bollywood sounds, he elevates every song.",
      image: "/images/abhay.jpg",
    },
  ]

  const upcomingShows = [
    {
      date: "2024-02-15",
      venue: "Phoenix Palassio, Lucknow",
      time: "7:00 PM",
      type: "Live Concert",
    },
    {
      date: "2024-02-28",
      venue: "Gomti Riverfront, Lucknow",
      time: "6:30 PM",
      type: "Sufi Night",
    },
    {
      date: "2024-03-10",
      venue: "La Martiniere College, Lucknow",
      time: "5:00 PM",
      type: "College Fest",
    },
  ]

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Enhanced Navigation with Better Hero Integration */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto bg-black/80 backdrop-blur-xl rounded-full px-8 py-4 border border-amber-500/20 shadow-2xl shadow-amber-500/10 tracking-tight leading-4 font-sans my-[-22px]">
          {/* Logo Left */}
          <motion.div
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <img
              src="/images/musicaholic-logo.png"
              alt="MUSICAHOLIC द Band"
              className="h-10 w-auto filter brightness-110"
            />
          </motion.div>

          {/* Menu Center */}
          <div className="flex items-center space-x-1 flex-1 justify-center mx-8">
            {["hero", "about", "members", "gallery", "shows", "music", "contact"].map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                  currentSection === section ? "text-black" : "text-white/70 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                {/* Active section background */}
                {currentSection === section && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <span className="relative z-10 capitalize text-xs lg:text-sm">
                  {section === "hero" ? "Home" : section}
                </span>

                {/* Active indicator dot */}
                {currentSection === section && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Contact Right */}
          <motion.div
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-4 py-2 rounded-full font-semibold text-xs lg:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
              onClick={() => scrollToSection("contact")}
            >
              Book Now
            </Button>
          </motion.div>

          {/* Navigation progress indicator */}
          <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-red-500"
              style={{
                width: `${((["hero", "about", "members", "gallery", "shows", "music", "contact"].indexOf(currentSection) + 1) / 7) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between max-w-sm mx-auto bg-black/85 backdrop-blur-xl rounded-full px-4 py-3 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
          {/* Logo Left */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <img
              src="/images/musicaholic-logo.png"
              alt="MUSICAHOLIC द Band"
              className="h-7 w-auto filter brightness-110"
            />
          </motion.div>

          {/* Menu Button Right */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              className="w-5 h-5 flex flex-col justify-center items-center"
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-4 h-0.5 bg-amber-400 block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 1.5 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-4 h-0.5 bg-amber-400 block mt-0.5"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-4 h-0.5 bg-amber-400 block mt-0.5"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -1.5 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Mobile Menu Panel */}
                <motion.div
                  className="fixed top-16 left-4 right-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/10 overflow-hidden"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="p-6">
                    <div className="space-y-2">
                      {["hero", "about", "members", "gallery", "shows", "music", "contact"].map((section, index) => (
                        <motion.button
                          key={section}
                          onClick={() => {
                            scrollToSection(section)
                            setMobileMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                            currentSection === section
                              ? "bg-gradient-to-r from-amber-400 to-red-500 text-black font-semibold"
                              : "text-white/80 hover:text-white hover:bg-white/5"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                currentSection === section ? "bg-black" : "bg-amber-400/50"
                              }`}
                            />
                            <span className="capitalize text-base">{section === "hero" ? "Home" : section}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="mt-6 pt-6 border-t border-amber-500/20">
                      <div className="flex justify-center space-x-4 mb-4">
                        <motion.button
                          className="p-2 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Instagram"
                          onClick={() => window.open("https://www.instagram.com/musicaholictheband?igsh=N3NsZzFxd3ZueW8x", "_blank")}
                        >
                          <Instagram className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="YouTube"
                        >
                          <Youtube className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white rounded-full font-semibold text-sm py-2.5"
                        onClick={() => {
                          scrollToSection("contact")
                          setMobileMenuOpen(false)
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ y: backgroundY }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center absolute inset-0 z-0 opacity-40"
            style={{ minHeight: '100%', minWidth: '100%' }}
          >
            <source src="/video/herobanner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-amber-900/20 z-10" />
        </motion.div>

        {/* Floating Musical Notes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-400/20 text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
              }}
              animate={{
                y: -100,
                rotate: 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              ♪
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center z-10 w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl mx-auto px-2 sm:px-6"
          style={{ y: textY }}
        >
          <motion.h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_4px_24px_rgba(255,102,0,0.25)] font-[cursive,sans-serif] uppercase leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            MUSICAHOLIC द Band
          </motion.h1>

          <motion.p
            className="text-base xs:text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Reimagining India's Musical Heritage for the Modern Era
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center w-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-5 py-2 text-base rounded-full font-semibold md:px-8 md:py-3 md:text-lg"
              onClick={() => scrollToSection("contact")}
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-5 py-2 text-base rounded-full font-semibold bg-transparent md:px-8 md:py-3 md:text-lg"
              onClick={() => scrollToSection("music")}
            >
              <Play className="mr-2 h-4 w-4" />
              Listen Now
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fbbf24%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              The Soul Behind The Sound
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          {/* Evocative Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-2xl md:text-3xl font-light text-amber-300 mb-8 leading-relaxed italic">
              "In the heart of Lucknow, where ancient melodies dance with modern rhythms, three souls united by an
              unquenchable thirst for musical expression..."
            </p>
          </motion.div>

          {/* Musical Journey Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-amber-400 mb-4">Our Musical Odyssey</h3>
              <p className="text-lg leading-relaxed text-white/90">
                Born from the confluence of tradition and innovation,{" "}
                <span className="text-amber-400 font-semibold">MUSICAHOLIC द Band</span> emerged as a sonic revolution.
                We don't just play music—we weave stories that transcend time, blending the mystical depths of Sufi
                poetry with the thunderous power of rock, the cinematic grandeur of Bollywood with the intricate beauty
                of semi-classical ragas.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Each performance is a journey through India's rich musical tapestry, reimagined for souls who crave
                authenticity in an age of artifice. We are the bridge between the ancient and the eternal, the
                traditional and the transformational.
              </p>
            </div>

            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-red-500/20 rounded-lg blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-gradient-to-br from-black/50 to-red-900/30 p-8 rounded-lg border border-amber-500/30">
                <h4 className="text-xl font-bold text-red-400 mb-4">Our Musical DNA</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">
                      <strong className="text-amber-400">Sufi Mysticism:</strong> Soul-stirring spiritual journeys
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">
                      <strong className="text-red-400">Rock Power:</strong> Electrifying energy and raw emotion
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">
                      <strong className="text-amber-400">Bollywood Magic:</strong> Cinematic storytelling through sound
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">
                      <strong className="text-red-400">Classical Roots:</strong> Timeless ragas meet contemporary
                      expression
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Band's Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="bg-gradient-to-r from-red-900/20 via-black/50 to-amber-900/20 p-12 rounded-2xl border border-amber-500/20">
              <h3 className="text-3xl font-bold text-amber-400 mb-6">Our Philosophy</h3>
              <p className="text-xl leading-relaxed text-white/90 max-w-4xl mx-auto mb-6">
                Music is the universal language that speaks directly to the heart. We believe in creating experiences
                that don't just entertain, but transform. Every note we play, every word we sing, carries the weight of
                our ancestors' wisdom and the hope of tomorrow's dreams.
              </p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-amber-400 to-red-500 h-1 w-32 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Band Member Integration */}
          

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-black/80 via-red-900/30 to-black/80 p-12 rounded-2xl border border-amber-500/30">
              <h3 className="text-3xl font-bold text-amber-400 mb-4">Ready to Experience the Magic?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join us on this extraordinary musical journey where tradition meets innovation, and every performance
                becomes a celebration of India's timeless musical heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-8 py-3 rounded-full font-semibold"
                  onClick={() => scrollToSection("music")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Our Music
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-3 rounded-full font-semibold bg-transparent"
                  onClick={() => scrollToSection("shows")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Shows
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Book Us Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Band Members Section */}
      <section id="members" className="py-20 px-6 bg-gradient-to-b from-black to-red-900/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              Meet The Artists
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {bandMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative bg-black/80 border border-amber-400/20 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-amber-400/20">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className={`w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl ${member.name === "Ankit" ? "object-center" : "object-top"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
                      <h3 className="text-2xl font-bold text-amber-400 mb-1 drop-shadow-lg">{member.name}</h3>
                      <p className="text-red-400 font-medium drop-shadow">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-b-2xl">
                    <p className="text-white/90 leading-relaxed text-base">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              Live Moments
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/images/ankit-acoustic.jpg",
              "/images/ankit-stage.jpg",
              "/images/ankit-performance.jpg",
              "/images/abhay.jpg",
              "/images/shane.jpg",
              "/images/ankit-acoustic.jpg",
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => {
                  const modal = document.createElement('div');
                  modal.style.position = 'fixed';
                  modal.style.top = '0';
                  modal.style.left = '0';
                  modal.style.width = '100vw';
                  modal.style.height = '100vh';
                  modal.style.background = 'rgba(0,0,0,0.95)';
                  modal.style.display = 'flex';
                  modal.style.alignItems = 'center';
                  modal.style.justifyContent = 'center';
                  modal.style.zIndex = '9999';
                  modal.onclick = () => document.body.removeChild(modal);
                  const img = document.createElement('img');
                  img.src = image;
                  img.alt = `Performance ${index + 1}`;
                  img.style.maxWidth = '90vw';
                  img.style.maxHeight = '90vh';
                  img.style.borderRadius = '1rem';
                  img.style.boxShadow = '0 0 40px 8px rgba(0,0,0,0.7)';
                  img.onclick = e => e.stopPropagation();
                  modal.appendChild(img);
                  document.body.appendChild(modal);
                }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Performance ${index + 1}`}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: '4/3', display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Shows Section */}
      <section id="shows" className="py-20 px-6 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/video/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-amber-900/50 z-10"></div>

        <div className="max-w-6xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              Upcoming Shows
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="space-y-6">
            {upcomingShows.map((show, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative bg-black/80 border border-amber-400/30 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-400/30 backdrop-blur-md">
                  <CardContent className="p-6 bg-gradient-to-r from-black/90 via-black/70 to-black/50 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="bg-gradient-to-br from-amber-400/20 to-red-500/20 p-3 rounded-full shadow">
                          <Calendar className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-amber-400 drop-shadow mb-1">{show.type}</h3>
                          <p className="text-sm text-white/80 font-medium">
                            {new Date(show.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-white/80">
                          <MapPin className="h-4 w-4 text-amber-400" />
                          <span className="font-medium text-white/90">{show.venue}</span>
                        </div>
                        <div className="text-red-400 font-semibold text-lg tracking-wide">{show.time}</div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 rounded-full font-semibold px-6 shadow-md"
                        >
                          Book Tickets
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 px-4 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-30"
            style={{ aspectRatio: '9/16' }}
          >
            <source src="/video/guitar.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-amber-900/50 z-10"></div>

        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              Experience Our Music
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-4"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Immerse yourself in our captivating performances, blending traditional melodies with modern rhythms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left side - Video Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <VideoSlider />
            </motion.div>

            {/* Right side - Audio Player and Additional Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Audio Player */}
              <div className="bg-gradient-to-br from-black/50 to-red-900/30 p-6 rounded-2xl border border-amber-500/30 shadow-xl">
                <h4 className="text-xl font-bold text-amber-400 mb-6">Featured Tracks</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-white/80 mb-2">Project 6</p>
                    <audio controls className="w-full">
                      <source src="/audio/Project_6.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div>
                    <p className="text-white/80 mb-2">Untitled</p>
                    <audio controls className="w-full">
                      <source src="/audio/untitled.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>

              {/* Additional Content */}
              <div className="bg-gradient-to-br from-black/50 to-amber-900/30 p-6 rounded-2xl border border-amber-500/30 shadow-xl">
                <h4 className="text-xl font-bold text-amber-400 mb-4">Our Musical Journey</h4>
                <p className="text-white/80 mb-4">
                  From soulful Sufi nights to electrifying rock performances, our music transcends genres and touches hearts.
                  Each note carries the essence of India's rich musical heritage, reimagined for the modern era.
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>Fusion of traditional and contemporary sounds</li>
                  <li>Collaborations with renowned artists</li>
                  <li>Live performances across India</li>
                  <li>Unique blend of Sufi, Rock, and Bollywood</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/80 mb-4">Stay updated with our latest performances and behind-the-scenes content</p>
            <div className="flex justify-center space-x-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-semibold"
                onClick={() => window.open("https://www.instagram.com/musicaholictheband?igsh=N3NsZzFxd3ZueW8x", "_blank")}
              >
                <Instagram className="mr-1.5 h-4 w-4" />
                Follow on Instagram
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-full font-semibold"
                onClick={() => window.open("https://www.facebook.com/ankit.pathak.754918?mibextid=wwXIfr&rdid=C7aRgWLHFe0YlxEJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19hBTSUCUw%2F%3Fmibextid%3DwwXIfr", "_blank")}
              >
                <Facebook className="mr-1.5 h-4 w-4" />
                Like on Facebook
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-black to-red-900/20 relative">
        <div className="absolute inset-0 bg-[url('/images/ankit-performance.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              Let's Create Magic Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-black/70 via-black/60 to-red-900/30 border-2 border-amber-400/30 p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-amber-400/10 hover:scale-[1.025] transition-transform duration-300">
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-400 to-red-500 rounded-full opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight text-left drop-shadow-lg">Book Us for Your Event</h3>
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-amber-400 mb-2">Thank You!</h4>
                    <p className="text-white/80">We've received your booking inquiry and will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-5"
                    onSubmit={e => {
                      e.preventDefault();
                      const form = e.target;
                      const name = form.name.value;
                      const phone = form.phone.value;
                      const email = form.email.value;
                      const event = form.event.value;
                      const details = form.details.value;
                      const msg =
                        `🎶 *New Booking Inquiry* 🎶%0A` +
                        `----------------------------------%0A` +
                        `👤 *Name:* ${name}%0A` +
                        `📞 *Phone:* ${phone}%0A` +
                        `✉️ *Email:* ${email}%0A` +
                        `📅 *Event Date & Venue:* ${event}%0A` +
                        `📝 *Details:* ${details}%0A` +
                        `----------------------------------%0A` +
                        `Sent from MUSICAHOLIC द Band Website`;
                      window.open(`https://wa.me/918303860422?text=${encodeURIComponent(msg)}`);
                      setFormSubmitted(true);
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          name="name"
                          placeholder="Your Name"
                          className="bg-black/70 border border-amber-400/40 focus:border-amber-400/80 text-amber-100 placeholder:text-amber-300 rounded-xl py-3 pl-10 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400 transition-all duration-200"
                          minLength={3}
                          maxLength={40}
                          autoComplete="name"
                          required
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 h-5 w-5" />
                      </div>
                      <div className="relative">
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          className="bg-black/70 border border-amber-400/40 focus:border-amber-400/80 text-amber-100 placeholder:text-amber-300 rounded-xl py-3 pl-10 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400 transition-all duration-200"
                          pattern="[0-9]{10,15}"
                          minLength={10}
                          maxLength={15}
                          autoComplete="tel"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 h-5 w-5" />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        name="email"
                        placeholder="Email Address"
                        className="bg-black/70 border border-amber-400/40 focus:border-amber-400/80 text-amber-100 placeholder:text-amber-300 rounded-xl py-3 pl-10 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400 transition-all duration-200"
                        required
                        type="email"
                        autoComplete="email"
                        maxLength={60}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 h-5 w-5" />
                    </div>
                    <div className="relative">
                      <Input
                        name="event"
                        placeholder="Event Date & Venue"
                        className="bg-black/70 border border-amber-400/40 focus:border-amber-400/80 text-amber-100 placeholder:text-amber-300 rounded-xl py-3 pl-10 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400 transition-all duration-200"
                        required
                        maxLength={80}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 h-5 w-5" />
                    </div>
                    <div className="relative">
                      <Textarea
                        name="details"
                        placeholder="Tell us about your event..."
                        className="bg-black/70 border border-amber-400/40 focus:border-amber-400/80 text-amber-100 placeholder:text-amber-300 min-h-[120px] rounded-xl py-3 pl-10 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400 transition-all duration-200"
                        required
                        minLength={10}
                        maxLength={500}
                      />
                      <MessageSquare className="absolute left-3 top-4 text-amber-400/60 h-5 w-5" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 hover:from-red-700 hover:to-amber-500 text-black font-bold text-lg py-3 rounded-xl shadow-lg transition-all duration-300 border-2 border-amber-400/60 tracking-wide uppercase"
                      type="submit"
                    >
                      Send Booking Inquiry via WhatsApp
                    </motion.button>
                  </form>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-amber-400" />
                    <span className="text-white/80">Based in Lucknow, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-amber-400" />
                    <span className="text-white/80">Pathakanurag0502@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-400" />
                    <span className="text-white/80">+91 83038 60422</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-4">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() => window.open("https://www.instagram.com/musicaholictheband?igsh=N3NsZzFxd3ZueW8x", "_blank")}
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>YouTube</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() => window.open("https://www.facebook.com/ankit.pathak.754918?mibextid=wwXIfr&rdid=C7aRgWLHFe0YlxEJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19hBTSUCUw%2F%3Fmibextid%3DwwXIfr", "_blank")}
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </motion.button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-900/20 to-red-900/20 p-6 rounded-lg border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-2">Ready to Experience the Magic?</h4>
                <p className="text-white/80 text-sm">
                  From intimate acoustic sessions to grand concert performances, we bring the perfect blend of tradition
                  and modernity to every stage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-amber-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © 2024 MUSICAHOLIC द Band. Reimagining India's Musical Heritage for the Modern Era.
          </p>
        </div>
      </footer>
    </div>
  )
}

