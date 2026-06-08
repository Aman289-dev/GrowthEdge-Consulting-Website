import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import BlogPost from './models/BlogPost.js';
import CaseStudy from './models/CaseStudy.js';
import Testimonial from './models/Testimonial.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/growthedge';

const blogPosts = [
  {
    title: '5 Business Strategy Frameworks That Drive Sustainable Growth',
    slug: '5-business-strategy-frameworks-sustainable-growth',
    excerpt: 'Discover the proven strategy frameworks that top-performing companies use to achieve consistent, sustainable growth in competitive markets.',
    content: `<p>In today's volatile business landscape, having a clear strategic framework isn't just advantageous—it's essential for survival and growth. At GrowthEdge Consulting, we've worked with hundreds of companies across industries, and we've identified five frameworks that consistently deliver results.</p>

<h2>1. The Balanced Scorecard</h2>
<p>Developed by Kaplan and Norton, the Balanced Scorecard translates your company's vision and strategy into a comprehensive set of performance measures. It looks at four perspectives: Financial, Customer, Internal Business Processes, and Learning & Growth.</p>
<p>Companies that implement this framework see an average 23% improvement in strategic alignment across departments within the first year.</p>

<h2>2. Blue Ocean Strategy</h2>
<p>Rather than competing in existing markets (red oceans), Blue Ocean Strategy encourages businesses to create uncontested market space. By eliminating, reducing, raising, and creating value factors, companies can render competition irrelevant.</p>

<h2>3. The McKinsey 7-S Framework</h2>
<p>This framework analyzes seven internal elements: Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills. It's particularly powerful for organizational change management and ensuring all elements of your business are aligned.</p>

<h2>4. Porter's Five Forces</h2>
<p>Michael Porter's framework helps businesses understand the competitive forces in their industry: Competitive Rivalry, Supplier Power, Buyer Power, Threat of Substitution, and Threat of New Entry. This analysis forms the foundation of effective competitive strategy.</p>

<h2>5. The OKR Framework</h2>
<p>Objectives and Key Results (OKRs) originated at Intel and gained massive adoption through Google. This framework creates alignment and engagement around measurable goals, with typically 60-70% of OKRs set by employees themselves.</p>

<p>Implementing any of these frameworks requires careful customization to your specific context. The key is not to apply them rigidly but to adapt them to your unique business challenges and opportunities.</p>`,
    category: 'Strategy',
    author: 'Michael Harrison',
    authorRole: 'Strategy Director',
    tags: ['strategy', 'frameworks', 'growth', 'business'],
    readTime: 8,
    published: true,
    publishedAt: new Date('2024-03-15'),
  },
  {
    title: 'Digital Transformation: Beyond Technology to Business Value',
    slug: 'digital-transformation-beyond-technology-business-value',
    excerpt: 'Why most digital transformation initiatives fail, and how to structure yours for maximum business impact rather than just technology adoption.',
    content: `<p>Digital transformation has become one of the most overused terms in business. Companies spend billions on technology, yet 70% of digital transformation initiatives fail to achieve their stated objectives. The reason? They focus on technology rather than business value.</p>

<h2>The Business Value Framework</h2>
<p>True digital transformation starts with a clear understanding of the business outcomes you want to achieve. Whether it's reducing customer acquisition costs, improving operational efficiency, or creating new revenue streams, technology is just the enabler.</p>

<h2>The Four Pillars of Successful Digital Transformation</h2>
<p><strong>1. Customer Experience:</strong> How technology can create faster, more personalized, and more valuable customer interactions.</p>
<p><strong>2. Operational Efficiency:</strong> Automating and optimizing internal processes to reduce costs and improve quality.</p>
<p><strong>3. Data & Analytics:</strong> Building capabilities to turn data into actionable insights that drive better decisions.</p>
<p><strong>4. New Business Models:</strong> Using technology to create entirely new ways of delivering value to customers.</p>

<h2>Change Management: The Hidden Success Factor</h2>
<p>Our research shows that companies that invest as much in change management as they do in technology are 6x more likely to achieve their transformation goals. People, not technology, are the critical variable.</p>

<h2>A Phased Approach</h2>
<p>Rather than attempting a wholesale transformation, we recommend a phased approach: Start with quick wins that demonstrate value, build momentum and organizational capability, then tackle more complex transformations with proven teams and processes.</p>

<p>The companies that succeed in digital transformation treat it as a continuous journey, not a destination. They build digital capabilities into their organizational DNA rather than treating it as a one-time project.</p>`,
    category: 'Digital',
    author: 'Sarah Chen',
    authorRole: 'Digital Lead',
    tags: ['digital', 'transformation', 'technology', 'strategy'],
    readTime: 7,
    published: true,
    publishedAt: new Date('2024-03-08'),
  },
  {
    title: 'Building High-Performance Leadership Teams in 2024',
    slug: 'building-high-performance-leadership-teams-2024',
    excerpt: 'The leadership competencies that matter most in today\'s environment, and how to develop them systematically across your executive team.',
    content: `<p>The leadership challenges facing businesses today are unlike anything previous generations of executives encountered. Hybrid work, AI disruption, geopolitical uncertainty, and rapidly evolving customer expectations require a new kind of leadership.</p>

<h2>The New Leadership Imperatives</h2>
<p>Our research with 500+ executives across industries reveals that the most effective leaders in 2024 demonstrate five key competencies that weren't considered essential a decade ago.</p>

<h2>1. Ambiguity Navigation</h2>
<p>The ability to make confident decisions with incomplete information, while building in reversibility and learning loops. Leaders who wait for certainty will consistently act too late.</p>

<h2>2. Adaptive Communication</h2>
<p>Communicating effectively across different contexts, cultures, and modalities. The same message delivered in an all-hands meeting, a team Slack channel, and a one-on-one needs different framing and emphasis.</p>

<h2>3. Systems Thinking</h2>
<p>Understanding how different parts of the organization interact and how actions in one area create ripple effects across the system. Leaders without this skill often solve one problem by creating three others.</p>

<h2>4. Psychological Safety Creation</h2>
<p>Building team environments where people feel safe to take risks, voice concerns, and admit mistakes. Google's Project Aristotle found this to be the single biggest predictor of team performance.</p>

<h2>5. Digital Fluency</h2>
<p>Not deep technical expertise, but enough understanding to ask the right questions, identify opportunities, and avoid being misled by technology vendors or internal experts.</p>

<h2>Developing These Competencies</h2>
<p>Leadership development works best when it's experiential rather than purely instructional. We design programs that put leaders in real situations—with appropriate support—where they must demonstrate these competencies rather than just learn about them.</p>`,
    category: 'Leadership',
    author: 'Dr. James Okafor',
    authorRole: 'CEO',
    tags: ['leadership', 'executive', 'team building', 'management'],
    readTime: 9,
    published: true,
    publishedAt: new Date('2024-02-28'),
  },
  {
    title: 'Financial Planning for Growth: Beyond the Annual Budget',
    slug: 'financial-planning-growth-beyond-annual-budget',
    excerpt: 'How leading companies are replacing the rigid annual budget with more dynamic financial planning approaches that better support strategic agility.',
    content: `<p>The traditional annual budget—developed over weeks in Q4, locked in for 12 months, and used to evaluate performance—is increasingly misaligned with the pace at which business now moves. Forward-thinking CFOs are evolving their financial planning approaches accordingly.</p>

<h2>The Problem with Traditional Budgeting</h2>
<p>Annual budgets consume enormous management time, often become political exercises rather than genuine planning, and lock companies into resource allocation decisions made with limited information. By the time the year unfolds, the assumptions underlying the budget are often obsolete.</p>

<h2>Rolling Forecasts</h2>
<p>Rather than a fixed annual budget, rolling forecasts update the financial outlook on a regular basis—typically quarterly—always looking 4-6 quarters ahead. This keeps the organization focused on what's coming rather than explaining variances to an increasingly irrelevant historical plan.</p>

<h2>Zero-Based Budgeting</h2>
<p>Every dollar of spending must be justified from scratch rather than using last year's numbers as a baseline. This approach prevents budget bloat and forces managers to articulate the business value of every investment.</p>

<h2>Beyond P&L: Integrated Business Planning</h2>
<p>The most sophisticated companies connect financial planning to operational planning—linking revenue projections to capacity planning, supply chain, and workforce requirements. This creates a single integrated view of the business rather than siloed functional plans.</p>

<h2>Scenario Planning</h2>
<p>Rather than a single baseline forecast, develop explicit upside, base, and downside scenarios with defined trigger points that activate different strategic responses. This builds strategic agility into the financial planning process.</p>

<p>The companies that will thrive in the coming decade will be those that have financial planning processes designed for speed and adaptability, not just accuracy and control.</p>`,
    category: 'Finance',
    author: 'Amanda Rodriguez',
    authorRole: 'Finance Director',
    tags: ['finance', 'planning', 'budgeting', 'strategy'],
    readTime: 7,
    published: true,
    publishedAt: new Date('2024-02-15'),
  },
  {
    title: 'Operational Excellence: The Foundation of Scalable Growth',
    slug: 'operational-excellence-foundation-scalable-growth',
    excerpt: 'Why operational excellence is the key differentiator between companies that scale successfully and those that hit growth ceilings.',
    content: `<p>Many companies achieve initial growth on the strength of their product, sales, or market timing. But sustainable, scalable growth requires something harder to build: operational excellence. At GrowthEdge, we've seen too many promising businesses plateau or fail because they couldn't execute consistently at scale.</p>

<h2>What Operational Excellence Really Means</h2>
<p>Operational excellence isn't about efficiency for its own sake—it's about building an organization that can deliver consistent value to customers while continuously improving. It encompasses processes, systems, culture, and people capabilities.</p>

<h2>The Four Dimensions of Operational Excellence</h2>
<p><strong>Process:</strong> Clearly defined, documented, and continuously improved workflows that reduce variability and waste.</p>
<p><strong>Technology:</strong> Systems that augment human capability, automate routine work, and provide real-time visibility into operations.</p>
<p><strong>People:</strong> A culture of continuous improvement where everyone feels responsible for quality and efficiency.</p>
<p><strong>Measurement:</strong> Clear KPIs and dashboards that give leaders early warning of problems and evidence of improvement.</p>

<h2>The Operational Excellence Journey</h2>
<p>We typically see companies progress through three stages: Stability (reliable, consistent operations), Efficiency (optimized operations with reduced waste), and Agility (the ability to adapt operations quickly to changing conditions).</p>

<h2>Common Pitfalls</h2>
<p>The biggest mistake companies make is trying to optimize everything at once. We recommend starting with the processes that most directly impact customer experience and revenue, then systematically expanding the operational excellence program from that foundation.</p>

<p>The companies with the highest long-term returns are almost always operational excellence leaders in their industries. It's not glamorous, but it's the foundation everything else rests on.</p>`,
    category: 'Operations',
    author: 'David Park',
    authorRole: 'Operations Head',
    tags: ['operations', 'excellence', 'scaling', 'efficiency'],
    readTime: 8,
    published: true,
    publishedAt: new Date('2024-01-30'),
  },
  {
    title: 'Growth Hacking vs. Sustainable Growth: Which Path Is Right for You?',
    slug: 'growth-hacking-vs-sustainable-growth',
    excerpt: 'The debate between rapid growth tactics and sustainable growth strategies—and how to know which approach fits your stage and goals.',
    content: `<p>The term "growth hacking" has dominated startup discourse for over a decade. But as the market matures and investors increasingly scrutinize unit economics, many companies are questioning whether rapid, tactical growth is the right path. Here's our framework for thinking about this choice.</p>

<h2>Understanding Growth Hacking</h2>
<p>Growth hacking is characterized by rapid experimentation across marketing, product, and distribution channels to identify the most efficient paths to growth. It prioritizes speed, measurement, and iteration over long-term brand building or operational stability.</p>

<h2>The Case for Sustainable Growth</h2>
<p>Sustainable growth focuses on building durable competitive advantages, strong customer relationships, and operational capabilities that compound over time. It's slower to build but produces more predictable and defensible results.</p>

<h2>A Decision Framework</h2>
<p>The right approach depends on four factors:</p>
<p><strong>1. Market Timing:</strong> In winner-take-all markets, speed may justify higher risk and cost. In stable markets, sustainable growth usually wins.</p>
<p><strong>2. Capital Position:</strong> Growth hacking requires capital to fund experiments. If you're capital-constrained, sustainable growth may be your only option.</p>
<p><strong>3. Product Maturity:</strong> Growing rapidly before achieving product-market fit is the fastest path to burning capital on a product no one wants.</p>
<p><strong>4. Team Capability:</strong> Growth hacking requires a specific skillset. If your team doesn't have it, you'll get the costs without the benefits.</p>

<h2>The Hybrid Approach</h2>
<p>Most successful companies we work with use a hybrid approach: sustainable growth as the foundation, with targeted growth hacking experiments in specific channels or segments where the conditions warrant it.</p>

<p>The goal isn't growth for its own sake—it's building a business that creates durable value. Sometimes that means moving fast; often it means moving deliberately.</p>`,
    category: 'Growth',
    author: 'Lisa Thompson',
    authorRole: 'Marketing Lead',
    tags: ['growth', 'marketing', 'strategy', 'startups'],
    readTime: 6,
    published: true,
    publishedAt: new Date('2024-01-18'),
  },
];

const caseStudies = [
  {
    title: 'Scaling a Regional Retailer to National Leader',
    client: 'NexMart Retail Group',
    industry: 'Retail',
    challenge: 'NexMart was a successful regional retailer with 47 locations in the Midwest, but growth had stalled at $180M annual revenue. They lacked a coherent national expansion strategy, their supply chain was inefficient, and their digital presence was negligible.',
    solution: 'GrowthEdge conducted a comprehensive strategic review and developed a three-year national expansion plan. We redesigned their supply chain, implemented an omnichannel digital strategy, and developed a standardized store operations playbook that enabled rapid, consistent expansion.',
    results: [
      'Expanded from 47 to 134 locations in 24 months',
      'Revenue grew from $180M to $612M (+240%)',
      'Online sales channel launched, achieving $48M in year one',
      'Supply chain efficiency improved by 34%, reducing COGS by 8%',
      'Employee satisfaction scores improved from 61% to 84%',
    ],
    metrics: {
      revenue: { before: '$180M', after: '$612M', label: 'Annual Revenue' },
      locations: { before: '47', after: '134', label: 'Store Locations' },
      onlineSales: { before: '$0', after: '$48M', label: 'Online Revenue' },
      cogs: { before: '58%', after: '50%', label: 'COGS as % of Revenue' },
    },
    tags: ['Retail', 'Expansion', 'Digital', 'Supply Chain'],
    published: true,
  },
  {
    title: 'Digital Transformation of a Legacy Financial Services Firm',
    client: 'Meridian Financial Partners',
    industry: 'Financial Services',
    challenge: 'Meridian was losing market share to fintech competitors. Their legacy systems couldn\'t support modern customer expectations, customer acquisition costs were 3x the industry average, and they faced significant operational risk from manual processes.',
    solution: 'We led a comprehensive digital transformation program: modernizing core banking infrastructure, implementing AI-powered customer analytics, launching a mobile-first customer platform, and redesigning key customer journeys to be fully digital.',
    results: [
      'Customer acquisition cost reduced by 67% ($420 to $139 per customer)',
      'Digital channel adoption grew from 23% to 78% of transactions',
      'Net Promoter Score improved from 12 to 54',
      'Operational costs reduced by $18M annually through automation',
      'Assets under management grew 43% in 18 months',
    ],
    metrics: {
      acquisitionCost: { before: '$420', after: '$139', label: 'Customer Acquisition Cost' },
      digitalAdoption: { before: '23%', after: '78%', label: 'Digital Transaction Rate' },
      nps: { before: '12', after: '54', label: 'Net Promoter Score' },
      aum: { before: '$2.1B', after: '$3.0B', label: 'Assets Under Management' },
    },
    tags: ['Financial Services', 'Digital Transformation', 'Technology', 'Customer Experience'],
    published: true,
  },
  {
    title: 'Turnaround of a Distressed Manufacturing Company',
    client: 'PrecisionCraft Industries',
    industry: 'Manufacturing',
    challenge: 'PrecisionCraft was losing $4M per month with $120M in debt, customer defect rates at 8.2%, and key talent leaving. A private equity firm engaged GrowthEdge to either turn the business around or prepare it for sale.',
    solution: 'We implemented a 90-day stabilization plan focused on cash management and stopping the bleeding, followed by an 18-month operational excellence program. This included implementing lean manufacturing, rebuilding quality systems, renegotiating supplier contracts, and developing a new customer strategy.',
    results: [
      'Achieved cash flow breakeven within 90 days',
      'Defect rate reduced from 8.2% to 0.4%',
      'Operating costs reduced by $22M annually',
      'Revenue grew 31% through expanded customer relationships',
      'Company sold at 8.4x EBITDA vs. projected 4.2x at engagement start',
    ],
    metrics: {
      cashFlow: { before: '-$4M/mo', after: 'Breakeven', label: 'Monthly Cash Flow' },
      defectRate: { before: '8.2%', after: '0.4%', label: 'Customer Defect Rate' },
      operatingCosts: { before: '$86M', after: '$64M', label: 'Annual Operating Costs' },
      exitMultiple: { before: '4.2x', after: '8.4x', label: 'EBITDA Exit Multiple' },
    },
    tags: ['Manufacturing', 'Turnaround', 'Operations', 'Private Equity'],
    published: true,
  },
  {
    title: 'Building a Market Leader in Healthcare Technology',
    client: 'HealthBridge Solutions',
    industry: 'Healthcare Technology',
    challenge: 'HealthBridge had a technically excellent product but was struggling to grow beyond $8M ARR. Their go-to-market strategy was unfocused, sales cycles were too long, and they lacked the strategic positioning to differentiate from well-funded competitors.',
    solution: 'GrowthEdge conducted deep market segmentation to identify the highest-value, fastest-growing customer segments. We redefined the company\'s positioning, rebuilt the sales playbook, implemented a customer success function, and developed a partnership strategy with healthcare systems.',
    results: [
      'ARR grew from $8M to $34M in 18 months (+325%)',
      'Average sales cycle reduced from 9 months to 3.5 months',
      'Net Revenue Retention improved from 87% to 124%',
      'Secured partnerships with 3 major health systems covering 2.4M patients',
      'Completed Series B funding round at $180M valuation',
    ],
    metrics: {
      arr: { before: '$8M', after: '$34M', label: 'Annual Recurring Revenue' },
      salesCycle: { before: '9 months', after: '3.5 months', label: 'Average Sales Cycle' },
      nrr: { before: '87%', after: '124%', label: 'Net Revenue Retention' },
      valuation: { before: '$45M', after: '$180M', label: 'Company Valuation' },
    },
    tags: ['Healthcare', 'SaaS', 'Growth', 'Go-to-Market'],
    published: true,
  },
];

const testimonials = [
  {
    name: 'Jennifer Walsh',
    role: 'CEO',
    company: 'NexMart Retail Group',
    rating: 5,
    text: 'GrowthEdge transformed our business in ways I didn\'t think were possible in such a short timeframe. Their strategic clarity, hands-on execution support, and genuine commitment to our success made all the difference. We went from a regional player to a national leader, and we couldn\'t have done it without them.',
    featured: true,
  },
  {
    name: 'Robert Chen',
    role: 'President & CFO',
    company: 'Meridian Financial Partners',
    rating: 5,
    text: 'The digital transformation program GrowthEdge designed and led for us delivered results that exceeded every expectation. Their ability to bridge business strategy with technology implementation is genuinely rare. Three years later, the capabilities they built are still driving competitive advantage.',
    featured: true,
  },
  {
    name: 'Marcus Johnson',
    role: 'Managing Partner',
    company: 'Apex Capital Partners',
    rating: 5,
    text: 'We\'ve engaged GrowthEdge across multiple portfolio companies and they consistently deliver. Their turnaround work at PrecisionCraft was exceptional—they stabilized a difficult situation quickly and created significantly more value than we anticipated. They\'re now our first call for any major strategic challenge.',
    featured: true,
  },
  {
    name: 'Dr. Patricia Hammond',
    role: 'Founder & CEO',
    company: 'HealthBridge Solutions',
    rating: 5,
    text: 'GrowthEdge didn\'t just give us a strategy document and leave. They embedded with our team, challenged our assumptions constructively, and helped us build the organizational capabilities to execute. Our Series B success is directly attributable to the foundation they helped us build.',
    featured: true,
  },
  {
    name: 'Thomas Burke',
    role: 'COO',
    company: 'Vantage Logistics',
    rating: 5,
    text: 'The operational excellence program we implemented with GrowthEdge saved us $14M in the first year alone. More importantly, they built internal capabilities so our team can continue improving without external support. That\'s the mark of truly excellent consulting.',
    featured: true,
  },
  {
    name: 'Sarah Mitchell',
    role: 'VP Strategy',
    company: 'Cortex Technologies',
    rating: 5,
    text: 'GrowthEdge helped us think through a complex market entry strategy with clarity and rigor I haven\'t experienced with other firms. Their frameworks are practical and immediately applicable, not just theoretical. Six months in, we\'re executing ahead of plan.',
    featured: false,
  },
  {
    name: 'David Kim',
    role: 'CEO',
    company: 'Brightline Energy',
    rating: 5,
    text: 'We needed help scaling our leadership team to match our growth ambitions. GrowthEdge\'s leadership development program fundamentally changed how our executives work together. The results in team alignment and decision-making quality have been remarkable.',
    featured: false,
  },
  {
    name: 'Angela Torres',
    role: 'Chief Revenue Officer',
    company: 'Meridian Commerce',
    rating: 4,
    text: 'The market research GrowthEdge conducted gave us insights we hadn\'t found despite years of internal analysis. Their customer segmentation work alone changed how we prioritize our pipeline and has meaningfully improved our win rates.',
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[SEED] Connected to MongoDB');

    await BlogPost.deleteMany({});
    await CaseStudy.deleteMany({});
    await Testimonial.deleteMany({});

    await BlogPost.insertMany(blogPosts);
    console.log('[SEED] Blog posts seeded');

    await CaseStudy.insertMany(caseStudies);
    console.log('[SEED] Case studies seeded');

    await Testimonial.insertMany(testimonials);
    console.log('[SEED] Testimonials seeded');

    console.log('[SEED] Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error seeding database:', err);
    process.exit(1);
  }
}

seed();
