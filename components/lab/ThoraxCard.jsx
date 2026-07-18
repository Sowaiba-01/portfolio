'use client';
import { useRef, useState } from 'react';

const API = 'https://sowaiba01-thoraxnet.hf.space';
const SPACE = 'https://huggingface.co/spaces/Sowaiba01/ThoraxNet';

const SAMPLES = [
  { srcs: [
    { label: 'NIH sample', url: 'https://raw.githubusercontent.com/mlmed/torchxrayvision/master/tests/00000001_000.png' },
    { label: 'normal PA', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chest_Xray_PA_3-8-2010.png?width=512' },
  ] },
  { srcs: [
    { label: 'pneumonia', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/X-ray_of_lobar_pneumonia.jpg?width=512' },
    { label: 'NIH sample', url: 'https://raw.githubusercontent.com/mlmed/torchxrayvision/master/tests/00000013_005.png' },
  ] },
  { srcs: [
    { label: 'effusion', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/PleuralEffusionImageB.jpg?width=512' },
    { label: 'chest X-ray', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chest_X-ray.jpg?width=512' },
  ] },
];

function SampleTile({ srcs, onPick }) {
  const [k, setK] = useState(0);
  const [dead, setDead] = useState(false);
  if (dead) return null;
  const cur = srcs[k];
  return (
    <button className="sample" aria-label={'Run the model on a sample: ' + cur.label}
      onClick={() => onPick(cur.url)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cur.url} alt="" loading="lazy"
        onError={() => { if (k + 1 < srcs.length) setK(k + 1); else setDead(true); }} />
      <span>{cur.label}</span>
    </button>
  );
}

function Report({ text }) {
  const lines = text.split('\n');
  return (
    <div className="report">
      {lines.map((ln, i) => {
        const m = ln.match(/^(FINDINGS|IMPRESSION|RECOMMENDATIONS?):/);
        if (m) return <span className="rh" key={i}>{m[1]}</span>;
        return <span key={i}>{ln + '\n'}</span>;
      })}
    </div>
  );
}

export default function ThoraxCard() {
  const [phase, setPhase] = useState('waker');
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [over, setOver] = useState(false);
  const busy = useRef(false);
  const fileRef = useRef(null);

  async function wake() {
    setPhase('app');
    setStatus({ kind: 'a', text: '● waking the model… first start can take up to a minute' });
    const t0 = Date.now();
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch(API + '/health');
        if (r.ok) {
          const h = await r.json();
          if (h.model_loaded) {
            setStatus({ kind: 'g', text: `● model online · device: ${h.device} · v${h.version} · woke in ${((Date.now() - t0) / 1000).toFixed(0)}s` });
            return;
          }
        }
      } catch (e) { /* still waking or CORS */ }
      await new Promise((res) => setTimeout(res, 4000));
    }
    setStatus({ kind: 'r', text: '● could not reach the model.', link: { href: SPACE, label: 'try it on hugging face ↗' } });
  }

  async function analyze(file) {
    if (busy.current) return;
    busy.current = true;
    setData(null);
    setShowAll(false);
    setStatus({ kind: 'a', text: '● analyzing X-ray…' });
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r = await fetch(API + '/api/v1/predict', { method: 'POST', body: fd });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setData(d);
      setStatus({ kind: 'g', text: '● analysis complete · drop another image to run again' });
    } catch (err) {
      setStatus({ kind: 'r', text: '● request failed (' + err.message + ').', link: { href: SPACE, label: 'run it on hugging face instead ↗' } });
    }
    busy.current = false;
  }

  async function pickSample(url) {
    if (busy.current) return;
    setStatus({ kind: 'a', text: '● fetching sample…' });
    try {
      const r = await fetch(url);
      const blob = await r.blob();
      analyze(new File([blob], 'sample.png', { type: blob.type || 'image/png' }));
    } catch (e) {
      setStatus({ kind: 'r', text: '● sample unavailable, drop your own image instead' });
    }
  }

  const fs = data ? [...data.findings].sort((a, b) => b.probability - a.probability) : [];
  const present = fs.filter((f) => f.present);
  const rest = fs.filter((f) => !f.present);
  const Row = ({ f }) => (
    <div className={'f-row' + (f.present ? ' present' : '')}>
      <div className="f-top">
        <span className={'nm' + (f.present ? ' present' : '')}>{f.name.replace(/_/g, ' ')}{f.present ? ' ✓' : ''}</span>
        <span className="pu">{(f.probability * 100).toFixed(1)}% <span className={f.high_uncertainty ? 'hi' : ''}>±{f.uncertainty.toFixed(2)}</span></span>
      </div>
      <div className="f-bar"><i style={{ width: (f.probability * 100).toFixed(1) + '%' }} /></div>
    </div>
  );

  return (
    <>
      <div className="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>thoraxnet — live model · hugging face space</span></div>
      <div className="inner">
        <h3>ThoraxNet, running for real</h3>
        <div className="stage">
          {phase === 'waker' && (
            <div className="waker">
              <p>This is my actual deployed model: upload a chest X-ray and it returns probabilities for 14 pathologies with MC-Dropout uncertainty and an auto-generated radiology report. Free-tier Spaces sleep when idle, so waking can take up to a minute.</p>
              <button className="btn solid" onClick={wake}>▶ wake up the model</button>
            </div>
          )}
          {phase === 'app' && (
            <div>
              {status && (
                <div className="chest-status">
                  <span className={status.kind}>{status.text}</span>{' '}
                  {status.link && <a href={status.link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--violet)' }}>{status.link.label}</a>}
                </div>
              )}
              <div className="chest-input">
                <div className={'dropzone' + (over ? ' over' : '')}
                  onClick={() => fileRef.current.click()}
                  onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                  onDragLeave={() => setOver(false)}
                  onDrop={(e) => { e.preventDefault(); setOver(false); if (e.dataTransfer.files[0]) analyze(e.dataTransfer.files[0]); }}>
                  drop a chest X-ray here or <b>click to choose a file</b><br />
                  <span style={{ fontSize: 11, color: 'var(--dim)' }}>PNG / JPEG · for demo purposes only, not medical advice</span>
                </div>
                <div className="samples">
                  <div className="lbl">NO X-RAY? TRY A SAMPLE</div>
                  <div className="srow">
                    {SAMPLES.map((s, i) => <SampleTile key={i} srcs={s.srcs} onPick={pickSample} />)}
                  </div>
                  <div className="note">NIH ChestX-ray14 and public domain images · one click runs the model</div>
                </div>
              </div>
              <input type="file" ref={fileRef} accept="image/png,image/jpeg" style={{ display: 'none' }}
                aria-label="Upload chest X-ray image"
                onChange={(e) => { if (e.target.files[0]) analyze(e.target.files[0]); }} />
              {data && (
                <div className="chest-results" style={{ display: 'grid' }}>
                  <div>
                    <div className="findings">
                      <div className="f-sec g">DETECTED FINDINGS ({present.length})</div>
                      {present.length
                        ? present.map((f) => <Row f={f} key={f.name} />)
                        : <div className="f-none">no pathologies above threshold</div>}
                      <button className="f-toggle" onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'hide other classes ▴' : `show all ${fs.length} classes ▾`}
                      </button>
                      <div className={'f-rest' + (showAll ? ' open' : '')}>
                        <div className="f-sec">OTHER CLASSES · below threshold</div>
                        {rest.map((f) => <Row f={f} key={f.name} />)}
                      </div>
                    </div>
                  </div>
                  <div><Report text={data.report} /></div>
                </div>
              )}
              {data && (
                <div className="chest-meta">
                  entropy {data.entropy.toFixed(2)} · inference {data.inference_time_ms.toFixed(0)}ms · model v{data.model_version}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="foot-note">
          <span>inference runs on my Hugging Face Space, not in your browser</span>
          <a href={SPACE} target="_blank" rel="noopener noreferrer">open on hugging face ↗</a>
        </div>
      </div>
    </>
  );
}
