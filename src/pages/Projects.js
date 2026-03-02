import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Section from '../components/common/Section';
import ProjectsHero from '../components/common/ProjectsHero';
import ProjectCard from '../components/cards/ProjectCard';
import ProjectModal from '../components/modals/ProjectModal';

const Projects = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translations = {
    hero: {
      title: {
        en: "My Projects",
        zh: "我的项目"
      },
      subtitle: {
        en: "Innovative solutions to real-world problems",
        zh: "创新解决方案，应对现实世界问题"
      }
    },
    filters: {
      all: {
        en: "All Projects",
        zh: "所有项目"
      },
      ai: {
        en: "AI & Computer Vision",
        zh: "AI 与计算机视觉"
      },
      web: {
        en: "Web & Product Development",
        zh: "Web 与产品开发"
      },
      data: {
        en: "Data Engineering & Crawlers",
        zh: "数据工程与爬虫"
      },
      automation: {
        en: "Automation & Systems",
        zh: "自动化与系统工具"
      }
    },
    projectDetails: {
      viewProject: {
        en: "View Project",
        zh: "查看项目"
      },
      viewCode: {
        en: "View Code",
        zh: "查看代码"
      },
      overview: {
        en: "Overview",
        zh: "概述"
      },
      technologies: {
        en: "Technologies Used",
        zh: "使用的技术"
      },
      challenges: {
        en: "Challenges",
        zh: "挑战"
      },
      solutions: {
        en: "Solutions",
        zh: "解决方案"
      },
      results: {
        en: "Results",
        zh: "结果"
      }
    },
    cta: {
      title: {
        en: "Have a project in mind?",
        zh: "有项目想法？"
      },
      description: {
        en: "I'm always looking for new challenges and opportunities to collaborate on interesting projects.",
        zh: "我一直在寻找新的挑战和机会，希望能在有趣的项目上进行合作。"
      },
      button: {
        en: "Get in Touch",
        zh: "联系我"
      }
    }
  };

  // Project data — all real GitHub repositories (JeremyDong22), including private repos
  const projects = [
    // ===== AI & COMPUTER VISION =====
    {
      id: 1,
      title: {
        en: "LearnAnyMove3D – 3D Sports Motion Learning",
        zh: "LearnAnyMove3D – 3D 运动动作学习平台"
      },
      description: {
        en: "Upload two videos (yourself vs. a pro like Steph Curry) and instantly get a 3D skeletal comparison with anatomical feedback. MediaPipe BlazePose extracts 33 keypoints per frame, normalizes body proportions to eliminate height differences, aligns timelines, and renders side-by-side or overlay 3D skeletons entirely in the browser.",
        zh: "上传两段视频（自己 vs 库里等专业球员），立刻获得 3D 骨架对比与解剖学反馈。MediaPipe BlazePose 每帧提取 33 个关键点，归一化体型消除身高差异，时间轴对齐后在浏览器内并排或叠加渲染 3D 骨架，优先输出核心关节改进建议。"
      },
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["React 18", "TypeScript", "Three.js", "React Three Fiber", "MediaPipe BlazePose", "Zustand", "Vite"],
      featured: true,
      challenges: {
        en: "Normalizing body proportions across different athletes and aligning motion timelines between two asynchronous video streams while maintaining real-time 3D rendering performance in the browser.",
        zh: "跨越不同运动员的体型差异进行骨架归一化，同时对两个异步视频流的动作时间轴进行对齐，并保持浏览器内的实时 3D 渲染性能。"
      },
      solutions: {
        en: "Implemented height-invariant skeleton normalization by rescaling relative to hip-shoulder distance. Used dynamic time warping for timeline alignment and leveraged React Three Fiber for GPU-accelerated 3D rendering.",
        zh: "通过以髋肩距离为基准进行相对缩放实现了身高无关的骨架归一化。使用动态时间规整进行时间轴对齐，并利用 React Three Fiber 进行 GPU 加速的 3D 渲染。"
      },
      githubUrl: "https://github.com/JeremyDong22/LearnAnyMove3D",
      liveUrl: null
    },
    {
      id: 2,
      title: {
        en: "Real-time Basketball Shooting Coach",
        zh: "实时篮球投篮教练 Web App"
      },
      description: {
        en: "Browser-side AI coach that analyzes shooting form in real time using MediaPipe Holistic pose estimation and YOLOv11 ball detection — no backend required. Detects the exact release moment via wrist angle velocity exceeding 300°/s while the wrist is above the shoulder, then traces the U-shaped ball trajectory to reconstruct the full shot arc.",
        zh: "纯前端 AI 投篮教练，结合 MediaPipe Holistic 姿态估计和 YOLOv11 篮球检测，无需后端服务器。通过手腕角速度（>300°/s）和位置（高于肩部）精准识别出手瞬间，追踪篮球 U 型弹道底部反推完整投篮弧线，并录制调试视频供回溯分析。"
      },
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["MediaPipe Holistic", "YOLOv11", "ONNX Runtime Web", "HTML5 / CSS3 / JS", "MediaRecorder API"],
      featured: true,
      challenges: {
        en: "Accurately detecting the exact moment of ball release from continuous pose data while running both pose estimation and ball detection models entirely in the browser without server latency.",
        zh: "从连续的姿态数据中精准识别出手瞬间，同时在浏览器内同时运行姿态估计和篮球检测两个模型，无需服务器延迟。"
      },
      solutions: {
        en: "Designed a multi-condition release detection algorithm using wrist angular velocity, position, and joint angle thresholds. Used ONNX Runtime Web to run YOLOv11 directly in the browser with near-native performance.",
        zh: "设计了基于手腕角速度、位置和关节角度阈值的多条件出手检测算法。使用 ONNX Runtime Web 直接在浏览器中运行 YOLOv11，性能接近原生。"
      },
      githubUrl: "https://github.com/JeremyDong22/realtimeshootingcoach",
      liveUrl: "https://shoot-it.pro"
    },
    {
      id: 3,
      title: {
        en: "EyesOfSmartICE – YOLO Multi-Stage Restaurant Vision System",
        zh: "EyesOfSmartICE – YOLO 多阶段餐厅视觉监控系统"
      },
      description: {
        en: "Four-stage progressive AI pipeline for restaurant operations monitoring: detect all persons, classify staff vs. customers, analyze staff behavior, then generate operational insights. A Linux RTX 3060 machine auto-captures frames from ONVIF IP cameras every 30 seconds and syncs to Supabase for cloud model training, while a MacBook M4 manages training jobs.",
        zh: "四阶段渐进式 AI 餐厅监控管道：检测全员 → 区分员工/顾客 → 分析员工行为 → 输出运营洞察。Linux RTX 3060 机器每 30 秒从 ONVIF IP 摄像头自动截帧并同步至 Supabase，MacBook M4 负责训练管理，通过 ONVIF 协议自动发现局域网摄像头。"
      },
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["Python", "YOLO (Ultralytics)", "OpenCV", "Supabase", "ONVIF", "Shell Script"],
      featured: true,
      challenges: {
        en: "Building a scalable multi-stage detection pipeline that differentiates staff from customers in a restaurant environment while managing distributed data collection across heterogeneous hardware.",
        zh: "构建可扩展的多阶段检测管道，在餐厅环境中区分员工和顾客，同时管理跨异构硬件的分布式数据采集工作流。"
      },
      solutions: {
        en: "Designed a hierarchical model training strategy where each stage's output becomes the next stage's training data. Implemented ONVIF auto-discovery for zero-config camera onboarding and Supabase for cloud-synced training datasets.",
        zh: "设计了分层模型训练策略，每个阶段的输出成为下一阶段的训练数据。实现了 ONVIF 自动发现以零配置接入摄像头，用 Supabase 进行云端同步训练数据集。"
      },
      githubUrl: "https://github.com/JeremyDong22/ASEOfSmartICE",
      liveUrl: null
    },
    {
      id: 4,
      title: {
        en: "EyesOfSmartICE Realtime – Single-Model Live Surveillance",
        zh: "EyesOfSmartICE Realtime – 单模型实时餐厅监控"
      },
      description: {
        en: "Production real-time restaurant surveillance system built with Vue.js using a single-model YOLO detection approach for low-latency monitoring. Designed for live deployment in restaurant locations to provide immediate staff and customer detection without multi-stage batch processing overhead.",
        zh: "基于 Vue.js 和单模型 YOLO 检测的生产级实时餐厅监控系统，专为低延迟现场部署设计。无需多阶段批处理，可即时在餐厅门店对员工和顾客进行实时检测。"
      },
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["Vue.js", "YOLO", "Python", "Real-time Inference", "WebSocket"],
      featured: false,
      challenges: {
        en: "Achieving sub-second detection latency in a browser-based surveillance interface while maintaining high accuracy in the dynamic restaurant environment.",
        zh: "在基于浏览器的监控界面中实现亚秒级检测延迟，同时在动态餐厅环境中保持高准确性。"
      },
      solutions: {
        en: "Optimized the single-model inference pipeline to eliminate latency overhead of multi-stage processing, and used WebSocket for real-time frame streaming between the backend detection engine and the Vue.js frontend.",
        zh: "优化了单模型推理管道以消除多阶段处理的延迟开销，并使用 WebSocket 在后端检测引擎和 Vue.js 前端之间进行实时帧流传输。"
      },
      githubUrl: "https://github.com/JeremyDong22/eyesofsmartice-realtime",
      liveUrl: "https://eyes.smartice.ai"
    },
    {
      id: 5,
      title: {
        en: "SentinelOfSmartICE – Real-time Face Detection & Tracking",
        zh: "SentinelOfSmartICE – 实时人脸检测与追踪系统"
      },
      description: {
        en: "Real-time face detection and tracking system pulling RTSP streams from IP cameras, processing with InsightFace Buffalo_L model, and serving a live browser-based monitoring dashboard via Flask. Supports multi-camera streams with dual detection backends: OpenCV Cascade for stability and InsightFace Buffalo_L for advanced accuracy.",
        zh: "从 RTSP IP 摄像头拉流的实时人脸检测与追踪系统，使用 InsightFace Buffalo_L 模型处理，通过 Flask 提供实时浏览器监控界面。支持多摄像头流，双检测后端：OpenCV Cascade（稳定）和 InsightFace Buffalo_L（高精度）。"
      },
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["Python", "OpenCV", "InsightFace Buffalo_L", "Flask", "RTSP"],
      featured: false,
      challenges: {
        en: "Maintaining stable real-time face tracking across multiple simultaneous RTSP camera feeds while providing a responsive web monitoring interface.",
        zh: "在多个同时接入的 RTSP 摄像头流中维持稳定的实时人脸追踪，同时提供响应式的 Web 监控界面。"
      },
      solutions: {
        en: "Implemented dual-mode detection supporting both OpenCV Cascade for low-resource environments and InsightFace for high-accuracy needs. Used Flask streaming response for MJPEG video delivery to the browser without additional WebSocket infrastructure.",
        zh: "实现了双模式检测，支持低资源环境的 OpenCV Cascade 和高精度需求的 InsightFace。使用 Flask 的流式响应向浏览器传输 MJPEG 视频，无需额外的 WebSocket 基础设施。"
      },
      githubUrl: "https://github.com/JeremyDong22/SentinelOfSmartICE",
      liveUrl: null
    },
    {
      id: 6,
      title: {
        en: "KitchenPass Monitor – ONVIF Kitchen Surveillance",
        zh: "KitchenPass 监控 – ONVIF 厨房摄像头系统"
      },
      description: {
        en: "ONVIF-compliant IP camera monitoring system for kitchen pass surveillance. Provides a real-time browser-based video stream viewer, snapshot capture, and automatic reconnection on network interruptions. Discovers cameras automatically on the local network via the ONVIF protocol.",
        zh: "符合 ONVIF 规范的 IP 摄像头监控系统，用于厨房传菜口监控。提供实时浏览器视频流查看、快照抓取和网络中断后自动重连功能，通过 ONVIF 协议自动发现局域网摄像头。"
      },
      image: "https://images.unsplash.com/photo-1556909114-44e3e9399a2b?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["Python", "Flask", "OpenCV", "zeep (ONVIF)", "RTSP", "HTML5"],
      featured: false,
      challenges: {
        en: "Handling ONVIF device discovery and RTSP stream management reliably in a restaurant network environment with intermittent connectivity.",
        zh: "在餐厅网络环境中可靠处理 ONVIF 设备发现和 RTSP 流管理，应对间歇性网络连接问题。"
      },
      solutions: {
        en: "Used the zeep SOAP library for ONVIF WS-Discovery protocol compliance, implemented OpenCV-based stream reading with automatic reconnect on frame timeout, and served the video as MJPEG stream via Flask.",
        zh: "使用 zeep SOAP 库实现 ONVIF WS-Discovery 协议合规，通过 OpenCV 读取视频流并在帧超时时自动重连，通过 Flask 以 MJPEG 流形式提供视频服务。"
      },
      githubUrl: "https://github.com/JeremyDong22/KitchenPassMonitorOfSmartICE",
      liveUrl: null
    },
    {
      id: 7,
      title: {
        en: "SmartICE DB Agent – Multi-Agent LangGraph Query System",
        zh: "SmartICE DB Agent – 多智能体 LangGraph 数据库查询系统"
      },
      description: {
        en: "Multi-agent system built with LangGraph for querying restaurant and social media post data from Supabase. Five specialized agents work in sequence: Initial Planner, Validation Planner, SQL Generator, Vector Similarity Search Generator, and Synthesizer. Supports both structured SQL queries and semantic vector searches via pgvector.",
        zh: "基于 LangGraph 构建的多智能体系统，用于查询 Supabase 中的餐厅和社交媒体帖子数据。五个专项智能体顺序协作：初始规划 → 验证规划 → SQL 生成 → 向量相似检索生成 → 综合输出，同时支持结构化 SQL 和 pgvector 语义检索。"
      },
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["Python", "LangGraph", "OpenAI API", "Google Gemini API", "Supabase", "pgvector"],
      featured: false,
      challenges: {
        en: "Coordinating five specialized agents to handle both SQL and vector queries while ensuring planning accuracy and preventing invalid queries from reaching the database.",
        zh: "协调五个专项智能体同时处理 SQL 和向量查询，同时确保规划准确性并防止无效查询到达数据库。"
      },
      solutions: {
        en: "Designed a validation planning stage between the initial planner and query generators to catch logical errors early. Used LangGraph's state machine for deterministic agent routing and implemented Pydantic schemas for strict query validation before execution.",
        zh: "在初始规划器和查询生成器之间设计了验证规划阶段，提前捕获逻辑错误。使用 LangGraph 的状态机实现确定性智能体路由，并在执行前通过 Pydantic 模式进行严格的查询验证。"
      },
      githubUrl: "https://github.com/JeremyDong22/Smartice.ai_dbagent",
      liveUrl: null
    },
    {
      id: 8,
      title: {
        en: "EarOfSmartICE – SDR Communication Monitor",
        zh: "EarOfSmartICE – 软件定义无线电通信监测系统"
      },
      description: {
        en: "Restaurant communication monitoring and analysis system using Software Defined Radio (SDR). Intercepts and analyzes wireless communication channels in the restaurant environment to provide intelligence on operational communication patterns — a novel approach to restaurant operations monitoring that goes beyond cameras.",
        zh: "使用软件定义无线电（SDR）技术的餐厅通信监测与分析系统。拦截并分析餐厅环境中的无线通信频道，提供超越摄像头监控维度的运营通信模式情报，是餐厅运营监控的全新探索方向。"
      },
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
      category: "ai",
      technologies: ["SDR (Software Defined Radio)", "Python", "Signal Processing", "HTML"],
      featured: false,
      challenges: {
        en: "Capturing and decoding wireless communication signals in the noisy RF environment of a restaurant while filtering out interference from nearby Wi-Fi, Bluetooth, and other consumer electronics.",
        zh: "在餐厅嘈杂的射频环境中捕获和解码无线通信信号，同时过滤来自附近 Wi-Fi、蓝牙和其他消费电子设备的干扰。"
      },
      solutions: {
        en: "Implemented an SDR-based signal processing pipeline with frequency scanning, signal detection thresholds, and digital signal processing filters to isolate target communication channels from background RF noise.",
        zh: "实现了基于 SDR 的信号处理管道，包含频率扫描、信号检测阈值和数字信号处理滤波器，用于从背景射频噪声中分离目标通信频道。"
      },
      githubUrl: "https://github.com/JeremyDong22/EarOfSmartICE",
      liveUrl: null
    },
    // ===== WEB & PRODUCT DEVELOPMENT =====
    {
      id: 9,
      title: {
        en: "Maiyouweng – B2B Grain & Oil Options Trading Platform",
        zh: "卖油翁 – B2B 粮油含权贸易平台"
      },
      description: {
        en: "Full-stack B2B platform for China's grain and oil options-embedded trade market — a complex derivative pricing model where buyers receive embedded optionality on commodity prices. Features basis pricing, fund flow management, P&L calculation, and an interactive HTML5 business logic visualizer. Containerized with Docker Compose for one-command deployment.",
        zh: "面向中国粮油含权贸易市场的 B2B 全栈平台。买方可嵌入商品价格期权的复杂衍生品定价模式。实现了基差定价、资金流转、盈亏计算，并附有交互式 HTML5 业务逻辑可视化模型和完整中文业务文档体系，Docker Compose 一键部署。"
      },
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Docker Compose"],
      featured: true,
      challenges: {
        en: "Modeling complex financial derivatives (basis pricing with embedded options) in software while accurately reflecting China's unique grain commodity trading regulations and market practices.",
        zh: "将复杂的金融衍生品（含权嵌入的基差定价）建模为软件逻辑，同时准确反映中国粮食商品交易的特有法规和市场实践。"
      },
      solutions: {
        en: "Built an interactive HTML5 business logic visualizer to validate pricing models before backend implementation. Used PostgreSQL with carefully designed schemas to handle the complex fund flow and settlement logic.",
        zh: "在后端实现前构建交互式 HTML5 业务逻辑可视化器验证定价模型。使用 PostgreSQL 配合精心设计的数据库 Schema 处理复杂的资金流转和清算逻辑。"
      },
      githubUrl: "https://github.com/JeremyDong22/maiyouweng",
      liveUrl: null
    },
    {
      id: 10,
      title: {
        en: "InventoryEntry – Voice-Powered SmartICE Inventory System",
        zh: "野百灵库存管理系统 – 语音 AI 驱动的库存录入"
      },
      description: {
        en: "Restaurant chain inventory management system with both manual and voice-based entry. Uses iFlytek ASR for real-time Chinese speech transcription and Alibaba Qwen for AI-structured data extraction from free-form speech. Supports 4-role RBAC permissions, deployed live on Cloudflare Pages + Render + Supabase.",
        zh: "连锁餐厅库存管理系统，支持手动录入和语音录入两种模式——讯飞 ASR 实时中文语音识别 + 阿里云通义千问 AI 结构化提取库存数据。4 角色 RBAC 权限控制（管理员/店长/员工/查看），线上运行于 inv.smartice.ai。"
      },
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["React 19", "Vite 6", "TypeScript", "Tailwind CSS v4", "FastAPI", "Supabase", "iFlytek ASR", "Alibaba Qwen"],
      featured: true,
      challenges: {
        en: "Building a reliable voice-to-structured-inventory pipeline that handles the imprecision of natural speech (item names, quantities, units) in a noisy restaurant kitchen environment.",
        zh: "在嘈杂的餐厅厨房环境中，构建能够处理自然语音不精确性（商品名称、数量、单位）的语音转结构化库存数据管道。"
      },
      solutions: {
        en: "Integrated iFlytek ASR for high-accuracy Chinese speech recognition, then used Alibaba Qwen as a post-processing AI to extract and normalize inventory fields from raw transcription, with a confirmation step before database write.",
        zh: "集成讯飞 ASR 进行高精度中文语音识别，然后使用阿里云通义千问作为后处理 AI 从原始转录中提取和规范化库存字段，在写入数据库前进行确认步骤。"
      },
      githubUrl: "https://github.com/JeremyDong22/InventoryEntryOfSmartICE",
      liveUrl: "https://inv.smartice.ai"
    },
    {
      id: 11,
      title: {
        en: "AI Social Insights Dashboard for Restaurants",
        zh: "餐饮 AI 社交媒体数据洞察平台"
      },
      description: {
        en: "AI-driven social media analytics platform for restaurant operators. Provides multi-dimensional metrics (visitors, impressions, buyer trends), competitor ranking and filtering, topic trend analysis, and an AI Agent task scheduler for automated data analysis jobs. Supports bilingual UI with Tremor React chart components.",
        zh: "面向餐厅经营者的 AI 驱动社交媒体数据分析平台。提供多维度指标（访客、曝光、买家趋势）、竞品排序筛选、话题趋势分析，以及 AI Agent 任务调度器用于自动化数据分析作业。支持中英双语界面，使用 Tremor React 图表组件。"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Tremor React", "AI Agent"],
      featured: false,
      challenges: {
        en: "Designing an intuitive dashboard that surfaces actionable insights from complex multi-source social data while keeping the AI agent task lifecycle transparent to non-technical restaurant operators.",
        zh: "设计一个直观的仪表板，从复杂的多源社交数据中提炼可操作洞察，同时向非技术餐厅运营者透明展示 AI Agent 任务生命周期。"
      },
      solutions: {
        en: "Built a modular dashboard with Tremor React for standardized data visualization, implemented a task queue UI for AI agent monitoring, and created localized UI text for both Chinese and English operator personas.",
        zh: "使用 Tremor React 构建模块化仪表板实现标准化数据可视化，实现了 AI Agent 任务队列监控 UI，并为中英文运营人员画像分别创建了本地化 UI 文本。"
      },
      githubUrl: "https://github.com/JeremyDong22/AIrestauranter",
      liveUrl: null
    },
    {
      id: 12,
      title: {
        en: "RoleplayOfSmartICE – Restaurant Operations PWA",
        zh: "RoleplayOfSmartICE – 餐厅运营角色扮演 PWA"
      },
      description: {
        en: "Role-play task management PWA for real restaurant chain operations (Mianyang and Deyang branches). Supports three roles — store manager, chef, and duty manager — with 8 daily operational time slots. Duty manager submissions require store manager approval; other roles auto-approve. Built with Supabase Realtime for cross-device state sync.",
        zh: "面向真实连锁餐厅（绵阳/德阳店）运营场景的角色扮演任务管理 PWA。支持店长、厨师、值班经理三种角色，按 8 个运营时段分配任务。值班经理提交需店长审核，其余角色自动批准。使用 Supabase Realtime 跨设备同步，Promise.all 并行查询优化性能。"
      },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["React", "TypeScript", "Next.js", "Supabase", "PostgreSQL", "PWA", "Supabase Realtime"],
      featured: false,
      challenges: {
        en: "Designing a multi-role approval workflow that handles concurrent submissions across restaurant locations while keeping UI responsive and task states consistent across all connected devices.",
        zh: "设计一个多角色审批工作流，处理跨餐厅门店的并发提交，同时保持 UI 响应性和所有连接设备之间任务状态的一致性。"
      },
      solutions: {
        en: "Used Supabase Realtime subscriptions for instant state synchronization across devices, optimized load time with parallel database queries via Promise.all, and designed role-based conditional approval logic in PostgreSQL row-level security.",
        zh: "通过 Supabase Realtime 订阅实现跨设备即时状态同步，使用 Promise.all 并行数据库查询减少加载时间，并在 PostgreSQL 行级安全策略中设计了基于角色的条件审批逻辑。"
      },
      githubUrl: "https://github.com/JeremyDong22/RoleplayOfSmartICE",
      liveUrl: "https://roleplay.smartice.ai"
    },
    {
      id: 13,
      title: {
        en: "EchoOfSmartICE – Restaurant Questionnaire Admin Panel",
        zh: "EchoOfSmartICE – 餐厅问卷管理系统后台"
      },
      description: {
        en: "React + TypeScript admin panel for managing restaurant customer questionnaires. Features QR code generation and management for table-side survey access, A/B testing for different questionnaire variants, and response analytics. Designed for restaurant chains to collect and analyze customer satisfaction data at scale.",
        zh: "用于管理餐厅顾客问卷的 React + TypeScript 管理后台。具有桌边问卷 QR 码生成与管理、不同问卷版本的 A/B 测试和回答分析功能。为连锁餐厅大规模收集和分析顾客满意度数据而设计。"
      },
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["React", "TypeScript", "Supabase", "QR Code API", "A/B Testing"],
      featured: false,
      challenges: {
        en: "Building a scalable QR code management system that handles multiple restaurant locations and questionnaire variants while providing meaningful A/B testing analytics.",
        zh: "构建一个可扩展的 QR 码管理系统，能够处理多个餐厅门店和问卷版本，同时提供有意义的 A/B 测试分析。"
      },
      solutions: {
        en: "Implemented a table-aware QR code generation system encoding location and questionnaire variant metadata, and built aggregated analytics views in Supabase for cross-location A/B test performance comparison.",
        zh: "实现了感知桌位的 QR 码生成系统，编码了位置和问卷版本元数据，并在 Supabase 中构建了聚合分析视图，用于跨门店 A/B 测试性能比较。"
      },
      githubUrl: "https://github.com/JeremyDong22/echo-of-smartice",
      liveUrl: "https://echo.smartice.ai"
    },
    {
      id: 14,
      title: {
        en: "KBDOfSmartICE – Store Opening/Closing Check-in System",
        zh: "KBD 开闭店打卡系统 – 连锁餐厅地图化打卡"
      },
      description: {
        en: "Restaurant chain opening and closing check-in system with a map-based interface. Staff confirm store opening and closing procedures through a geolocation-aware map UI, ensuring operational compliance across all chain locations. Built with TypeScript for type-safe multi-location management.",
        zh: "连锁餐厅开闭店打卡系统，配备地图化界面。员工通过感知地理位置的地图 UI 确认门店开店和闭店流程，确保全链条门店的运营合规性。使用 TypeScript 构建，实现类型安全的多门店管理。"
      },
      image: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["TypeScript", "React", "Map API", "Geolocation", "Supabase"],
      featured: false,
      challenges: {
        en: "Ensuring reliable geolocation-based check-in across different restaurant locations with varying GPS accuracy, and building a real-time compliance monitoring dashboard for operations managers.",
        zh: "在不同餐厅门店确保可靠的基于地理位置的打卡，处理不同 GPS 精度的差异，并为运营经理构建实时合规性监控仪表板。"
      },
      solutions: {
        en: "Implemented geofencing with configurable radius per location, added fallback manual verification for GPS-challenged environments, and built a real-time multi-location compliance dashboard using Supabase subscriptions.",
        zh: "实现了每个门店可配置半径的地理围栏，在 GPS 受限环境中添加了后备手动验证，并使用 Supabase 订阅构建了实时多门店合规性仪表板。"
      },
      githubUrl: "https://github.com/JeremyDong22/KBDOfSmartICE",
      liveUrl: "https://kbd.smartice.ai"
    },
    {
      id: 15,
      title: {
        en: "NongYueYue – Agricultural Products Trading Platform",
        zh: "农悦悦 – 农产品交易平台 Web Demo"
      },
      description: {
        en: "WeChat Mini Program web demo for the NongYueYue agricultural trading platform. Supports three roles (buyer, seller/farmer, driver) through a complete order lifecycle: creation, confirmation, payment QR code, delivery, proof upload, and sign-off. Covers 13 feature pages with mobile-first design and full mock data.",
        zh: "农悦悦微信小程序的 Web 浏览器 Demo，支持买方（采购商）、卖方（农户）、司机三种角色，覆盖订单从创建到签收的完整流程，共 13 个功能页面，手机端视图优先设计，含完整 Mock 数据。"
      },
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["HTML5", "CSS3", "JavaScript", "WeChat Mini Program Logic", "Mock Data"],
      featured: false,
      challenges: {
        en: "Translating complex WeChat Mini Program logic and UI patterns into a standard web browser demo while accurately representing all three user role flows and the full order lifecycle.",
        zh: "将复杂的微信小程序逻辑和 UI 模式转化为标准浏览器 Demo，同时准确呈现所有三种用户角色流程和完整订单生命周期。"
      },
      solutions: {
        en: "Built a role-switching demo interface letting evaluators experience all three perspectives, implemented a state machine for order status transitions, and created comprehensive mock data covering realistic farm-to-buyer scenarios.",
        zh: "构建了角色切换 Demo 界面，让评估者体验三种视角；实现了订单状态转换的状态机；创建了涵盖真实农场到买家场景的全面 Mock 数据。"
      },
      githubUrl: "https://github.com/JeremyDong22/NongYueYue",
      liveUrl: null
    },
    {
      id: 16,
      title: {
        en: "Mansion of SmartICE – Interactive Digital Menu",
        zh: "智能冰点大厦 – 交互式数字餐厅菜单"
      },
      description: {
        en: "Interactive digital menu application for the SmartICE Mansion restaurant showcasing authentic Yunnan cuisine. Provides an immersive browsing experience for restaurant patrons with visually rich dish presentations, ingredient details, and ordering guidance.",
        zh: "为智能冰点大厦餐厅设计的交互式数字菜单应用，展示地道云南菜肴。为餐厅顾客提供沉浸式浏览体验，包含视觉丰富的菜品展示、食材详情和点餐引导。"
      },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["Next.js", "React", "JavaScript", "Responsive Design"],
      featured: false,
      challenges: {
        en: "Creating a visually rich menu experience that performs well on tablets and phones while accurately representing the visual appeal of Yunnan cuisine dishes.",
        zh: "创建一个在平板和手机上表现良好的视觉丰富菜单体验，同时准确呈现云南菜肴的视觉吸引力。"
      },
      solutions: {
        en: "Designed a card-based menu layout with large food photography, implemented smooth category navigation, and optimized image loading with lazy loading and responsive image sizing.",
        zh: "设计了带有大型食物摄影的卡片式菜单布局，实现了流畅的分类导航，并通过懒加载和响应式图片尺寸优化了图片加载性能。"
      },
      githubUrl: "https://github.com/JeremyDong22/MansionOfSmartICE",
      liveUrl: "https://mansion.smartice.ai"
    },
    {
      id: 17,
      title: {
        en: "SoloOfSmartICE – Team Learning & Knowledge Sharing Platform",
        zh: "SoloOfSmartICE – 团队学习与知识共享平台"
      },
      description: {
        en: "SmartICE internal team website for knowledge sharing, learning resources, and team collaboration. Features bilingual support (Chinese/English) with a navigation-bar language toggle, deployed on Vercel for the SmartICE restaurant tech team.",
        zh: "SmartICE 团队内部网站，用于知识共享、学习资源和团队协作。支持中英双语，通过导航栏语言切换，部署于 Vercel，服务于 SmartICE 餐饮科技团队。"
      },
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["Next.js", "React", "Tailwind CSS", "next-i18next", "Vercel"],
      featured: false,
      challenges: {
        en: "Building an internal knowledge platform serving the diverse learning needs of a restaurant tech team with members at different technical levels.",
        zh: "构建一个能够满足餐饮科技团队不同技术水平成员多样化学习需求的内部知识平台。"
      },
      solutions: {
        en: "Implemented next-i18next for seamless bilingual support, organized content into role-based sections (technical vs. operational), and deployed with Vercel for zero-maintenance hosting.",
        zh: "使用 next-i18next 实现无缝双语支持，将内容组织为基于角色的区域（技术与运营），并使用 Vercel 进行零维护托管。"
      },
      githubUrl: "https://github.com/JeremyDong22/SoloOfSmartICE",
      liveUrl: "https://solo.smartice.ai"
    },
    {
      id: 18,
      title: {
        en: "Reimbursement PWA – SmartICE Expense Tracker",
        zh: "报销管理 PWA – 实时费用报销追踪"
      },
      description: {
        en: "Progressive Web App for tracking and managing expense reimbursements with real-time sync across devices. Designed for the SmartICE restaurant team to submit, track, and approve expense claims with photo receipt upload and status notifications.",
        zh: "用于追踪和管理费用报销的 PWA，支持跨设备实时同步。为 SmartICE 餐饮团队设计，支持提交、追踪和审批费用申请，含照片凭证上传和状态通知功能。"
      },
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["HTML5", "CSS3", "JavaScript", "PWA", "Supabase", "Real-time Sync"],
      featured: false,
      challenges: {
        en: "Building a reliable offline-capable PWA for expense tracking in restaurant environments where connectivity can be intermittent, while maintaining real-time sync when online.",
        zh: "在网络连接可能不稳定的餐厅环境中构建可靠的离线 PWA 用于费用追踪，同时在联网时保持实时同步。"
      },
      solutions: {
        en: "Implemented service worker caching for offline functionality, used IndexedDB for local data persistence, and built a conflict resolution mechanism for syncing offline-created records to Supabase when connectivity restored.",
        zh: "实现了 Service Worker 缓存用于离线功能，使用 IndexedDB 进行本地数据持久化，并构建了冲突解决机制，在网络恢复时将离线记录同步到 Supabase。"
      },
      githubUrl: "https://github.com/JeremyDong22/reimbursement-smartice",
      liveUrl: "https://payoff.smartice.ai"
    },
    {
      id: 19,
      title: {
        en: "SightLink – Smart Badge Hardware Assembly Guide",
        zh: "SightLink – 智能抓拍工牌硬件组装交互指南"
      },
      description: {
        en: "Interactive hardware assembly and operation guide for the SightLink intelligent employee badge system. The SightLink badge features automatic face capture and identification capabilities. This web-based guide walks technicians through device assembly, configuration, and troubleshooting steps with progress tracking.",
        zh: "SightLink 智能员工工牌系统的交互式硬件组装与操作指南。SightLink 工牌具有自动人脸抓拍与识别功能。这个基于 Web 的指南引导技术人员逐步完成设备组装、配置和故障排除，并追踪进度。"
      },
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["HTML5", "CSS3", "JavaScript", "Interactive Step Guide"],
      featured: false,
      challenges: {
        en: "Creating a clear, step-by-step hardware assembly guide that non-technical restaurant staff could follow independently for deploying the SightLink badge system.",
        zh: "创建清晰的逐步硬件组装指南，使非技术餐厅员工能够独立完成 SightLink 工牌系统的部署。"
      },
      solutions: {
        en: "Built an interactive step-by-step web guide with visual aids, progress tracking, and validation checkpoints to ensure correct assembly before proceeding to the next step.",
        zh: "构建了带有视觉辅助、进度追踪和验证检查点的交互式逐步 Web 指南，确保在进入下一步之前正确完成组装。"
      },
      githubUrl: "https://github.com/JeremyDong22/sightlink-hardware-guide",
      liveUrl: null
    },
    // ===== DATA ENGINEERING & CRAWLERS =====
    {
      id: 20,
      title: {
        en: "XHS Multi-Account Crawler & AI Annotation Platform",
        zh: "小红书多账号爬取与 AI 数据标注平台"
      },
      description: {
        en: "Full-stack data collection and AI labeling platform for Xiaohongshu (REDNote). FastAPI backend manages multiple isolated Chrome account instances via Playwright, scrapes posts by keyword, and feeds images/text to Gemini Flash for automatic classification. Next.js dashboard provides real-time SSE-based browser status monitoring and a data laundry visualization page.",
        zh: "面向小红书的全栈数据采集与 AI 标注平台。FastAPI 后端通过 Playwright 管理多个独立 Chrome 账号实例，按关键词自动爬取帖子并推送给 Gemini Flash 进行图文分类标注。Next.js 前端通过 SSE 实时展示浏览器状态与数据清洗可视化。"
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      category: "data",
      technologies: ["Python", "FastAPI", "Playwright", "Google Gemini Flash", "Next.js 16", "React 19", "PostgreSQL", "SSE"],
      featured: true,
      challenges: {
        en: "Managing multiple browser sessions simultaneously without account conflicts, handling CDN URL expiration for scraped images, and streaming real-time browser status to the frontend.",
        zh: "同时管理多个浏览器会话而不产生账号冲突，处理爬取图片的 CDN URL 过期问题，以及将实时浏览器状态流式传输到前端。"
      },
      solutions: {
        en: "Isolated each account in a separate Chrome profile directory, implemented local image caching to bypass CDN expiration, and used Server-Sent Events (SSE) for lightweight real-time status push without WebSocket overhead.",
        zh: "为每个账号使用独立的 Chrome Profile 目录进行隔离，实现本地图片缓存绕过 CDN 过期，使用 SSE 进行轻量级实时状态推送，避免了 WebSocket 的额外开销。"
      },
      githubUrl: "https://github.com/JeremyDong22/XHSCOfSmartICE",
      liveUrl: null
    },
    {
      id: 21,
      title: {
        en: "XHS Crawler + Supabase Pipeline",
        zh: "小红书爬虫与 Supabase 数据管道"
      },
      description: {
        en: "Automated content harvesting tool for Xiaohongshu that extracts posts, images, and engagement metrics via Selenium Chrome automation. Filters content by minimum like count and uploads both metadata and images to Supabase database and storage. Keyword-driven search with configurable engagement thresholds.",
        zh: "通过 Selenium Chrome 自动化提取小红书帖子、图片和互动数据的内容采集工具。按最低点赞数过滤内容，将元数据和图片上传至 Supabase 数据库和存储，关键词驱动搜索，可配置过滤阈值。"
      },
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80",
      category: "data",
      technologies: ["Python", "Selenium", "Chrome WebDriver", "Supabase", "PostgreSQL"],
      featured: false,
      challenges: {
        en: "Reliably scraping a mobile-first JavaScript-heavy platform with dynamic content loading and anti-bot measures while maintaining a stable image upload pipeline to cloud storage.",
        zh: "可靠地爬取以 JavaScript 渲染为主、有反爬机制的移动优先平台，同时维护稳定的图片上传管道到云端存储。"
      },
      solutions: {
        en: "Implemented human-like browser interaction patterns with randomized delays, used explicit waits for dynamic content loading, and built a retry mechanism for failed image uploads to Supabase storage.",
        zh: "实现了带有随机延迟的类人浏览器交互模式，使用显式等待处理动态内容加载，并为 Supabase 存储的失败图片上传构建了重试机制。"
      },
      githubUrl: "https://github.com/JeremyDong22/XHS_Crawler_supabase",
      liveUrl: null
    },
    {
      id: 22,
      title: {
        en: "JD Price Intelligence Crawler",
        zh: "京东价格智能爬虫工具"
      },
      description: {
        en: "Multi-approach JD.com product scraper with smart page detection and human-like browser interaction. Combines Selenium, Pyppeteer, image recognition (OpenCV + PyAutoGUI), and BeautifulSoup to navigate anti-scraping measures. Includes a Flask web interface for search and results viewing, and detects price variations across product listings.",
        zh: "多方案京东商品爬虫，具有智能页面检测和类人浏览器交互。结合 Selenium、Pyppeteer、图像识别（OpenCV + PyAutoGUI）和 BeautifulSoup 绕过反爬措施。包含 Flask Web 界面用于搜索和结果查看，可检测商品列表中的价格变动。"
      },
      image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&auto=format&fit=crop&q=80",
      category: "data",
      technologies: ["Python", "Selenium", "Pyppeteer", "BeautifulSoup", "Flask", "PyAutoGUI", "OpenCV"],
      featured: false,
      challenges: {
        en: "JD.com's sophisticated anti-scraping system includes behavioral analysis, CAPTCHA challenges, and dynamic page structure changes that break simple element selectors.",
        zh: "京东复杂的反爬系统包含行为分析、验证码挑战和破坏简单元素选择器的动态页面结构变化。"
      },
      solutions: {
        en: "Combined multiple browser automation approaches with computer vision (OpenCV) for visual element detection when DOM selectors fail, and implemented randomized human-like mouse movements and timing via PyAutoGUI.",
        zh: "结合多种浏览器自动化方法，当 DOM 选择器失效时使用计算机视觉（OpenCV）进行视觉元素检测，并通过 PyAutoGUI 实现随机的类人鼠标移动和时序。"
      },
      githubUrl: "https://github.com/JeremyDong22/JD_Price_Crawler",
      liveUrl: null
    },
    {
      id: 23,
      title: {
        en: "Dianping Crawler – AI Screenshot-to-Data Pipeline",
        zh: "大众点评爬虫 – AI 图像识别餐厅数据采集"
      },
      description: {
        en: "Automated tool to collect restaurant ranking data from the Dianping app using a four-step pipeline: UI positioning via PyAutoGUI, screenshot capture, AI image analysis via Google Gemini Vision, and upload to Supabase. Bypasses Dianping's web restrictions by operating at the app screenshot level — no DOM access required.",
        zh: "通过四步管道从大众点评 App 采集餐厅排名数据：PyAutoGUI UI 定位 → 截图采集 → Google Gemini AI 图像识别文字 → 上传至 Supabase。通过在 App 截图层面操作，绕过大众点评的网页访问限制，无需 DOM 访问。"
      },
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&auto=format&fit=crop&q=80",
      category: "data",
      technologies: ["Python", "PyAutoGUI", "Pillow", "Google Gemini Vision", "Supabase"],
      featured: false,
      challenges: {
        en: "Dianping blocks web scraping and API access, requiring an alternative approach to reliably extract structured data from mobile app screenshots with varying UI states.",
        zh: "大众点评屏蔽了网页爬取和 API 访问，需要一种能够从具有不同 UI 状态的移动应用截图中可靠提取结构化数据的替代方案。"
      },
      solutions: {
        en: "Developed an AI-powered screenshot analysis pipeline using Google Gemini's vision capabilities to extract restaurant names, ratings, rankings, and review counts from raw app screenshots, eliminating the need for DOM parsing.",
        zh: "开发了使用 Google Gemini 视觉能力的 AI 驱动截图分析管道，从原始 App 截图中提取餐厅名称、评分、排名和评价数量，消除了对 DOM 解析的需求。"
      },
      githubUrl: "https://github.com/JeremyDong22/dazhongdianping_crawler",
      liveUrl: null
    },
    {
      id: 24,
      title: {
        en: "SmartICE Database – Restaurant Chain PostgreSQL Schema",
        zh: "SmartICE 数据库 – 连锁餐厅 PostgreSQL 数据库架构"
      },
      description: {
        en: "Complete PostgreSQL database design for a multi-brand restaurant chain (2 brands, 6+ stores, scalable to 50). Features a dual cost-rate financial analysis system (standard vs. actual), multi-level BOM recipe management with 10-level ingredient nesting, inventory with batch tracking, RBAC permissions, and pgcrypto-encrypted cost data. 28 core tables with stored procedures, triggers, and audit logs.",
        zh: "面向多品牌连锁餐厅（2 品牌、6 门店以上，可扩展至 50 家）的完整 PostgreSQL 数据库设计。双成本率财务分析体系、10 层配料嵌套多级 BOM 食谱管理、批次追踪库存管理、RBAC 权限控制、pgcrypto 成本数据加密。28 张核心数据表，含存储过程、触发器和审计日志。"
      },
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
      category: "data",
      technologies: ["PostgreSQL 14+", "pgcrypto", "uuid-ossp", "pg_trgm", "SQL", "Stored Procedures", "Triggers"],
      featured: false,
      challenges: {
        en: "Designing a database schema flexible enough to support multiple restaurant brands with different menus while providing unified financial reporting and scaling from 6 to 50 locations.",
        zh: "设计一个足够灵活的数据库 Schema，支持具有不同菜单的多个餐厅品牌，同时提供统一的财务报告，并从 6 家扩展到 50 家门店。"
      },
      solutions: {
        en: "Implemented a brand-agnostic schema with brand-specific configuration tables, used recursive CTEs for multi-level BOM ingredient calculations, and applied pgcrypto for cost data encryption to protect sensitive financial information.",
        zh: "实现了带有品牌特定配置表的品牌无关 Schema，使用递归 CTE 进行多级 BOM 配料计算，并应用 pgcrypto 对成本数据加密以保护敏感财务信息。"
      },
      githubUrl: "https://github.com/JeremyDong22/SmartIce-Database",
      liveUrl: null
    },
    // ===== AUTOMATION & SYSTEMS =====
    {
      id: 25,
      title: {
        en: "Taobao / Tmall MCP Server for AI Assistants",
        zh: "淘宝 / 天猫 AI 助手 MCP 服务器"
      },
      description: {
        en: "Model Context Protocol (MCP) server that lets AI assistants like Claude directly call tools to scrape Taobao / Tmall product data. Accepts multiple input formats (product ID, direct URL, short link, or Chinese share text). Maintains a persistent Playwright browser session to preserve login state and returns structured Markdown with images, specs, reviews, and Q&A.",
        zh: "让 Claude 等 AI 助手直接调用工具爬取淘宝/天猫商品数据的 MCP 服务器。支持多种输入格式（商品 ID、直链、短链、含链接的中文分享文本）。通过持久化 Playwright 浏览器 Session 保持登录状态，输出包含图片、规格参数、评价、问答的结构化 Markdown。"
      },
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Python", "Playwright", "MCP (Model Context Protocol)", "Chromium headless", "uv"],
      featured: false,
      challenges: {
        en: "Handling multiple input formats including obfuscated short links and Chinese share text with embedded URLs, while maintaining a persistent browser session to avoid repeated CAPTCHA challenges.",
        zh: "处理包括混淆短链接和含嵌入 URL 的中文分享文本在内的多种输入格式，同时维护浏览器 Session 持久性以避免重复的验证码挑战。"
      },
      solutions: {
        en: "Built a multi-format URL resolver handling all common Taobao link formats, implemented a persistent Playwright browser context with session storage, and designed a structured Markdown output format optimized for AI consumption.",
        zh: "构建了处理所有常见淘宝链接格式的多格式 URL 解析器，实现了带会话存储的持久化 Playwright 浏览器上下文，并设计了针对 AI 消费优化的结构化 Markdown 输出格式。"
      },
      githubUrl: "https://github.com/JeremyDong22/taobao_mcp",
      liveUrl: null
    },
    {
      id: 26,
      title: {
        en: "Roleplay Report MCP – Restaurant KPI Query Server",
        zh: "Roleplay Report MCP – 餐厅 KPI 数据查询服务器"
      },
      description: {
        en: "Model Context Protocol (MCP) server exposing two tools to AI agents: schema exploration and custom SQL query execution against a roleplay_daily_reports Supabase materialized view tracking 57 KPIs across 4 restaurants. Read-only with SQL injection prevention via Pydantic validation. Integrates with Claude Code via .mcp.json for direct AI-powered analytics.",
        zh: "MCP 服务器向 AI 智能体暴露两个工具：Schema 探索和自定义 SQL 查询执行，查询 Supabase 物化视图追踪 4 家餐厅的 57 个 KPI 指标。只读访问，通过 Pydantic 验证防止 SQL 注入，通过 .mcp.json 与 Claude Code 集成实现 AI 驱动的数据分析。"
      },
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Python 3.11+", "MCP Protocol", "Supabase", "Pydantic", "uv", "Claude Code"],
      featured: false,
      challenges: {
        en: "Exposing restaurant operational data to AI agents in a safe, read-only manner while allowing flexible enough SQL querying to answer diverse business intelligence questions.",
        zh: "以安全、只读的方式向 AI 智能体暴露餐厅运营数据，同时允许足够灵活的 SQL 查询来回答多样化的商业智能问题。"
      },
      solutions: {
        en: "Implemented strict SQL query validation via Pydantic to block writes and DDL while allowing SELECT queries, and built a schema exploration tool that lets AI agents discover the data structure before formulating queries.",
        zh: "通过 Pydantic 实现严格的 SQL 查询验证，阻止写入/DDL 操作同时允许 SELECT 查询；构建了 Schema 探索工具，让 AI 智能体在制定查询前发现数据结构。"
      },
      githubUrl: "https://github.com/JeremyDong22/roleplay-report-mcp",
      liveUrl: null
    },
    {
      id: 27,
      title: {
        en: "Printer Faker – Virtual POS Thermal Printer",
        zh: "Printer Faker – 虚拟 POS 热敏打印机服务"
      },
      description: {
        en: "TCP service that masquerades as a thermal printer on port 9100, intercepting ESC/POS commands from any POS terminal without physical hardware. Parses raw printer commands into structured receipt data, exposes a REST API for downstream consumption, and syncs orders to Supabase via Cloudflare Workers. Designed for 24/7 production with systemd supervision and automatic log rotation.",
        zh: "在 9100 端口伪装成热敏打印机的 TCP 服务，无需实体硬件即可拦截任意 POS 终端的 ESC/POS 指令。将原始打印命令解析为结构化小票数据，通过 REST API 对外暴露，并经 Cloudflare Workers 实时同步至 Supabase。搭配 systemd 守护进程和日志轮转设计用于 7x24 生产环境运行。"
      },
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Python", "Flask", "ESC/POS Protocol", "SQLite", "systemd", "Cloudflare Workers", "Supabase"],
      featured: false,
      challenges: {
        en: "Accurately parsing the binary ESC/POS printer protocol to extract human-readable receipt content, and ensuring the service remained stable for 24/7 operation in a production restaurant environment.",
        zh: "准确解析二进制 ESC/POS 打印机协议以提取人类可读的小票内容，并确保服务在生产餐厅环境中 7x24 稳定运行。"
      },
      solutions: {
        en: "Implemented a complete ESC/POS command parser covering text formatting, line breaks, and cut commands. Used systemd with automatic restart, a health monitoring endpoint, and log rotation for production reliability.",
        zh: "实现了涵盖文本格式化、换行和切纸命令的完整 ESC/POS 命令解析器。使用 systemd 配合自动重启、健康监控端点和日志轮转，保证生产可靠性。"
      },
      githubUrl: "https://github.com/JeremyDong22/printer_faker",
      liveUrl: null
    },
    {
      id: 28,
      title: {
        en: "Logistics Aggregation Solution – AI Shipping Query System",
        zh: "菜鸟物流聚合系统 – AI 自然语言运费查询"
      },
      description: {
        en: "Intelligent logistics price query system with an AI-powered natural language chat interface. Users can query shipping costs by item type, weight, and destination country in plain Chinese — the AI estimates item weight automatically when not specified. Built in two weeks using Node.js, Express, SQLite3, and OpenAI GPT-3.5-turbo.",
        zh: "具有 AI 自然语言对话界面的智能物流价格查询系统。用户可用纯中文按物品类型、重量和目的地国家查询运费，未指定重量时 AI 自动估算物品重量。两周内使用 Node.js、Express、SQLite3 和 OpenAI GPT-3.5-turbo 构建。"
      },
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Node.js", "Express.js", "SQLite3", "OpenAI GPT-3.5-turbo", "JavaScript"],
      featured: false,
      challenges: {
        en: "Designing a conversational AI interface that could accurately interpret shipping queries in natural Chinese and map them to specific logistics carrier pricing rules with varying weight thresholds.",
        zh: "设计一个能够准确解释中文自然语言运输查询并将其映射到具有不同重量阈值的特定物流承运商定价规则的对话式 AI 界面。"
      },
      solutions: {
        en: "Implemented a structured prompt system for GPT-3.5-turbo to extract query parameters (item type, weight, destination) from free-form Chinese text, then applied decision logic against the SQLite carrier pricing database.",
        zh: "实现了 GPT-3.5-turbo 的结构化提示系统，从自由形式的中文文本中提取查询参数（物品类型、重量、目的地），然后对 SQLite 承运商定价数据库应用决策逻辑。"
      },
      githubUrl: "https://github.com/JeremyDong22/Logistics-Aggregation-Solution",
      liveUrl: null
    },
    {
      id: 29,
      title: {
        en: "Jermi – Anchored Terminal File Manager (Rust)",
        zh: "Jermi – 锚点式终端文件管理器（Rust）"
      },
      description: {
        en: "A fork of Yazi (blazing-fast async terminal file manager written in Rust) introducing anchor navigation — the root directory stays pinned to the leftmost panel while navigating deeper, similar to VSCode's Explorer sidebar. Shift+Arrow keys dynamically adjust the project root without losing context. Inherits Yazi's async I/O, syntax highlighting, image preview (Kitty/iTerm2/Sixel), and Lua plugin system.",
        zh: "基于 Yazi（高性能 Rust 异步终端文件管理器）的 fork，引入锚点导航机制——向深层目录导航时根目录始终固定在最左侧面板，类似 VSCode 的资源管理器侧边栏。Shift+方向键动态调整项目根目录而不丢失上下文。继承 Yazi 全部异步 I/O、语法高亮、图片预览（Kitty/iTerm2/Sixel）和 Lua 插件能力。"
      },
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Rust", "Async I/O", "Lua Plugin System", "Kitty Protocol", "Sixel", "Terminal UI"],
      featured: false,
      challenges: {
        en: "Modifying Yazi's existing panel navigation system to support anchored root directories while maintaining all existing keybindings, plugin compatibility, and the async performance of the original codebase.",
        zh: "修改 Yazi 现有的面板导航系统以支持锚点根目录，同时维持所有现有快捷键、插件兼容性和原有代码库的异步性能特性。"
      },
      solutions: {
        en: "Introduced an anchor state variable in the panel manager that persists the leftmost panel's path independently of navigation depth, and added Shift+Arrow keybindings that update only the anchor reference without disrupting the navigation stack.",
        zh: "在面板管理器中引入了 anchor 状态变量，使最左侧面板的路径独立于导航深度持久保存，并添加了仅更新锚点引用而不影响导航栈的 Shift+方向键绑定。"
      },
      githubUrl: "https://github.com/JeremyDong22/Jermi",
      liveUrl: null
    },
    {
      id: 30,
      title: {
        en: "Linux Push-to-Talk STT – SenseVoice Transcription",
        zh: "Linux 语音转文字 – SenseVoice 即按即说工具"
      },
      description: {
        en: "Lightweight push-to-talk speech-to-text tool for Linux using the SenseVoice model. Hold the Control key to record audio, release to trigger transcription. Designed as a developer productivity tool for hands-free text input directly in the terminal without cloud dependency.",
        zh: "使用 SenseVoice 模型的轻量级 Linux 即按即说语音转文字工具。按住 Control 键录音，松开触发转录。作为开发者生产力工具设计，用于终端的免手动文字输入，无需云端依赖。"
      },
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Python", "SenseVoice", "Linux", "PyAudio", "Keyboard Hooks"],
      featured: false,
      challenges: {
        en: "Implementing reliable push-to-talk audio capture on Linux with minimal latency between key release and transcription output, while running SenseVoice efficiently on CPU without GPU acceleration.",
        zh: "在 Linux 上实现可靠的即按即说音频捕获，在按键松开和转录输出之间最小化延迟，同时在无 GPU 加速的 CPU 上高效运行 SenseVoice。"
      },
      solutions: {
        en: "Used Python keyboard hooks for Control key detection, implemented PyAudio for real-time audio buffer capture, and optimized SenseVoice inference for low-latency response on consumer hardware.",
        zh: "使用 Python 键盘钩子检测 Control 键，通过 PyAudio 实现实时音频缓冲采集，并针对消费级硬件优化 SenseVoice 推理以实现低延迟响应。"
      },
      githubUrl: "https://github.com/JeremyDong22/linux-stt",
      liveUrl: null
    }
  ];

  // Filter and sort: live-URL projects first, then by id (date order)
  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    const sorted = [...filtered].sort((a, b) => {
      const aLive = a.liveUrl ? 0 : 1;
      const bLive = b.liveUrl ? 0 : 1;
      if (aLive !== bLive) return aLive - bLive;
      return a.id - b.id;
    });
    setFilteredProjects(sorted);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  // Handle filter click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };
  
  // Handle modal open/close
  const handleOpenModal = (project) => {
    setModalProject(project);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-dark text-light min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <ProjectsHero
        title={translations.hero.title[language]}
        subtitle={translations.hero.subtitle[language]}
        language={language}
      />
      
      {/* Projects Section */}
      <Section className="py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(translations.filters).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => handleFilterClick(key)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                activeFilter === key
                  ? 'bg-primary text-dark'
                  : 'bg-dark text-light hover:bg-primary/20 border border-primary/20'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {value[language]}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="h-[480px]"
                style={{ 
                  display: 'flex',
                  width: '100%'
                }}
              >
                <ProjectCard
                  project={project}
                  language={language}
                  index={index}
                  onViewDetails={handleOpenModal}
                  isFeatured={project.featured}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
      
      {/* Project Details Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
        translations={translations}
      />
      
      <Footer />
    </div>
  );
};

export default Projects; 