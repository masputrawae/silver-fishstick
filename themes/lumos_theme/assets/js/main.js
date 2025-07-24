document.addEventListener('DOMContentLoaded', ()=> {
  
  document.querySelectorAll('[data-sidebar]').forEach(btn => {
    const targetId = btn.getAttribute('data-sidebar');
    const targetEl = document.getElementById(targetId);

    btn.addEventListener('click', ()=>{
      targetEl.classList.toggle('sidebar--isOpen');
    })
  })

})