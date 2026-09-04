(function(){
  // ============================================================
  //  CONFIGURA AQUÍ (lo único que normalmente necesitas tocar)
  // ============================================================
  const phoneNumber = "573133545419"; // tu número, código de país sin + ni espacios

  const HORA_FIJA = "2:00 p.m."; // hora fija del evento

  // ============================================================

  const card = document.getElementById('card');
  let isOpen = false;
  let animating = false;

  function openCard(){
    if(isOpen || animating) return;
    animating = true;
    card.classList.remove('closing');
    card.classList.add('opening');
  }
  function closeCard(){
    if(!isOpen || animating) return;
    animating = true;
    card.classList.remove('opening');
    card.classList.add('closing');
  }
  card.addEventListener('animationend', ()=>{
    if(card.classList.contains('opening')){
      isOpen = true;
      card.style.transform = 'rotateY(180deg)';
    } else if(card.classList.contains('closing')){
      isOpen = false;
      card.style.transform = 'rotateY(0deg)';
    }
    card.classList.remove('opening','closing');
    animating = false;
  });

  // tap / click to open (ignore accidental drags/scrolls)
  const front = document.getElementById('frontFace');
  let sx=0, sy=0, moved=false;
  front.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; moved=false; }, {passive:true});
  front.addEventListener('touchmove', e=>{
    if(Math.abs(e.touches[0].clientX-sx)>10 || Math.abs(e.touches[0].clientY-sy)>10) moved=true;
  }, {passive:true});
  front.addEventListener('touchend', ()=>{ if(!moved) openCard(); });
  front.addEventListener('click', ()=>{ if(!('ontouchstart' in window)) openCard(); });

  document.getElementById('closeZone').addEventListener('click', closeCard);

  // ---- restaurant selection ----
  const options = document.querySelectorAll('.r-option');
  options.forEach(opt=>{
    opt.addEventListener('click', ()=>{
      options.forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // ---- edit mode (oculto: agrega ?editar=1 al final del link para activarlo) ----
  const params = new URLSearchParams(window.location.search);
  const editToggle = document.getElementById('editToggle');
  if(params.get('editar') === '1'){
    editToggle.hidden = false;
    const editables = [document.getElementById('titleText'), document.getElementById('dedicationText')];
    let editMode = false;
    editToggle.addEventListener('click', ()=>{
      editMode = !editMode;
      editables.forEach(el => el.setAttribute('contenteditable', editMode ? 'true' : 'false'));
      editToggle.textContent = editMode ? 'Listo' : 'Editar texto';
      if(editMode && !isOpen){ openCard(); }
    });
  }

  // ---- confirm -> WhatsApp ----
  const toast = document.getElementById('toast');
  const statusNote = document.getElementById('statusNote');
  const confirmBtn = document.getElementById('confirmBtn');

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 3200);
  }

  confirmBtn.addEventListener('click', ()=>{
    const date = document.getElementById('eventDate').value;
    const chosen = document.querySelector('input[name="restaurant"]:checked');

    if(!date || !chosen){
      showToast('Por favor elige la fecha y el restaurante');
      return;
    }

    const [y,m,d] = date.split('-');
    const dateFormatted = `${d}/${m}/${y}`;

    const payload = {
      fecha: dateFormatted,
      hora: HORA_FIJA,
      restaurante: chosen.value,
      dedicatoria: document.getElementById('dedicationText').innerText.trim(),
      enviado: new Date().toISOString()
    };

    try{ localStorage.setItem('confirmacion_cumple', JSON.stringify(payload)); }catch(e){}

    confirmBtn.disabled = true;
    statusNote.textContent = 'Abriendo WhatsApp...';

    const textoMensaje =
      "Como no aceptarte si eres lo más top" +
      "%0AFecha: " + dateFormatted +
      "%0AHora: " + HORA_FIJA +
      "%0ARestaurante: " + chosen.value;

    const waUrl = "https://wa.me/" + phoneNumber + "?text=" + textoMensaje;

    showToast('Confirma por WhatsApp');
    setTimeout(()=>{
      window.open(waUrl, '_blank');
      confirmBtn.disabled = false;
      statusNote.textContent = '';
    }, 500);
  });
})();
