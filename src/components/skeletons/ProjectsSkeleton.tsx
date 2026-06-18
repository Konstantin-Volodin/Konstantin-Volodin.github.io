import Container from '../Container';

const Bar = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className}`} />
);

function ProjectCardSkeleton() {
  return (
    <div className="flex h-full min-h-[340px] flex-col overflow-hidden border border-line bg-surface shadow-subtle md:min-h-[360px] dark:border-slate-700 dark:bg-slate-800">
      <Bar className="h-[140px] shrink-0 md:h-[160px] lg:h-[180px]" />
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <Bar className="h-5 w-20" />
        <Bar className="h-5 w-full" />
        <Bar className="h-5 w-3/4" />
        <div className="mt-auto">
          <Bar className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSkeleton() {
  return (
    <section id="Projects" className="scroll-mt-20 border-t border-line-subtle">
      <Container className="py-28">
        <h2 className="max-w-[500px] font-heading text-3xl font-semibold tracking-[-0.25px] text-content md:text-4xl">
          Projects
        </h2>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Bar className="h-3.5 w-12" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Bar key={i} className="h-7 w-16 rounded-full" />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Bar className="h-3.5 w-20" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Bar key={i} className="h-7 w-14 rounded-full" />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-16 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
