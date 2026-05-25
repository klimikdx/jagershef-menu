'use client';

import { useState } from 'react';

const BOT_TOKEN = "8913112083:AAH4qEHg99T1jcWKp3wGgT18PwibXAM5Tn8";
const CHAT_ID = "1050809291";

const menuItems = [
  // СУПЫ
  { id: 1, name: "Том Ям с креветками", desc: "Креветки, шампиньоны, кокосовое молоко, паста Том Ям, лайм и кинза", price: 2290, category: "soups", image: "https://images.pexels.com/photos/12561895/pexels-photo-12561895.jpeg" },
  { id: 2, name: "Куриный суп с лапшой", desc: "Куриное филе, домашняя лапша, морковь, картофель, зелень и специи", price: 1490, category: "soups", image: "https://images.pexels.com/photos/8878621/pexels-photo-8878621.jpeg" },
  { id: 3, name: "Сырный крем-суп", desc: "Плавленый сыр, сливки, картофель, лук и хрустящие сухарики", price: 1690, category: "soups", image: "https://images.pexels.com/photos/7133564/pexels-photo-7133564.jpeg" },
  { id: 4, name: "Борщ со сметаной", desc: "Говядина, свекла, капуста, картофель, морковь и свежая сметана", price: 1590, category: "soups", image: "https://images.pexels.com/photos/19992957/pexels-photo-19992957.jpeg" },
  { id: 5, name: "Грибной суп-пюре", desc: "Шампиньоны, сливки, лук, картофель, чеснок и свежая зелень", price: 1590, category: "soups", image: "https://images.pexels.com/photos/20051299/pexels-photo-20051299.jpeg" },

  // ПИЦЦА
  { id: 6, name: "Пепперони", desc: "Томатный соус, моцарелла, пикантная колбаса пепперони", price: 2590, category: "pizza", image: "https://images.pexels.com/photos/4109137/pexels-photo-4109137.jpeg" },
  { id: 7, name: "Маргарита", desc: "Томатный соус, моцарелла, свежие помидоры и базилик", price: 2290, category: "pizza", image: "https://images.pexels.com/photos/24786266/pexels-photo-24786266.jpeg" },
  { id: 8, name: "4 Сыра", desc: "Моцарелла, Груша, дорблю, пармезан, чеддер и сливочный соус", price: 2790, category: "pizza", image: "https://images.pexels.com/photos/6213716/pexels-photo-6213716.jpeg" },
  { id: 9, name: "Мясная BBQ", desc: "Курица, говядина, бекон, соус BBQ и моцарелла", price: 3190, category: "pizza", image: "https://images.pexels.com/photos/15832883/pexels-photo-15832883.jpeg" },
  { id: 10, name: "Овощная", desc: "Болгарский перец, помидоры, оливки, грибы и моцарелла", price: 2390, category: "pizza", image: "https://images.pexels.com/photos/5903095/pexels-photo-5903095.jpeg" },

  // ГОРЯЧИЕ БЛЮДА
  { id: 11, name: "Стейк из говядины", desc: "Говяжий стейк, картофель по-деревенски, перечный соус", price: 4890, category: "hot", image: "https://images.pexels.com/photos/27305264/pexels-photo-27305264.jpeg" },
  { id: 12, name: "Курица в сливочном соусе", desc: "Куриное филе, сливочный соус, грибы и ароматные специи", price: 2890, category: "hot", image: "https://images.pexels.com/photos/15058966/pexels-photo-15058966.jpeg" },
  { id: 13, name: "Паста Карбонара", desc: "Спагетти, бекон, сливки, пармезан и яйцо", price: 2590, category: "hot", image: "https://images.pexels.com/photos/20352388/pexels-photo-20352388.jpeg" },
  { id: 14, name: "Плов по-восточному", desc: "Рис, говядина, морковь, лук и зира", price: 2290, category: "hot", image: "https://images.pexels.com/photos/10541694/pexels-photo-10541694.jpeg" },
  { id: 15, name: "Лосось на гриле", desc: "Филе лосося, лимон, овощи гриль и специи", price: 3990, category: "hot", image: "https://images.pexels.com/photos/14537684/pexels-photo-14537684.jpeg" },

  // НАПИТКИ
  { id: 16, name: "Мохито безалкогольный", desc: "Лайм, свежая мята, сахарный сироп, газированная вода", price: 890, category: "drinks", image: "https://images.pexels.com/photos/36593623/pexels-photo-36593623.jpeg" },
  { id: 17, name: "Клубничный лимонад", desc: "Свежая клубника, лимон, сироп и газированная вода", price: 790, category: "drinks", image: "https://images.pexels.com/photos/8584751/pexels-photo-8584751.jpeg" },
  { id: 18, name: "Капучино", desc: "Эспрессо, молоко и нежная молочная пенка", price: 690, category: "drinks", image: "https://images.pexels.com/photos/25328665/pexels-photo-25328665.jpeg" },
  { id: 19, name: "Апельсиновый фреш", desc: "Свежевыжатый сок из натуральных апельсинов", price: 890, category: "drinks", image: "https://images.pexels.com/photos/16427702/pexels-photo-16427702.jpeg" },
  { id: 20, name: "Чай с ягодами", desc: "Черный чай, малина, клубника и натуральный мед", price: 690, category: "drinks", image: "https://images.pexels.com/photos/2633397/pexels-photo-2633397.jpeg" },
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

  const addToCart = (item: any) => setCart([...cart, item]);
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const sendOrder = async () => {
    if (!tableNumber) {
      alert("Пожалуйста, укажите номер стола!");
      return;
    }

    const orderText = `🛒 Новый заказ!\n\n` +
                     `Стол №${tableNumber}\n\n` +
                     `${cart.map((item, i) => `${i+1}. ${item.name} — ${item.price} ₸`).join('\n')}\n\n` +
                     `Итого: ${totalPrice} ₸`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: orderText,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        alert("✅ Заказ успешно отправлен в Telegram!");
        setCart([]);
        setShowCart(false);
        setTableNumber("");
      } else {
        alert("Ошибка отправки. Проверьте токен.");
      }
    } catch (error) {
      alert("Не удалось отправить заказ. Проверьте интернет.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* (Шапка, меню, корзина остаются как у тебя) */}
      <header className="sticky top-0 bg-black/95 backdrop-blur-lg z-50 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0">🦌</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">JagerShef</h1>
                <p className="text-zinc-400 text-sm">Ресторан • Актобе</p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="🔍 Поиск блюда..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3 text-base focus:outline-none focus:border-orange-500"
              />
            </div>

            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition whitespace-nowrap"
            >
              🛒 <span className="hidden sm:inline">Корзина</span> ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">Добро пожаловать в JagerShef</h2>
          <p className="text-zinc-400 text-lg">Вкусно. Сытно. По-домашнему</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-3xl font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-orange-500 text-black shadow-xl shadow-orange-500/30' : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group flex flex-col">
              <div className="h-52 sm:h-60 bg-zinc-800 relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-zinc-400 mb-5 text-sm sm:text-base flex-1 line-clamp-3">{item.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                    {item.price.toLocaleString('ru-RU')} ₸
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-2xl text-sm transition active:scale-95"
                  >
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
                        <p className="text-sm text-zinc-400">{item.price.toLocaleString('ru-RU')} ₸</p>
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
                      <span className="text-orange-400">{totalPrice.toLocaleString('ru-RU')} ₸</span>
                    </div>
                    <button 
                      onClick={sendOrder}
                      className="w-full bg-green-600 hover:bg-green-500 py-5 rounded-2xl text-xl font-semibold transition"
                    >
                      ✅ Отправить заказ в Telegram
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black py-12 border-t border-zinc-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-400">
          <p className="text-2xl font-semibold text-white mb-2">JagerShef</p>
          <p>Актобе • Электронное меню</p>
          <p className="mt-4">📍 ТД Нектар Улица Нагашбай Шайкенова, 6 1 этаж • ☎️ +7 (705) 666-27-19</p>
        </div>
      </footer>
    </div>
  );
}