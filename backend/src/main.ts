import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ApiContextInterceptor, ApiExceptionFilter } from "./core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use("/robots.txt", function (req, res) {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  });

  app.setGlobalPrefix("/api");
  const config = new DocumentBuilder()
    .setTitle("Rewrite Pro App: REST API")
    .setDescription("")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ApiContextInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());
  const httpPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(httpPort, () =>
    console.log("Server started on port " + httpPort),
  );
}
bootstrap();
