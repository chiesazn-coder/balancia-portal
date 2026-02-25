
import MediumFeed from "@/components/MediumFeed"
import RightSidebar from "@/components/RightSidebar"
import {client} from "@/sanity/lib/client"
import {POSTS_QUERY} from "@/sanity/lib/queries"
import {ports} from "@/lib/content"

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      <div className="flex gap-8 py-10">


        <main className="w-full max-w-[720px]">
          <MediumFeed items={posts} />
        </main>

        <RightSidebar
          ports={ports}
          topics={["Port operations", "Operational risk", "Crew & welfare", "Communication"]}
        />
      </div>
    </div>
  )
}