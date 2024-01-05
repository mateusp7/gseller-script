#!/usr/bin/env node
import{Command as no}from"commander";import{Command as V}from"commander";import{existsSync as j,promises as g}from"fs";import m from"ora";import a from"path";import u from"chalk";import{execa as Q}from"execa";import K from"lodash.template";import X from"prompts";import{z as C}from"zod";var L="@/components",E="@/lib/utils",A="src/app/globals.css",D="tailwind.config.ts",F="src/app/graphql",S=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","react-icons"],b=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,U=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`,_=`/** @type {import('tailwindcss').Config} */
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
}`;var P=`import type { Config } from "tailwindcss"

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

export default config`;import{cosmiconfig as W}from"cosmiconfig";import v from"path";import{loadConfig as G}from"tsconfig-paths";import{z as t}from"zod";import{createMatchPath as R}from"tsconfig-paths";async function h(o,e){return R(e.absoluteBaseUrl,e.paths)(o,void 0,()=>!0,[".ts",".tsx"])}var z=W("components",{searchPlaces:["components.json"]}),p=t.object({tsx:t.coerce.boolean().default(!0),graphql:t.string(),tailwind:t.object({config:t.string(),css:t.string()}),aliases:t.object({components:t.string(),utils:t.string()})}).strict(),J=p.extend({resolvedPaths:t.object({graphql:t.string(),tailwindConfig:t.string(),tailwindCss:t.string(),utils:t.string(),components:t.string()})});async function k(o){let e=await B(o);return e?await w(o,e):null}async function w(o,e){let n=G(o);if(n.resultType==="failed")throw new Error(`Failed to load ${e.tsx?"tsconfig":"jsconfig"}.json. ${n.message??""}`.trim());return J.parse({...e,resolvedPaths:{graphql:v.resolve(o,e.graphql),tailwindConfig:v.resolve(o,e.tailwind.config),tailwindCss:v.resolve(o,e.tailwind.css),utils:await h(e.aliases.utils,n),components:await h(e.aliases.components,n)}})}async function B(o){try{let e=await z.search(o);return e?p.parse(e.config):null}catch{throw new Error(`Invalid configuration found in ${o}/components.json.`)}}import{detect as H}from"@antfu/ni";async function N(o){let e=await H({programmatic:!0,cwd:o});return e==="yarn@berry"?"yarn":e==="pnpm@6"?"pnpm":e==="bun"?"bun":e??"npm"}import d from"chalk";var r={error(...o){console.log(d.red(...o))},warn(...o){console.log(d.yellow(...o))},info(...o){console.log(d.cyan(...o))},success(...o){console.log(d.green(...o))},break(){console.log("")}};function O(o){typeof o=="string"&&(r.error(o),process.exit(1)),o instanceof Error&&(r.error(o.message),process.exit(1)),r.error("Something went wrong. Please try again."),process.exit(1)}var Y=C.object({cwd:C.string(),yes:C.boolean()}),q=new V().command("init").description("Iniciar projeto boilerplate Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async o=>{try{let e=Y.parse(o),n=a.resolve(e.cwd);j(n)||(r.error(`O caminho ${n} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let i=await k(n),s=await Z(i);await eo(n,s),r.info(""),r.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),r.info("")}catch(e){O(e)}});async function Z(o=null){let e=f=>u.cyan(f),n=await X([{type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${e("graphql")}?`,initial:o?.graphql??F},{type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${e("tailwind.config.js")}?`,initial:o?.tailwind.config??D},{type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${e("global CSS")}?`,initial:o?.tailwind.css??A},{type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${e("components")}:`,initial:o?.aliases.components??L},{type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${e("utils")}:`,initial:o?.aliases.utils??E}]),i=p.parse({tsx:!0,graphql:n.graphql,tailwind:{config:n.tailwindConfig,css:n.tailwindCss},aliases:{utils:n.utils,components:n.components}}),s=a.resolve();return r.info(""),oo(s,i)}async function oo(o,e){r.info("");let n=m(`Criando arquivo ${u.blue("gseller.json")}`).start(),i=a.resolve(o,"gseller.json");return await g.writeFile(i,JSON.stringify(e,null,2),"utf-8"),n.succeed(),r.info(""),await w(o,e)}async function eo(o,e){for(let[x,c]of Object.entries(e.resolvedPaths)){let l=a.extname(c)?a.dirname(c):c;x==="utils"&&c.endsWith("/utils")&&(l=l.replace(/\/utils$/,"")),j(l)||await g.mkdir(l,{recursive:!0})}let n=e.tsx?"ts":"js",i=a.extname(e.resolvedPaths.tailwindConfig),s;i===".ts"?s=P:s=_;let f=m(`Criando arquivo ${u.blue("tailwind.config.ts")}`)?.start();await g.writeFile(e.resolvedPaths.tailwindConfig,K(s)({extension:n,prefix:""}),"utf8"),f.succeed(),r.info("");let $=m(`Criando arquivo ${u.blue("utils")}`)?.start();await g.writeFile(`${e.resolvedPaths.utils}.${n}`,n==="ts"?b:U,"utf8"),$.succeed(),r.info("");let M=m("Instalando depend\xEAncias...")?.start(),T=await N(o),I=[...S];r.info(""),r.info(""),r.info("Depend\xEAncias"),r.info(""),I.forEach(x=>{r.info(`- ${x}`)}),r.info(""),await Q(T,[T==="npm"?"install":"add",...I],{cwd:o}),M?.succeed()}var y=new no;async function ro(){y.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),y.addCommand(q),y.parse()}ro();
//# sourceMappingURL=index.js.map