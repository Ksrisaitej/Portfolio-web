import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { projects } from '@/data/projects';
import { Github, ExternalLink } from 'lucide-react';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWide = index < 2;

  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        data-cursor-hover
        className={`glass-card overflow-hidden cursor-pointer group ${
          isWide ? 'col-span-1 md:col-span-1' : 'col-span-1'
        }`}
        style={{
          borderColor: isHovered ? '#D4F87A' : 'rgba(255,255,255,0.08)',
          boxShadow: isHovered ? '0 20px 40px rgba(212,248,122,0.1)' : 'none',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        <div className="p-5 md:p-6">
          {/* Project Number & Year */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-lime-accent">
              {String(project.id).padStart(2, '0')}
            </span>
            <span className="font-body text-xs text-mouse-gray">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl md:text-[22px] font-semibold uppercase text-kimono-white leading-tight tracking-tight mb-3">
            {project.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/[0.08] rounded-full font-body text-[10px] font-medium tracking-[0.04em] uppercase text-mouse-gray"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mb-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mouse-gray hover:text-lime-accent transition-colors duration-300"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} strokeWidth={1.5} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mouse-gray hover:text-lime-accent transition-colors duration-300"
                aria-label="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover transition-opacity duration-400"
            style={{
              opacity: imageLoaded && isHovered ? 1 : 0.15,
              transition: 'opacity 0.4s ease',
            }}
          />
          {/* Always-visible dim version */}
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: imageLoaded ? (isHovered ? 0 : 0.15) : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-lab-black py-[clamp(80px,12vh,160px)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading number="02" title="SELECTED WORK" />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1: 2 wide cards */}
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* Row 2: 4 medium cards */}
          {projects.slice(2).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
