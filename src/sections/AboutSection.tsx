import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HighlightText } from '@/components/HighlightText';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

const STATS = [
  { value: '15+', label: 'Projects' },
  { value: '7+', label: 'Repositories' },
  { value: '2nd Yr', label: 'IIT KGP' },
];

const TIMELINE_MILESTONES = [
  {
    year: '2022',
    title: 'The Genesis',
    description:
      'Started self-learning Python and ML fundamentals. Built first neural network from scratch. The obsession began.',
  },
  {
    year: '2025',
    title: 'IIT Kharagpur · Deep Dive',
    description:
      '2nd year Physics undergrad at IIT KGP. 15+ projects spanning CNNs, Siamese Networks, time-series classification, and hardware-integrated ML systems.',
  },
  {
    year: '2026',
    title: 'Frontier Pursuit',
    description:
      'Targeting ML Engineer roles at frontier AI labs. Building large-scale AI systems, reinforcement learning agents, and contributing to open-source research.',
  },
];

function TimelineNode({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof TIMELINE_MILESTONES)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30% 0px -30% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div
          className={`w-3 h-3 rounded-full border-2 transition-colors duration-500 ${
            isInView
              ? 'bg-lime-accent border-lime-accent'
              : 'bg-transparent border-white/20'
          }`}
        />
        {/* Line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2 + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-px flex-1 bg-white/[0.08] origin-top"
          />
        )}
      </div>

      {/* Content */}
      <div className={`${isLast ? 'pb-0' : 'pb-10 md:pb-12'}`}>
        <span className="font-mono text-xs text-lime-accent tracking-wider">
          {milestone.year}
        </span>
        <h4 className="font-display text-lg md:text-xl font-semibold uppercase text-kimono-white mt-1 leading-tight tracking-tight">
          {milestone.title}
        </h4>
        <p className="font-body text-sm leading-[1.7] text-kimono-white/60 mt-2 max-w-md">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

function Timeline() {
  return (
    <div className="mt-16 md:mt-20">
      <ScrollReveal>
        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-mouse-gray mb-8">
          Timeline
        </h3>
      </ScrollReveal>
      <div className="ml-1.5">
        {TIMELINE_MILESTONES.map((milestone, i) => (
          <TimelineNode
            key={milestone.year}
            milestone={milestone}
            index={i}
            isLast={i === TIMELINE_MILESTONES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-deep-black py-[clamp(80px,12vh,160px)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading number="01" title="ABOUT ME" />

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16">
          {/* Left Column — Bio Text */}
          <div className="space-y-6">
            <ScrollReveal delay={0}>
              <p className="font-body text-base leading-[1.7] text-kimono-white/80">
                I am a{' '}
                <HighlightText delay={300}>
                  Physics undergraduate at Indian Institute of Technology Kharagpur
                </HighlightText>{' '}
                with a strong interest in Artificial Intelligence, Machine Learning, and Robotics. My journey into AI began with self-learning Python and has grown into a passion for building intelligent systems, implementing{' '}
                <HighlightText delay={600}>
                  research papers from scratch
                </HighlightText>
                , and exploring the intersection of machine learning, simulation, and real-world applications.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base leading-[1.7] text-kimono-white/80">
                I have completed industry-recognized specializations in{' '}
                <HighlightText delay={900}>
                  Machine Learning and PyTorch
                </HighlightText>{' '}
                and continuously work on projects that strengthen my understanding of deep learning, reinforcement learning, computer vision, and generative AI. I enjoy translating theoretical concepts into practical solutions and am particularly interested in{' '}
                <HighlightText delay={1200}>
                  frontier AI research
                </HighlightText>{' '}
                and autonomous systems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="font-body text-base leading-[1.7] text-kimono-white/80">
                My long-term goal is to become a{' '}
                <HighlightText delay={1500}>
                  Machine Learning Engineer
                </HighlightText>{' '}
                working on cutting-edge AI technologies and contribute to impactful products and research at a global scale. Currently, I am focused on advancing my skills in deep learning, reinforcement learning, robotics, and{' '}
                <HighlightText delay={1800}>
                  large-scale AI systems
                </HighlightText>{' '}
                while actively participating in open-source and research-oriented projects.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column — Stats & Links */}
          <div className="space-y-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.3 + i * 0.15}>
                <div className="glass-card p-6 text-center">
                  <div className="font-display text-4xl font-bold text-lime-accent leading-none">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs font-normal uppercase tracking-[0.08em] text-mouse-gray mt-2">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.8}>
              <div className="mt-8 space-y-3">
                <a
                  href="https://github.com/Ksrisaitej"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm font-medium text-kimono-white hover:text-lime-accent transition-colors duration-300 group"
                >
                  <Github size={16} strokeWidth={1.5} />
                  <span>GitHub</span>
                  <ArrowUpRight
                    size={14}
                    className="text-mouse-gray group-hover:text-lime-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/sri-sai-tej-434813370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm font-medium text-kimono-white hover:text-lime-accent transition-colors duration-300 group"
                >
                  <Linkedin size={16} strokeWidth={1.5} />
                  <span>LinkedIn</span>
                  <ArrowUpRight
                    size={14}
                    className="text-mouse-gray group-hover:text-lime-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Timeline */}
        <Timeline />
      </div>
    </section>
  );
}
