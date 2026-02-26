import MediumFeed from "@/components/MediumFeed"
import RightSidebar from "@/components/RightSidebar"
import WeatherWidget from "@/components/WeatherWidget" // 1. Import widgetnya
import {client} from "@/sanity/lib/client"
import {POSTS_QUERY} from "@/sanity/lib/queries"
import {ports} from "@/lib/content"

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      {/* 2. Tambahkan flex-col agar di mobile kontennya bertumpuk ke bawah */}
      <div className="flex flex-col lg:flex-row gap-8 py-10">
        
        <main className="w-full max-w-[720px]">

          <MediumFeed items={posts} />

          <div className="mb-8 lg:hidden">
            <WeatherWidget />
          </div>
        </main>

        <RightSidebar
          ports={ports}
          topics={["Port operations", "Operational risk", "Crew & welfare", "Communication"]}
        />
      </div>
    </div>
  )
}