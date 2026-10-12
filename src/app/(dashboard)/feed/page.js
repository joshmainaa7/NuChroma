"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

function HeartIcon({ filled }) {
  return filled
    ? <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>;
}
function BookmarkIcon({ filled }) {
  return filled
    ? <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
}
const CommentIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>;
const ShareIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4M12 2v13"/></svg>;

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const POSTS = [
  {
    id: 1, name: "Eva Njeri", initials: "EN", sub: "Motion director · Nairobi · 3h",
    gradient: "var(--c1),var(--c5)", pro: true, ring: true,
    title: "Sol Generation — title sequence",
    caption: "Opening titles for the new season. Hand-drawn frames comped over 3D type. Sound by @mauimusic",
    thumb: "pm-b", video: true,
    likes: 248, comments: 31, saves: 64, liked: false, saved: false,
    commentList: [{ name: "Brian Otieno", initials: "BO", gradient: "var(--c4),var(--c3)", text: "the type at 0:04 is insane how long did the comp take?" }],
  },
  {
    id: 2, name: "Brian Otieno", initials: "BO", sub: "Photographer · Kisumu · 7h",
    gradient: "var(--c4),var(--c3)",
    title: "Nairobi After Dark",
    caption: "A long-exposure series shot around the CBD between midnight and 4am. Full set of 18 on my profile.",
    thumb: "pm-d",
    likes: 512, comments: 47, saves: 120, liked: true, saved: false,
  },
  {
    id: 3, name: "Wanjiru Kamau", initials: "WK", sub: "3D artist · Nakuru · 1d",
    gradient: "var(--c2),var(--c1)", following: true,
    title: "Ceramic Studies, Vol. 2",
    caption: "Procedural glaze tests in Blender. Swipe for the clay render. Open to commissions this month.",
    thumb: "pm-e",
    likes: 173, comments: 12, saves: 89, liked: false, saved: true,
  },
];

function Post({ post, userInitials }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likes, setLikes] = useState(post.likes);
  const [saves, setSaves] = useState(post.saves);
  const [following, setFollowing] = useState(post.following || false);
  const [comments, setComments] = useState(post.commentList || []);
  const [commentText, setCommentText] = useState("");
  const { profile } = useAuth();

  function toggleLike() {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  }
  function toggleSave() {
    setSaved(!saved);
    setSaves(saved ? saves - 1 : saves + 1);
  }
  function addComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, {
      name: profile?.display_name || "You",
      initials: userInitials,
      gradient: "var(--c4),var(--c1)",
      text: commentText.trim(),
    }]);
    setCommentText("");
  }

  return (
    <article className="post">
      <div className="post-head">
        {post.ring ? (
          <span className="av-ring"><span className="av av-md" style={{ background: `linear-gradient(135deg,${post.gradient})` }}>{post.initials}</span></span>
        ) : (
          <span className="av av-md" style={{ background: `linear-gradient(135deg,${post.gradient})` }}>{post.initials}</span>
        )}
        <div className="post-who">
          <div className="post-name">
            {post.name}
            {post.pro && <> <span className="verified-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> <span className="pro-tag">Pro</span></>}
          </div>
          <div className="post-sub">{post.sub}</div>
        </div>
        <button className={`post-follow${following ? " following" : ""}`} onClick={() => setFollowing(!following)}>
          {following ? "Following" : "Follow"}
        </button>
      </div>
      <div className="post-caption">
        <span className="proj-title">{post.title}</span>{" "}{post.caption}
      </div>
      <div className={`post-media${post.video ? " work-card--video" : ""}`}>
        <div className={`work-thumb ${post.thumb}`}></div>
      </div>
      <div className="post-actions">
        <button className={`act-btn like-btn${liked ? " liked" : ""}`} onClick={toggleLike}><HeartIcon filled={liked} /> <span className="count">{likes.toLocaleString()}</span></button>
        <button className="act-btn comment-jump"><CommentIcon /> {post.comments}</button>
        <button className={`act-btn save-btn${saved ? " saved" : ""}`} onClick={toggleSave}><BookmarkIcon filled={saved} /> <span className="count">{saves.toLocaleString()}</span></button>
        <button className="act-btn share-btn"><ShareIcon /></button>
      </div>
      <div className="post-comments">
        {comments.map((c, i) => (
          <div key={i} className="comment">
            <span className="av av-sm" style={{ background: `linear-gradient(135deg,${c.gradient})` }}>{c.initials}</span>
            <div className="comment-body"><b>{c.name}</b> {c.text}</div>
          </div>
        ))}
        <form className="comment-form" onSubmit={addComment}>
          <span className="av av-sm" style={{ background: "linear-gradient(135deg,var(--c4),var(--c1))" }}>{userInitials}</span>
          <input type="text" placeholder="Add a comment…" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <button type="submit">Post</button>
        </form>
      </div>
    </article>
  );
}

export default function FeedPage() {
  const { profile } = useAuth();
  const initials = (profile?.display_name || "")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

  const activeUsers = [
    { initials: "EN", name: "Eva", gradient: "var(--c1),var(--c5)", ring: true },
    { initials: "BO", name: "Brian", gradient: "var(--c4),var(--c3)" },
    { initials: "WK", name: "Wanjiru", gradient: "var(--c2),var(--c1)" },
    { initials: "DM", name: "David", gradient: "var(--c3),var(--c4)" },
    { initials: "AH", name: "Aisha", gradient: "var(--c5),var(--c2)" },
    { initials: "KO", name: "Kevin", gradient: "var(--c4),var(--c5)" },
  ];

  return (
    <div className="feed-layout">
      <div className="feed-main">
        <div className="composer">
          <span className="av av-md" style={{ background: "linear-gradient(135deg,var(--c4),var(--c1))" }}>{initials}</span>
          <div className="composer-fake">Share your latest work...</div>
          <button className="pill-btn pill-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg> Post
          </button>
        </div>

        <div className="active-strip">
          {activeUsers.map((u) => (
            <div key={u.initials} className="active-person">
              {u.ring ? (
                <span className="av-ring"><span className="av av-md" style={{ background: `linear-gradient(135deg,${u.gradient})` }}>{u.initials}</span></span>
              ) : (
                <span className="av av-md" style={{ background: `linear-gradient(135deg,${u.gradient})` }}>{u.initials}</span>
              )}
              <span>{u.name}</span>
            </div>
          ))}
        </div>

        {POSTS.map((post) => (
          <Post key={post.id} post={post} userInitials={initials} />
        ))}
      </div>

      <aside className="feed-rail">
        <div className="rail-card">
          <h3>Briefs for you</h3>
          {[
            { title: "Product photography — 20 SKUs", client: "Naivas · Nairobi", budget: "KES 45,000" },
            { title: "Brand identity — coffee startup", client: "Vuka Coffee · Remote", budget: "KES 80,000" },
            { title: "Album cover — upcoming EP", client: "Blinky Bill · Nairobi", budget: "KES 25,000" },
          ].map((b) => (
            <div key={b.title} className="brief-mini">
              <h4>{b.title}</h4>
              <div className="bm-meta"><span>{b.client}</span><span className="bm-budget">{b.budget}</span></div>
              <button className="pill-btn pill-ghost" style={{ width: "100%", justifyContent: "center" }}>Apply</button>
            </div>
          ))}
          <Link href="/discover" className="rail-cta">Browse all briefs &rarr;</Link>
        </div>

        <div className="rail-card">
          <h3>Rising creatives</h3>
          {[
            { initials: "AH", name: "Aisha Hassan", sub: "Type designer · Mombasa", gradient: "var(--c5),var(--c2)" },
            { initials: "DM", name: "David Mwangi", sub: "Filmmaker · Nairobi", gradient: "var(--c3),var(--c4)" },
            { initials: "KO", name: "Kevin Ouma", sub: "Product designer · Eldoret", gradient: "var(--c4),var(--c5)" },
          ].map((s) => (
            <div key={s.initials} className="suggest">
              <span className="av av-md" style={{ background: `linear-gradient(135deg,${s.gradient})` }}>{s.initials}</span>
              <div className="suggest-info"><div className="suggest-name">{s.name}</div><div className="suggest-sub">{s.sub}</div></div>
              <button className="post-follow suggest-follow">Follow</button>
            </div>
          ))}
        </div>

        <div className="rail-card">
          <h3>Trending</h3>
          <div className="tag-cloud">
            {["#risograph","#matatuart","#blender","#afrofuturism","#typedesign","#filmphoto"].map((t) => (
              <a key={t} href="#">{t}</a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
