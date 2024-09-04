(function(global) {
    var minhaBiblioteca = {};

    minhaBiblioteca.mostrarMensagem = function() {
        alert('Mensagem da minha biblioteca JavaScript externa!');
    };

    global.minhaBiblioteca = minhaBiblioteca;
})(this);
