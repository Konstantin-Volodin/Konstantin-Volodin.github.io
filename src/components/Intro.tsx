import Container from './Container';

export default function Intro() {
  return (
    <section className="flex min-h-[80vh] items-center pb-16 pt-[120px] md:pb-20 md:pt-[140px]">
      <Container>
        <div className="flex max-w-[800px] flex-col items-start gap-6 md:gap-8">
          {/* Greeting */}
          <p className="animate-fade-in-up text-lg font-medium text-slate-600 md:text-xl dark:text-slate-400">
            Welcome — I'm Konstantin 👋
          </p>

          {/* Role badge */}
          <p
            className="animate-fade-in-up text-sm font-semibold uppercase tracking-wider text-brand-500 md:text-base dark:text-brand-300"
            style={{ animationDelay: '0.1s' }}
          >
            Data Science &amp; Analytics
          </p>

          {/* Headline */}
          <h1
            className="animate-fade-in-up max-w-[700px] text-3xl font-extrabold leading-tight text-slate-800 md:text-4xl lg:text-5xl dark:text-white"
            style={{ animationDelay: '0.2s' }}
          >
            I build reliable{' '}
            <span className="relative text-brand-500 dark:text-brand-300">
              data products
              <span className="animate-underline absolute -bottom-1 left-0 h-1 rounded-full bg-brand-500 opacity-30 dark:bg-brand-300" />
            </span>{' '}
            that turn policy into impact.
          </h1>

          {/* Description */}
          <p
            className="animate-fade-in-up max-w-[600px] text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400"
            style={{ animationDelay: '0.3s' }}
          >
            I'm a data scientist with the Government of Canada based in Montreal.
            I focus on robust pipelines, reproducible analytics, and clear decision support.
          </p>
        </div>
      </Container>
    </section>
  );
}
