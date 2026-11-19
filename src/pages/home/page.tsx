import { useState, type FormEvent, type ReactNode } from "react"

import { motion, useReducedMotion } from "motion/react"

import "@fontsource/poppins/400.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "./page.css"

const asset = (name: string) => `/breeze/${name}`

const features = [
  {
    icon: "feature-1.svg",
    title: "35+ personality tests",
    text: "Explore science-backed tests that help you understand your emotions, habits, and inner strengths.",
  },
  {
    icon: "feature-2.svg",
    title: "Tailored insights",
    text: "Get clear, helpful takeaways based on your results — designed to support your emotional well-being and growth.",
  },
  {
    icon: "feature-3.svg",
    title: "Personalized routines",
    text: "Receive daily routines and calming practices to help you feel more balanced, clear, and in control.",
  },
  {
    icon: "feature-4.svg",
    title: "Expert-crafted guides",
    text: "Explore emotional patterns with supportive guides and get 20% off therapy to care for your well-being.",
  },
]

const questions = [
  {
    icon: "⭐️",
    title: "Subscription Management",
    description: "Learn how to cancel your subscription and fix common issues.",
    count: "10 articles",
    href: "https://support.breeze-wellbeing.com/subscription-management/3gMoj5SuSHe2TNFfX33LXW",
  },
  {
    icon: "💫",
    title: "Log in & Premium Access",
    description: "Learn how to log in and troubleshoot common access problems.",
    count: "11 articles",
    href: "https://support.breeze-wellbeing.com/log-in--premium-access-/3gMoj5SuSFsrAmZZqAWZX1",
  },
  {
    icon: "💳",
    title: "Why was I charged?",
    description: "Curious about a recent charge? Check out this collection for answers.",
    count: "4 articles",
    href: "https://support.breeze-wellbeing.com/why-was-i-charged/3gMoj5SuSEJnhQDGK9Asvm",
  },
  {
    icon: "⛅️",
    title: "Breeze: Start Self-Discovery",
    description: "Learn about the app.",
    count: "4 articles",
    href: "https://support.breeze-wellbeing.com/breeze-start-self-discovery/4V8pREWRweWJL2VDb95DT4",
  },
]

function BreezeHomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [footerAgreed, setFooterAgreed] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!footerAgreed) return

    const email = new FormData(event.currentTarget).get("email")
    window.location.href = `mailto:support@breeze-wellbeing.com?subject=Breeze%20newsletter%20subscription&body=${encodeURIComponent(`Please add ${email} to the Breeze newsletter.`)}`
  }

  return (
    <div className="breeze-page">
      <header className="breeze-header">
        <a className="breeze-logo-link" href="#top" aria-label="Breeze home">
          <img className="breeze-logo breeze-logo-desktop" src={asset("breeze-logo.webp")} alt="Breeze" />
          <img className="breeze-logo breeze-logo-mobile" src={asset("breeze-icon.webp")} alt="Breeze" />
        </a>

        <nav className="breeze-desktop-nav" aria-label="Breeze navigation">
          <a href="https://support.breeze-wellbeing.com/" target="_blank" rel="noreferrer">
            <img src={asset("header-envelope.png")} alt="" />
            Contact Us
          </a>
          <span className="breeze-nav-divider" aria-hidden="true" />
          <a href="https://breeze.onelink.me/" target="_blank" rel="noreferrer">
            Log In
          </a>
          <a className="breeze-button breeze-header-button" href="">
            Upgrade Subscription
          </a>
        </nav>

        <div className="breeze-mobile-menu">
          <a className="breeze-button breeze-header-button" href="">
            Upgrade Subscription
          </a>
          <button
            className="breeze-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav className="breeze-mobile-nav" aria-label="Mobile Breeze navigation">
            <a href="https://support.breeze-wellbeing.com/" target="_blank" rel="noreferrer" onClick={closeMenu}>
              Contact Us
            </a>
            <a href="https://breeze.onelink.me/" target="_blank" rel="noreferrer" onClick={closeMenu}>
              Log In
            </a>
          </nav>
        )}
      </header>

      <main id="top">
        <RevealSection className="breeze-hero breeze-section">
          <img className="breeze-main-image" src={asset("home-main.webp")} alt="A person meditating with a dog and flowers" />
          <h1>A self-discovery platform that supports your well-being</h1>
          <p className="breeze-hero-copy mx-auto text-center">
            Breeze offers a unified web and mobile experience, featuring personalized tests, calming routines, and growth tools that follow you wherever you go — one subscription, everything included.
          </p>
          <div className="breeze-feature-grid">
            {features.map((feature) => (
              <motion.article
                className="breeze-feature-card"
                key={feature.title}
                initial={{ y: 12, opacity: 0, filter: "blur(5px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: features.indexOf(feature) * 0.08, ease: "easeOut" }}
              >
                <img src={asset(feature.icon)} alt="" />
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="breeze-help breeze-section" id="breeze-help">
          <div className="breeze-help-copy">
            <h2>Need help with your billing?</h2>
            <p>
              The <strong>fastest</strong> way to get support is to reach out to us directly. We&apos;ll do our best to get back to you quickly and resolve your issue with care.
            </p>
            <p>
              Write to us at <a href="mailto:support@breeze-wellbeing.com">support@breeze-wellbeing.com</a> or tap the button below to send us a message.
            </p>
            <a className="breeze-button breeze-wide-button" href="https://support.breeze-wellbeing.com/" target="_blank" rel="noreferrer">
              Get In Touch
            </a>
          </div>
          <img className="breeze-help-image" src={asset("need-help.webp")} alt="A notebook and plant" />
        </RevealSection>

        <RevealSection className="breeze-manage breeze-section">
          <img src={asset("manage-subscription.webp")} alt="A cheerful self-discovery illustration" />
          <h2>Manage subscription with ease</h2>
          <p>Need to make a change to your plan?</p>
          <p>You can view your current subscription details and make updates anytime.</p>
          <a className="breeze-button breeze-manage-button" href="https://breeze-wellbeing.com/cancel-subscription/" target="_blank" rel="noreferrer">
            Log In to Manage Plan
          </a>
        </RevealSection>

        <RevealSection className="breeze-faq breeze-section" id="breeze-faq">
          <h2>Frequently asked questions</h2>
          <div className="breeze-question-list">
            {questions.map((question) => (
              <a className="breeze-question-card" href={question.href} target="_blank" rel="noreferrer" key={question.title}>
                <div className="breeze-question-title">
                  <span aria-hidden="true">{question.icon}</span>
                  <h3>{question.title}</h3>
                </div>
                <p>{question.description}</p>
                <strong>{question.count}</strong>
              </a>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="breeze-questions breeze-section my-8 mt-2!" id="breeze-questions">
          <img src={asset("get-question.webp")} alt="An envelope with a letter" />
          <h2>Got questions?</h2>
          <p>Fill out the form and tell us what&apos;s going on — we&apos;re here to listen and support you.</p>
          <a className="breeze-button breeze-manage-button" href="https://support.breeze-wellbeing.com/" target="_blank" rel="noreferrer">
            Reach Out
          </a>
        </RevealSection>
      </main>

      <footer className="breeze-example-footer">
        <div className="breeze-example-footer-inner">
          <div className="breeze-example-newsletter">
            <h2>
              Make space for more clarity and calm
              <br />
              {" "}with Breeze.
            </h2>
            <form onSubmit={subscribe}>
              <div className="breeze-example-newsletter-input">
                <input name="email" type="email" placeholder="Enter your email here" aria-label="Email address" required />
                <button className="breeze-button" type="submit">Subscribe</button>
              </div>
              <label className="breeze-example-privacy">
                <input
                  type="checkbox"
                  checked={footerAgreed}
                  onChange={(event) => setFooterAgreed(event.target.checked)}
                  required
                />
                <span>
                  I&apos;ve read and agree to the{" "}
                  <a href="mailto:support@breeze-wellbeing.com?subject=Privacy%20policy%20request">privacy policy</a>.
                </span>
              </label>
            </form>
          </div>

          <div className="breeze-example-footer-main">
            <div className="breeze-example-footer-brand">
              <a className="breeze-example-brand" href="#top">
                <img src={asset("breeze-icon.webp")} alt="" />
                <span>Breeze</span>
              </a>
              <p>A gentle space for self-discovery, calming routines, and practical support for your well-being.</p>
            </div>

            <div className="breeze-example-footer-links">
              <div>
                <a href="#top">Home</a>
                <a href="#breeze-help">Support</a>
                <a href="#breeze-faq">FAQ</a>
                <a href="#breeze-questions">Contact</a>
              </div>
              <div>
                <a href="">Self-Discovery</a>
                <a href="">Calming Routines</a>
                <a href="">Well-being Guides</a>
                <a href="">Premium Access</a>
              </div>
              <div className="breeze-example-footer-contact">
                <a href="mailto:support@breeze-wellbeing.com"><span aria-hidden="true">✉</span>support@breeze-wellbeing.com</a>
                <a href="https://support.breeze-wellbeing.com/" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>Visit Support</a>
              </div>
            </div>
          </div>

          <div className="breeze-example-copyright">© 2026 Breeze. Supporting your well-being, one step at a time.</div>
        </div>
      </footer> 
    </div>
  )
}

function RevealSection({
  children,
  className,
  id,
}: {
  children: ReactNode
  className: string
  id?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className={className}
      id={id}
      initial={
        shouldReduceMotion
          ? false
          : { y: 18, opacity: 0, filter: "blur(5px)" }
      }
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}

export default BreezeHomePage
