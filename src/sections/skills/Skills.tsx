import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import skillData from './skillsData';
import { Skill, SkillSection } from '../../shared/types';

function SkillIcon({ skill }: { skill: Skill }) {
  const { name, image } = skill;
  return (
    <div
      aria-label={name}
      className="flex w-[104px] cursor-default flex-col items-center gap-2 p-3 transition-transform hover:scale-[1.04] hover:bg-slate-50 active:scale-[0.98] dark:hover:bg-slate-700"
    >
      {image && <img src={image} alt={name} draggable={false} className="max-h-11 max-w-16" />}
      <span className="line-clamp-2 text-center text-sm font-medium">{name}</span>
    </div>
  );
}

function SkillCard({ data }: { data: SkillSection }) {
  return (
    <Reveal>
      <div className="w-full border border-line bg-surface p-5 shadow-subtle dark:border-slate-600 dark:bg-slate-800">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-center font-heading text-lg font-semibold tracking-[-0.25px] text-content">
              {data.section}
            </h3>
            <hr className="w-full border-line" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            {data.skills.map((skill, idx) => (
              <SkillIcon key={`${data.section}-${idx}-${skill.name}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section
      id="Skills"
      className="scroll-mt-20 border-t border-line-subtle bg-slate-100 dark:bg-slate-900"
    >
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2">
            <h2 className="max-w-[500px] text-center font-heading text-3xl font-semibold tracking-[-0.25px] text-content md:text-4xl">
              Skills that drive outcomes
            </h2>
            <p className="max-w-[600px] text-center text-base text-slate-600 dark:text-slate-400">
              Practical tools I use to ship reliable data products and clear decision support.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid w-max grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 md:gap-x-6 md:gap-y-6 xl:grid-cols-3 xl:gap-x-8">
              {skillData.map((item) => (
                <SkillCard key={item.section} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
