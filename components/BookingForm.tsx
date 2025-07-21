'use client';

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Mail, Phone, User, MessageSquare, CheckCircle, Send } from "lucide-react"

// Form validation schema
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).max(15),
  email: z.string().email({ message: "Please enter a valid email address" }),
  event: z.string().min(5, { message: "Please provide event details" }),
  details: z.string().min(10, { message: "Please provide more details about your event" })
})

type BookingFormData = z.infer<typeof bookingFormSchema>

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onChange"
  })

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const msg =
        `🎶 *New Booking Inquiry* 🎶%0A` +
        `----------------------------------%0A` +
        `👤 *Name:* ${data.name}%0A` +
        `📞 *Phone:* ${data.phone}%0A` +
        `✉️ *Email:* ${data.email}%0A` +
        `📅 *Event Date & Venue:* ${data.event}%0A` +
        `📝 *Details:* ${data.details}%0A` +
        `----------------------------------%0A` +
        `Sent from MUSICAHOLIC द Band Website`

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/918303860422?text=${msg}`, "_blank")
      
      // Show success state
      setFormSubmitted(true)
      reset() // Reset form fields
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("An error occurred while submitting your inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight text-left drop-shadow-lg">
        Book Us for Your Event
      </h3>
      
      {submitError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border-l-4 border-red-500 text-red-100 p-4 mb-6 rounded-r-lg"
          role="alert"
        >
          <p className="font-medium">Error</p>
          <p>{submitError}</p>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-l-4 border-green-500 p-6 rounded-lg text-center"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h3 className="text-2xl font-bold text-green-100">Thank You!</h3>
              <p className="text-green-200">
                Your booking inquiry has been submitted successfully. We'll get back to you soon!
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-red-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Another Inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Event booking form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className={`w-full bg-black/80 border-2 ${errors.name ? 'border-red-500' : 'border-amber-400/40 focus:border-amber-400'} text-amber-100 placeholder:text-amber-300/70 rounded-xl py-4 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 group-hover:border-amber-400/60`}
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400/70 h-5 w-5 transition-colors group-hover:text-amber-400" />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full bg-black/80 border-2 ${errors.phone ? 'border-red-500' : 'border-amber-400/40 focus:border-amber-400'} text-amber-100 placeholder:text-amber-300/70 rounded-xl py-4 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 group-hover:border-amber-400/60`}
                  autoComplete="tel"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400/70 h-5 w-5 transition-colors group-hover:text-amber-400" />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className={`w-full bg-black/80 border-2 ${errors.email ? 'border-red-500' : 'border-amber-400/40 focus:border-amber-400'} text-amber-100 placeholder:text-amber-300/70 rounded-xl py-4 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 group-hover:border-amber-400/60`}
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400/70 h-5 w-5 transition-colors group-hover:text-amber-400" />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <input
                {...register("event")}
                placeholder="Event Date & Venue"
                className={`w-full bg-black/80 border-2 ${errors.event ? 'border-red-500' : 'border-amber-400/40 focus:border-amber-400'} text-amber-100 placeholder:text-amber-300/70 rounded-xl py-4 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 group-hover:border-amber-400/60`}
                aria-invalid={errors.event ? 'true' : 'false'}
                aria-describedby={errors.event ? 'event-error' : undefined}
              />
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400/70 h-5 w-5 transition-colors group-hover:text-amber-400" />
              {errors.event && (
                <p id="event-error" className="mt-1 text-sm text-red-400">
                  {errors.event.message}
                </p>
              )}
            </motion.div>

            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <textarea
                {...register("details")}
                placeholder="Tell us about your event, budget, and special requirements..."
                className={`w-full bg-black/80 border-2 ${errors.details ? 'border-red-500' : 'border-amber-400/40 focus:border-amber-400'} text-amber-100 placeholder:text-amber-300/70 min-h-[140px] rounded-xl py-4 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 group-hover:border-amber-400/60 resize-none`}
                aria-invalid={errors.details ? 'true' : 'false'}
                aria-describedby={errors.details ? 'details-error' : undefined}
              />
              <MessageSquare className="absolute left-4 top-5 text-amber-400/70 h-5 w-5 transition-colors group-hover:text-amber-400" />
              {errors.details && (
                <p id="details-error" className="mt-1 text-sm text-red-400">
                  {errors.details.message}
                </p>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 hover:from-red-700 hover:to-amber-500 text-black font-bold text-lg py-4 rounded-xl shadow-lg transition-all duration-300 border-2 border-amber-400/60 tracking-wide uppercase relative overflow-hidden group ${(!isValid || isSubmitting) ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={!isValid || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center">
                  <Send className="mr-2 h-5 w-5" />
                  Send Booking Inquiry via WhatsApp
                </span>
              )}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.button>
          </form>
        )}
      </AnimatePresence>
    </div>
  )
}
