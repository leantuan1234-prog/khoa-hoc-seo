import { useState, useEffect, useRef } from "react";

const ORANGE = "#F97316";
const ORANGE_DARK = "#EA580C";
const ORANGE_LIGHT = "rgba(249,115,22,0.12)";
const DARK_BG = "#0a0a0c";
const DARK_CARD = "#141416";
const DARK_BORDER = "rgba(255,255,255,0.08)";
const BLUE = "#3B82F6";
const BLUE_DARK = "#2563EB";

const AnimatedNumber = ({ value, suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const num = parseInt(value.toString().replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dur = 1800, frames = Math.round(dur / 16.67);
    let f = 0;
    const id = setInterval(() => {
      f++;
      const p = f / frames;
      setDisplay(Math.round(num * (1 - Math.pow(2, -10 * p))));
      if (f >= frames) { setDisplay(num); clearInterval(id); }
    }, 16.67);
    return () => clearInterval(id);
  }, [visible, num]);

  return <span ref={ref} className="tabular-nums">{display.toLocaleString()}{suffix}</span>;
};

const SectionTag = ({ text }) => (
  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ color: ORANGE, borderColor: `${ORANGE}40`, background: ORANGE_LIGHT }}>{text}</span>
);

const CheckIcon = ({ color = ORANGE }) => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const MiniGraph = ({ data, color = ORANGE }) => {
  const max = Math.max(...data, 1);
  const norm = data.map(v => (v / max) * 32);
  const points = norm.map((v, i) => `${(i * 100) / (norm.length - 1)},${36 - v}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" className="w-full h-10 mt-2">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,38 ${points} 100,38`} fill={`${color}15`} stroke="none" />
    </svg>
  );
};

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const seoModules = [
    { n: "01", t: "Tổng quan SEO & Tư duy 2026", d: "SEO là gì, cách Google hoạt động, 4 trụ cột, E-E-A-T, tư duy SEO hiện đại" },
    { n: "02", t: "Tâm lý tìm kiếm & Hành vi người dùng", d: "Cách người dùng search, hành vi tìm kiếm, buyer persona, phân tích intent" },
    { n: "03", t: "Keyword Research (Lý thuyết + Thực hành)", d: "Search intent, short/long-tail, keyword mapping, topic cluster, tools thực chiến" },
    { n: "04", t: "SEO On-page", d: "Title, meta, heading, URL, internal linking, schema markup, SEO hình ảnh" },
    { n: "05", t: "Content SEO (Chiến lược & AI)", d: "Topical authority, pillar/cluster, content brief, dùng AI sản xuất content chất lượng" },
    { n: "06", t: "Technical SEO", d: "Crawl, index, Core Web Vitals, robots.txt, sitemap, canonical, redirect" },
    { n: "07", t: "Off-page & Link Building", d: "Backlink chất lượng vs số lượng, guest post, digital PR, chiến lược outreach" },
    { n: "08", t: "Phân tích dữ liệu & Báo cáo", d: "GSC, GA4, Ahrefs, Semrush. Đọc data, ra quyết định, báo cáo cho client/sếp" },
    { n: "09", t: "Bài tập cuối khoá", d: "Audit website thật + lập chiến lược SEO 6-12 tháng hoàn chỉnh" },
  ];

  const geoModules = [
    { n: "01", t: "Tổng quan GEO", d: "AI hoạt động thế nào, GEO vs SEO, KPIs, tương lai AI SEO" },
    { n: "02", t: "Technical GEO & llms.txt", d: "Quy trình & checklist, setup llms.txt, llms-full.txt, kiểm soát AI bots crawl" },
    { n: "03", t: "On-page GEO & E-E-A-T-A", d: "Internal link nâng cao, schema, tối ưu E-E-A-T-A cho AI" },
    { n: "04", t: "Nghiên cứu Prompt & Content GEO", d: "Xây danh sách prompt cho brand, cấu trúc bài viết thân thiện AI" },
    { n: "05", t: "Off-page GEO", d: "Organic/Owned/Earned media, UGOS (độc quyền), AI dataset" },
    { n: "06", t: "Đo lường & Tracking", d: "Citation rate, AI-referred traffic, đo lường visibility trên AI" },
  ];

  const packages = [
    {
      name: "SEO", sessions: "9 buổi", duration: "x 2h", price: "3.000.000đ", group: "2.250.000đ",
      color: ORANGE, colorLight: ORANGE_LIGHT, colorBorder: `${ORANGE}30`,
      items: ["Tư duy SEO 2026", "Keyword research & mapping", "On-page & schema", "Technical SEO & CWV", "Link building", "Tools & tracking", "Bài tập cuối khoá thực tế"],
    },
    {
      name: "COMBO", sessions: "15 buổi", duration: "x 2h", price: "6.000.000đ", group: "4.500.000đ",
      color: ORANGE, colorLight: ORANGE_LIGHT, colorBorder: `${ORANGE}40`,
      popular: true,
      items: ["Trọn bộ SEO (9 buổi)", "Trọn bộ GEO (6 buổi)", "Lộ trình hoàn chỉnh nhất", "Thực hành xuyên suốt", "Ưu tiên hỗ trợ sau khoá"],
    },
    {
      name: "GEO", sessions: "6 buổi", duration: "x 2h", price: "3.000.000đ", group: "2.250.000đ",
      color: BLUE, colorLight: "rgba(59,130,246,0.1)", colorBorder: "rgba(59,130,246,0.3)",
      items: ["AI Search & GEO overview", "Technical GEO & llms.txt", "On-page GEO & E-E-A-T-A", "Content GEO thân thiện AI", "Off-page GEO & UGOS", "Tracking & đo lường"],
    },
  ];

  const projects = [
    { name: "Supplements Brand", flag: "🇻🇳", role: "SEO Lead", period: "16 tháng", result: "0 → 25,000 clicks/tháng", sub: "1.2M impressions", color: ORANGE, growth: [2, 5, 8, 15, 22, 35, 48, 65, 82, 95, 110], img: "https://i.postimg.cc/yxbS68mG/Screenshot-24.png" },
    { name: "Plastic Surgery Clinic", flag: "🇦🇺", role: "SEO Lead", period: "6 tháng", result: "0 → 2,000+ clicks/tháng", sub: "200+ patient leads", color: BLUE, growth: [5, 6, 4, 8, 7, 6, 25, 28, 26, 30, 29, 35, 32, 38], img: "https://i.postimg.cc/KYwPqJmr/Screenshot_16.png" },
    { name: "Home Appliances", flag: "🇻🇳", role: "SEO Member", period: "6 tháng", result: "18K → 27K clicks/tháng", sub: "1,400 keywords Top 10", color: ORANGE, growth: [20, 22, 21, 25, 24, 28, 26, 30], img: "https://i.postimg.cc/jjmHgZR6/Screenshot_17.png" },
    { name: "Sportswears Site", flag: "🇻🇳", role: "SEO Member", period: "3 tháng", result: "113K → 164K clicks/tháng", sub: "2,691 keywords Top 3", color: BLUE, growth: [10, 12, 11, 15, 18, 22, 25, 28, 30, 32, 35], img: "https://i.postimg.cc/25MQc2C7/Screenshot_18.png" },
  ];

  const journey = [
    { year: "2025 - Nay", title: "SEO Service & Education", place: "Beauty & Aesthetic, VN Market" },
    { year: "2025", title: "Senior SEO Specialist", place: "Golden Owl Digital" },
    { year: "2023 - 2025", title: "SEO Executive", place: "SEO Băng Tâm" },
    { year: "Đầu 2023", title: "SEO Intern", place: "SEO Băng Tâm — bắt đầu từ đây" },
  ];

  const faqs = [
    { q: "Không biết gì về SEO có học được không?", a: "Hoàn toàn được. Khoá bắt đầu từ zero, đi từ tư duy đến thực hành. Không cần biết gì trước." },
    { q: "Học vào lúc nào? Có cần đúng giờ không?", a: "Học online 1:1 qua Google Meet, lịch thoả thuận theo tuần. Tối các ngày trong tuần, không cố định giờ cứng." },
    { q: "GEO là gì, có cần học không?", a: "GEO là tối ưu để xuất hiện trên ChatGPT, Perplexity, AI Overview. Xu hướng 2026, rất ít khoá dạy. Nếu muốn đi trước thị trường thì nên học." },
    { q: "Học nhóm có giảm giá không?", a: "Có. Từ 2 người trở lên giảm 25% học phí. Rủ bạn bè cùng học, chia nhau cost còn rẻ hơn nhiều." },
    { q: "Sau khoá có được hỗ trợ không?", a: "Có. Hỗ trợ qua Zalo trong suốt khoá và 30 ngày sau khi kết thúc. Bạn nhận đủ template và checklist để áp dụng ngay." },
  ];

  return (
    <div className="min-h-screen text-gray-100" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: DARK_BG }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-lg shadow-sm" : "bg-transparent"}`}
        style={scrolled ? { background: "rgba(10,10,12,0.92)", borderBottom: `1px solid ${DARK_BORDER}` } : {}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
            JUSTIN<span style={{ color: ORANGE }}>.SEO</span>
          </span>
          <a href="https://zalo.me/0968322059" target="_blank"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: ORANGE }}>
            Nhắn Zalo ngay
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 0%, ${ORANGE}08 0%, transparent 60%)` }} />
        <div className="max-w-6xl mx-auto px-6">
          <SectionTag text="Khoá học SEO & GEO 1:1 · 2026" />
          <h1 className="text-5xl md:text-6xl font-bold mt-5 leading-tight tracking-tight text-white" style={{ fontFamily: "Space Grotesk" }}>
            Học SEO thực chiến.<br />
            <span style={{ color: ORANGE }}>Có việc trong 3 tháng.</span>
          </h1>
          <p className="text-lg text-gray-400 mt-5 max-w-xl leading-relaxed">
            Học 1:1 online cùng người có 3+ năm kinh nghiệm thực chiến, tổng traffic quản lý 500,000+ lượt/tháng. Không học chay, chỉ thực hành trên website thật.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="https://zalo.me/0968322059" target="_blank"
              className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, boxShadow: `0 8px 30px ${ORANGE}30` }}>
              Nhắn Zalo tư vấn miễn phí
            </a>
            <a href="#pricing"
              className="px-8 py-3.5 rounded-xl font-semibold transition-all text-gray-300 hover:text-orange-400"
              style={{ border: `1px solid ${DARK_BORDER}` }}>
              Xem học phí
            </a>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {[
              { label: "Buổi học", val: "9–15", sub: "tuỳ gói" },
              { label: "Mỗi buổi", val: "2h", sub: "thực hành thực tế" },
              { label: "Hình thức", val: "1:1", sub: "Online linh hoạt" },
              { label: "Hỗ trợ sau khoá", val: "30", sub: "ngày qua Zalo" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: ORANGE, fontFamily: "Space Grotesk" }}>{s.val}</p>
                <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionTag text="Chương trình" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Nội dung khoá học</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Lộ trình bài bản từ nền tảng đến nâng cao, kết hợp lý thuyết và thực hành mỗi buổi.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* SEO */}
            <div className="rounded-2xl overflow-hidden" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})` }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "Space Grotesk" }}>SEO</span>
                <span className="text-white/80 text-sm font-medium">9 buổi x 2h</span>
              </div>
              <div className="p-6">
                {seoModules.map((item, i) => (
                  <div key={i} className="flex gap-4 py-3.5" style={{ borderBottom: i < seoModules.length - 1 ? `1px solid ${DARK_BORDER}` : "none" }}>
                    <span className="text-xs font-bold w-8 shrink-0 pt-0.5" style={{ color: ORANGE }}>{item.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-100">{item.t}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* GEO */}
            <div className="rounded-2xl overflow-hidden" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "Space Grotesk" }}>GEO</span>
                <span className="text-white/80 text-sm font-medium">6 buổi x 2h</span>
              </div>
              <div className="p-6">
                {geoModules.map((item, i) => (
                  <div key={i} className="flex gap-4 py-3.5" style={{ borderBottom: i < geoModules.length - 1 ? `1px solid ${DARK_BORDER}` : "none" }}>
                    <span className="text-xs font-bold w-8 shrink-0 pt-0.5 text-blue-400">{item.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-100">{item.t}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionTag text="Bạn đang ở đâu?" />
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white max-w-lg" style={{ fontFamily: "Space Grotesk" }}>Nghe quen không?</h2>
          <div className="w-10 h-0.5 mt-4 mb-6 rounded-full" style={{ background: ORANGE }}></div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Xem YouTube mãi nhưng không biết áp dụng vào thực tế như thế nào...",
              "Muốn xin việc SEO nhưng CV trống, không có project thực tế để show...",
              "Đang làm marketing nhưng sếp hỏi về SEO, mình không trả lời được...",
              "Muốn nhận project freelance nhưng không tự tin đủ kỹ năng...",
            ].map((text, i) => (
              <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)` }}>
                <p className="text-sm text-gray-300 leading-relaxed">"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionTag text="Sau khoá học" />
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Bạn sẽ làm được gì?</h2>
          <div className="w-10 h-0.5 mt-4 mb-8 rounded-full" style={{ background: ORANGE }}></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Tự triển khai SEO từ A đến Z", desc: "Keyword research, on-page, technical, link building trên website thật. Không cần thuê ngoài." },
              { num: "02", title: "Xin job SEO tự tin hơn", desc: 'Có project thực tế, có số liệu để nói chuyện. Phỏng vấn không còn bị "em chưa có kinh nghiệm".' },
              { num: "03", title: "Nhận project freelance", desc: "Biết audit, lên proposal, báo giá và deliver kết quả cho khách hàng đầu tiên." },
            ].map((o, i) => (
              <div key={i} className="p-7 rounded-2xl" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ORANGE, fontFamily: "Space Grotesk" }}>{o.num}</p>
                <p className="text-xl font-bold text-white leading-snug mb-3" style={{ fontFamily: "Space Grotesk" }}>{o.title}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionTag text="Quy trình học" />
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Học như thế nào?</h2>
          <div className="w-10 h-0.5 mt-4 mb-10 rounded-full" style={{ background: ORANGE }}></div>
          <div className="max-w-2xl flex flex-col gap-0">
            {[
              { n: 1, t: "Nhắn Zalo, trao đổi mục tiêu", d: "Mình sẽ hỏi bạn đang ở đâu, muốn đến đâu, để chọn gói học phù hợp nhất." },
              { n: 2, t: "Học 1:1 qua Google Meet, linh hoạt lịch", d: "Tối các ngày trong tuần, không cố định giờ cứng. Mỗi buổi 2 tiếng thực hành." },
              { n: 3, t: "Thực hành trên website thật của bạn", d: "Mỗi buổi đều có task thực hành, checklist và template áp dụng ngay." },
              { n: 4, t: "Hỗ trợ sau khoá 30 ngày qua Zalo", d: "Hỏi gì cũng được, mình trả lời trong ngày." },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}40`, color: ORANGE, fontFamily: "Space Grotesk" }}>
                    {s.n}
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-grow my-2" style={{ background: `${ORANGE}20` }} />}
                </div>
                <div className="pb-8">
                  <p className="font-semibold text-white text-base" style={{ fontFamily: "Space Grotesk" }}>{s.t}</p>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionTag text="Người hướng dẫn" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Về Justin</h2>
          </div>

          {/* Profile */}
          <div className="rounded-2xl p-8 md:p-10 mb-8" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img src="https://i.ibb.co/sdGYx89N/new-avt.jpg" alt="Justin" className="w-20 h-20 rounded-2xl object-cover shrink-0" loading="lazy" />
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
                  Lê Anh Tuấn <span className="text-gray-500 font-normal text-lg">(Justin)</span>
                </h3>
                <p className="mt-1 font-semibold text-sm" style={{ color: ORANGE }}>SEO Specialist & Mentor</p>
                <p className="text-gray-400 mt-4 leading-relaxed max-w-2xl text-sm">
                  3+ năm kinh nghiệm thực chiến SEO đa ngành: Y tế, E-commerce, FMCG, Thể thao. Triển khai dự án SEO cho cả thị trường Việt Nam và quốc tế (Úc, Mỹ, Singapore). Hiện tập trung SEO & GEO cho ngành Aesthetic/Beauty và giảng dạy SEO 1:1.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {["SEO On/Off-page", "Technical SEO", "GEO", "AI Automation", "Content Strategy"].map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ color: ORANGE, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30` }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats typography-driven */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Năm kinh nghiệm", val: "3", suffix: "+" },
              { label: "Traffic/tháng quản lý", val: "500,000", suffix: "+" },
              { label: "Thị trường", val: "4", suffix: "" },
              { label: "Tỉ lệ đạt KPI", val: "90", suffix: "%" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-bold leading-none" style={{ fontSize: "52px", letterSpacing: "-0.04em", color: i % 2 === 0 ? ORANGE : "#fff", fontFamily: "Space Grotesk" }}>
                  <AnimatedNumber value={s.val.replace(/,/g, "")} />{s.suffix}
                </p>
                <p className="text-sm text-gray-500 mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Journey + Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Journey */}
            <div className="rounded-2xl p-7" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <h3 className="font-bold text-lg mb-6 text-white" style={{ fontFamily: "Space Grotesk" }}>Hành trình</h3>
              <div className="flex flex-col gap-0">
                {journey.map((j, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full border-2 shrink-0 z-10 mt-0.5"
                        style={{ borderColor: ORANGE, background: i < journey.length - 1 ? ORANGE : "transparent" }} />
                      {i < journey.length - 1 && <div className="w-px flex-grow my-1" style={{ background: `${ORANGE}20` }} />}
                    </div>
                    <div className="pb-5">
                      <span className="text-xs font-bold" style={{ color: ORANGE }}>{j.year}</span>
                      <p className="font-semibold text-sm mt-0.5 text-gray-100">{j.title}</p>
                      <p className="text-xs text-gray-500">{j.place}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="rounded-2xl p-7" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <h3 className="font-bold text-lg mb-6 text-white" style={{ fontFamily: "Space Grotesk" }}>Dự án nổi bật</h3>
              <div className="flex flex-col gap-0">
                {projects.map((p, i) => (
                  <div key={i} className="pb-4 mb-4" style={{ borderBottom: i < projects.length - 1 ? `1px solid ${DARK_BORDER}` : "none" }}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-sm text-gray-100">{p.flag} {p.name}</p>
                      <span className="text-xs text-gray-600">{p.period}</span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: p.color }}>{p.result}</p>
                    <MiniGraph data={p.growth} color={p.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionTag text="Học phí" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Chọn gói phù hợp</h2>
            <p className="text-gray-400 mt-3">Học nhóm từ 2 người: giảm 25% học phí</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className={`relative rounded-2xl transition-all ${pkg.popular ? "scale-[1.02]" : ""}`}
                style={{ background: DARK_CARD, border: `2px solid ${pkg.popular ? pkg.color : DARK_BORDER}` }}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: ORANGE }}>Phổ biến nhất</div>
                )}
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: pkg.color, fontFamily: "Space Grotesk" }}>{pkg.name}</p>
                  <p className="text-3xl font-bold text-white mt-2" style={{ fontFamily: "Space Grotesk" }}>{pkg.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{pkg.sessions} {pkg.duration}</p>

                  <div className="rounded-xl p-3.5 mt-5" style={{ background: pkg.colorLight, border: `1px solid ${pkg.colorBorder}` }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: pkg.color }}>Nhóm 2+ người (-25%)</p>
                    <p className="text-xl font-bold text-green-400" style={{ fontFamily: "Space Grotesk" }}>{pkg.group}</p>
                  </div>

                  <div className="h-px my-5" style={{ background: DARK_BORDER }} />

                  <ul className="flex flex-col gap-2.5">
                    {pkg.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <CheckIcon color={pkg.color} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a href="https://zalo.me/0968322059" target="_blank"
                    className="block mt-7 py-3 rounded-xl text-center font-semibold text-sm transition-all hover:scale-[1.02]"
                    style={pkg.popular ? { background: ORANGE, color: "white" } : { background: "rgba(255,255,255,0.06)", color: "#ccc" }}>
                    Đăng ký gói {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionTag text="Hỏi đáp" />
            <h2 className="text-3xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Câu hỏi thường gặp</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${DARK_BORDER}` }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${DARK_BORDER}` : "none" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(255,255,255,0.03)" : "transparent" }}>
                  <span className="font-semibold text-sm pr-4 text-gray-100">{faq.q}</span>
                  <svg className={`w-4 h-4 shrink-0 text-gray-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <SectionTag text="Bắt đầu ngay" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4" style={{ fontFamily: "Space Grotesk" }}>
            Sẵn sàng học SEO thực chiến?
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Nhắn Zalo, mình sẽ trao đổi mục tiêu và chọn gói phù hợp. Miễn phí, không áp lực.
          </p>
          <div className="mt-8">
            <a href="https://zalo.me/0968322059" target="_blank"
              className="px-10 py-4 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg inline-block"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, boxShadow: `0 8px 30px ${ORANGE}30` }}>
              Nhắn Zalo ngay
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-6">Phản hồi trong vòng 24 giờ · seowithjustin.com</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: `1px solid ${DARK_BORDER}`, background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-600">© 2026 Lê Anh Tuấn (Justin). SEO with Justin.</p>
        </div>
      </footer>
    </div>
  );
}
