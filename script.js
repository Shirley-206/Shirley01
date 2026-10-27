const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.desktop-nav a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.classList.remove('open');
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active'));
  filter.classList.add('active');
  const selected = filter.dataset.filter;
  cards.forEach((card) => card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected));
}));

const projectData = {
  echoes: { title: '《回声里的蓝》', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85', description: '一个关于记忆如何被重新生成的短片实验。女孩在一座没有天气的城市里寻找母亲留下的声音。', tags: ['AI 短片', '导演', 'Runway', '2024'] },
  tide: { title: '潮汐之后', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', description: '为生活方式品牌创作的概念影像，用潮汐、风和人的皮肤，讲述一种缓慢但有力量的日常。', tags: ['品牌影像', '概念生成', 'Midjourney', '2024'] },
  flora: { title: 'Flora / 形态练习', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85', description: '一组关于生长、变形和观看的视觉片段。让模型的偶然性成为一种新的花语。', tags: ['视觉实验', 'ComfyUI', '形态研究', '2023'] },
  afterimage: { title: 'Afterimage / 残像', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85', description: '当一段关系结束，留在房间里的光还会持续多久？一部关于离开之后的实验性叙事短片。', tags: ['AI 短片', '叙事', '后期', '2023'] },
  moonlit: { title: '月背面', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85', description: '一个孩子在月亮的背面寻找一座只在梦里出现的房子。关于孤独，也关于回家的路。', tags: ['AI 短片', '世界观', '分镜', '2022'] },
  softsignal: { title: 'Soft Signal', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85', description: '为新一代智能设备创作的空间影像，捕捉光线、材质和人与设备相处时的细微信号。', tags: ['品牌影像', '空间', '氛围', '2022'] },
};
const modal = document.querySelector('.project-modal');
cards.forEach((card) => card.addEventListener('click', () => {
  const data = projectData[card.dataset.project];
  if (!data || !modal) return;
  document.querySelector('#modal-title').textContent = data.title;
  document.querySelector('#modal-description').textContent = data.description;
  const image = document.querySelector('#modal-image');
  image.src = data.image;
  image.alt = data.title;
  document.querySelector('#modal-tags').innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  modal.showModal();
}));
document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('.play-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.classList.toggle('is-playing');
  button.querySelector('span').style.border = button.classList.contains('is-playing') ? '0' : '';
  button.querySelector('span').style.width = button.classList.contains('is-playing') ? '12px' : '';
  button.querySelector('span').style.height = button.classList.contains('is-playing') ? '14px' : '';
  button.querySelector('span').style.borderLeft = button.classList.contains('is-playing') ? '3px solid var(--acid)' : '';
  button.querySelector('span').style.borderRight = button.classList.contains('is-playing') ? '3px solid var(--acid)' : '';
});
