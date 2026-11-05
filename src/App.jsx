import React, { useState, useEffect } from "react";
import "./App.css";

// imgs
import heroImg from "./imgs/hero01.png";
import service01 from "./imgs/service01.png";
import service02 from "./imgs/service02.png";
import service03 from "./imgs/service03.png";

import sorvChoco from "./imgs/sorvChocolate.png";
import sorvMoran from "./imgs/sorvMorango.png";
import sorvPistac from "./imgs/sorvPistache.png";
import sorvMarac from "./imgs/sorvMaracuja.png";

// Map
import LocationMap from "./components/LocationMap";

// Lista de produtos do cardápio com preços
const PRODUTOS = [
  { id: 1, nome: "Sorvete de Chocolate", preco: 8.00, img: sorvChoco },
  { id: 2, nome: "Sorvete de Morango", preco: 8.00, img: sorvMoran },
  { id: 3, nome: "Sorvete de Pistache", preco: 10.00, img: sorvPistac },
  { id: 4, nome: "Sorvete de Maracujá", preco: 8.00, img: sorvMarac },
];

function App() {
  // Estado do carrinho carregado do LocalStorage
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem("carrinho_oba");
    return salvo ? JSON.parse(salvo) : [];
  });

  // Estado para controlar a abertura do Modal do Carrinho
  const [modalAberto, setModalAberto] = useState(false);

  // Salva no LocalStorage sempre que o carrinho for modificado
  useEffect(() => {
    localStorage.setItem("carrinho_oba", JSON.stringify(carrinho));
  }, [carrinho]);

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  // Remover ou decrementar item do carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // Limpar todo o carrinho
  const limparCarrinho = () => setCarrinho([]);

  // Cálculos de totais
  const totalValor = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // Gerar mensagem em formato de "Nota Fiscal" para o WhatsApp
  const gerarMensagemWhatsApp = () => {
    if (carrinho.length === 0) return "";

    let texto = `📋 *PEDIDO - OBA! SORVETERIA*\n`;
    texto += `-----------------------------------\n`;

    carrinho.forEach((item) => {
      const subtotal = (item.preco * item.quantidade).toFixed(2);
      texto += `• ${item.quantidade}x ${item.nome} - R$ ${subtotal}\n`;
    });

    texto += `-----------------------------------\n`;
    texto += `💰 *TOTAL:* R$ ${totalValor.toFixed(2)}\n\n`;
    texto += `📍 Por favor, informe seu nome e endereço para entrega!`;

    return `https://wa.me/5584998521298?text=${encodeURIComponent(texto)}`;
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#E85285] w-full h-20 shadow-md sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 text-white">
        {/* Logo / Nome da Sorveteria */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-sm">
            Oba! <span className="font-normal text-pink-100 text-lg md:text-xl">Sorveteria</span>
          </span>
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-base">
          <a href="#inicio" className="hover:text-pink-200 transition-colors">Início</a>
          <a href="#cardapio" className="hover:text-pink-200 transition-colors">Cardápio</a>
          <a href="#sobre" className="hover:text-pink-200 transition-colors">A Nossa História</a>
          <a href="#faq" className="hover:text-pink-200 transition-colors">FAQ</a>
        </div>

        {/* Botão de Carrinho na Navbar */}
        <div>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-white text-[#E85285] font-bold px-4 py-2.5 rounded-full shadow-md hover:bg-pink-50 hover:scale-105 transition-all duration-300 text-sm md:text-base flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Carrinho ({totalItens})</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="w-screen relative flex justify-center scroll-mt-24 px-4 py-4">
        <div className="relative w-full max-w-7xl flex justify-center items-center overflow-hidden rounded-2xl shadow-lg">
          <img src={heroImg} alt="HomeImage" className="w-full h-auto object-cover" />
          
          <a
            href="https://wa.me/5584998521298?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[10%]  w-1/2 md:w-1/4 text-white font-bold px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 flex justify-center items-center shadow-xl text-lg gap-2"
          >
            <div className="w-full flex justify-center items-center">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
            <span>Pedir agora</span>
            </div>
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="w-screen py-8">
        <div className="flex justify-center mt-4 gap-4">
          <div className="w-[27%] rounded-2xl overflow-hidden bg-[#fc7da7]">
            <img src={service02} className="rotate-12" alt="Serviço 2" />
          </div>

          <div className="w-[27%] rounded-2xl overflow-hidden bg-[#fc7da7]">
            <img src={service01} className="rotate-12" alt="Serviço 1" />
          </div>

          <div className="w-[27%] rounded-2xl overflow-hidden bg-[#fc7da7]">
            <img src={service03} className="rotate-12" alt="Serviço 3" />
          </div>
        </div>
      </section>

      {/* Flavors / Cardápio */}
      <section id="cardapio" className="scroll-mt-24 w-screen flex flex-col items-center justify-center p-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Nossos Sabores
        </h2>
        <div className="w-20 h-1 bg-pink-500 mx-auto mt-3 rounded-full mb-8"></div>

        <div className="w-full max-w-5xl flex flex-wrap gap-6 justify-center">
          {PRODUTOS.map((produto) => (
            <div key={produto.id} className="w-[45%] md:w-[22%] flex flex-col items-center">
              <div className="relative group overflow-hidden rounded-t-xl shadow-md w-full bg-white">
                <img
                  src={produto.img}
                  alt={produto.nome}
                  className="w-full h-auto group-hover:scale-105 transition-all duration-300"
                />
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="absolute inset-0 w-full h-full flex justify-center items-center font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 cursor-pointer"
                >
                  <span className="text-sm bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-full shadow-lg font-bold">
                    + Adicionar
                  </span>
                </button>
              </div>

              <div className="w-full bg-amber-400 p-2.5 flex flex-col items-center justify-center text-white rounded-b-xl shadow-sm">
                <span className="font-bold text-center h-12 text-sm md:text-base">{produto.nome}</span>
                <span className="text-xs font-semibold bg-amber-500 px-2.5 py-0.5 rounded-full mt-1 mb-2">
                  R$ {produto.preco.toFixed(2)}
                </span>
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="text-xs bg-white text-gray-800 font-bold px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors shadow-sm cursor-pointer"
                >
                  + Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="scroll-mt-24 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            A nossa história
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-center space-y-4">
            <p className="text-xl md:text-2xl font-bold text-pink-600 leading-snug">
              Mais do que sorvete, momentos de pura alegria!
            </p>
            <p className="text-base font-medium text-gray-700">
              Feito com ingredientes frescos, muito carinho e aquela receita artesanal que transforma qualquer dia comum em um dia especial.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Localizada em Nova Esperança para adoçar os melhores momentos da sua rotina, a <strong className="text-gray-800">OBA! Sorveteria</strong> é o ponto de encontro perfeito para quem ama sabor de verdade.
            </p>
          </div>

          <div className="w-full flex flex-col items-center bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 self-start px-2">
              📍 Onde Estamos
            </h4>
            <div className="w-full overflow-hidden rounded-xl z-10">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Tire suas dúvidas rápidas sobre funcionamento, delivery e eventos.
          </p>
        </div>

        <div className="w-full space-y-4">
          <details className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 open:shadow-md open:border-pink-300">
            <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg cursor-pointer list-none select-none">
              <span>Quais os dias de funcionamento?</span>
              <span className="transition-transform duration-300 group-open:rotate-180 text-pink-500 font-bold">▼</span>
            </summary>
            <p className="text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed text-base">
              A Oba! Sorveteria funciona de segunda a sábado. Venha nos visitar ou peça o seu favorito!
            </p>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 open:shadow-md open:border-pink-300">
            <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg cursor-pointer list-none select-none">
              <span>Fazem encomendas e atendimento para eventos?</span>
              <span className="transition-transform duration-300 group-open:rotate-180 text-pink-500 font-bold">▼</span>
            </summary>
            <p className="text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed text-base">
              Sim! Fazemos encomendas para eventos com prazo mínimo de 30 dias de antecedência.
            </p>
          </details>
            
          <details className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 open:shadow-md open:border-pink-300">
            <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg cursor-pointer list-none select-none">
              <span>O delivery funciona até que horas?</span>
              <span className="transition-transform duration-300 group-open:rotate-180 text-pink-500 font-bold">▼</span>
            </summary>
            <p className="text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed text-base">
              Nosso delivery funciona todos os dias de atendimento até as 21:00 horas.
            </p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-8 text-center mt-12 flex flex-col items-center justify-center space-y-4">
        <p className="text-xs md:text-sm text-gray-400">
          © {new Date().getFullYear()} Oba! Sorveteria. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 justify-center items-center text-2xl">
          <a href="https://wa.me/5584998521298" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-green-500 hover:scale-125 transition-all duration-300">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/obafabricadepicoles" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 hover:scale-125 transition-all duration-300">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 hover:scale-125 transition-all duration-300">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <a
        href="https://wa.me/5584998172349?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20sorvetes!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-[90] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group cursor-pointer"
      >
        <i className="fa-brands fa-whatsapp text-3xl md:text-4xl group-hover:rotate-12 transition-transform duration-300"></i>
        <span className="absolute right-16 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md hidden sm:block">
          Pedir no WhatsApp
        </span>
      </a>

      {/* Botão Flutuante do Carrinho */}
      <button
        onClick={() => setModalAberto(true)}
        aria-label="Ver carrinho de compras"
        className="fixed bottom-15 left-1/2 -translate-x-1/2 bg-[#E85285] hover:bg-[#d43f72] z-[90] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 group cursor-pointer"
      >
        <i className="fa-solid fa-cart-shopping text-xl md:text-2xl"></i>
        {totalItens > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
            {totalItens}
          </span>
        )}
      </button>

      {/* MODAL DO CARRINHO */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Cabeçalho do Modal */}
            <div className="bg-[#E85285] text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-receipt text-2xl"></i>
                <h3 className="text-xl font-bold">Seu Pedido</h3>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Lista de Itens */}
            <div className="p-6 overflow-y-auto flex-1 divide-y divide-gray-100">
              {carrinho.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">🍦</p>
                  <p className="font-semibold text-lg">Seu carrinho está vazio!</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Adicione sabores do cardápio para fazer o seu pedido.
                  </p>
                </div>
              ) : (
                carrinho.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        {item.nome}
                      </h4>
                      <p className="text-xs text-gray-500">
                        R$ {item.preco.toFixed(2)} un.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => removerDoCarrinho(item.id)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 font-semibold text-sm">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => adicionarAoCarrinho(item)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-pink-600 text-sm md:text-base w-16 text-right">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé do Modal (Total e Finalizar) */}
            {carrinho.length > 0 && (
              <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-center text-gray-800">
                  <span className="font-semibold text-base">Valor Total:</span>
                  <span className="font-extrabold text-2xl text-emerald-600">
                    R$ {totalValor.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={limparCarrinho}
                    className="w-1/3 py-3 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition-colors text-sm cursor-pointer"
                  >
                    Limpar
                  </button>

                  <a
                    href={gerarMensagemWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-2/3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex justify-center items-center gap-2 shadow-lg hover:scale-[1.02] transition-all text-sm md:text-base cursor-pointer"
                  >
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                    <span>Enviar Pedido</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default App;