/**
 * @deprecated Use <CalloutBox type="tip"> instead.
 * Kept for backward compatibility with existing MDX files.
 */
import CalloutBox from '@/components/CalloutBox'

type ProTipBoxProps = {
  children: React.ReactNode
  title?: string
}

export default function ProTipBox({ children, title }: ProTipBoxProps) {
  return (
    <CalloutBox type="tip" title={title} className="my-6">
      {children}
    </CalloutBox>
  )
}
