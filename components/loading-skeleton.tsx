export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-40 card-glass rounded-lg" />
      ))}
    </div>
  );
}

export function PathCardSkeleton() {
  return (
    <div className="card-glass h-full p-8 space-y-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card-glass p-8 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <PathCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
