# Code-Quality Dokümantasyonu

> Bu dokümantasyon, projede kod formatı, kalitesini artırmak ve commit mesajlarında bir düzen oluşturmak için gerekli adımları içermektedir.
>
> - Commit öncesi prettier ile koda format atılıyor.
> - Commit mesaj format kontrolü yapılıyor. (e.g. fix: ..., chore: package.json)
> - Commit öncesi eslint kontrolünden geçmezse commit hata veriyor. (inline-styles, console, debugger)
> - Commit öncesi ve dev environment'da çalışan iki adet eslint ve prettier dosyası oluşturulmuş durumda.
>   - Dev environment'da çalışan eslint her zaman uyarı veriyor. Commit öncesi çalışan eslint belirlenen kurallardan geçmezse hata veriyor ve commit'i iptal ediyor.
>   - Precommitte çalışan prettier kullanılmayan importları silip sıralıyor.

## Prettier Kurulumu

```
npm install --save-dev prettier
```

`.prettierrc.json` dosyasını oluşturun ve aşağaki konfigürasyonları dosyaya yapıştırın.

```
{
  "printWidth": 80,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false,
  "useTabs": false
}
```

## Eslint Kurulumu

Eğer prebuild eslint konfigürasyonlarını uygulamak istiyorsanız aşağıdaki komutu çalıştırıp bu adımı atlayabilirsiniz.

```
npx eslint --init
```

---

```
npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react eslint-plugin-no-switch-statements eslint-plugin-no-inline-styles --save-dev
```

`.eslintrc.json` dosyasını oluşturun ve aşağıdaki konfigürasyonları dosyaya yapıştırın.

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "only-warn",
    "no-switch-statements",
    "eslint-plugin-no-inline-styles",
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "no-switch-statements/no-switch": "error",
    "no-inline-styles/no-inline-styles": "warn"
    //add customize rules here as per your project's needs
  }
}
```

Aşağıdaki scripti `package.json` dosyasına ekleyin.

```
    "eslint:show-all": "eslint src/**/*.ts src/**/*.tsx src/**/*.js"
```

Aşağıdaki kodu `.vscode/tasks.json` dosyasına ekleyin. Bu task çalıştırıldığı zaman vscode panelinin problem tabında tüm eslint hataları ve uyarıları görüntülenebilecektir. Çalıştırılmadığı zaman sadece hali hazırda çalışılan sayfalardaki eslint hataları ve uyarıları görüntülenebilecektir.

```
    {
      "label": "ESLint",
      "type": "shell",
      "problemMatcher": "$eslint-stylish",
      "command": "npm run eslint:show-all"
    }
```

## Dev Modda Eslint Hatalarını Uyarı Olarak Gösterme

```
npm install eslint-plugin-only-warn --save-dev
```

Ardından .eslintrc.json dosyasındaki pluginlere "only-warn" ekleyin.

```
"plugins": ["only-warn"],
```

## Husky ve lint-staged Kurulumu

```
npm install husky lint-staged --save-dev
```

## package.json Ayarı

`package.json` dosyasında `scripts` objesinin içine aşağıdaki satırı ekleyin ve bu komutu çalıştırın.

`"husky-install": "husky install"`

```
npm run husky-install
```

## Pre-commit Hook Ayarı

Precommit hook'unu eklemek için aşağıdaki komutu çalıştırın.

```
npx husky add .husky/pre-commit 'npx lint-staged'
```

## Commitlint Kurulumu

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

## Commitlint Hook Ayarı

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## Commitlint Konfigürasyon Dosyası

`.commitlintrc.js` adında bir dosya oluşturun ve içeriğini [commitlint/config-conventional README](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md) linkinden alabilirsiniz. Örnek dosya içeriği:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
```

## Precommit Eslint Dosyası Oluşturma

Eğer commit öncesi kontrol yapılması gerekiyorsa eksik olan ek pluginler yüklenir. (e.g. inline styles plugin)

`.pre-commit-eslint.cjs` adında bir dosya oluşturun ve içine sadece commit esnasında çalışacak olan Eslint kurallarını ekleyin. **Örnek:**

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "eslint-plugin-no-inline-styles",
    "@typescript-eslint",
    "no-switch-statements",
  ],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-use-before-define": "error",
    "default-case": "error",
    "no-inline-styles/no-inline-styles": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-switch-statements/no-switch": "error",
  },
};
```

## Precommit Prettier Organize Imports

```
npm install --save-dev prettier-plugin-organize-imports
```

Bu işlem precommitte yapılacağı için ayrı bir prettier format konfigürasyonu çalışması gerekiyor. O nedenle `.husky` klasörününü içerisine `.prettierrc.precommit.js` dosyası oluşturun ve aşağıdaki kodu yapıştırın.

```
module.exports = {
  ...require("../.prettierrc.json"),
  plugins: ["prettier-plugin-organize-imports"],
};
```

## Husky lint-staged package.json Güncelleme

`package.json` dosyasına aşağıdaki husky ve lint-staged konfigürasyonlarını ekleyin:

```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx}": [
      "prettier --config .husky/.prettierrc.precommit.js --write",
      "eslint --config .pre-commit-eslint.cjs --no-eslintrc"
    ]
  },
```

**\--no-eslintrc:** Ana eslint konfigürasyon dosyasını devre dışı bırakır.

**prettier --write:** Commit öncesi kodu formatlar.

spellcheck  dev modda olacak
