import Container from '../Container';

const Bar = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className}`} />
);

function SkillIconSkeleton() {
  return (
    <div className="flex w-[100px] flex-col items-center">
      <Bar className="mb-3 h-12 w-[100px]" />
      <Bar className="h-4 w-20" />
    </div>
  );
}

function SkillCardSkeleton() {
  return (
    <div className="w-[300px] border border-line bg-surface p-5 shadow-subtle dark:border-slate-600 dark:bg-slate-800">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center gap-1">
          <Bar className="h-5 w-3/5" />
          <hr className="w-full border-line" />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillIconSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSkeleton() {
  return (
    <section id="Skills" className="scroll-mt-20 border-t border-line-subtle bg-slate-100 dark:bg-slate-900">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2">
            <Bar className="h-9 w-[400px] max-w-full" />
            <Bar className="mt-2 h-4 w-4/5 max-w-[550px]" />
          </div>

          <div className="flex justify-center">
            <div className="grid w-max grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 md:gap-x-6 md:gap-y-6 xl:grid-cols-3 xl:gap-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkillCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
