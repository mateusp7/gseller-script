#!/usr/bin/env node
import{Command as Jo}from"commander";import{Command as vo}from"commander";import{existsSync as Q,promises as I}from"fs";import P from"ora";import h from"path";import E from"chalk";import{execa as yo}from"execa";import bo from"lodash.template";import Co from"prompts";import{z as D}from"zod";var j="@/components",N="@/lib/utils",O="src/app/globals.css",M="tailwind.config.ts",W="src/app/graphql",q=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","lucide"],G=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,z=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`,B=`/** @type {import('tailwindcss').Config} */
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
}`;var J=`import type { Config } from "tailwindcss"

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

export default config`;import{cosmiconfig as fo}from"cosmiconfig";import A from"path";import{loadConfig as uo}from"tsconfig-paths";import{z as c}from"zod";import{createMatchPath as mo}from"tsconfig-paths";async function $(e,o){return mo(o.absoluteBaseUrl,o.paths)(e,void 0,()=>!0,[".ts",".tsx"])}var go=fo("gseller",{searchPlaces:["gseller.json"]}),v=c.object({tsx:c.coerce.boolean().default(!0),graphql:c.string(),tailwind:c.object({config:c.string(),css:c.string()}),aliases:c.object({components:c.string(),utils:c.string()})}).strict(),ho=v.extend({resolvedPaths:c.object({graphql:c.string(),tailwindConfig:c.string(),tailwindCss:c.string(),utils:c.string(),components:c.string()})});async function V(e){let o=await xo(e);return o?await S(e,o):null}async function S(e,o){let r=uo(e);if(r.resultType==="failed")throw new Error(`Failed to load ${o.tsx?"tsconfig":"jsconfig"}.json. ${r.message??""}`.trim());return ho.parse({...o,resolvedPaths:{graphql:A.resolve(e,o.graphql),tailwindConfig:A.resolve(e,o.tailwind.config),tailwindCss:A.resolve(e,o.tailwind.css),utils:await $(o.aliases.utils,r),components:await $(o.aliases.components,r)}})}async function xo(e){try{let o=await go.search(e);return o?v.parse(o.config):null}catch{throw new Error(`Invalid configuration found in ${e}/components.json.`)}}import{detect as wo}from"@antfu/ni";async function y(e){let o=await wo({programmatic:!0,cwd:e});return o==="yarn@berry"?"yarn":o==="pnpm@6"?"pnpm":o==="bun"?"bun":o??"npm"}import b from"chalk";var n={error(...e){console.log(b.red(...e))},warn(...e){console.log(b.yellow(...e))},info(...e){console.log(b.cyan(...e))},success(...e){console.log(b.green(...e))},break(){console.log("")}};function H(e){typeof e=="string"&&(n.error(e),process.exit(1)),e instanceof Error&&(n.error(e.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import k from"fs";async function C(e){try{return await k.promises.access(e,(k.constants||k).W_OK),!0}catch{return!1}}var g=e=>{e.aborted&&(process.stdout.write("\x1B[?25h"),process.stdout.write(`
`),process.exit(1))};var Io=D.object({cwd:D.string(),yes:D.boolean()}),Y=new vo().command("init").description("Iniciar as configura\xE7\xF5es para o projeto Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{try{let o=Io.parse(e),r=h.resolve(o.cwd);Q(r)||(n.error(`O caminho ${r} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let i=await V(r),t=await Po(i);await Lo(r,t),n.info(""),n.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),n.info("")}catch(o){H(o)}});async function Po(e=null){let o=a=>E.cyan(a),r=await Co([{onState:g,type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${o("graphql")}?`,initial:e?.graphql??W},{onState:g,type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${o("tailwind.config.js")}?`,initial:e?.tailwind.config??M},{onState:g,type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${o("global CSS")}?`,initial:e?.tailwind.css??O},{onState:g,type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${o("components")}:`,initial:e?.aliases.components??j},{onState:g,type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${o("utils")}:`,initial:e?.aliases.utils??N}]),i=v.parse({tsx:!0,graphql:r.graphql,tailwind:{config:r.tailwindConfig,css:r.tailwindCss},aliases:{utils:r.utils,components:r.components}}),t=h.resolve();return n.info(""),Eo(t,i)}async function Eo(e,o){n.info("");let r=P(`Criando arquivo ${E.blue("gseller.json")}`).start();if(await C(e))try{let t=h.resolve(e,"gseller.json");return await I.writeFile(t,JSON.stringify(o,null,2),"utf-8"),r.succeed(),n.info(""),await S(e,o)}catch(t){n.error(t)}}async function Lo(e,o){if(!o)return;for(let[p,d]of Object.entries(o.resolvedPaths)){let w=h.extname(d)?h.dirname(d):d;p==="utils"&&d.endsWith("/utils")&&(w=w.replace(/\/utils$/,"")),Q(w)||await I.mkdir(w,{recursive:!0})}let r=o.tsx?"ts":"js",i=h.extname(o.resolvedPaths.tailwindConfig),t;i===".ts"?t=J:t=B;let a=P(`Criando arquivo ${E.blue("tailwind.config.ts")}`)?.start();await I.writeFile(o.resolvedPaths.tailwindConfig,bo(t)({extension:r,prefix:""}),"utf8"),a.succeed(),n.info("");let l=P(`Criando arquivo ${E.blue("utils")}`)?.start();await I.writeFile(`${o.resolvedPaths.utils}.${r}`,r==="ts"?G:z,"utf8"),l.succeed(),n.info("");let m=P("Instalando depend\xEAncias...")?.start(),u=await y(e),s=[...q];n.info(""),n.info(""),n.info("Depend\xEAncias"),n.info(""),s.forEach(p=>{n.info(`- ${p}`)}),n.info(""),await yo(u,[u==="npm"?"install":"add",...s],{cwd:e}),m?.succeed()}import No from"chalk";import{Command as Oo}from"commander";import Mo,{existsSync as Wo}from"fs";import T from"path";import qo from"prompts";import{z as F}from"zod";import co from"async-retry";import f from"chalk";import jo from"fs";import L from"path";import{createWriteStream as To,promises as K}from"fs";import $o from"got";import{tmpdir as Ao}from"os";import{join as So}from"path";import{Stream as ko}from"stream";import X from"tar";import{promisify as Do}from"util";var Ro=Do(ko.pipeline);async function Z(e){let o=So(Ao(),`next.js-cna-example.temp-${Date.now()}`);return await Ro($o.stream(e),To(o)),o}async function oo(e,{username:o,name:r,branch:i,filePath:t}){let a=await Z(`https://codeload.github.com/${o}/${r}/tar.gz/${i}`);await X.x({file:a,cwd:e,strip:t?t.split("/").length+1:1,filter:l=>l.startsWith(`${r}-${i.replace(/\//g,"-")}${t?`/${t}/`:"/"}`)}),await K.unlink(a)}async function eo(e,o){if(o==="__internal-testing-retry")throw new Error("This is an internal example for testing the CLI.");let r=await Z("https://codeload.github.com/vercel/next.js/tar.gz/canary");await X.x({file:r,cwd:e,strip:2+o.split("/").length,filter:i=>i.includes(`next.js-canary/examples/${o}/`)}),await K.unlink(r)}import ro from"got";async function R(e){return(await ro.head(e).catch(r=>r)).statusCode===200}async function to(e,o){let[,r,i,t,a,...l]=e.pathname.split("/"),m=o?o.replace(/^\//,""):l.join("/");if(t===void 0||t===""&&a===void 0){let s=await ro(`https://api.github.com/repos/${r}/${i}`).catch(d=>d);if(s.statusCode!==200)return;let p=JSON.parse(s.body);return{username:r,name:i,branch:p.default_branch,filePath:m}}let u=o?`${a}/${l.join("/")}`.replace(new RegExp(`/${m}|/$`),""):a;if(r&&i&&u&&t==="tree")return{username:r,name:i,branch:u,filePath:m}}function no({username:e,name:o,branch:r,filePath:i}){let t=`https://api.github.com/repos/${e}/${o}/contents`,a=`${i?`/${i}`:""}/package.json`;return R(t+a+`?ref=${r}`)}function io(e){try{let o=new URL(e);return R(o.href)}catch{return R(`https://api.github.com/repos/vercel/next.js/contents/examples/${encodeURIComponent(e)}`)}}import Uo from"chalk";import Fo from"cross-spawn";import Ge from"ora";async function ao(e,o){let r=["install"];return o||(console.log(Uo.yellow(`You appear to be offline.
Falling back to the local cache.`)),r.push("--offline")),new Promise((i,t)=>{Fo(e,r,{stdio:"inherit",env:{...process.env,ADBLOCK:"1",NODE_ENV:"development",DISABLE_OPENCOLLECTIVE:"1"}}).on("close",l=>{if(l!==0){t({command:`${e} ${r.join(" ")}`});return}i()})})}import _o from"fs";function so(e,o={recursive:!0}){return _o.promises.mkdir(e,o)}var U=class extends Error{};async function po({appPath:e,example:o,packageManager:r}){let i;if(o){let s;try{s=new URL(o)}catch(p){p.code!=="ERR_INVALID_URL"&&(console.error(p),process.exit(1))}s?(s.origin!=="https://github.com"&&(console.error(`URL inv\xE1lida: ${f.red(`"${o}"`)}. Apenas reposit\xF3rios do GitHui s\xE3o permitidos. Por favor, use uma URL de um reposit\xF3rio do GitHub e tente novamente.`),process.exit(1)),i=await to(s),i||(console.error(`Pasta inv\xE1lida nessa URL do GitHub: ${f.red(`"${o}"`)}. Por favor, ajuste a URL e tente novamente.`),process.exit(1)),await no(i)||(console.error(`N\xE3o podemos encontrar a localiza\xE7\xE3o do reposit\xF3rio ${f.red(`"${o}"`)}. Por favor, verifique se o reposit\xF3rio existe e tente novamente.`),process.exit(1))):o!=="__internal-testing-retry"&&(await io(o)||(console.error(`Could not locate an example named ${f.red(`"${o}"`)}. It could be due to the following:
`,`1. Your spelling of example ${f.red(`"${o}"`)} might be incorrect.
`,"2. You might not be connected to the internet or you are behind a proxy."),process.exit(1)))}let t=L.resolve(e);await C(L.dirname(t))||(console.error("A aplica\xE7\xE3o n\xE3o pode ser escrita, por favor verifique as permiss\xF5es da pasta e tente novamente."),process.exit(1));let a=L.basename(t);await so(t),n.info(`Criando um novo projeto Gseller em ${f.green(t)}.`),n.info(),process.chdir(t);let l=L.join(t,"package.json"),m=!1;try{if(i){let s=i;n.info(`Baixando arquivos do reposit\xF3rio ${f.cyan(o)}. Isso pode demorar um pouco.`),n.info(),await co(()=>oo(t,s),{retries:3})}else n.info(`Baixando arquivos do reposit\xF3rio ${f.cyan(o)}. Isso pode demorar um pouco.`),n.info(),await co(()=>eo(t,o),{retries:3})}catch(s){let p=function(d){return typeof d=="object"&&d!==null&&typeof d.message=="string"};var u=p;throw new U(p(s)?s.message:s+"")}m=jo.existsSync(l),n.info(""),m&&(console.log("Instalando pacotes, isso pode demorar um pouco."),await ao(r,!0)),n.info(`Projeto ${a} criado com ${f.green("sucesso!")}`),n.info(""),n.info(`Localiza\xE7\xE3o: ${f.blue(e)}`),n.info("")}var x="",Go=F.object({cwd:F.string(),yes:F.boolean()}),lo=new Oo().command("start").description("Inicia um projeto ").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async e=>{let o="https://github.com/mateusp7/base-gseller";try{let r=Go.parse(e),i=T.resolve(r.cwd);Wo(i)||(n.error(`O caminho ${i} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let t=await zo();await Bo(t.resolvedProjectPath,o,i)}catch{}});async function zo(){typeof x=="string"&&(x=x.trim());let e=await qo({onState:g,type:"text",name:"path",message:"Qual o nome do seu projeto?",initial:"gseller"});return typeof e.path=="string"&&(x=e.path.trim()),{resolvedProjectPath:T.resolve(x)}}async function Bo(e,o,r){let i=u=>No.cyan(u),t=T.resolve(e),a=T.basename(t);Mo.existsSync(t)&&process.exit(1),n.info(`Criando pasta ${i(a)} no caminho ${i(t)}...`),n.info("");let m=await y(r);await po({appPath:e,example:o,packageManager:m})}var _=new Jo;async function Vo(){_.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),_.addCommand(lo).addCommand(Y),_.parse()}Vo();
//# sourceMappingURL=index.js.map