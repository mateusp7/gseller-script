#!/usr/bin/env node
import{Command as te}from"commander";import{Command as K}from"commander";import{existsSync as q,promises as g}from"fs";import u from"ora";import a from"path";import m from"chalk";import{execa as X}from"execa";import Y from"lodash.template";import Z from"prompts";import{z as y}from"zod";var E="@/components",A="@/lib/utils",b="src/app/globals.css",D="tailwind.config.ts",F="src/app/graphql",S=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","react-icons"],U=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,_=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`,P=`/** @type {import('tailwindcss').Config} */
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
}`;var k=`import type { Config } from "tailwindcss"

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

export default config`;import{cosmiconfig as z}from"cosmiconfig";import v from"path";import{loadConfig as J}from"tsconfig-paths";import{z as t}from"zod";import{createMatchPath as G}from"tsconfig-paths";async function x(e,o){return G(o.absoluteBaseUrl,o.paths)(e,void 0,()=>!0,[".ts",".tsx"])}var B=z("components",{searchPlaces:["components.json"]}),p=t.object({tsx:t.coerce.boolean().default(!0),graphql:t.string(),tailwind:t.object({config:t.string(),css:t.string()}),aliases:t.object({components:t.string(),utils:t.string()})}).strict(),H=p.extend({resolvedPaths:t.object({graphql:t.string(),tailwindConfig:t.string(),tailwindCss:t.string(),utils:t.string(),components:t.string()})});async function N(e){let o=await V(e);return o?await w(e,o):null}async function w(e,o){let r=J(e);if(r.resultType==="failed")throw new Error(`Failed to load ${o.tsx?"tsconfig":"jsconfig"}.json. ${r.message??""}`.trim());return H.parse({...o,resolvedPaths:{graphql:v.resolve(e,o.graphql),tailwindConfig:v.resolve(e,o.tailwind.config),tailwindCss:v.resolve(e,o.tailwind.css),utils:await x(o.aliases.utils,r),components:await x(o.aliases.components,r)}})}async function V(e){try{let o=await B.search(e);return o?p.parse(o.config):null}catch{throw new Error(`Invalid configuration found in ${e}/components.json.`)}}import{detect as Q}from"@antfu/ni";async function O(e){let o=await Q({programmatic:!0,cwd:e});return o==="yarn@berry"?"yarn":o==="pnpm@6"?"pnpm":o==="bun"?"bun":o??"npm"}import d from"chalk";var n={error(...e){console.log(d.red(...e))},warn(...e){console.log(d.yellow(...e))},info(...e){console.log(d.cyan(...e))},success(...e){console.log(d.green(...e))},break(){console.log("")}};function W(e){typeof e=="string"&&(n.error(e),process.exit(1)),e instanceof Error&&(n.error(e.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import C from"fs";async function j(e){try{return await C.promises.access(e,(C.constants||C).W_OK),!0}catch{return!1}}var ee=y.object({cwd:y.string(),yes:y.boolean()}),$=new K().command("init").description("Iniciar projeto boilerplate Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{try{let o=ee.parse(e),r=a.resolve(o.cwd);q(r)||(n.error(`O caminho ${r} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let s=await N(r),i=await oe(s);await ne(r,i),n.info(""),n.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),n.info("")}catch(o){W(o)}});async function oe(e=null){let o=f=>m.cyan(f),r=await Z([{type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${o("graphql")}?`,initial:e?.graphql??F},{type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${o("tailwind.config.js")}?`,initial:e?.tailwind.config??D},{type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${o("global CSS")}?`,initial:e?.tailwind.css??b},{type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${o("components")}:`,initial:e?.aliases.components??E},{type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${o("utils")}:`,initial:e?.aliases.utils??A}]),s=p.parse({tsx:!0,graphql:r.graphql,tailwind:{config:r.tailwindConfig,css:r.tailwindCss},aliases:{utils:r.utils,components:r.components}}),i=a.resolve();return n.info(""),re(i,s)}async function re(e,o){n.info("");let r=u(`Criando arquivo ${m.blue("gseller.json")}`).start();if(await j(e))try{let i=a.resolve(e,"gseller.json");return await g.writeFile(i,JSON.stringify(o,null,2),"utf-8"),r.succeed(),n.info(""),await w(e,o)}catch(i){n.error(i)}}async function ne(e,o){if(!o)return;for(let[h,c]of Object.entries(o.resolvedPaths)){let l=a.extname(c)?a.dirname(c):c;h==="utils"&&c.endsWith("/utils")&&(l=l.replace(/\/utils$/,"")),q(l)||await g.mkdir(l,{recursive:!0})}let r=o.tsx?"ts":"js",s=a.extname(o.resolvedPaths.tailwindConfig),i;s===".ts"?i=k:i=P;let f=u(`Criando arquivo ${m.blue("tailwind.config.ts")}`)?.start();await g.writeFile(o.resolvedPaths.tailwindConfig,Y(i)({extension:r,prefix:""}),"utf8"),f.succeed(),n.info("");let M=u(`Criando arquivo ${m.blue("utils")}`)?.start();await g.writeFile(`${o.resolvedPaths.utils}.${r}`,r==="ts"?U:_,"utf8"),M.succeed(),n.info("");let R=u("Instalando depend\xEAncias...")?.start(),I=await O(e),L=[...S];n.info(""),n.info(""),n.info("Depend\xEAncias"),n.info(""),L.forEach(h=>{n.info(`- ${h}`)}),n.info(""),await X(I,[I==="npm"?"install":"add",...L],{cwd:e}),R?.succeed()}var T=new te;async function ie(){T.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),T.addCommand($),T.parse()}ie();
//# sourceMappingURL=index.js.map