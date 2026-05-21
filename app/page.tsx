'use client';

import { useState } from 'react';

const menuItems = [
  // СУПЫ
  { id: 1, name: "Том Ям с креветками", desc: "Креветки, шампиньоны, кокосовое молоко, паста Том Ям, лайм и кинза", price: 2290, category: "soups", image: "https://picsum.photos/id/292/600/400" },
  { id: 2, name: "Куриный суп с лапшой", desc: "Куриное филе, домашняя лапша, морковь, картофель, зелень и специи", price: 1490, category: "soups", image: "https://picsum.photos/id/431/600/400" },
  { id: 3, name: "Сырный крем-суп", desc: "Плавленый сыр, сливки, картофель, лук и хрустящие сухарики", price: 1690, category: "soups", image: "https://picsum.photos/id/870/600/400" },
  { id: 4, name: "Борщ со сметаной", desc: "Говядина, свекла, капуста, картофель, морковь и свежая сметана", price: 1590, category: "soups", image: "https://picsum.photos/id/1080/600/400" },
  { id: 5, name: "Грибной суп-пюре", desc: "Шампиньоны, сливки, лук, картофель, чеснок и свежая зелень", price: 1590, category: "soups", image: "https://picsum.photos/id/669/600/400" },

  // ПИЦЦА
  { id: 6, name: "Пепперони", desc: "Томатный соус, моцарелла, пикантная колбаса пепперони", price: 2590, category: "pizza", image: "https://picsum.photos/id/201/600/400" },
  { id: 7, name: "Маргарита", desc: "Томатный соус, моцарелла, свежие помидоры и базилик", price: 2290, category: "pizza", image: "https://picsum.photos/id/292/600/400" },
  { id: 8, name: "4 Сыра", desc: "Моцарелла, дорблю, пармезан, чеддер и сливочный соус", price: 2790, category: "pizza", image: "https://picsum.photos/id/870/600/400" },
  { id: 9, name: "Мясная BBQ", desc: "Курица, говядина, бекон, соус BBQ и моцарелла", price: 3190, category: "pizza", image: "https://picsum.photos/id/106/600/400" },
  { id: 10, name: "Овощная", desc: "Болгарский перец, помидоры, оливки, грибы и моцарелла", price: 2390, category: "pizza", image: "https://picsum.photos/id/431/600/400" },

  // ГОРЯЧИЕ БЛЮДА
  { id: 11, name: "Стейк из говядины", desc: "Говяжий стейк, картофель по-деревенски, перечный соус", price: 4890, category: "hot", image: "https://picsum.photos/id/1080/600/400" },
  { id: 12, name: "Курица в сливочном соусе", desc: "Куриное филе, сливочный соус, грибы и ароматные специи", price: 2890, category: "hot", image: "https://picsum.photos/id/669/600/400" },
  { id: 13, name: "Паста Карбонара", desc: "Спагетти, бекон, сливки, пармезан и яйцо", price: 2590, category: "hot", image: "https://picsum.photos/id/201/600/400" },
  { id: 14, name: "Плов по-восточному", desc: "Рис, говядина, морковь, лук и зира", price: 2290, category: "hot", image: "https://picsum.photos/id/292/600/400" },
  { id: 15, name: "Лосось на гриле", desc: "Филе лосося, лимон, овощи гриль и специи", price: 3990, category: "hot", image: "https://picsum.photos/id/870/600/400" },

  // НАПИТКИ
  { id: 16, name: "Мохито безалкогольный", desc: "Лайм, свежая мята, сахарный сироп, газированная вода", price: 890, category: "drinks", image: "https://picsum.photos/id/431/600/400" },
  { id: 17, name: "Клубничный лимонад", desc: "Свежая клубника, лимон, сироп и газированная вода", price: 790, category: "drinks", image: "https://picsum.photos/id/669/600/400" },
  { id: 18, name: "Капучино", desc: "Эспрессо, молоко и нежная молочная пенка", price: 690, category: "drinks", image: "https://picsum.photos/id/201/600/400" },
  { id: 19, name: "Апельсиновый фреш", desc: "Свежевыжатый сок из натуральных апельсинов", price: 890, category: "drinks", image: "https://picsum.photos/id/292/600/400" },
  { id: 20, name: "Чай с ягодами", desc: "Черный чай, малина, клубника и натуральный мед", price: 690, category: "drinks", image: "https://picsum.photos/id/1080/600/400" },
];

export default function JagerShefMenu() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const categories = [
    { id: "all", name: "Все блюда" },
    { id: "soups", name: "🥣 Супы" },
    { id: "pizza", name: "🍕 Пицца" },
    { id: "hot", name: "🍖 Горячие блюда" },
    { id: "drinks", name: "🥤 Напитки" },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const sendOrder = () => {
    if (!tableNumber) {
      alert("Пожалуйста, укажите номер стола!");
      return;
    }

    const orderText = `
Новый заказ от стола №${tableNumber}!

${cart.map((item, i) => `${i+1}. ${item.name} — ${item.price} ₸`).join('\n')}

Итого: ${totalPrice} ₸
    `.trim();

    // Открываем Telegram (замени @username на свой)
    const telegramLink = `https://t.me/+77712345678?text=${encodeURIComponent(orderText)}`;
    window.open(telegramLink, '_blank');

    alert("Заказ отправлен! Спасибо ❤️");
    setCart([]);
    setShowCart(false);
    setTableNumber("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Шапка */}
      <header className="sticky top-0 bg-black/95 backdrop-blur-lg z-50 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg">🦌</div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">JagerShef</h1>
              <p className="text-zinc-400 -mt-1">Ресторан • Актобе</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="🔍 Поиск блюда..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-3 w-96 focus:outline-none focus:border-orange-500"
            />
            
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 transition"
            >
              🛒 Корзина ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ... (остальная часть меню такая же как раньше) */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-3">Добро пожаловать в JagerShef</h2>
          <p className="text-zinc-400 text-xl">Вкусно. Сытно. По-домашнему</p>
        </div>

        {/* Категории и карточки — оставил без изменений для краткости */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-4 rounded-3xl font-medium text-lg transition-all ${activeCategory === cat.id ? 'bg-orange-500 text-black shadow-xl shadow-orange-500/30' : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700'}`}>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-[1.04] transition-all duration-300 group">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="p-7">
                <h3 className="text-2xl font-semibold mb-3">{item.name}</h3>
                <p className="text-zinc-400 mb-6 line-clamp-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-orange-400">{item.price.toLocaleString()} ₸</div>
                  <button onClick={() => addToCart(item)} className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-8 py-3.5 rounded-2xl transition">
                    + В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Корзина */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Ваша корзина</h2>
                <button onClick={() => setShowCart(false)} className="text-4xl text-zinc-400 hover:text-white">×</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center py-12 text-zinc-400">Корзина пуста</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between py-4 border-b border-zinc-700">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-zinc-400">{item.price} ₸</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-red-500">✕</button>
                    </div>
                  ))}

                  <div className="mt-6">
                    <input
                      type="text"
                      placeholder="Номер стола (например: 7)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-lg"
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-700">
                    <div className="flex justify-between text-3xl font-bold mb-8">
                      <span>Итого:</span>
                      <span className="text-orange-400">{totalPrice.toLocaleString()} ₸</span>
                    </div>
                    <button 
                      onClick={sendOrder}
                      className="w-full bg-green-600 hover:bg-green-500 py-5 rounded-2xl text-xl font-semibold transition"
                    >
                      ✅ Отправить заказ официанту
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Футер */}
      <footer className="bg-black py-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-400">
          <p className="text-2xl font-semibold text-white mb-2">JagerShef</p>
          <p>Актобе • Электронное меню</p>
          <p className="mt-4">📍 Адрес: укажите ваш адрес</p>
          <p>☎️ Телефон: +7 (XXX) XXX-XX-XX</p>
          <p className="mt-8 text-sm">Сделано с ❤️ для гостей JagerShef</p>
        </div>
      </footer>
    </div>
  );
}