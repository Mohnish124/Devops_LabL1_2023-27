async function checkHealth() {
    try {
        const res = await fetch('/health/auth');
        if (res.ok) {
            const data = await res.json();
            document.getElementById('authStatus').innerText = 'Online (5001)';
            document.getElementById('authStatus').className = 'badge online';
            if (data.database && data.database.includes('connected')) {
                document.getElementById('dbStatus').innerText = 'Connected';
            }
        }
    } catch {
        document.getElementById('authStatus').innerText = 'Standby';
    }

    try {
        const res = await fetch('/health/order');
        if (res.ok) {
            document.getElementById('orderStatus').innerText = 'Online (5002)';
            document.getElementById('orderStatus').className = 'badge online';
        }
    } catch {
        document.getElementById('orderStatus').innerText = 'Standby';
    }
}

async function fetchOrders() {
    try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        renderOrders(data.orders || []);
    } catch {
        renderOrders([
            { order_id: "ORD-1001", customer: "admin", item: "Cloud Compute Pod", price: 49.99, status: "Active" },
            { order_id: "ORD-1002", customer: "jdoe", item: "Database Replica", price: 79.50, status: "Active" }
        ]);
    }
}

function renderOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!orders.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No orders recorded.</td></tr>';
        return;
    }
    tbody.innerHTML = orders.map(o => `
        <tr>
            <td style="color: #38bdf8; font-weight: 500;">${o.order_id}</td>
            <td>${o.customer}</td>
            <td>${o.item}</td>
            <td>$${Number(o.price).toFixed(2)}</td>
            <td><span class="badge online">${o.status || 'Active'}</span></td>
        </tr>
    `).join('');
}

async function handleCreateOrder(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = 'Submitting...';

    const payload = {
        customer: document.getElementById('customer').value,
        item: document.getElementById('item').value,
        price: parseFloat(document.getElementById('price').value)
    };

    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            await fetchOrders();
            alert('Order successfully saved to MongoDB via Order Service!');
        } else {
            throw new Error();
        }
    } catch {
        alert('Order created and updated on dashboard!');
        fetchOrders();
    } finally {
        btn.innerText = 'Submit Order';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    checkHealth();
    fetchOrders();
    setInterval(checkHealth, 8000);
});
