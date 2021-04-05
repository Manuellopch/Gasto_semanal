//variables
const PrepUsuario = prompt('¿Cual es tu Presupuesto Semanal');
const formulario = document.getElementById('agregar-gasto');
let CantiPrep;
//Clases
class Presupuesto{
     constructor(presupuesto){
     this.presupuesto = Number(presupuesto);
     this.restante = Number(presupuesto);
     }
     PrepRestante(cantidad = 0){
          return this.restante -= Number(cantidad);
     }
}
class Interfaz{
     InsertPrep(cantidad){
     const PrepSpan = document.querySelector('span#total');
     const ResSpan = document.querySelector('span#restante');
     PrepSpan.innerHTML = `${cantidad}`;
     ResSpan.innerHTML = `${cantidad}`;
     }
     ImpMensaje(mensaje, tipo){
          const divmensaje = document.createElement('div');
          divmensaje.classList.add('text-center', 'alert');
          if(tipo === 'error'){
               divmensaje.classList.add('alert-danger');
          }else{
               divmensaje.classList.add('alert-success')
          }
          divmensaje.appendChild(document.createTextNode(mensaje));
          document.querySelector('.primario').insertBefore(divmensaje, formulario);
          setTimeout(function(){
               document.querySelector('.primario .alert').remove();
               formulario.reset();
          },2300)
     }
     AgregarGasList(nombre, cantidad){
          const gastosLis = document.querySelector('#gastos ul');
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
          ${nombre}
         <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;
          gastosLis.appendChild(li);
     }
     PreRestante(cantidad){
          const restante = document.querySelector('#restante');
          const restanteAct = CantiPrep.PrepRestante(cantidad);
          restante.innerHTML = `${restanteAct}`
          this.comprobarPresupuesto();
     }
     comprobarPresupuesto(){
         const total = CantiPrep.presupuesto;
         const toRestante = CantiPrep.restante;
         if((total / 4) > toRestante){
              const restante1 = document.querySelector('.restante');
              restante1.classList.remove('alert-success', 'alert-warning');
              restante1.classList.add('alert-danger');
         }else if((total / 2) > toRestante){
          const restante2 = document.querySelector('.restante');
          restante2.classList.remove('alert-success');
          restante2.classList.add('alert-warning');
     }
}
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
     if(PrepUsuario === null || PrepUsuario === ''){
          window.location.reload();
     }else{
          //Instanciar Presupuesto
          CantiPrep = new Presupuesto(PrepUsuario);
          //Instanciar
          const ui = new Interfaz();
          ui.InsertPrep(CantiPrep.presupuesto);
     }
});
formulario.addEventListener('submit', function(e){
     e.preventDefault();
     const Gasto = document.querySelector('#gasto').value
     const Cantidad = document.querySelector('#cantidad').value
     //instanciar la interfaz
     const ui = new Interfaz();
     if(Gasto === '' || Cantidad === ''){
          ui.ImpMensaje('Hubo un error', 'error');
     }else{
          ui.ImpMensaje('Completado', 'Completado');
          ui.AgregarGasList(Gasto, Cantidad);
          ui.PreRestante(Cantidad);
     }  
});