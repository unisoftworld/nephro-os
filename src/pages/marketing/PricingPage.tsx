import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Minus, ArrowRight, Sparkles, Building2, Network, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const tiers = [
  {
    name: 'Starter',
    price: '1,499',
    priceEn: '1,499',
    period: '/month',
    description: 'For small dialysis clinics',
    icon: Zap,
    accent: 'neutral',
    features: [
      'Core patient management',
      'Basic dialysis session recording',
      'Chair scheduling (up to 20 chairs)',
      'Basic inventory tracking',
      'Patient billing (cash + 1 insurance)',
      'Standard reports',
      'Email support',
    ],
    limits: ['1 branch', '10 staff users', '50 active patients', 'No AI included'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '3,999',
    priceEn: '3,999',
    period: '/month',
    description: 'For medium centers and renal clinics',
    icon: Sparkles,
    accent: 'saline',
    features: [
      'Everything in Starter',
      'Advanced session monitoring with vitals',
      'Nurse assignment and shift management',
      'Multi-insurance billing (up to 5)',
      'NPHIES integration (Taameen)',
      'Vascular access tracking',
      'Clinical notes with templates',
      'Patient portal access',
      'Priority support',
    ],
    limits: ['Up to 3 branches', '30 staff users', '150 active patients', '500 AI queries/mo'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '9,999',
    priceEn: '9,999',
    period: '/month',
    description: 'For healthcare groups and hospital networks',
    icon: Building2,
    accent: 'ink',
    features: [
      'Everything in Professional',
      'Multi-branch management dashboard',
      'Advanced scheduling optimization',
      'Full inventory with auto-reorder',
      'Laboratory integration module',
      'Unlimited insurance companies',
      'NPHIES full integration',
      'Custom clinical note templates',
      'Staff app with QR verification',
      'Executive analytics dashboard',
      'Dedicated account manager',
    ],
    limits: ['Up to 10 branches', '100 staff users', '500 patients', '2,500 AI queries/mo'],
    cta: 'Contact Sales',
    popular: false,
  },
  {
    name: 'Network',
    price: 'Custom',
    priceEn: 'Custom',
    period: '',
    description: 'For groups managing many branches',
    icon: Network,
    accent: 'champagne',
    features: [
      'Everything in Enterprise',
      'White-label patient portal',
      'Advanced BI and custom reports',
      'Full API access (NephroOS Connect)',
      'HL7/FHIR integration layer',
      'Custom AI agent training',
      'Onboarding and training program',
      'SLA guarantee (99.9% uptime)',
    ],
    limits: ['Unlimited branches', 'Unlimited users', 'Unlimited patients', 'Unlimited AI'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const addOns = [
  { name: 'AI Assistant Pro', price: '999/mo', desc: 'Unlimited AI queries, all agents, custom prompts' },
  { name: 'Advanced Analytics', price: '1,499/mo', desc: 'Custom dashboards, predictive models, benchmarking' },
  { name: 'Integration Engine', price: '2,499/mo', desc: 'HL7/FHIR connectors, custom API development' },
  { name: 'Insurance Module Pro', price: '999/mo', desc: 'Pre-auth automation, claim tracking, rejection handling' },
  { name: 'Vascular Surgery Module', price: '1,999/mo', desc: 'Full surgery scheduling, Doppler integration, follow-up' },
  { name: 'Inventory Automation', price: '799/mo', desc: 'Auto-reorder, consumption analytics, expiry alerts' },
  { name: 'Patient Mobile App', price: '499/mo', desc: 'Branded app, push notifications, payments' },
  { name: 'Aramex Logistics', price: '599/mo', desc: 'Supply delivery tracking, sample logistics' },
  { name: 'Compliance Package', price: '1,299/mo', desc: 'PDPL audit, NPHIES compliance monitoring' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-3">Pricing</p>
            <h1 className="text-30 lg:text-48 font-semibold text-ink-900 tracking-[-0.025em] leading-[1.05] mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-14 text-ink-400 max-w-lg mx-auto leading-relaxed mb-8">
              Choose the plan that fits your center. All plans include core
              dialysis operations, patient management, and Saudi compliance
              features. No hidden fees.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-8 bg-ink-900/[0.04]">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 rounded-6 text-13 font-medium transition-all ${
                  !annual
                    ? 'bg-white text-ink-900 shadow-raised'
                    : 'text-ink-400 hover:text-ink-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-6 text-13 font-medium transition-all ${
                  annual
                    ? 'bg-white text-ink-900 shadow-raised'
                    : 'text-ink-400 hover:text-ink-600'
                }`}
              >
                Annual <span className="text-saline-500">(-15%)</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              variants={fadeUp as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`relative rounded-8 border ${
                tier.popular
                  ? 'border-saline-500 bg-saline-50/[0.3] shadow-raised'
                  : 'border-ink-900/[0.06] bg-white'
              } p-6 flex flex-col`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-pill bg-saline-500 text-white text-11 font-semibold">
                  Most Popular
                </span>
              )}

              <div className="mb-5">
                <div className={`w-10 h-10 rounded-8 flex items-center justify-center mb-3 ${
                  tier.popular ? 'bg-saline-100' : 'bg-ink-900/[0.04]'
                }`}>
                  <tier.icon size={20} className={tier.popular ? 'text-saline-500' : 'text-ink-400'} strokeWidth={1.5} />
                </div>
                <h3 className="text-16 font-semibold text-ink-900 mb-1">
                  {tier.name}
                </h3>
                <p className="text-12 text-ink-400 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  {tier.price !== 'Custom' ? (
                    <>
                      <span className="text-12 text-ink-400 font-medium">SAR</span>
                      <span className="text-30 font-semibold text-ink-900 data-mono tracking-[-0.02em]">
                        {annual ? Math.round(parseInt(tier.priceEn) * 0.85).toLocaleString() : tier.price}
                      </span>
                      <span className="text-12 text-ink-400">{tier.period}</span>
                    </>
                  ) : (
                    <span className="text-30 font-semibold text-ink-900 tracking-[-0.02em]">
                      {tier.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-11 uppercase tracking-[0.08em] text-ink-400 font-medium mb-3">
                  Features
                </p>
                <ul className="space-y-2.5 mb-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-saline-500 mt-0.5 shrink-0" />
                      <span className="text-12 text-ink-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-11 uppercase tracking-[0.08em] text-ink-400 font-medium mb-3">
                  Limits
                </p>
                <ul className="space-y-1.5 mb-6">
                  {tier.limits.map((l) => (
                    <li key={l} className="flex items-center gap-2.5">
                      <Minus size={10} className="text-ink-300 shrink-0" />
                      <span className="text-11 text-ink-400">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/console"
                className={`mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-8 text-13 font-medium transition-colors no-underline ${
                  tier.popular
                    ? 'bg-saline-500 text-white hover:bg-saline-600 shadow-raised'
                    : 'border border-ink-900/10 text-ink-600 hover:bg-ink-900/[0.02]'
                }`}
              >
                {tier.cta}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Add-ons</p>
          <h2 className="text-24 font-semibold text-ink-900 tracking-[-0.02em]">
            Extend your platform
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOns.map((addon, i) => (
            <motion.div
              key={addon.name}
              custom={i}
              variants={fadeUp as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="nephro-card hover:shadow-raised transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-13 font-semibold text-ink-900">
                  {addon.name}
                </h3>
                <span className="badge-brand whitespace-nowrap ml-3">
                  SAR {addon.price}
                </span>
              </div>
              <p className="text-12 text-ink-400 leading-relaxed">{addon.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[720px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-24 font-semibold text-ink-900 tracking-[-0.02em]">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How long does it take to set up NephroOS?',
              a: 'A single center can be fully operational within 2 hours. Our onboarding team guides you through tenant creation, branch setup, chair configuration, and staff account creation. Patient data can be imported via CSV or API.',
            },
            {
              q: 'Is NPHIES integration included?',
              a: 'NPHIES Taameen (insurance) integration is included in Professional and above. Full NPHIES Sehey (clinical data exchange) is available in Enterprise and Network tiers.',
            },
            {
              q: 'Can I switch plans later?',
              a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. No penalties for switching.',
            },
            {
              q: 'Is my patient data secure?',
              a: 'NephroOS uses AES-256 encryption at rest, TLS 1.3 in transit, and tenant isolation via PostgreSQL row-level security. We are PDPL-ready and SOC 2 aligned.',
            },
            {
              q: 'Do you offer training?',
              a: 'All plans include documentation and video tutorials. Professional includes onboarding webinars. Enterprise includes onsite training. Network includes a dedicated training program.',
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="nephro-card"
            >
              <h3 className="text-13 font-semibold text-ink-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-12 text-ink-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
