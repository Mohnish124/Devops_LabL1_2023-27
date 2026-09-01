// ShopSphere Microservices Dashboard Client Script
let state = {
  products: [],
  users: [],
  orders: [],
  notifications: [],
  systemHealth: null
};

// DOM Elements
const healthCards = {
  product: { badge: document.getElementById('badgeProduct'), pod: document.getElementById('podProduct'), lat: document.getElementById('latProduct'), card: document.getElementById('cardProductHealth') },
  user: { badge: document.getElementById('badgeUser'), pod: document.getElementById('podUser'), lat: document.getElementById('latUser'), card: document.getElementById('cardUserHealth') },
  order: { badge: document.getElementById('badgeOrder'), pod: document.getElementById('podOrder'), lat: document.getElementById('latOrder'), card: document.getElementById('cardOrderHealth') },
  notification: { badge: document.getElementById('badgeNotif'), pod: document.getElementById('podNotif'), lat: document.getElementById('latNotif'), card: document.getElementById('cardNotifHealth') }
};

const frontendPodName = document.getElementById('frontendPodName');
const refreshBtn = document.getElementById('refreshBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const orderForm = document.getElementById('orderForm');
const orderCustomer = document.getElementById('orderCustomer');
const orderProduct = document.getElementById('orderProduct');
const orderQty = document.getElementById('orderQty');
const summaryPrice = document.getElementById('summaryPrice');
const summaryTotal = document.getElementById('summaryTotal');

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-tab');
    const targetContent = document.getElementById(targetId);
    if (targetContent) targetContent.classList.add('active');
  });
});

// Update Status Badge UI Helper
function updateServiceBadge(ui, health) {
  if (!health) {
    ui.badge.className = 'status-badge status-offline';
    ui.badge.textContent = 'OFFLINE';
    ui.pod.textContent = 'N/A';
    ui.lat.textContent = 'N/A';
    return;
  }

  if (health.status === 'ONLINE') {
    ui.badge.className = 'status-badge status-online';
    ui.badge.textContent = 'ONLINE';
    ui.pod.textContent = health.pod || 'cluster-pod';
    ui.lat.textContent = `${health.latencyMs}ms`;
  } else {
    ui.badge.className = 'status-badge status-offline';
    ui.badge.textContent = 'OFFLINE';
    ui.pod.textContent = health.pod || 'unreachable';
    ui.lat.textContent = `${health.latencyMs}ms`;
  }
}

// Fetch System Health
async function fetchSystemHealth() {
  try {
    const res = await fetch('/api/system/health');
    if (res.ok) {
      const data = await res.json();
      state.systemHealth = data;
      frontendPodName.textContent = data.frontendPod || 'frontend-pod';
      updateServiceBadge(healthCards.product, data.services.product);
      updateServiceBadge(healthCards.user, data.services.user);
      updateServiceBadge(healthCards.order, data.services.order);
      updateServiceBadge(healthCards.notification, data.services.notification);
    }
  } catch (err) {
    console.error('System health fetch error:', err);
    frontendPodName.textContent = 'local-pod';
    Object.values(healthCards).forEach(ui => updateServiceBadge(ui, null));
  }
}

// Fetch Products
async function fetchProducts() {
  const container = document.getElementById('productsContainer');
  const countEl = document.getElementById('countProducts');
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      state.products = data.products || [];
      countEl.textContent = state.products.length;
      renderProducts();
      populateProductSelect();
    } else {
      container.innerHTML = `<div class="loading-state">Product Service responded with status ${res.status}</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="loading-state">Unable to reach Product Service: ${err.message}</div>`;
  }
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!state.products.length) {
    container.innerHTML = '<div class="loading-state">No products found in catalog.</div>';
    return;
  }

  container.innerHTML = state.products.map(p => `
    <div class="product-card">
      <div class="product-header">
        <span class="product-category">${p.category}</span>
        <span class="product-rating">★ ${p.rating}</span>
      </div>
      <div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
      </div>
      <div class="product-footer">
        <div>
          <div class="product-price">$${p.price.toFixed(2)}</div>
          <div class="product-stock">${p.stock} in stock</div>
        </div>
        <button class="btn btn-primary" onclick="openOrderModalForProduct('${p.id}')">Order</button>
      </div>
    </div>
  `).join('');
}

// Fetch Users
async function fetchUsers() {
  const container = document.getElementById('usersContainer');
  const countEl = document.getElementById('countUsers');
  try {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      state.users = data.users || [];
      countEl.textContent = state.users.length;
      renderUsers();
      populateUserSelect();
    } else {
      container.innerHTML = `<div class="loading-state">User Service responded with status ${res.status}</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="loading-state">Unable to reach User Service: ${err.message}</div>`;
  }
}

// Render Users Grid
function renderUsers() {
  const container = document.getElementById('usersContainer');
  if (!state.users.length) {
    container.innerHTML = '<div class="loading-state">No users registered.</div>';
    return;
  }

  container.innerHTML = state.users.map(u => `
    <div class="user-card">
      <div class="user-avatar">${u.avatar || u.name.slice(0, 2).toUpperCase()}</div>
      <div class="user-info">
        <div class="user-name">${u.name}</div>
        <div class="user-role">${u.role}</div>
        <div class="user-email">${u.email} • ${u.location}</div>
      </div>
    </div>
  `).join('');
}

// Fetch Orders
async function fetchOrders() {
  const tbody = document.getElementById('ordersTableBody');
  const countEl = document.getElementById('countOrders');
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const data = await res.json();
      state.orders = data.orders || [];
      countEl.textContent = state.orders.length;
      renderOrders();
    } else {
      tbody.innerHTML = `<tr><td colspan="7" class="loading-state">Order Service responded with status ${res.status}</td></tr>`;
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="loading-state">Unable to reach Order Service: ${err.message}</td></tr>`;
  }
}

// Render Orders Table
function renderOrders() {
  const tbody = document.getElementById('ordersTableBody');
  if (!state.orders.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="loading-state">No orders placed yet.</td></tr>';
    return;
  }

  tbody.innerHTML = state.orders.map(o => {
    let badgeClass = 'badge-order-confirmed';
    if (o.status === 'COMPLETED') badgeClass = 'badge-order-completed';
    else if (o.status === 'PROCESSING') badgeClass = 'badge-order-processing';
    else if (o.status === 'SHIPPED') badgeClass = 'badge-order-shipped';

    const formattedDate = new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `
      <tr>
        <td><code>#${o.id}</code></td>
        <td><strong>${o.userName || o.userId}</strong></td>
        <td>${o.productName || o.productId}</td>
        <td>${o.quantity}</td>
        <td><strong>$${o.totalAmount.toFixed(2)}</strong></td>
        <td><span class="badge-order ${badgeClass}">${o.status}</span></td>
        <td>${formattedDate}</td>
      </tr>
    `;
  }).join('');
}

// Fetch Notifications
async function fetchNotifications() {
  const container = document.getElementById('notificationsContainer');
  const countEl = document.getElementById('countNotifs');
  try {
    const res = await fetch('/api/notifications');
    if (res.ok) {
      const data = await res.json();
      state.notifications = data.notifications || [];
      countEl.textContent = state.notifications.length;
      renderNotifications();
    } else {
      container.innerHTML = `<div class="loading-state">Notification Service responded with status ${res.status}</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="loading-state">Unable to reach Notification Service: ${err.message}</div>`;
  }
}

// Render Notifications
function renderNotifications() {
  const container = document.getElementById('notificationsContainer');
  if (!state.notifications.length) {
    container.innerHTML = '<div class="loading-state">No notifications logged.</div>';
    return;
  }

  container.innerHTML = state.notifications.map(n => {
    const timeFormatted = new Date(n.timestamp).toLocaleTimeString();
    return `
      <div class="notification-item">
        <div class="notif-left">
          <span class="notif-badge">${n.type}</span>
          <div>
            <div class="notif-text">${n.message}</div>
            <div class="notif-meta">Recipient: ${n.recipient}</div>
          </div>
        </div>
        <div class="notif-meta">${timeFormatted}</div>
      </div>
    `;
  }).join('');
}

// Form Helpers
function populateUserSelect() {
  orderCustomer.innerHTML = '<option value="">-- Choose Customer --</option>' +
    state.users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
}

function populateProductSelect() {
  orderProduct.innerHTML = '<option value="">-- Choose Product --</option>' +
    state.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name} ($${p.price.toFixed(2)})</option>`).join('');
}

function updateOrderSummary() {
  const selectedOption = orderProduct.options[orderProduct.selectedIndex];
  if (!selectedOption || !selectedOption.value) {
    summaryPrice.textContent = '$0.00';
    summaryTotal.textContent = '$0.00';
    return;
  }
  const price = parseFloat(selectedOption.getAttribute('data-price')) || 0;
  const qty = parseInt(orderQty.value) || 1;
  summaryPrice.textContent = `$${price.toFixed(2)}`;
  summaryTotal.textContent = `$${(price * qty).toFixed(2)}`;
}

orderProduct.addEventListener('change', updateOrderSummary);
orderQty.addEventListener('input', updateOrderSummary);

// Modal Open / Close
function openOrderModal() {
  orderModal.classList.add('open');
  if (state.users.length && !orderCustomer.value) {
    orderCustomer.value = state.users[0].id;
  }
  if (state.products.length && !orderProduct.value) {
    orderProduct.value = state.products[0].id;
  }
  updateOrderSummary();
}

function closeOrderModal() {
  orderModal.classList.remove('open');
}

window.openOrderModalForProduct = function(productId) {
  openOrderModal();
  orderProduct.value = productId;
  updateOrderSummary();
};

newOrderBtn.addEventListener('click', openOrderModal);
closeModalBtn.addEventListener('click', closeOrderModal);
cancelModalBtn.addEventListener('click', closeOrderModal);
orderModal.addEventListener('click', (e) => {
  if (e.target === orderModal) closeOrderModal();
});

// Handle Order Form Submission
orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitOrderBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  const orderPayload = {
    userId: orderCustomer.value,
    productId: orderProduct.value,
    quantity: parseInt(orderQty.value)
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });

    if (res.ok) {
      closeOrderModal();
      orderForm.reset();
      await refreshAllData();
      // Switch to orders tab
      const orderTabBtn = document.querySelector('[data-tab="tabOrders"]');
      if (orderTabBtn) orderTabBtn.click();
    } else {
      const errData = await res.json();
      alert(`Failed to place order: ${errData.error || 'Unknown error'}`);
    }
  } catch (err) {
    alert(`Order submission error: ${err.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirm & Dispatch Order';
  }
});

// Refresh All Data
async function refreshAllData() {
  refreshBtn.classList.add('loading');
  await Promise.all([
    fetchSystemHealth(),
    fetchProducts(),
    fetchUsers(),
    fetchOrders(),
    fetchNotifications()
  ]);
  refreshBtn.classList.remove('loading');
}

refreshBtn.addEventListener('click', refreshAllData);

// Auto Refresh Interval (every 10s)
setInterval(fetchSystemHealth, 10000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  refreshAllData();
});
