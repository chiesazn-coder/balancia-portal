export default function CoursePreview({
  courses,
}: {
  courses: { title: string; note: string }[];
}) {
  return (
    <section className="mt-10 mb-14">
      <div className="mb-3 text-xs font-semibold tracking-wide text-neutral-600">
        LEARNING
      </div>

      <div className="grid gap-4">
        {courses.slice(0, 2).map((c) => (
          <div key={c.title} className="rounded-2xl border border-neutral-200 p-5">
            <div className="text-base font-semibold tracking-tight">{c.title}</div>
            <div className="mt-2 text-sm leading-6 text-neutral-700">{c.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
