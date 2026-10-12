"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const CONVERSATIONS = [
  { id: "bold", name: "Bold House Agency", initials: "BH", gradient: "var(--c2),var(--c5)", time: "2m", preview: "Sending over the brief now", unread: false },
  { id: "saf", name: "Safaricom Brand Team", initials: "ST", gradient: "var(--c3),var(--c4)", time: "1h", preview: "Could you share your rate card?", unread: true },
  { id: "naomi", name: "Naomi Wairimu", initials: "NW", gradient: "var(--c1),var(--c3)", time: "3h", preview: "Thanks for the follow! Love your stuff", unread: true },
  { id: "david", name: "David Mwangi", initials: "DM", gradient: "var(--c3),var(--c4)", time: "1d", preview: "You: let’s line up the shoot dates", unread: false },
  { id: "vuka", name: "Vuka Coffee", initials: "VC", gradient: "var(--c2),var(--c1)", time: "2d", preview: "Loved the samples — let’s talk packaging", unread: false },
];

const DocIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>;
const SendIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>;

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState("bold");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);
  const { profile } = useAuth();
  const userName = profile?.display_name || "User";

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages([...messages, { dir: "out", text, time: "Just now" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { dir: "in", text: "Sounds good — let me confirm and send the brief over.", time: "Just now" }]);
    }, 1400);
  }

  return (
    <div className="msg-layout">
      <div className="conv-list">
        <div className="conv-list-head">Messages</div>
        {CONVERSATIONS.map((c) => (
          <div key={c.id} className={`conv${activeConv === c.id ? " active" : ""}${c.unread && activeConv !== c.id ? " conv-unread" : ""}`} onClick={() => setActiveConv(c.id)}>
            <span className="av av-md" style={{ background: `linear-gradient(135deg,${c.gradient})` }}>{c.initials}</span>
            <div className="conv-main">
              <div className="conv-top"><span className="conv-name">{c.name}</span><span className="conv-time">{c.time}</span></div>
              <div className="conv-preview">{c.preview}</div>
            </div>
            {c.unread && activeConv !== c.id && <span className="conv-badge"></span>}
          </div>
        ))}
      </div>

      <div className="thread">
        <div className="thread-head">
          <span className="av av-md" style={{ background: "linear-gradient(135deg,var(--c2),var(--c5))" }}>BH</span>
          <div className="th-info">
            <div className="th-name">Bold House Agency <span className="verified-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></div>
            <div className="th-status">Typically replies within an hour</div>
          </div>
          <div className="th-actions">
            <Link href="/contracts" className="pill-btn pill-ghost"><DocIcon /> View contract</Link>
          </div>
        </div>

        <div className="thread-body" ref={bodyRef}>
          <div className="day-sep">Today</div>
          <div className="bubble in">Hi {userName} — saw your editorial set on the feed, the colour work is excellent.<span className="bubble-time">10:02</span></div>
          <div className="bubble in">We&apos;re running a campaign for a coffee brand and need a set of illustrations. Are you taking work this month?<span className="bubble-time">10:02</span></div>
          <div className="bubble out">Thanks, appreciate that! Yes — I&apos;ve got capacity from next week. What&apos;s the scope and timeline?<span className="bubble-time">10:15</span></div>
          <div className="bubble in">4 hero illustrations for social + 1 banner. We&apos;d need final files within 3 weeks.<span className="bubble-time">10:18</span></div>
          <div className="bubble out">Got it. For that scope my rate is KES 60,000, milestoned across concept, drafts and finals. I&apos;ll send a breakdown.<span className="bubble-time">10:21</span></div>
          <div className="bubble in">That works for us. Sending over the brief now<span className="bubble-time">10:22</span></div>

          <div className="brief-bubble">
            <div className="bb-head"><span className="bb-icon"><DocIcon /></span> Project brief</div>
            <div className="bb-body">
              <div className="bb-row"><span>Project</span><b>Vuka Coffee — campaign illustrations</b></div>
              <div className="bb-row"><span>Deliverables</span><b>4 illustrations + 1 banner</b></div>
              <div className="bb-row"><span>Budget</span><b>KES 60,000</b></div>
              <div className="bb-row"><span>Timeline</span><b>3 weeks</b></div>
            </div>
            <div className="bb-foot">
              <Link href="/contracts" className="pill-btn pill-primary" style={{ flex: 1, justifyContent: "center" }}>Review &amp; accept</Link>
              <button className="pill-btn pill-ghost">Counter</button>
            </div>
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.dir}`}>{m.text}<span className="bubble-time">{m.time}</span></div>
          ))}
        </div>

        <form className="thread-compose" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input type="text" placeholder="Write a message…" value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="button" className="send-btn" aria-label="Send" onClick={sendMessage}><SendIcon /></button>
        </form>
      </div>
    </div>
  );
}
