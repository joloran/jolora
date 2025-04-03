import React from 'react'

import { Skeleton } from '../../ui/skeleton'

export function LoadingForm() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-64 h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-64 h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-64 h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-64 h-10" />
          </div>

          <div className="space-y-2 col-span-2">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  )
}
