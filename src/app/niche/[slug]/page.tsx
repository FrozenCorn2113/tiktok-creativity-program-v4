import { buildMetadata } from '@/lib/seo'
import NichePageClient from './niche-page-client'
import { nicheSlugs, getNicheMetadata } from './niche-data'

export async function generateStaticParams() {
  return nicheSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = getNicheMetadata(params.slug)
  if (!meta) return {}

  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/niche/${params.slug}`,
  })
}

export default function NichePage({ params }: { params: { slug: string } }) {
  return <NichePageClient params={params} />
}
