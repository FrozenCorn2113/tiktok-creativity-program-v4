import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator Earnings Database',
  description: 'Anonymized real-world TikTok earnings examples showing how views and RPM translate into Creator Rewards payouts.',
}

const sampleRows = [
  { niche: 'Fitness', followers: '28K', views: '420K', rpm: '$0.68', earnings: '$287' },
  { niche: 'Music', followers: '15K', views: '310K', rpm: '$0.74', earnings: '$188' },
  { niche: 'Education', followers: '42K', views: '520K', rpm: '$0.81', earnings: '$345' },
]

export default function EarningsDatabasePage() {
  return (
    <section className="py-12">
      <Container>
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              Creator earnings database
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Anonymized earnings examples to show how RPM and views translate into payouts.
            </p>
          </header>

          <CalloutBox type="info">
            This database is growing. Submit your anonymized data by email to be included.
          </CalloutBox>

          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-surface-muted)] text-xs uppercase tracking-wide text-[var(--color-text-subtle)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Niche</th>
                  <th className="px-4 py-3 font-semibold">Followers</th>
                  <th className="px-4 py-3 font-semibold">Qualified views</th>
                  <th className="px-4 py-3 font-semibold">RPM</th>
                  <th className="px-4 py-3 font-semibold">Estimated earnings</th>
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((row) => (
                  <tr key={row.niche} className="odd:bg-white even:bg-slate-50">
                    <td className="px-4 py-3">{row.niche}</td>
                    <td className="px-4 py-3">{row.followers}</td>
                    <td className="px-4 py-3">{row.views}</td>
                    <td className="px-4 py-3">{row.rpm}</td>
                    <td className="px-4 py-3">{row.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
