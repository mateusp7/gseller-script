#!/usr/bin/env node
import{Command as Jo}from"commander";import{Command as wo}from"commander";import{existsSync as V,promises as C}from"fs";import b from"ora";import g from"path";import I from"chalk";import{execa as vo}from"execa";import yo from"lodash.template";import Co from"prompts";import{z as D}from"zod";var R="@/components",_="@/lib/utils",j="src/app/globals.css",N="tailwind.config.ts",O="src/app/graphql",W=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","react-icons"],q=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,G=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`,z=`/** @type {import('tailwindcss').Config} */
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
}`;var M=`import type { Config } from "tailwindcss"

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

export default config`;import{cosmiconfig as mo}from"cosmiconfig";import $ from"path";import{loadConfig as fo}from"tsconfig-paths";import{z as c}from"zod";import{createMatchPath as lo}from"tsconfig-paths";async function P(e,o){return lo(o.absoluteBaseUrl,o.paths)(e,void 0,()=>!0,[".ts",".tsx"])}var uo=mo("components",{searchPlaces:["components.json"]}),w=c.object({tsx:c.coerce.boolean().default(!0),graphql:c.string(),tailwind:c.object({config:c.string(),css:c.string()}),aliases:c.object({components:c.string(),utils:c.string()})}).strict(),go=w.extend({resolvedPaths:c.object({graphql:c.string(),tailwindConfig:c.string(),tailwindCss:c.string(),utils:c.string(),components:c.string()})});async function J(e){let o=await ho(e);return o?await T(e,o):null}async function T(e,o){let r=fo(e);if(r.resultType==="failed")throw new Error(`Failed to load ${o.tsx?"tsconfig":"jsconfig"}.json. ${r.message??""}`.trim());return go.parse({...o,resolvedPaths:{graphql:$.resolve(e,o.graphql),tailwindConfig:$.resolve(e,o.tailwind.config),tailwindCss:$.resolve(e,o.tailwind.css),utils:await P(o.aliases.utils,r),components:await P(o.aliases.components,r)}})}async function ho(e){try{let o=await uo.search(e);return o?w.parse(o.config):null}catch{throw new Error(`Invalid configuration found in ${e}/components.json.`)}}import{detect as xo}from"@antfu/ni";async function B(e){let o=await xo({programmatic:!0,cwd:e});return o==="yarn@berry"?"yarn":o==="pnpm@6"?"pnpm":o==="bun"?"bun":o??"npm"}import v from"chalk";var n={error(...e){console.log(v.red(...e))},warn(...e){console.log(v.yellow(...e))},info(...e){console.log(v.cyan(...e))},success(...e){console.log(v.green(...e))},break(){console.log("")}};function H(e){typeof e=="string"&&(n.error(e),process.exit(1)),e instanceof Error&&(n.error(e.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import A from"fs";async function y(e){try{return await A.promises.access(e,(A.constants||A).W_OK),!0}catch{return!1}}var bo=D.object({cwd:D.string(),yes:D.boolean()}),Q=new wo().command("init").description("Iniciar as configura\xE7\xF5es para o projeto Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{try{let o=bo.parse(e),r=g.resolve(o.cwd);V(r)||(n.error(`O caminho ${r} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let t=await J(r),i=await Io(t);await Lo(r,i),n.info(""),n.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),n.info("")}catch(o){H(o)}});async function Io(e=null){let o=s=>I.cyan(s),r=await Co([{type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${o("graphql")}?`,initial:e?.graphql??O},{type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${o("tailwind.config.js")}?`,initial:e?.tailwind.config??N},{type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${o("global CSS")}?`,initial:e?.tailwind.css??j},{type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${o("components")}:`,initial:e?.aliases.components??R},{type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${o("utils")}:`,initial:e?.aliases.utils??_}]),t=w.parse({tsx:!0,graphql:r.graphql,tailwind:{config:r.tailwindConfig,css:r.tailwindCss},aliases:{utils:r.utils,components:r.components}}),i=g.resolve();return n.info(""),Eo(i,t)}async function Eo(e,o){n.info("");let r=b(`Criando arquivo ${I.blue("gseller.json")}`).start();if(await y(e))try{let i=g.resolve(e,"gseller.json");return await C.writeFile(i,JSON.stringify(o,null,2),"utf-8"),r.succeed(),n.info(""),await T(e,o)}catch(i){n.error(i)}}async function Lo(e,o){if(!o)return;for(let[d,u]of Object.entries(o.resolvedPaths)){let x=g.extname(u)?g.dirname(u):u;d==="utils"&&u.endsWith("/utils")&&(x=x.replace(/\/utils$/,"")),V(x)||await C.mkdir(x,{recursive:!0})}let r=o.tsx?"ts":"js",t=g.extname(o.resolvedPaths.tailwindConfig),i;t===".ts"?i=M:i=z;let s=b(`Criando arquivo ${I.blue("tailwind.config.ts")}`)?.start();await C.writeFile(o.resolvedPaths.tailwindConfig,yo(i)({extension:r,prefix:""}),"utf8"),s.succeed(),n.info("");let p=b(`Criando arquivo ${I.blue("utils")}`)?.start();await C.writeFile(`${o.resolvedPaths.utils}.${r}`,r==="ts"?q:G,"utf8"),p.succeed(),n.info("");let f=b("Instalando depend\xEAncias...")?.start(),a=await B(e),l=[...W];n.info(""),n.info(""),n.info("Depend\xEAncias"),n.info(""),l.forEach(d=>{n.info(`- ${d}`)}),n.info(""),await vo(a,[a==="npm"?"install":"add",...l],{cwd:e}),f?.succeed()}import jo from"chalk";import{Command as No}from"commander";import Oo,{existsSync as Wo}from"fs";import L from"path";import qo from"prompts";import{z as k}from"zod";import ao from"async-retry";import m from"chalk";import _o from"fs";import E from"path";import{createWriteStream as Po,promises as Y}from"fs";import $o from"got";import{tmpdir as To}from"os";import{join as Ao}from"path";import{Stream as Do}from"stream";import K from"tar";import{promisify as So}from"util";var Uo=So(Do.pipeline);async function X(e){let o=Ao(To(),`next.js-cna-example.temp-${Date.now()}`);return await Uo($o.stream(e),Po(o)),o}async function Z(e,{username:o,name:r,branch:t,filePath:i}){let s=await X(`https://codeload.github.com/${o}/${r}/tar.gz/${t}`);await K.x({file:s,cwd:e,strip:i?i.split("/").length+1:1,filter:p=>p.startsWith(`${r}-${t.replace(/\//g,"-")}${i?`/${i}/`:"/"}`)}),await Y.unlink(s)}async function oo(e,o){if(o==="__internal-testing-retry")throw new Error("This is an internal example for testing the CLI.");let r=await X("https://codeload.github.com/vercel/next.js/tar.gz/canary");await K.x({file:r,cwd:e,strip:2+o.split("/").length,filter:t=>t.includes(`next.js-canary/examples/${o}/`)}),await Y.unlink(r)}import eo from"got";async function S(e){return(await eo.head(e).catch(r=>r)).statusCode===200}async function ro(e,o){let[,r,t,i,s,...p]=e.pathname.split("/"),f=o?o.replace(/^\//,""):p.join("/");if(i===void 0||i===""&&s===void 0){let l=await eo(`https://api.github.com/repos/${r}/${t}`).catch(u=>u);if(l.statusCode!==200)return;let d=JSON.parse(l.body);return{username:r,name:t,branch:d.default_branch,filePath:f}}let a=o?`${s}/${p.join("/")}`.replace(new RegExp(`/${f}|/$`),""):s;if(r&&t&&a&&i==="tree")return{username:r,name:t,branch:a,filePath:f}}function to({username:e,name:o,branch:r,filePath:t}){let i=`https://api.github.com/repos/${e}/${o}/contents`,s=`${t?`/${t}`:""}/package.json`;return S(i+s+`?ref=${r}`)}function no(e){try{let o=new URL(e);return S(o.href)}catch{return S(`https://api.github.com/repos/vercel/next.js/contents/examples/${encodeURIComponent(e)}`)}}import ko from"chalk";import Fo from"cross-spawn";import We from"ora";async function io(e,o){let r=["install"];return o||(console.log(ko.yellow(`You appear to be offline.
Falling back to the local cache.`)),r.push("--offline")),new Promise((t,i)=>{Fo(e,r,{stdio:"inherit",env:{...process.env,ADBLOCK:"1",NODE_ENV:"development",DISABLE_OPENCOLLECTIVE:"1"}}).on("close",p=>{if(p!==0){i({command:`${e} ${r.join(" ")}`});return}t()})})}import Ro from"fs";function so(e,o={recursive:!0}){return Ro.promises.mkdir(e,o)}var U=class extends Error{};async function co({appPath:e,example:o}){let r;if(o){let a;try{a=new URL(o)}catch(l){l.code!=="ERR_INVALID_URL"&&(console.error(l),process.exit(1))}a?(a.origin!=="https://github.com"&&(console.error(`URL inv\xE1lida: ${m.red(`"${o}"`)}. Apenas reposit\xF3rios do GitHui s\xE3o permitidos. Por favor, use uma URL de um reposit\xF3rio do GitHub e tente novamente.`),process.exit(1)),r=await ro(a),r||(console.error(`Pasta inv\xE1lida nessa URL do GitHub: ${m.red(`"${o}"`)}. Por favor, ajuste a URL e tente novamente.`),process.exit(1)),await to(r)||(console.error(`N\xE3o podemos encontrar a localiza\xE7\xE3o do reposit\xF3rio ${m.red(`"${o}"`)}. Por favor, verifique se o reposit\xF3rio existe e tente novamente.`),process.exit(1))):o!=="__internal-testing-retry"&&(await no(o)||(console.error(`Could not locate an example named ${m.red(`"${o}"`)}. It could be due to the following:
`,`1. Your spelling of example ${m.red(`"${o}"`)} might be incorrect.
`,"2. You might not be connected to the internet or you are behind a proxy."),process.exit(1)))}let t=E.resolve(e);await y(E.dirname(t))||(console.error("A aplica\xE7\xE3o n\xE3o pode ser escrita, por favor verifique as permiss\xF5es da pasta e tente novamente."),process.exit(1));let i=E.basename(t);await so(t),n.info(`Criando um novo projeto Gseller em ${m.green(t)}.`),n.info(),process.chdir(t);let s=E.join(t,"package.json"),p=!1;try{if(r){let a=r;n.info(`Baixando arquivos do reposit\xF3rio ${m.cyan(o)}. Isso pode demorar um pouco.`),n.info(),await ao(()=>Z(t,a),{retries:3})}else n.info(`Baixando arquivos do reposit\xF3rio ${m.cyan(o)}. Isso pode demorar um pouco.`),n.info(),await ao(()=>oo(t,o),{retries:3})}catch(a){let l=function(d){return typeof d=="object"&&d!==null&&typeof d.message=="string"};var f=l;throw new U(l(a)?a.message:a+"")}p=_o.existsSync(s),n.info(""),p&&(console.log("Instalando pacotes, isso pode demorar um pouco."),await io("yarn",!0)),n.info(`Projeto criado com ${m.green("Sucesso!")}`),n.info(""),n.info(`Localiza\xE7\xE3o: ${m.blue(e)}`),n.info("")}var h="",Go=k.object({cwd:k.string(),yes:k.boolean()}),po=new No().command("start").description("Inicia um projeto ").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{let o="https://github.com/mateusp7/base-gseller";try{let r=Go.parse(e),t=L.resolve(r.cwd);Wo(t)||(n.error(`O caminho ${t} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let i=await zo();await Mo(i.resolvedProjectPath,o)}catch{}});async function zo(){typeof h=="string"&&(h=h.trim());let e=await qo({type:"text",name:"path",message:"Qual o nome do seu projeto?",initial:"gseller"});return typeof e.path=="string"&&(h=e.path.trim()),{resolvedProjectPath:L.resolve(h)}}async function Mo(e,o){let r=p=>jo.cyan(p),t=L.resolve(e),i=L.basename(t);Oo.existsSync(t)&&process.exit(1),n.info(`Criando pasta ${r(i)} no caminho ${r(t)}...`),n.info(""),await co({appPath:e,example:o})}var F=new Jo;async function Bo(){F.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),F.addCommand(po).addCommand(Q),F.parse()}Bo();
//# sourceMappingURL=index.js.map