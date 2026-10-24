/* ============================================================
   AttentionCoo · V3 content model
   Shared by the new multi-page personal research site.
   ============================================================ */
window.SITE = {
  version: "3.0",
  lastUpdated: "2026-10-24",
  email: "1759751014@qq.com",
  github: "https://github.com/AttentionCoo",
  rss: "/feed.xml",

  nav: [
    { id: "work", href: "/work/", zh: "项目", en: "Work" },
    { id: "notes", href: "/notes/", zh: "笔记", en: "Notes" },
    { id: "research", href: "/research/", zh: "研究", en: "Research" },
    { id: "about", href: "/about/", zh: "关于", en: "About" },
  ],

  ui: {
    search: { zh: "搜索", en: "Search" },
    searchTitle: { zh: "搜索站点", en: "Search the site" },
    searchPlaceholder: { zh: "搜索项目、笔记、研究或页面…", en: "Search work, notes, research or pages…" },
    searchEmpty: { zh: "没有找到匹配内容。", en: "No matching content found." },
    searchHint: { zh: "↑↓ 选择 · Enter 打开 · Esc 关闭", en: "↑↓ select · Enter open · Esc close" },
    menu: { zh: "菜单", en: "Menu" },
    close: { zh: "关闭", en: "Close" },
    themeToLight: { zh: "切换到纸张模式", en: "Switch to paper mode" },
    themeToDark: { zh: "切换到深空模式", en: "Switch to night mode" },
    copyEmail: { zh: "复制邮箱", en: "Copy email" },
    copyLink: { zh: "复制链接", en: "Copy link" },
    copyBibtex: { zh: "复制 BibTeX", en: "Copy BibTeX" },
    copied: { zh: "已复制", en: "Copied" },
    copyFailed: { zh: "复制失败，请手动复制", en: "Copy failed. Please copy manually." },
    email: { zh: "邮箱", en: "Email" },
    all: { zh: "全部", en: "All" },
    readCase: { zh: "查看案例", en: "Read case study" },
    readNote: { zh: "阅读笔记", en: "Read note" },
    viewAllWork: { zh: "全部项目", en: "All work" },
    viewAllNotes: { zh: "全部笔记", en: "All notes" },
    available: { zh: "开放研究合作", en: "Open to research collaboration" },
    based: { zh: "中国 · UTC+8", en: "China · UTC+8" },
    current: { zh: "现在", en: "Now" },
    openSource: { zh: "开源", en: "Open source" },
    publication: { zh: "论文", en: "Publication" },
    share: { zh: "分享", en: "Share" },
    back: { zh: "返回", en: "Back" },
    next: { zh: "下一篇", en: "Next" },
    previous: { zh: "上一篇", en: "Previous" },
    noResults: { zh: "暂无匹配结果", en: "No results" },
  },
  projects: [
    {
      slug: "stroke-multi-agent-cdss",
      name: "stroke-multi-agent-cdss",
      category: "research",
      type: { zh: "医疗 AI · 多智能体", en: "Medical AI · Multi-Agent" },
      headline: {
        zh: "让多专家会诊过程可审计、可追溯。",
        en: "Auditable multi-expert reasoning for stroke care.",
      },
      summary: {
        zh: "面向卒中临床决策的多智能体深度检索系统：本地医学证据底座、Hybrid RAG、三专家交叉质询、18 个领域工具与全链路 SSE。",
        en: "A multi-agent deep-retrieval system for stroke care: local evidence, Hybrid RAG, three-expert cross-examination, 18 domain tools and full-chain SSE.",
      },
      metrics: [
        { value: "3", label: { zh: "专家 Agent", en: "Expert agents" } },
        { value: "18", label: { zh: "卒中工具", en: "Stroke tools" } },
        { value: "2", label: { zh: "检索路径", en: "Retrieval paths" } },
      ],
      stack: ["LangGraph", "Hybrid RAG", "BM25", "SSE"],
      repo: "https://github.com/AttentionCoo/stroke-multi-agent-cdss",
      featured: true,
      role: {
        zh: "多智能体编排、Hybrid RAG、领域工具链与 SSE 全链路设计。",
        en: "Multi-agent orchestration, Hybrid RAG, domain tools and end-to-end SSE streaming.",
      },
      problem: {
        zh: "卒中绿道决策时间紧、信息源分散，而单纯生成结论的系统很难让临床使用者复核推理依据。系统必须同时解决检索、工具调用、专家协作与过程透明四个问题。",
        en: "Stroke pathway decisions are time-sensitive and evidence is fragmented. A system that only produces an answer is hard to audit. The design had to solve retrieval, tool use, expert collaboration and process transparency together.",
      },
      challenge: {
        zh: "让医学证据检索、工具调用和多专家会诊同时保持透明、可审计、可回退。",
        en: "Keep evidence retrieval, tool calls and multi-expert consultation transparent, auditable and recoverable at the same time.",
      },
      approach: [
        {
          zh: "以本地医学文献和临床指南为知识底座，采用语义 + BM25 双路混合检索，并做证据级溯源。",
          en: "Use local literature and clinical guidelines as the knowledge base, combining semantic retrieval with BM25 and evidence-level citations.",
        },
        {
          zh: "全科、神经专科、临床药师三位专家 Agent 交叉质询，形成可审计的会诊共识。",
          en: "General, neurology and pharmacist agents cross-examine each other into an auditable consensus.",
        },
        {
          zh: "18 个卒中领域工具按评估 → 禁忌症 → 剂量三级优先调度，并配套结构化绿道预评估。",
          en: "Schedule 18 stroke tools through assessment → contraindications → dosing, alongside structured green-channel triage.",
        },
        {
          zh: "全链路 SSE 实时呈现思考与工具过程，让使用者在结果之外还能检查过程。",
          en: "Full-chain SSE exposes reasoning and tool execution in real time, so users can inspect the process beyond the final answer.",
        },
      ],
      architecture: [
        { zh: "本地知识底座", en: "Local evidence" },
        { zh: "Hybrid Retrieval", en: "Hybrid Retrieval" },
        { zh: "领域工具层", en: "Domain Tools" },
        { zh: "三专家会诊", en: "Expert Panel" },
        { zh: "证据仲裁与共识", en: "Evidence & Consensus" },
        { zh: "SSE 过程追踪", en: "SSE Trace" },
      ],
      decisions: [
        {
          zh: "不把答案作为唯一输出，而是把证据、工具调用和专家意见一并暴露，降低黑箱感。",
          en: "Treat the answer as one output among evidence, tool calls and expert opinions, reducing the black-box effect.",
        },
        {
          zh: "Hybrid RAG 兼顾语义召回与关键词精确命中，医学缩写、药名和指南条款更适合双路检索。",
          en: "Hybrid RAG combines semantic recall with exact keyword matching for medical abbreviations, drug names and guideline clauses.",
        },
        {
          zh: "工具按临床决策优先级分级调度，而不是让模型无约束地自由调用。",
          en: "Tools are scheduled by clinical decision priority instead of letting the model call them without constraints.",
        },
      ],
      outcomes: [
        { zh: "输出带有证据与专家审查轨迹，便于复核。", en: "Outputs carry evidence and expert-review traces for inspection." },
        { zh: "全链路 SSE 实时呈现推理与工具执行过程。", en: "Full-chain SSE streams reasoning and tool execution in real time." },
        { zh: "结构化绿道预评估把关键临床动作组织成可追踪流程。", en: "Structured green-channel triage turns critical clinical actions into a traceable flow." },
      ],
      next: {
        zh: "继续补充病种与真实场景验证，加强评测、安全边界和可解释性。",
        en: "Expand to more conditions and real-world validation while strengthening evaluation, safety boundaries and explainability.",
      },
    },
    {
      slug: "learning-characterizing-mas",
      name: "learning-characterizing-mas",
      category: "engineering",
      type: { zh: "AI 教育 · 多智能体", en: "AI Education · Multi-Agent" },
      headline: {
        zh: "从演示走向可审计、可回退的教育产品。",
        en: "From demo to an auditable, recoverable education product.",
      },
      summary: {
        zh: "面向卒中医学教育的个性化学习多智能体：监督者路由、10 位可寻址专家、8 维证据链画像与 263 项自动化测试。",
        en: "A personalized learning multi-agent system for stroke education: supervisor routing, ten addressable specialists, an 8-dimension evidence-chain profile and 263 automated tests.",
      },
      metrics: [
        { value: "10", label: { zh: "可寻址专家", en: "Specialist agents" } },
        { value: "5", label: { zh: "监督者工具", en: "Supervisor tools" } },
        { value: "263", label: { zh: "自动化测试", en: "Automated tests" } },
      ],
      stack: ["Vue 3", "Spring Boot", "Supervisor LLM", "Qwen-VL"],
      repo: "https://github.com/AttentionCoo/learning-characterizing-mas",
      featured: true,
      role: {
        zh: "监督者—专家多智能体架构、个性化画像闭环与系统集成。",
        en: "Supervisor–specialist architecture, personalized profile loop and system integration.",
      },
      problem: {
        zh: "医学教育需要根据学习者不断变化的证据链提供个性化支持，同时让多智能体系统可测试、可回退、可解释，而不是停留在演示阶段。",
        en: "Medical education needs personalized support grounded in an evolving evidence chain — while keeping a multi-agent system testable, recoverable and explainable beyond a demo.",
      },
      challenge: {
        zh: "让多智能体系统从演示走向可审计、可回退、可测试的教育产品。",
        en: "Move a multi-agent system from demo to an auditable, recoverable and testable education product.",
      },
      approach: [
        {
          zh: "监督者 LLM 通过检索、会诊、点将、报告、画像查询 5 个工具动态派发任务。",
          en: "A supervisor LLM dynamically dispatches work through five tools: retrieval, consultation, expert pick, report and profile query.",
        },
        {
          zh: "10 位可寻址专家支持精确点将与结构化会诊，配合共享黑板与 Claim / Evidence 证据仲裁。",
          en: "Ten addressable specialists support precise delegation and structured consultation, backed by a shared blackboard and Claim/Evidence arbitration.",
        },
        {
          zh: "8 维证据链画像贯穿学习、评估、优化闭环，Planner / RePlan 提供确定性回退。",
          en: "An 8-dimension evidence-chain profile drives the learn → assess → optimize loop, with Planner/RePlan as deterministic fallback.",
        },
      ],
      architecture: [
        { zh: "监督者路由", en: "Supervisor" },
        { zh: "专家注册表", en: "Agent Registry" },
        { zh: "共享黑板", en: "Shared Blackboard" },
        { zh: "Claim / Evidence", en: "Claim / Evidence" },
        { zh: "个性化画像", en: "Learner Profile" },
        { zh: "Planner / RePlan", en: "Planner / RePlan" },
      ],
      decisions: [
        {
          zh: "将监督者视为路由器而不是全能回答者，让专家负责领域深度，监督者负责调度。",
          en: "Treat the supervisor as a router rather than an omniscient answerer: specialists own domain depth, the supervisor owns dispatch.",
        },
        {
          zh: "用共享黑板和 Claim / Evidence 结构承载协作，避免消息在不同 Agent 之间失控扩散。",
          en: "Use a shared blackboard and Claim/Evidence structures so collaboration does not become uncontrolled message passing.",
        },
        {
          zh: "Planner / RePlan 作为确定性回退路径，让复杂编排失败时仍能得到可预测结果。",
          en: "Use Planner/RePlan as a deterministic fallback so complex orchestration failures still yield predictable outcomes.",
        },
      ],
      outcomes: [
        { zh: "覆盖 6 类资源生成、循证辅导与 Qwen-VL 影像分析。", en: "Covers six resource types, evidence-based tutoring and Qwen-VL image analysis." },
        { zh: "8 维证据链画像贯穿学习、评估与优化闭环。", en: "An 8-dimension evidence-chain profile spans the learn, assess and optimize loop." },
        { zh: "263 项自动化测试通过，为持续迭代提供信心。", en: "263 automated tests passing provide confidence for continued iteration." },
      ],
      next: {
        zh: "扩展学科覆盖，继续打磨学习闭环与教学侧评估。",
        en: "Expand subject coverage and refine the learning loop and educator-side evaluation.",
      },
    },
    {
      slug: "titanic-ft-transformer",
      name: "Titanic-FT-Transformer",
      category: "experiment",
      type: { zh: "表格学习 · 实验", en: "Tabular ML · Experiment" },
      headline: {
        zh: "用 FT-Transformer 认真处理一次表格二分类。",
        en: "A careful FT-Transformer experiment on tabular binary classification.",
      },
      summary: {
        zh: "Kaggle Titanic 生还预测实验：特征工程、特征 tokenizer、CLS token、残差连接与 DropPath，5 折交叉验证准确率 84.51% ± 1.24%。",
        en: "A Kaggle Titanic experiment with feature engineering, a feature tokenizer, CLS token, residual connections and DropPath — 84.51% ± 1.24% 5-fold CV accuracy.",
      },
      metrics: [
        { value: "84.51%", label: { zh: "5 折交叉验证", en: "5-fold CV" } },
        { value: "5", label: { zh: "集成折数", en: "Ensemble folds" } },
        { value: "FT", label: { zh: "Transformer", en: "Transformer" } },
      ],
      stack: ["PyTorch", "FT-Transformer", "5-Fold CV", "Kaggle"],
      repo: "https://github.com/AttentionCoo/Titanic-FT-Transformer",
      featured: true,
      role: {
        zh: "特征工程、FT-Transformer 建模与 5 折交叉验证。",
        en: "Feature engineering, FT-Transformer modeling and 5-fold cross-validation.",
      },
      problem: {
        zh: "表格数据不像图像或文本那样天然拥有序列结构。这个实验的目标不是刷榜，而是理解 Feature Tokenizer 与 Transformer 在结构化数据上的实际表现，并建立可复用的验证流程。",
        en: "Tabular data has no natural sequence structure. The goal was not leaderboard chasing, but understanding how a Feature Tokenizer and Transformer behave on structured data, with a reusable validation pipeline.",
      },
      challenge: {
        zh: "在表格数据上稳定提升二分类表现，同时控制过拟合。",
        en: "Improve tabular binary classification reliably while controlling overfitting.",
      },
      approach: [
        {
          zh: "构造 Title、FamilySize、IsAlone、Deck 等特征，并采用分层缺失值填充。",
          en: "Engineer Title, FamilySize, IsAlone and Deck features with stratified imputation.",
        },
        {
          zh: "使用 Feature Tokenizer、CLS Token、特征残差连接与 DropPath 正则化。",
          en: "Use a feature tokenizer, CLS token, feature residual connections and DropPath regularization.",
        },
        {
          zh: "通过 5 折交叉验证与五折集成推理提升稳定性。",
          en: "Use 5-fold cross-validation and five-fold ensemble inference for stability.",
        },
      ],
      architecture: [
        { zh: "特征工程", en: "Feature Engineering" },
        { zh: "Feature Tokenizer", en: "Feature Tokenizer" },
        { zh: "CLS Token", en: "CLS Token" },
        { zh: "Transformer Block", en: "Transformer Block" },
        { zh: "5-Fold Ensemble", en: "5-Fold Ensemble" },
      ],
      decisions: [
        {
          zh: "先把表格列变成 token，再让 Transformer 建模特征之间的交互，而不是把每一列简单拼接。",
          en: "Turn columns into tokens so the Transformer can model feature interactions rather than consuming a flat concatenation.",
        },
        {
          zh: "使用分层缺失值填充保持类别分布，避免 CV 指标因切分偏差而虚高。",
          en: "Use stratified imputation to preserve class distributions and avoid inflated CV estimates from biased splits.",
        },
        {
          zh: "DropPath 与残差连接同时使用，在容量和稳定性之间寻找平衡。",
          en: "Combine DropPath with residual connections to balance capacity and stability.",
        },
      ],
      outcomes: [
        { zh: "5 折交叉验证准确率达到 84.51% ± 1.24%。", en: "Reached 84.51% ± 1.24% 5-fold CV accuracy." },
        { zh: "五折集成推理可直接生成 Kaggle 提交。", en: "Five-fold ensemble inference is ready for a Kaggle submission." },
        { zh: "形成了一套可复用的表格特征与验证流程。", en: "Produced a reusable tabular feature and validation workflow." },
      ],
      next: {
        zh: "继续对比树模型与深度表格模型的误差结构，沉淀可复用特征流程。",
        en: "Compare error structures across tree and deep tabular models, and turn the feature pipeline into a reusable workflow.",
      },
    },
  ],
  notes: [
    {
      slug: "why-auditable-agents-matter",
      href: "/notes/why-auditable-agents-matter.html",
      type: { zh: "研究笔记", en: "Research Note" },
      title: { zh: "为什么可审计的 Agent 更重要", en: "Why Auditable Agents Matter" },
      excerpt: {
        zh: "在高风险场景里，答案只是系统输出的一部分。证据、工具调用、专家意见和回退路径共同决定了系统是否值得信任。",
        en: "In high-stakes settings, the answer is only one part of the system output. Evidence, tool calls, expert opinions and fallback paths determine whether the system deserves trust.",
      },
      date: "2026-10-18",
      dateLabel: { zh: "2026 年 10 月 18 日", en: "Oct 18, 2026" },
      readTime: 7,
      tags: ["agents", "auditability", "clinical-ai"],
    },
    {
      slug: "designing-a-clinical-reasoning-loop",
      href: "/notes/designing-a-clinical-reasoning-loop.html",
      type: { zh: "Build Log", en: "Build Log" },
      title: { zh: "设计一条临床推理回路", en: "Designing a Clinical Reasoning Loop" },
      excerpt: {
        zh: "从证据检索到多专家会诊，再到结构化输出：一条可追踪的临床推理链路应该由哪些节点组成？",
        en: "From evidence retrieval to expert consultation and structured output: what should a traceable clinical reasoning loop contain?",
      },
      date: "2026-09-24",
      dateLabel: { zh: "2026 年 9 月 24 日", en: "Sep 24, 2026" },
      readTime: 9,
      tags: ["langgraph", "clinical-ai", "sse"],
    },
    {
      slug: "what-ft-transformer-taught-me",
      href: "/notes/what-ft-transformer-taught-me.html",
      type: { zh: "实验记录", en: "Experiment Log" },
      title: { zh: "FT-Transformer 教会我的表格建模", en: "What FT-Transformer Taught Me About Tabular Data" },
      excerpt: {
        zh: "表格数据没有天然的序列结构。Feature Tokenizer、CLS token 和 5 折验证让我重新理解了让模型学习特征交互这件事。",
        en: "Tabular data has no natural sequence structure. Feature tokenization, CLS tokens and 5-fold validation changed how I think about feature interactions.",
      },
      date: "2026-08-16",
      dateLabel: { zh: "2026 年 8 月 16 日", en: "Aug 16, 2026" },
      readTime: 6,
      tags: ["pytorch", "tabular-ml", "ft-transformer"],
    },
  ],
  timeline: [
    {
      period: "CVPR 2026 Findings",
      tag: { zh: "研究", en: "Research" },
      title: { zh: "VisMet-Bench 视觉隐喻基准", en: "VisMet-Bench" },
      desc: {
        zh: "面向多模态大模型纯视觉隐喻理解的评测基准，覆盖 754 组图像对、三层五任务框架与 11 个 MLLM。",
        en: "A benchmark for visual-only metaphor understanding in MLLMs: 754 image pairs, a three-tier five-task framework and 11 evaluated models.",
      },
      href: "/research/",
    },
    {
      period: { zh: "中国软件杯 · A3 赛题", en: "China Software Cup · Track A3" },
      tag: { zh: "竞赛", en: "Competition" },
      title: { zh: "LearnAgent 个性化学习多智能体", en: "LearnAgent Personalized Learning MAS" },
      desc: {
        zh: "以监督者为脑、专家为手，构建医学教育的可审计多智能体学习闭环。",
        en: "A supervisor-as-brain, specialists-as-hands multi-agent learning loop for medical education.",
      },
      href: "/work/learning-characterizing-mas.html",
    },
    {
      period: { zh: "多智能体系统", en: "Multi-Agent Systems" },
      tag: { zh: "医疗 AI", en: "Medical AI" },
      title: { zh: "卒中临床决策支持系统", en: "Stroke Clinical Decision Support" },
      desc: {
        zh: "Hybrid RAG、多专家会诊、18 个卒中工具与全链路 SSE，让临床推理过程更透明。",
        en: "Hybrid RAG, multi-expert consultation, 18 stroke tools and full-chain SSE make clinical reasoning more transparent.",
      },
      href: "/work/stroke-multi-agent-cdss.html",
    },
    {
      period: { zh: "持续构建", en: "Ongoing" },
      tag: { zh: "开源", en: "Open Source" },
      title: { zh: "公开构建与自动化数据", en: "Building in Public" },
      desc: {
        zh: "用 GitHub Actions 每日更新项目指标与贡献快照，让这个站点本身也成为一个持续运行的系统。",
        en: "GitHub Actions refreshes project metrics and contribution snapshots daily, making this site a continuously running system in itself.",
      },
      href: "/about/#activity",
    },
  ],
  skills: [
    {
      name: { zh: "多智能体架构", en: "Multi-agent architecture" },
      evidence: { zh: "卒中 CDSS · LearnAgent", en: "Stroke CDSS · LearnAgent" },
      href: "/work/stroke-multi-agent-cdss.html",
    },
    {
      name: { zh: "Hybrid RAG 与证据溯源", en: "Hybrid RAG & evidence tracing" },
      evidence: { zh: "卒中 CDSS", en: "Stroke CDSS" },
      href: "/work/stroke-multi-agent-cdss.html",
    },
    {
      name: { zh: "多模态模型评测", en: "Multimodal model evaluation" },
      evidence: { zh: "VisMet-Bench", en: "VisMet-Bench" },
      href: "/research/",
    },
    {
      name: { zh: "PyTorch 与表格学习", en: "PyTorch & tabular learning" },
      evidence: { zh: "Titanic FT-Transformer", en: "Titanic FT-Transformer" },
      href: "/work/titanic-ft-transformer.html",
    },
    {
      name: { zh: "全栈与流式交互", en: "Full-stack & streaming UX" },
      evidence: { zh: "SSE · 审阅界面 · 自动化", en: "SSE · review UI · automation" },
      href: "/work/",
    },
    {
      name: { zh: "可测试的 Agent 系统", en: "Testable agent systems" },
      evidence: { zh: "263 项自动化测试", en: "263 automated tests" },
      href: "/work/learning-characterizing-mas.html",
    },
  ],
  research: {
    badge: "CVPR 2026 Findings",
    pages: "pp. 2304–2313",
    title: "Seeing the Abstract: A Benchmark for Visual-Only Metaphor Understanding in Multimodal Large Language Models",
    authors: "Shan Zhao, Zhao Yang, Tianwei Yan, Yusong Gong, Qian Wan, Shizhao Chen, Shezheng Song, Chengyu Wang, Meng Wang",
    abstract: {
      zh: "我们提出 VisMet-Bench：面向纯视觉隐喻理解的评测基准。754 组精心标注的图像对、三层五任务的递进式评估框架，在 11 个先进多模态大模型上系统评估，揭示当前模型在跨域隐喻推理上与人类水平仍有显著差距。",
      en: "We propose VisMet-Bench, a benchmark for monomodal visual metaphor understanding with a three-tier, five-task framework over 754 curated image pairs. Evaluated across 11 advanced MLLMs, it reveals a significant gap between current models and human-level cross-domain metaphor reasoning.",
    },
    metrics: [
      { value: "754", label: { zh: "组图像对", en: "Image pairs" } },
      { value: "5", label: { zh: "类递进任务", en: "Task families" } },
      { value: "11", label: { zh: "评测 MLLM", en: "MLLMs evaluated" } },
    ],
    links: {
      page: "https://www.openaccess.thecvf.com/content/CVPR2026F/html/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.html",
      pdf: "https://www.openaccess.thecvf.com/content/CVPR2026F/papers/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.pdf",
    },
    bibtex: [
      "@inproceedings{zhao2026seeing,",
      "  title={Seeing the Abstract: A Benchmark for Visual-Only Metaphor Understanding in Multimodal Large Language Models},",
      "  author={Zhao, Shan and Yang, Zhao and Yan, Tianwei and Gong, Yusong and Wan, Qian and Chen, Shizhao and Song, Shezheng and Wang, Chengyu and Wang, Meng},",
      "  booktitle={CVPR 2026 Findings},",
      "  pages={2304--2313},",
      "  year={2026}",
      "}",
    ].join("\n"),
  },
};
