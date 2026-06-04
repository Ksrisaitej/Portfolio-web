import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { skills, skillCategories } from '@/data/skills';

function SkillPill({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <ScrollReveal delay={index * 0.03}>
      <div
        className="relative inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.span
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block px-[18px] py-2 bg-white/[0.04] border border-white/[0.08] rounded-full font-body text-xs text-kimono-white/80 cursor-default hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
        >
          {skill.name}
        </motion.span>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neural-dark border border-white/10 rounded-lg shadow-lg whitespace-nowrap z-10"
            >
              <p className="font-body text-[11px] text-kimono-white/70 max-w-[200px] whitespace-normal">
                {skill.tooltip}
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neural-dark border-r border-b border-white/10 rotate-45 -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSkills =
    activeFilter === 'All'
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  const groupedSkills =
    activeFilter === 'All'
      ? skillCategories
          .filter((c) => c !== 'All')
          .map((category) => ({
            category,
            skills: skills.filter((s) => s.category === category),
          }))
      : [{ category: activeFilter, skills: filteredSkills }];

  return (
    <section
      id="skills"
      className="relative bg-lab-black py-[clamp(80px,12vh,160px)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading number="03" title="TECH STACK & SKILLS" />

        {/* Subheading */}
        <ScrollReveal>
          <p className="font-body text-sm italic text-mouse-gray text-center mb-10">
            Hover over any skill below to decode framework proficiency, core metrics, and usage contexts.
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full font-body text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-lime-accent text-lab-black'
                    : 'text-mouse-gray hover:text-kimono-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {groupedSkills.map((group) => (
              <div key={group.category} className="mb-8 last:mb-0">
                {activeFilter === 'All' && (
                  <ScrollReveal>
                    <h4 className="font-body text-[11px] font-medium uppercase tracking-[0.1em] text-mouse-gray mb-4">
                      {group.category}
                    </h4>
                  </ScrollReveal>
                )}
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, i) => (
                    <SkillPill key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee Footer */}
      <div className="mt-16 pt-6 border-t border-white/[0.06] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="font-body text-[13px] font-normal uppercase tracking-[0.1em] text-mouse-gray/40 mx-8"
            >
              Physics × Simulation × Machine Learning
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
