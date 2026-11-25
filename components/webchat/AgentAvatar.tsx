'use client'

import type { Agent } from './api'

/** Agent photo, or their initial on Cethos teal; a chat bubble mark if unknown. */
export function AgentAvatar({ agent, size = 28 }: { agent: Agent | null; size?: number }) {
  const style = { width: size, height: size }
  if (agent?.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={agent.avatar} alt="" style={style} className="shrink-0 rounded-full object-cover ring-2 ring-white" />
  }
  return (
    <span
      style={{ ...style, fontSize: Math.round(size * 0.42) }}
      className="flex shrink-0 items-center justify-center rounded-full bg-cethos-teal font-semibold text-white ring-2 ring-white"
      aria-hidden="true"
    >
      {(agent?.name || 'C').charAt(0).toUpperCase()}
    </span>
  )
}
