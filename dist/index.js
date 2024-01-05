#!/usr/bin/env node
import{Command as eo}from"commander";import{Command as B}from"commander";import{existsSync as k,promises as m}from"fs";import v from"ora";import s from"path";import H from"chalk";import{execa as V}from"execa";import Q from"lodash.template";import K from"prompts";import{z as h}from"zod";var y="@/components",T="@/lib/utils",I="src/app/globals.css",L="tailwind.config.ts",E="src/app/graphql",A=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","react-icons"],D=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,F=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`,S=`/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{<%- extension %>,<%- extension %>x}',
    './components/**/*.{<%- extension %>,<%- extension %>x}',
    './app/**/*.{<%- extension %>,<%- extension %>x}',
    './src/**/*.{<%- extension %>,<%- extension %>x}',
  ],
  prefix: "<%- prefix %>",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;var b=`import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{<%- extension %>,<%- extension %>x}',
    './components/**/*.{<%- extension %>,<%- extension %>x}',
    './app/**/*.{<%- extension %>,<%- extension %>x}',
    './src/**/*.{<%- extension %>,<%- extension %>x}',
  ],
  prefix: "<%- prefix %>",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config`;import{cosmiconfig as R}from"cosmiconfig";import f from"path";import{loadConfig as W}from"tsconfig-paths";import{z as n}from"zod";import{createMatchPath as M}from"tsconfig-paths";async function u(o,e){return M(e.absoluteBaseUrl,e.paths)(o,void 0,()=>!0,[".ts",".tsx"])}var G=R("components",{searchPlaces:["components.json"]}),d=n.object({tsx:n.coerce.boolean().default(!0),graphql:n.string(),tailwind:n.object({config:n.string(),css:n.string()}),aliases:n.object({components:n.string(),utils:n.string()})}).strict(),$=d.extend({resolvedPaths:n.object({graphql:n.string(),tailwindConfig:n.string(),tailwindCss:n.string(),utils:n.string(),components:n.string()})});async function U(o){let e=await z(o);return e?await x(o,e):null}async function x(o,e){let r=W(o);if(r.resultType==="failed")throw new Error(`Failed to load ${e.tsx?"tsconfig":"jsconfig"}.json. ${r.message??""}`.trim());return $.parse({...e,resolvedPaths:{graphql:f.resolve(o,e.graphql),tailwindConfig:f.resolve(o,e.tailwind.config),tailwindCss:f.resolve(o,e.tailwind.css),utils:await u(e.aliases.utils,r),components:await u(e.aliases.components,r)}})}async function z(o){try{let e=await G.search(o);return e?d.parse(e.config):null}catch{throw new Error(`Invalid configuration found in ${o}/components.json.`)}}import{detect as J}from"@antfu/ni";async function _(o){let e=await J({programmatic:!0,cwd:o});return e==="yarn@berry"?"yarn":e==="pnpm@6"?"pnpm":e==="bun"?"bun":e??"npm"}import g from"chalk";var t={error(...o){console.log(g.red(...o))},warn(...o){console.log(g.yellow(...o))},info(...o){console.log(g.cyan(...o))},success(...o){console.log(g.green(...o))},break(){console.log("")}};function P(o){typeof o=="string"&&(t.error(o),process.exit(1)),o instanceof Error&&(t.error(o.message),process.exit(1)),t.error("Something went wrong. Please try again."),process.exit(1)}var X=h.object({cwd:h.string(),yes:h.boolean()}),N=new B().command("init").description("Iniciar projeto boilerplate Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async o=>{try{let e=X.parse(o),r=s.resolve(e.cwd);k(r)||(t.error(`O caminho ${r} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let i=await U(r),a=await Y(i);await oo(r,a),t.info(""),t.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),t.info("")}catch(e){P(e)}});async function Y(o=null){let e=c=>H.cyan(c),r=await K([{type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${e("graphql")}?`,initial:o?.graphql??E},{type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${e("tailwind.config.js")}?`,initial:o?.tailwind.config??L},{type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${e("global CSS")}?`,initial:o?.tailwind.css??I},{type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${e("components")}:`,initial:o?.aliases.components??y},{type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${e("utils")}:`,initial:o?.aliases.utils??T}]),i=d.parse({tsx:!0,graphql:r.graphql,tailwind:{config:r.tailwindConfig,css:r.tailwindCss},aliases:{utils:r.utils,components:r.components}}),a=s.resolve();return t.info(""),Z(a,i)}async function Z(o,e){t.info("");let r=v("Criando arquivo gseller.json...").start(),i=s.resolve(o,"gseller.json");return await m.writeFile(i,JSON.stringify(e,null,2),"utf-8"),r.succeed(),await x(o,e)}async function oo(o,e){let r=v("Iniciando projeto")?.start();for(let[q,p]of Object.entries(e.resolvedPaths)){let l=s.extname(p)?s.dirname(p):p;q==="utils"&&p.endsWith("/utils")&&(l=l.replace(/\/utils$/,"")),k(l)||await m.mkdir(l,{recursive:!0})}let i=e.tsx?"ts":"js",a=s.extname(e.resolvedPaths.tailwindConfig),c;a===".ts"?c=b:c=S,await m.writeFile(e.resolvedPaths.tailwindConfig,Q(c)({extension:i,prefix:""}),"utf8"),await m.writeFile(`${e.resolvedPaths.utils}.${i}`,i==="ts"?D:F,"utf8"),r.succeed(),t.info("");let j=v("Instalando depend\xEAncias...")?.start(),C=await _(o),O=[...A];await V(C,[C==="npm"?"install":"add",...O],{cwd:o}),j?.succeed()}var w=new eo;async function ro(){w.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),w.addCommand(N),w.parse()}ro();
//# sourceMappingURL=index.js.map