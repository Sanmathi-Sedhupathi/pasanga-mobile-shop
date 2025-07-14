let cart = [];

function updateCart() {
  let html = '';
  let total = 0;
  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `<div class="d-flex justify-content-between">
              <div>${item.name} x ${item.qty}</div>
              <div>₹${itemTotal.toFixed(2)}</div>
            </div>`;
  });

  let discount = total * 0.8; // example discount logic
  let subtotal = total - discount;

  html += `<hr>
           <div>Net Total: ₹${total.toFixed(2)}</div>
           <div>You Save: ₹${discount.toFixed(2)}</div>
           <div><strong>Overall Total: ₹${subtotal.toFixed(2)}</strong></div>`;

  $('#cart-box').html(html);
}

$(document).on('click', '.add-to-cart', function() {
  const id = $(this).data('id');
  const name = $(this).data('name');
  const price = parseFloat($(this).data('price'));

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCart();
});

function confirmEstimate() {
  if (cart.length === 0) {
    alert("Please add items to cart");
    return;
  }
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (subtotal < 3000) {
    alert("Minimum order amount is ₹3000");
    return;
  }
  alert("Order confirmed! Submit logic not added yet.");
}
