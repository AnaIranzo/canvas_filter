
//funcion constructora canvas
function Canvas(){
    this.canvas = null;
    this.ctx = null;
    this.imagen = new Image();
};

Canvas.prototype = {
    inicio: function(){
        if (this.canvas && this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            if (this.ctx) {
                return this.ctx;
                
            } else {
                return null
            }
            
        }
    },
    procesaImagen: function(){
        //this.canvas.limpiar();
        this.ctx.drawImage(this.imagen,10,10, 250, 120);
    },
    filtro: function(){},
    limpiar: function(){},
    cargar: function(archivo){
        this.imagen.src = 'assets/' + archivo;
        this.imagen.onload = function (e) {
            canvas.procesaImagen();
        }
    },
    dibujar: function(){},
};


function Filtro(canvas){
    this.w = canvas.imagen.width;
    this.h = canvas.imagen.height;
    this.imagenData = canvas.ctx.getImagenData(10,10,this.w, this.h); //recuperamos la info de la imagen en la coordenada 10,10
    this.data = imagenData.data; //extraemos la informacion en un objeto 
};

window.onload = function(){
    var archivoSelect = document.getElementById('archivo');
    var filtroSelect = document.getElementById('filtro');

    //Eventos
    archivoSelect.onchange = function (e) {
        canvas.cargar(archivoSelect.value);
        
    };

    filtroSelect.onchange = function (e) {
        canvas.filtro(filtroSelect.value);
        
    };

    //Código
    canvas = new Canvas ();//Creamos un nuevo canvas 
    canvas.canvas = document.getElementById('canvas');
    if (canvas.inicio()) {
        canvas.cargar('cat-gfdb0a53cf_640.jpg');
        
    } else{
        alert('Tu navegador no soporta canvas de HTML5');
    }
}