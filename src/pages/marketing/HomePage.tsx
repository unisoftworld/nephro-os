import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity, Brain, Shield, Globe, Stethoscope, Zap,
  TrendingUp, Clock, CreditCard, Building2, Check,
  ArrowRight, Star, HeartPulse, FlaskConical, Package,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  {
    icon: Activity,
    title: 'Dialysis Operations',
    description:
      'Real-time session monitoring, chair management, machine telemetry, and clinical workflows built specifically for hemodialysis.',
  },
  {
    icon: Brain,
    title: 'AI Safety Layer',
    description:
      'Compounding intelligence from every session — risk detection, scheduling optimization, documentation assistance, and clinical decision support.',
  },
  {
    icon: HeartPulse,
    title: 'Vascular Access',
    description:
      'Track AV fistulas, grafts, and catheters. Surgery scheduling, maturity monitoring, and referral workflows between dialysis and vascular surgery.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical Notes & EMR',
    description:
      'SOAP notes with nephrology templates, AI-powered summarization, and a complete medical timeline for every patient.',
  },
  {
    icon: FlaskConical,
    title: 'Lab Integration',
    description:
      'Track Hb, Kt/V, URR, electrolytes, and all key renal markers with trend charts and abnormal value alerts.',
  },
  {
    icon: CreditCard,
    title: 'NPHIES-Ready Billing',
    description:
      'Pre-built Saudi insurance workflows, ClickPay integration, VAT compliance, and claim submission to NPHIES.',
  },
  {
    icon: Package,
    title: 'Inventory & Consumables',
    description:
      'Dialyzers, bloodlines, heparin, EPO — auto-reorder suggestions, expiry tracking, and consumption per session.',
  },
  {
    icon: Shield,
    title: 'Saudi Compliance',
    description:
      'PDPL-ready, NPHIES-certified, with audit logs, consent management, and healthcare-grade data security.',
  },
];

const stats = [
  { value: '24/7', label: 'Real-time monitoring' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 2s', label: 'NPHIES response' },
  { value: 'English', label: 'Multi Language' },
];

const trustBadges = [
  'NPHIES Certified',
  'PDPL Ready',
  'FHIR R4',
  'Saudi VAT',
  'Multi-tenant',
  'SOC 2 Aligned',
];

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background image with darkening overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-dialysis-floor.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(4, 12, 22, 0.94) 0%, rgba(4, 12, 22, 0.86) 28%, rgba(4, 12, 22, 0.58) 52%, rgba(4, 12, 22, 0.20) 74%, rgba(4, 12, 22, 0.08) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/10 via-transparent to-ink-950/28" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex min-h-[600px] lg:min-h-[640px]">
            {/* Left column - text */}
            <div className="flex flex-col justify-center py-20 lg:py-24 max-w-xl">
              <motion.p
                custom={0}
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                className="text-12 uppercase tracking-[0.1em] text-saline-200 font-semibold mb-6"
              >
                The Operating System for Renal Care
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                className="text-38 lg:text-48 font-semibold text-white tracking-[-0.025em] leading-[1.05] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.38)]"
              >
                Run every chair.<br />
                Trust every signal.<br />
                <span className="text-saline-200">Know every patient.</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                className="text-16 text-white/95 leading-[1.7] mb-8 max-w-[520px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.42)]"
              >
                NephroOS is the renal-native SaaS platform for dialysis centers,
                vascular surgery clinics, and multi-branch healthcare groups in
                Saudi Arabia and the GCC. Arabic. AI-powered. NPHIES-ready.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  to="/console"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-8 bg-saline-500 text-white text-14 font-medium hover:bg-saline-600 transition-colors shadow-raised no-underline"
                >
                  Launch Console
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-8 border border-white/20 text-white text-14 font-medium hover:bg-white/10 transition-colors no-underline"
                >
                  View Pricing
                </Link>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
              >
                <p className="text-11 uppercase tracking-[0.08em] text-ink-300 font-medium mb-3">
                  Built for Saudi compliance
                </p>
                <div className="flex flex-wrap gap-2">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-pill text-11 font-medium bg-ink-950/35 text-white/80 border border-white/[0.14]"
                    >
                      <Check size={10} className="text-saline-300" />
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-ink-900/[0.06] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ink-900/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="py-8 px-6 text-center"
              >
                <p className="text-24 lg:text-30 font-semibold text-ink-900 tracking-[-0.02em] data-mono">
                  {stat.value}
                </p>
                <p className="text-12 text-ink-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 lg:py-24 bg-neutral-25">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">Platform</p>
            <h2 className="text-24 lg:text-30 font-semibold text-ink-900 tracking-[-0.02em] mb-4">
              Everything your center needs
            </h2>
            <p className="text-14 text-ink-400 max-w-lg mx-auto leading-relaxed">
              From chair scheduling to NPHIES claims — one platform for the
              entire renal care operation. No integrations needed. No generic
              workarounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.slice(0, 6).map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="nephro-card hover:shadow-raised transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-8 bg-saline-50 flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-saline-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-14 font-semibold text-ink-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-13 text-ink-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5 max-w-2xl mx-auto lg:max-w-none">
            {features.slice(6).map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 6}
                variants={fadeUp as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="nephro-card hover:shadow-raised transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-8 bg-saline-50 flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-saline-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-14 font-semibold text-ink-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-13 text-ink-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI SECTION ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">AI Intelligence</p>
              <h2 className="text-24 lg:text-30 font-semibold text-ink-900 tracking-[-0.02em] mb-4">
                Compounding intelligence from every session
              </h2>
              <p className="text-14 text-ink-400 leading-relaxed mb-8">
                NephroOS AI agents learn from every dialysis session across your
                center network. They detect risk before it becomes crisis, optimize
                scheduling before conflicts arise, and draft documentation so your
                staff can focus on patients — not keyboards.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Brain,
                    title: 'Patient Summary Agent',
                    desc: 'Generates handover summaries with full context from recent sessions, labs, and notes.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Risk Detection Agent',
                    desc: 'Predicts intradialytic hypotension, flags trends, and alerts the care team with confidence scores.',
                  },
                  {
                    icon: Clock,
                    title: 'Scheduling Optimizer',
                    desc: 'Suggests optimal chair assignments balancing patient needs, machine types, and staff availability.',
                  },
                  {
                    icon: Zap,
                    title: 'Clinical Documentation',
                    desc: 'Drafts SOAP notes from session vitals and complications — ready for doctor review and sign-off.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-8 bg-saline-50 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-saline-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-13 font-semibold text-ink-900 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-12 text-ink-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6,  }}
              className="ai-panel"
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain size={16} className="text-saline-300" />
                <span className="text-12 uppercase tracking-[0.08em] text-saline-300 font-medium">
                  AI Insight — Live
                </span>
              </div>
              <div className="space-y-3">
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-8 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-critical/20 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp size={12} className="text-critical-500" />
                    </div>
                    <div>
                      <p className="text-12 font-medium text-white mb-1">
                        Intradialytic hypotension risk — Chair 04
                      </p>
                      <p className="text-11 text-white/50 leading-relaxed">
                        Patient P-2187 has trended toward post-session systolic
                        &lt;90 in 4 of the last 5 sessions. Consider sodium profile
                        review and reduced UF rate.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-8 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-advisory/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={12} className="text-advisory-500" />
                    </div>
                    <div>
                      <p className="text-12 font-medium text-white mb-1">
                        Access maturity follow-up due
                      </p>
                      <p className="text-11 text-white/50 leading-relaxed">
                        Patient P-6734 AV fistula is due for 6-month Doppler
                        surveillance. Last flow: 820 mL/min.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-8 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-stable/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-stable-500" />
                    </div>
                    <div>
                      <p className="text-12 font-medium text-white mb-1">
                        Kt/V target achieved — Chair 02
                      </p>
                      <p className="text-11 text-white/50 leading-relaxed">
                        Patient P-3309 spKt/V 1.52 this session. 12-session
                        average: 1.48. Adequate dialysis maintained.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SAUDI MARKET SECTION ===== */}
      <section className="py-20 lg:py-24 bg-neutral-25">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Saudi Arabia &amp; GCC</p>
            <h2 className="text-24 lg:text-30 font-semibold text-ink-900 tracking-[-0.02em] mb-4">
              Built for the Kingdom, ready for the region
            </h2>
            <p className="text-14 text-ink-400 max-w-lg mx-auto leading-relaxed">
              NephroOS is designed from the ground up for Saudi healthcare
              requirements — not adapted, not translated, but built Arabic-first
              with NPHIES and PDPL compliance at the core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                title: 'NPHIES Integration',
                desc: 'Full FHIR R4 compliance with pre-built connectors for Taameen (insurance), Sehey (clinical), and Saudi ID verification.',
              },
              {
                icon: Building2,
                title: 'Saudi Market Ready',
                desc: 'Designed for 303+ dialysis centers across the Kingdom. Supports Bupa, Tawuniya, MedGulf, and all major insurers.',
              },
              {
                icon: Shield,
                title: 'PDPL Compliant',
                desc: 'Saudi Personal Data Protection Law ready with data localization, consent management, and 72-hour breach notification.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="nephro-card text-center"
              >
                <div className="w-12 h-12 rounded-8 bg-saline-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-saline-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-14 font-semibold text-ink-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-13 text-ink-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / SOCIAL PROOF ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="nephro-card bg-ink-900 text-white relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-champagne-400 fill-champagne-400"
                    />
                  ))}
                </div>
                <blockquote className="text-18 lg:text-20 font-medium text-white/90 leading-relaxed mb-6 font-serif">
                  "NephroOS transformed how we run our dialysis center. The AI
                  alerts caught a hypotensive episode before it became critical.
                  The NPHIES integration saved us 6 hours per week on insurance
                  claims."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-saline-500/20 flex items-center justify-center text-14 font-semibold text-saline-300">
                    AH
                  </div>
                  <div>
                    <p className="text-13 font-medium text-white">
                      Amr Hamza
                    </p>
                    <p className="text-12 text-white/50">
                      Medical Integration Architect, Riyadh KKESH
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '40%', label: 'Reduction in documentation time' },
                  { value: '95%', label: 'NPHIES claim acceptance rate' },
                  { value: '3x', label: 'Faster session scheduling' },
                  { value: '0', label: 'Missed critical events since launch' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.04] border border-white/[0.06] rounded-8 p-5"
                  >
                    <p className="text-24 font-semibold text-saline-300 data-mono mb-1">
                      {stat.value}
                    </p>
                    <p className="text-12 text-white/50 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-24 bg-neutral-25">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5,  }}
          >
            <h2 className="text-24 lg:text-30 font-semibold text-ink-900 tracking-[-0.02em] mb-4">
              Ready to transform your center?
            </h2>
            <p className="text-14 text-ink-400 max-w-lg mx-auto leading-relaxed mb-8">
              Join the leading dialysis centers in Saudi Arabia using NephroOS
              to deliver safer, more efficient renal care. Start with our
              Professional tier or request a custom Enterprise plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/console"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-8 bg-saline-500 text-white text-14 font-medium hover:bg-saline-600 transition-colors shadow-raised no-underline"
              >
                Launch Console
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-8 border border-ink-900/10 text-ink-600 text-14 font-medium hover:bg-white hover:border-ink-900/20 transition-all no-underline"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-ink-900/[0.06] bg-white py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/assets/nephroos-mark-saline.svg"
                  alt="NephroOS"
                  className="w-5 h-5"
                />
                <span className="text-13 font-semibold text-ink-900">
                  Nephro<b className="text-saline-500">OS</b>
                </span>
              </div>
              <p className="text-12 text-ink-400 leading-relaxed">
                The Operating System for Renal Care. Dialysis operations,
                vascular access, AI insights, and NPHIES-ready billing for
                Saudi Arabia and the GCC.
              </p>
            </div>
            <div>
              <p className="text-11 uppercase tracking-[0.08em] text-ink-400 font-medium mb-3">
                Product
              </p>
              <div className="flex flex-col gap-2">
                {['Features', 'Pricing', 'AI Agents', 'NPHIES', 'Security'].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-13 text-ink-400 hover:text-ink-900 transition-colors no-underline"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-11 uppercase tracking-[0.08em] text-ink-400 font-medium mb-3">
                Company
              </p>
              <div className="flex flex-col gap-2">
                {['About', 'Careers', 'Blog', 'Press', 'Contact'].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-13 text-ink-400 hover:text-ink-900 transition-colors no-underline"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-11 uppercase tracking-[0.08em] text-ink-400 font-medium mb-3">
                Legal
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Privacy Policy',
                  'Terms of Service',
                  'Cookie Policy',
                  'PDPL Compliance',
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-13 text-ink-400 hover:text-ink-900 transition-colors no-underline"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-ink-900/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-11 text-ink-400">
              &copy; 2026 NephroOS. All rights reserved.
            </p>
            <p className="text-11 text-ink-300">
              Made for renal care teams in Saudi Arabia and beyond.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
