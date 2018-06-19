
## TO-DO list


### Calendar

LAbel <---- -----> Today [<][>] Filtro por legajo (input) arriba
**color legend**

Color coded events de acuerdo al tipo
Grey out dias feriados -> `GET /calendario/noLaborables?anio=:anio`
Grey out eventos fuera del mes
Al buscar hacerle remarco a los eventos que aplican

#### Planificador
LAbel <---- -----> Today [<][>] Filtro por legajo (input) arriba

Click in calendar para generar eventos **genericos** (special type)

Request:  `GET /eventosCalendario?_query=unidadTectinca.id==1&fechaComienzo=ge=2018-01-01&fechaFin=le=2018-03-31`

Big filter on the side: {
    Breadcrumb on the top
    input razon social
    lista clientes -> `GET /clientes/activos?idUnidadTecnica=:id`

    presupuesto aceptado indicador/checkbox tri-state
    trabajo finalizado indicador/checkbox tri-state
    OT/SUT/RUT input
    numero(legajo?) input -> 3 campos -> 2 fixed (18-CE-XXXXX)

    action Buscar -> ruta ????????
    action Limpiar (necesario????)
}
Al filtrar muestra resultados en una tabla con headers => Trabajo | LT | <?> (leyenda)
Al clickear un resultado muestra lista de actividades


Listado clientes : [
    {
      "id": 1,
      "razon_social": "Hasar",
     ....
     },
]
Payload planificador: 
```
{
    "eventos": [
        {
            "type": "ar.gob.inti.gdp.rest.bean.EventoCalendarioUsoCamara",
            "id": null,
            "fechaComienzo": "2017-12-21",
            "tiempoComienzo": "08:30:00",
            "fechaFin": "2017-12-21",
            "tiempoFin": "13:30:00",
            "descripcion": "Emisión conducida 17-CE-104",
            "unidadTecnicaId": null,
            "usuarioId": null,
            "tipoActividad":
            "ar.gob.inti.gdp.recursos.modelo.proceso.subelementos.EmisionConducida",
            "planFijo": false,
            "trabajoConInicializacionPlanificada": false,
            "esUltimoEventoDelTrabajo": false
        },
        ...
    ],
    "remanentes":[
        {
            "descripcion": "Asistencia 17-CE-008"
        },
        ....
    ]
}
```

#### CSA

Ruta: `GET /eventosCalendario`

Playload:
```
{
    descripcion: 'Descripcion del evento',
    fechaComienzo; 'YYYY-MM-DD',
    tiempoComienzo; 'YYYY-MM-DD'
    tiempoFin; 'hh:mm:ss',
    fechaFin: 'hh:mm:ss',
    planFijo: true || false,
    trabajoConInicializacionPlanificada: true || false,
    esUltimoEventoDelTrabajo: true || false,
    tipoActividad:
    'EmisionConducida' || 'EmisionRadiada' || 'InmunidadConducida' ||
    'InmunidadRadiada' || 'TipoInicializacion'
}
```

### Trabajos de UT

#### Generar trabajo
El objectivo de esta pagina es la creacion de trabajos. 

Genera trabajo nuevo -> Formulario
`POST /trabajos`

Formulario: 
* Fecha de pedido (date picker!)
* Trabajo a realizar (select con posibles trabajos) -> `GET /codigosProceso`
* Clientes del trabajo (groupbox)
    * Autocomplete input (solo se pueden ingresar clientes conocidos)
    * Tabla de clientes asignados (columnas -> Activo (indicador si es activo (disabled checkbox?)) | Razon Social | (button para remover))
* Contactos del trabajo (groupbox)
    * Autocomplete input (solo se pueden ingresar contactos conocidos)
    * Tabla de contactos asignados (columnas -> Activo (indicador si es activo (disabled checkbox?)) | Descripcion | (button para remover))

#### Buscar
Aparentemente en esta pagina es donde se hace la administaracion de cada trabajo
La persona buscar un trabajo y realiza una serie de acciones sobre él.

Filtro igual al del calendar -> `GET /trabajos?_query=numero.numero==18-CE-0001`
Al hacer click en un resultado muestra detalles del ensayo -> `GET /trabajos/{id}?_acciones`
En los detalles hay un sidemenu con todas las acciones posibles: 

* Realizar pedido al cliente
* Gestionar contactos
* Gestionar clientes
* Finalizar trabajo
* Enviar Factibilidad
* Asignar OT/SOT/RUT
* Ver hoja de ruta -> `/hojaDeRuta?legajo=:numero`

Y adentro tiene una lista con las actividades y cada actividad tiene sus acciones dadas por el payload anterior.
EN DUDA: las accione se ejecutan con `POST /acciones/ejecucion/{tipoEvento}/{id}`

* Delete actividad -> `DELETE /actividades/:id`


#### Sin OT/SOT/RUT
El objetivo de esta vista es poder asignar OT/SOT/RUT a trabajos "huerfanos"

Listado trabajos -> `GET /actividades`
Tabla headers => Trabajo( tagTypeJobIcon + title) | LT(legajo) | OT/SOT/RUT(select entre esas 3) | Campo extra (q se habilita una vez selectionado para meter el numero) | Guardar button
Tiene paginacion (backend probablemente)


### Clientes

#### Nuevo
Crea nuevo cliente, formulario -> `POST /clientes`
* Razon social
* Cuit
* Telefono
* Fax
* Domicilio
* Localidad
* Provincia

#### Ver todos
Permite ver un listado completo de los clientes (No tabla) y realizar ciertas acciones -> `GET /clientes`

Cada item tiene:
* Nombre del cliente
* Telefono, Fax, Domicilio, Localidad, Provincia
* Tabla de contactos, header -> Nombre y apellido | Email | Boton para quitar -> `/contactos/clientes/:id`

Acciones por item: 
* Modificar cliente -> Basicamente redirige al form de creacion pero con todos los campos ya completados -> `PUT /clientes`
* Eliminar cliente -> Confirm modal -> `DELETE /clientes/:id`
* Asociar contacto -> Muestra modal con current lista y autocomplte input para ir agregando


### Contactos

#### Nuevo
Crea nuevo contacto, formulario -> `POST /contactos`
* Nombre y apellido
* Email

#### Ver todos
Permite ver un listado completo de los contactos y realizar ciertas acciones -> `GET /contactos`

Cada item tiene:
* Nombre y apellido
* Email
* Tabla de clientes asociados con ese contacto -> razonSocial |  -> `/clientes/contactos/:id`

Acciones por item: 
* Modificar contacto -> Basicamente redirige al form de creacion pero con todos los campos ya completados -> `PUT /contactos`
* Eliminar contacto -> Confirm modal -> `DELETE /contactos/:id`
* Asociar cliente -> Muestra modal con current lista y autocomplte input para ir agregando
