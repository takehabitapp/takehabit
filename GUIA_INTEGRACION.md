# 🚀 Guía Completa de Integración - TakeHabit

Esta guía te llevará paso a paso desde la webapp actual (solo frontend) hasta una aplicación completamente funcional con base de datos, IA y dominio personalizado.

## 📊 Estado Actual vs Estado Final

### ✅ Lo que YA tienes:
- ✅ Interfaz de usuario completa (React + Vite)
- ✅ Navegación entre páginas (React Router)
- ✅ Componentes visuales (Landing, Dashboard, CreateHabitAI, etc.)
- ✅ Estilos y diseño moderno

### ❌ Lo que FALTA (y vamos a implementar):
- ❌ Base de datos real (actualmente todo es temporal en memoria)
- ❌ Autenticación de usuarios (login/registro real)
- ❌ Persistencia de datos (los hábitos desaparecen al recargar)
- ❌ Integración con ChatGPT para generar hábitos con IA
- ❌ Despliegue en internet con dominio personalizado

---

## 🎯 FASE 1: CONFIGURACIÓN DE SUPABASE (Base de Datos)

### Paso 1.1: Crear cuenta y proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto:
   - Nombre: `takehabit`
   - Database Password: **Guarda esta contraseña en un lugar seguro**
   - Region: Elige la más cercana a ti (Europe West para España)
4. Espera 2-3 minutos mientras se crea el proyecto

### Paso 1.2: Obtener credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia estos dos valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon/public key** (una clave larga que empieza con `eyJ...`)

### Paso 1.3: Crear el esquema de base de datos

1. En Supabase, ve a **SQL Editor**
2. Crea una nueva query y pega este código:

```sql
-- Tabla de usuarios (Supabase ya tiene auth.users, pero necesitamos info adicional)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de hábitos
CREATE TABLE public.habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  daily_goal TEXT,
  tips TEXT[],
  motivation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de progreso diario
CREATE TABLE public.daily_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(habit_id, date)
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_habits_user_id ON public.habits(user_id);
CREATE INDEX idx_habits_active ON public.habits(is_active);
CREATE INDEX idx_daily_progress_habit_id ON public.daily_progress(habit_id);
CREATE INDEX idx_daily_progress_date ON public.daily_progress(date);

-- Row Level Security (RLS) - Seguridad a nivel de fila
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas de seguridad para habits
CREATE POLICY "Users can view own habits" ON public.habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own habits" ON public.habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON public.habits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON public.habits
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas de seguridad para daily_progress
CREATE POLICY "Users can view own progress" ON public.daily_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress" ON public.daily_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.daily_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON public.daily_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Ejecuta la query (botón "Run" o F5)

### Paso 1.4: Instalar dependencias en tu proyecto

Ejecuta estos comandos en tu terminal:

```bash
npm install @supabase/supabase-js
```

---

## 🤖 FASE 2: CONFIGURACIÓN DE CHATGPT API

### Paso 2.1: Obtener API Key de OpenAI

1. Ve a [https://platform.openai.com](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** en el menú
4. Clic en **Create new secret key**
5. **Copia la clave inmediatamente** (solo se muestra una vez)
6. **IMPORTANTE**: Necesitarás añadir crédito a tu cuenta (mínimo $5 USD)

### Paso 2.2: Instalar dependencias

```bash
npm install openai
```

---

## 🔧 FASE 3: CONFIGURAR VARIABLES DE ENTORNO

### Paso 3.1: Crear archivo .env

1. Crea un archivo llamado `.env` en la raíz del proyecto (ya existe `.env.example`)
2. Copia este contenido y reemplaza con tus valores reales:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon_aqui

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-tu-clave-openai-aqui
```

### Paso 3.2: Verificar .gitignore

Asegúrate de que `.env` está en tu `.gitignore` para no subir las claves a Git.

---

## 💻 FASE 4: IMPLEMENTAR CÓDIGO DE INTEGRACIÓN

Esta fase la haré yo por ti. Incluye:

1. **Cliente de Supabase** (`src/lib/supabase.js`)
2. **Servicio de OpenAI** (`src/lib/openai.js`)
3. **Context de Autenticación** (`src/context/AuthContext.jsx`)
4. **Hooks personalizados** (`src/hooks/useHabits.js`, `src/hooks/useProgress.js`)
5. **Actualizar componentes** para usar datos reales en lugar de mock data

---

## 🌐 FASE 5: DESPLIEGUE Y DOMINIO

### Opción A: Vercel (Recomendado)

1. Ve a [https://vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Sube tu proyecto a GitHub
4. En Vercel: **Import Project** → Selecciona tu repositorio
5. Configura las variables de entorno (las mismas del archivo `.env`)
6. Deploy

### Opción B: Netlify

Similar a Vercel, también muy bueno para React.

### Configurar Dominio Personalizado

1. **Comprar dominio** (GoDaddy, Namecheap, Google Domains, etc.)
2. En Vercel/Netlify:
   - Ve a **Settings** → **Domains**
   - Añade tu dominio personalizado
   - Sigue las instrucciones para configurar DNS

---

## 📝 RESUMEN DE COSTOS

- ✅ **Supabase**: GRATIS (hasta 500MB de base de datos)
- ✅ **Vercel/Netlify**: GRATIS (para proyectos personales)
- 💰 **OpenAI API**: ~$0.002 por generación de hábito (muy barato)
- 💰 **Dominio**: ~$10-15 USD/año

---

## ⏱️ TIEMPO ESTIMADO

- Configuración de Supabase: **15 minutos**
- Configuración de OpenAI: **5 minutos**
- Implementación de código: **2-3 horas** (lo haré yo)
- Despliegue: **30 minutos**
- Configuración de dominio: **1 hora** (propagación DNS puede tardar hasta 24h)

**TOTAL: ~4-5 horas de trabajo**

---

## 🚦 PRÓXIMOS PASOS

1. **TÚ**: Crear cuenta en Supabase y obtener credenciales
2. **TÚ**: Crear cuenta en OpenAI y obtener API key
3. **TÚ**: Crear archivo `.env` con las credenciales
4. **YO**: Implementar todo el código de integración
5. **NOSOTROS**: Probar que todo funciona
6. **TÚ**: Desplegar y configurar dominio

---

## ❓ ¿Listo para empezar?

Dime cuando hayas completado los pasos 1-3 y empezaré a implementar todo el código.
