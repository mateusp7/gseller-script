#!/usr/bin/env node
import{Command as We}from"commander";import{Command as ue}from"commander";import{existsSync as J,promises as v}from"fs";import E from"ora";import h from"path";import P from"chalk";import{execa as he}from"execa";import xe from"lodash.template";import we from"prompts";import{z as T}from"zod";var U="@/components",_="@/lib/utils",N="src/app/globals.css",O="tailwind.config.ts",q="src/app/graphql",M=["tailwindcss-animate","class-variance-authority","clsx","tailwind-merge","lucide"],W=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,B=`import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#5570F1',
        globalBlue: '#223463',
        yellow: '#9EBE23',
        secondary: '#FEF5EA',
        'gray-children': '#faf0ff',
        black: '#1C1D22',
        'black-80': '#33343A',
        'black-60': '#45464E',
        'black-50': '#53545C',
        'black-30': '#8B8D97',
        'black-20': '#A6A8B1',
        'black-10': '#BEC0CA',
        alert: '#FF9B1C',
        success: '#519C66',
        failure: '#CC5F5F',
        gray: '#E1E2E9',
        background: '#f4f5fa',
        'neutral-1': '#1F2937',
        'neutral-2': '#374151',
        'neutral-3': '#4A5462',
        'primary-dark': '#0F172A',
        'secondary-dark': '#1E293B',
        // light mode
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff', // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151', // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff', // white
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229', // custom
            muted: '#172554', // blue-950
            subtle: '#1e40af', // blue-800
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#60a5fa', // blue-400
            inverted: '#030712', // gray-950
          },
          background: {
            muted: '#131A2B', // custom
            subtle: '#1f2937', // gray-800
            DEFAULT: '#111827', // gray-900
            emphasis: '#d1d5db', // gray-300
          },
          border: {
            DEFAULT: '#1f2937', // gray-800
          },
          ring: {
            DEFAULT: '#1f2937', // gray-800
          },
          content: {
            subtle: '#4b5563', // gray-600
            DEFAULT: '#6b7280', // gray-600
            emphasis: '#e5e7eb', // gray-200
            strong: '#f9fafb', // gray-50
            inverted: '#000000', // black
          },
        },
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
`;import{cosmiconfig as pe}from"cosmiconfig";import A from"path";import{loadConfig as le}from"tsconfig-paths";import{z as c}from"zod";import{createMatchPath as ce}from"tsconfig-paths";async function $(o,e){return ce(e.absoluteBaseUrl,e.paths)(o,void 0,()=>!0,[".ts",".tsx"])}var me=pe("gseller",{searchPlaces:["gseller.json"]}),w=c.object({tsx:c.coerce.boolean().default(!0),graphql:c.string(),tailwind:c.object({config:c.string(),css:c.string()}),aliases:c.object({components:c.string(),utils:c.string()})}).strict(),fe=w.extend({resolvedPaths:c.object({graphql:c.string(),tailwindConfig:c.string(),tailwindCss:c.string(),utils:c.string(),components:c.string()})});async function z(o){let e=await de(o);return e?await L(o,e):null}async function L(o,e){let t=le(o);if(t.resultType==="failed")throw new Error(`Failed to load ${e.tsx?"tsconfig":"jsconfig"}.json. ${t.message??""}`.trim());return fe.parse({...e,resolvedPaths:{graphql:A.resolve(o,e.graphql),tailwindConfig:A.resolve(o,e.tailwind.config),tailwindCss:A.resolve(o,e.tailwind.css),utils:await $(e.aliases.utils,t),components:await $(e.aliases.components,t)}})}async function de(o){try{let e=await me.search(o);return e?w.parse(e.config):null}catch{throw new Error(`Invalid configuration found in ${o}/components.json.`)}}import{detect as ge}from"@antfu/ni";async function b(o){let e=await ge({programmatic:!0,cwd:o});return e==="yarn@berry"?"yarn":e==="pnpm@6"?"pnpm":e==="bun"?"bun":e??"npm"}import y from"chalk";var n={error(...o){console.log(y.red(...o))},warn(...o){console.log(y.yellow(...o))},info(...o){console.log(y.cyan(...o))},success(...o){console.log(y.green(...o))},break(){console.log("")}};function G(o){typeof o=="string"&&(n.error(o),process.exit(1)),o instanceof Error&&(n.error(o.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import S from"fs";async function C(o){try{return await S.promises.access(o,(S.constants||S).W_OK),!0}catch{return!1}}var g=o=>{o.aborted&&(process.stdout.write("\x1B[?25h"),process.stdout.write(`
`),process.exit(1))};var be=T.object({cwd:T.string(),yes:T.boolean()}),V=new ue().command("init").description("Iniciar as configura\xE7\xF5es para o projeto Gseller").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async o=>{try{let e=be.parse(o),t=h.resolve(e.cwd);J(t)||(n.error(`O caminho ${t} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let i=await z(t),r=await ye(i);await ve(t,r),n.info(""),n.info("Inicializa\xE7\xE3o do projeto realizada com sucesso."),n.info("")}catch(e){G(e)}});async function ye(o=null){let e=s=>P.cyan(s),t=await we([{onState:g,type:"text",name:"graphql",message:`Aonde est\xE1 localizado a pasta ${e("graphql")}?`,initial:o?.graphql??q},{onState:g,type:"text",name:"tailwindConfig",message:`Aonde est\xE1 localizado a pasta ${e("tailwind.config.js")}?`,initial:o?.tailwind.config??O},{onState:g,type:"text",name:"tailwindCss",message:`Aonde est\xE1 localizado o arquivo ${e("global CSS")}?`,initial:o?.tailwind.css??N},{onState:g,type:"text",name:"components",message:`Configure o alias de importa\xE7\xE3o para ${e("components")}:`,initial:o?.aliases.components??U},{onState:g,type:"text",name:"utils",message:`Configure o alias de importa\xE7\xE3o para ${e("utils")}:`,initial:o?.aliases.utils??_}]),i=w.parse({tsx:!0,graphql:t.graphql,tailwind:{config:t.tailwindConfig,css:t.tailwindCss},aliases:{utils:t.utils,components:t.components}}),r=h.resolve();return n.info(""),Ce(r,i)}async function Ce(o,e){n.info("");let t=E(`Criando arquivo ${P.blue("gseller.json")}`).start();if(await C(o))try{let r=h.resolve(o,"gseller.json");return await v.writeFile(r,JSON.stringify(e,null,2),"utf-8"),t.succeed(),n.info(""),await L(o,e)}catch(r){n.error(r)}}async function ve(o,e){if(!e)return;for(let[d,a]of Object.entries(e.resolvedPaths)){let p=h.extname(a)?h.dirname(a):a;d==="utils"&&a.endsWith("/utils")&&(p=p.replace(/\/utils$/,"")),J(p)||await v.mkdir(p,{recursive:!0})}let t=B,i=E(`Criando arquivo ${P.blue("tailwind.config.ts")}`)?.start();await v.writeFile(e.resolvedPaths.tailwindConfig,xe(t)({extension:"ts",prefix:""}),"utf8"),i.succeed(),n.info("");let r=E(`Criando arquivo ${P.blue("utils")}`)?.start();await v.writeFile(`${e.resolvedPaths.utils}.ts`,W,"utf8"),r.succeed(),n.info("");let s=E("Instalando depend\xEAncias...")?.start(),l=await b(o),m=[...M];n.info(""),n.info(""),n.info("Depend\xEAncias"),n.info(""),m.forEach(d=>{n.info(`- ${d}`)}),n.info(""),await he(l,[l==="npm"?"install":"add",...m],{cwd:o}),s?.succeed()}import De from"chalk";import{Command as je}from"commander";import Ue,{existsSync as _e}from"fs";import I from"path";import Ne from"prompts";import{z as D}from"zod";import ie from"async-retry";import f from"chalk";import Re from"fs";import k from"path";import{createWriteStream as Ee,promises as H}from"fs";import Pe from"got";import{tmpdir as ke}from"os";import{join as Ie}from"path";import{Stream as $e}from"stream";import Q from"tar";import{promisify as Ae}from"util";var Le=Ae($e.pipeline);async function Y(o){let e=Ie(ke(),`next.js-cna-example.temp-${Date.now()}`);return await Le(Pe.stream(o),Ee(e)),e}async function K(o,{username:e,name:t,branch:i,filePath:r}){let s=await Y(`https://codeload.github.com/${e}/${t}/tar.gz/${i}`);await Q.x({file:s,cwd:o,strip:r?r.split("/").length+1:1,filter:l=>l.startsWith(`${t}-${i.replace(/\//g,"-")}${r?`/${r}/`:"/"}`)}),await H.unlink(s)}async function X(o,e){if(e==="__internal-testing-retry")throw new Error("This is an internal example for testing the CLI.");let t=await Y("https://codeload.github.com/vercel/next.js/tar.gz/canary");await Q.x({file:t,cwd:o,strip:2+e.split("/").length,filter:i=>i.includes(`next.js-canary/examples/${e}/`)}),await H.unlink(t)}import Z from"got";async function F(o){return(await Z.head(o).catch(t=>t)).statusCode===200}async function ee(o,e){let[,t,i,r,s,...l]=o.pathname.split("/"),m=e?e.replace(/^\//,""):l.join("/");if(r===void 0||r===""&&s===void 0){let a=await Z(`https://api.github.com/repos/${t}/${i}`).catch(u=>u);if(a.statusCode!==200)return;let p=JSON.parse(a.body);return{username:t,name:i,branch:p.default_branch,filePath:m}}let d=e?`${s}/${l.join("/")}`.replace(new RegExp(`/${m}|/$`),""):s;if(t&&i&&d&&r==="tree")return{username:t,name:i,branch:d,filePath:m}}function oe({username:o,name:e,branch:t,filePath:i}){let r=`https://api.github.com/repos/${o}/${e}/contents`,s=`${i?`/${i}`:""}/package.json`;return F(r+s+`?ref=${t}`)}function te(o){try{let e=new URL(o);return F(e.href)}catch{return F(`https://api.github.com/repos/vercel/next.js/contents/examples/${encodeURIComponent(o)}`)}}import Se from"chalk";import Te from"cross-spawn";import qo from"ora";async function re(o,e){let t=["install"];return e||(console.log(Se.yellow(`You appear to be offline.
Falling back to the local cache.`)),t.push("--offline")),new Promise((i,r)=>{Te(o,t,{stdio:"inherit",env:{...process.env,ADBLOCK:"1",NODE_ENV:"development",DISABLE_OPENCOLLECTIVE:"1"}}).on("close",l=>{if(l!==0){r({command:`${o} ${t.join(" ")}`});return}i()})})}import Fe from"fs";function ne(o,e={recursive:!0}){return Fe.promises.mkdir(o,e)}var R=class extends Error{};async function ae({appPath:o,example:e,packageManager:t}){let i;if(e){let a;try{a=new URL(e)}catch(p){p.code!=="ERR_INVALID_URL"&&(console.error(p),process.exit(1))}a?(a.origin!=="https://github.com"&&(console.error(`URL inv\xE1lida: ${f.red(`"${e}"`)}. Apenas reposit\xF3rios do GitHui s\xE3o permitidos. Por favor, use uma URL de um reposit\xF3rio do GitHub e tente novamente.`),process.exit(1)),i=await ee(a),i||(console.error(`Pasta inv\xE1lida nessa URL do GitHub: ${f.red(`"${e}"`)}. Por favor, ajuste a URL e tente novamente.`),process.exit(1)),await oe(i)||(console.error(`N\xE3o podemos encontrar a localiza\xE7\xE3o do reposit\xF3rio ${f.red(`"${e}"`)}. Por favor, verifique se o reposit\xF3rio existe e tente novamente.`),process.exit(1))):e!=="__internal-testing-retry"&&(await te(e)||(console.error(`Could not locate an example named ${f.red(`"${e}"`)}. It could be due to the following:
`,`1. Your spelling of example ${f.red(`"${e}"`)} might be incorrect.
`,"2. You might not be connected to the internet or you are behind a proxy."),process.exit(1)))}let r=k.resolve(o);await C(k.dirname(r))||(console.error("A aplica\xE7\xE3o n\xE3o pode ser escrita, por favor verifique as permiss\xF5es da pasta e tente novamente."),process.exit(1));let s=k.basename(r);await ne(r),n.info(`Criando um novo projeto Gseller em ${f.green(r)}.`),n.info(),process.chdir(r);let l=k.join(r,"package.json"),m=!1;try{if(i){let a=i;n.info(`Baixando arquivos do reposit\xF3rio ${f.cyan(e)}. Isso pode demorar um pouco.`),n.info(),await ie(()=>K(r,a),{retries:3})}else n.info(`Baixando arquivos do reposit\xF3rio ${f.cyan(e)}. Isso pode demorar um pouco.`),n.info(),await ie(()=>X(r,e),{retries:3})}catch(a){let p=function(u){return typeof u=="object"&&u!==null&&typeof u.message=="string"};var d=p;throw new R(p(a)?a.message:a+"")}m=Re.existsSync(l),n.info(""),m&&(console.log("Instalando pacotes, isso pode demorar um pouco."),await re(t,!0)),n.info(`Projeto ${s} criado com ${f.green("sucesso!")}`),n.info(""),n.info(`Localiza\xE7\xE3o: ${f.blue(o)}`),n.info("")}var x="",Oe=D.object({cwd:D.string(),yes:D.boolean()}),se=new je().command("start").description("Inicia um projeto ").option("-y, --yes","Pular a confirma\xE7\xE3o de cria\xE7\xE3o do projeto",!1).option("-c, --cwd <cwd>","Diret\xF3rio de trabalho. O padr\xE3o \xE9 o diret\xF3rio atual.",process.cwd()).action(async o=>{let e="https://github.com/mateusp7/base-gseller";try{let t=Oe.parse(o),i=I.resolve(t.cwd);_e(i)||(n.error(`O caminho ${i} n\xE3o existe. Por favor, tente novamente.`),process.exit(1));let r=await qe();await Me(r.resolvedProjectPath,e,i)}catch{}});async function qe(){typeof x=="string"&&(x=x.trim());let o=await Ne({onState:g,type:"text",name:"path",message:"Qual o nome do seu projeto?",initial:"gseller"});return typeof o.path=="string"&&(x=o.path.trim()),{resolvedProjectPath:I.resolve(x)}}async function Me(o,e,t){let i=d=>De.cyan(d),r=I.resolve(o),s=I.basename(r);Ue.existsSync(r)&&process.exit(1),n.info(`Criando pasta ${i(s)} no caminho ${i(r)}...`),n.info("");let m=await b(t);await ae({appPath:o,example:e,packageManager:m})}var j=new We;async function Be(){j.name("gseller").description("Criar um template teste").version("1.0.0","-v, --version","display the version number"),j.addCommand(se).addCommand(V),j.parse()}Be();
//# sourceMappingURL=index.js.map