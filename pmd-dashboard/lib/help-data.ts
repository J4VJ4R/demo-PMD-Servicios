import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  ShieldCheck, 
  PlayCircle,
  HelpCircle,
  FileQuestion,
  BookOpen
} from "lucide-react";

export type HelpArticle = {
  slug: string;
  title: string;
  description: string;
  category: "General" | "Administración" | "Gestión" | "Legal";
  roles: string[];
  content: string;
  videoUrl?: string; // URL for embedded video or link
  relatedLinks?: { title: string; href: string }[];
  icon?: any;
};

export const helpArticles: HelpArticle[] = [
  {
    slug: "introduccion-plataforma",
    title: "Introducción a la Plataforma PMD",
    description: "Conozca los conceptos básicos y cómo navegar por el panel de control.",
    category: "General",
    roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER'],
    icon: LayoutDashboard,
    content: `
      ## Bienvenido a PMD Servicios
      
      Esta plataforma ha sido diseñada para centralizar la gestión de Seguridad y Salud en el Trabajo. Aquí podrá:
      
      - Supervisar auditorías en tiempo real.
      - Gestionar documentación legal y técnica.
      - Mantener el cumplimiento normativo.
      
      ### Primeros Pasos
      
      1. **Panel de Control (Resumen)**: Su vista principal con indicadores clave.
      2. **Navegación**: Utilice el menú lateral para acceder a las diferentes secciones.
      3. **Perfil**: Configure sus preferencias desde el menú de usuario.
      
      > **Nota**: Si necesita asistencia inmediata, contacte a soporte@pmdservicios.com.
    `,
    videoUrl: "https://www.youtube.com/embed/placeholder" // Placeholder
  },
  {
    slug: "gestion-usuarios",
    title: "Gestión de Usuarios y Roles",
    description: "Aprenda a crear, editar y administrar permisos de usuarios en el sistema.",
    category: "Administración",
    roles: ['ADMIN_PMD'],
    icon: Users,
    content: `
      ## Administración de Usuarios
      
      Como administrador, usted tiene el control total sobre quién accede a la plataforma.
      
      ### Crear un Nuevo Usuario
      
      1. Vaya a la sección **Usuarios** en el menú lateral.
      2. Haga clic en el botón **"Nuevo Usuario"**.
      3. Complete los campos obligatorios: Nombre, Correo, Rol.
      
      ### Tipos de Roles
      
      - **Administrador (ADMIN_PMD)**: Acceso total.
      - **Consultor**: Puede gestionar proyectos y documentos.
      - **Cliente**: Acceso de solo lectura a sus proyectos asignados.
      
      [Espacio para Video Tutorial: Creación de Usuarios]
    `
  },
  {
    slug: "carga-documentos",
    title: "Carga y Gestión de Documentos",
    description: "Guía paso a paso para subir, clasificar y versionar documentos.",
    category: "Gestión",
    roles: ['ADMIN_PMD', 'CONSULTANT'],
    icon: FileText,
    content: `
      ## Gestión Documental
      
      La plataforma permite almacenar y organizar toda la documentación SST.
      
      ### Subir un Documento
      
      1. Navegue a **Documentos**.
      2. Seleccione la carpeta o proyecto destino.
      3. Arrastre el archivo o haga clic en **Subir**.
      
      ### Control de Versiones
      
      El sistema mantiene un historial de cambios. Al subir un archivo con el mismo nombre, se creará una nueva versión automáticamente.
      
      *(Funcionalidad en desarrollo: Firma digital de documentos)*
    `
  },
  {
    slug: "reportes-cumplimiento",
    title: "Visualización de Reportes",
    description: "Cómo interpretar las gráficas y reportes de cumplimiento normativo.",
    category: "General",
    roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER'],
    icon: ShieldCheck,
    content: `
      ## Reportes e Indicadores
      
      En la sección **Resumen**, encontrará gráficas interactivas.
      
      - **Cumplimiento Global**: Porcentaje general de avance.
      - **Auditorías Pendientes**: Alertas sobre inspecciones próximas.
      
      Puede exportar estos reportes en formato PDF o Excel desde el botón "Exportar" en la esquina superior derecha.
    `
  },
  {
    slug: "configuracion-cuenta",
    title: "Configuración de Cuenta",
    description: "Cambio de contraseña y actualización de datos personales.",
    category: "General",
    roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER'],
    icon: Settings,
    content: `
      ## Mi Perfil
      
      Para mantener su cuenta segura:
      
      1. Haga clic en su nombre en la barra lateral.
      2. Seleccione **Configuración**.
      3. Aquí podrá actualizar su contraseña y foto de perfil.
      
      Recomendamos usar una contraseña segura de al menos 8 caracteres.
    `
  }
];
