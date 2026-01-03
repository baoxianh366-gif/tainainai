
import { Lesson, LessonStatus } from './types';

export const CURRICULUM: Lesson[] = [
  {
    id: 1,
    day: 1,
    title: "什么是量化？",
    description: "了解量化交易的基本概念。",
    category: "基础",
    status: LessonStatus.CURRENT,
    metaphor: "就像按照菜谱炒菜，而不是凭感觉放盐。"
  },
  {
    id: 2,
    day: 2,
    title: "市场的“菜市场”逻辑",
    description: "认识股票和买卖的基本原理。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "低价买进大白菜，等过节涨价了再卖出去。"
  },
  {
    id: 3,
    day: 3,
    title: "数据的力量",
    description: "为什么要看数字而不是听消息。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "不听邻居张大妈说哪家肉好，而是看哪家排队人多。"
  },
  {
    id: 4,
    day: 4,
    title: "认识“趋势”",
    description: "学会看价格是往上走还是往下走。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "看春天的小草是在往高了长，还是被风吹弯了腰。"
  },
  {
    id: 5,
    day: 5,
    title: "平均线的秘密",
    description: "学习最基础的量化指标：均线。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "看最近一周鸡蛋的平均价，判断今天的价格贵不贵。"
  },
  {
    id: 6,
    day: 6,
    title: "阶段复习：基础篇",
    description: "巩固前五天的知识点。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "把这周学的知识像整理毛线球一样理清楚。"
  },
  {
    id: 7,
    day: 7,
    title: "第一次模拟“买菜”",
    description: "尝试在图表上指出买卖点。",
    category: "基础",
    status: LessonStatus.LOCKED,
    metaphor: "在纸上画画，如果今天买入，明天能不能赚到一斤肉钱。"
  },
  {
    id: 8,
    day: 8,
    title: "如果...那么...",
    description: "量化逻辑的核心：条件判断。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "如果明天下雨，我们就带伞；如果股票跌了，我们就离场。"
  },
  {
    id: 9,
    day: 9,
    title: "多重保险：双均线",
    description: "两个指标一起看更准确。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "不仅看太阳，还要看云彩，两个都好才是大晴天。"
  },
  {
    id: 10,
    day: 10,
    title: "学会说“不”",
    description: "过滤噪音，不被波动干扰。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "隔壁敲锣打鼓不理它，我们要看真的开张没有。"
  },
  {
    id: 11,
    day: 11,
    title: "止损的智慧",
    description: "最重要的保护：跌多少必须离场。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "苹果烂了一小块要赶紧处理，别让一筐都烂了。"
  },
  {
    id: 12,
    day: 12,
    title: "止盈的艺术",
    description: "赚多少该落袋为安。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "果子熟了就要摘，别等它掉在地上烂了。"
  },
  {
    id: 13,
    day: 13,
    title: "仓位管理",
    description: "别把鸡蛋放在一个篮子里。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "买菜的钱和孙子的压岁钱要分开，不能全拿去投资。"
  },
  {
    id: 14,
    day: 14,
    title: "阶段复习：逻辑篇",
    description: "理清交易系统的脉络。",
    category: "逻辑",
    status: LessonStatus.LOCKED,
    metaphor: "把这些规矩像订家训一样记在心里。"
  },
  {
    id: 15,
    day: 15,
    title: "寻找“历史”",
    description: "回测：看看如果过去这么做会怎样。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "翻翻旧账本，看看去年的生意经今年还好使不。"
  },
  {
    id: 16,
    day: 16,
    title: "避开“陷阱”",
    description: "认识常见的欺骗信号。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "有些布料看着鲜艳，洗一水就缩水，得学会分辨。"
  },
  {
    id: 17,
    day: 17,
    title: "自动化助手",
    description: "认识执行算法：让电脑替你干活。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "就像用全自动洗衣机，设定好程序，你就去散步吧。"
  },
  {
    id: 18,
    day: 18,
    title: "心态调整",
    description: "量化不是发财，是纪律。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "得之坦然，失之淡然，像打太极一样平和。"
  },
  {
    id: 19,
    day: 19,
    title: "实战演练（一）",
    description: "制定你的第一份量化策略。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "写出你自己的拿手好菜配方。"
  },
  {
    id: 20,
    day: 20,
    title: "实战演练（二）",
    description: "模拟运行你的策略。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "试着炒一盘新口味的菜给家里人尝尝。"
  },
  {
    id: 21,
    day: 21,
    title: "毕业典礼",
    description: "总结21天的成果，开启量化之旅。",
    category: "实战",
    status: LessonStatus.LOCKED,
    metaphor: "穿上新衣服，你就是最时尚的量化太奶奶了！"
  },
];
