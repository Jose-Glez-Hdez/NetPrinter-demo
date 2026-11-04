# NetPrinter · demo

**NetPrinter** vigila las impresoras de los clientes de una empresa de renting
y convierte sus contadores en la facturación de cada mes.

**[Abrir la demo](index.html)** (los datos son inventados y los cambios no se
guardan).

## Qué hace

- **Agente** para Windows y macOS que encuentra solo las impresoras de la
  red (SNMP, IPP, mDNS) y las conectadas por USB, y lee contadores, tóner,
  piezas y averías. Solo lee: nunca cambia nada en las impresoras.
- **NetPrinter Central**: todos los clientes en un panel, con sedes,
  avisos (tóner bajo, averías, impresoras o equipos sin conexión) por correo
  a los técnicos y a los clientes, y traslados de impresoras entre clientes.
- **Facturación**: cuota mensual, copias incluidas y excesos por trimestre,
  con contratos que empiezan o terminan a mitad de periodo en proporción a sus
  días.
- **Informes en PDF** mensuales y trimestrales para enviar a cada cliente.
- **Actualización automática** de los agentes, firmada, desde el panel.

## Sobre esta demo

Es una copia estática de NetPrinter Central generada con empresas, impresoras
y un año de lecturas inventadas al azar. Se puede navegar por clientes,
impresoras, avisos, contadores y facturación, cambiar de mes o trimestre y
descargar los informes en PDF.

---

NetPrinter es software propietario de Impresoras Renting. Este repositorio
solo contiene la demo; el código no es público. © Impresoras Renting. Todos
los derechos reservados.
