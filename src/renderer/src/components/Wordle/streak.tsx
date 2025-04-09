import streakImage from '@/renderer/src/assets/fire-streak.gif'

export interface StreakProps {
  streak: number
}

export function Streak({ streak }: StreakProps) {
  return (
    <div className="absolute top-10 right-10">
      <div className="relative select-none">
        <img src={streakImage} alt="streak" className="size-20" />
        <span className="absolute z-10 top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/3 font-cartoon text-white font-bold text-lg rotate-12">
          {streak}
        </span>
      </div>
    </div>
  )
}
