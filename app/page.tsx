'use client'

import { useState } from 'react'
import { GitBranch, GitCommit, SlidersHorizontal, Search, ZoomIn, ZoomOut, Maximize2, Sparkles, ChevronDown, X, PanelRight, Layers3, Clock3, Users, Box, ArrowUpRight, FileCode2 } from 'lucide-react'

type Commit = { id: string; x: number; y: number; r: number; branch: string; color: string; message: string; author: string; time: string; files: number; additions: number; deletions: number; hash: string; tags?: string[]; }

const commits: Commit[] = [
  { id: 'root', x: 13, y: 69, r: 9, branch: 'main', color: '#c7d2fe', message: 'Initialize repository', author: 'Maya Chen', time: 'Sep 18, 09:14', files: 12, additions: 248, deletions: 0, hash: 'a4f92c1' },
  { id: 'api', x: 23, y: 58, r: 7, branch: 'main', color: '#c7d2fe', message: 'Establish API boundary', author: 'Maya Chen', time: 'Sep 18, 11:42', files: 8, additions: 192, deletions: 22, hash: 'c83e19a' },
  { id: 'auth', x: 34, y: 48, r: 8, branch: 'main', color: '#c7d2fe', message: 'Add session middleware', author: 'Drew Kim', time: 'Sep 19, 10:23', files: 14, additions: 386, deletions: 54, hash: 'e12b7a4' },
  { id: 'split', x: 42, y: 48, r: 6, branch: 'edge-cache', color: '#f5b96b', message: 'Explore edge cache', author: 'Sol Rivera', time: 'Sep 19, 13:08', files: 5, additions: 91, deletions: 6, hash: 'b901fc2' },
  { id: 'cache', x: 51, y: 28, r: 9, branch: 'edge-cache', color: '#f5b96b', message: 'Cache read-heavy routes', author: 'Sol Rivera', time: 'Sep 20, 09:51', files: 21, additions: 642, deletions: 118, hash: '74da02f', tags: ['performance'] },
  { id: 'schema', x: 54, y: 65, r: 6, branch: 'main', color: '#c7d2fe', message: 'Tighten response schemas', author: 'Drew Kim', time: 'Sep 20, 14:19', files: 7, additions: 153, deletions: 31, hash: 'f5a2d80' },
  { id: 'merge', x: 63, y: 43, r: 12, branch: 'main', color: '#a9e6cf', message: 'Merge edge-cache into main', author: 'Maya Chen', time: 'Sep 21, 16:47', files: 26, additions: 733, deletions: 149, hash: '1c7e8ba', tags: ['merge'] },
  { id: 'ui', x: 73, y: 43, r: 7, branch: 'main', color: '#c7d2fe', message: 'Shape the observability surface', author: 'Maya Chen', time: 'Sep 22, 10:12', files: 18, additions: 521, deletions: 87, hash: 'd61e4cc' },
  { id: 'worker', x: 81, y: 43, r: 6, branch: 'main', color: '#c7d2fe', message: 'Move telemetry to worker', author: 'Drew Kim', time: 'Sep 22, 15:02', files: 9, additions: 228, deletions: 42, hash: '6b3c9d1' },
  { id: 'now', x: 90, y: 43, r: 10, branch: 'main', color: '#d9f99d', message: 'Make traces feel native', author: 'Maya Chen', time: 'Sep 23, 18:26', files: 31, additions: 904, deletions: 210, hash: '9fc20dd', tags: ['HEAD'] },
]

const pathMain = 'M 13 69 C 18 64, 19 62, 23 58 S 31 51, 34 48 S 46 59, 54 65 S 59 48, 63 43 S 70 42, 73 43 S 78 44, 81 43 S 86 42, 90 43'
const pathFeature = 'M 34 48 C 39 43, 44 36, 51 28 S 57 35, 63 43'

export default function Page() {
  const [selected, setSelected] = useState<Commit>(commits.find(c => c.id === 'merge')!)
  const [zoom, setZoom] = useState(1)
  const [showPanel, setShowPanel] = useState(true)
  const [activeBranch, setActiveBranch] = useState('all')
  const visible = activeBranch === 'all' ? commits : commits.filter(c => c.branch === activeBranch || c.id === 'merge')

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><GitBranch size={17} /></div><div><p className="eyebrow">REPOSITORY ATLAS</p><h1>northstar<span>/</span>core</h1></div></div>
        <div className="top-meta"><div className="sync"><span className="pulse" /> Live history <span className="slash">/</span> 3,842 commits</div><button className="icon-button" aria-label="Toggle panel" onClick={() => setShowPanel(!showPanel)}><PanelRight size={17} /></button><div className="avatar">MC</div></div>
      </header>

      <section className="workspace">
        <div className="map-area">
          <div className="map-head"><div><p className="eyebrow">BRANCH TOPOLOGY / 90 DAYS</p><h2>A living history of <em>northstar</em></h2></div><button className="control-pill"><Clock3 size={14} /> Sep 18 — Sep 24 <ChevronDown size={14} /></button></div>
          <div className="map-canvas" style={{ '--zoom': zoom } as React.CSSProperties}>
            <div className="terrain-label label-a">PRODUCTION LINE</div><div className="terrain-label label-b">EDGE EXPERIMENTS</div><div className="terrain-label label-c">NOW</div>
            <div className="grid-lines" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="history-svg" aria-label="Interactive Git commit history map">
              <path d={pathMain} className="branch-path main-path" /><path d={pathFeature} className="branch-path feature-path" />
              <path d="M 34 48 C 38 52, 45 59, 54 65" className="branch-path ghost-path" />
              {visible.map(commit => <g key={commit.id} className={`commit-node ${selected.id === commit.id ? 'selected' : ''}`} onClick={() => setSelected(commit)} role="button" tabIndex={0} aria-label={`View ${commit.message}`}><circle cx={commit.x} cy={commit.y} r={commit.r + 2} className="node-halo" /><circle cx={commit.x} cy={commit.y} r={commit.r} fill={commit.color} className="node-core" /><circle cx={commit.x} cy={commit.y} r={Math.max(2, commit.r / 3)} fill="#11141c" className="node-dot" /></g>)}
            </svg>
            <div className="branch-tag main-tag"><span className="branch-dot" /> main <span className="tag-count">2,904</span></div><div className="branch-tag feature-tag"><span className="branch-dot orange" /> edge-cache <span className="tag-count">18</span></div>
            <div className="map-legend"><div><span className="legend-dot small" /> regular</div><div><span className="legend-dot large" /> high impact</div><div><span className="legend-line" /> branch path</div></div>
            <div className="map-controls"><button aria-label="Zoom in" onClick={() => setZoom(Math.min(1.4, zoom + .1))}><ZoomIn size={15} /></button><button aria-label="Zoom out" onClick={() => setZoom(Math.max(.8, zoom - .1))}><ZoomOut size={15} /></button><button aria-label="Fit map" onClick={() => setZoom(1)}><Maximize2 size={14} /></button></div>
            <div className="scale">50 commits <span /> 100 commits</div>
          </div>
          <div className="filter-bar"><button className="filter-label"><SlidersHorizontal size={14} /> FILTERS</button><button className={activeBranch === 'all' ? 'filter active' : 'filter'} onClick={() => setActiveBranch('all')}><Layers3 size={13} /> All branches <span>3</span></button><button className={activeBranch === 'main' ? 'filter active' : 'filter'} onClick={() => setActiveBranch('main')}><GitBranch size={13} /> main</button><button className={activeBranch === 'edge-cache' ? 'filter active orange-filter' : 'filter'} onClick={() => setActiveBranch('edge-cache')}><GitBranch size={13} /> edge-cache</button><button className="filter"><Users size={13} /> Contributors <ChevronDown size={13} /></button><div className="filter-spacer" /><button className="search-button" aria-label="Search commits"><Search size={16} /></button></div>
        </div>

        {showPanel && <aside className="detail-panel"><div className="panel-header"><div><p className="eyebrow">COMMIT INSPECTOR</p><p className="commit-hash"><GitCommit size={14} /> {selected.hash}</p></div><button className="close-button" onClick={() => setShowPanel(false)} aria-label="Close inspector"><X size={16} /></button></div><div className="selected-banner" style={{ '--accent': selected.color } as React.CSSProperties}><div className="selected-node" style={{ background: selected.color }}><GitCommit size={19} /></div><div><span className="status-label">{selected.tags?.[0] || 'COMMIT'} </span><h2>{selected.message}</h2></div></div><div className="author-row"><div className="author-avatar">MC</div><div><strong>{selected.author}</strong><span>committed {selected.time}</span></div><button className="more-button">•••</button></div><div className="ai-card"><div className="ai-title"><Sparkles size={14} /> AI EXPLANATION <span>NEW</span></div><p>This change consolidates the cache boundary around read-heavy routes, reducing repeated work without leaking implementation details into the request layer.</p><button className="text-link">Show reasoning <ArrowUpRight size={13} /></button></div><div className="stat-grid"><div><span>FILES CHANGED</span><strong>{selected.files}</strong></div><div><span>IMPACT SCORE</span><strong>8.4 <small>/ 10</small></strong></div><div className="green"><span>ADDITIONS</span><strong>+{selected.additions}</strong></div><div className="red"><span>DELETIONS</span><strong>−{selected.deletions}</strong></div></div><div className="files-section"><div className="section-head"><span>CHANGED FILES</span><span>{selected.files} total <ChevronDown size={13} /></span></div><div className="file-row"><FileCode2 size={15} /><span>src/middleware/cache.ts</span><b className="green-text">+184</b></div><div className="file-row"><FileCode2 size={15} /><span>src/routes/telemetry.ts</span><b className="green-text">+76</b></div><div className="file-row"><FileCode2 size={15} /><span>tests/cache-boundary.test.ts</span><b className="red-text">−21</b></div></div><button className="open-diff">Open full diff <ArrowUpRight size={15} /></button></aside>}
      </section>
      <footer className="statusbar"><span><span className="status-dot" /> All systems mapped</span><span>Last indexed 42 seconds ago</span><span className="footer-right">Drag to pan <span className="key">SPACE</span> + drag</span></footer>
    </main>
  )
}

const _unused = { Box }
