// Blog posts data — add new posts to the beginning of this array (newest first)
const blogPosts = [
  {
    id: 1,
    slug: 'mianyang-cursor-summer',
    date: '2025-06-15',
    title: {
      zh: '从全美第一院校流落到四川绵阳街头',
      en: 'From the #1 US University to the Streets of Mianyang',
    },
    excerpt: {
      zh: '有时候我觉得，人生的路径规划就是个伪命题。',
      en: 'Sometimes I think life planning is a false premise altogether.',
    },
    content: {
      zh: [
        { type: 'paragraph', text: '有时候我觉得，人生的路径规划就是个伪命题。' },
        { type: 'paragraph', text: '比如我，从UIUC（伊利诺伊大学香槟分校）毕业，手里拿着全美排名第一的会计专业学位。但我花了三年时间"速通"了这个专业，不是因为我多热爱，而是因为我太讨厌它了，只想赶紧结束这场折磨。毕业时，其实我是有机会去康奈尔的，他们甚至给了一学期两万美金的奖学金offer。听起来是个顺理成章的精英叙事，对吧？但我没去。' },
        { type: 'paragraph', text: '我转身选了一个只有一年学制的数据分析硕士。原因很简单：时代变了。在这个AI快要把桌子掀了的时代，顶着个传统商科学历，不如去攒点真正能保命的技术底牌。' },
        { type: 'paragraph', text: '毕业后，我没有顺理成章地去卷四大或者华尔街。我和另外一个对AI陷入狂热的朋友一拍即合，直接回国创业。特别好笑的是，我们俩都不是技术背景出身。如果放在十年前，两个不懂代码的人说要去做软件，大概率会被当成骗子。' },
        { type: 'paragraph', text: '但我们碰上了Cursor。' },
        { type: 'paragraph', text: 'Cursor是我们接触的第一个AI工具，也是我们真正意义上的"技术合伙人"。在拿它糊弄出几个Demo之后，我突然看透了一件事：只要你试错和迭代的速度足够快，你可以用它做任何跟软件开发有关的东西。' },
        { type: 'paragraph', text: '很多人对"学技术"有种执念，觉得必须先报个班，跟着课本从"Hello World"敲起，学完底层逻辑再来谈开发。这其实是错的。这就好比你想吃盘番茄炒蛋，非得先去考个厨师证。' },
        { type: 'paragraph', text: '真正的解法是：一头扎进场景里，找到客户的痛点，然后直接给他端上一盘"菜"（Deliverable）。如果这盘菜难吃，你再去看是盐放多了还是火候不够。' },
        { type: 'paragraph', text: '在这个过程中，你通常只会遇到两种问题：' },
        {
          type: 'list',
          items: [
            '第一，你的Deliverable在商业逻辑上就是个废物，压根没解决痛点；',
            '第二，你确实解决了问题，但技术层面崩了——比如网页加载太卡、数据没有持久化。',
          ],
        },
        { type: 'paragraph', text: '这时候，你再去学什么是缓存，什么是数据库。带着伤口去找药，才是最高效的迭代。在AI时代，阻挡大多数人的根本不是代码有多难，而是他们害怕"不知道自己不知道什么"，从而永远停留在准备阶段。' },
        { type: 'paragraph', text: '带着这种"不知天高地厚"的极客心态，我和合伙人决定去找真实的场景。找了一圈，最后机缘巧合地遇到了一位做餐饮的老板。他很支持我们，包吃包住还给点生活费，唯一的要求就是让我们想想，AI到底能怎么在他的门店里落地。' },
        { type: 'paragraph', text: '于是，四川绵阳的夏天，35到37度的高温下，门店外多了一个奇观：我搬了把椅子坐在街头，因为店里生意太火爆根本挤不进去。我就那么大汗淋漓地坐着，耳朵里塞着耳麦，整整听了两周店里的嘈杂声——服务员怎么点单、后厨怎么催菜、店长怎么沟通。我在用最原始的方法，解构这家餐厅的运行逻辑。' },
        { type: 'image', src: '/assets/images/blog/mianyang-vibe-coding.jpg', alt: '在绵阳餐厅外 vibe coding', caption: '萍姐火锅门口，金桂乌龙，和一堆报错。' },
        { type: 'paragraph', text: '两周后，我自认为找到了第一个可以降维打击的突破口：门店巡检。' },
        { type: 'paragraph', text: '我发现店长每天巡店，都需要拿着一张纸质的Checklist，走到一个地方打一个勾。总部想要检查，只能等一周或一个月后统一回收纸质表格。这太反人类了！我当即决定，用代码撸一个线上共享的To-Do List系统，让管理层随时能看到门店的打勾情况，实现代办事项的自动化追踪。' },
        { type: 'paragraph', text: '我以为我改变了餐饮界。直到系统上线，我迎来了创业以来的第一次响亮打脸。' },
        {
          type: 'images',
          items: [
            { src: '/assets/images/blog/roleplay-role-selection.png', alt: '角色选择界面' },
            { src: '/assets/images/blog/roleplay-task-overview.png', alt: '任务总览' },
            { src: '/assets/images/blog/roleplay-task-view.png', alt: '前厅管理任务视图' },
          ],
          caption: '这就是那个"改变餐饮界"的系统——角色扮演（RolePlay）。',
        },
        { type: 'paragraph', text: '一线员工根本不想用，甚至可以说是极其抗拒。为什么？因为我坐在空调房里设计的"按板块分类（比如水电、卫生、能源）"的线性逻辑，完全违背了店长巡店的"空间记忆逻辑"。' },
        { type: 'paragraph', text: '一个真实店长的巡店路径是：进门看门头，顺路看大厅桌面，走到深处看后厨，最后拐角看水电气。我的系统强行打断了他们的物理动线，逼着他们在手机上跳跃式地找选项。' },
        { type: 'paragraph', text: '更致命的是，我发现他们以前在纸上打勾，很多时候也只是应付检查。既然本来就不做，现在搬到线上，只是把"物理敷衍"变成了"赛博敷衍"，不仅增加了工作量，而且系统收集到的数据全是没有意义的假数据。' },
        { type: 'paragraph', text: '那一刻我明白了，在没有真实数据抓手的情况下，任何试图用软件去"管理"人性的产品，都是伪需求。' },
        { type: 'paragraph', text: '既然此路不通，那就立刻抛弃。没有任何沉没成本。' },
      ],
      en: [
        { type: 'paragraph', text: 'Sometimes I think life planning is a false premise altogether.' },
        { type: 'paragraph', text: 'Take me, for example. I graduated from UIUC (University of Illinois Urbana-Champaign) with a degree in accounting — the #1 ranked program in the country. But I spent three years "speedrunning" that major, not out of passion, but because I despised it and just wanted out. When I graduated, Cornell was on the table — they even offered me a $20,000-per-semester scholarship. Sounds like the classic elite narrative, right? I turned it down.' },
        { type: 'paragraph', text: 'Instead, I pivoted to a one-year master\'s in data analytics. The reason was simple: the world had changed. In an era where AI is flipping the table, a traditional business degree felt like the wrong bet. I wanted technical leverage — the kind that actually matters.' },
        { type: 'paragraph', text: 'After graduating, I didn\'t take the obvious path to Big Four or Wall Street. A friend equally obsessed with AI and I looked at each other, shrugged, and flew back to China to start a company. The funny part? Neither of us had a technical background. Ten years ago, two people who couldn\'t code claiming they\'d build software would\'ve been laughed out of the room.' },
        { type: 'paragraph', text: 'Then we found Cursor.' },
        { type: 'paragraph', text: 'Cursor was the first AI tool we touched — and effectively our third co-founder. After hacking together a few demos, something clicked: if you iterate fast enough, you can build almost anything software-related with it.' },
        { type: 'paragraph', text: 'A lot of people believe you have to "learn to code" first — take a course, start from Hello World, understand every layer before building anything real. That\'s wrong. It\'s like saying you need a culinary degree before you can scramble some eggs.' },
        { type: 'paragraph', text: 'The real move is to dive into a real scenario, find a customer\'s pain point, and put a deliverable in front of them. If it doesn\'t work, figure out whether it was the wrong problem or wrong execution.' },
        { type: 'paragraph', text: 'In practice, you\'ll hit one of two types of problems:' },
        {
          type: 'list',
          items: [
            'Your deliverable doesn\'t solve a real problem — the business logic was broken from the start.',
            'You solved the right problem, but the tech collapsed — slow load times, no data persistence, etc.',
          ],
        },
        { type: 'paragraph', text: 'That\'s when you go learn about caching, databases, whatever. Learning from wounds is the most efficient form of iteration. In the AI era, what holds most people back isn\'t the difficulty of code — it\'s the fear of "not knowing what they don\'t know," which keeps them perpetually in preparation mode.' },
        { type: 'paragraph', text: 'Armed with that blissfully overconfident hacker mindset, my co-founder and I went looking for real scenarios. We eventually stumbled into a relationship with a restaurant owner. He was generous — housing, meals, a stipend — and asked only that we figure out how AI could actually work on his shop floor.' },
        { type: 'paragraph', text: 'So there I was: Mianyang, Sichuan, summer, 35–37°C outside. The restaurant was so busy I couldn\'t get a seat inside. I dragged a chair onto the sidewalk and sat there sweating through my shirt, earbuds in, listening to the chaos of a working restaurant for two straight weeks — how servers took orders, how the kitchen managed tickets, how the manager coordinated everything. I was doing user research the old-fashioned way.' },
        { type: 'image', src: '/assets/images/blog/mianyang-vibe-coding.jpg', alt: 'Vibe coding outside the restaurant in Mianyang', caption: 'Outside Pingjie Hotpot. Gold osmanthus oolong, a stack of errors, and a city backdrop.' },
        { type: 'paragraph', text: 'Two weeks in, I thought I\'d found my first breakthrough: store inspection.' },
        { type: 'paragraph', text: 'I noticed the manager did daily walkthroughs with a paper checklist, ticking boxes as he moved through the space. HQ had to wait weeks to collect these forms. This seemed absurdly inefficient. I built a shared digital to-do system — managers could see real-time check-in status across all locations.' },
        { type: 'paragraph', text: 'I thought I had disrupted restaurant management. Then the system went live and I got my first proper humbling.' },
        {
          type: 'images',
          items: [
            { src: '/assets/images/blog/roleplay-role-selection.png', alt: 'Role selection screen' },
            { src: '/assets/images/blog/roleplay-task-overview.png', alt: 'Task overview' },
            { src: '/assets/images/blog/roleplay-task-view.png', alt: 'Front-of-house task view' },
          ],
          caption: 'RolePlay — the app that was going to "disrupt restaurant management."',
        },
        { type: 'paragraph', text: 'The frontline staff refused to use it. Why? Because the linear, category-based logic I designed from a comfortable chair — sorted by utilities, hygiene, energy — completely contradicted how a manager actually walks through a store.' },
        { type: 'paragraph', text: 'A real manager\'s path is spatial: entrance first, then the dining floor, then the kitchen, then the back corner for utilities. My system forced them to jump around a phone screen searching for items that didn\'t match their physical flow.' },
        { type: 'paragraph', text: 'Worse: I realized those paper checkboxes were never really about compliance. They were theater. Moving the theater online just transformed "physical checkbox-faking" into "digital checkbox-faking" — with more friction and completely useless data.' },
        { type: 'paragraph', text: 'I understood then: any product trying to "manage" human behavior through software, without a real data hook, is solving a fake problem.' },
        { type: 'paragraph', text: 'When a path is blocked, abandon it. No sunk cost.' },
      ],
    },
  },
];

export default blogPosts;
