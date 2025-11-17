export function FeaturesSection() {
  const features = [
    {
      title: 'Instant Conversion',
      description: 'Convert Ethiopian dates to Gregorian calendar with one click',
      icon: '🔄',
    },
    {
      title: 'Ge\'ez Numerals',
      description: 'View dates in traditional Ge\'ez numeral system',
      icon: '🔤',
    },
    {
      title: 'Calendar View',
      description: 'Browse complete Ethiopian calendar months',
      icon: '📅',
    },
    {
      title: 'Accessible',
      description: 'Full keyboard navigation and screen reader support',
      icon: '♿',
    },
  ]

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-border/60 rounded-xl border bg-white/40 p-6 backdrop-blur-md"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
