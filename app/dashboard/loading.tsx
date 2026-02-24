export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex w-64 flex-col border-r border-border bg-card p-4">
        <div className="h-10 w-full rounded-lg bg-muted animate-pulse mb-4" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-full rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      {/* Main area skeleton */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-3 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        </div>

        {/* Messages skeleton */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className={`rounded-2xl p-4 ${i % 2 === 0 ? "bg-card w-3/4" : "bg-primary/10 w-1/2"}`}>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input skeleton */}
        <div className="border-t border-border bg-card px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="h-12 w-full rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
