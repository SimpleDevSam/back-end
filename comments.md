# Comentários
Esses comentários são só uma visão de melhoria da sua codificação não são eliminatórios

- Separação dos módulos bem interessante
- Separação dos serviços interessantes
- No TypeScript não tem muita necessidade de criar a interface dos repositórios, mas legal também
- Banco de Dados
  - Uso legal da propriedades do @Prop, @Schema
  - O @Schema tem a propriedade timestamp para fazer o createdAt e modifiedAt, não precisaria se preocupar
  - O validate da keywords poderia ser em um arquivo separado, facilita depurar e manutenção
  - A class Task poderia ser uma interface, não "precisa" do construtor em TypeScript
  - O MongooseModule.forFeature poderia ficar no DabaseModule
- HTTP
  - O ResponseResult bem legal, mas não precisa exportar a interface, o ideal seria usar o NestInterceptor para que todas os controllers já retornassem esse tipo
  - Enable cors interessante
- Main
  -  Misturou o dotenv com o configservice, mas legal
- Helper
  - A melhor abordagem seria no conceito de Transformations. Classe com um método estático para a conversão entre as interfaces e classes
- OpenAPI / Swagger
  - Senti falta das propriedade de documentação @ApiProperty, @ApiParam, @ApiBody
- Uso do TS PATH muito bom
- Testes unitários poderia ser vários arquivos .spec cada um em sua pastas mas interessante
- ES Lint poderia colocar outras regras
