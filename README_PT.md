# Grunt App Boilerplate

Repositório criado para servir como estrutura base para projetos de aplicativos phonegap, utiliza phonegap e o Grunt como gerenciador de tarefas.

## Clonando Projeto

Execute esse comando para clonar  meu repositório dentro de uma nova pasta, sem o log anterior do git

```
git clone https://github.com/AdrianoMoura/Grunt-App-Boilerplate ./YourProjectName --depth=1
```

Você pode remover o origin
```
git remote rm origin
```

ou renomea-lo
```
git remote rename origin boilerplate
```

Renomear é uma boa opção pois você manter meu remote vinculado e pode baixar atualizações no futuro sem impactar no seu projeto.


## Utilizando

Primeiro de tudo, edite o myapp.json coloque suas informações de projeto: id, name, version, description, plugins e plataformas

Se não tiver o phonegap e o grunt instalado execute:

```
sudo npm install -g grunt-cli
sudo npm install -g phonegap
```

Depois disso, execute o seguinte comando para instalar as dependencias do boilerplate

```
npm install
```

Essa versão do meu boilerplate cria automaticamente a aplicação phonegap, para utiliza-lo siga os comandos abaixo durante o desenvolvimento do seu projeto

```
// Esse comando 'compila' as informações de src para www
grunt build

// Executa o comando anterior e após isso cria um projeto phonegap na pasta phonegap, baixa os plugins, gera o config.xml e utiliza o conteudo da pasta www como do projeto
grunt phonegap

// Executa o comando build, após isso copia o conteudo de www para o projeto na pasta phonegap e executa a aplicação no dispositivo padrão (esse comando não faz o build do projeto phonegap como forma de economizar tempo, utilize ele após o comando grunt phonegap, sempre que inserir um plugin novo, plataforma, mudar os icones será necessário rodar grunt phonegap novamente)
grunt phonegap-run

// Assim como grunt phonegap, mas faz o build na plataforma selecionada, sem esse parametro o phonegap compilara para a primeira plataforma na lista em myapp.json
grunt phonegap --platform android

// Exatamente como explicado anteriormente
grunt phonegap-run --platform android
```


## Troubleshooting

### Fatal error: Command failed: /bin/sh -c phonegap local build android 

O SDK do Android não está instalado
As variáveis de ambiente ANDROID_HOME e/ou PATH não foram definidas

ou

A variavel androidMinSdkVersion em myapp.json indica uma versão do SDK que não está instalada, é necessário mudar esse valor para o do SDK minimo disponível, execute android no terminal para checar as versões


Consegui detalhar mais esse readme em português, fique a vontade para "forkar" o projeto e abrir issues 
