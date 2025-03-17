# Control de Gastos

Este proyecto es una aplicación web para gestionar tus finanzas personales. Permite a los usuarios agregar, editar y eliminar billeteras, registrar transacciones y visualizar un historial de transferencias. Está desarrollado con **React**, **TypeScript** y **Vite**.

## Características

- **Gestión de billeteras**: Crea, edita y elimina billeteras con un nombre y un monto inicial.
- **Registro de transacciones**: Agrega transacciones de ingresos o egresos a cada billetera.
- **Historial de transferencias**: Visualiza un listado de todas las transacciones realizadas.
- **Interfaz moderna**: Diseño simple y funcional para una experiencia de usuario fluida.

## Tecnologías utilizadas

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <strong>React</strong>: Biblioteca para construir interfaces de usuario dinámicas.
</div>

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <strong>TypeScript</strong>: Tipado estático para mejorar la calidad del código.
</div>

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="ViteJs" width="40" height="40"/>
  <strong>ViteJs</strong>: Herramienta de desarrollo rápida y eficiente.
</div>

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" width="40" height="40"/>
  <strong>Tailwind CSS</strong>: Framework de utilidades para estilizar la interfaz.
</div>

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" alt="React Router" width="40" height="40"/>
  <strong>React Router</strong>: Manejo de rutas para la navegación entre páginas.
</div>

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" alt="ESLint" width="40" height="40"/>
  <strong>ESLint</strong>: Linter para mantener un código limpio y consistente.
</div>

## Instalación

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/mauro25987/control-de-gastos.git
   cd control-de-gastos
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre la aplicación en tu navegador en [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la aplicación después de construirla.
- `npm run lint`: Ejecuta ESLint para verificar errores en el código.

## Estructura del proyecto

```plaintext
src/
├── components/       # Componentes reutilizables
├── context/          # Contextos de React para el estado global
├── hooks/            # Hooks personalizados
├── pages/            # Páginas principales de la aplicación
├── services/         # Funciones auxiliares y lógica de negocio
├── types/            # Definiciones de tipos de TypeScript
├── App.tsx           # Componente principal de la aplicación
├── main.tsx          # Punto de entrada de la aplicación
└── index.css         # Estilos globales
```

## Funcionalidades principales

### 1. Gestión de billeteras

- Agregar una nueva billetera con un nombre y un monto inicial.
- Editar el nombre de una billetera existente.
- Eliminar una billetera.

### 2. Registro de transacciones

- Agregar transacciones de tipo ingreso o egreso.
- Editar el nombre de una transacción existente.
- Actualizar automáticamente el saldo de la billetera según las transacciones.

### 3. Historial de transferencias

- Visualizar todas las transacciones realizadas, incluyendo descripción, monto y fecha.

## Configuración de ESLint

Este proyecto utiliza ESLint con reglas específicas para React y TypeScript. Puedes expandir la configuración siguiendo las recomendaciones en la documentación oficial de ESLint.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar Control de Gastos! 😊
