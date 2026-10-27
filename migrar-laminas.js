// Equivalencias entre el índice original y el índice PB + PA en una lámina.
(function (root) {
  const rules = [
    ['EA-01', ['EA-01','EA-02'], 'Estado actual — Planta baja y planta alta'],
    ['EA-02', ['EA-03'], 'Estado actual — Azotea'],
    ['EA-03', ['EA-04'], 'Estado actual — Cortes y fachadas'],
    ['DEM-01', ['DEM-01','DEM-02'], 'Demoliciones, desmontajes y retiros — Planta baja y planta alta'],
    ['DEM-02', ['DEM-03'], 'Demoliciones, desmontajes y retiros — Azotea'],
    ['ARQ-01', ['ARQ-01','ARQ-02'], 'Proyecto arquitectónico — Planta baja y planta alta'],
    ['ARQ-02', ['ARQ-03'], 'Proyecto arquitectónico — Azotea'],
    ['ARQ-03', ['ARQ-04'], 'Cortes arquitectónicos'],
    ['ARQ-04', ['ARQ-05'], 'Fachadas'],
    ['ALB-01', ['ALB-01','ALB-02'], 'Albañilería, trazo, cotas y niveles — Planta baja y planta alta'],
    ['ALB-02', ['ALB-03'], 'Albañilería, pendientes, pretiles y bases de equipos — Azotea'],
    ['EST-03', ['EST-03','EST-04'], 'Intervenciones y refuerzos en estructura sobre planta baja y planta alta'],
    ['EST-04', ['EST-04'], 'Intervenciones y refuerzos en estructura — Azotea'],
    ['ACA-01', ['ACA-01','ACA-02'], 'Acabados en pisos y muros — Planta baja y planta alta'],
    ['ACA-02', ['ACA-03'], 'Acabados e impermeabilización — Azotea'],
    ['ACA-03', ['ACA-04'], 'Despieces y detalles de acabados'],
    ['PLA-01', ['PLA-01','PLA-02'], 'Plafones, alturas y registros — Planta baja y planta alta'],
    ['HID-01', ['HID-01','HID-02'], 'Instalación hidráulica — Planta baja y planta alta'],
    ['HID-02', ['HID-02'], 'Instalación hidráulica — Azotea'],
    ['SAN-01', ['SAN-01','SAN-02'], 'Instalación sanitaria — Planta baja y planta alta'],
    ['SAN-02', ['SAN-03'], 'Isométricos sanitarios, registros y detalles'],
    ['ELE-01', ['ELE-01','ELE-02'], 'Contactos y fuerza — Planta baja y planta alta'],
    ['ELE-02', ['ELE-02'], 'Contactos y fuerza — Azotea'],
    ['ILU-01', ['ILU-01','ILU-02'], 'Iluminación, apagadores y controles — Planta baja y planta alta'],
    ['ILU-02', ['ILU-02'], 'Iluminación, apagadores y controles — Azotea']
  ];
  function migrate(rows) {
    const byId = new Map(rows.map(r => [r.id, r]));
    const used = new Set(rules.flatMap(r => r[1]));
    const result = [];
    // Emit each specialty where it originally appeared; deleted records stay deleted.
    const emitted = new Set();
    for (const original of rows) {
      const prefix = original.id.split('-')[0];
      if (!used.has(original.id)) { result.push({...original}); continue; }
      if (emitted.has(prefix)) continue;
      emitted.add(prefix);
      for (const [id, sources, name] of rules.filter(r => r[0].split('-')[0] === prefix)) {
        const present = sources.map(key => byId.get(key)).filter(Boolean);
        if (!present.length) continue;
        const applicable = present.filter(r => r.status !== 'No aplica');
        const active = applicable.length ? applicable : present;
        const owners = [...new Set(active.map(r => r.owner))];
        const dates = [...new Set(active.map(r => r.date).filter(Boolean))].sort();
        const progress = active.every(r => r.progress !== null) ? Math.min(...active.map(r => r.progress)) : null;
        let status = applicable.length === 0 ? 'No aplica' : active.every(r => r.status === 'Terminado') ? 'Terminado' : active.some(r => r.status === 'Con bloqueo') ? 'Con bloqueo' : active.every(r => r.status === active[0].status) ? active[0].status : 'En proceso';
        const trace = present.map(r => `${r.id}: ${r.name}; ${r.owner}; ${r.status}; ${r.progress === null ? 'sin avance confirmado' : r.progress+' %'}; fecha ${r.date || 'sin fecha'}${r.notes ? '; '+r.notes : ''}`).join('\n');
        result.push({...present[0], id, name, owner:owners.length === 1 ? owners[0] : 'Sin asignar', date:dates[0] || '', delivery:dates[0] === '2026-10-27', progress, status, notes:'Reorganización PB + PA. Origen (claves anteriores):\n'+trace+(owners.length > 1 ? '\nResponsable de la lámina unificada por confirmar.' : '')+(dates.length > 1 ? '\nFechas originales distintas; se conserva la más próxima.' : '')});
      }
    }
    return result;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {migrate, rules};
  else root.migrarLaminas = migrate;
})(typeof window !== 'undefined' ? window : {});
