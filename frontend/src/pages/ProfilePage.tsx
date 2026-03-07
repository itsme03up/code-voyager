// src/pages/ProfilePage.tsx
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import './ProfilePage.css'

// バッジ定義
const BADGE_DEFINITIONS: Record<string, { label: string; icon: string }> = {
  chapter_1: { label: 'Gitの基礎', icon: '🔀' },
  chapter_2: { label: 'ブランチ戦略', icon: '🌿' },
  chapter_3: { label: 'GitHub連携', icon: '🐙' },
  chapter_4: { label: 'ファイルシステム', icon: '📁' },
  chapter_5: { label: 'パーミッション', icon: '🔐' },
  chapter_6: { label: 'Bashスクリプト', icon: '📜' },
  chapter_7: { label: 'ネットワークツール', icon: '🌐' },
  chapter_8: { label: 'Python基礎文法', icon: '🐍' },
  chapter_9: { label: '自動化スクリプト', icon: '🤖' },
  chapter_10: { label: 'コンテナの基礎', icon: '📦' },
  chapter_11: { label: 'Dockerfile', icon: '🐳' },
  chapter_12: { label: 'Docker Compose', icon: '🎼' },
  chapter_13: { label: 'GCPの基礎', icon: '☁️' },
  chapter_14: { label: 'Cloud Run', icon: '🚀' },
  chapter_15: { label: 'IAM・権限管理', icon: '🛡️' },
  chapter_16: { label: 'IaCの基礎', icon: '🏗️' },
  chapter_17: { label: 'GCPリソース管理', icon: '⚙️' },
  chapter_18: { label: 'Playbookの基礎', icon: '📋' },
  chapter_19: { label: 'Roles・Inventory', icon: '🗂️' },
}

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const XP_PER_LEVEL = 300
  const xpInCurrentLevel = progress.totalXP % XP_PER_LEVEL
  const xpPercent = Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100)

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <span className="profile-back" onClick={() => navigate('/')}>← BACK</span>
        <div className="profile-title">// PILOT PROFILE</div>
      </div>

      <div className="profile-content">
        {/* パイロット情報 */}
        <div className="profile-card">
          <div className="profile-avatar">🚀</div>
          <div className="profile-info">
            <div className="profile-name">{progress.pilotName}</div>
            <div className="profile-level">LEVEL {progress.level}</div>
            <div className="xp-bar-track">
              <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="profile-xp">{xpInCurrentLevel} / {XP_PER_LEVEL} XP</div>
          </div>
          <div className="profile-gold">🪙 {progress.completedChapters.length * 100} GOLD</div>
        </div>

        {/* バッジ一覧 */}
        <div className="badge-section">
          <div className="badge-title">// BADGES</div>
          <div className="badge-grid">
            {Object.entries(BADGE_DEFINITIONS).map(([key, badge]) => {
              const earned = progress.badges.includes(key)
              return (
                <div key={key} className={`badge-item ${earned ? 'earned' : 'locked'}`}>
                  <div className="badge-icon">{earned ? badge.icon : '🔒'}</div>
                  <div className="badge-label">{badge.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}