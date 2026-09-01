const localPosts = [
  { name: 'Maya Rao', initials: 'MR', text: 'Just deployed my first autoscaling social feed on Kubernetes! 🚀', likes: 24, liked: false, comments: ['This is a great DevOps demo!'] },
  { name: 'Aarav Mehta', initials: 'AM', text: 'The Service keeps the feed available even when Kubernetes adds more Pods.', likes: 18, liked: false, comments: [] },
  { name: 'Priya Nair', initials: 'PN', text: 'Learning about Horizontal Pod Autoscalers today. #Kubernetes #Cloud', likes: 31, liked: false, comments: [] }
];

const postsEl = document.querySelector('#posts');
function renderPosts() {
  postsEl.innerHTML = localPosts.map((post, index) => `<article class="post card"><div class="post-head"><div class="post-avatar">${post.initials}</div><div><h3>${post.name}</h3><span class="post-meta">Just now · Public</span></div></div><p>${escapeHtml(post.text)}</p><div class="actions"><button class="${post.liked ? 'liked' : ''}" data-like="${index}">♥ ${post.likes} Likes</button><button data-focus="${index}">💬 ${post.comments.length} Comments</button><button>↗ Share</button></div><div class="comment-box"><input id="comment-${index}" placeholder="Write a comment..."><button data-comment="${index}">Comment</button></div>${post.comments.map(c => `<div class="comment">💬 ${escapeHtml(c)}</div>`).join('')}</article>`).join('');
}
function escapeHtml(value) { return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
postsEl.addEventListener('click', event => { const like = event.target.dataset.like; const comment = event.target.dataset.comment; if (like !== undefined) { localPosts[like].liked = !localPosts[like].liked; localPosts[like].likes += localPosts[like].liked ? 1 : -1; renderPosts(); } if (comment !== undefined) { const input = document.querySelector(`#comment-${comment}`); if (input.value.trim()) { localPosts[comment].comments.push(input.value.trim()); renderPosts(); } } });
document.querySelector('#publish').onclick = () => { const input = document.querySelector('#new-post'); if (input.value.trim()) { localPosts.unshift({ name:'Maya Rao', initials:'MR', text:input.value.trim(), likes:0, liked:false, comments:[] }); input.value=''; document.querySelector('#char-count').textContent='0/180'; renderPosts(); } };
document.querySelector('#new-post').oninput = event => document.querySelector('#char-count').textContent = `${event.target.value.length}/180`;
document.querySelector('#refresh').onclick = loadFeed;
async function loadFeed() { try { const data = await fetch('/feed').then(r => r.json()); document.querySelector('#pod').textContent = `Served by Pod: ${data.pod}`; document.querySelector('#status').textContent = 'Feed API online'; } catch { document.querySelector('#pod').textContent = 'Feed API unavailable'; } }
renderPosts(); loadFeed();
