import { useState, useEffect, useRef } from "react";

const ORANGE = "#F97316";
const ORANGE_DARK = "#EA580C";
const ORANGE_LIGHT = "rgba(249,115,22,0.12)";
const DARK_BG = "#0a0a0c";
const DARK_CARD = "#141416";
const DARK_BORDER = "rgba(255,255,255,0.08)";

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

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={ORANGE} strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const packages = [
    { name: "SEO", sessions: "12 buổi", duration: "x 2h30 (~3 tháng, 1 buổi/tuần)", price: "3.000.000đ", group: "2.550.000đ", monthly: "~1.000.000đ", color: ORANGE, items: ["Overview & Tư duy SEO 2026", "Keyword Research & Mapping", "Content SEO (2 buổi thực hành)", "On-page SEO & Schema", "Technical SEO & Core Web Vitals", "Off-page SEO & Link Building", "Tools, Tracking & Chiến lược"] },
    { name: "GEO", sessions: "8 buổi", duration: "x 2h30 (~2 tháng, 1 buổi/tuần)", price: "3.000.000đ", group: "2.550.000đ", monthly: "~1.000.000đ", color: "#3B82F6", items: ["AI Search & GEO Overview", "Technical GEO & llms.txt", "Log file & AI bot analysis", "On-page GEO & E-E-A-T-A", "Prompt Research cho Brand", "Content GEO thân thiện AI", "Off-page GEO & UGOS", "Tracking & Đo lường"] },
    { name: "COMBO", sessions: "20 buổi", duration: "x 2h30", price: "6.000.000đ", group: "4.000.000đ", monthly: "~2.000.000đ", color: ORANGE_DARK, popular: true, items: ["Trọn bộ SEO + GEO", "Tiết kiệm 1.000.000đ", "Lộ trình hoàn chỉnh nhất", "Thực hành xuyên suốt", "Ưu tiên hỗ trợ sau khoá"] },
  ];

  const projects = [
    { name: "Supplements Brand", flag: "🇻🇳", role: "SEO Lead", period: "16 tháng", result: "0 → 25,000 clicks/tháng", sub: "1.2M impressions", growth: [2, 5, 8, 15, 22, 35, 48, 65, 82, 95, 110], img: "https://i.postimg.cc/yxbS68mG/Screenshot-24.png" },
    { name: "Plastic Surgery Clinic", flag: "🇦🇺", role: "SEO Lead", period: "6 tháng", result: "0 → 2,000+ clicks/tháng", sub: "200+ patient leads", growth: [5, 6, 4, 8, 7, 6, 25, 28, 26, 30, 29, 35, 32, 38], img: "https://i.postimg.cc/KYwPqJmr/Screenshot_16.png" },
    { name: "Home Appliances", flag: "🇻🇳", role: "SEO Member", period: "6 tháng", result: "18K → 27K clicks/tháng", sub: "1,400 keywords Top 10", growth: [20, 22, 21, 25, 24, 28, 26, 30], img: "https://i.postimg.cc/jjmHgZR6/Screenshot_17.png" },
    { name: "Sportswears Site", flag: "🇻🇳", role: "SEO Member", period: "3 tháng", result: "113K → 164K clicks/tháng", sub: "2,691 keywords Top 3", growth: [10, 12, 11, 15, 18, 22, 25, 28, 30, 32, 35], img: "https://i.postimg.cc/25MQc2C7/Screenshot_18.png" },
  ];

  const journey = [
    { year: "2025 - Nay", title: "SEO Service Provider", place: "Beauty & Aesthetic Niche (Úc, Mỹ, SG)" },
    { year: "2025", title: "Senior SEO Specialist", place: "Golden Owl Digital" },
    { year: "2024 - 2025", title: "SEO Executive", place: "SEO Băng Tâm" },
    { year: "2023 - 2024", title: "Junior SEO", place: "SEO Băng Tâm" },
    { year: "Đầu 2023", title: "SEO Intern", place: "SEO Băng Tâm" },
  ];

  const faqs = [
    { q: "Khoá học phù hợp với ai?", a: "Phù hợp với người mới hoàn toàn, marketer muốn nâng cấp, freelancer muốn nhận dự án SEO, hoặc chủ doanh nghiệp muốn tự triển khai." },
    { q: "Học online hay offline?", a: "Học online 1:1 qua Google Meet / Zoom. Linh hoạt thời gian theo lịch cá nhân, học tối các ngày trong tuần." },
    { q: "Không biết gì về SEO có học được không?", a: "Hoàn toàn được. Khoá học thiết kế từ zero, đi từ nền tảng đến thực hành. Mỗi buổi đều có phần Q&A 30 phút để giải đáp." },
    { q: "GEO là gì? Tại sao cần học?", a: "GEO (Generative Engine Optimization) là tối ưu để brand xuất hiện trên ChatGPT, Perplexity, AI Overview. Đây là xu hướng 2026 mà rất ít khoá học đề cập." },
    { q: "Sau khoá học có được hỗ trợ không?", a: "Có. Hỗ trợ qua Zalo/Telegram trong suốt khoá học và 30 ngày sau khi kết thúc. Bạn cũng nhận đầy đủ template, checklist để áp dụng ngay." },
    { q: "Có thể học nhóm không?", a: "Có. Từ 2 người trở lên sẽ được giảm 25% học phí. Rủ bạn bè cùng học sẽ tiết kiệm hơn." },
  ];

  const MiniGraph = ({ data, color = ORANGE }) => {
    const max = Math.max(...data, 1);
    const norm = data.map(v => (v / max) * 32);
    const points = norm.map((v, i) => `${(i * 100) / (norm.length - 1)},${36 - v}`).join(" ");
    return (
      <svg viewBox="0 0 100 40" className="w-full h-12 mt-2">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`0,38 ${points} 100,38`} fill={`${color}15`} stroke="none" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen text-gray-100" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: DARK_BG }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-lg shadow-sm" : "bg-transparent"}`} style={scrolled ? { background: "rgba(10,10,12,0.9)", borderBottom: `1px solid ${DARK_BORDER}` } : {}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
            JUSTIN<span style={{ color: ORANGE }}>.SEO</span>
          </span>
          <a href="#pricing" className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: ORANGE }}>
            Xem học phí
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 0%, ${ORANGE}08 0%, transparent 60%)` }} />
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <SectionTag text="Khoá học SEO & GEO 2026" />
            <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight tracking-tight text-white" style={{ fontFamily: "Space Grotesk" }}>
              Từ zero đến tự tin
              <br />
              <span style={{ color: ORANGE }}>triển khai SEO</span>
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-xl leading-relaxed">
              Học 1:1 online cùng người hướng dẫn có 3+ năm kinh nghiệm thực chiến, tổng traffic đạt 500,000+ lượt/tháng. Nội dung cập nhật 2026 bao gồm cả GEO (AI Search Optimization).
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#pricing" className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, boxShadow: `0 8px 30px ${ORANGE}30` }}>
                Đăng ký ngay
              </a>
              <a href="#about" className="px-8 py-3.5 rounded-xl font-semibold transition-all text-gray-300 hover:text-orange-400" style={{ border: `1px solid ${DARK_BORDER}` }}>
                Tìm hiểu thêm
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: "Buổi học", val: "12-20", sub: "tuỳ gói" },
              { label: "Mỗi buổi", val: "2h30", sub: "2h nội dung + 30' Q&A" },
              { label: "Hình thức", val: "1:1", sub: "Online linh hoạt" },
              { label: "Hỗ trợ", val: "30", sub: "ngày sau khoá", suffix: " ngày" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center transition-all" style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: ORANGE, fontFamily: "Space Grotesk" }}>{s.val}</p>
                <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTag text="Chương trình" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Nội dung khoá học</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Lộ trình bài bản từ nền tảng đến nâng cao, kết hợp lý thuyết và thực hành mỗi buổi.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* SEO */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})` }}>
                <span className="text-white font-bold text-lg">SEO</span>
                <span className="text-white/80 text-sm font-medium">12 buổi x 2h30</span>
              </div>
              <div className="p-6 space-y-0">
                {[
                  { n: "01", t: "Tổng quan SEO & Tư duy 2026", d: "SEO là gì, cách Google hoạt động, 4 trụ cột, E-E-A-T, tư duy SEO hiện đại" },
                  { n: "02", t: "Tâm lý tìm kiếm & Hành vi người dùng", d: "Cách người dùng search, hành vi tìm kiếm, buyer persona, phân tích intent" },
                  { n: "03", t: "Nghiên cứu từ khoá (Lý thuyết)", d: "Search intent, short/long-tail, keyword difficulty, volume, các tools phổ biến" },
                  { n: "04", t: "Nghiên cứu từ khoá (Thực hành)", d: "Keyword mapping, topic cluster, thực hành trực tiếp trên project thật" },
                  { n: "05", t: "SEO On-page", d: "Title, meta, heading, URL, internal linking, schema markup, SEO hình ảnh" },
                  { n: "06", t: "Content SEO (Chiến lược)", d: "Topical authority, pillar/cluster page, content brief outrank đối thủ" },
                  { n: "07", t: "Content SEO (AI & Audit)", d: "Dùng AI sản xuất content chất lượng, quy trình audit và tối ưu bài cũ" },
                  { n: "08", t: "Technical SEO", d: "Crawl, index, Core Web Vitals, robots.txt, sitemap, canonical, redirect" },
                  { n: "09", t: "Off-page & Link Building", d: "Backlink chất lượng vs số lượng, guest post, digital PR, chiến lược outreach" },
                  { n: "10", t: "SEO cho các loại website", d: "E-commerce, blog, website dịch vụ, tin tức. Cách tiếp cận khác nhau cho từng loại" },
                  { n: "11", t: "Phân tích dữ liệu & Báo cáo", d: "GSC, GA4, Ahrefs, Semrush. Đọc data, ra quyết định, báo cáo cho client/sếp" },
                  { n: "12", t: "Bài tập cuối khoá", d: "Audit website thật + lập chiến lược SEO 6-12 tháng hoàn chỉnh" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-3.5 last:border-0" style={{ borderBottom: i < 11 ? `1px solid ${DARK_BORDER}` : "none" }}>
                    <span className="text-xs font-bold w-10 shrink-0 pt-0.5" style={{ color: ORANGE }}>{item.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-100">{item.t}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GEO */}
            <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}>
                <span className="text-white font-bold text-lg">GEO</span>
                <span className="text-white/80 text-sm font-medium">8 buổi x 2h30</span>
              </div>
              <div className="p-6 space-y-0">
                {[
                  { n: "01", t: "Tổng quan GEO", d: "AI hoạt động thế nào, GEO vs SEO, KPIs, tương lai AI SEO" },
                  { n: "02", t: "Technical GEO", d: "Quy trình & checklist, setup llms.txt, llms-full.txt" },
                  { n: "03", t: "Phân tích AI Bot", d: "Phân tích log file, kiểm soát AI bots crawl website" },
                  { n: "04", t: "On-page GEO", d: "Internal link nâng cao, schema, E-E-A-T-A tối ưu cho AI" },
                  { n: "05", t: "Nghiên cứu Prompt", d: "Xây danh sách prompt cho brand, chọn prompt triển khai" },
                  { n: "06", t: "Content GEO", d: "Cấu trúc bài viết & câu thân thiện AI, internal link nâng cao" },
                  { n: "07", t: "Off-page GEO", d: "Organic/Owned/Earned media, UGOS (độc quyền), AI dataset" },
                  { n: "08", t: "Đo lường & Tracking", d: "Citation rate, AI-referred traffic, đo lường visibility trên AI" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-3.5 last:border-0" style={{ borderBottom: i < 7 ? `1px solid ${DARK_BORDER}` : "none" }}>
                    <span className="text-xs font-bold w-10 shrink-0 pt-0.5 text-blue-400">{item.n}</span>
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

      {/* Pricing */}
      <section id="pricing" className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTag text="Học phí" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Chọn gói phù hợp</h2>
            <p className="text-gray-400 mt-3">Học 1:1 hoặc rủ bạn bè cùng học để được giảm 25%</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden transition-all hover:shadow-xl ${pkg.popular ? "scale-[1.02]" : ""}`} style={{ background: DARK_CARD, border: `2px solid ${pkg.popular ? pkg.color : DARK_BORDER}` }}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold text-white" style={{ background: pkg.color }}>
                    Phổ biến nhất
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: pkg.color }} />
                    <span className="font-bold text-lg" style={{ fontFamily: "Space Grotesk" }}>{pkg.name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{pkg.sessions} {pkg.duration}</p>

                  <div className="mt-6 mb-1">
                    <span className="text-3xl font-bold" style={{ color: pkg.color, fontFamily: "Space Grotesk" }}>{pkg.price}</span>
                    <span className="text-sm text-gray-500 ml-2">/ học 1:1</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm font-semibold text-green-400">{pkg.group}</span>
                    <span className="text-xs text-gray-500">/ nhóm từ 2 người (-25%)</span>
                  </div>

                  {/* Installment strip */}
                  <div className="rounded-xl p-3.5 mb-5" style={{ background: `${pkg.color}10`, border: `1px solid ${pkg.color}30` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: pkg.color }}>Thanh toán 3 tháng</span>
                      <div className="flex gap-1.5">
                        {["T1","T2","T3"].map(t => (
                          <span key={t} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${pkg.color}18`, border: `1px solid ${pkg.color}35`, color: pkg.color }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>{pkg.monthly}</span>
                    <span className="text-xs text-gray-500 ml-1">/ tháng</span>
                  </div>

                  <div className="h-px mb-5" style={{ background: DARK_BORDER }} />

                  <ul className="space-y-2.5">
                    {pkg.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="block mt-7 py-3 rounded-xl text-center font-semibold text-sm transition-all hover:scale-[1.02]" style={pkg.popular ? { background: pkg.color, color: "white" } : { background: "rgba(255,255,255,0.06)", color: "#ccc" }}>
                    Đăng ký gói {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTag text="Người hướng dẫn" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Về Justin</h2>
          </div>

          {/* Profile */}
          <div className="rounded-2xl p-8 md:p-10 mb-10" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img src="https://i.ibb.co/sdGYx89N/new-avt.jpg" alt="Justin" className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md" loading="lazy" />
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Lê Anh Tuấn <span className="text-gray-500 font-normal text-lg">(Justin)</span></h3>
                <p className="mt-1 font-medium" style={{ color: ORANGE }}>SEO Specialist & Mentor</p>
                <p className="text-gray-400 mt-4 leading-relaxed max-w-2xl">
                  3+ năm kinh nghiệm thực chiến SEO đa ngành: Y tế, E-commerce, FMCG, Thể thao. Triển khai dự án SEO cho cả thị trường Việt Nam và quốc tế (Úc, Mỹ, Singapore). Hiện tập trung SEO & GEO cho ngành Aesthetic/Beauty.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {["SEO On/Off-page", "Technical SEO", "GEO", "AI Automation", "Content Strategy", "Meta/TikTok Ads"].map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ color: ORANGE, borderColor: `${ORANGE}30`, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30` }}>{s}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <a href="https://www.linkedin.com/in/le-anh-tuan-digital/" target="_blank" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-gray-300 hover:text-blue-400 transition-all" style={{ border: `1px solid ${DARK_BORDER}` }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://www.facebook.com/le.tuan.947316" target="_blank" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-gray-300 hover:text-blue-400 transition-all" style={{ border: `1px solid ${DARK_BORDER}` }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Tổng traffic", val: "500000", suffix: "+", sub: "lượt/tháng" },
              { label: "Dự án", val: "12", suffix: "+", sub: "thành công" },
              { label: "Ngành", val: "10", suffix: "", sub: "đã triển khai" },
              { label: "KPI", val: "90", suffix: "%+", sub: "đạt target" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
                <p className="text-3xl font-bold" style={{ color: ORANGE, fontFamily: "Space Grotesk" }}>
                  <AnimatedNumber value={s.val} suffix={s.suffix} />
                </p>
                <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{s.label} {s.sub}</p>
              </div>
            ))}
          </div>

          {/* Journey */}
          <div className="rounded-2xl p-8 mb-10" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
            <h3 className="font-bold text-lg mb-6 text-white" style={{ fontFamily: "Space Grotesk" }}>Hành trình</h3>
            <div className="space-y-0">
              {journey.map((j, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 shrink-0 z-10 bg-white" style={{ borderColor: ORANGE }} />
                    {i < journey.length - 1 && <div className="w-0.5 flex-grow" style={{ background: `${ORANGE}20` }} />}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold" style={{ color: ORANGE }}>{j.year}</span>
                    <p className="font-semibold text-sm mt-0.5 text-gray-100">{j.title}</p>
                    <p className="text-xs text-gray-500">{j.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <h3 className="font-bold text-lg mb-5 text-white" style={{ fontFamily: "Space Grotesk" }}>Dự án nổi bật</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <div key={i} className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow" style={{ background: DARK_BG, border: `1px solid ${DARK_BORDER}` }}>
                <div className="w-full overflow-hidden relative">
                  <img src={p.img} alt={p.name} className="w-full object-contain" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm" style={{ color: ORANGE }}>{p.role}</span>
                  </div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-white text-lg">{p.flag}</span>
                    <span className="text-white font-bold text-sm">{p.name}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-sm" style={{ color: i % 2 === 0 ? ORANGE : "#60A5FA" }}>{p.result}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.sub}</p>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{p.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: DARK_BG }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionTag text="Hỏi đáp" />
            <h2 className="text-3xl font-bold mt-4 text-white" style={{ fontFamily: "Space Grotesk" }}>Câu hỏi thường gặp</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${DARK_BORDER}` }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${DARK_BORDER}` : "none" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors" style={{ background: openFaq === i ? "rgba(255,255,255,0.03)" : "transparent" }}>
                  <span className="font-semibold text-sm pr-4 text-gray-100">{faq.q}</span>
                  <svg className={`w-4 h-4 shrink-0 text-gray-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      {/* CTA */}
      <section id="contact" className="py-20" style={{ background: DARK_CARD }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Liên hệ ngay để đăng ký hoặc trao đổi thêm về khoá học. Mình sẽ phản hồi trong vòng 24 giờ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="mailto:justintuan@seowithjustin.com" className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, boxShadow: `0 8px 30px ${ORANGE}30` }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
            </a>
            <a href="https://zalo.me/0968322059" target="_blank" className="px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400" style={{ border: `1px solid ${DARK_BORDER}` }}>
              Zalo
            </a>
            <a href="https://www.linkedin.com/in/le-anh-tuan-digital/" target="_blank" className="px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400" style={{ border: `1px solid ${DARK_BORDER}` }}>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/le.tuan.947316" target="_blank" className="px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400" style={{ border: `1px solid ${DARK_BORDER}` }}>
              Facebook
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-6">seowithjustin.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: `1px solid ${DARK_BORDER}`, background: DARK_BG }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-600">© 2026 Lê Anh Tuấn (Justin). SEO with Justin.</p>
        </div>
      </footer>
    </div>
  );
}
