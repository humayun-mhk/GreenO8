'use client';

import { useEffect, useRef, useState } from 'react';
import BrandLogo from './BrandLogo';
import EnergyScene from './EnergyScene';
import ProjectFeed from './ProjectFeed';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bank,
  Battery,
  Building,
  Chart,
  Check,
  Chevron,
  Database,
  FileCheck,
  Globe,
  Headset,
  Leaf,
  Lock,
  Menu,
  Shield,
  Spark,
  Sun,
  UserCheck,
  Wallet,
  Wind,
  X
} from './Icons';

const assetTypes = [
  { icon: Sun, label: 'Solar', note: 'Utility and distributed generation' },
  { icon: Wind, label: 'Wind', note: 'Verified operating assets' },
  { icon: Battery, label: 'Storage', note: 'Grid and project reliability' },
  { icon: Building, label: 'Green infrastructure', note: 'Energy-intensive clean infrastructure' }
];

const steps = [
  { id: '01', icon: UserCheck, title: 'Verify your identity', copy: 'Complete risk-tiered KYC before funds can be committed to an investment.' },
  { id: '02', icon: FileCheck, title: 'Choose a vetted project', copy: 'Review project documents, location, risk context and verified performance information.' },
  { id: '03', icon: Bank, title: 'Fund through standard rails', copy: 'Invest from $100 using supported bank or local payment methods—without a special digital wallet.' },
  { id: '04', icon: Chart, title: 'Track real performance', copy: 'Ownership, project data and payouts are reflected through Greenova8’s controlled internal ledger.' }
];

const trustItems = [
  { icon: Shield, title: 'Vetted before listing', copy: 'System checks and human review happen before a project becomes investable.' },
  { icon: Database, title: 'Controlled ownership ledger', copy: 'Investor ownership and money movement are recorded in a dedicated financial ledger.' },
  { icon: Activity, title: 'Verified performance data', copy: 'SCADA, IoT, weather or validated manual uploads feed project-level reporting.' },
  { icon: Lock, title: 'No guessing around money', copy: 'Missing production data is flagged for review. Payout calculations never invent a value.' }
];

const developerSteps = [
  ['Submit', 'Project details, permits, PPA and financial documents enter one structured flow.'],
  ['Review', 'Data extraction helps the team prepare a structured project record for human verification.'],
  ['List', 'Approved projects can appear in the investor marketplace with clear project information.'],
  ['Track', 'Developers follow funding progress and investor interest from one place.']
];

const faqs = [
  ['What is Greenova8?', 'Greenova8 is a fintech marketplace that connects investors with vetted renewable-energy projects. The goal is to make asset-level clean-energy investing easier to access while keeping project, ownership and payout records clear.'],
  ['How little can I invest?', 'The MVP is designed for investments starting from $100, subject to project availability, eligibility and applicable compliance requirements.'],
  ['Are returns guaranteed?', 'No. Returns are linked to the actual economics and verified performance of each project. Project performance can vary and investors should review the risk information before investing.'],
  ['How is ownership recorded?', 'The current product architecture uses an internal financial ledger together with standard payment rails. Ownership records, balances and payout events are maintained by the platform.'],
  ['What happens if an IoT or SCADA feed goes offline?', 'The PRD requires the system to flag the missing data for manual review instead of estimating a payout number. That protects payout accuracy and investor trust.'],
  ['What can the AI support assistant answer?', 'It can help with first-line product and account guidance. Questions that require financial, compliance or legal judgment are escalated to a human instead of being guessed.']
];

function Kicker({ children, inverse = false }) {
  return <div className={`kicker ${inverse ? 'kicker--inverse' : ''}`}><span />{children}</div>;
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function LandingPage() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      rootRef.current?.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
      return () => window.removeEventListener('scroll', onScroll);
    }

    let ctx;
    let cancelled = false;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled || !rootRef.current) return;
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.fromTo(el, { y: 34, autoAlpha: 0 }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          });
        });

        gsap.to('.hero__mesh', {
          yPercent: 8,
          rotation: 2.5,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 }
        });

        const storySteps = gsap.utils.toArray('.money-story__step');
        storySteps.forEach((step, index) => {
          gsap.to(step, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: step,
              start: 'top 72%',
              end: 'bottom 45%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => document.documentElement.style.setProperty('--story-progress', `${(index + 1) * 25}%`),
              onEnterBack: () => document.documentElement.style.setProperty('--story-progress', `${(index + 1) * 25}%`)
            }
          });
        });
      }, rootRef);
      ScrollTrigger.refresh();
    }).catch(() => {
      rootRef.current?.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
    });

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      if (ctx) ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <main ref={rootRef} id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="nav shell">
          <a className="nav__brand" href="#top" aria-label="Greenova8 home"><BrandLogo /></a>
          <nav className="nav__links" aria-label="Primary navigation">
            <a href="#opportunities">Opportunities</a>
            <a href="#how">How it works</a>
            <a href="#trust">Trust</a>
            <a href="#developers">For developers</a>
          </nav>
          <div className="nav__actions">
            <a className="nav__signin" href="#support">Investor support</a>
            <a className="button button--dark button--small" href="#opportunities">Explore projects <ArrowUpRight /></a>
            <button className="nav__menu" type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <nav aria-label="Mobile navigation">
            {[['Opportunities', '#opportunities'], ['How it works', '#how'], ['Trust & safety', '#trust'], ['For developers', '#developers'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight /></a>
            ))}
            <a className="button button--lime" href="#opportunities" onClick={() => setMenuOpen(false)}>Explore projects <ArrowUpRight /></a>
          </nav>
        </div>
      </header>

      <div id="main-content">
        <section className="hero">
          <div className="hero__mesh" aria-hidden="true" />
          <div className="hero__noise" aria-hidden="true" />
          <div className="shell hero__grid">
            <div className="hero__copy">
              <div className="hero__eyebrow"><span className="pulse-dot" /> Clean-energy investing, without the complexity</div>
              <h1>Own a piece of the <span>clean-energy future.</span></h1>
              <p>Invest from <strong>$100</strong> into vetted renewable-energy projects and follow performance through a transparent fintech experience built around real project data.</p>
              <div className="hero__actions">
                <a className="button button--lime" href="#opportunities">Explore opportunities <ArrowUpRight /></a>
                <a className="button button--ghost-light" href="#how">See how it works <ArrowRight /></a>
              </div>
              <div className="hero__proof">
                <span><Check /> Risk-tiered KYC</span>
                <span><Check /> Vetted projects</span>
                <span><Check /> Standard payment rails</span>
              </div>
            </div>

            <div className="hero__visual">
              <EnergyScene />
              <div className="hero-data-card hero-data-card--top">
                <small>PROJECT DATA</small>
                <strong>Verified before display</strong>
                <span><span className="live-dot" /> Connected sources</span>
              </div>
              <div className="hero-data-card hero-data-card--bottom">
                <div className="hero-data-card__icon"><Wallet /></div>
                <div><small>OWNERSHIP</small><strong>Internal ledger record</strong></div>
              </div>
            </div>
          </div>
          <div className="shell hero__footer">
            <p><strong>Real projects.</strong> Real performance. Clear ownership.</p>
            <a href="#asset-types">Discover the marketplace <span className="scroll-arrow">↓</span></a>
          </div>
        </section>

        <section className="asset-band" id="asset-types">
          <div className="shell asset-band__grid">
            {assetTypes.map(({ icon: Icon, label, note }) => (
              <div className="asset-band__item" key={label}>
                <span className="asset-band__icon"><Icon /></span>
                <div><strong>{label}</strong><small>{note}</small></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--light" id="opportunities">
          <div className="shell">
            <Reveal className="section-head section-head--split">
              <div>
                <Kicker>Investment marketplace</Kicker>
                <h2>Understand the asset <em>before</em> you invest.</h2>
              </div>
              <div className="section-head__aside">
                <p>Project listings are designed to make the important information easy to scan: verification status, asset type, location, risk context, minimum investment and live project status.</p>
                <div className="credibility-note"><Shield /><span><strong>Investor-facing rule:</strong> financial and performance figures only appear when they come from Greenova8’s database or a verified external source.</span></div>
              </div>
            </Reveal>
            <Reveal className="project-surface"><ProjectFeed /></Reveal>
          </div>
        </section>

        <section className="section section--sage" id="how">
          <div className="shell">
            <Reveal className="section-head section-head--center">
              <Kicker>How investing works</Kicker>
              <h2>Four steps from account to clean-energy ownership.</h2>
              <p>A simple investor journey on the surface, with strong verification and ledger controls underneath.</p>
            </Reveal>
            <div className="steps-grid">
              {steps.map(({ id, icon: Icon, title, copy }, index) => (
                <Reveal className="step-card" key={id}>
                  <div className="step-card__top"><span>{id}</span><Icon /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  {index < steps.length - 1 && <span className="step-card__connector"><ArrowRight /></span>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="money-story" id="performance">
          <div className="shell money-story__layout">
            <div className="money-story__sticky">
              <Kicker inverse>Money & data flow</Kicker>
              <h2>Money must move correctly. Everything else comes after.</h2>
              <p>The investor experience is built around a controlled chain from deposit to ownership to verified performance to payout.</p>
              <div className="story-progress"><span /></div>
              <div className="story-ledger-card">
                <div><Database /><span>Internal ledger</span></div>
                <small>Source of truth for ownership events</small>
              </div>
            </div>
            <div className="money-story__steps">
              {[
                { n: '01', icon: Bank, title: 'Deposit is confirmed', copy: 'Payment status is verified and designed to be idempotent so a retry cannot create a duplicate deposit.' },
                { n: '02', icon: Lock, title: 'KYC gates the investment', copy: 'Funds are not invested until the required identity and compliance checks have passed.' },
                { n: '03', icon: Activity, title: 'Project performance is verified', copy: 'Production data comes from real feeds or validated uploads. Missing data is flagged instead of estimated.' },
                { n: '04', icon: Wallet, title: 'Payouts follow verified calculations', copy: 'The payout engine uses validated project performance and ledger ownership to calculate what each investor is due.' }
              ].map(({ n, icon: Icon, title, copy }) => (
                <article className="money-story__step" key={n}>
                  <div className="money-story__number">{n}</div>
                  <div className="money-story__step-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--cream" id="trust">
          <div className="shell trust-layout">
            <Reveal className="trust-copy">
              <Kicker>Built for trust</Kicker>
              <h2>A fintech experience that shows its work.</h2>
              <p>Greenova8’s product requirements put verification, data integrity and payout accuracy ahead of flashy claims. The landing page should communicate that standard before an investor ever creates an account.</p>
              <a href="#faq" className="inline-link">Read common questions <ArrowRight /></a>
            </Reveal>
            <div className="trust-grid">
              {trustItems.map(({ icon: Icon, title, copy }) => (
                <Reveal className="trust-card" key={title}>
                  <span className="trust-card__icon"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section data-section">
          <div className="shell data-layout">
            <Reveal className="data-visual">
              <div className="data-window">
                <div className="data-window__header">
                  <div><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /></div>
                  <small>PROJECT PERFORMANCE PIPELINE</small>
                  <span className="secure-mini"><Lock /> controlled</span>
                </div>
                <div className="pipeline">
                  <div className="pipeline__source"><Sun /><span><small>SOURCE</small><strong>SCADA / IoT</strong></span></div>
                  <span className="pipeline__line" />
                  <div className="pipeline__source"><Globe /><span><small>CONTEXT</small><strong>Weather data</strong></span></div>
                  <span className="pipeline__line" />
                  <div className="pipeline__source"><Shield /><span><small>CONTROL</small><strong>Validation</strong></span></div>
                  <span className="pipeline__line" />
                  <div className="pipeline__source"><Database /><span><small>RECORD</small><strong>Reporting layer</strong></span></div>
                </div>
                <div className="data-chart" aria-hidden="true">
                  <span /><span /><span /><span /><span />
                  <svg viewBox="0 0 700 180" preserveAspectRatio="none">
                    <path d="M0 150 C70 145 85 110 150 118 S250 82 315 95 S405 52 470 66 S575 35 700 48" />
                  </svg>
                </div>
                <div className="data-window__footer">
                  <span><i className="source-dot source-dot--green" /> production feed</span>
                  <span><i className="source-dot source-dot--blue" /> external context</span>
                  <span><i className="source-dot source-dot--lime" /> validated record</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="data-copy">
              <Kicker>Performance, not promises</Kicker>
              <h2>Returns follow what the project actually does.</h2>
              <p>Production information can come from real SCADA/IoT feeds, weather sources such as NASA POWER, Solcast or OpenWeather, and validated manual uploads when direct feeds are not available.</p>
              <ul className="check-list">
                <li><Check /><span>Live data where a project provides it</span></li>
                <li><Check /><span>Manual review when a feed is missing or unreliable</span></li>
                <li><Check /><span>Project-level reporting designed to explain the numbers</span></li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section developer-section" id="developers">
          <div className="developer-glow" aria-hidden="true" />
          <div className="shell developer-layout">
            <Reveal className="developer-copy">
              <Kicker inverse>For project developers</Kicker>
              <h2>Raise capital without turning your project into a paperwork marathon.</h2>
              <p>Greenova8 gives renewable-energy developers a structured path from document submission to a verified marketplace listing, while keeping human review in the loop.</p>
              <a className="button button--lime" href="mailto:hello@greenova8.io?subject=Project%20developer%20inquiry">Submit a project <ArrowUpRight /></a>
            </Reveal>
            <div className="developer-rail">
              {developerSteps.map(([title, copy], index) => (
                <Reveal className="developer-step" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section support-section" id="support">
          <div className="shell support-layout">
            <Reveal className="support-copy">
              <Kicker>Investor support</Kicker>
              <h2>Fast answers for simple questions. Humans for the important ones.</h2>
              <p>The first-line assistant can explain product flows and retrieve approved account information. When a question requires financial, compliance or legal judgment, it escalates instead of improvising.</p>
              <div className="support-pills"><span><Spark /> Tool-connected</span><span><Headset /> Human escalation</span><span><Database /> Real account data</span></div>
            </Reveal>
            <Reveal className="chat-demo">
              <div className="chat-demo__head"><div className="chat-avatar"><Spark /></div><div><strong>Greenova8 Support</strong><span><i /> First-line assistant</span></div></div>
              <div className="chat-demo__body">
                <div className="bubble bubble--user">How do I complete my deposit?</div>
                <div className="bubble bubble--agent">I can show the supported deposit flow and the current status returned by your account. If the payment status looks wrong, I’ll route it to a human for review.</div>
                <div className="chat-tool"><Database /><span><small>DATA POLICY</small><strong>No made-up balances or payment states</strong></span><Check /></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section impact-section">
          <div className="shell impact-layout">
            <Reveal className="impact-copy">
              <Kicker inverse>Capital with physical impact</Kicker>
              <h2>Finance the infrastructure behind a cleaner grid.</h2>
            </Reveal>
            <Reveal className="impact-note">
              <Leaf />
              <p>Impact metrics such as clean-energy generation and avoided emissions should be derived from verified project data—not marketing estimates presented as fact.</p>
            </Reveal>
          </div>
          <div className="impact-ticker" aria-hidden="true">
            <div>Solar <span>•</span> Wind <span>•</span> Storage <span>•</span> Green infrastructure <span>•</span> Verified data <span>•</span> Transparent ownership <span>•</span></div>
            <div>Solar <span>•</span> Wind <span>•</span> Storage <span>•</span> Green infrastructure <span>•</span> Verified data <span>•</span> Transparent ownership <span>•</span></div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="shell faq-layout">
            <Reveal className="faq-intro">
              <Kicker>Questions, clearly answered</Kicker>
              <h2>Know what you’re investing through.</h2>
              <p>Clear product language is part of the trust mechanism. No unexplained technical jargon and no guaranteed-return language.</p>
            </Reveal>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => {
                const open = faqOpen === index;
                return (
                  <Reveal className={`faq-item ${open ? 'faq-item--open' : ''}`} key={question}>
                    <button type="button" onClick={() => setFaqOpen(open ? -1 : index)} aria-expanded={open}>
                      <span>{question}</span><Chevron />
                    </button>
                    <div className="faq-item__answer"><p>{answer}</p></div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta__mesh" aria-hidden="true" />
          <div className="shell final-cta__inner">
            <Kicker inverse>Greenova8</Kicker>
            <h2>Clean-energy ownership should not be reserved for institutions.</h2>
            <p>Start with a verified project, understand the risk, and invest through a product designed to keep the numbers honest.</p>
            <div className="final-cta__actions">
              <a className="button button--lime" href="#opportunities">Explore opportunities <ArrowUpRight /></a>
              <a className="button button--ghost-light" href="#developers">I’m a project developer <ArrowRight /></a>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="shell footer__top">
          <div className="footer__brand"><BrandLogo light /><p>Fractional access to vetted clean-energy projects through a transparent fintech marketplace.</p></div>
          <div className="footer__links">
            <div><strong>Marketplace</strong><a href="#opportunities">Opportunities</a><a href="#how">How it works</a><a href="#trust">Trust & safety</a></div>
            <div><strong>Company</strong><a href="#developers">For developers</a><a href="#support">Investor support</a><a href="#faq">FAQ</a></div>
            <div><strong>Contact</strong><a href="mailto:hello@greenova8.io">hello@greenova8.io</a><a href="https://www.greenova8.io/">greenova8.io</a></div>
          </div>
        </div>
        <div className="shell footer__legal">
          <p><strong>Risk notice:</strong> renewable-energy investments involve risk, including possible loss of capital. Returns are not guaranteed and depend on project performance and applicable terms.</p>
          <span>© {new Date().getFullYear()} Greenova8</span>
        </div>
      </footer>
    </main>
  );
}
