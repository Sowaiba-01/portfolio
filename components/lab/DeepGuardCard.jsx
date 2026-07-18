'use client';
import { useRef, useState } from 'react';

const API = 'https://sowaiba01-deepguard-backend.hf.space';
const SPACE = 'https://huggingface.co/spaces/Sowaiba01/deepguard-backend';
const DS = 'https://huggingface.co/datasets/Sowaiba01/Deepfake/resolve/main/';

const SAMPLES = [
  { label: 'real #1', path: 'real/real_00000.jpg' },
  { label: 'real #2', path: 'real/real_00001.jpg' },
  { label: 'fake #1', path: 'fake/fake_00000.jpg' },
  { label: 'fake #2', path: 'fake/fake_00001.jpg' },
];

const num = (...v) => v.find((x) => typeof x === 'number');
const str = (...v) => v.find((x) => typeof x === 'string');

// find a base64 image anywhere in the response, whatever the key is called
function huntGradcam(v, found = { cam: null }) {
  if (found.cam) return found.cam;
  if (typeof v === 'string' && v.length > 500 && (/^data:image/.test(v) || /^[A-Za-z0-9+/=\s]+$/.test(v.slice(0, 120)))) {
    found.cam = v;
  } else if (v && typeof v === 'object') {
    Object.values(v).forEach((x) => huntGradcam(x, found));
  }
  return found.cam;
}

function SampleTile({ s, onPick }) {
  const [dead, setDead] = useState(false);
  if (dead) return null;
  return (
    <button className="sample" aria-label={'Run detection on a sample: ' + s.label} onClick={() => onPick(DS + s.path)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={DS + s.path} alt="" loading="lazy" onError={() => setDead(true)} />
      <span>{s.label}</span>
    </button>
  );
}

export default function DeepGuardCard() {
  const [phase, setPhase] = useState('waker');
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null); // {isFake, pc, method, regions, cam, inputUrl, meta}
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
          if ((h.status || '').toLowerCase() === 'healthy') {
            const det = h.models && h.models.detector ? h.models.detector : 'loaded';
            setStatus({ kind: 'g', text: `● model online · detector ${det} · woke in ${((Date.now() - t0) / 1000).toFixed(0)}s` });
            return;
          }
        }
      } catch (e) { /* still waking */ }
      await new Promise((res) => setTimeout(res, 4000));
    }
    setStatus({ kind: 'r', text: '● could not reach the model.', link: { href: SPACE, label: 'try it on hugging face ↗' } });
  }

  async function analyze(file) {
    if (busy.current) return;
    busy.current = true;
    setResult(null);
    setStatus({ kind: 'a', text: '● running detection…' });
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('gradcam', 'true');
      const r = await fetch(API + '/detect', { method: 'POST', body: fd });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      let isFake = null;
      const s = str(d.label, d.verdict, d.prediction);
      if (s) { if (/fake/i.test(s)) isFake = true; else if (/real/i.test(s)) isFake = false; }
      if (isFake === null && typeof d.is_deepfake === 'boolean') isFake = d.is_deepfake;
      const conf = num(d.confidence, d.fake_probability, d.probability, d.score);
      const pc = conf !== undefined ? (conf <= 1 ? conf * 100 : conf) : null;
      const cam = huntGradcam(d);
      const ms = num(d.latency_ms, d.inference_time_ms, d.time_ms);
      setResult({
        isFake,
        pc,
        method: isFake && d.method_detected ? d.method_detected : null,
        regions: Array.isArray(d.regions) ? d.regions : [],
        cam: cam ? (cam.startsWith('data:') ? cam : 'data:image/png;base64,' + cam) : null,
        inputUrl: URL.createObjectURL(file),
        meta: (d.model ? d.model + ' · ' : 'EfficientNet-B4 · ') + (ms !== undefined ? `inference ${ms.toFixed(0)}ms · ` : '') + 'for demo purposes only',
      });
      setStatus({ kind: 'g', text: '● detection complete · drop another image to run again' });
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
      analyze(new File([blob], 'sample.jpg', { type: blob.type || 'image/jpeg' }));
    } catch (e) {
      setStatus({ kind: 'r', text: '● sample unavailable, drop your own image instead' });
    }
  }

  return (
    <>
      <div className="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>deepguard — live model · hugging face space</span></div>
      <div className="inner">
        <h3>DeepGuard, catching fakes for real</h3>
        <div className="stage">
          {phase === 'waker' && (
            <div className="waker">
              <p>This is my deployed deepfake detector: a fine-tuned EfficientNet-B4 decides whether a face photo is real or AI-manipulated, and a GradCAM heatmap shows where it looked. Free-tier Spaces sleep when idle, so waking can take up to a minute.</p>
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
                  drop a face photo here or <b>click to choose a file</b><br />
                  <span style={{ fontSize: 11, color: 'var(--dim)' }}>PNG / JPEG · for demo purposes only</span>
                </div>
                <div className="samples">
                  <div className="lbl">NO PHOTO? TRY MY DATASET</div>
                  <div className="srow">
                    {SAMPLES.map((s) => <SampleTile key={s.path} s={s} onPick={pickSample} />)}
                  </div>
                  <div className="note">real and fake faces from my Deepfake dataset on hugging face · one click runs the model</div>
                </div>
              </div>
              <input type="file" ref={fileRef} accept="image/png,image/jpeg" style={{ display: 'none' }}
                aria-label="Upload a face photo"
                onChange={(e) => { if (e.target.files[0]) analyze(e.target.files[0]); }} />
              {result && (
                <div className="dg-results" style={{ display: 'grid' }}>
                  <div className="dg-left">
                    <div className={'dg-verdict ' + (result.isFake === null ? '' : result.isFake ? 'fake' : 'real')}>
                      {result.isFake === null ? 'inconclusive result' : result.isFake ? 'FAKE — manipulation detected' : 'REAL — no manipulation found'}
                    </div>
                    {result.pc !== null && (
                      <div className="dg-conf">
                        <div className="lbl">model confidence · {result.pc.toFixed(1)}%</div>
                        <div className="ag-bar"><i style={{ width: Math.min(100, result.pc) + '%' }} /></div>
                      </div>
                    )}
                    <div className="dg-extra">
                      {result.method && <div className="dg-kv"><span>method detected</span><b>{result.method}</b></div>}
                      {result.regions.length > 0 && (
                        <>
                          <div className="dg-kv"><span>model attention regions</span></div>
                          <div className="dg-chips">{result.regions.map((g) => <i key={g}>{g}</i>)}</div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="dg-cams">
                    <figure>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={result.inputUrl} alt="your image" />
                      <figcaption>your image</figcaption>
                    </figure>
                    {result.cam && (
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={result.cam} alt="gradcam heatmap" />
                        <figcaption>gradcam — how the detection worked</figcaption>
                      </figure>
                    )}
                  </div>
                </div>
              )}
              {result && <div className="chest-meta">{result.meta}</div>}
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
