const convertirUnidades = (valor, origen, destino) => {
  // 1. Normalización de entradas
  const v = parseFloat(valor);
  const unitOri = origen.toLowerCase();
  const unitDes = destino.toLowerCase();

  // 2. Definición de Categorías y Factores (Unidades base: metros y gramos)
  const tablas = {
    longitud: {
      m: 1,
      cm: 0.01,
      km: 1000
    },
    peso: {
      g: 1,
      kg: 1000,
      lb: 453.592
    }
  };

  // 3. Validar si el valor es numérico
  if (isNaN(v)) {
    return "❌ Error: El valor debe ser un número. Ejemplo: 100";
  }

  // 4. Lógica para TEMPERATURA (Requiere fórmulas, no solo factores)
  const unidadesTemp = ['c', 'f', 'k'];
  if (unidadesTemp.includes(unitOri)) {
    if (!unidadesTemp.includes(unitDes)) {
      return `❌ Error: No se puede convertir temperatura (${unitOri}) a otra categoría (${unitDes}).`;
    }
    
    // Paso a Celsius como base
    let celsius;
    if (unitOri === 'c') celsius = v;
    else if (unitOri === 'f') celsius = (v - 32) * 5/9;
    else if (unitOri === 'k') celsius = v - 273.15;

    // De Celsius a destino
    let resTemp;
    if (unitDes === 'c') resTemp = celsius;
    else if (unitDes === 'f') resTemp = (celsius * 9/5) + 32;
    else if (unitDes === 'k') resTemp = celsius + 273.15;

    return `✅ ${v}${unitOri.toUpperCase()} = ${resTemp.toFixed(2)}${unitDes.toUpperCase()}`;
  }

  // 5. Lógica para LONGITUD y PESO
  for (const [categoria, unidades] of Object.entries(tablas)) {
    if (unidades.hasOwnProperty(unitOri)) {
      if (!unidades.hasOwnProperty(unitDes)) {
        return `❌ Error: La unidad '${unitDes}' no pertenece a la categoría ${categoria}.`;
      }

      // Convertir a base, luego a destino
      const valorEnBase = v * unidades[unitOri];
      const resultado = valorEnBase / unidades[unitDes];
      
      return `✅ ${v}${unitOri} = ${resultado.toFixed(4)}${unitDes}`;
    }
  }

  return `❌ Error: La unidad de origen '${origen}' no es reconocida por el sistema.`;
};

// --- Ejemplos de uso ---
console.log(convertirUnidades(100, "C", "F"));    // Temperatura
console.log(convertirUnidades(5, "km", "m"));    // Longitud
console.log(convertirUnidades(10, "kg", "lb"));  // Peso
console.log(convertirUnidades("abc", "kg", "g")); // Error de valor
console.log(convertirUnidades(10, "kg", "m"));   // Error de categoría
