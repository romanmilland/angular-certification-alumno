# NOTAS

## Flujo 

Lo primero que tiene que mostrar al usuario entrar en la pagina web es la home, en ella podrá iniciar sesión.

Una vez iniciado la sesión debe llevarle inmediatamente al dashboard. Dependiendo del role del usuario, le aparecerán diferentes opciones que podrá realizar.

También en el header le aparecerá un botón de cerrar sesión, regresando al usuario al home.


### Acciones abilitadas según el role: 

- *Admin*: Ver, añadir, actualizar y borrar a cualquier usuario
- *Editor*: Ver y actulizar (no puede modifcar el role) a cualquier usuario
- *Viwer*: Ver a cualquier usuario


## Componentes

| Componente | Acceso | Nota | funcionalidad |
| --- | --- | --- | --- |
| header | Sin logear, Admin, Editor, Viwer |  | mostrar título y botón de cerrar sesión |
| home | Sin logear, Admin, Editor, Viwer |  | mostrar botón de iniciar sesión |
| dashboard | Admin, Editor, Viwer |  | mostrar diferentes tipos de opciones según el rol |
| formUser | Admin, Editor | Editor no puede modificar usurio | posibilidad de añadir u modificar usuario (si es modificar tieen que aparecer la info previamente) |
| listUser | Admin, Editor, Viwer |  | mostrar la info de cada usuario y con un btón de borrar el usuario. |
| modalDeleteUser | Admin | Tengo que ver cual es la mejor forma de implementarla | confirmación de borrar usuario |
| userService |  | mirar si los datos los agrego fuera | hacer el CRUD |
| authGuard |  |  | no dejar pasar si no estas logeado |
| roleGuard |  |  | restringir según el role |
| sidebar | Admin, Editor, Viwer | No mostrara enlaces que no tenga acceso según el rol del usuario | redirigir a dashboard, formUser o listUser |
| footer | Sin logear, Admin, Editor, Viwer |  | mostrar información legal y del creador |


