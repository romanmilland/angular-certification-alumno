# Entrega · Certificación Angular

## Datos

- Nombre:
- Fecha Día 1:
- Fecha de entrega del ejercicio:
- Herramientas externas utilizadas:

## Día 1 · Test general

Pega aquí la exportación generada por la aplicación.

```text
G01: C

G02: A

G03: D

G04: B

G05: A

G06: D

G07: C

G08: B

G09: D

G10: C

G11: A

G12: B

G13: C

G14: D

G15: B

G16: A

G17: D

G18: B

G19: A

G20: C

```

## Día 1 · Análisis de código

Pega aquí la exportación, incluidas las justificaciones.

```text

C01: D
Justificación: Causa:
El .push() añade un nuevo valor al array de forma silenciosa, con lo que no "avisa" del cambio

Corrección:
  items = signal<Item[]>([]);

  add(item: Item) {
    this.items.update(list => [...list, item]);
  }
De esta forma, se crea un array nuevo y añadiendo el nuevo valor activando la detección de cambios

C02: A
Justificación: Causa: 
Los signals deben ser llamados como una función, osea con los paréntesis: "()"

Corrección:
count = signal(2);

double = computed(() => this.count() * 2);

C03: C
Justificación: Causa:
Al no ser un signal el objeto user sigue siendo el mismo y esto puede generar errores. 

Corrección: 
  user = signal({ id: 1, name: 'Ana' });

  rename() {
    this.user.update(updateUser => ({ ...updateUser, name: 'María' }));
  }

<app-user-card [user]="user()" />

Con estos cambios la reactividad es más estable y con OnPush funciona perfecto

C04: B
Justificación: Causa:
$index añade un id según el orden de la lista, pero si esta se modifica puede generar errores 

Corrección:
@for (item of sortedItems(); track item.id) {
  <app-editable-row [item]="item" />
}
Es más seguro usarlo con un id estable si se va a manipular la lista

C05: D
Justificación: Causa: 
Como comenta la respuesta, setValue() exige pasar todos los datos osea: name, email  y role 

Corrección:
form = this.fb.group({
  name: [''],
  email: [''],
  role: ['Viewer']
});

loadDraft() {
  this.form.patchValue({ name: 'Ana' });
}
Simplemente con cambiarlo a patchValue() debería solucionarse, para estos casos es preferible que usar setValue() y tener que pasar toda la estructura de datos.

C06: B
Justificación: Causa:
Crear suscripciones en fila puede generar problemas. Con switchMap() podemos resolver este problema.

Corrección:
this.route.paramMap.pipe(
  switchMap(params => {
    const id = params.get('id')!;
    return this.api.getUser(id);
  })
).subscribe(user => {
  this.user.set(user);
});

De esta forma si cambiamos rápidamente de ruta switchMap() cancela la anterior.

C07: A
Justificación: Causa:
Necesitamos saber cuando el componente se destruye para poder cancelar la suscripción.

Corrección: 
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    interval(1000).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.ticks.update(value => value + 1);
      });
  }
Tenemos que usar el destroyRef por no estar en una inyección ej: constructor(). destroyRef es quien da la info de que el compo se ha destruido

C08: C
Justificación: Causa: si tenemos una  constante donde nos devuelve un observable, lo más recomendable es usar el | async para que angular gestione todo lo relacionado a este observable.

Corrección:
@for (user of users$ | async; track user.id) {
  <p>{{ user.name }}</p>
}

C09: B
Justificación: Causa: Esta de la forma clásica, donde carga el componente en su carga inicial. Para evitarlo podemos usar el lazyload

Corrección: 
import { ReportsPage } from './reports/reports.page';

export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then(m => m.ReportsPage)
 }
];

C10: A
Justificación: Causa: El usuario puede añadir código malicioso y por lo que sé bypassSecurityTrustHtml() lo marca como seguro. Eso es peligroso.

Corrección: 
No sabría darte la solución correcta, pero como mínimo no añadir el bypassSecurityTrustHtml()

```

## Ejercicio de casa

El ejercicio se entrega directamente en `src/app/take-home/users/`. No es necesario documentar aquí las decisiones técnicas de la implementación.

## Comandos ejecutados

```text
npm run build
npm test
```

## Incidencias conocidas

Indica aquí cualquier requisito no completado o error que permanezca.

> El live coding se realiza en directo el Día 2 y no forma parte de esta entrega previa.
