const META_TOTAL = 500000.00;
const LIMITE_DOACAO = 250.00;
const NOMES_PERMITIDOS = ["Wesley", "Gabriel fritzen", "Anderson", "Vinícius", "Jean"];

let donations = [];
let totalArrecadado = 0;
let showModal = false;

// Função formata moeda BR
function formatBRL(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Atualiza toda a interface
function render() {
  document.getElementById("app").innerHTML = `
    <div class="container">

      ${totalArrecadado >= META_TOTAL ? `
        <div style="position:absolute; inset:0; background:black; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:20px;">
          <h2 class="rainbow-animate" style="font-size:50px; font-weight:bold;">META ATINGIDA!</h2>
          <div style="color:white; font-size:25px;">Arrecadado: <span style="color:#0f0;">${formatBRL(totalArrecadado)}</span></div>
          <p style="color:#fff; margin-top:20px;">Após todas as vossas doações...</p>
          <p style="color:#f0c; font-size:45px; font-weight:bold;">O Davi não deixou de ser gay!</p>
        </div>
      ` : ""}

      <header style="text-align:center; border-bottom:3px solid white; padding-bottom:20px;">
        <h1 class="rainbow-animate" style="font-size:60px; font-weight:bold;">SALVE O DAVI</h1>
        <h2 style="color:yellow; font-weight:bold;">Ajude o Davi a parar de ser gay</h2>
      </header>

      <div style="display:flex; gap:20px; margin-top:20px;">
        
        <section style="flex:1.5;">
          <div style="width:250px; height:250px; background:#222; border:5px solid white; margin:auto; border-radius:12px; position:relative;">
            <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#555;">Foto do Davi aqui</span>
          </div>

          <div style="color:white; font-size:18px; margin-top:20px; text-align:justify;">
            <p>Mano, a situação do <b class="rainbow-animate">Davi</b> é crítica.</p>
            <p>Se não fizermos nada agora, ele vai começar a usar ecobag com brilho.</p>
            <p style="border:2px dashed #f0c; padding:10px; text-align:center; color:#f0c;">Meta: 500k pra virar homem.</p>
          </div>
        </section>

        <section style="flex:1; background:#1118; padding:15px; border:4px solid #f0c; border-radius:10px;">

          <div style="background:black; border:2px solid #0f0; padding:10px; text-align:center; color:white;">
            <span style="font-size:12px;">Arrecadado:</span>
            <div style="color:#0f0; font-size:25px; font-weight:bold;">${formatBRL(totalArrecadado)}</div>
          </div>

          <div style="margin-top:15px;">
            <div style="text-align:center; font-size:10px; color:#0f0; font-weight:bold;">Progresso</div>
            <div style="background:#222; height:20px; border:1px solid #555; border-radius:20px; overflow:hidden;">
              <div style="height:100%; width:${Math.min((totalArrecadado / META_TOTAL) * 100, 100)}%; background:linear-gradient(to right, red, yellow, green);"></div>
            </div>
          </div>

          <div style="margin-top:20px; height:300px; overflow-y:auto;" class="custom-scrollbar">
            ${donations.length === 0 ? `
              <p style="color:yellow; text-align:center; opacity:0.6;">Nenhuma doação ainda</p>
            ` : donations.map(d => `
              <div style="background:black; margin-bottom:10px; padding:10px; border:1px solid #444; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; color:white;">
                  <span style="color:cyan;">${d.nome}</span>
                  <span style="color:lightgreen;">+${formatBRL(d.valor)}</span>
                </div>
                <div style="color:#ccc; font-size:12px; margin-top:5px;">"${d.mensagem}"</div>
              </div>
            `).join("")}
          </div>

        </section>
      </div>

      <footer style="margin-top:20px; text-align:center;">
        <button onclick="openModal()" style="padding:15px; width:100%; font-size:20px; background:red; color:white; border:2px solid white; border-radius:30px; cursor:pointer;">
          ADICIONAR DOAÇÃO
        </button>
      </footer>

      ${showModal ? modalHTML() : ""}

    </div>
  `;
}

// Modal HTML
function modalHTML() {
  return `
    <div class="modal-bg">
      <div class="modal-box">
        <h3 style="color:#0f0; text-align:center; font-size:22px;">Nova Doação</h3>

        <label>Nome:</label>
        <select id="fNome" style="width:100%; padding:8px; margin-bottom:10px;">
          ${NOMES_PERMITIDOS.map(n => `<option>${n}</option>`).join("")}
        </select>

        <label>Valor (R$):</label>
        <input id="fValor" type="number" max="250" style="width:100%; padding:8px; margin-bottom:10px;">

        <label>Mensagem:</label>
        <textarea id="fMsg" rows="3" style="width:100%; padding:8px;"></textarea>

        <div style="display:flex; margin-top:15px; gap:10px;">
          <button onclick="closeModal()" style="flex:1; padding:10px; background:#444; color:white;">Cancelar</button>
          <button onclick="addDonate()" style="flex:1; padding:10px; background:#0f0; color:black;">Confirmar</button>
        </div>
      </div>
    </div>
  `;
}

// abrir modal
function openModal() {
  showModal = true;
  render();
}

// fechar modal
function closeModal() {
  showModal = false;
  render();
}

// adicionar doação
function addDonate() {
  const nome = document.getElementById("fNome").value;
  const valor = parseFloat(document.getElementById("fValor").value);
  const msg = document.getElementById("fMsg").value;

  if (!valor || valor <= 0) return;
  if (valor > LIMITE_DOACAO) {
    alert("Máximo 250 reais!");
    return;
  }

  donations.unshift({
    nome,
    valor,
    mensagem: msg,
    timestamp: Date.now()
  });

  totalArrecadado += valor;

  closeModal();
}

// INICIAR
render();
