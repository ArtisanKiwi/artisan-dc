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
            <span className="demo-flag">Sample data</span>
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
                <div className="kpi-sub">Total customer touchpoints</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Impressions</div>
                <div className="kpi-val" id="k-imp">—</div>
                <div className="kpi-sub">Est. foot traffic engaged</div>
              </div>
              <div className="kpi">
                <div className="kpi-lbl">Emails Collected</div>
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
  // ── CONFIG ────────────────────────────────────────────────
  var PINS = { '2580': 'Artisan Co', '1234': 'Demo Brand', '2468': 'Best of the Bone' };
  var pin = '', maxLen = 4;

  // sample data keyed by brand
  var DATA = {
    'Artisan Co': {
      shows: [
        { name:'Royal Easter Show',  cat:'Food & Bev', city:'Sydney',    date:'Apr 2025', rev:18400, units:312, cx:2100, flow:.18, major:true,  report:null },
        { name:'Brisbane Ekka',      cat:'Food & Bev', city:'Brisbane',  date:'Aug 2025', rev:14200, units:244, cx:1650, flow:.15, major:true,  report:null },
        { name:'Hobart Harvest Mkt', cat:'Food & Bev', city:'Hobart',    date:'Mar 2025', rev:6800,  units:140, cx:820,  flow:.17, major:false, report:null },
        { name:'Melbourne Night Mkt',cat:'Food & Bev', city:'Melbourne', date:'Feb 2025', rev:5200,  units:110, cx:610,  flow:.18, major:false, report:null },
        { name:'Adelaide Central',   cat:'Food & Bev', city:'Adelaide',  date:'Jan 2025', rev:4100,  units:88,  cx:480,  flow:.18, major:false, report:null },
      ],
      impressions: 64000,
      emails: 1240,
    },
    'Best of the Bone': {
      shows: [
        { name:'Royal Easter Show',  cat:'Food & Bev', city:'Sydney',    date:'Apr 2025', rev:12400, units:198, cx:1480, flow:.13, major:true,  report:null },
        { name:'Brisbane Ekka',      cat:'Food & Bev', city:'Brisbane',  date:'Aug 2025', rev:9800,  units:162, cx:1100, flow:.15, major:true,  report:null },
        { name:'Melbourne Night Mkt',cat:'Food & Bev', city:'Melbourne', date:'Feb 2025', rev:4600,  units:88,  cx:540,  flow:.16, major:false, report:null },
      ],
      impressions: 38000,
      emails: 740,
    }
  };

  // ── PIN UI ────────────────────────────────────────────────
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
      var app=document.getElementById('app');
      app.classList.add('on');
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

  function fmt(n){ return n>=1000?'$'+(n/1000).toFixed(1)+'k':'$'+n; }
  function fmtN(n){ return n>=1000?(n/1000).toFixed(1)+'k':String(n); }
  function pct(v){ return Math.round(v*100)+'%'; }

  function loadDashboard(brand){
    var sub=document.getElementById('t-sub');
    if(sub) sub.textContent=brand+' · Completed Shows';
    var d=DATA[brand];
    if(!d){ showContent(); return; }

    // populate event selector
    var sel=document.getElementById('evt');
    if(sel){
      sel.innerHTML='<option value="all">All shows</option>';
      d.shows.forEach(function(s,i){
        var o=document.createElement('option');
        o.value=String(i);
        o.textContent=s.name;
        sel.appendChild(o);
      });
      sel.addEventListener('change',function(){ renderShows(d, sel.value==='all'?d.shows:[d.shows[parseInt(sel.value)]]); });
    }

    renderShows(d, d.shows);
    showContent();
  }

  function showContent(){
    document.getElementById('loading').style.display='none';
    var c=document.getElementById('content');
    c.style.display='flex';
  }

  function renderShows(d, shows){
    var rev=shows.reduce(function(a,s){ return a+s.rev; },0);
    var units=shows.reduce(function(a,s){ return a+s.units; },0);
    var cx=shows.reduce(function(a,s){ return a+s.cx; },0);
    var aov=units>0?Math.round(rev/units):0;

    setText('k-rev', fmt(rev));
    setText('k-shows', shows.length+' completed show'+(shows.length!==1?'s':''));
    setText('k-units', fmtN(units));
    setText('k-aov', '$'+aov+' avg order value');
    setText('k-avg', fmt(shows.length?Math.round(rev/shows.length):0));
    setText('k-cx', fmtN(cx));
    setText('k-imp', fmtN(d.impressions));
    setText('k-email', fmtN(d.emails));
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
        labels:shows.map(function(s){ return s.name.length>18?s.name.slice(0,18)+'…':s.name; }),
        datasets:[{ data:shows.map(function(s){ return s.rev; }), backgroundColor:'rgba(197,255,83,0.7)', borderColor:'#C5FF53', borderWidth:1, borderRadius:5 }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:function(c){ return ' $'+c.raw.toLocaleString(); } } } },
        scales:{
          x:{ ticks:{ color:'#6B6456', font:{ size:10 } }, grid:{ display:false } },
          y:{ ticks:{ color:'#6B6456', font:{ size:10 }, callback:function(v){ return '$'+(v>=1000?v/1000+'k':v); } }, grid:{ color:'rgba(160,120,64,.1)' } }
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
    var colours=['#C5FF53','#A07840','#6fcf97','#7B9EBB','#E05A5A'];
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
      var tr=document.createElement('tr');
      tr.innerHTML='<td>'+s.name+'</td>'
        +'<td><span class="cat-pill">'+s.cat+'</span></td>'
        +'<td>'+s.city+'</td>'
        +'<td>'+s.date+'</td>'
        +'<td class="accent" style="color:var(--lime)">$'+s.rev.toLocaleString()+'</td>'
        +'<td>'+s.units+'</td>'
        +'<td>'+fmtN(s.cx)+'</td>'
        +'<td>'+pct(s.flow)+'</td>';
      tbody.appendChild(tr);
    });
  }

  function renderRoyal(shows){
    var major=shows.filter(function(s){ return s.major; });
    var sec=document.getElementById('royal-sec');
    if(!sec) return;
    if(!major.length){ sec.style.display='none'; return; }
    sec.style.display='flex';
    var grid=document.getElementById('royal-grid');
    if(!grid) return;
    grid.innerHTML='';
    major.forEach(function(s){
      var div=document.createElement('div');
      div.className='rshow';
      div.innerHTML='<div class="rshow-name">'+s.name+'</div>'
        +'<div class="rshow-meta">'+s.city+' · '+s.date+'</div>'
        +'<div class="rshow-rev">$'+s.rev.toLocaleString()+'</div>'
        +'<div class="rshow-stats"><span>Units: <b>'+s.units+'</b></span><span>CX: <b>'+fmtN(s.cx)+'</b></span><span>Flow: <b>'+pct(s.flow)+'</b></span></div>';
      grid.appendChild(div);
    });
  }

  // Simulate load
  setTimeout(function(){
    if(document.getElementById('pin-gate').style.display==='none'){
      showContent();
    }
  }, 400);

})();
      `}} />
    </>
  )
}
