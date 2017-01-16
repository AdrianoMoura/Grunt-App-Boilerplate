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

Primeiro de tudo, edite o myapp.json coloque suas informações de projeto: id, name, version, description, plugins

Se não tiver o phonegap e o grunt instalado execute:

```
sudo npm install -g grunt-cli
sudo npm install -g phonegap
```

Depois disso, execute o seguinte comando para instalar as dependencias

```
npm install
```

Você precisará clonar a versão mais recente do Framework7, execute o comando a seguir, ele clonará o repositorio do Framework7 na pasta /lib o grunt copiará os arquivos do Framework7 para dentro da pasta src, por isso esse passo é importante
```
git submodule update --init
```

Essa versão do meu boilerplate cria automaticamente a aplicação phonegap, para utiliza-lo siga os comandos abaixo durante o desenvolvimento do seu projeto

```
// Copia os arquivos necessários de /lib/framework7 para o projeto e 'compila' as informações de src para www
grunt

// Executa o comando anterior e após isso cria um projeto phonegap na pasta phonegap, baixa os plugins, gera o config.xml
grunt phonegap

// Executa o comando build, após isso copia o conteudo de www para o projeto na pasta phonegap e executa a aplicação no dispositivo padrão (esse comando não faz o build do projeto phonegap como forma de economizar tempo, por isso é importante executar o comando 'grunt phonegap' pelo menos uma vez antes. Sempre que modificar o myApp.json será necessário rodar 'grunt phonegap' novamente)
grunt phonegap-run

// Assim como 'grunt phonegap', mas faz o build na plataforma selecionada, sem esse parametro o phonegap compilara para a primeira plataforma na lista em myapp.json
grunt phonegap --platform android

// Exatamente como explicado anteriormente mas para executar o app
grunt phonegap-run --platform android
```

Adicionando o parâmetro --dist depois de qualquer comando acima irá preparar os arquivos para distribuição (cria uma versão minificada do css, js e html)

## Troubleshooting

### Fatal error: Command failed: /bin/sh -c phonegap local build android

O SDK do Android não está instalado
As variáveis de ambiente ANDROID_HOME e/ou PATH não foram definidas

ou

A variavel androidMinSdkVersion em myapp.json indica uma versão do SDK que não está instalada, é necessário mudar esse valor para o do SDK minimo disponível, execute android no terminal para checar as versões
