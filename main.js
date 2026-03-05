// construit un conversor dque reciba una entrada  (valor +  unidad de origen + unidad de destino)
// validae correctamente la entrada y devolver el valor formateado

const { useSyncExternalStore } = require("react")

// Temperatura: C, F, K
// Longitud: m, cm, km
// Peso: kg, g, lb

// Temperatura
- C a F: (C * 9/5) + 32
- C a K: C + 273.15
- F a C: (F - 32) * 5/9
- F a K: (F - 32) * 5/9 + 273.15
- K a C: K - 273.15
- K a F: (K - 273.15) * 9/5 + 32

// Longitud
- m a cm: m * 100
- m a km: m / 1000
- cm a m: cm / 100
- cm a km: cm / 100000
- km a m: km * 1000
- km a cm: km * 100000

// Peso
- kg a g: kg * 1000
- kg a lb: kg * 2.20462
- g a kg: g / 1000
- g a lb: g / 453.592
- lb a kg: lb / 2.20462
- lb a g: lb * 453.592
// Restricciones
// No usar librerias
//debes validar entradas y manejar errores de forma adecuada
//el programa no debe romperse ante entradas invalidas,
 //sino que debe informar al usuario de manera clara y amigable sobre el error y cómo corregirlo.