const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal=document.querySelector('.whatsapp-button');

function addCart(productName, price){
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem){
        existingItem.quantity += 1;
    } else{
        cart.push({name: productName, price: price, quantity: 1});
    }
    update();
}

function removeFromCart(productname){
    const idex = cart.findIndex(item => item.name === productName);
    if (index !== -1){
        if (cart[index].quatity > 1){
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <strong>${item.name}</strong> x ${item.quantity} 
            <br>R$ ${(item.price * item.quantity).toFixed(2)}
            <br><button onclick="removeFromCart('${item.name}')">Remover</button>
            <hr>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function checkoutWhatsapp(){
    if (cart.length === 0){
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    cart.forEach(item =>{
        message += `🌸 ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item)=>sum + item.price * item.quantity,0);
    message +=`\n💰 Total: R${total.toFixed(2)}\n`;

    const phoneNumber = '55 54 99960-7703';
    const url = `https://wa.me/${phonenNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

document.querySelector('.checkout-button').addEventListener('click', checkoutWhatsapp);