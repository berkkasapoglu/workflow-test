# Commit Convention Dokümantasyonu

Bu dokümantasyon, bir proje içinde commit mesajlarına uygun bir konvansiyon oluşturmak için adımları içermektedir.

## Adım 1: Eslint ve Prettier

Projenizin halihazırda Eslint ve Prettier kurulu olduğunu varsayıyorum 👀️ .

## Adım 2: lint-staged Kurulumu

<pre><code class="!whitespace-pre hljs language-bash">npm install --save-dev lint-staged
</code></div></div></pre>

## Adım 3: Husky Kurulumu

<pre><code class="!whitespace-pre hljs language-bash">npx husky-init && npm install
</code></div></div></pre>

## Adım 4: Commit-msg Hook Ayarı

<pre><code class="!whitespace-pre hljs language-bash">npx husky add .husky/commit-msg <span class="hljs-string">'npx --no -- commitlint --edit "$1"'</span>
</code></div></div></pre>

## Adım 5: package.json Ayarı

`package.json` dosyasında `scripts` objesinin içine aşağıdaki satırı ekleyin:

<code class="!whitespace-pre hljs language-json"><span class="hljs-attr">"prepare"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"husky install"</span>
</code></div></div></pre>

## Adım 6: Commitlint Kurulumu

<pre><code class="!whitespace-pre hljs language-bash">npm install --save-dev @commitlint/config-conventional @commitlint/cli
</code></div></div></pre>

## Adım 7: Pre-commit Hook Ayarı

<pre><code class="!whitespace-pre hljs language-bash">npx husky add .husky/pre-commit <span class="hljs-string">'npx lint-staged'</span>
</code></div></div></pre>

## Adım 8: Eslint Dosyası Oluşturma

`.pre-commit-eslint.cjs` adında bir dosya oluşturun ve içine sadece commit esnasında çalışacak olan Eslint kurallarını ekleyin.

## Adım 9: Commitlint Konfigürasyon Dosyası

`.commitlintrc.js` adında bir dosya oluşturun ve içeriğini [commitlint/config-conventional README](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md) linkinden alabilirsiniz. Örnek dosya içeriği:

<pre><code class="!whitespace-pre hljs language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
	<span class="hljs-attr">extends</span>: [<span class="hljs-string">'@commitlint/config-conventional'</span>],

	<span class="hljs-attr">rules</span>: {
		<span class="hljs-string">'type-enum'</span>: [
			<span class="hljs-number">2</span>,
			<span class="hljs-string">'always'</span>,
			[
				<span class="hljs-string">'build'</span>,
				<span class="hljs-string">'chore'</span>,
				<span class="hljs-string">'ci'</span>,
				<span class="hljs-string">'docs'</span>,
				<span class="hljs-string">'feat'</span>,
				<span class="hljs-string">'fix'</span>,
				<span class="hljs-string">'perf'</span>,
				<span class="hljs-string">'refactor'</span>,
				<span class="hljs-string">'revert'</span>,
				<span class="hljs-string">'style'</span>,
				<span class="hljs-string">'test'</span>,
			],
		],
	},
};
</code></div></div></pre>

## Adım 10: package.json Güncelleme

`package.json` dosyasına aşağıdaki husky ve lint-staged konfigürasyonlarını ekleyin:

<pre><code class="!whitespace-pre hljs language-json"><span class="hljs-attr">"husky"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">"hooks"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">"pre-commit"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"lint-staged"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"commit-msg"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"commitlint -E HUSKY_GIT_PARAMS"</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"lint-staged"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">"src/**/*.{ts,tsx,js,jsx}"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-string">"npx eslint --config .pre-commit-eslint.cjs"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-string">"prettier --write"</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
</code></div></div></pre>

Bu adımları takip ederek, proje içinde commit mesajlarına uygun bir konvansiyon oluşturmuş olacaksınız.
