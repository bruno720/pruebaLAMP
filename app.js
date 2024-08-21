function librofrm() {
    let TK = `
    <center style="text-transform: capitalize;text-decoration: underline;color: red;font-size: 24px;">Registrar libro</center>
    <form id="F1">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" style="text-transform: capitalize">titulo del libro</label>
            <input class="form-control" name="titu">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" style="text-transform: capitalize">autor del libro</label>
            <input class="form-control" name="autor">
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label" style="text-transform: capitalize">seleccione el tipo</label>
            <select id="disabledSelect" class="form-select" name="tipo">
                <option>literario</option>
                <option>ficcion</option>
                <option>biografia</option>
                <option>texto</option>
                <option>otros</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label" style="text-transform: capitalize">Precio del libro</label>
            <input class="form-control" name="prec" type="number">
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label" style="text-transform: capitalize">select menu</label>
            <select id="disabledSelect" class="form-select" name="std">
                <option>act</option>
                <option>del</option>
                <option>arh</option>
            </select>
        </div>
        <center><button type="submit" class="btn btn-primary">REGISTRAR</button></center>
    </form>`;
    document.getElementById('C1').innerHTML = TK;
    document.getElementById('F1').addEventListener('submit', e => {
        e.preventDefault();
        showAlert();
        const FD = new FormData(document.getElementById('F1'));
        fetch(`api/librosave`, { method: "POST", body: FD })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.resp) {
                    alert('Libro registrado exitosamente');
                    librolist();
                } else {
                    alert('No se pudo registrar el libro');
                }
            })
            .catch(err => { alert('Ocurrió un error') });
    });
}

function librolist() {
    fetch(`api/librolist`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let TK = `
            <h2>Lista de libros</h2>
            <table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">titulo</th>
            <th scope="col">autor</th>
            <th scope="col">tipo</th>
            <th scope="col">Precio</th>
            <th scope="col">std</th>
            <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>`;
            for (P = 0; P < data.list.length; P++) {
                let libro = data.list[P];
                TK += `
                <tr>
                    <th scope="row">${P + 1}</th>
                    <td>${libro.titu}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.tipo}</td>
                    <td>${libro.prec}</td>
                    <td>${libro.std}</td>
                    <td>
                        <button class="btn btn-danger" onclick="librodel(${libro.numl})">Eliminar</button>
                        <button class="btn btn-warning" onclick="libroedit(${libro.numl}, '${libro.titu}', '${libro.autor}', '${libro.tipo}', ${libro.prec}, '${libro.std}')">Editar</button>
                    </td>
                </tr>`;
            }
            TK += `
                </tbody>
            </table>`;
            document.getElementById('C1').innerHTML = TK;
        })
        .catch(err => { alert('Ocurrió un error') });
}

function librodel(numl) {
    fetch(`api/librodel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numl: numl })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.resp) {
                alert('Libro borrado exitosamente');
                librolist();
            } else {
                alert('No se pudo borrar el libro');
            }
        })
        .catch(err => { alert('Ocurrió un error') });
}

function libroedit(numl, titu, autor, tipo, prec, std) {
    let newTitu = prompt("Nuevo título", titu);
    let newAutor = prompt("Nuevo autor", autor);
    let newTipo = prompt("Nuevo tipo", tipo);
    let newPrec = prompt("Nuevo precio", prec);
    let newStd = prompt("Nuevo estado", std);

    fetch(`api/libroedit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numl: numl,
            titu: newTitu,
            autor: newAutor,
            tipo: newTipo,
            prec: newPrec,
            std: newStd
        })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.resp) {
                alert('Libro editado exitosamente');
                librolist();
            } else {
                alert('No se pudo editar el libro');
            }
        })
        .catch(err => { alert('Ocurrió un error') });
}
