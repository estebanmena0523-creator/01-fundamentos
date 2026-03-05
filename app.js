/**
 * Realiza conversiones de Temperatura, Longitud y Peso.
 * @param {number} valor - Cantidad numérica.
 * @param {string} origen - Unidad inicial (ej: 'C', 'km', 'lb').
 * @param {string} destino - Unidad final (ej: 'F', 'm', 'g').
 */
function conversorUniversal(valor, origen, destino) {
  // 1. Normalización y validación de tipos
const v = parseFloat(valor);
const uOri = origen?.toLowerCase().trim();
const uDes = destino?.toLowerCase().trim();

  if (isNaN(v)) {
    return "❌ Error: El valor ingresado no es un número válido.";
  }
  const unidades = {
    temperatura: ['c', 'f', 'k'],
    longitud: ['m', 'cm', 'km'],
    peso: ['kg', 'g', 'lb']
  };
  let categoria = null;
  for (const [cat, lista] of Object.entries(unidades)) {
    if (lista.includes(uOri)) {
      if (lista.includes(uDes)) {
        categoria = cat;
        break;
      } else {
        return `❌ Error: No puedes convertir '${uOri}' (${cat}) a '${uDes}'.`;
      }
    }
  }

  if (!categoria) {
    return `❌ Error: Unidad '${uOri}' no reconocida.`;
  }
  let resultado;

  switch (categoria) {
    case 'temperatura':
      // Convertimos todo a Celsius como base
      let celsius;
      if (uOri === 'c') celsius = v;
      else if (uOri === 'f') celsius = (v - 32) * 5 / 9;
      else if (uOri === 'k') celsius = v - 273.15;

      // De Celsius al destino
      if (uDes === 'c') resultado = celsius;
      else if (uDes === 'f') resultado = (celsius * 9 / 5) + 32;
      else if (uDes === 'k') resultado = celsius + 273.15;
      break;

    case 'longitud':
      // Base: Metros (m)
      const factoresLongitud = { m: 1, cm: 0.01, km: 1000 };
      resultado = (v * factoresLongitud[uOri]) / factoresLongitud[uDes];
      break;

    case 'peso':
      // Base: Gramos (g)
      const factoresPeso = { g: 1, kg: 1000, lb: 453.592 };
      resultado = (v * factoresPeso[uOri]) / factoresPeso[uDes];
      break;
    } return `✅ ${v} ${uOri.toUpperCase()} equivale a ${resultado.toFixed(2)} ${uDes.toUpperCase()}`;
}

// --- Ejemplos de uso ---
console.log(conversorUniversal(10, "C", "F"));    // Temperatura: 212.00 F
console.log(conversorUniversal(5, "km", "m"));    // Longitud: 5000.00 M
console.log(conversorUniversal(10, "kg", "lb"));  // Peso: 22.05 LB
console.log(conversorUniversal(10, "m", "kg"));   // Error de categoría

