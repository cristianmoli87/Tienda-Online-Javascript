const Clickbutton = document.querySelectorAll ('.button')
const tbody = document.querySelector('.tbody')

let carrito= []

Clickbutton.forEach(btn => {
    btn.addEventListener ('click', agregarItemCarrito)
})

function agregarItemCarrito(e){
    const button=  e.target
    const item = button.closest ('.card')
    const itemTitulo = item.querySelector('.card-title').textContent;    
    const itemPrecio= item.querySelector('.precio').textContent;
    const itemImagen = item.querySelector('.card-img-top').src;
    
    const newItem = {
        titulo:itemTitulo,
        precio: itemPrecio,
        img: itemImagen,
        cantidad: 1
    }

    addItemCarrito (newItem)

}

function addItemCarrito(newItem){

const alert = document.querySelector('.alert')

setTimeout (function() {
alert.classList.add ('hide')
},2000)
alert.classList.remove('hide')


const inputElemento = tbody.getElementsByClassName('input__elemento')

 for (let i=0; i < carrito.length; i++){
     if (carrito[i].titulo.trim() === newItem.titulo.trim()){
         carrito[i].cantidad ++;
         const inputValue = inputElemento[i]
         inputValue.value++;
         CarritoTotal()

         return null;

     }

 }  
 
    carrito.push(newItem)
    
    renderCarrito()


}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item=> {
    const tr = document.createElement ('tr')   
    tr.classList.add('ItemCarrito') 
    const Content = `
    <th scope="row">1</th>
          <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="titulo"> ${item.titulo}  </h6>
          </td>
          <td class="table__precio"><p>${item.precio} </p></td>
          <td class="table__cantidad">
            <input type="number" min="1" value= ${item.cantidad}  class= "input__elemento"  >
             <button class="delete btn btn-danger"> Eliminar </button>
  
          </td>
    
    `
        tr.innerHTML = Content;
        tbody.append(tr)

       tr.querySelector(".delete"). addEventListener('click', removerItemCarrito)     
        tr.querySelector (".input__elemento").addEventListener('change', sumaCantidad)

    } ) 

    CarritoTotal()
}


function CarritoTotal(){
    let Total=0;
    const itemCarroTotal =document.querySelector('.itemCarroTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total= Total + precio*item.cantidad
    })

    itemCarroTotal.innerHTML =  ` Total $${Total}  `
    addLocalStorage()
}


function removerItemCarrito(e){
    const buttonDelete = e.target 
    const tr = buttonDelete.closest (".ItemCarrito")
    const titulo = tr.querySelector('.titulo').textContent;
    for(let i=0; i< carrito.length; i++){
        if(carrito[i].titulo.trim() === titulo.trim()){
            carrito.splice(i,1)
        
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout (function() {
    alert.classList.add ('remove')
    },2000)
    alert.classList.remove('remove')


    tr.remove ()
    CarritoTotal ()
}


function sumaCantidad(e){
    const sumaInput = e.target
    const tr= sumaInput.closest(".ItemCarrito")
    const titulo = tr.querySelector('.titulo').textContent;
    carrito.forEach(item => {
        if(item.titulo.trim()=== titulo){
            sumaInput.value < 1? (sumaInput.value =1 ) : sumaInput.value;
            item.cantidad = sumaInput.value;
    CarritoTotal()

        }
    } )

}

function addLocalStorage (){
    localStorage.setItem ('carrito', JSON.stringify(carrito))
}



window.onload= function (){
    const storage = JSON.parse(localStorage.getItem ('carrito'));
    if (storage){
    carrito = storage;
    renderCarrito()       
    }
}


