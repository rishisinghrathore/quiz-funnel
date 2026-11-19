import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CircleCheck,
  Lightbulb,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const asset = (name: string, ext = "svg") => `/figma/${name}.${ext}`
const serviceIllustration = (index: number) =>
  `/what-we-do-best/Service%20-%20Illustration${index ? `-${index}` : ""}.svg`
const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

const services = [
  {
    title: "B2B Lead Generation",
    text: "Target and convert high-value leads with pinpoint precision.",
    tone: "peach",
  },
  {
    title: "Content Market",
    text: "Build authority through engaging, industry-relevant content.",
    tone: "peach",
  },
  {
    title: "LinkedIn Marketing",
    text: "Maximize B2B outreach through the leading professional platform.",
    tone: "lavender",
  },
  {
    title: "Email Campaigns",
    text: "Nurture relationships with strategic, automated email marketing flows.",
    tone: "peach",
  },
  {
    title: "SEO & SEM for B2B",
    text: "Improve visibility and reach decision-makers effectively.",
    tone: "peach",
  },
  {
    title: "Brand Strategy",
    text: "Define, refine, and elevate your B2B brand identity.",
    tone: "peach",
  },
]

const cases = [
  {
    title: "Scaling Leads for SaaS Growth",
    text: "Partnered with a SaaS provider to refine their lead funnel and optimize multi-channel campaigns. By improving targeting and conversion flows, we helped attract high-quality leads and scale their growth efficiently.",
    image: "cases-imgTypeScalingLeadsForSaaSGrowth",
    a: "200%",
    al: "Lead Conversion",
    b: "3x",
    bl: "Pipeline Growth",
  },
  {
    title: "Fintech ABM That Closed Deals",
    text: "Designed and launched account-based marketing campaigns for a fintech startup to target and convert key accounts. Personalized outreach and data insights led to higher engagement and faster deal closures.",
    image: "cases-imgCasesIllustration",
    a: "5x",
    al: "Engagement Rate",
    b: "$1M",
    bl: "In Closed Deals",
  },
  {
    title: "Driving Visibility in Logistics",
    text: "Worked with a logistics company to strengthen its online presence through focused SEO and paid strategies. The campaign increased visibility, improved search rankings, and delivered stronger, lower-cost leads.",
    image: "cases-imgCasesIllustration1",
    a: "120%",
    al: "Traffic Growth",
    b: "3x",
    bl: "Lower Acquisition Cost",
  },
]

const steps = [
  {
    title: "Discovery & Research",
    text: "Understand your goals, industry, and competitors.",
    image: "process-imgGroup",
  },
  {
    title: "Strategy Development",
    text: "Build a custom, data-backed B2B marketing plan.",
    image: "process-imgGroup1",
  },
  {
    title: "Execution & Optimization",
    text: "Launch, monitor, and refine campaigns.",
    image: "process-imgGroup2",
  },
  {
    title: "Report & Scaling",
    text: "Deliver insights and scale proven strategies",
    image: "process-imgGroup3",
  },
]

const plans = [
  {
    title: "Growth Package",
    text: "Perfect for scaling B2B companies seeking wider reach.",
    price: "$3000",
    features: [
      "Advanced SEO & SEM",
      "Content marketing strategy",
      "LinkedIn outreach campaigns",
      "Bi-weekly performance analysis",
    ],
    featured: true,
    Icon: Lightbulb,
  },
  {
    title: "Starter Package",
    text: "Best for small B2B businesses starting out.",
    price: "$1500",
    features: [
      "Lead generation campaigns",
      "Basic SEO optimization",
      "Monthly performance report",
    ],
    featured: false,
    Icon: Sparkles,
  },
  {
    title: "Enterprise Package",
    text: "Advanced B2B marketing for enterprises",
    price: "$5000",
    features: [
      "Full ABM strategy",
      "Brand strategy & positioning",
      "Dedicated campaign manager",
    ],
    featured: false,
    Icon: BarChart3,
  },
]

const testimonials = [
  {
    quote:
      "Bizzier transformed our lead generation. The ROI speaks for itself. Their team guided us through every stage with clarity and precision. We now attract the right clients faster than ever before.",
    name: "Julia Martinez",
    role: "SaaS Founder",
  },
  {
    quote:
      "By improving targeting and conversion flows, we helped attract high-quality leads and scale growth efficiently.",
    name: "Scaling Leads for SaaS Growth",
    role: "Case Study",
  },
  {
    quote:
      "Personalized outreach and data insights led to higher engagement and faster deal closures.",
    name: "Fintech ABM That Closed Deals",
    role: "Case Study",
  },
  {
    quote:
      "The campaign increased visibility, improved search rankings, and delivered stronger, lower-cost leads.",
    name: "Driving Visibility in Logistics",
    role: "Case Study",
  },
]

const faqs = [
  [
    "What industries do you serve?",
    "We work with B2B teams across SaaS, fintech, logistics, professional services, and other growth-focused industries.",
  ],
  [
    "How soon can I see results?",
    "Within 3–6 months, most clients experience measurable growth—gaining stronger brand visibility, higher engagement rates, and improved revenue outcomes powered by our data-led approach.",
  ],
  [
    "Do you offer custom strategies?",
    "Yes. We shape each strategy around your goals, audience, resources, and the opportunities in your market.",
  ],
  [
    "Can you handle international campaigns?",
    "Yes. We plan and manage campaigns for multiple markets while adapting the message to each audience.",
  ],
  [
    "How do I get started?",
    "Tell us a little about your business in the contact form and we will follow up to discuss your goals.",
  ],
]

function Heading({
  label,
  title,
  text,
}: {
  label: string
  title: string
  text?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function RevealSection({
  children,
  ...props
}: {
  children: ReactNode
  className: string
  id?: string
  "aria-label"?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      {...props}
      initial={
        shouldReduceMotion
          ? false
          : { y: 10, opacity: 0, filter: "blur(6px)" }
      }
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}

function Example1Page() {
  const shouldReduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCase, setActiveCase] = useState(0)
  const [expandedCase, setExpandedCase] = useState<number | null>(null)
  const [activeQuote, setActiveQuote] = useState(0)
  const [projectNeeds, setProjectNeeds] = useState("")
  const [agreed, setAgreed] = useState(false)
  const caseRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveQuote((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  function focusCase(index: number) {
    const next = (index + cases.length) % cases.length
    setActiveCase(next)
    caseRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nProject needs: ${data.get("needs")}`
    )
    window.location.href = `mailto:contact@bizzier.com?subject=Bizzier%20quote%20request&body=${body}`
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!agreed) return
    const email = new FormData(event.currentTarget).get("email")
    window.location.href = `mailto:contact@bizzier.com?subject=Newsletter%20subscription&body=${encodeURIComponent(`Please add ${email} to the newsletter.`)}`
  }

  return (
    <div className="site-shell" id="home">
      <header className="site-header container">
        <a
          className="brand"
          href="#home"
          aria-label="Bizzier home"
          onClick={() => setMenuOpen(false)}
        >
          <img src={asset("hero-imgLogo")} alt="" />
          <span>Bizzier</span>
        </a>
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {[
            ["Home", "home"],
            ["About", "about"],
            ["Services", "services"],
            ["Pricing", "pricing"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <Button
            className="mobile-nav-cta"
            size="lg"
            onClick={() => {
              setMenuOpen(false)
              scrollTo("contact")
            }}
          >
            Try For Free
          </Button>
        </nav>
        <Button
          className="header-cta"
          size="lg"
          onClick={() => scrollTo("contact")}
        >
          Try For Free
        </Button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <RevealSection className="hero container">
          <div className="hero-copy">
            <div>
              <span className="hero-kicker">
                <Sparkles />
                Powering the Next Generation of Business Partnerships
              </span>
              <h1>
                Connecting You to
                <br /> the Right Partners
              </h1>
              <p>
                Unlock sustainable growth through tailored strategies that
                strengthen B2B relationships, enhance performance, and create
                lasting impact.
              </p>
              <div className="hero-actions">
                <Button size="lg" onClick={() => scrollTo("contact")}>
                  Get a Free Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>150%</strong>
                <span>Average Roi Increase</span>
              </div>
              <div>
                <strong>250+</strong>
                <span>Successful Campaigns</span>
              </div>
              <div>
                <strong>100+</strong>
                <span>Trusted Global Clients</span>
              </div>
            </div>
          </div>
          <img
            className="hero-art"
            src={asset("hero-illustration", "png")}
            alt="Marketing team illustration"
          />
        </RevealSection>

        <RevealSection className="services section-space" id="services">
          <div className="container">
            <Heading
              label="Services"
              title="What We Do Best"
              text="From lead generation to brand strategy, we cover every aspect of B2B marketing."
            />
            <div className="service-grid">
              {services.map(({ title, text, tone }, index) => (
                <motion.article
                  className={`service-card ${tone}`}
                  key={title}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { y: 10, opacity: 0, filter: "blur(6px)" }
                  }
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : (index % 2) * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <img
                    className="service-visual"
                    src={serviceIllustration(index)}
                    alt=""
                  />
                  <div className="service-content">
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <Button
                      variant={index === 2 ? "default" : "outline"}
                      size="lg"
                      onClick={() => scrollTo("contact")}
                    >
                      See Details
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="about section-space" id="about">
          <span className="about-accent accent-one" aria-hidden="true">
            ✺
          </span>
          <span className="about-accent accent-two" aria-hidden="true">
            <BarChart3 />
          </span>
          <div className="about-inner container">
            <Heading
              label="About"
              title="Your Trusted Partner in Achieving Lasting Marketing Success"
            />
            <p>
              Bizzier specializes in helping B2B companies cut through the noise
              and connect with their ideal customers. With years of experience
              in data-driven strategies and account-focused marketing, we
              deliver solutions that maximize ROI and scale your business growth
            </p>
          </div>
          <span className="about-accent accent-three" aria-hidden="true">
            ▣
          </span>
          <span className="about-accent accent-four" aria-hidden="true">
            <Lightbulb />
          </span>
        </RevealSection>

        <RevealSection className="clients" aria-label="Trusted client brands">
          <div className="client-logos container">
            {[
              "clients-imgLogo",
              "clients-imgLogo1",
              "clients-imgLogo2",
              "clients-imgLogo3",
              "clients-imgLogo4",
              "clients-imgLogo5",
            ].map((name, index) => (
              <img
                key={name}
                src={asset(name)}
                alt={`Client brand ${index + 1}`}
              />
            ))}
          </div>
        </RevealSection>

        <RevealSection className="values section-space">
          <div className="container">
            <Heading
              label="Value"
              title="Why Choose Bizzier"
              text="We combine expertise, innovation, and measurable impact."
            />
            <div className="values-layout">
              <div className="value-column">
                <div className="value-item">
                  <span>01</span>
                  <h3>B2B Specialist</h3>
                  <p>Deep knowledge of complex B2B buyer journeys.</p>
                </div>
                <div className="value-item">
                  <span>02</span>
                  <h3>Data-Driven</h3>
                  <p>Every decision backed by insights and analytics.</p>
                </div>
              </div>
              <div className="value-center" aria-hidden="true">
                <div className="value-screen">
                  <span className="screen-top">
                    <i />
                    <i />
                    <i />
                  </span>
                  <div className="screen-chart">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="screen-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="value-float">
                  <BarChart3 />
                </div>
              </div>
              <div className="value-column">
                <div className="value-item">
                  <span>03</span>
                  <h3>Tailored Solution</h3>
                  <p>Strategies customized to your industry needs.</p>
                </div>
                <div className="value-item">
                  <span>04</span>
                  <h3>Proven Results</h3>
                  <p>A track record of consistent growth and ROI.</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="case-wrap container" id="case-studies">
          <div className="case-section">
            <Heading
              label="Case Studies"
              title="Transformations We’ve Delivered"
              text="Discover how businesses thrived with our B2B marketing strategies."
            />
            <div className="case-list">
              {cases.map((item, index) => (
                <article
                  className={`case-card ${index === 1 ? "highlight" : ""}`}
                  key={item.title}
                  ref={(node) => {
                    caseRefs.current[index] = node
                  }}
                >
                  <img className="case-art" src={asset(item.image)} alt="" />
                  <div className="case-info">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {expandedCase === index && (
                      <p className="case-extra">
                        This campaign paired audience research with focused
                        messaging, ongoing optimization, and clear reporting to
                        turn insight into sustainable growth.
                      </p>
                    )}
                    <div className="case-bottom">
                      <div className="case-stats">
                        <div>
                          <strong>{item.a}</strong>
                          <span>{item.al}</span>
                        </div>
                        <div>
                          <strong>{item.b}</strong>
                          <span>{item.bl}</span>
                        </div>
                      </div>
                      <Button
                        variant={index === 1 ? "default" : "outline"}
                        size="lg"
                        onClick={() =>
                          setExpandedCase(expandedCase === index ? null : index)
                        }
                      >
                        {expandedCase === index ? "Show Less" : "See Details"}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <nav className="case-pagination" aria-label="Case studies">
              <button
                type="button"
                aria-label="Previous case study"
                onClick={() => focusCase(activeCase - 1)}
              >
                <ArrowLeft />
              </button>
              {cases.map((_, index) => (
                <button
                  type="button"
                  className={activeCase === index ? "active" : ""}
                  aria-current={activeCase === index ? "page" : undefined}
                  key={index}
                  onClick={() => focusCase(index)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next case study"
                onClick={() => focusCase(activeCase + 1)}
              >
                <ArrowRight />
              </button>
            </nav>
          </div>
        </RevealSection>

        <RevealSection className="process section-space" id="process">
          <div className="container">
            <Heading
              label="Process"
              title="The Method Behind the Results"
              text="A clear, structured approach from discovery to measurable results."
            />
            <div className="process-grid">
              {steps.map((step) => (
                <div className="process-step" key={step.title}>
                  <div className="process-art">
                    <img src={asset(step.image)} alt="" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="pricing section-space" id="pricing">
          <div className="container">
            <Heading
              label="Pricing"
              title="Invest in Your B2B Growth"
              text="Choose a plan that fits your growth stage and aligns with your business goals for long-term success."
            />
            <div className="pricing-grid">
              {plans.map(({ title, text, price, features, featured, Icon }) => (
                <article
                  className={`price-card ${featured ? "featured" : ""}`}
                  key={title}
                >
                  <div className="price-top">
                    <span className="price-icon">
                      <Icon />
                    </span>
                    {featured && <span className="popular">Most Popular</span>}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="price">
                    <strong>{price}</strong>
                    <span>/month</span>
                  </div>
                  <ul>
                    {features.map((feature) => (
                      <li key={feature}>
                        <CircleCheck />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    onClick={() => {
                      setProjectNeeds(`I'm interested in the ${title}.`)
                      scrollTo("contact")
                    }}
                  >
                    Choose Plan
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="testimonial section-space">
          <div className="testimonial-layout container">
            <div className="testimonial-intro">
              <span className="eyebrow">Testimonial</span>
              <h2>Proven Results, Real Clients</h2>
              <p>
                Discover how businesses across industries have scaled smarter
                and faster with our tailored B2B marketing strategies.
              </p>
              <div className="testimonial-controls">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setActiveQuote(
                      (activeQuote + testimonials.length - 1) %
                        testimonials.length
                    )
                  }
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() =>
                    setActiveQuote((activeQuote + 1) % testimonials.length)
                  }
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="testimonial-quote" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="testimonial-slide"
                  key={activeQuote}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { x: 40, opacity: 0, filter: "blur(6px)" }
                  }
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { x: -40, opacity: 0, filter: "blur(6px)" }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    ease: "easeOut",
                  }}
                >
                  <blockquote>{testimonials[activeQuote].quote}</blockquote>
                  <div className="quote-footer">
                    <div className="client-person">
                      <img src={asset("testimonial-imgImage", "png")} alt="" />
                      <span>
                        <strong>{testimonials[activeQuote].name}</strong>
                        <small>{testimonials[activeQuote].role}</small>
                      </span>
                    </div>
                    <div className="slide-count">
                      <strong>
                        {String(activeQuote + 1).padStart(2, "0")}/
                      </strong>
                      <span>
                        {String(testimonials.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="contact container" id="contact">
          <div className="contact-panel">
            <h2>Time to Take Your B2B Growth to the Next Level?</h2>
            <p>
              Let’s design a strategy tailored to your goals, built to
              strengthen your brand, attract the right clients, and drive
              measurable growth.
            </p>
            <div className="contact-grid">
              <form onSubmit={sendQuote}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="contact-name" className="sr-only">
                      Name
                    </FieldLabel>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-company" className="sr-only">
                      Company
                    </FieldLabel>
                    <Input
                      id="contact-company"
                      name="company"
                      placeholder="Company"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-email" className="sr-only">
                      Email
                    </FieldLabel>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-needs" className="sr-only">
                      Project Needs
                    </FieldLabel>
                    <Input
                      id="contact-needs"
                      name="needs"
                      placeholder="Project Needs"
                      value={projectNeeds}
                      onChange={(event) => setProjectNeeds(event.target.value)}
                      required
                    />
                  </Field>
                </FieldGroup>
                <Button size="lg" type="submit">
                  Request a Quote
                </Button>
              </form>
              <img
                src={asset("cta-illustration", "png")}
                alt="Illustration of a remote business meeting"
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection className="faq section-space" id="faq">
          <div className="container">
            <div className="faq-heading">
              <div>
                <span className="eyebrow">FAQ</span>
                <h2>
                  Want to Learn More
                  <br />
                  About What We Offer?
                </h2>
              </div>
              <p>
                We’ve compiled helpful answers to guide you through our
                marketing approach, campaign process, and client results.
              </p>
            </div>
            <div className="faq-grid">
              <div className="faq-aside">
                <img src={asset("faq-imgIllustration")} alt="" />
                <h3>Would you like to know more?</h3>
                <p>
                  Get in touch to explore how we can work together to achieve
                  your business objectives.
                </p>
                <Button size="lg" onClick={() => scrollTo("contact")}>
                  Contact Us Directly
                </Button>
              </div>
              <Accordion defaultValue={["results"]} className="faq-list">
                {faqs.map(([question, answer], index) => (
                  <AccordionItem
                    key={question}
                    value={index === 1 ? "results" : String(index)}
                  >
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="newsletter">
            <h2>
              Stay ahead of the competition with
              <br />
              expert B2B marketing insights.
            </h2>
            <form onSubmit={subscribe}>
              <div className="newsletter-input">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email here"
                  aria-label="Email address"
                  required
                />
                <Button size="lg" type="submit">
                  Subscribe
                </Button>
              </div>
              <label className="privacy">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={setAgreed}
                  required
                />
                <span>
                  I’ve read and agree to the{" "}
                  <a href="mailto:contact@bizzier.com?subject=Privacy%20policy%20request">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
            </form>
          </div>
          <div className="footer-main">
            <div className="footer-brand">
              <a className="brand" href="#home">
                <img src={asset("footer-imgLogo")} alt="" />
                <span>Bizzier</span>
              </a>
              <p>
                Smart, data-backed marketing that helps B2B brands stand out,
                scale fast, and drive measurable results.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </div>
              <div className="footer-contact">
                <a href="mailto:contact@bizzier.com">
                  <Send />
                  contact@bizzier.com
                </a>
                <a href="tel:+1800234567">
                  <Phone />
                  +1 (800) 234-567
                </a>
              </div>
            </div>
          </div>
          <div className="copyright">© 2035 Bizzier. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default Example1Page
