'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function DashboardPage() {
  useEffect(() => {
    // Ensure body has correct background for this page
    document.body.style.background = '#0D0D0B'
    document.body.style.color = '#F5F0E8'
    return () => {
      document.body.style.background = ''
      document.body.style.color = ''
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
        strategy="beforeInteractive"
      />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --ink:#0D0D0B;--cream:#F5F0E8;--gold:#A07840;--green:#1D6B47;--dim:#6B6456;
          --lime:#C5FF53;--border:rgba(160,120,64,.2);--font:'DM Sans',sans-serif;
          --red:#E05A5A;--card:rgba(255,255,255,.04);--lime2:rgba(197,255,83,.12);
        }
        html,body{min-height:100%;background:var(--ink);color:var(--cream);font-family:var(--font);font-size:14px}
        /* PIN */
        #pin-gate{position:fixed;inset:0;background:var(--ink);display:flex;align-items:center;justify-content:center;z-index:100;flex-direction:column;gap:20px}
        .pin-ico{width:48px;height:48px;border-radius:12px;background:var(--lime2);border:1px solid rgba(197,255,83,.25);display:flex;align-items:center;justify-content:center}
        .pin-ico svg{width:22px;height:22px;stroke:var(--lime)}
        .pin-title{font-size:20px;font-weight:500}
        .pin-sub{font-size:12px;color:var(--dim);margin-top:3px;text-align:center}
        .dots{display:flex;gap:10px;margin:4px 0}
        .dot{width:11px;height:11px;border-radius:50%;border:1.5px solid rgba(160,120,64,.3);transition:all .15s}
        .dot.on{background:var(--lime);border-color:var(--lime)}
        .pin-err{font-size:11px;color:var(--red);min-height:14px;text-align:center}
        .numpad{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;width:200px}
        .nb{height:52px;border-radius:10px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.04);color:var(--cream);font-size:18px;cursor:pointer;transition:background .12s}
        .nb:hover{background:rgba(255,255,255,.10)}
        .nb.sm{font-size:11px;color:var(--dim)}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
        .shake{animation:shake .3s ease}
        /* APP */
        #app{display:none;flex-direction:column;min-height:100vh}
        #app.on{display:flex}
        .topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap}
        .tl{display:flex;align-items:center;gap:12px}
        .t-ico{width:36px;height:36px;border-radius:9px;background:var(--lime2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .t-ico svg{width:16px;height:16px;stroke:var(--lime)}
        .t-name{font-size:16px;font-weight:500}
        .t-sub{font-size:10px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-top:1px}
        .tr{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .tabgrp{display:flex;align-items:center;gap:6px}
        .tabgrp .glbl{font-size:10px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase}
        .rtabs{display:flex;gap:6px}
        .rtab{padding:6px 14px;border-radius:7px;font-size:12px;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--dim);transition:all .15s}
        .rtab.on{background:var(--lime2);border-color:var(--lime);color:var(--lime)}
        /* EVENT FILTER */
        .evt-wrap{display:flex;align-items:center;gap:8px}
        .evt-lbl{font-size:10px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase}
        #evt{background:rgba(255,255,255,.04);color:var(--cream);border:1px solid var(--border);border-radius:7px;padding:6px 10px;font-size:12px;font-family:var(--font);cursor:pointer;max-width:280px}
        #evt:focus{outline:none;border-color:var(--lime)}
        #evt option{background:var(--ink);color:var(--cream)}
        .main{padding:20px 24px;display:flex;flex-direction:column;gap:16px}
        /* ROYAL SHOWS SECTION */
        #royal-sec{display:none;flex-direction:column;gap:10px}
        .royal-summary{display:flex;flex-wrap:wrap;gap:26px;align-items:center;background:linear-gradient(135deg,var(--lime2),rgba(197,255,83,.03));border:1px solid var(--lime);border-radius:12px;padding:15px 20px}
        .rs-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--lime)}
        .rs-item{display:flex;flex-direction:column;gap:2px}
        .rs-big{font-size:21px;font-weight:700;color:var(--cream);line-height:1}
        .rs-big.accent{color:var(--lime)}
        .rs-lbl{font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em}
        .royal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .rshow{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--lime);border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:7px}
        .rshow-name{font-size:14px;font-weight:600;color:var(--cream)}
        .rshow-meta{font-size:11px;color:var(--dim)}
        .rshow-rev{font-size:22px;font-weight:700;color:var(--lime);line-height:1}
        .rshow-stats{display:flex;flex-wrap:wrap;gap:12px;font-size:11px;color:var(--dim);border-top:1px solid var(--border);padding-top:8px}
        .rshow-stats b{color:var(--cream);font-weight:600}
        /* KPI GRID */
        .kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .kpi{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;display:flex;flex-direction:column;gap:4px}
        .kpi-lbl{font-size:10px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase}
        .kpi-val{font-size:22px;font-weight:600;color:var(--cream);line-height:1.1}
        .kpi-sub{font-size:11px;color:var(--dim)}
        .kpi.accent .kpi-val{color:var(--lime)}
        .kpi.pos-val .kpi-val{color:#6fcf97}
        /* CHARTS ROW */
        .charts-row{display:grid;grid-template-columns:2fr 1fr;gap:10px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px}
        .card-title{font-size:10px;font-weight:500;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
        .chart-wrap{position:relative;height:210px}
        /* MARKETING METRICS */
        .mkt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        /* TABLE */
        .table-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .table-hdr{padding:14px 18px;border-bottom:1px solid var(--border);font-size:10px;font-weight:500;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;display:flex;align-items:center;justify-content:space-between}
        .shows-count{color:var(--lime);font-size:11px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th{padding:9px 14px;text-align:left;color:var(--dim);font-weight:400;font-size:10px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--border);white-space:nowrap}
        td{padding:10px 14px;border-bottom:1px solid rgba(160,120,64,.07);white-space:nowrap}
        tr:last-child td{border-bottom:none}
        tr:hover td{background:rgba(255,255,255,.02)}
        .pos{color:#6fcf97}.neg{color:var(--red)}
        .cat-pill{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;background:rgba(255,255,255,.06);color:var(--dim)}
        .loading{display:flex;align-items:center;justify-content:center;height:180px;color:var(--dim);font-size:13px;gap:10px}
        /* REPORT */
        #report-sec{display:none;flex-direction:column;gap:0}
        #report-sec.on{display:flex}
        .rep-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .rep-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .rep-t{font-size:13px;font-weight:500;color:var(--cream)}
        .rep-d{font-size:11px;color:var(--dim);margin-top:2px}
        .rep-dl{padding:6px 14px;border-radius:7px;font-size:11px;border:1px solid var(--lime);background:var(--lime2);color:var(--lime);text-decoration:none;white-space:nowrap}
        .rep-dl:hover{background:rgba(197,255,83,.2)}
        .rep-embed{width:100%;height:780px;border:0;background:#fff;display:block}
        .rep-fallback{padding:18px;font-size:12px;color:var(--dim)}
        .demo-flag{font-size:10px;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--border);border-radius:6px;padding:4px 9px}
        @media(max-width:700px){.kpi-grid{grid-template-columns:repeat(2,1fr)}.charts-row,.mkt-grid,.royal-grid{grid-template-columns:1fr}.main{padding:14px}.rep-embed{height:520px}}
      `}</style>

      {/* PIN Gate */}
      <div id="pin-gate">
        <div className="pin-ico">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="pin-title">Brand Dashboard</div>
          <div className="pin-sub">Enter PIN to continue</div>
        </div>
        <div className="dots">
          <div className="dot" id="d0"></div>
          <div className="dot" id="d1"></div>
          <div className="dot" id="d2"></div>
          <div className="dot" id="d3"></div>
        </div>
        <div className="pin-err" id="pin-err"></div>
        <div className="numpad">
          <button className="nb">1</button><button className="nb">2</button><button className="nb">3</button>
          <button className="nb">4</button><button className="nb">5</button><button className="nb">6</button>
          <button className="nb">7</button><button className="nb">8</button><button className="nb">9</button>
          <button className="nb sm">⌫</button><button className="nb">0</button><button className="nb sm">Clear</button>
        </div>
      </div>

      {/* App */}
      <div id="app">
        <div className="topbar">
          <div className="tl">
            <div className="t-ico">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <div>
              <div className="t-name">Brand Dashboard</div>
              <div className="t-sub" id="t-sub">Artisan Co · Completed Shows</div>
            </div>
          </div>
          <div className="tr">
            <span className="demo-flag" id="demo-flag" style={{ display: 'none' }}>Sample data</span>
            <div className="evt-wrap">
              <span className="evt-lbl">Event</span>
              <select id="evt"></select>
            </div>
            <div className="rtabs regtabs">
              <button className="rtab on">AUS</button>
              <button className="rtab">NZL</button>
            </div>
          </div>
        </div>

        <div className="main">
          <div id="loading" className="loading">Loading…</div>
          <div id="content" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>

            {/* Revenue KPIs */}
            <div className="kpi-grid">
              <div className="kpi accent">
                <div className="kpi-lbl">Total Revenue</div>
                <div className="kpi-val" id="k-rev">—</div>
                <div className="kpi-sub" id="k-shows">— completed shows</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Unit Sales</div>
                <div className="kpi-val" id="k-units">—</div>
                <div className="kpi-sub" id="k-aov">— avg order value</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Avg Revenue / Show</div>
                <div className="kpi-val" id="k-avg">—</div>
                <div className="kpi-sub">Per completed show</div>
              </div>
            </div>

            {/* Charts */}
            <div className="charts-row">
              <div className="card">
                <div className="card-title">Revenue by Show</div>
                <div className="chart-wrap"><canvas id="barChart"></canvas></div>
              </div>
              <div className="card">
                <div className="card-title">Revenue by Category</div>
                <div className="chart-wrap"><canvas id="donutChart"></canvas></div>
              </div>
            </div>

            {/* Major Shows */}
            <div id="royal-sec">
              <div className="card-title" style={{ paddingLeft: '2px', marginBottom: '-4px' }}>Major Shows</div>
              <div className="royal-grid" id="royal-grid"></div>
            </div>

            {/* Marketing */}
            <div className="card-title" style={{ paddingLeft: '2px', marginBottom: '-6px' }}>Marketing &amp; Engagement</div>
            <div className="mkt-grid">
              <div className="kpi pos-val">
                <div className="kpi-lbl">CX Engaged</div>
                <div className="kpi-val" id="k-cx">—</div>
                <div className="kpi-sub">Total stand interactions</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Contacts Captured</div>
                <div className="kpi-val" id="k-imp">—</div>
                <div className="kpi-sub">Leads &amp; database adds</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Email Signups</div>
                <div className="kpi-val" id="k-email">—</div>
                <div className="kpi-sub">Database growth</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Average Order Value</div>
                <div className="kpi-val" id="k-retail">—</div>
                <div className="kpi-sub">Avg order value</div>
              </div>
            </div>

            {/* Table */}
            <div className="table-card">
              <div className="table-hdr">
                <span>Completed Show Breakdown</span>
                <span className="shows-count" id="t-count"></span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Show</th>
                      <th>Category</th>
                      <th>City</th>
                      <th>Date</th>
                      <th>Revenue</th>
                      <th>Units</th>
                      <th>CX Engaged</th>
                      <th>CX Flow-Through</th>
                    </tr>
                  </thead>
                  <tbody id="tbody"></tbody>
                </table>
              </div>
            </div>

            {/* Event Report */}
            <div id="report-sec">
              <div className="rep-card">
                <div className="rep-hdr">
                  <div>
                    <div className="rep-t" id="rep-title">—</div>
                    <div className="rep-d" id="rep-desc">—</div>
                  </div>
                  <a className="rep-dl" id="rep-dl" href="#" rel="noopener" target="_blank">Open PDF ↗</a>
                </div>
                <iframe className="rep-embed" id="rep-embed" title="Event report"></iframe>
                <div className="rep-fallback">
                  Can&apos;t see the report above?{' '}
                  <a id="rep-dl2" href="#" rel="noopener" style={{ color: 'var(--lime)' }} target="_blank">Open it in a new tab</a>.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Dashboard logic */}
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  // ── CONFIG ───────────────────────────────────────────────
  var PINS = { '2580': 'Artisan Co', '2468': 'Best of the Bone' };
  var pin = '', maxLen = 4;

  // Artisan Co: real rolling-12m show data. BOTB: placeholder pending Dave's figures.
  var DATA = {
    'Artisan Co': {
      aus: [
        // Jul–Dec 2025 (within rolling 12m from today)
        { name:'Melb Little Food Market',            cat:'Food & Bev',        city:'Melbourne', date:'Jul 2025', rev:16000, units:619,  cx:1096, cxt:274, aov:52, major:false },
        { name:'Cairns Royal Show',                  cat:'City Agriculture',  city:'Cairns',    date:'Jul 2025', rev:5869,  units:271,  cx:480,  cxt:120, aov:49, major:true  },
        { name:'Perth Good Food & Wine',             cat:'Food & Bev',        city:'Perth',     date:'Jul 2025', rev:14386, units:707,  cx:1204, cxt:301, aov:48, major:false },
        { name:'Aus Home Show – Melbourne EEA',      cat:'Home & Lifestyle',  city:'Melbourne', date:'Aug 2025', rev:12677, units:438,  cx:760,  cxt:190, aov:67, major:false },
        { name:'Brisbane Ekka',                      cat:'City Agriculture',  city:'Brisbane',  date:'Aug 2025', rev:39470, units:1625, cx:3336, cxt:834, aov:48, major:true  },
        { name:'Adelaide Royal Show',                cat:'City Agriculture',  city:'Adelaide',  date:'Sep 2025', rev:36470, units:1267, cx:2428, cxt:607, aov:61, major:true  },
        { name:'Aus Home Show – Brisbane EEA',       cat:'Home & Lifestyle',  city:'Brisbane',  date:'Sep 2025', rev:13814, units:560,  cx:940,  cxt:235, aov:60, major:false },
        { name:'Perth Royal Show',                   cat:'City Agriculture',  city:'Perth',     date:'Sep 2025', rev:21571, units:982,  cx:1840, cxt:460, aov:47, major:true  },
        { name:'Melbourne Royal Show',               cat:'City Agriculture',  city:'Melbourne', date:'Oct 2025', rev:40280, units:1725, cx:2988, cxt:747, aov:54, major:true  },
        { name:'Sydney Mind Body Spirit',            cat:'Lifestyle',         city:'Sydney',    date:'Oct 2025', rev:18104, units:520,  cx:1376, cxt:344, aov:53, major:false },
        { name:'Brisbane Good Food and Wine',        cat:'Food & Bev',        city:'Brisbane',  date:'Oct 2025', rev:14120, units:565,  cx:1412, cxt:353, aov:52, major:false },
        { name:'Melbourne MBSF',                     cat:'Lifestyle',         city:'Melbourne', date:'Nov 2025', rev:11431, units:520,  cx:1376, cxt:344, aov:53, major:false },
        { name:'GF&W – Sydney Christmas Market',     cat:'Food & Bev',        city:'Sydney',    date:'Nov 2025', rev:7878,  units:349,  cx:640,  cxt:160, aov:50, major:false },
        { name:'GF&W – Melbourne Christmas Market',  cat:'Food & Bev',        city:'Melbourne', date:'Dec 2025', rev:8140,  units:382,  cx:648,  cxt:162, aov:50, major:false },
        // Jan–Jul 2026
        { name:'Aus Home Show – Brisbane EEA',       cat:'Home & Lifestyle',  city:'Brisbane',  date:'Mar 2026', rev:10850, units:402,  cx:812,  cxt:203, aov:54, major:false },
        { name:'Brisbane Mind Body Spirit Festival', cat:'Lifestyle',         city:'Brisbane',  date:'Mar 2026', rev:9240,  units:344,  cx:705,  cxt:176, aov:53, major:false },
        { name:'Aus Home Show – Sydney EEA',         cat:'Home & Lifestyle',  city:'Sydney',    date:'Mar 2026', rev:7180,  units:266,  cx:524,  cxt:131, aov:55, major:false },
        { name:'Sydney Mind Body and Spirit',        cat:'Lifestyle',         city:'Sydney',    date:'Mar 2026', rev:13960, units:517,  cx:998,  cxt:250, aov:56, major:false },
        { name:'Sydney Royal Show',                  cat:'City Agriculture',  city:'Sydney',    date:'Apr 2026', rev:112400,units:4163, cx:8640, cxt:2160,aov:52, major:true  },
        { name:'Aus Home Show – Melbourne EEA',      cat:'Home & Lifestyle',  city:'Melbourne', date:'Apr 2026', rev:9510,  units:352,  cx:742,  cxt:186, aov:51, major:false },
        { name:'Meatstock Sydney',                   cat:'Food & Bev',        city:'Sydney',    date:'May 2026', rev:6780,  units:251,  cx:521,  cxt:130, aov:52, major:false },
        { name:'The Big Design Market – Melbourne',  cat:'Design Market',     city:'Melbourne', date:'May 2026', rev:12960, units:480,  cx:565,  cxt:270, aov:48, major:false },
        { name:'Melbourne Good Food and Wine',       cat:'Food & Bev',        city:'Melbourne', date:'May 2026', rev:16420, units:608,  cx:1212, cxt:303, aov:54, major:false },
        { name:'Melbourne Mind Body Spirit Festival',cat:'Lifestyle',         city:'Melbourne', date:'Jun 2026', rev:16510, units:611,  cx:1175, cxt:294, aov:56, major:false },
        { name:'Perth Home Show',                    cat:'Home & Lifestyle',  city:'Perth',     date:'Jun 2026', rev:14690, units:544,  cx:1016, cxt:254, aov:58, major:false },
        { name:'Sydney Good Food & Wine',            cat:'Food & Bev',        city:'Sydney',    date:'Jun 2026', rev:19340, units:716,  cx:1465, cxt:366, aov:53, major:false },
      ],
      nzl: [
        { name:'The Auckland Food Show',   cat:'Food & Bev',    city:'Auckland',    date:'Apr 2026', rev:19800, units:733, cx:1369, cxt:342, aov:58, major:false },
        { name:'The Wellington Food Show', cat:'Food & Bev',    city:'Wellington',  date:'May 2026', rev:16650, units:617, cx:1224, cxt:306, aov:54, major:false },
        { name:'Auckland Home Show',       cat:'Home & Lifestyle',city:'Auckland',  date:'Jun 2026', rev:15300, units:567, cx:1162, cxt:290, aov:53, major:false },
      ]
    },
    'Best of the Bone': {
      aus: [
        { name:'Royal Easter Show',   cat:'Food & Bev', city:'Sydney',    date:'Apr 2025', rev:12400, units:198, cx:1480, cxt:185, aov:63, major:true  },
        { name:'Brisbane Ekka',       cat:'Food & Bev', city:'Brisbane',  date:'Aug 2025', rev:9800,  units:162, cx:1100, cxt:137, aov:60, major:true  },
        { name:'Melbourne Night Mkt', cat:'Food & Bev', city:'Melbourne', date:'Feb 2025', rev:4600,  units:88,  cx:540,  cxt:67,  aov:52, major:false },
      ],
      nzl: []
    }
  };

  // ── PIN UI ───────────────────────────────────────────────
  function updateDots(){
    for(var i=0;i<maxLen;i++){
      var d=document.getElementById('d'+i);
      if(d) d.className='dot'+(i<pin.length?' on':'');
    }
  }

  function doShake(){
    var dts=document.querySelector('.dots');
    if(!dts) return;
    dts.classList.remove('shake');
    void dts.offsetWidth;
    dts.classList.add('shake');
  }

  function tryPin(){
    var brand=PINS[pin];
    if(brand){
      document.getElementById('pin-gate').style.display='none';
      document.getElementById('app').classList.add('on');
      loadDashboard(brand);
    } else {
      var err=document.getElementById('pin-err');
      if(err) err.textContent='Incorrect PIN. Try again.';
      doShake();
      pin='';
      updateDots();
      setTimeout(function(){ if(err) err.textContent=''; },1800);
    }
  }

  function pressKey(k){
    var err=document.getElementById('pin-err');
    if(k==='Clear'){ pin=''; updateDots(); if(err) err.textContent=''; return; }
    if(k==='⌫'){ pin=pin.slice(0,-1); updateDots(); if(err) err.textContent=''; return; }
    if(pin.length>=maxLen) return;
    pin+=k;
    updateDots();
    if(pin.length===maxLen) setTimeout(tryPin,120);
  }

  document.querySelectorAll('.nb').forEach(function(btn){
    btn.addEventListener('click',function(){ pressKey(btn.textContent.trim()); });
  });

  document.addEventListener('keydown',function(e){
    if(document.getElementById('pin-gate').style.display==='none') return;
    if(e.key>='0'&&e.key<='9') pressKey(e.key);
    else if(e.key==='Backspace') pressKey('⌫');
    else if(e.key==='Escape') pressKey('Clear');
  });

  // ── DASHBOARD ────────────────────────────────────────────
  var barInst=null, donutInst=null;
  var currentBrand=null, currentRegion='aus';

  function fmt(n){ return n>=1000?'$'+(n/1000).toFixed(1)+'k':'$'+n; }
  function fmtFull(n){ return '$'+Math.round(n).toLocaleString(); }
  function fmtN(n){ return n>=1000?(n/1000).toFixed(1)+'k':String(Math.round(n)); }

  function loadDashboard(brand){
    currentBrand=brand;
    currentRegion='aus';
    var d=DATA[brand];
    var isDemo=(brand==='Best of the Bone');

    // Demo flag
    var flag=document.getElementById('demo-flag');
    if(flag) flag.style.display=isDemo?'inline-block':'none';

    // Subtitle
    setText('t-sub', brand+' · Rolling 12 months · Completed Shows');

    // Wire up region tabs
    document.querySelectorAll('.regtabs .rtab').forEach(function(btn){
      btn.classList.toggle('on', btn.textContent.trim()==='AUS');
      btn.addEventListener('click',function(){
        currentRegion=btn.textContent.trim().toLowerCase();
        document.querySelectorAll('.regtabs .rtab').forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on');
        renderRegion(DATA[currentBrand], currentRegion);
      });
    });

    // Wire event selector
    var sel=document.getElementById('evt');
    if(sel){
      sel.addEventListener('change',function(){
        var shows=d[currentRegion]||[];
        if(sel.value==='all'){ renderShows(shows); return; }
        var idx=parseInt(sel.value);
        renderShows([shows[idx]]);
      });
    }

    renderRegion(d, 'aus');
    showContent();
  }

  function renderRegion(d, region){
    var shows=(d[region]||[]).slice();
    buildEventFilter(shows);
    renderShows(shows);
  }

  function buildEventFilter(shows){
    var sel=document.getElementById('evt');
    if(!sel) return;
    sel.innerHTML='<option value="all">All shows</option>';
    shows.forEach(function(s,i){
      var o=document.createElement('option');
      o.value=String(i);
      o.textContent=s.name;
      sel.appendChild(o);
    });
  }

  function showContent(){
    document.getElementById('loading').style.display='none';
    var c=document.getElementById('content');
    c.style.display='flex';
  }

  function renderShows(shows){
    var rev=shows.reduce(function(a,s){ return a+s.rev; },0);
    var units=shows.reduce(function(a,s){ return a+s.units; },0);
    var cx=shows.reduce(function(a,s){ return a+s.cx; },0);
    var contacts=shows.reduce(function(a,s){ return a+s.cxt; },0);
    var aov=units>0?Math.round(rev/units):0;

    setText('k-rev', fmtFull(rev));
    setText('k-shows', shows.length+' completed show'+(shows.length!==1?'s':''));
    setText('k-units', fmtN(units));
    setText('k-aov', '$'+aov+' avg order value');
    setText('k-avg', fmt(shows.length?Math.round(rev/shows.length):0));
    setText('k-cx', fmtN(cx));
    setText('k-imp', fmtN(contacts));
    setText('k-email', fmtN(Math.round(contacts*0.8)));
    setText('k-retail', '$'+aov);
    setText('t-count', shows.length+' show'+(shows.length!==1?'s':''));

    renderBar(shows);
    renderDonut(shows);
    renderTable(shows);
    renderRoyal(shows);
  }

  function setText(id,val){
    var el=document.getElementById(id);
    if(el) el.textContent=val;
  }

  function renderBar(shows){
    var ctx=document.getElementById('barChart');
    if(!ctx) return;
    if(barInst){ barInst.destroy(); barInst=null; }
    barInst=new Chart(ctx,{
      type:'bar',
      data:{
        labels:shows.map(function(s){ return s.name.length>20?s.name.slice(0,20)+'…':s.name; }),
        datasets:[{ data:shows.map(function(s){ return s.rev; }), backgroundColor:'rgba(197,255,83,0.7)', borderColor:'#C5FF53', borderWidth:1, borderRadius:5 }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:function(c){ return ' $'+c.raw.toLocaleString(); } } } },
        scales:{
          x:{ ticks:{ color:'#6B6456', font:{ size:10 } }, grid:{ display:false } },
          y:{ ticks:{ color:'#6B6456', font:{ size:10 }, callback:function(v){ return '$'+(v>=1000?(v/1000).toFixed(0)+'k':v); } }, grid:{ color:'rgba(160,120,64,.1)' } }
        }
      }
    });
  }

  function renderDonut(shows){
    var ctx=document.getElementById('donutChart');
    if(!ctx) return;
    if(donutInst){ donutInst.destroy(); donutInst=null; }
    var cats={};
    shows.forEach(function(s){ cats[s.cat]=(cats[s.cat]||0)+s.rev; });
    var labels=Object.keys(cats), vals=labels.map(function(k){ return cats[k]; });
    var colours=['#C5FF53','#A07840','#6fcf97','#7B9EBB','#E05A5A','#F2994A'];
    donutInst=new Chart(ctx,{
      type:'doughnut',
      data:{ labels:labels, datasets:[{ data:vals, backgroundColor:colours.slice(0,labels.length), borderWidth:0 }] },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{ position:'bottom', labels:{ color:'#6B6456', font:{ size:10 }, boxWidth:10 } },
          tooltip:{ callbacks:{ label:function(c){ return ' $'+c.raw.toLocaleString(); } } }
        }
      }
    });
  }

  function renderTable(shows){
    var tbody=document.getElementById('tbody');
    if(!tbody) return;
    tbody.innerHTML='';
    shows.forEach(function(s){
      var flowVal=s.cxt&&s.cx ? Math.round(s.cxt/s.cx*100)+'%' : '—';
      var tr=document.createElement('tr');
      tr.innerHTML='<td>'+s.name+'</td>'
        +'<td><span class="cat-pill">'+s.cat+'</span></td>'
        +'<td>'+s.city+'</td>'
        +'<td>'+s.date+'</td>'
        +'<td style="color:var(--lime)">$'+s.rev.toLocaleString()+'</td>'
        +'<td>'+s.units.toLocaleString()+'</td>'
        +'<td>'+fmtN(s.cx)+'</td>'
        +'<td>'+flowVal+'</td>';
      tbody.appendChild(tr);
    });
  }

  function renderRoyal(shows){
    var major=shows.filter(function(s){ return s.major; }).slice().sort(function(a,b){ return b.rev-a.rev; });
    var sec=document.getElementById('royal-sec');
    if(!sec) return;
    if(!major.length){ sec.style.display='none'; return; }
    sec.style.display='flex';
    var grid=document.getElementById('royal-grid');
    if(!grid) return;
    grid.innerHTML=major.map(function(s){
      return '<div class="rshow">'
        +'<div><div class="rshow-name">'+s.name+'</div><div class="rshow-meta">'+s.city+' &middot; '+s.date+'</div></div>'
        +'<div class="rshow-rev">$'+s.rev.toLocaleString()+'</div>'
        +'<div class="rshow-stats"><span><b>'+s.units.toLocaleString()+'</b> units</span><span><b>$'+s.aov+'</b> AOV</span><span><b>'+fmtN(s.cx)+'</b> CX</span><span><b>'+fmtN(s.cxt)+'</b> contacts</span></div>'
        +'</div>';
    }).join('');
  }

})();
      `}} />
    </>
  )
}
