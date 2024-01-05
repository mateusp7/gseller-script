#!/usr/bin/env node
import{Command as oo}from"commander";import{Command as J}from"commander";import{existsSync as P,promises as m}from"fs";import v from"ora";import a from"path";import B from"chalk";import{execa as H}from"execa";import V from"lodash.template";import Q from"prompts";import{z as x}from"zod";var y="@/components",T="@/lib/utils",I="src/app/globals.css",L="tailwind.config.ts",A="src/app/graphql",E=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","react-icons"],D=`import { type ClassValue, clsx } from "clsx"
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

export default config`;import{cosmiconfig as M}from"cosmiconfig";import f from"path";import{loadConfig as R}from"tsconfig-paths";import{z as n}from"zod";import{createMatchPath as q}from"tsconfig-paths";async function u(e,o){return q(o.absoluteBaseUrl,o.paths)(e,void 0,()=>!0,[".ts",".tsx"])}var W=M("components",{searchPlaces:["components.json"]}),d=n.object({tsx:n.coerce.boolean().default(!0),graphql:n.string(),tailwind:n.object({config:n.string(),css:n.string()}),aliases:n.object({components:n.string(),utils:n.string()})}).strict(),G=d.extend({resolvedPaths:n.object({graphql:n.string(),tailwindConfig:n.string(),tailwindCss:n.string(),utils:n.string(),components:n.string()})});async function U(e){let o=await $(e);return o?await h(e,o):null}async function h(e,o){let r=R(e);if(r.resultType==="failed")throw new Error(`Failed to load ${o.tsx?"tsconfig":"jsconfig"}.json. ${r.message??""}`.trim());return G.parse({...o,resolvedPaths:{graphql:f.resolve(e,o.graphql),tailwindConfig:f.resolve(e,o.tailwind.config),tailwindCss:f.resolve(e,o.tailwind.css),utils:await u(o.aliases.utils,r),components:await u(o.aliases.components,r)}})}async function $(e){try{let o=await W.search(e);return o?d.parse(o.config):null}catch{throw new Error(`Invalid configuration found in ${e}/components.json.`)}}import{detect as z}from"@antfu/ni";async function _(e){let o=await z({programmatic:!0,cwd:e});return o==="yarn@berry"?"yarn":o==="pnpm@6"?"pnpm":o==="bun"?"bun":o??"npm"}import g from"chalk";var s={error(...e){console.log(g.red(...e))},warn(...e){console.log(g.yellow(...e))},info(...e){console.log(g.cyan(...e))},success(...e){console.log(g.green(...e))},break(){console.log("")}};var K=x.object({cwd:x.string(),yes:x.boolean()}),N=new J().command("init").description("Iniciar projeto boilerplate Gseller").option("-y, --yes","pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{let o="https://github.com/mateusp7/grv";try{let r=K.parse(e),t=a.resolve(r.cwd);P(t)||(s.error(`O caminho ${t} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let c=await U(t),i=await X(c);await Z(t,i),s.info(""),s.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),s.info("")}catch{}});async function X(e=null){let o=i=>B.cyan(i),r=await Q([{type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${o("graphql")}?`,initial:e?.graphql??A},{type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${o("tailwind.config.js")}?`,initial:e?.tailwind.config??L},{type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${o("global CSS")}?`,initial:e?.tailwind.css??I},{type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${o("components")}:`,initial:e?.aliases.components??y},{type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${o("utils")}:`,initial:e?.aliases.utils??T}]),t=d.parse({tsx:!0,graphql:r.graphql,tailwind:{config:r.tailwindConfig,css:r.tailwindCss},aliases:{utils:r.utils,components:r.components}}),c=a.resolve();return s.info(""),Y(c,t)}async function Y(e,o){s.info("");let r=v("Criando arquivo gseller.json...").start(),t=a.resolve(e,"gseller.json");return await m.writeFile(t,JSON.stringify(o,null,2),"utf-8"),r.succeed(),await h(e,o)}async function Z(e,o){let r=v("Iniciando projeto")?.start();for(let[O,p]of Object.entries(o.resolvedPaths)){let l=a.extname(p)?a.dirname(p):p;O==="utils"&&p.endsWith("/utils")&&(l=l.replace(/\/utils$/,"")),P(l)||await m.mkdir(l,{recursive:!0})}let t=o.tsx?"ts":"js",c=a.extname(o.resolvedPaths.tailwindConfig),i;c===".ts"?i=b:i=S,await m.writeFile(o.resolvedPaths.tailwindConfig,V(i)({extension:t,prefix:""}),"utf8"),await m.writeFile(`${o.resolvedPaths.utils}.${t}`,t==="ts"?D:F,"utf8"),r.succeed();let k=v("Instalando depend\xEAncias...")?.start(),C=await _(e),j=[...E];await H(C,[C==="npm"?"install":"add",...j],{cwd:e}),k?.succeed()}var w=new oo;async function eo(){w.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),w.addCommand(N),w.parse()}eo();
//# sourceMappingURL=index.js.map